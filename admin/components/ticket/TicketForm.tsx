"use client";

import { useState } from "react";
import { createTicket } from "@/services/ticket.service";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { fetchAPI } from "@/lib/api";
import { sendOtp, verifyOtp } from "@/services/auth.service";

export default function TicketForm({
    visitId,
    visitUserId,
    formData,
    setFormData,
}: {
    visitId: string;
    visitUserId: string;
    formData: any;
    setFormData: any;
}) {
    const router = useRouter();


    const [userFound, setUserFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [isRepresentative, setIsRepresentative] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [verifiedUserId, setVerifiedUserId] = useState<string | null>(null);

    const isValid =
        formData.department && formData.subject && formData.description;

    // 🔍 MOBILE SEARCH
    const handleMobileChange = async (value: string) => {
        setFormData((prev: any) => ({ ...prev, mobile: value }));

        if (value.length !== 10) return;

        try {
            const res = await fetchAPI(`/user/search?mobile=${value}`);

            // 🔥 IMPORTANT: compare with visit user mobile
            if (res.user) {
                setUserFound(true);

                // 👇 representative check
                if (res.user._id.toString() !== visitUserId.toString()) {
                    setIsRepresentative(true);
                } else {
                    setIsRepresentative(false);
                }

                setFormData((prev: any) => ({
                    ...prev,
                    name: res.user.name || "",
                    address: res.user.address || "",
                    constituency: res.user.constituency || "",
                    whatsapp: res.user.whatsapp || "",
                    email: res.user.email || "",
                    gender: res.user.gender || "",
                }));
            } else {
                setUserFound(false);

                // 🔥 new user = representative
                setIsRepresentative(true);
            }
        } catch (err) {
            console.log(err);
        }
    };



    // 📸 IMAGE
    const handleImageChange = async (e: any) => {
        const files = Array.from(e.target.files);

        const compressedImages: File[] = [];
        const previewUrls: string[] = [];

        for (let file of files) {
            const compressed = await imageCompression(file as File, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1200,
                useWebWorker: true,
            });

            compressedImages.push(compressed);
            previewUrls.push(URL.createObjectURL(compressed));
        }

        setImages(compressedImages);
        setPreview(previewUrls);
    };

    const handleSubmit = async () => {
        try {
            if (!visitId) {
                toast.error("Invalid visit");
                return;
            }

            if (!formData.department || !formData.subject || !formData.description) {
                toast.error("Please fill required fields");
                return;
            }

            // 🔴 BLOCK REPRESENTATIVE WITHOUT OTP
            if (isRepresentative && !otpVerified) {
                toast.error("Please verify user via OTP");
                return;
            }

            setLoading(true);

            const fd = new FormData();

            // ❌ REMOVE mobile-based identity
            // Only send relevant fields

            fd.append("visitId", visitId);

            // ✅ KEY CHANGE
            const finalUserId = isRepresentative
                ? verifiedUserId
                : visitUserId;

            if (!finalUserId) {
                toast.error("User not verified");
                return;
            }

            fd.append("userId", finalUserId);

            // other fields
            fd.append("department", formData.department);
            fd.append("subject", formData.subject);
            fd.append("description", formData.description);
            fd.append("letterBody", formData.letterBody);
            fd.append("aadhar", formData.aadhar);
            fd.append("voterId", formData.voterId);

            images.forEach((img) => {
                fd.append("images", img);
            });

            await createTicket(fd);

            toast.success("Ticket Created 🚀");
            router.push("/dashboard/visits");

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (formData.mobile.length !== 10) {
            toast.error("Enter valid mobile");
            return;
        }

        try {
            const res = await sendOtp({ mobile: formData.mobile });

            console.log("OTP RESPONSE:", res);

            if (res?.otp) {
                alert(`OTP is: ${res.otp}`); // 🔥 testing only
            }

            setOtpSent(true);
            toast.success("OTP sent");

        } catch (err: any) {
            toast.error(err.message);
        }
    };


    const handleVerifyOtp = async () => {
        try {
            const res = await verifyOtp({
                mobile: formData.mobile,
                otp,
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                gender: formData.gender,
            });

            setOtpVerified(true);
            setVerifiedUserId(res.user._id);

            toast.success("User verified ✅");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-lg bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-bold">Create Ticket</h2>

            {/* 🔍 MOBILE FIRST */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Enter Mobile (search user)"
                value={formData.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
            />

            {/* NAME */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData((prev: any) => ({ ...prev, name: e.target.value }))
                }
            />

            {/* 🆕 SHOW EXTRA IF NEW USER */}
            {isRepresentative && (
                <>
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData((prev: any) => ({ ...prev, address: e.target.value }))
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Constituency"
                        value={formData.constituency}
                        onChange={(e) =>
                            setFormData((prev: any) => ({ ...prev, constituency: e.target.value }))
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="WhatsApp"
                        value={formData.whatsapp}
                        onChange={(e) =>
                            setFormData((prev: any) => ({ ...prev, whatsapp: e.target.value }))
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev: any) => ({ ...prev, email: e.target.value }))
                        }
                    />

                    <select
                        className="w-full border p-2 rounded"
                        value={formData.gender}
                        onChange={(e) =>
                            setFormData((prev: any) => ({ ...prev, gender: e.target.value }))
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </>
            )}

            {/* DEPARTMENT */}
            <select
                className="w-full border p-2 rounded"
                value={formData.department}
                onChange={(e) =>
                    setFormData((prev: any) => ({ ...prev, department: e.target.value }))
                }
            >
                <option value="">Select Department</option>
                <option value="bpl">BPL Card</option>
                <option value="pmawas">PM Awas</option>
                <option value="medical">Medical Help</option>
                <option value="anudam">Swechha Anudan</option>
            </select>

            {/* SUBJECT */}
            {/* <input
                className="w-full border p-2 rounded"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                    setFormData((prev: any) => ({ ...prev, subject: e.target.value }))
                }
            /> */}

            {/* DESCRIPTION */}
            <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                    setFormData((prev: any) => ({
                        ...prev,
                        description: e.target.value,
                    }))
                }
            />

            {/* IMAGE */}
            <input type="file" multiple onChange={handleImageChange} />

            {/* PREVIEW */}
            <div className="flex gap-2 flex-wrap">
                {preview.map((img, i) => (
                    <img key={i} src={img} className="w-20 h-20 rounded" />
                ))}
            </div>


            {isRepresentative && (
                <div className="space-y-2">
                    {!otpSent && (
                        <button
                            onClick={handleSendOtp}
                            className="bg-gray-200 px-3 py-1 rounded"
                        >
                            Send OTP
                        </button>
                    )}

                    {otpSent && !otpVerified && (
                        <>
                            <input
                                className="w-full border p-2 rounded"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                                onClick={handleVerifyOtp}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

                    {otpVerified && (
                        <p className="text-green-600 text-sm">Verified ✅</p>
                    )}
                </div>
            )}

            {/* SUBMIT */}
            <button
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {loading ? "Saving..." : "Create Ticket"}
            </button>
        </div>
    );
}
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
}: {
    visitId: string;
    visitUserId: string;
}) {
    const router = useRouter();

    const [form, setForm] = useState({
        department: "",
        subject: "",
        description: "",
        letterBody: "",
        aadhar: "",
        voterId: "",
        name: "",
        mobile: "",
        address: "",
        constituency: "",
        whatsapp: "",
        email: "",
        gender: "",
    });

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
        form.department && form.subject && form.description;

    // 🔍 MOBILE SEARCH
    const handleMobileChange = async (value: string) => {
        setForm((prev) => ({ ...prev, mobile: value }));

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

                setForm((prev) => ({
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

            if (!form.department || !form.subject || !form.description) {
                toast.error("Please fill required fields");
                return;
            }

            // 🔴 BLOCK REPRESENTATIVE WITHOUT OTP
            if (isRepresentative && !otpVerified) {
                toast.error("Please verify user via OTP");
                return;
            }

            setLoading(true);

            const formData = new FormData();

            // ❌ REMOVE mobile-based identity
            // Only send relevant fields

            formData.append("visitId", visitId);

            // ✅ KEY CHANGE
            const finalUserId = isRepresentative
                ? verifiedUserId
                : visitUserId;

            if (!finalUserId) {
                toast.error("User not verified");
                return;
            }

            formData.append("userId", finalUserId);

            // other fields
            formData.append("department", form.department);
            formData.append("subject", form.subject);
            formData.append("description", form.description);
            formData.append("letterBody", form.letterBody);
            formData.append("aadhar", form.aadhar);
            formData.append("voterId", form.voterId);

            images.forEach((img) => {
                formData.append("images", img);
            });

            await createTicket(formData);

            toast.success("Ticket Created 🚀");
            router.push("/dashboard/visits");

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (form.mobile.length !== 10) {
            toast.error("Enter valid mobile");
            return;
        }

        try {
            const res = await sendOtp({ mobile: form.mobile });

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
                mobile: form.mobile,
                otp,
                name: form.name,
                email: form.email,
                whatsapp: form.whatsapp,
                gender: form.gender,
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
                value={form.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
            />

            {/* NAME */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
            />

            {/* 🆕 SHOW EXTRA IF NEW USER */}
            {isRepresentative && (
                <>
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                    />



                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Constituency"
                        value={form.constituency}
                        onChange={(e) =>
                            setForm({ ...form, constituency: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="WhatsApp"
                        value={form.whatsapp}
                        onChange={(e) =>
                            setForm({ ...form, whatsapp: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <select
                        className="w-full border p-2 rounded"
                        value={form.gender}
                        onChange={(e) =>
                            setForm({ ...form, gender: e.target.value })
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
                value={form.department}
                onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                }
            >
                <option value="">Select Department</option>
                <option value="bpl">BPL Card</option>
                <option value="pmawas">PM Awas</option>
                <option value="medical">Medical Help</option>
                <option value="anudam">Swechha Anudan</option>
            </select>

            {/* SUBJECT */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                }
            />

            {/* DESCRIPTION */}
            <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
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
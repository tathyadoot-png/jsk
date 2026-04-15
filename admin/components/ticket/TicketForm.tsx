"use client";

import { useState } from "react";
import { createTicket } from "@/services/ticket.service";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { fetchAPI } from "@/lib/api";

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
      if (res.user._id !== visitUserId) {
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

    // 🚀 SUBMIT
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

            setLoading(true);

            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            formData.append("visitId", visitId);

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
            {isRepresentative  && (
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
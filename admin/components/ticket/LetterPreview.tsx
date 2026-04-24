import { useEffect } from "react";
import { LETTER_TEMPLATES } from "@/constants/letterTemplates";

export default function LetterPreview({ formData, setFormData }: any) {
    const generateLetter = (template: string, data: any) => {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            return data[key.trim()] || "";
        });
    };




    useEffect(() => {
        if (!formData.department) return;

        const template = LETTER_TEMPLATES[formData.department as keyof typeof LETTER_TEMPLATES];
        if (!template) return;

        const generated = generateLetter(template, formData);

        setFormData((prev: any) => ({
            ...prev,
            letterBody: generated,
        }));
    }, [
        formData.department,
        formData.description,
        formData.name,
        formData.address,
        formData.mobile,
    ]);



    const downloadPDF = async () => {
        const res = await fetch("http://localhost:5000/api/pdf/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: formData.letterBody,
                name: formData.name,
                mobile: formData.mobile,
            }),
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "letter.pdf";
        a.click();
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-3">Letter Preview</h2>

            <div className="bg-white border rounded p-6 shadow">
                {/* 🏛️ Header */}
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold">कार्यालय</h1>
                    <p className="text-sm text-gray-600">जन शिकायत प्रकोष्ठ</p>
                    <hr className="my-3 border-black" />
                </div>

                {/* 📄 Letter Content */}
                <pre className="whitespace-pre-wrap font-serif text-[15px] leading-7">
                    {formData.letterBody}
                </pre>

                {/* ✍️ Signature */}
                {/* <div className="mt-10 text-right">
          <p>भवदीय,</p>
          <p className="font-semibold">{formData.name}</p>
          <p className="text-sm">{formData.mobile}</p>
        </div> */}
            </div>


            <button
                onClick={downloadPDF}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Download PDF
            </button>
        </div>
    );
}
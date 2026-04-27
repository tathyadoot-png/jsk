"use client";

import { useEffect, useState, useRef } from "react";
import { LETTER_TEMPLATES } from "@/constants/letterTemplates";
import {
    FileText,
    Download,
    RefreshCw,
    CheckCircle2,
    Printer,
    Eye,
    AlertCircle,
    Edit3,
    Type
} from "lucide-react";

export default function LetterPreview({ formData, setFormData }: any) {
    const [isGenerating, setIsGenerating] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
const printRef = useRef<HTMLDivElement>(null);

    // Auto-resize textarea logic
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [formData.letterBody]);

    const generateLetter = (template: string, data: any) => {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            return data[key.trim()] || "__________";
        });
    };

  useEffect(() => {
    if (!formData.department) return;

    const template = LETTER_TEMPLATES[formData.department as keyof typeof LETTER_TEMPLATES];
    if (!template) return;

    const generated = generateLetter(template, formData);

  
    if (!formData.isEdited) {
        setFormData((prev: any) => ({
            ...prev,
            letterBody: generated,
        }));
    }
}, [
    formData.department,
    formData.description,
    formData.name,
    formData.address,
    formData.mobile,
]);

const headerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
        <h1 style="font-size:20px; margin-bottom:4px;">
            कार्यालय जन शिकायत प्रकोष्ठ
        </h1>
        <p style="font-size:10px;">
            Government of Madhya Pradesh
        </p>
    </div>
`;

const handlePrint = () => {
    if (!printRef.current) return;

    const letterText = formData.letterBody || "";

    const printWindow = window.open("", "", "width=900,height=1000");
    if (!printWindow) return;

    printWindow.document.write(`
        <html>
        <head>
            <title>Print Letter</title>
            <style>
                @page {
                    size: A4;
                    margin: 20mm;
                }

                body {
                    font-family: "Noto Serif Devanagari", serif;
                    line-height: 1.8;
                    color: #000;
                    background: #fff;
                }

                * {
                    background: none !important;
                    box-shadow: none !important;
                }

                .content {
                    white-space: pre-wrap;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>

            ${headerHTML}

            <div class="content">
                ${letterText}
            </div>

        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 300);
};
    const downloadPDF = async () => {
        try {
            setIsGenerating(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/pdf/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            a.download = `Letter_${formData.name || 'document'}.pdf`;
            a.click();
        } catch (error) {
            console.error("PDF Generation failed");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* --- TOP CONTROL BAR --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/50">
                <div className="flex items-center gap-4 px-2">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <FileText size={22} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 italic leading-tight">Draft Editor</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Live Preview Ready</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={downloadPDF}
                        disabled={isGenerating || !formData.letterBody}
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-30 shadow-xl shadow-blue-100 active:scale-95"
                    >
                        {isGenerating ? (
                            <RefreshCw size={16} className="animate-spin" />
                        ) : (
                            <Download size={16} />
                        )}
                        {isGenerating ? "Exporting..." : "Download PDF"}
                    </button>

                    <button
                        onClick={handlePrint}
                        disabled={!formData.letterBody}
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-30 shadow-xl shadow-gray-200 active:scale-95"
                    >
                        <Printer size={16} />
                        Print
                    </button>
                </div>
            </div>

            {/* --- THE VIRTUAL PAPER --- */}
            <div className="relative group max-w-4xl mx-auto">
                {/* Visual Stack Decoration */}
                <div className="absolute inset-0 bg-white border border-gray-100 rounded-[3rem] -rotate-1 translate-y-2 opacity-50" />

                <div   ref={printRef} className="relative bg-white border border-gray-100 rounded-[3rem] shadow-2xl shadow-gray-200/40 overflow-hidden min-h-[700px] flex flex-col">

                    {/* Header Mockup */}
                    <div className="bg-gray-50/50 border-b border-dashed border-gray-200 p-10 text-center space-y-3">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-2">
                            <Printer size={24} className="text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tighter italic">कार्यालय जन शिकायत प्रकोष्ठ</h1>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Government of Madhya Pradesh</p>
                    </div>

                    {/* Editor Area */}
                    <div className="p-8 md:p-16 flex-1 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-fixed">
                        {!formData.department ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-gray-300 space-y-4">
                                <AlertCircle size={60} strokeWidth={1} className="text-gray-200" />
                                <p className="text-xs font-black uppercase tracking-widest italic text-gray-400">Select department to load template</p>
                            </div>
                        ) : (
                            <div className="relative group/editor">
                                {/* Floating Edit Indicator */}
                                <div className="absolute -top-10 left-0 flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full opacity-0 group-hover/editor:opacity-100 transition-opacity">
                                    <Edit3 size={10} className="text-emerald-400" />
                                    <span className="text-[8px] font-black text-white uppercase">Editable Mode</span>
                                </div>

                                <textarea
                                    ref={textareaRef}
                                    className="w-full min-h-[500px] p-0 resize-none border-none outline-none font-serif text-[18px] leading-[2] text-gray-700 bg-transparent placeholder:text-gray-200 selection:bg-blue-100 transition-all overflow-hidden"
                                    placeholder="Type your letter content here..."
                                    value={formData.letterBody || ""}
                                    onChange={(e) =>
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            letterBody: e.target.value,
                                            isEdited: true,
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer Stats */}
                    <div className="px-10 py-8 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Type size={14} className="text-gray-400" />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    {formData.letterBody?.length || 0} Characters
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">
                                    {formData.isEdited ? "Manual Edit" : "Auto-Draft"}
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-gray-100">
                            Ref: MP-GRIEVANCE-2024
                        </p>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM MOBILE HINT --- */}
            <div className="flex items-center justify-center gap-3 py-4 md:hidden">
                <div className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2">
                    <Eye size={12} className="text-gray-500" />
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Scroll to check bottom alignment</p>
                </div>
            </div>
        </div>
    );
}
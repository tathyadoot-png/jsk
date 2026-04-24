// app/dashboard/visitor/page.tsx

import VisitorEntryForm from "@/components/visit/VisitorEntryForm";

export default function VisitorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Visitor Entry
      </h1>

      <VisitorEntryForm />
    </div>
  );
}
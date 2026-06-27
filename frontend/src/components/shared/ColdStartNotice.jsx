import { TriangleAlert } from "lucide-react";

export default function ColdStartNotice() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <TriangleAlert
        size={18}
        className="mt-0.5 text-amber-600"
      />

      <div>
        <p className="text-sm font-medium text-amber-800">
          First request may be slow
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-700">
          The backend runs on a free hosting plan and may take
          <strong> 10–40 seconds </strong>
          to wake up after inactivity. Please avoid refreshing the page while waiting.
        </p>
      </div>
    </div>
  );
}
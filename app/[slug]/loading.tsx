import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className=" mx-auto px-4 mt-20 flex justify-center items-center gap-3 text-gray-500">
      <Loader2 className="h-5 w-5 animate-spin" />
      <p className="text-sm">Loading content…</p>
    </div>
  );
}

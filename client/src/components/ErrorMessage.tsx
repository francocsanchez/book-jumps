import type React from "react";

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-red-600 flex items-center gap-1">{children}</p>;
}

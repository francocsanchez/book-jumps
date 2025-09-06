import { LucideInbox } from "lucide-react";
import type { ReactNode } from "react";

type EmpyRegistrosProps = {
  title?: string;
  icon?: ReactNode;
};

export default function EmpyRegistros({ title = "No hay registros", icon }: EmpyRegistrosProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <div className="w-16 h-16 mb-4 text-gray-400">{icon || <LucideInbox className="w-full h-full" />}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
  );
}

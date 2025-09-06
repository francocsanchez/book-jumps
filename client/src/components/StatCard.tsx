export default function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-semibold text-sky-700">{value}</p>
    </div>
  );
}

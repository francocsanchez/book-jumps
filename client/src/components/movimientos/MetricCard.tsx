export default function MetricCard({
  title,
  value,
  icon,
  className,
  badgeClass,
  subtitle,
  footer,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  className?: string;
  badgeClass?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`bg-white border ${className ?? "border-gray-200"} rounded-lg shadow-sm px-5 py-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
          {footer && <div className="mt-2">{footer}</div>}
        </div>
        <span className={`inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md ${badgeClass ?? "bg-gray-100 text-gray-700"}`}>{icon}</span>
      </div>
    </div>
  );
}

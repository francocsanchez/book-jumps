export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="animate-spin inline-block w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full" />
        Cargando información...
      </div>
    </div>
  );
}

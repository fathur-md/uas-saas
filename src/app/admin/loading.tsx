export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse w-full">
      <div className="h-8 w-1/4 bg-neutral-light/40 rounded-lg"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-neutral-light/30 rounded-xl"></div>
        <div className="h-32 bg-neutral-light/30 rounded-xl"></div>
        <div className="h-32 bg-neutral-light/30 rounded-xl"></div>
      </div>
      <div className="h-64 bg-neutral-light/20 rounded-xl mt-6"></div>
    </div>
  );
}

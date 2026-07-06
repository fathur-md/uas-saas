export default function CustomerLoading() {
  return (
    <div className="space-y-6 animate-pulse max-w-5xl mx-auto w-full">
      <div className="h-40 bg-neutral-light/30 rounded-xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-48 bg-neutral-light/20 rounded-xl"></div>
        <div className="h-48 bg-neutral-light/20 rounded-xl"></div>
        <div className="h-48 bg-neutral-light/20 rounded-xl"></div>
      </div>
    </div>
  );
}

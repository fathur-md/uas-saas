export default function MerchantLoading() {
  return (
    <div className="space-y-6 animate-pulse w-full">
      <div className="h-8 w-1/3 bg-neutral-light/40 rounded-lg"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-24 bg-neutral-light/30 rounded-xl"></div>
        <div className="h-24 bg-neutral-light/30 rounded-xl"></div>
        <div className="h-24 bg-neutral-light/30 rounded-xl"></div>
        <div className="h-24 bg-neutral-light/30 rounded-xl"></div>
      </div>
      <div className="h-64 bg-neutral-light/20 rounded-xl mt-6"></div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="shimmer inline-block h-6 w-32 rounded-full mb-4" />
        <div className="shimmer h-8 w-64 rounded mb-2" />
        <div className="shimmer h-4 w-48 rounded" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="shimmer w-full aspect-[16/9]" />
            <div className="p-5 space-y-3">
              <div className="shimmer h-5 w-3/4 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-2/3 rounded" />
              <div className="flex gap-3 pt-3">
                <div className="shimmer h-3 w-12 rounded-full" />
                <div className="shimmer h-3 w-12 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

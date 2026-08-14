export default function Loading() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Breadcrumb + back button skeleton */}
      <div className="mb-8 flex items-center gap-3">
        <div className="shimmer h-8 w-8 rounded-lg" />
        <div className="shimmer h-4 w-48 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="shimmer h-8 w-full rounded mb-2" />
      <div className="shimmer h-8 w-2/3 rounded mb-6" />

      {/* Meta skeleton */}
      <div className="flex gap-3 mb-8">
        <div className="shimmer h-6 w-20 rounded-full" />
        <div className="shimmer h-6 w-24 rounded-full" />
      </div>

      {/* Hero image skeleton */}
      <div className="shimmer w-full aspect-[2/1] rounded-xl mb-8" />

      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-4/5 rounded mt-2" />
          </div>
        ))}
      </div>
    </article>
  );
}

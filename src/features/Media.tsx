export default function Media() {
  return (
    <section className="space-y-5 rounded-2xl bg-blue-950 p-4 text-yellow-50 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-yellow-300">Tech page</h2>
        <p className="mt-1 text-sm text-blue-100">Watch the video from YouTube.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <img
          className="aspect-video w-full rounded-lg border border-yellow-300/40 object-cover"
          src="/media/tech-page-1.png"
          alt="Smartphone home screen shown on a phone"
        />
        <h1 className="font-display text-lg font-semibold">
          <a href="https://github.com/features/copilot/plans" target="_blank" rel="noreferrer">
            Co-pilot plans
          </a>
        </h1>
        <img
          className="aspect-video w-full rounded-lg border border-yellow-300/40 object-cover"
          src="/media/tech-page-2.jpg"
          alt="Graphics card on a black and green background"
        />
        <img
          className="aspect-video w-full rounded-lg border border-yellow-300/40 object-cover"
          src="/media/tech-page-3.jpg"
          alt="Sports car on a racetrack"
        />
      </div>
      <div className="aspect-video overflow-hidden rounded-lg border border-yellow-300/50 bg-blue-900">
        <iframe
          className="size-full"
          src="https://www.youtube-nocookie.com/embed/O8gJIuhiTD0"
          title="Tech page video on YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export default function Media() {
  return (
    <section className="panel space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold">UNIQLO ad</h2>
        <p className="mt-1 text-sm text-ink/60">Watch the video from YouTube.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((block) => (
          <div key={block} className="flex min-h-28 items-center justify-center rounded-lg border border-ink/15 text-sm text-ink/60">
            Content block
          </div>
        ))}
      </div>
      <div className="aspect-video overflow-hidden rounded-lg bg-ink">
        <iframe
          className="size-full"
          src="https://www.youtube-nocookie.com/embed/O8gJIuhiTD0"
          title="UNIQLO ad on YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}

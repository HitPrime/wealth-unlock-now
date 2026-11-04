import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeThumb } from "@/content/breakoutReviews";

// Click-to-load YouTube player: shows a lazy thumbnail and only loads the iframe
// (and YouTube's ~1MB of scripts) after the visitor presses play.
// `priority` is for thumbnails visible on first load: the top one is usually the page's
// largest image (LCP), so it must not be lazy-loaded.
export function YouTubeFacade({
  id,
  title,
  priority = false,
  onPlay,
}: {
  id: string;
  title: string;
  priority?: boolean;
  /** Called once when the visitor presses play (used for play counting). */
  onPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  if (!id) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-purple-400/40 bg-black/40 px-4 text-center font-mono text-xs text-purple-200/70">
        [PLACEHOLDER: YouTube video ID not provided yet]
      </div>
    );
  }

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPlaying(true);
        onPlay?.();
      }}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
      aria-label={`Play video: ${title}`}
    >
      <img
        src={youtubeThumb(id)}
        alt={`Video thumbnail: ${title}`}
        width={480}
        height={360}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/90 shadow-lg shadow-black/50 ring-1 ring-white/20 transition group-hover:bg-purple-500">
          <Play className="ml-1 h-7 w-7 fill-white text-white" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

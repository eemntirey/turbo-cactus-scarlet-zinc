import { createFileRoute } from "@tanstack/react-router";
import { WatchFace } from "@/components/watch/watch-face";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <WatchFace />;
}

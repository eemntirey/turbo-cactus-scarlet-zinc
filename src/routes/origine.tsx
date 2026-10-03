import { createFileRoute } from "@tanstack/react-router";
import { OriginPanel } from "@/components/origin/origin-panel";

export const Route = createFileRoute("/origine")({ component: OriginePage });

function OriginePage() {
  return <OriginPanel />;
}

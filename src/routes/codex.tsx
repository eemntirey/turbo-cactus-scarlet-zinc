import { createFileRoute } from "@tanstack/react-router";
import { Codex } from "@/components/codex/codex";

export const Route = createFileRoute("/codex")({ component: CodexPage });

function CodexPage() {
  return <Codex />;
}

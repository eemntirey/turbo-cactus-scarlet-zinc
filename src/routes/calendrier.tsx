import { createFileRoute } from "@tanstack/react-router";
import { MonthGrid } from "@/components/calendar/month-grid";

export const Route = createFileRoute("/calendrier")({ component: CalendrierPage });

function CalendrierPage() {
  return <MonthGrid />;
}

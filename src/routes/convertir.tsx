import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/convert/converter";

export const Route = createFileRoute("/convertir")({ component: ConvertirPage });

function ConvertirPage() {
  return <Converter />;
}

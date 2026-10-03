import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles.css";
import { TauriApp } from "./tauri-app";

const root = document.getElementById("root");
if (!root) throw new Error("Hepta root element is missing");

createRoot(root).render(
  <StrictMode>
    <TauriApp />
  </StrictMode>,
);

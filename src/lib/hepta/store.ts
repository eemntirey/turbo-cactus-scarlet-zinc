import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_EPOCH_DATE, DEFAULT_EPOCH_TIME, type HourMode } from "./constants.ts";
import { type HeptaConfig, parseClockSeconds, parseLocalDateTime } from "./engine.ts";

type HeptaState = {
  mode: HourMode;
  epochDate: string;
  epochTime: string;
  hydrated: boolean;
  setMode: (mode: HourMode) => void;
  setEpoch: (date: string, time: string) => void;
  resetEpoch: () => void;
  anchorNow: () => void;
  setHydrated: () => void;
  config: () => HeptaConfig;
};

export const useHeptaStore = create<HeptaState>()(
  persist(
    (set, get) => ({
      mode: "real",
      epochDate: DEFAULT_EPOCH_DATE,
      epochTime: DEFAULT_EPOCH_TIME,
      hydrated: false,
      setMode: (mode) => set({ mode }),
      setEpoch: (epochDate, epochTime) => set({ epochDate, epochTime }),
      resetEpoch: () =>
        set({ epochDate: DEFAULT_EPOCH_DATE, epochTime: DEFAULT_EPOCH_TIME }),
      anchorNow: () => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        set({ epochDate: `${y}-${m}-${d}`, epochTime: `${hh}:${mm}:${ss}` });
      },
      setHydrated: () => set({ hydrated: true }),
      config: () => {
        const { mode, epochDate, epochTime } = get();
        return {
          mode,
          epochMs: parseLocalDateTime(epochDate, epochTime),
          epochClockSeconds: parseClockSeconds(epochTime),
        };
      },
    }),
    {
      name: "hepta-settings",
      partialize: (s) => ({
        mode: s.mode,
        epochDate: s.epochDate,
        epochTime: s.epochTime,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function useHeptaConfig(): HeptaConfig {
  const mode = useHeptaStore((s) => s.mode);
  const epochDate = useHeptaStore((s) => s.epochDate);
  const epochTime = useHeptaStore((s) => s.epochTime);
  return {
    mode,
    epochMs: parseLocalDateTime(epochDate, epochTime),
    epochClockSeconds: parseClockSeconds(epochTime),
  };
}

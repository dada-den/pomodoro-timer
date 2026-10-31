import type { Mode } from "./types";

export const durations: Record<Mode, number> = {
    focus: 1500000,
    shortBreak: 300000,
    longBreak: 900000
};

export const FOCUS_SESSIONS_BEFORE_LONG_BREAK = 4;
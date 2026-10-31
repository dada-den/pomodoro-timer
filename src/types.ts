export type Mode = "focus" | "shortBreak" | "longBreak";

export type Status = "idle" | "running" | "paused";

export type TimerState = {
    currentMode: Mode;
    currentStatus: Status;
    remainingTime: number;
    endTimestamp: number | null; //milliseconds
    completedFocusCount: number; //milliseconds
};
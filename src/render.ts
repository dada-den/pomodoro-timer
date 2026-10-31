import type { Mode, TimerState } from "./types";
import { formatTime } from "./format";


const MODE_LABELS: Record<Mode, string> = {
    focus: "Focus",
    shortBreak: "Short Break",
    longBreak: "Long Break"
}

function getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Element not found: ${id}`);
    }
    return element;
}

export function render(state: TimerState): void {
    const modeLabel = getElement("mode-label");
    const timeDisplay = getElement("time-display");
    const toggleBtn = getElement("toggle-button");
    const sessionCount = getElement("session-count");

    modeLabel.textContent = MODE_LABELS[state.currentMode];
    timeDisplay.textContent = formatTime(state.remainingTime);
    toggleBtn.textContent = state.currentStatus === "running" ? "Pause" : "Start";
    sessionCount.textContent = `Completed: ${state.completedFocusCount}`;

    document.body.dataset.mode = state.currentMode;

    document.title = `${formatTime(state.remainingTime)} - ${MODE_LABELS[state.currentMode]}`;
    console.log("render called", state.remainingTime);
}
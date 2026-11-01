import { start, pause, reset, tick } from "./timer";
import type { TimerState } from "./types";
import { render } from "./render";
import { durations } from "./config";
import { saveCount, loadCount } from "./storage";
import { playSessionEnd } from "./sound";
import "./style.css";

let state: TimerState = {
    currentMode: "focus",
    currentStatus: "idle",
    remainingTime: durations["focus"],
    endTimestamp: null,
    completedFocusCount: loadCount()
};

function update(newState: TimerState): void {
    const countChanged = newState.completedFocusCount !== state.completedFocusCount;
    const sessionEnded = newState.currentMode !== state.currentMode;
    state = newState;
    render(state);
    if (countChanged) {
        saveCount(state.completedFocusCount);
    }
    if (sessionEnded) {
        playSessionEnd();
    }
}   

const toggleBtn = document.getElementById("toggle-button");
const resetBtn = document.getElementById("reset-button");

toggleBtn?.addEventListener("click", () => {
    if (state.currentStatus === "running") {
        update(pause(state, Date.now()));
    } else {
        update(start(state, Date.now()));
    }
});

resetBtn?.addEventListener("click", () => {
    update(reset(state));
});

setInterval(() => {
    update(tick(state, Date.now()))
}, 1000);

render(state);


function toggle(): void {
    if (state.currentStatus === "running") {
        return update(pause(state, Date.now()));
    } else {
        return update(start(state, Date.now()));
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        toggle();
    };
});



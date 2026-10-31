import { start, pause, reset, tick } from "./timer";
import type { TimerState } from "./types";
import { render } from "./render";
import { durations } from "./config";
import "./style.css";

let state: TimerState = {
    currentMode: "focus",
    currentStatus: "idle",
    remainingTime: durations["focus"],
    endTimestamp: null,
    completedFocusCount: 0
};

function update(newState: TimerState): void {
    state = newState;
    render(state);
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



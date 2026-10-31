import type { Mode, TimerState } from "./types";
import { durations, FOCUS_SESSIONS_BEFORE_LONG_BREAK } from "./config";

export function start(state: TimerState, now: number): TimerState {
    if (state.currentStatus === "running") {
        return state;
    }
    const nowState: TimerState = { ...state, currentStatus: "running", endTimestamp: now + state.remainingTime };
    return nowState;
}

export function pause(state: TimerState, now: number): TimerState {
    if (state.currentStatus !== "running" || state.endTimestamp === null) {
        return state;
    };

    const nowState: TimerState = { ...state, currentStatus: "paused", 
        remainingTime: Math.max(0, state.endTimestamp - now),  endTimestamp: null };
    return nowState;
}

export function reset(state: TimerState): TimerState {
    return {
        ...state,
        currentStatus: "idle",
        remainingTime: durations[state.currentMode],
        endTimestamp: null
    };
}

export function completeSession(state: TimerState): TimerState {
    if (state.currentMode === "focus") {
        const newCount = state.completedFocusCount + 1;
        const newMode: Mode = newCount % FOCUS_SESSIONS_BEFORE_LONG_BREAK === 0 ? "longBreak": "shortBreak";
        return {
            ...state,
            currentMode: newMode,
            currentStatus: "idle",
            remainingTime: durations[newMode],
            endTimestamp: null,
            completedFocusCount: newCount
        };
    }

    return {
        ...state,
        currentMode: "focus",
        currentStatus: "idle",
        remainingTime: durations["focus"],
        endTimestamp: null,
    };
}

export function tick(state: TimerState, now: number): TimerState {
    if (state.currentStatus !== "running" || state.endTimestamp === null) {
        return state;
    };

    const remaining = state.endTimestamp - now;

    if (remaining <= 0) {
        return completeSession(state);
    };

    return { ...state, remainingTime: remaining }
}
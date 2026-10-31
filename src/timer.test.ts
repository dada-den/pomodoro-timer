import { describe, it, expect } from "vitest";
import type { TimerState } from "./types";
import { start, pause, reset } from "./timer";

describe("start", () => {
    it("sets status to running and calculates endTimestamp", () => {
        const idleState: TimerState = {
            currentMode: "focus",
            currentStatus: "idle",
            remainingTime: 1500000,
            endTimestamp: null,
            completedFocusCount: 0, 
        };

        const result = start(idleState, 1000);

        expect(result.currentStatus).toBe("running");
        expect(result.endTimestamp).toBe(1501000);
    })

    it("returns the same state if already running", () => {
        const runningState: TimerState = {
            currentMode: "focus",
            currentStatus: "running",
            remainingTime: 1500000,
            endTimestamp: 1501000,
            completedFocusCount: 0,
        };

        const result = start(runningState, 5000);

        expect(result).toEqual(runningState);
    });
})

describe("paused", () => {
    it("sets status to paused", () => {
        const pauseState: TimerState = {
            currentMode: "focus",
            currentStatus: "running",
            remainingTime: 1500000,
            endTimestamp: 1501000,
            completedFocusCount: 0
        };

        const result = pause(pauseState, 61000);

        expect(result.currentStatus).toBe("paused");
        expect(result.remainingTime).toBe(1440000);
        expect(result.endTimestamp).toBe(null);
    });

    it("returns the same state if not running", () => {
        const idleState: TimerState = {
            currentMode: "focus",
            currentStatus: "idle",
            remainingTime: 1500000,
            endTimestamp: null,
            completedFocusCount: 0
        };

        const result = pause(idleState, 61000);

        expect(result).toEqual(idleState);
    });
});

describe("reset", () => {
    it("sets to reset", () => {
        const resetState: TimerState = {
            currentMode: "focus",
            currentStatus: "paused",
            remainingTime: 600000,
            endTimestamp: null,
            completedFocusCount: 2
        };

        const result = reset(resetState);

        expect(result.currentStatus).toBe("idle");
        expect(result.remainingTime).toBe(1500000);
        expect(result.endTimestamp).toBe(null);
        expect(result.completedFocusCount).toBe(2);
    });

    it("uses the break duration in shortBreak mode", () => {
        const state: TimerState = {
            currentMode: "shortBreak",
            currentStatus: "paused",
            remainingTime: 100000,
            endTimestamp: null,
            completedFocusCount: 1
        };

        const result = reset(state);

        expect(result.remainingTime).toBe(300000);
    });
});
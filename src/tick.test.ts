import { describe, it, expect } from "vitest";
import { completeSession, tick } from "./tick";
import type { TimerState } from "./types";

describe("completeSession", () => {
    it("move from focus to shortBreak and increment the count", () => {
        const nowState: TimerState = {
            currentMode: "focus",
            currentStatus: "running",
            remainingTime: 0,
            endTimestamp: 1501000,
            completedFocusCount: 0
        }

        const result = completeSession(nowState);

        expect(result.currentMode).toBe("shortBreak");
        expect(result.currentStatus).toBe("idle");
        expect(result.remainingTime).toBe(300000);
        expect(result.endTimestamp).toBe(null);
        expect(result.completedFocusCount).toBe(1);
    });

    it("move from focus to longBreak and increment the count", () => {
        const nowState: TimerState = {
            currentMode: "focus",
            currentStatus: "running",
            remainingTime: 0,
            endTimestamp: 1501000,
            completedFocusCount: 3
        }

        const result = completeSession(nowState);

        expect(result.currentMode).toBe("longBreak");
        expect(result.currentStatus).toBe("idle");
        expect(result.remainingTime).toBe(900000);
        expect(result.endTimestamp).toBe(null);
        expect(result.completedFocusCount).toBe(4);
    });

    it("move from shortBreak to focus and the count dosen't change", () => {
        const nowState: TimerState = {
            currentMode: "shortBreak",
            currentStatus: "running",
            remainingTime: 0,
            endTimestamp: 301000,
            completedFocusCount: 1
        }

        const result = completeSession(nowState);

        expect(result.currentMode).toBe("focus");
        expect(result.currentStatus).toBe("idle");
        expect(result.remainingTime).toBe(1500000);
        expect(result.endTimestamp).toBe(null);
        expect(result.completedFocusCount).toBe(1);
    });

    it("move from longBreak to focus and the count doesn't change", () => {
        const nowState: TimerState = {
            currentMode: "longBreak",
            currentStatus: "running",
            remainingTime: 0,
            endTimestamp: 901000,
            completedFocusCount: 4
        }

        const result = completeSession(nowState);

        expect(result.currentMode).toBe("focus");
        expect(result.currentStatus).toBe("idle");
        expect(result.remainingTime).toBe(1500000);
        expect(result.endTimestamp).toBe(null);
        expect(result.completedFocusCount).toBe(4);
    });
});

describe("tick", () => {
    it("sets state that is not running and the result would be unchanged", () => {
        const nowState: TimerState = {
            currentMode: "focus",
            currentStatus: "idle",
            remainingTime: 1500000,
            endTimestamp: null,
            completedFocusCount: 1
        }

        const result = tick(nowState, 5000);

        expect(result).toEqual(nowState);
    });


    const nowState: TimerState = {
        currentMode: "focus",
        currentStatus: "running",
        remainingTime: 1500000,
        endTimestamp: 1501000,
        completedFocusCount: 0
    }

    it("sets state that is running", () => {
        const result1 = tick(nowState, 61000);
        expect(result1.currentStatus).toBe("running");
        expect(result1.remainingTime).toBe(1440000);
    });

    it("sets state that is running and now is 1501000", () => {
        const result2 = tick(nowState, 1501000);
        expect(result2.currentMode).toBe("shortBreak");
        expect(result2.currentStatus).toBe("idle");
        expect(result2.completedFocusCount).toBe(1);
    });

    it("seets state that is running and now is 1600000", () => {
        const result3 = tick(nowState, 1600000);
        expect(result3.currentMode).toBe("shortBreak");
        expect(result3.currentStatus).toBe("idle");
        expect(result3.completedFocusCount).toBe(1);
    });
})
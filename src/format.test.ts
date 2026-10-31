import { describe, it, expect } from "vitest";
import { formatTime } from "./format";

describe("formatTime", () => {
    it("formats exactly 25 minutes", () => {
        expect(formatTime(1500000)).toBe("25:00");
    });

    it("formats minutes and seconds with padding", () => {
        expect(formatTime(65000)).toBe("01:05");
    });

    it("formats zero", () => {
        expect(formatTime(0)).toBe("00:00");
    });

    it("formats under a minute", () => {
        expect(formatTime(59000)).toBe("00:59");
    });

    it("carries into minutes when rounding up", () => {
        expect(formatTime(59500)).toBe("01:00");
    });

    it("rounds partial seconds up", () => {
        expect(formatTime(24300)).toBe("00:25");
    });

    it("clamps negative input to zero", () => {
        expect(formatTime(-500)).toBe("00:00");
    });
})
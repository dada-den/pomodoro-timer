const STORAGE_KEY = "pomodoro-count";

function today(): string {
    return new Date().toLocaleDateString("en-CA");
}

export function saveCount(count: number): void {
    const data = { date: today(), count: count };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadCount(): number {
    const text = localStorage.getItem(STORAGE_KEY);
    if (text === null) {
        return 0;
    }

    try {
        const data: unknown = JSON.parse(text);
        
        if (
            typeof data === "object" &&
            data !== null &&
            "date" in data &&
            "count" in data &&
            data.date === today() &&
            typeof data.count === "number"
        ) {
            return data.count;
        }
        return 0;
    } catch {
        return 0;
    }
}
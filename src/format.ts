export function formatTime(totalTime: number): string {
    const totalSeconds = Math.ceil(Math.max(0, totalTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const stringMinutes = String(minutes).padStart(2, '0');
    const stringSeconds = String(seconds).padStart(2, '0');

    return `${stringMinutes}:${stringSeconds}`;
}


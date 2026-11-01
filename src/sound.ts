export function playSessionEnd(): void {
    const audio = new Audio("./sound.mp3");
    audio.play().catch(() => {
        
    });
}
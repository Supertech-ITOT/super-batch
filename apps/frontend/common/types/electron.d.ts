export { };

declare global {
    interface Window {
        electron?: {
            minimize(): void;
            maximize(): void;
            close(): void;
            refresh(): void;
            isMaximized(): Promise<boolean>;
        };
    }
}
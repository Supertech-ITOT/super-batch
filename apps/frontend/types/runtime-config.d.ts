export {};

declare global {
  interface Window {
    __SUPERBATCH_CONFIG__?: {
      API_URL: string;
    };
  }
}

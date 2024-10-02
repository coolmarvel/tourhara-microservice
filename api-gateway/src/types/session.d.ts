declare module 'express-session' {
  export interface SessionData {
    sessionId: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
  }
}
export {};

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      isOnBoarded?: boolean;
    };
  }
}

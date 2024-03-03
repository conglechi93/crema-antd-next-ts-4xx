export interface LoginPayload {
  username: string;
  password: number;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface CodeChallengePayload {
  authCode: string | string[] | null;
  codeVerifier: string | string[] | null;
}

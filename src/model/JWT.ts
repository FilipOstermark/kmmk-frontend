export interface JWT {
  userId: string
  sub: string
  name: string
  iat: number
  expiration: number
  // TODO Refresh token, etc.
}

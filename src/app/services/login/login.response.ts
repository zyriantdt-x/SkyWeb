export interface LoginResponse {
    error: string | undefined,
    id: number,
    user_session: string,
    user_ip: string,
    user_agent: string
}
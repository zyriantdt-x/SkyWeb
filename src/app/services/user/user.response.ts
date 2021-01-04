import { RankResponse } from "./rank.response";

export interface UserResponse {
    error: string | undefined,
    id: number,
    username: string,
    rank: RankResponse,
    rank_vip: number,
    credits: number,
    vip_points: number,
    activity_points: number,
    look: string,
    gender: string,
    motto: string,
    online: number | undefined
}
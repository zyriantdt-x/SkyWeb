import { UserResponse } from "./user.response";

export interface StaffResponse {
    error: string | undefined,
    staff: Array<UserResponse>
}
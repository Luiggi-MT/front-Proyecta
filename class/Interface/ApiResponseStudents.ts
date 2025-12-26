import { Students } from "./Students"
export interface ApiResponseStudents {
    ok: boolean;
    students: Students[];
    offset: number;
    count: number;
}
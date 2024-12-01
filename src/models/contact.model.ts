import { Meeting } from "./meeting.model";

export interface Contact {
    id: string;
    name: string;
    organizationName: string;
    email: string;
    phone: string;
    isInterviewSchedule: boolean;
    meeting: Meeting;
    meetings: Meeting[];
}
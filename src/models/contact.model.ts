import { Meeting } from "./meeting.model";

export interface Contact {
    Id: string;
    name: string;
    OrgName: string;
    Email: string;
    Phone: string;
    IsInterviewSchedule: boolean;
    Meeting: Meeting;
    Meetings: Meeting[];
}
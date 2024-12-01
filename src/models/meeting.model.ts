import { Contact } from "./contact.model";

export interface Meeting {
    Id: string;
    OrgName: string;
    Position: string;
    IsRemote: boolean;
    PaymentType: string;
    RateHourlyOrSalary: number;
    POCPhone: string;
    Round: number;
    InterviewDataAndTime: Date;
    ContactId: string;
    Contact: Contact;
    PrimaryContactId: string;
    PrimaryContact: Contact;
}
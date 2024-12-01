import { Contact } from "./contact.model";

export interface Meeting {
    id: string;
    organizationName: string;
    postion: string;
    isRemote: boolean;
    paymentType: string;
    rateHourlyOrSalary: number;
    pocPhone: string;
    round: number;
    interviewDate: Date;
    contactId: string;
    contact: Contact;
    primaryContactId: string;
    primaryContact: Contact;
}
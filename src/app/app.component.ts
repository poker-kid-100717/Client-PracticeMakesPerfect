import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, TrackByFunction } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule, // Add CommonModule here
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  http = inject(HttpClient);

  contactsForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string | null>(null),
    organizationName: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
    isInterviewSchedule: new FormControl<boolean | null>(true),
  });

  contacts$ = this.getContacts();
  trackByContactId!: TrackByFunction<Contact>;

  onFormSubmit() {
    const addContactRequest = {
      id: this.contactsForm.value.id,
      name: this.contactsForm.value.name,
      organizationName: this.contactsForm.value.organizationName,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      isInterviewSchedule: this.contactsForm.value.isInterviewSchedule,
    };

    if (addContactRequest.id) {
      this.http.put(`https://localhost:7079/api/Contacts/${addContactRequest.id}`, addContactRequest).subscribe({
        next: () => {
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        }
      });
    } else {
      this.http.post('https://localhost:7079/api/Contacts', addContactRequest).subscribe({
        next: () => {
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        }
      });
    }
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7079/api/Contacts');
  }

  onEditContact(contact: Contact) {
    this.contactsForm.setValue({
      id: contact.id,
      name: contact.name,
      organizationName: contact.organizationName,
      email: contact.email,
      phone: contact.phone,
      isInterviewSchedule: contact.isInterviewSchedule,
    });
  }

  onDeleteContact(contactId: string) {
    this.http.delete(`https://localhost:7079/api/Contacts/${contactId}`).subscribe({
      next: () => {
        console.log(`Contact with ID ${contactId} deleted successfully.`);
        // Refresh the contacts list
        this.contacts$ = this.getContacts();
      },
      error: (err) => {
        console.error('Failed to delete contact:', err);
      },
    });
  }
}
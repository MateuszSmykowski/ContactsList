import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Contact, ContactToSave } from './data/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl: string;

  constructor(private restClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllContacts(): Promise<Contact[]> {
    return this.restClient.get<Contact[]>(this.baseUrl + 'api/contacts').toPromise();
  }

  getContact(contactId: number): Promise<Contact> {
    return this.restClient.get<Contact>(this.baseUrl + 'api/contacts/' + contactId).toPromise();
  }

  updateContact(newContactData: ContactToSave): Promise<any> {
    return this.restClient.put(this.baseUrl + 'api/contacts/update', newContactData)
      .toPromise();
  }

  removeContact(contactId: number): Promise<any> {
    return this.restClient.delete(this.baseUrl + 'api/contacts/' + contactId)
      .toPromise();
  }

  addContact(newContactData: ContactToSave): Promise<any> {
    return this.restClient.post(this.baseUrl + 'api/contacts/create', newContactData)
      .toPromise();
  }
}

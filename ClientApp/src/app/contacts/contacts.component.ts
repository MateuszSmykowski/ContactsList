import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../data/contact';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contactsData!: Contact[];
  public isAuthenticated!: Observable<boolean>;
  public expanded: Map<Contact, boolean> = new Map();
  

  constructor(private contactsService: ContactsService,
    private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.updateContactsList();
  }

  delete(id: number) {
    this.contactsService.removeContact(id).then(() => this.updateContactsList())
      .catch((error) => {
        console.error('delete contact error ' + error);
      });
  }

  toggleExpand(contact: Contact) {
    if (this.expanded.get(contact))
      this.expanded.set(contact, false);
    else
      this.expanded.set(contact, true);
  }

  updateContactsList() {
    this.contactsService.getAllContacts().then((retrievedData: Contact[]) => {
      this.contactsData = retrievedData;
      this.clearExpanded();
    }).catch((error) => {
      console.error('fetch contacts error ' + error);
    });
  }

  clearExpanded() {
    this.expanded.clear();
    for (let contact of this.contactsData) {
      this.expanded.set(contact, false);
    }
  }

}

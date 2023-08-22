import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  public data: object[] = [];

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().then((value: object[]) => { this.data = value; });
  }

}

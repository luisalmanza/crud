import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface details {
  data: Object[]
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})

export class ContactsComponent implements OnInit {

  contacts: Object[];
  contact: Object;
  response: Object;

  constructor(private data: DataService) {
    this.contact = {
      first_name: "",
      last_name: ""
    };
  }

  ngOnInit() {
    this.data.getContacts(1).subscribe(
      (result: details) => {
        this.contacts = result.data.slice();
        this.data.getContacts(2).subscribe(
          (result: details) => Array.prototype.push.apply(this.contacts, result.data.slice())
        );
      }
    );

  }

  edit(id: number) {
    this.data.getContact(id).subscribe(
      (result: details) => this.contact = JSON.parse(JSON.stringify(result.data))
    );
  }

  delete(id: number) {
    this.data.deleteContact(id).subscribe(
      result => this.response = JSON.stringify(result)
    );
  }

  add() {
    this.contact['id'] = null;
    this.contact['avatar'] = null;
    this.contact['first_name'] = (<HTMLInputElement>document.getElementById('afirst_name')).value;
    this.contact['last_name'] = (<HTMLInputElement>document.getElementById('alast_name')).value;
    this.contact['email'] = (<HTMLInputElement>document.getElementById('aemail')).value;
    this.data.postContact(this.contact).subscribe(
      result => this.response = JSON.stringify(result)
    );
    (<HTMLInputElement>document.getElementById('afirst_name')).value = "";
    (<HTMLInputElement>document.getElementById('alast_name')).value = "";
    (<HTMLInputElement>document.getElementById('aemail')).value = "";
    this.contacts.push({ first_name: "Contact" });
  }

  get fullName(): string {
    return `${this.contact['first_name']} ${this.contact['last_name']}`;
  }

  save(id: number) {
    this.contact['first_name'] = (<HTMLInputElement>document.getElementById('first_name')).value;
    this.contact['last_name'] = (<HTMLInputElement>document.getElementById('last_name')).value;
    this.contact['email'] = (<HTMLInputElement>document.getElementById('email')).value;
    this.data.putContact(id, this.contact).subscribe(
      result => this.response = JSON.stringify(result)
    );
    this.contacts[id - 1] = JSON.parse(JSON.stringify(this.contact));
  }

  selectContact(id: number) {
    this.data.getContact(id).subscribe(
      (result: details) => this.contact = JSON.parse(JSON.stringify(result.data))
    );
  }

}

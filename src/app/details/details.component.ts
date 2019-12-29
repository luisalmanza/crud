import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";

interface details {
  data: Object
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})

export class DetailsComponent implements OnInit {

  contact: Object;
  id: number;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.contact = {
      first_name: "",
      last_name: ""
    };

    this.route.params.subscribe(
      result => this.id = result.id
    );
  }

  ngOnInit() {
    this.data.getContact(this.id).subscribe(
      (result: details) => this.contact = JSON.parse(JSON.stringify(result.data))
    );
  }

  get fullName(): string {
    return `${this.contact['first_name']} ${this.contact['last_name']}`;
  }

}

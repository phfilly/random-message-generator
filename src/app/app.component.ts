import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'message-generator';
  items = [];
  retrieved = false;
  category: string;

  constructor(public db: AngularFirestore) { }

  async ngOnInit() { }

  async getMessage(category) {
    this.category = category;
    await this.getItems()
    .subscribe(result => {
      this.items = result
      .map((x) => x.payload.doc.data())
      .filter((item) => item['category'] === this.category);

      this.retrieved = true;
      console.log(this.items);
    });
  }

  getItems() {
    return this.db.collection('messages').snapshotChanges();
  }
}

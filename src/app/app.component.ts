import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'message-generator';
  items = [];
  retrieved = false;
  category: string;

  constructor(public db: AngularFirestore) { }

  async ngOnInit() { }

  async getMessage(category: string) {
    this.category = category;
    this.items = [];
    const docRef = this.db.collection('/messages',
      ref => ref.where('category', '==', this.category)).snapshotChanges();

    docRef.subscribe((doc) => {
      this.items = [];
      const tmp = [];
      doc.forEach((message) => {
        tmp.push(message.payload.doc.data());
      });
      this.items.push(tmp[this.randomIndex(tmp.length)]);
      this.retrieved = true;
    });
  }

  randomIndex(size: number) {
    return Math.floor((Math.random() * size));
  }

  getItems() {
    return this.db.collection('messages').snapshotChanges();
  }

  reset() {
    this.retrieved = false;
    this.items = [];
  }
}

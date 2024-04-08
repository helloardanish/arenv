import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { appConfig } from '../app.config';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Item {
  name: string;
}

@Component({
  selector: 'app-test',
  template: `
    <ul>
      <li *ngFor="let item of item$ | async">
        {{ item.name }}
      </li>
    </ul>
  `,
  styleUrls: ['./test.component.css'],
  providers: [
  ]
})
export class TestComponent {
  //item$: Observable<Item[]>;
  //firestore: Firestore = inject(Firestore);
/*
  constructor() {
    const itemCollection = collection(this.firestore, 'env');
    // Explicitly cast the collection data to Item[]
    this.item$ = collectionData(itemCollection) as Observable<Item[]>;

    console.log("Data:"+this.item$);
  }
*/

  constructor(private firestore: AngularFirestore) {
    

    console.log("Loaded:");
  }


  subscription: any;

  ngOnInit() {
    this.subscription = this.firestore.collection('env').valueChanges().subscribe(data => {
      console.log("Data"+data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.toDoList = this.firebasedb.list('Tasks');
    return this.toDoList;
  }

  addTitle(form) {
    this.toDoList.push({
      title: form[0],
      Description: form[1],
      Date: form[2],
      Notification: form[3],
      Color: form[4],
      isChecked: false,
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }
}

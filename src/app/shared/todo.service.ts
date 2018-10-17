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

  addNewToDo(form) {
    const Time = new Date()
      .toLocaleString('en-US', {hour: 'numeric', hour12: true})
      .toLowerCase();
    this.toDoList.push({
      Title: form[0],
      Description: form[1],
      Date: form[2],
      Time: Time,
      Notification: form[3],
      Color: form[4],
      IsChecked: false,
    });
  }

  checkOrUnCheckToDo($key: string, flag: boolean) {
    console.log(this.toDoList);
    // this.toDoList.
    this.toDoList.update($key, {isChecked: flag});
  }

  removeToDo($key: string) {
    this.toDoList.remove($key);
  }
}

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  toDoList: any;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.toDoList = this.firebasedb.list('Tasks');
    return this.toDoList;
  }

  addNewToDo(form) {
    const hours = new Date().getHours();
    const date: any = new Date(form[2]);
    date.setHours(hours);
    const parseTime = Date.parse(date);
    this.toDoList.push({
      title: form[0],
      description: form[1],
      dateTime: parseTime,
      notification: form[3],
      color: form[4],
      checked: false,
    });
  }

  checkOrUnCheckToDo(id: string, flag: boolean) {
    this.toDoList.update(id, {checked: flag});
  }

  removeToDo(id: string) {
    this.toDoList.remove(id);
  }
}

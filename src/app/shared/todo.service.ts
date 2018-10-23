import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  toDoList: any;
  constructor(private firebasedb: AngularFireDatabase) {}

  getTasksList() {
    this.toDoList = this.firebasedb.list('Tasks');
    return this.toDoList;
  }

  addTask(value) {
    const date: any = new Date(value.form_date);
    date.setHours(new Date().getHours());
    const parseTime = Date.parse(date);
    this.toDoList.push({
      title: value.form_title,
      description: value.form_description,
      dateTime: parseTime,
      notification: value.form_notify,
      color: value.form_color,
      checked: false,
    });
  }

  toggleTask(id: string, flag: boolean) {
    this.toDoList.update(id, {checked: flag});
  }

  removeTask(id: string) {
    this.toDoList.remove(id);
  }
}

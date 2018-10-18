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
    const Time = new Date().getHours();
    const Fulldate: any = new Date(form[2]);
    Fulldate.setHours(Time);
    const ParseTime = Date.parse(Fulldate);
    // const date = new Date(ParseTime);
    //
    this.toDoList.push({
      Title: form[0],
      Description: form[1],
      DateTime: ParseTime,
      Notification: form[3],
      Color: form[4],
      IsChecked: false,
    });
  }

  checkOrUnCheckToDo($key: string, flag: boolean) {
    console.log(this.toDoList);
    // this.toDoList.
    this.toDoList.update($key, {IsChecked: flag});
  }

  removeToDo($key: string) {
    this.toDoList.remove($key);
  }
}

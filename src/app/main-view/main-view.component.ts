import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  Monthly = true;
  ToDoMonthly: any[];
  ToDoDaily: any[];
  DeleteId: any;
  Title: any;
  Date: any;
  Description: any;
  Checked: any;
  Color: any;
  date: any;
  Time: any;
  modalDelete: any;
  modalAdd: any;
  constructor(
    private toDoService: TodoService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const date = new Date();
    const MonthNow = date.getMonth() + 1;
    const DayNow = date.getDate();
    this.toDoService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.ToDoDaily = [];
        this.ToDoMonthly = [];
        item.forEach(element => {
          const x: any = element.payload.toJSON();
          const ToDoDate = new Date(x.DateTime);
          const ToDoMonth = ToDoDate.getMonth() + 1;
          const ToDoDay = ToDoDate.getDate();
          if (ToDoDay === DayNow) {
            x['$key'] = element.key;
            this.ToDoDaily.push(x);
          }
          if (ToDoMonth === MonthNow) {
            x['$key'] = element.key;
            this.ToDoMonthly.push(x);
          }
        });
        this.ToDoMonthly.sort((a, b) => {
          return a.DateTime - b.DateTime;
        });
        this.ToDoMonthly.sort((a, b) => {
          return a.IsChecked - b.IsChecked;
        });
        this.ToDoDaily.sort((a, b) => {
          const AToDoHours = new Date(a.DateTime).getHours();
          const BToDoHours = new Date(b.DateTime).getHours();
          return AToDoHours - BToDoHours;
        });
        this.ToDoDaily.sort((a, b) => {
          return a.IsChecked - b.IsChecked;
        });
      });
  }

  AddNewTask(e) {
    const Form = [];
    Form.push(e.srcElement[0].value);
    Form.push(e.srcElement[1].value);
    Form.push(e.srcElement[2].value);
    Form.push(e.srcElement[3].value);
    Form.push(e.srcElement[4].value);
    this.toDoService.addNewToDo(Form);
    this.modalAdd.close();
    return false;
  }

  deleteModal(key: any, content) {
    this.Title = key.Title;
    this.DeleteId = key.$key;
    this.Date = key.Date;
    this.Description = key.Description;
    this.Color = key.Color;
    this.Checked = key.IsChecked;
    this.Time = key.Time;
    this.modalDelete = this.modalService.open(content, {centered: true});
  }

  addModal(content) {
    this.modalAdd = this.modalService.open(content, {centered: true});
  }

  alterCheck($key: string, IsChecked) {
    this.toDoService.checkOrUnCheckToDo($key, !IsChecked);
  }

  onDelete(DeleteId: any) {
    this.toDoService.removeToDo(DeleteId);
    this.modalDelete.close();
  }

  switchDaily(status) {
    this.date = new Date();
    if (status === true) {
      this.Monthly = true;
    } else {
      this.Monthly = false;
    }
  }
}

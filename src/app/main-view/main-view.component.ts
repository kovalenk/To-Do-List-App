import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  Monthly: boolean = true;
  toDoListArray: any[];
  DeleteId: any;
  Title: any;
  Date: any;
  Description: any;
  Checked: any;
  Color: any;
  day: any;
  month: any;
  year: any;
  constructor(
    private toDoService: TodoService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.toDoService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  AddNewTask(e) {
    console.log('1');
    const Form = [];
    Form.push(e.srcElement[1].value);
    Form.push(e.srcElement[2].value);
    Form.push(e.srcElement[3].value);
    Form.push(e.srcElement[4].value);
    Form.push(e.srcElement[5].value);
    this.toDoService.addTitle(Form);
    return false;
    // modal dismiss
  }

  deleteModal(key: any, content) {
    this.Title = key.title;
    this.DeleteId = key.$key;
    this.Date = key.Date;
    this.Description = key.Description;
    this.Color = key.Color;
    this.Checked = key.isChecked;
    this.modalService.open(content, {centered: true});
  }
  addModal(content) {
    this.modalService.open(content, {centered: true});
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete(DeleteId: any) {
    this.toDoService.removeTitle(DeleteId);
    //toggle
  }

  switchDaily(status) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date();
    this.day = date.getDate() + 'th';
    this.month = monthNames[date.getMonth()];
    this.year = date.getFullYear();
    if (status == true) {
      this.Monthly = true;
    } else {
      this.Monthly = false;
    }
  }
}

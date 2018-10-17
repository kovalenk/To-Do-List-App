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
  ToDoMonthly: any[];
  ToDodaily: any[];
  DeleteId: any;
  Title: any;
  Date: any;
  Description: any;
  Checked: any;
  Color: any;
  date: any;
  constructor(
    private toDoService: TodoService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const DayNow = new Date().toISOString().split('T')[0];
    this.toDoService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.ToDodaily = [];
        item.forEach(element => {
          let x:any = element.payload.toJSON();
          console.log(x.Date);
          if (x.Date === DayNow){
            x['$key'] = element.key;
            this.ToDodaily.push(x);
          }
        });
        this.ToDodaily.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  AddNewTask(e) {
    console.log('1');
    const Form = [];
    Form.push(e.srcElement[0].value);
    Form.push(e.srcElement[1].value);
    Form.push(e.srcElement[2].value);
    Form.push(e.srcElement[3].value);
    Form.push(e.srcElement[4].value);
    this.toDoService.addTitle(Form);
    return false;
    // modal dismiss
  }

  deleteModal(key: any, content) {
    this.Title = key.Title;
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
    this.date = new Date();
    if (status == true) {
      this.Monthly = true;
    } else {
      this.Monthly = false;
    }
  }
}

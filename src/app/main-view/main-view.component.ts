import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  addForm = new FormGroup({
    form_title: new FormControl(''),
    form_description: new FormControl(''),
    form_date: new FormControl(''),
    form_notify: new FormControl(''),
    form_color: new FormControl('#50DBE3')
  });
  monthly = true;
  daily_tasks: any[];
  monthly_tasks: any[];
  deleteId: any;
  title: any;
  dateTime: any;
  description: any;
  checked: any;
  color: any;
  dateNow: any;
  modalDelete: any;
  modalAdd: any;
  constructor(
    private toDoService: TodoService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.dateNow = new Date();
    const monthNow = this.dateNow.getMonth() + 1;
    const dayNow = this.dateNow.getDate();
    this.toDoService
      .getTasksList()
      .snapshotChanges()
      .subscribe(item => {
        this.daily_tasks = [];
        this.monthly_tasks = [];
        item.forEach(element => {
          const x: any = element.payload.toJSON();
          const taskDate = new Date(x.dateTime);
          const taskMonth = taskDate.getMonth() + 1;
          const taskDay = taskDate.getDate();
          if (taskDay === dayNow) {
            x['id'] = element.key;
            this.daily_tasks.push(x);
          }
          if (taskMonth === monthNow) {
            x['id'] = element.key;
            this.monthly_tasks.push(x);
          }
        });
        this.monthly_tasks.sort((a, b) => {
          return new Date(a.dateTime).getDate() - new Date(b.dateTime).getDate();
        });
        this.daily_tasks.sort((a, b) => {
          return new Date(a.dateTime).getHours() - new Date(b.dateTime).getHours();
        });
        console.table(this.monthly_tasks);
      });
  }

  addNewTask(form) {
    this.toDoService.addTask(form.value);
    this.modalAdd.close();
  }

  deleteModal(info: any, content) {
    this.title = info.title;
    this.deleteId = info.id;
    this.dateTime = info.dateTime;
    this.description = info.description;
    this.color = info.color;
    this.checked = info.checked;
    this.modalDelete = this.modalService.open(content, {centered: true});
  }

  addModal(content) {
    this.modalAdd = this.modalService.open(content, {centered: true});
  }

  toggleCheck(id: string, checked) {
    this.toDoService.toggleTask(id, !checked);
  }

  onDelete(deleteId: any) {
    this.toDoService.removeTask(deleteId);
    this.modalDelete.close();
  }

  switchDaily(status) {
    this.monthly = status;
  }
}

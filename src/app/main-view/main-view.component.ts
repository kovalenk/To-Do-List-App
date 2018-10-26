import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {FormBuilder} from '@angular/forms';
import {ModalDirective} from "angular-bootstrap-md";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  @ViewChild('viewModal') viewModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('addModal') addModal: ModalDirective;
  addForm = this.fb.group({
    form_title: [''],
    form_description: [''],
    form_date: ['04 Feb 2018'],
    form_notify: [''],
    form_color: ['#50DBE3']
  });
  monthly = true;
  daily_tasks: any[];
  monthly_tasks: any[];
  data: {};
  dateNow: any;
  constructor(
    private fb: FormBuilder,
    private toDoService: TodoService) { }

  ngOnInit() {
    this.dateNow = new Date();
    const [monthNow, dayNow] = [this.dateNow.getMonth() + 1, this.dateNow.getDate()];
    this.toDoService
      .getTasksList()
      .snapshotChanges()
      .subscribe(item => {
        this.daily_tasks = [];
        this.monthly_tasks = [];
        item.forEach(element => {
          const x: any = element.payload.toJSON();
          const taskDate = new Date(x.dateTime);
          const [taskMonth, taskDay] = [taskDate.getMonth() + 1, taskDate.getDate()];
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
      });
  }

  addNewTask(form) {
    this.toDoService.addTask(form.value);
    this.addForm.patchValue({
      form_title: '',
      form_description: '',
      form_date: '',
      form_notify: '',
      form_color: '#50DBE3'
    });
    this.addModal.hide();
  }

  modalOpen(item, type) {
    this.data = item;
    if(type === "view"){
      this.viewModal.show();
    }
    else{
      this.deleteModal.show();
    }
  }
  toggleCheck(id: string, checked) {
    this.toDoService.toggleTask(id, !checked);
  }

  onDelete(deleteId) {
    this.toDoService.removeTask(deleteId);
    this.deleteModal.hide();
  }

  switchDaily(status) {
    this.monthly = status;
  }
}

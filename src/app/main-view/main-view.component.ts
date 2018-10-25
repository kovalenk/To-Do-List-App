import {Component, OnInit, Inject} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
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
    private fb: FormBuilder,
    private toDoService: TodoService,
    private modalService: NgbModal
  ) { }
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
    this.modalAdd.close();
    this.addForm.patchValue({
      form_title: '',
      form_description: '',
      form_date: '04 Feb 2018',
      form_notify: '',
      form_color: '#50DBE3'
    });
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

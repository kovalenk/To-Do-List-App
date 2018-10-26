import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MainViewComponent implements OnInit {
  @ViewChild('viewModal')
  viewModal: ModalDirective;
  @ViewChild('deleteModal')
  deleteModal: ModalDirective;
  @ViewChild('addModal')
  addModal: ModalDirective;
  dateNow = new Date();
  addForm = this.fb.group({
    form_title: [''],
    form_description: [''],
    form_date: [this.dateNow],
    form_notify: [''],
    form_color: ['#50DBE3'],
  });
  monthly = true;
  daily_tasks: any[];
  monthly_tasks: any[];
  data: {};
  windowWidth: any;
  constructor(private fb: FormBuilder, private toDoService: TodoService) {}

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    const [monthNow, dayNow] = [
      this.dateNow.getMonth() + 1,
      this.dateNow.getDate(),
    ];
    this.toDoService
      .getTasksList()
      .snapshotChanges()
      .subscribe(item => {
        this.daily_tasks = [];
        this.monthly_tasks = [];
        item.forEach(element => {
          const x: any = element.payload.toJSON();
          const taskDate = new Date(x.dateTime);
          const [taskMonth, taskDay] = [
            taskDate.getMonth() + 1,
            taskDate.getDate(),
          ];
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
          return (
            new Date(a.dateTime).getDate() - new Date(b.dateTime).getDate()
          );
        });
        this.daily_tasks.sort((a, b) => {
          return (
            new Date(a.dateTime).getHours() - new Date(b.dateTime).getHours()
          );
        });
      });
  }

  addNewTask(form) {
    this.toDoService.addTask(form.value);
    this.addForm.patchValue({
      form_title: '',
      form_description: '',
      form_date: this.dateNow,
      form_notify: '',
      form_color: '#50DBE3',
    });
    this.addModal.hide();
  }

  modalOpen(item, type) {
    this.data = item;
    if (type === 'view') {
      this.viewModal.show();
    } else {
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

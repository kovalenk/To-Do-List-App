import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  monthly = true;
  daily_tasks: any[];
  monthly_tasks: any[];
  deleteId: any;
  title: any;
  dateTime: any;
  description: any;
  checked: any;
  color: any;
  date: any;
  modalDelete: any;
  modalAdd: any;
  constructor(
    private toDoService: TodoService,
    private modalService: NgbModal
  ) {
    console.log(window.location.href);
    NgbModalRef.prototype['c'] = NgbModalRef.prototype.close;
    NgbModalRef.prototype.close = function(reason: string) {
      document.querySelector('.modal-backdrop').classList.remove('show');
      document.querySelector('.modal').classList.remove('show');
      setTimeout(() => {
        this['c'](reason);
      }, 500);
    };
    NgbModalRef.prototype['d'] = NgbModalRef.prototype.dismiss;
    NgbModalRef.prototype.dismiss = function(reason: string) {
      document.querySelector('.modal-backdrop').classList.remove('show');
      document.querySelector('.modal').classList.remove('show');
      setTimeout(() => {
        this['d'](reason);
      }, 500);
    };
  }

  ngOnInit() {
    this.date = new Date();
    const monthNow = this.date.getMonth() + 1;
    const dayNow = this.date.getDate();
    this.toDoService
      .getToDoList()
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
          const AToDoDays = new Date(a.dateTime).getDate();
          const BToDoDays = new Date(b.dateTime).getDate();
          console.log(AToDoDays, BToDoDays);
          return AToDoDays - BToDoDays;
        });
        // this.monthly_tasks.sort((a, b) => {
        //   return a.IsChecked - b.IsChecked;
        // });
        this.daily_tasks.sort((a, b) => {
          const AToDoHours = new Date(a.dateTime).getHours();
          const BToDoHours = new Date(b.dateTime).getHours();
          return AToDoHours - BToDoHours;
        });
        // this.daily_tasks.sort((a, b) => {
        //   return a.IsChecked - b.IsChecked;
        // });
      });
  }

  addNewTask(e) {
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

  alterCheck(id: string, checked) {
    this.toDoService.checkOrUnCheckToDo(id, !checked);
  }

  onDelete(deleteId: any) {
    this.toDoService.removeToDo(deleteId);
    this.modalDelete.close();
  }

  switchDaily(status) {
    this.monthly = status;
  }
}

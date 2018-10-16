import {Component, OnInit} from '@angular/core';
import {TodoService} from "../shared/todo.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-monthly-view',
  templateUrl: './monthly-view.component.html',
  styleUrls: ['./monthly-view.component.css']
})
export class MonthlyViewComponent implements OnInit {
  toDoListArray: any[];
  DeleteId: any;
  Date: any;
  Description: any;
  Checked: any;
  Color:any;
  public close: any;
  constructor(private toDoService: TodoService, private modalService: NgbModal) {
  }

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
    this.close = this.toDoService.addTitle(Form);
    return false;
    // modal dismiss
  }

  deleteModal(key: any, content) {
    this.DeleteId = key.$key;
    this.Date= key.Date;
    this.Description= key.Description;
    this.Color = key.Color;
    this.Checked = key.isChecked;
    this.modalService.open(content, { centered: true });
  }
  addModal(content) {
    this.modalService.open(content, { centered: true });
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete(DeleteId: any) {
    this.toDoService.removeTitle(DeleteId);
    //toggle
  }
}

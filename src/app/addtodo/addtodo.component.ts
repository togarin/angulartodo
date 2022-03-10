import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService, Todo } from '../services/todos.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss'],
})
export class AddtodoComponent implements OnInit {
  form!: FormGroup;
  todos: Todo[] = [];
  editableTodo!: Todo;

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.form = new FormGroup({
      todoTitle: new FormControl('', Validators.required),
    });
    this.todoService.read().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (error) => console.log(error)
    );
  }

  onsubmit() {
    const { todoTitle } = this.form.value;
    const todo: Todo = {
      todoTitle,
    };
    this.todoService.add(todo).subscribe(
      (todo) => {
        this.todos.push(todo);
        this.form.reset();
      },
      (error) => console.log(error)
    );
  }

  edit(todo: Todo) {
    // this.editableTodo = new Todo;
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(
      () => {
        this.todos = this.todos.filter((todoItem) => todoItem.id !== todo.id);
      },
      (error) => console.log(error)
    );
  }
}

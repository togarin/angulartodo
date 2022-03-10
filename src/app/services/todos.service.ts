import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Response {
  name: string;
}
export interface Todo {
  id?: string;
  todoTitle: string;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  static url =
    'https://angtd-3c6c4-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Response>(`${TodosService.url}.json`, todo).pipe(
      map((response) => {
        return { ...todo, id: response.name };
      })
    );
  }

  read(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${TodosService.url}.json`).pipe(
      map((todos) => {
        if (!todos) {
          return [];
        }
        return Object.keys(todos).map((key) => ({ ...todos[key], id: key }));
      })
    );
  }

  // ?
  updateTodo(id: string, todo: Todo): Observable<Todo> {
    const urlParams = new HttpParams().set('id', id);
    return this.http.put<Todo>(TodosService.url, todo, {
      params: urlParams,
    });
  }

  delete(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${TodosService.url}/${todo.id}.json`);
  }
}

/**
 * Created by sesha on 7/26/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TodoComponent} from './todo/todo.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';

const APP_ROUTES: Routes = [
  {path: 'todo', component : TodoComponent},
  {path: 'todoList', component : TodoListComponent},
  {path: 'website', component: WebsiteListComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

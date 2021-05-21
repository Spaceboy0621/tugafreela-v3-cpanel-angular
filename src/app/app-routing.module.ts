import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module')
        .then(a => a.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

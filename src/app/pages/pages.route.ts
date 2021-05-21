import { DisputesComponent } from './disputes/disputes.component';
import { DisputeComponent } from './disputes/components/dispute/dispute.component';
import { AuthGuard } from './../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routerConfig: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { 
        path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'disputes', 
        component: DisputesComponent, 
        canActivate: [AuthGuard] 
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

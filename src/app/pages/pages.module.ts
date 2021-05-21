import { LoaderComponent } from './../components/loader/loader.component';
import { UserService } from './../services/user.service';
import { JobService } from './../services/job.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './../services/auth.interceptor';
import { DisputeService } from './../services/dispute.service';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { PagesRoutingModule } from './pages.route';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisputeComponent } from './disputes/components/dispute/dispute.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DisputesComponent } from './disputes/disputes.component';
import { MessageClientComponent } from './disputes/components/message-client/message-client.component';
import { MessageFreelaComponent } from './disputes/components/message-freela/message-freela.component';




@NgModule({
  declarations: [
    DisputeComponent, 
    HomeComponent, 
    LoginComponent, 
    PagesComponent,
    SidebarComponent,
    NavbarComponent,
    DisputesComponent,
    LoaderComponent,
    MessageClientComponent,
    MessageFreelaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    NgbModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    DisputeService,
    JobService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class PagesModule { }

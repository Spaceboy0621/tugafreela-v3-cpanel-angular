import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  isToogled: boolean = false;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.sidebarService.currentState.subscribe(a => this.isToogled = a);
  }

}

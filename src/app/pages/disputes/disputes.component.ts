import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { JobService } from '../../services/job.service';
import { DisputeService } from '../../services/dispute.service';
import { Dispute } from '../../models/dispute.model';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-disputes',
  templateUrl: './disputes.component.html',
  styleUrls: ['./disputes.component.scss']
})
export class DisputesComponent implements OnInit {

  disputes: Dispute[] = [];
  dispute: Dispute = new Dispute();
  disputesToShow: Dispute[] = [];
  ready: boolean = false;
  job: Job = new Job();
  user: User = new User();

  percentage_client: number = 0;
  percentage_freela: number = 0;
  value_client: number = 0;
  value_freela: number = 0;

  disputeSelected: number = 0;

  listDisputesToggled: boolean = true;

  constructor(
    private disputeService: DisputeService,
    private jobService: JobService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
    this.getAllDisputes();

  }

  getAllDisputes() {
    this.disputeService.getAll().subscribe(
      success => {
        this.disputes = success;
        this.filterDisputesByPhase();
      }, 
      error => { 
        console.error();
      }
    )
  }

  filterDisputesByPhase() {
    this.disputes.forEach((item, index) => {
      const phase = new Dispute(item).getPhase();
      this.disputes[index].phase = phase;
    });
    this.disputesToShow = this.disputes.filter(item => (item.status === 'open'));
    
    this.getDisputeInfos();
  }

  getDisputeInfos() {
    for (const [index, item] of this.disputesToShow.entries()) {
      if (typeof item.job === 'number') {
        this.jobService.getById(item.job).subscribe(
          success => {
            this.job = success;
  
            if (typeof this.job.freelancer === 'number') {
              this.userService.getById(this.job.freelancer).subscribe(
                success => this.job.freelancer = success,
                error => console.error('Erro ao recuperar dados de freelancer', error)
              )
            }
            if (typeof this.job.owner === 'number') {
              this.userService.getById(this.job.owner).subscribe(
                success => this.job.owner = success,
                error => console.error('Erro ao recuperar dados de owner', error)
              )
            }

            this.disputesToShow[index].job = this.job;
          },
          error => console.error(error)
        )
      }
      else {
        this.job = item.job;
        
        if (typeof this.job.freelancer === 'number') {
          this.userService.getById(this.job.freelancer).subscribe(
            success => this.job.freelancer = success,
            error => console.error('Erro ao recuperar dados de freelancer', error)
          )
        }
        if (typeof this.job.owner === 'number') {
          this.userService.getById(this.job.owner).subscribe(
            success => this.job.owner = success,
            error => console.error('Erro ao recuperar dados de owner', error)
          )
        }

        this.disputesToShow[index].job = this.job;
      }
    }

    this.dispute = this.disputesToShow[0];
    this.ready = true;
  }

  selectDispute(event: any){
    const id = event.target.id;

    if (this.disputeSelected !== 0 && this.disputeSelected !== id) {
      this.unSelectDispute();
    }


    const itemClass = `dispute${id}`;

    const item = document.getElementsByClassName(itemClass)[0];

    item.classList.toggle('dispute-selected');

    this.disputeSelected = id;
    this.dispute = this.disputesToShow.filter(item => item.id == this.disputeSelected)[0];
    this.listDisputesToggled = false;

  }

  unSelectDispute() {

    const itemClass = `dispute${this.disputeSelected}`;

    const item = document.getElementsByClassName(itemClass)[0];

    item.classList.remove('dispute-selected');
  }
}

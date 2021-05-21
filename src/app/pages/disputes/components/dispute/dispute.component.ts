import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { JobService } from '../../../../services/job.service';
import { DisputeService } from '../../../../services/dispute.service';
import { Dispute } from '../../../../models/dispute.model';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent implements OnInit {

  @Input() dispute: Dispute = new Dispute();
  @Input() job: Job = new Job();
  ready: boolean = false;
  user: User = new User();

  percentage_client: number = 0;
  percentage_freela: number = 0;
  value_client: number = 0;
  value_freela: number = 0;
  decision: string = '';
  justification: string = '';

  constructor(
    private disputeService: DisputeService,
    private jobService: JobService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
    this.getDisputeInfos();
  }

  getDisputeInfos() {
    for (const [index, item] of this.dispute.messages.entries()) {
      if (typeof item.user === 'number') {
        this.userService.getById(item.user).subscribe(
          success => {
            this.dispute.messages[index].user = success;
            
          },
          error => {
            console.error(['Erro ao recuperar dados do usuário', error])
          }
        )
      }
    }
    this.ready = true;
  }

  calculateValueProposal() {
    if (this.percentage_client === 0 || this.percentage_freela === 0) {
      alert('Por favor, preencha as porcentagens');
      return;
    }

    if ((this.percentage_client + this.percentage_freela) > 100) {
      alert('Porcentagens incorretas');
      return;
    }

    this.value_client = this.job.agreed_value * (this.percentage_client / 100);
    this.value_freela = this.job.agreed_value * (this.percentage_freela / 100);
  }

  autoFillFields() {
    if (this.decision === 'fechado_a_favor_do_cliente') {
      this.percentage_freela = 0;
      this.percentage_client = 100;

      this.value_client = this.job.agreed_value * (this.percentage_client / 100);
      this.value_freela = this.job.agreed_value * (this.percentage_freela / 100);
    }
    if (this.decision === 'fechado_a_favor_do_freelancer') {
      this.percentage_freela = 100;
      this.percentage_client = 0;

      this.value_client = this.job.agreed_value * (this.percentage_client / 100);
      this.value_freela = this.job.agreed_value * (this.percentage_freela / 100);
    }
    if (this.decision === 'fechado_em_divisao') {
      this.percentage_freela = 0;
      this.percentage_client = 0;

      this.value_client = 0;
      this.value_freela = 0;

      alert('Preencha as porcentagens da divisão');
    }
  }

  fillPerentageFreela() {
    
    if(this.percentage_client > 100) {
      alert('Porcentagem inválida! Informe um número de 0 a 100');
      return;
    }

    this.percentage_freela = 100 - this.percentage_client;
    this.calculateValueProposal();
  }

  sendProposal() {
    if (this.justification === '') {
      alert('Por favor, preencha a justificativa');
      return;
    }

    if ((this.percentage_client === 0 || this.percentage_freela === 0) && this.decision === 'fechado_em_divisao') {
      alert('Por favor, verifique as porcentagens');
      return;
    }

    if ((this.decision === 'fechado_a_favor_do_freelancer' || this.decision === 'fechado_a_favor_do_cliente') && (this.percentage_client + this.percentage_freela !== 100)) {
      alert('Por favor, verifique as porcentagens');
      return;
    }

    this.dispute.percentage_owner = this.percentage_client;
    this.dispute.percentage_freela = this.percentage_freela;
    this.dispute.deal_proposed_by = this.user;
    this.dispute.deal_proposal = 'made_by_moderator';
    this.dispute.job = this.job.id;
    this.dispute.status = 'closed';
    this.dispute.justification = this.justification;

    

    this.disputeService.update(this.dispute.id, this.dispute).subscribe(
      success => {
        alert('Acordo Proposto com sucesso');
        setTimeout(() => {
          location.reload();
        }, 5000)
      },
      error => {
        alert('Erro ao enviar acordo');
        console.error(error);
      }
    )
  }

}

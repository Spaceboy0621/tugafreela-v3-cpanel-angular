import { DisputeService } from './../../../../services/dispute.service';
import { AuthService } from './../../../../services/auth.service';
import { User } from './../../../../models/user.model';
import { UserService } from './../../../../services/user.service';
import { Dispute, DisputeMessagesModerator } from './../../../../models/dispute.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-message-client',
  templateUrl: './message-client.component.html',
  styleUrls: ['./message-client.component.scss']
})
export class MessageClientComponent implements OnInit {

  dispute: Dispute = new Dispute();
  @Input() idDispute: number = 0;
  ready: boolean = false;
  message: string = '';
  user: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private disputeService: DisputeService 
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
    this.disputeService.getById(this.idDispute).subscribe(
      suceess => {
        this.dispute = suceess;
        this.filterMessagesWithModerator();
      },
      error => {
        console.error(['Erro ao solicitar dispute', error])
      }
    );
  }

  filterMessagesWithModerator() {
    this.dispute.messages_moderator = this.dispute.messages_moderator.filter(item => item.type === 'with_client');
    
    for (const [index, item] of this.dispute.messages_moderator.entries()) {
      if (typeof item.user === 'number') {
        this.userService.getById(item.user).subscribe(
          success => this.dispute.messages_moderator[index].user = success,
          error => console.error(['Erro ao recuperar dados do user', error])
        );
      }
      if (typeof item.moderator === 'number') {
        this.userService.getById(item.moderator).subscribe(
          success => this.dispute.messages_moderator[index].moderator = success,
          error => console.error(['Erro ao recuperar dados do user', error])
        );
      }
    }

    this.ready = true;
  }

  sendMessage() {
    if (this.message === '') {
      alert('Digite sua mensagem');
      return;
    }

    const msg = {
      message: this.message,
      type: 'with_client',
      moderator!: this.user.id,
      user!: this.user.id,
      attachments!: [],
      dispute!: this.dispute,
    }

    this.disputeService.sendMessageModerator(msg).subscribe(
      success => {
        console.log('Mensagem enviada');
        location.reload();
      },
      error => {
        console.error(['Erro ao enviar mensagem', error])
      }
    )

  }

  getUrlPhoto(url: string) {
    return `${environment.api.url}${url}`
  }

}

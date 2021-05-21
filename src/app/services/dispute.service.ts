import { Dispute, DisputeMessages, DisputeMessagesModerator } from './../models/dispute.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class DisputeService {
    constructor(private http: HttpClient) { }
    
    create(dispute: Dispute) {
        return this.http.post<Dispute>(`${environment.api.url}/disputes`, dispute);
    }

    getById(id: number) {
        return this.http.get<Dispute>(`${environment.api.url}/disputes/${id}`);
    }
    
    update(id: number, dispute: Dispute) {
        return this.http.put(`${environment.api.url}/disputes/${id}`, dispute);
    }

    sendMessage(message: DisputeMessages) {
        return this.http.post<DisputeMessages>(`${environment.api.url}/dispute-messages`, message);
    }

    getAll() {
        return this.http.get<Dispute[]>(`${environment.api.url}/disputes`);
    }

    sendMessageModerator(message: DisputeMessagesModerator) {
        return this.http.post<DisputeMessagesModerator>(`${environment.api.url}/dispute-messages-moderators`, message);
    }

    
  
}

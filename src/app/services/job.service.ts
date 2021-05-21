import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class JobService {
    constructor(private http: HttpClient) { }
    
    create(job: Job) {
        return this.http.post<Job>(`${environment.api.url}/jobs`, job);
    }

    update(id: number, job: Job) {
        return this.http.put<Job>(`${environment.api.url}/jobs/${id}`, job);
    }

    myJobs(user: User) {
        return this.http.get<Job[]>(`${environment.api.url}/jobs/my-jobs/${user.id}/${user.type}`);
    }

    details(jobID: number) {
        return this.http.get<Job>(`${environment.api.url}/jobs/${jobID}`);
    }

    search(filters: any) {
        return this.http.post<Job[]>(`${environment.api.url}/jobs/search`, filters);
    }

    getByStatus(status: string) {
        return this.http.get<Job[]>(`${environment.api.url}/jobs/status/${status}`);
    }

    getByName(name: string) {
        return this.http.get<Job[]>(`${environment.api.url}/jobs/name/${name}`);
    }

    getByOwner(owner: string) {
        return this.http.get<Job[]>(`${environment.api.url}/jobs/owner/${owner}`);
    }

    getById(id: number) {
        return this.http.get<Job>(`${environment.api.url}/jobs/${id}`);
    }
  
}
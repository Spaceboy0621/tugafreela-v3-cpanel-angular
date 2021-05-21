import { Job } from "./job.model";
import { User } from "./user.model";

export class Rating {
    
    public constructor(init?: any) {
        Object.assign(this, init);
    }

    id!: number;
    rating!: number;
    user!: User;
    rated!: User;
    comment!: string;
    job!: Job;
}
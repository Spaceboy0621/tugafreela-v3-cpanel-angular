import { User } from './user.model';
import { Job } from './job.model';

export class Dispute {

    public constructor( init?: Dispute ) {
        Object.assign(this, init);
    }


    id?: number;
    job: Job | number = new Job();
    phase!: string;
    status!: string;
    percentage_freela!: number;
    percentage_owner!: number;
    messages!: DisputeMessages[];
    messages_moderator!: DisputeMessagesModerator[];
    justification!: string;
    deal_proposed_by!: User;
    deal_proposal!: string;
    created_at!: Date;


    getPhase() {
        const actualDate = new Date();
        const disputeCreateDate = new Date(this.created_at.toString());
        const diffTime = actualDate.getTime() - disputeCreateDate.getTime();

        const hours = Math.round((diffTime / 1000 / 3600));

        if (hours < 72) return 'first';
        if (hours >= 72) return 'second';

        return 'first';
    }
}

export class DisputeMessages {

    public constructor( init?: DisputeMessages ) {
        Object.assign(this, init);
    }

    created_at!: Date;
    user!: User;
    message!: string;
    attachments: File[] = [];
    dispute: Dispute = new Dispute();
}

export class DisputeMessagesModerator {

    public constructor( init?: DisputeMessages ) {
        Object.assign(this, init);
    }

    message!: string;
    type!: string;
    moderator!: User | number;
    user!: User | number;
    attachments!: File[];
    dispute!: Dispute;
    
}
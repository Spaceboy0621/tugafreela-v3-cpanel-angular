import { Dispute } from './dispute.model';
import { Proposal } from './propsal.model';
import { Category } from './category.model';
import { Skill } from './skill.model';
import { User } from './user.model';
import { Notification } from './notification.model';

export class Job {

    public constructor( init?: Job ) {
        Object.assign(this, init);
    }

    id!: number;
    title!: string;
    categories!: Category[];
    description!: string;
    files_attached: any[] = [];
    skills!: Skill[];
    level_experience!: string;
    type!: string;
    status!: string;
    owner!: User;
    freelancer!: User;
    created_at: any;
    messages!: any[];
    notifications!: Notification[];
    proposals!: Proposal[];
    deadline!: Date;
    client_rated!: boolean;
    freela_rated!: boolean;
    agreed_value!: number;
    dispute!: Dispute | number;
    valueJob!: number;

    getDate() {
        const one_day = 1000 * 60 * 60 * 24;

        const now = new Date().getTime();
        const created = new Date(this.created_at).getTime();

        const difference = Math.round((now - created) / one_day);
        if(difference == 0)
            return `hoje mesmo`;

        else if(difference == 1)
            return `há 1 dia`;

        else
            return `há ${difference} dias`;

    }
}


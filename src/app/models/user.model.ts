import { Skill } from './skill.model';
import { Category } from './category.model';
import { environment } from '../../environments/environment';
import { Rating } from './rating.model';

export class User {

    public constructor( init?: User ) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    nick!: string;
    nif!: number;
    username!: string;
    type: any;
    email!: string;
    password!: string;
    hour_value: any;
    photo: any;
    professional_description!: string;
    about!: string;
    experience!: string;
    confirmed!: boolean;
    categories!: Category[];
    skills!: Skill[];
    ratings!: Rating[];
    blocked!: boolean;
    level!: string;
    freelancer_earning!: number;
    premium!: boolean;
    complete!: boolean;
    averageRating?: Array<number>;
    

    

    getMediaRating() {
        if(!this.ratings || this.ratings.length == 0)
            return 0;
            
        const total = this.ratings.map(r => r.rating).reduce( (a, b) => a + b);
        const rating = total / this.ratings?.length;
        return Math.round(rating);
    }

    isFreela() {
        return this.type === 'Freelancer';
    }

    getPhoto(format?: string) {
        if(this.photo && this.photo.name) {
            if(format === 'medium') return `${environment.api.url}${this.photo.formats.medium.url}`;

            if (this.photo.formats.small) return `${environment.api.url}${this.photo.formats.small.url}`;

            return `${environment.api.url}${this.photo.url}`

        }

        return 'assets/img/profile.png';
    }
}
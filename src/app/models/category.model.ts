import { Skill } from './skill.model';

export class Category {

    public constructor( init: Category ) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    slug!: string;
    skills!: Skill[];
}
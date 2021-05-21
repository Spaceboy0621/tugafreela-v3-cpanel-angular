import { User } from './../../models/user.model';

export class AuthResponseDto {
    jwt!: string;
    user!: User;
}
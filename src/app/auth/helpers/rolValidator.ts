import { User } from '../../shared/models/user.interface';

export class RoleValidator {
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }
}
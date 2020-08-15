import { UserRepository } from 'repositories/user';
import { User } from '../entities/user';

export class UserService {
    /**
     * @description Create an instance of UserService
     */
    constructor(private userRepository: UserRepository) {
        // Create instance of Data Access layer using our desired model
    }

    /**
     * @description Attempt to create a post with the provided object
     * @param userToCreate {object} Object containing all required fields to
     * create user
     */
    async createUser(userToCreate: Partial<User>): Promise<User> {
        let user = this.userRepository.create(userToCreate);
        user = await this.userRepository.insertUser(user);
        return user;
    }
}

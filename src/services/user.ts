import { UserRepository, FindUserQuery } from 'repositories/user';
import { sign as signJwt } from 'jsonwebtoken';
import { User } from '../entities/user';

export class UserService {
    constructor(private userRepository: UserRepository) {
        // Create instance of Data Access layer using our desired model
    }

    async registerUser(userToCreate: Partial<User>): Promise<User> {
        const username = userToCreate.name;
        const takenUsername = await this.isUsernameTaken(username);

        if (takenUsername) {
            let user = await this.userRepository.create(userToCreate);
            user = await this.userRepository.insertUser(user);
            return user;
        }
        return null;
    }

    async isUsernameTaken(username: string): Promise<boolean> {
        const isUserExist = await this.userRepository.findByQuery({
            name: username
        });
        if (isUserExist) {
            return true;
        }
        return false;
    }

    async authenticateUser(userCredentials: Partial<User>): Promise<User[]> {
        // Check user credentials with database
        const user = await this.userRepository.findByQuery(userCredentials);
        return user;
    }

    async createUser(userToInsert: Partial<User>) {
        let user: User = this.userRepository.create(userToInsert);
        user = await this.userRepository.insertUser(user);

        return user;
    }

    async getUser(userQuery: FindUserQuery): Promise<User[]> {
        const users = await this.userRepository.findByQuery(userQuery);
        return users;
    }

    generateAccessToken(credentials: string): string {
        // expires in 24 hours
        return signJwt(credentials, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            id: userId
        });

        return user;
    }
}

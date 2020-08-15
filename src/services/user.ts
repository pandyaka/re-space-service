import { UserRepository, FindUserQuery } from 'repositories/user';
import { sign as signJwt } from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { User } from '../entities/user';

export class UserService {
    constructor(private userRepository: UserRepository) {
        // Create instance of Data Access layer using our desired model
    }

    async registerUser(userToCreate: Partial<User>): Promise<User> {
        const username = userToCreate.name;
        // eslint-disable-next-line prefer-destructuring
        const password = userToCreate.password;
        const takenUsername = await this.isUsernameTaken(username);
        const saltRounds = 10;
        const salt = genSaltSync(saltRounds);
        const hashedPassword = hashSync(password, salt);
        userToCreate.password = hashedPassword;

        if (!takenUsername) {
            let createdUser = await this.userRepository.create(userToCreate);
            createdUser = await this.userRepository.insertUser(createdUser);
            return createdUser;
        }
        return null;
    }

    async isUsernameTaken(username: string): Promise<boolean> {
        const isUserExist = await this.userRepository.findByQuery({
            name: username
        });
        if (isUserExist.length === 1) {
            return true;
        }
        return false;
    }

    async authenticateUser(userCredentials: FindUserQuery): Promise<User[]> {
        // Check user credentials with database
        const username = userCredentials.name;
        // eslint-disable-next-line prefer-destructuring
        const password = userCredentials.password;
        const users = await this.userRepository.findByQuery({ name: username });
        if (users.length === 1) {
            if (compareSync(password, users[0].password)) {
                return users;
            }
        }
        return null;
    }

    async getUser(userQuery: FindUserQuery): Promise<User[]> {
        const users = await this.userRepository.findByQuery(userQuery);
        return users;
    }

    async generateAccessToken(userId: string): Promise<string> {
        // expires in 24 hours
        const creds = {
            id: userId
        };
        return signJwt(creds, process.env.SECRET_KEY, { expiresIn: '24h' });
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            id: userId
        });

        return user;
    }
}

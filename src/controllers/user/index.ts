import { Request, Response, Router } from 'express';
import { UserService } from '../../services/user';
import { UserRepository } from '../../repositories/user';
import { User } from 'entities/user';
import { genSaltSync, hashSync } from 'bcrypt';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    private router: Router;

    constructor(private userService: UserService) {
        this.router = Router();
        this.router.post('/authenticate', this.authenticateUser.bind(this));
        this.router.post('/register', this.registerUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    public async createUser(req: Request, res: Response) {
        try {
            const saltRounds = 10;
            const salt = genSaltSync(saltRounds);
            const hashedPassword = hashSync(req.body.password, salt);
            const userToCreate: Partial<User> = {
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                phone_number: req.body.phone_number
            };

            const user = await this.userService.createUser(userToCreate);
            return res.status(200).json(user);
        } catch (error) {
            return res.send(error);
        }
    }

    public async authenticateUser(req: Request, res: Response) {
        try {
            const userCredentials = req.body;
            const users = await userService.authenticateUser(userCredentials);
            if (users.length == 1) {
                const signedJwt = userService.generateAccessToken(users[0].id);
                const response = {
                    token: signedJwt
                };
                return res.send(response);
            } else {
                return res.status(400).send('Bad request');
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async registerUser(req: Request, res: Response): Promise<Response> {
        try {
            const userCredentials = req.body;
            const registeredUser = await this.userService.registerUser(userCredentials);
            return res.send(registeredUser);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

import { Request, Response, Router } from 'express';
import { UserService } from '../../services/user';

export class UserController {
    private router: Router;

    constructor(private userService: UserService) {
        this.router = Router();
        this.router.post('/authenticate', this.authenticateUser.bind(this));
        this.router.post('/register', this.registerUser.bind(this));
        this.router.get('/', this.getUser.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    public async getUser(req: Request, res: Response) {
        try {
            const users = await this.userService.getUser({});
            return res.status(200).json(users);
        } catch (error) {
            return res.send(error);
        }
    }

    public async registerUser(req: Request, res: Response) {
        try {
            const userToCreate = req.body;
            const user = await this.userService.registerUser(userToCreate);
            return res.status(200).json(user);
        } catch (error) {
            return res.send(error);
        }
    }

    public async authenticateUser(req: Request, res: Response) {
        try {
            const userCredentials = req.body;
            const users = await this.userService.authenticateUser(userCredentials);
            if (users) {
                const signedJwt = await this.userService.generateAccessToken(users[0].id.toString());
                const response = {
                    token: signedJwt
                };
                return res.send(response);
            }
            return res.status(400).send('Bad request');
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

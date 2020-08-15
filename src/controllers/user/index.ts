import { Request, Response } from 'express';
import { UserService } from '../../services/user';
import { UserRepository } from '../../repositories/user';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const postAuthentication = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userCredentials = req.body;
        const users = await userService.authenticateUser(userCredentials);
        if (users) {
            const signedJwt = userService.generateAccessToken(users[0].id);
            const response = {
                token: signedJwt
            };
            return res.send(response);
        }
        return res.status(400).send('Bad request');
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const postRegistration = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userCredentials = req.body;
        const registeredUser = await userService.registerUser(userCredentials);
        return res.send(registeredUser);
    } catch (err) {
        return res.status(500).send(err);
    }
};

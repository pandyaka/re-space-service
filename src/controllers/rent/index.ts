import { Request, Response, Router } from 'express';
import { FindRentQuery } from 'repositories/rent';
import { RentService } from 'services/rent';
import { Rent } from 'entities/rent';
import { WatchlistService } from 'services/watchlist';
import { UserService } from 'services/user';
import { SpaceService } from 'services/space';
import { Watchlist } from 'entities/watchlist';
import { FindWatchlistQuery } from 'repositories/watchlist';

export class RentController {
    private router: Router;

    constructor(
        private rentService: RentService,
        private watchlistService: WatchlistService,
        private userService: UserService,
        private spaceService: SpaceService
    ) {
        this.router = Router();
        this.router.post('/', this.createRent.bind(this));
        this.router.post('/watch', this.createRentWatch.bind(this));
        this.router.get('/', this.getRents.bind(this));
        this.router.get('/watch', this.getRentWatches.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    public async createRent(req: Request, res: Response) {
        const rentSpace = await this.spaceService.getSpaceById(req.body.space_id);
        const rentUser = await this.userService.getUserById(req.body.user_id);
        const rentToCreate: Partial<Rent> = {
            price: req.body.price,
            interval: req.body.interval,
            next_payment: req.body.next_payment ? new Date(req.body.next_payment as string) : undefined,
            user: rentUser,
            space: rentSpace
        };

        try {
            const rent = await this.rentService.createRent(rentToCreate);

            return res.status(200).json(rent);
        } catch (error) {
            return res.send(error);
        }
    }

    public async createRentWatch(req: Request, res: Response) {
        const rentWatchlistSpace = await this.spaceService.getSpaceById(req.body.space_id);
        const rentWatchlistUser = await this.userService.getUserById(req.body.user_id);
        const watchlistToCreate: Partial<Watchlist> = {
            reference_price: req.body.reference_price,
            current_price: req.body.current_price,
            changes: req.body.changes,
            user: rentWatchlistUser,
            space: rentWatchlistSpace
        };

        try {
            const watchlist = await this.watchlistService.createWatchlist(watchlistToCreate);

            return res.status(200).json(watchlist);
        } catch (error) {
            return res.send(error);
        }
    }

    public async getRents(req: Request, res: Response) {
        const rentsQuery: FindRentQuery = {
            space_id: req.body.space_id,
            user_id: req.body.user_id,
            price: req.body.price,
            interval: req.body.interval,
            next_payment: req.body.next_payment ? new Date(req.body.next_payment as string) : undefined
        };

        try {
            const rents = await this.rentService.getRent(rentsQuery);

            return res.status(200).json(rents);
        } catch (error) {
            return res.send(error);
        }
    }

    public async getRentWatches(req: Request, res: Response) {
        const watchlistQuery: FindWatchlistQuery = {
            user_id: req.body.user_id,
            space_id: req.body.space_id,
            reference_price: req.body.reference_price,
            current_price: req.body.current_price,
            changes: req.body.changes
        };

        try {
            const watchlist = await this.watchlistService.getWatchlist(watchlistQuery);

            return res.status(200).json(watchlist);
        } catch (error) {
            return res.send(error);
        }
    }
}

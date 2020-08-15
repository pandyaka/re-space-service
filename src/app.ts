import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { connect } from './util/db-connector';
import { getCustomRepository } from 'typeorm';
import { MallRepository } from './repositories/mall';
import { RentRepository } from './repositories/rent';
import { SpaceRepository } from './repositories/space';
import { UserRepository } from './repositories/user';
import { WatchlistRepository } from './repositories/watchlist';
import { MallService } from './services/mall';
import { RentService } from './services/rent';
import { SpaceService } from './services/space';
import { UserService } from './services/user';
import { WatchlistService } from './services/watchlist';
import { MallController } from './controllers/mall';
import { UserController } from './controllers/user';
import { SpaceController } from './controllers/space';
import { config } from 'dotenv';
import { RentController } from './controllers/rent';

function setRoute(app: Application) {
    config();
    const mallRepository = getCustomRepository(MallRepository);
    const rentRepository = getCustomRepository(RentRepository);
    const spaceRepository = getCustomRepository(SpaceRepository);
    const userRepository = getCustomRepository(UserRepository);
    const watchlistRepository = getCustomRepository(WatchlistRepository);

    const mallService = new MallService(mallRepository);
    const rentService = new RentService(rentRepository);
    const spaceService = new SpaceService(spaceRepository, mallService);
    const userService = new UserService(userRepository);
    const watchlistService = new WatchlistService(watchlistRepository);

    const mallController = new MallController(mallService);
    const userController = new UserController(userService);
    const spaceController = new SpaceController(spaceService);
    const rentController = new RentController(rentService, watchlistService, userService, spaceService);

    app.use('/malls', mallController.getRouter());
    app.use('/users', userController.getRouter());
    app.use('/spaces', spaceController.getRouter());
    app.use('/rents', rentController.getRouter());
}

export async function createApp(): Promise<express.Application> {
    const app = express();
    app.set('port', process.env.PORT || 3000);

    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    await connect();

    setRoute(app);

    return app;
}

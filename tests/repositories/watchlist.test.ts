import { Connection } from 'typeorm';
import { createTestConnection } from '../helpers/create-connection';
import { WatchlistRepository } from 'repositories/watchlist';
import { factories } from '../factories';
import { SpaceRepository } from 'repositories/space';
import { UserRepository } from 'repositories/user';
import { User } from 'entities/user';
import { Space } from 'entities/space';
import { MallRepository } from 'repositories/mall';
import { Mall } from 'entities/mall';

describe('WatchlistRepository', () => {
    let connection: Connection;
    let watchlistRepository: WatchlistRepository;
    let spaceRepository: SpaceRepository;
    let userRepository: UserRepository;
    let mallRepository: MallRepository;
    let user: User;
    let space: Space;
    let mall: Mall;

    beforeAll(async () => {
        connection = await createTestConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
        watchlistRepository = connection.getCustomRepository(WatchlistRepository);
        spaceRepository = connection.getCustomRepository(SpaceRepository);
        userRepository = connection.getCustomRepository(UserRepository);
        mallRepository = connection.getCustomRepository(MallRepository);

        const userToSave = factories.user.build();
        user = await userRepository.insertUser(userToSave);

        const mallToSave = factories.mall.build();
        mall = await mallRepository.insertMall(mallToSave);

        const spaceToSave = factories.space.build({
            mall: mall
        });
        space = await spaceRepository.insertSpace(spaceToSave);
    });

    afterAll(async () => {
        await connection.close();
    });

    // beforeEach(async () => {
    //     await watchlistRepository.clear();
    // });

    describe('save()', () => {
        it('creates a mall in db', async () => {
            const watchlistToSave = factories.watchlist.build({
                user: user,
                space: space
            });
            const watchlist = await watchlistRepository.insertWatchlist(watchlistToSave);

            expect(watchlist.id).toBeString();
            const watchlistInDB = await watchlistRepository.findOne(watchlist.id);
            expect(watchlistInDB.id).toEqual(watchlist.id);
            expect(watchlistInDB.reference_price).toEqual(watchlist.reference_price);
            expect(watchlistInDB.current_price).toEqual(watchlist.current_price);
            expect(watchlistInDB.changes).toEqual(watchlist.changes);
        });
    });
});

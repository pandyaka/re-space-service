import { Connection } from 'typeorm';
import { createTestConnection } from '../helpers/create-connection';
import { RentRepository } from 'repositories/rent';
import { SpaceRepository } from 'repositories/space';
import { UserRepository } from 'repositories/user';
import { factories } from '../factories';
import { MallRepository } from 'repositories/mall';
import { Mall } from 'entities/mall';
import { User } from 'entities/user';
import { Space } from 'entities/space';

describe('RentRepository', () => {
    let connection: Connection;
    let rentRepository: RentRepository;
    let spaceRepository: SpaceRepository;
    let userRepository: UserRepository;
    let mallRepository: MallRepository;
    let mall: Mall;
    let user: User;
    let space: Space;

    beforeAll(async () => {
        connection = await createTestConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
        rentRepository = connection.getCustomRepository(RentRepository);
        spaceRepository = connection.getCustomRepository(SpaceRepository);
        userRepository = connection.getCustomRepository(UserRepository);
        mallRepository = connection.getCustomRepository(MallRepository);

        const mallToSave = factories.mall.build();
        mall = await mallRepository.insertMall(mallToSave);

        const userToSave = factories.user.build();
        user = await userRepository.insertUser(userToSave);

        const spaceToSave = factories.space.build({
            mall: mall
        });
        space = await spaceRepository.insertSpace(spaceToSave);
    });

    afterAll(async () => {
        await connection.close();
    });

    // beforeEach(async () => {
    //     await rentRepository.clear();
    // });

    describe('save()', () => {
        it('creates a rent in db', async () => {
            const rentToSave = factories.rent.build({
                user: user,
                space: space
            });
            const rent = await rentRepository.insertRent(rentToSave);

            expect(rent.id).toBeString();
            const rentInDB = await rentRepository.findOne(rent.id);
            expect(rentInDB.price).toEqual(rent.price);
            expect(rentInDB.interval).toEqual(rent.interval);
            expect(rentInDB.next_payment).toEqual(rent.next_payment);
        });
    });
});

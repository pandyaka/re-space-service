import { Connection } from 'typeorm';
import { createTestConnection } from '../helpers/create-connection';
import { UserRepository } from 'repositories/user';
import { factories } from '../factories';

describe('UserRepository', () => {
    let connection: Connection;
    let userRepository: UserRepository;

    beforeAll(async () => {
        connection = await createTestConnection();
        await connection.dropDatabase();
        await connection.runMigrations();
        userRepository = connection.getCustomRepository(UserRepository);
    });

    afterAll(async () => {
        await connection.close();
    });

    // beforeEach(async () => {
    //     await userRepository.clear();
    // });

    describe('save()', () => {
        it('creates a user in db', async () => {
            const userToSave = factories.user.build();
            const user = await userRepository.insertUser(userToSave);

            expect(user.id).toBeString();
            const userInDB = await userRepository.findOne(user.id);
            expect(userInDB.id).toEqual(user.id);
            expect(userInDB.name).toEqual(user.name);
            expect(userInDB.email).toEqual(user.email);
            expect(userInDB.phone_number).toEqual(user.phone_number);
        });
    });
});

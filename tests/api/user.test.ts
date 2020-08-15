import { Repository, getRepository, getConnection } from 'typeorm';
import { User } from 'entities/user';
import { createMockServer } from '../../tests/mock-server';

describe('User endpoint tests', () => {
    let server: Express.Application;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        server = await createMockServer();
        userRepository = getRepository(User);
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        return server;
    });

    afterAll(async () => {
        await getConnection().close();
    });

    describe('POST /user', () => {
        beforeEach(async () => {
            await userRepository.clear();
        });

        describe('Positive test cases', () => {});
        describe('Negative test cases', () => {});
    });

    describe('POST /user/authenticate', () => {
        beforeEach(async () => {
            await userRepository.clear();
        });

        describe('Positive test cases', () => {});
        describe('Negative test cases', () => {});
    });

    describe('POST /user/register', () => {
        beforeEach(async () => {
            await userRepository.clear();
        });

        describe('Positive test cases', () => {});
        describe('Negative test cases', () => {});
    });
});

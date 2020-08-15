import { Repository, getRepository, getConnection } from 'typeorm';
import { Space } from 'entities/space';
import { createMockServer } from '../../tests/mock-server';

describe('Space endpoint tests', () => {
    let server: Express.Application;
    let spaceRepository: Repository<Space>;

    beforeAll(async () => {
        server = await createMockServer();
        spaceRepository = getRepository(Space);
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        return server;
    });

    afterAll(async () => {
        await getConnection().close();
    });

    describe('POST /spaces', () => {
        beforeEach(async () => {
            await spaceRepository.clear();
        });

        describe('Positive test cases', () => {});
        describe('Negative test cases', () => {});
    });
});

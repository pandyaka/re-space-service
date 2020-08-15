import { Repository, getRepository, getConnection } from 'typeorm';
import { Space } from 'entities/space';
import { Mall } from 'entities/mall';
import { createMockServer } from '../../tests/mock-server';
import { factories } from '../../tests/factories';
import request from 'supertest';

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
        describe('Positive test cases', () => {
            let mallId: string;
            beforeEach(async () => {
                const mallToCreate: Mall = factories.mall.build();
                const response = await request(server).post(`/malls`).send(mallToCreate);
                expect(response.status).toEqual(200);
                mallId = response.body.id;
            });

            it('should be able to create a space', async () => {
                const spaceToCreate: Space = factories.space.build({
                    mallId: mallId
                });
                const response = await request(server).post(`/spaces`).send(spaceToCreate);
                expect(response.status).toEqual(200);
                const createdSpace = response.body;
                expect(createdSpace.id).toBeString();
            });
        });
    });

    describe('GET /spaces', () => {
        let mallId;
        beforeEach(async () => {
            const mallToCreate: Mall = factories.mall.build();
            const response = await request(server).post(`/malls`).send(mallToCreate);
            expect(response.status).toEqual(200);
            mallId = response.body.id;

            const spaceToCreate: Space = factories.space.build();
            const spaceResponse = await request(server).post(`/spaces`).send(spaceToCreate);
            expect(spaceResponse.status).toEqual(200);
        });

        describe('Positive test cases', () => {
            it('should be able to get spaces', async () => {
                const response = await request(server).get(`/spaces`);
                expect(response.status).toEqual(200);
                const createdSpace = response.body[0];
                expect(createdSpace.id).toBeString();
            });
        });
    });
});

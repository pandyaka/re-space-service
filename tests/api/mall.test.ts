import { Repository, getRepository, getConnection } from 'typeorm';
import { Mall } from 'entities/mall';
import { createMockServer } from '../../tests/mock-server';
import { factories } from '../../tests/factories';
import request from 'supertest';

describe('Mall endpoint tests', () => {
    let server: Express.Application;
    let mallRepository: Repository<Mall>;

    beforeAll(async () => {
        server = await createMockServer();
        mallRepository = getRepository(Mall);
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        return server;
    });

    afterAll(async () => {
        await getConnection().close();
    });

    describe('POST /malls', () => {
        describe('Positive test cases', () => {
            it('should be able to create a mall', async () => {
                const mallToCreate: Mall = factories.mall.build();
                const response = await request(server).post(`/malls`).send(mallToCreate);
                expect(response.status).toEqual(200);
                const createdMall = response.body;
                expect(createdMall.id).toBeString();
            });
        });
    });

    describe('GET /malls', () => {
        beforeEach(async () => {
            const mallToCreate: Mall = factories.mall.build();
            const response = await request(server).post(`/malls`).send(mallToCreate);
            expect(response.status).toEqual(200);
        });

        describe('Positive test cases', () => {
            it('should be able to get malls', async () => {
                const response = await request(server).get(`/malls`);
                expect(response.status).toEqual(200);
                const createdMall = response.body[0];
                expect(createdMall.id).toBeString();
            });
        });
    });

    describe('GET /mall/:mallId', () => {
        let mallId: string;

        beforeEach(async () => {
            const mallToCreate: Mall = factories.mall.build();
            const response = await request(server).post(`/malls`).send(mallToCreate);
            expect(response.status).toEqual(200);
            mallId = response.body.id;
        });

        describe('Positive test cases', () => {
            it('should be able to get malls', async () => {
                const response = await request(server).get(`/malls/${mallId}`);
                expect(response.status).toEqual(200);
                const createdMall = response.body;
                expect(createdMall.id).toBeString();
            });
        });
    });
});

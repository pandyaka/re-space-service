import { Repository, getRepository, getConnection } from 'typeorm';
import { Rent } from 'entities/rent';
import { createMockServer } from '../../tests/mock-server';
import { factories } from '../../tests/factories';
import request from 'supertest';
import { Watchlist } from 'entities/watchlist';

describe('Rent endpoint tests', () => {
    let server: Express.Application;
    let rentRepository: Repository<Rent>;

    beforeAll(async () => {
        server = await createMockServer();
        rentRepository = getRepository(Rent);
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        return server;
    });

    afterAll(async () => {
        await getConnection().close();
    });

    describe('POST /rents', () => {
        describe('Positive test cases', () => {
            it('should be able to create a rent', async () => {
                const rentToCreate: Rent = factories.rent.build();
                const response = await request(server).post(`/rents`).send(rentToCreate);
                expect(response.status).toEqual(200);
                const createdRent = response.body;
                expect(createdRent.id).toBeString();
            });
        });
    });

    describe('POST /rents/watch', () => {
        describe('Positive test cases', () => {
            it('should be able to create a watchlist', async () => {
                const watchlist: Watchlist = factories.watchlist.build();
                const response = await request(server).post(`/rents/watch`).send(watchlist);
                expect(response.status).toEqual(200);
                const createdWatchlist = response.body;
                expect(createdWatchlist.id).toBeString();
            });
        });
    });

    describe('GET /rents', () => {
        beforeEach(async () => {
            const rentToCreate: Rent = factories.rent.build();
            const response = await request(server).post(`/rents`).send(rentToCreate);
            expect(response.status).toEqual(200);
        });

        describe('Positive test cases', () => {
            it('should be able to get rents', async () => {
                const response = await request(server).get(`/rents`);
                expect(response.status).toEqual(200);
                const createdRents = response.body[0];
                expect(createdRents.id).toBeString();
            });
        });
    });

    describe('GET /rents/watch', () => {
        beforeEach(async () => {
            const watchlist: Watchlist = factories.watchlist.build();
            const response = await request(server).post(`/rents/watch`).send(watchlist);
            expect(response.status).toEqual(200);
        });

        describe('Positive test cases', () => {
            it('should be able to get watchlists', async () => {
                const response = await request(server).get(`/rents/watch`);
                expect(response.status).toEqual(200);
                const createdWatchlist = response.body[0];
                expect(createdWatchlist.id).toBeString();
            });
        });
    });
});

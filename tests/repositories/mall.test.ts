import { Connection } from 'typeorm';
import { createTestConnection } from '../helpers/create-connection';
import { MallRepository } from 'repositories/mall';
import { factories } from '../factories';

describe('MallRepository', () => {
    let connection: Connection;
    let mallRepository: MallRepository;

    beforeAll(async () => {
        connection = await createTestConnection();
        // Drops DB and re-creates schema
        await connection.dropDatabase();
        await connection.runMigrations();
        mallRepository = connection.getCustomRepository(MallRepository);
    });

    afterAll(async () => {
        await connection.close();
    });

    // beforeEach(async () => {
    //     await mallRepository.clear();
    // });

    describe('save()', () => {
        it('creates a mall in db', async () => {
            const mallToSave = factories.mall.build();
            const mall = await mallRepository.insertMall(mallToSave);

            expect(mall.id).toBeString();
            const mallInDB = await mallRepository.findOne(mall.id);
            expect(mallInDB.id).toEqual(mall.id);
            expect(mallInDB.class).toEqual(mall.class);
            expect(mallInDB.location).toEqual(mall.location);
            expect(mallInDB.highlights).toEqual(mall.highlights);
            expect(mallInDB.image_url).toEqual(mall.image_url);
        });
    });
})

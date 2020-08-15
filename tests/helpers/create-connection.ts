import 'reflect-metadata'; 
import { createConnection } from 'typeorm';
import ormconfig from '../../src/ormconfig';

export const createTestConnection = async () => {
    return createConnection(ormconfig);
};

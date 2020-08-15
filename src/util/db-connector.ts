import { createConnection, Connection } from 'typeorm';
import ormconfig from '../ormconfig';

export async function connect() {
    let connection: Connection;
    let isConnected = false;

    while (!isConnected) {
        try {
            connection = await createConnection(ormconfig); // eslint-disable-line
            isConnected = connection.isConnected;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`create db connection error ${error}`);
        }
    }
}

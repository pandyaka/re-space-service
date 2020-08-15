import { mall } from './entities/mall';
// eslint-disable-next-line import/no-cycle
import { space } from './entities/space';
// eslint-disable-next-line import/no-cycle
import { user } from './entities/user';
// eslint-disable-next-line import/no-cycle
import { rent } from './entities/rent';
// eslint-disable-next-line import/no-cycle
import { watchlist } from './entities/watchlist';

export const factories: any = {
    mall,
    space,
    user,
    rent,
    watchlist
};

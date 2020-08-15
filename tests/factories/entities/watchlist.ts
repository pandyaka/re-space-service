import { Factory } from 'fishery';
import { Watchlist } from 'entities/watchlist';
// eslint-disable-next-line import/no-cycle
import { factories } from '..';

export const watchlist = Factory.define<Watchlist>(() => {
    const userToInclude = factories.user.build();
    const spaceToInclude = factories.space.build();
    return {
        reference_price: 1_000_000,
        current_price: 500_000,
        changes: 20,
        user: userToInclude,
        space: spaceToInclude
    };
});

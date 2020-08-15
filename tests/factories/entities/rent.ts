import { Factory } from 'fishery';
import { Rent } from 'entities/rent';
// eslint-disable-next-line import/no-cycle
import { factories } from '..';

export const rent = Factory.define<Rent>(() => {
    const spaceToInclude = factories.space.build();
    const userToInclude = factories.user.build();
    return {
        price: 1_000_000,
        interval: 6,
        next_payment: new Date('2021-05-21'),
        user: userToInclude,
        space: spaceToInclude
    };
});

import { Factory } from 'fishery';
import { User } from 'entities/user';

export const user = Factory.define<User>(() => {
    return {
        name: 'chicken-little-cust',
        email: 'chicken-little@gmail.com',
        phone_number: '08123456789'
    };
});

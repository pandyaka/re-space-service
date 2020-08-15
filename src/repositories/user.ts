import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

export type FindUserQuery = {
    name?: string;
    password?: string;
    email?: string;
    phone_number?: string;
};

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async insertUser(userToInsert: User): Promise<User> {
        const user = await this.save(userToInsert);
        return user;
    }

    public async findByQuery(userQuery: FindUserQuery): Promise<User[]> {
        const qb = this.createQueryBuilder('user');

        if (userQuery.name) qb.andWhere('user.name = :name', { name: userQuery.name });
        if (userQuery.password) qb.andWhere('user.password = :password', {password: userQuery.password})
        if (userQuery.email) qb.andWhere('user.email = :email', {email: userQuery.email});
        if (userQuery.phone_number) qb.andWhere('user.password = :password', {phone_number: userQuery.phone_number});
        
        const users = qb.getMany();
        return users;
    }
}

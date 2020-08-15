import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

export type FindUserQuery = {
    name?: string;
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

        const users = qb.getMany();
        return users;
    }
}

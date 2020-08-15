import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class User extends BaseEntity {
    @Column('varchar')
    name: string;

    // @Column('varchar')
    // password: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    phone_number: string;
}

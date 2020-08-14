import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Space } from './space';
import { User } from './user';

@Entity()
export class Rent extends BaseEntity {
    @OneToOne((type) => Space)
    @JoinColumn()
    space: Space;

    @OneToOne((type) => User)
    @JoinColumn()
    user: User;

    @Column('int')
    price: number;

    @Column('int')
    interval: number;

    @Column('timestamp')
    next_payment: Date;
}

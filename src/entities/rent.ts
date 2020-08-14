import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Space } from './space';

@Entity()
export class Rent extends BaseEntity {
    @OneToOne((type) => Space)
    @JoinColumn()
    space: Space;

    @Column('uuid')
    user_id: string;

    @Column('int')
    price: number;

    @Column('int')
    interval: number;

    @Column('timestamp')
    next_payment: Date;
}

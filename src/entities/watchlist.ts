import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';
import { Space } from './space';

@Entity()
export class Watchlist extends BaseEntity {
    @OneToOne((type) => User)
    @JoinColumn()
    user: User;

    @OneToOne((type) => Space)
    @JoinColumn()
    space: Space;

    @Column('int', { nullable: true })
    reference_price?: number;

    @Column('int', { nullable: true })
    current_price?: number;

    @Column('float', { nullable: true })
    changes?: number;
}

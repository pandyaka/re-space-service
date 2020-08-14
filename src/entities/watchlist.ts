import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';

@Entity()
export class Watchlist extends BaseEntity {
    @OneToOne((type) => User)
    @JoinColumn()
    user_id: User;

    @Column('uuid')
    space_id: string;

    @Column('int', { nullable: true })
    reference_price?: number;

    @Column('int', { nullable: true })
    current_price?: number;

    @Column('float', { nullable: true })
    changes?: number;
}

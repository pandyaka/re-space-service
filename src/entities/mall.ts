import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
// eslint-disable-next-line import/no-cycle
import { Space } from './space';

export enum MallClass {
    ELITE = 'ELITE',
    MEDIUM = 'MEDIUM',
    SLUM = 'SLUM'
}

@Entity()
export class Mall extends BaseEntity {
    @Column('varchar')
    name: string;

    @Column('enum', { default: 'MEDIUM', enum: MallClass })
    class: MallClass;

    @Column('varchar')
    location: string;

    @Column('varchar', { nullable: true })
    highlights?: string[];

    @Column('varchar', { nullable: true })
    image_url?: string[];

    @Column('varchar', { nullable: true })
    map_url?: string[];

    @OneToMany((type) => Space, (space) => space.mall)
    spaces: Space[];
}

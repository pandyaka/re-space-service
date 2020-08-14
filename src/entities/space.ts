import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
// eslint-disable-next-line import/no-cycle
import { Mall } from './mall';

export enum ShapeType {
    SQUARE = 'SQUARE',
    CIRCLE = 'CIRCLE'
}

export enum AllowedTenantType {
    FOOD_AND_BEVERAGE = 'FOOD_AND_BEVERAGE',
    FASHION = 'FASHION',
    KIDS_AND_ENTERTAINMENT = 'KIDS_AND_ENTERTAINMENT',
    SMALL_RETAIL = 'SMALL_RETAIL',
    BEAUTY = 'BEAUTY',
    GADGET_AND_ELECTRONIC = 'GADGET_AND_ELECTRONIC',
    HEALTH = 'HEALTH',
    FITNESS = 'FITNESS',
    HOME_AND_LIVING = 'HOME_AND_LIVING'
}

@Entity()
export class Space extends BaseEntity {
    @Column('varchar')
    name: string;

    @Column('int', { default: 0 })
    size: string;

    @Column('enum', { default: 'SQUARE', enum: ShapeType })
    shape: ShapeType;

    @Column('int', { default: 0 })
    price: number;

    @Column('enum', { enum: AllowedTenantType })
    allowed_tenant_type: AllowedTenantType;

    @Column('varchar', { nullable: true })
    image_url?: string[];

    @ManyToOne((type) => Mall, (mall) => mall.spaces)
    mall: Mall;
}

import { Factory } from 'fishery';
import { Space, SpaceShapeType, SpaceAllowedTenantType } from 'entities/space';
// eslint-disable-next-line import/no-cycle
import { factories } from '..';

export const space = Factory.define<Space>(() => {
    const mallToInclude = factories.mall.build();
    return {
        name: 'asd',
        size: 10,
        shape: SpaceShapeType.SQUARE,
        price: 1_000_000,
        allowed_tenant_type: SpaceAllowedTenantType.FASHION,
        image_url: ['/img/sp1.jpeg', '/img/sp2.jpeg'],
        mall: mallToInclude
    };
});

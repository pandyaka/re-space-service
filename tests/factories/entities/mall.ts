import { Factory } from 'fishery';
import { Mall, MallClass } from 'entities/mall';

export const mall = Factory.define<Mall>(() => {
    return {
        name: 'Grand Indonesia',
        class: MallClass.ELITE,
        location: 'Jakarta Pusat',
        highlights: ['Bundaran HI', 'Plaza Indonesia'],
        image_url: ['/img/gi1.jpeg', '/img/gi2.jpeg'],
        map_url: ['/maps/mapgi1.svg', '/maps/mapgi2.svg'],
        spaces: []
    };
});

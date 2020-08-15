import { Request, Response, Router } from 'express';
import { FindMallQuery } from 'repositories/mall';
import { MallService } from 'services/mall';
import { Mall, MallClass } from 'entities/mall';

export class MallController {
    private router: Router;

    constructor(private mallService: MallService) {
        this.router = Router();
        this.router.post('/', this.createMall.bind(this));
        this.router.get('/', this.getMalls.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    public async createMall(req: Request, res: Response) {
        const mallToCreate: Partial<Mall> = {
            name: req.body.name,
            class: req.body.class as MallClass,
            location: req.body.location,
            highlights: req.body.highlights,
            image_url: req.body.image_url,
            map_url: req.body.map_url
        };

        try {
            const mall = await this.mallService.createMall(mallToCreate);

            return res.status(200).json(mall);
        } catch (error) {
            return res.send(error);
        }
    }

    public async getMalls(req: Request, res: Response) {
        const mallQuery: FindMallQuery = {
            name: req.body.name as string,
            class: req.body.class as MallClass,
            location: req.body.location as string,
            highlights: req.body.highlights as string[]
        };

        try {
            const malls = await this.mallService.getMall(mallQuery);

            return res.status(200).json(malls);
        } catch (error) {
            return res.send(error);
        }
    }
}

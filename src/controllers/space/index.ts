import { Request, Response, Router } from 'express';
import { SpaceService } from 'services/space';

export class SpaceController {
    private router: Router;

    constructor(private spaceService: SpaceService) {
        this.router = Router();
        this.router.get('/', this.getSpaces.bind(this));
        this.router.post('/', this.createSpace.bind(this));
    }

    public getRouter() {
        return this.router;
    }

    public async createSpace(req: Request, res: Response) {
        try {
            const spaceToCreate = req.body;
            const space = await this.spaceService.createSpace(spaceToCreate);
            return res.status(200).json(space);
        } catch (error) {
            return res.send(error);
        }
    }

    // export type FindSpaceQuery = {
    //     name?: string;
    //     size?: number;
    //     shape?: SpaceShapeType;
    //     price?: number;
    //     allowed_tenant_type?: SpaceAllowedTenantType;
    //     mall_id?: string;
    // };

    public async getSpaces(req: Request, res: Response) {
        try {
            if (req.query.mall_id) {
                const spaceQuery = {
                    mall_id: req.query.mall_id as string
                };
                const spaces = await this.spaceService.getSpace(spaceQuery);
                return res.status(200).json(spaces);
            }
            const spaces = await this.spaceService.getSpace({});
            return res.status(200).json(spaces);
        } catch (error) {
            return res.send(error);
        }
    }
}

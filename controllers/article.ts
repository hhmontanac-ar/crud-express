import {NextFunction, Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article} from '../models';
import { ArticleService } from '../services';

const {ObjectId} = Types;
const articleService = new ArticleService();

class ArticleController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await articleService.fetch());
        } catch (error) {
            next(error)
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await articleService.find(req.params.id);
            res.send(article);
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const created = await articleService.create(req.body.article);
            res.status(201).send(created);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await articleService.update(req.params.id, req.body.article));
        } catch (error) {
            next(error);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await articleService.remove(req.params.id));
        } catch (error) {
            next(error);
        }
    }
}

export default ArticleController;

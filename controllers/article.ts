import {NextFunction, Request, Response} from 'express'
import {Types} from 'mongoose'
import {Article} from '../models';

const {ObjectId} = Types;

class ArticleController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Article.find());
        } catch (error) {
            next(error)
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await Article.findById(req.params.id);
            // articles.find(article => article.id === req.params.id);
            res.send(article);
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const created = await Article.create(req.body.article);
            res.send(created);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Article.findByIdAndUpdate(req.params.id, req.body.article, {new: true}));
        } catch (error) {
            next(error);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await Article.findByIdAndRemove(req.params.id));
        } catch (error) {
            next(error);
        }
    }
}

export default ArticleController;

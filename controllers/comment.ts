import {NextFunction, Request, Response} from 'express'
import {Types} from 'mongoose'
import {Comment} from '../models';
import { CommentService } from '../services';

const commentService = new CommentService();

class CommentController {
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await commentService.fetch(req.params.article));
        } catch (error) {
            next(error)
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        try {
            const article = await commentService.find(req.params.id);
            res.send(article);
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const created = await commentService.create(req.body.comment);
            res.status(201).send(created);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await commentService.update(req.params.id, req.body.comment));
        } catch (error) {
            next(error);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await commentService.remove(req.params.id));
        } catch (error) {
            next(error);
        }
    }
}

export default CommentController;
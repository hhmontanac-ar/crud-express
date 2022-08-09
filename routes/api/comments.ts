import {Router} from 'express';
import {CommentController} from '../../controllers';

const CommentsApi = (router: Router) => {
    router.post('/', CommentController.create);
    router.get('/:article', CommentController.fetch);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
};

export default CommentsApi;
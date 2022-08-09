import {Router} from 'express';
import articlesApi from './articles';
import commentsApi from './comments';

const routes = (router: Router) => {
    router.use(`/articles`, articlesApi(Router()));
    router.use(`/comments`, commentsApi(Router()));

    return router;
};

export default routes

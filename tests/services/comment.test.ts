import {Article, Comment, IComment} from "../../models";
import {CommentService} from "../../services";

const dBTest = require('../dBTest')

describe("CommentService", () => {
    beforeAll(async () => {
        await dBTest.connect();
    });

    afterEach(async () => {
        await dBTest.reset();
    });

    afterAll(async () => {
        await dBTest.disconnect();
    });

    const commentService = new CommentService();

    describe('fetch', () => {
        test('Should return empty array if no comments are present', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comments = await commentService.fetch(article._id);

            expect(comments).toHaveLength(0);
        });

        test('Should return comments', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comment1 = await Comment.create({
                title: 'Comment1',
                author: 'User1',
                body: 'Comment 1 text',
                article: article._id
            });

            const comment2 = await Comment.create({
                title: 'Comment2',
                author: 'User2',
                body: 'Comment 2 text',
                article: article._id
            });

            const comments = await commentService.fetch(article._id);

            expect(comments[0].title).toBe(comment1.title);
            expect(comments[1].title).toBe(comment2.title);
        });
    });

    describe('create', () => {
        test('Should create comment', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comment1 = {
                title: 'Comment1',
                author: 'User1',
                body: 'Comment 1 text',
                article: article._id
            };

            const newComment = await commentService.create(comment1 as IComment);

            expect(newComment).not.toBeNull();
            expect(newComment?.title).toBe(comment1.title);
        });
    });

    describe('update', () => {
        test('Should update comment', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comment1 = await Comment.create({
                title: 'Comment1',
                author: 'User1',
                body: 'Comment 1 text',
                article: article._id
            });

            const newTitle = 'New Title';
            const modified = await commentService.update(comment1._id, { title: newTitle } as unknown as IComment);

            expect(modified?.title).toBe(newTitle);
        });

        test('Should not update comment with null values', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comment1 = await Comment.create({
                title: 'Comment1',
                author: 'User1',
                body: 'Comment 1 text',
                article: article._id
            });

            try {
                await commentService.update(comment1._id, { } as IComment);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('remove', () => {
        test('Should remove comment', async () => {
            const article = await await Article.create({  
                title: "PTSD",
                author: "Alice",
                body: "An article about PTSD in WW3"});

            const comment1 = await Comment.create({
                title: 'Comment1',
                author: 'User1',
                body: 'Comment 1 text',
                article: article._id
            });

            await commentService.remove(comment1._id);

            const removed = await Comment.findById(comment1._id);
            expect(removed).toBeNull();
        });
    });
})
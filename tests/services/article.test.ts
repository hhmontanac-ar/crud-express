import {Article, IArticle, Comment} from "../../models";
import {ArticleService} from "../../services";

const dBTest = require('../dBTest')

let aliceArticle: IArticle;
let bobArticle: IArticle;

const createArticles = async () => {
    aliceArticle = await Article.create({  title: "PTSD",
        author: "Alice",
        body: "An article about PTSD in WW3"});

    bobArticle = await Article.create({  title: "ETS",
        author: "Bob",
        body: "An article about ETS in WW3"});
};


describe("ArticleService", () => {
    beforeAll(async () => {
        await dBTest.connect();
    });

    afterEach(async () => {
        await dBTest.reset();
    });

    afterAll(async () => {
        await dBTest.disconnect();
    });

    const articleService = new ArticleService();

    describe('fetch', () => {
        test('Should return empty array', async () => {
            const articles = await articleService.fetch();

            expect(articles).toHaveLength(0);
        });

        test('Should return articles', async () => {
            await createArticles();
            const articles = await articleService.fetch();

            expect(articles[0].title).toBe(aliceArticle.title);
            expect(articles[1].title).toBe(bobArticle.title);
        });
    });

    describe('find', () => {
        test('Should return null', async () => {
            const article = await articleService.find("62f2800d4790c511ac1022c5");

            expect(article).toBeNull();
        });

        test('Should return article', async () => {
            const testArticle = await Article.create({  title: "Test",
                author: "guest",
                body: "Body of an article"});

            const article = await articleService.find(testArticle._id);

            expect(article).toBeDefined();
            expect(article?.title).toBe(testArticle.title);
        });
    });

    describe('create', () => {
        test('Should create article', async () => {
            const article = { title: 'IMF', author: 'Jim', body: 'An article about the IMF in WW3' } ;

            const createdArticle = await articleService.create(article);

            expect(createdArticle).not.toBeNull();
            expect(createdArticle?.title).toBe(article.title);
        });

        test('Should not create article if author is null', async () => {
            const article = { title: 'IMF', author: 'Jim', body: 'An article about the IMF in WW3' } ;

            try {
                await articleService.create(article);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('update', () => {
        test('Should update article', async () => {
            const gotArticle = await Article.create({
                title: "GOT",
                author: "GRRMartin",
                body: "An article about GOT in WW3"
            });

            const modified = await articleService.update(gotArticle._id, { title: 'No GOT' } as IArticle);

            expect(modified?.title).toBe('No GOT');
        });

        test('Should not update article with null values', async () => {
            const lotrArticle = await Article.create({
                title: "LOTR",
                author: "Beren",
                body: "An article about LOTR in WW3"
            });

            try {
                await articleService.update(lotrArticle._id, { } as IArticle);
            }
            catch (err) {
                expect(err).not.toBeNull();
            }
        });
    });

    describe('remove', () => {
        test('Should remove article', async () => {
            const spqrArticle = await Article.create({
                title: "SPQR",
                author: "Romulus",
                body: "An article about the SPQR in WW3"
            });

            await articleService.remove(spqrArticle._id);

            const removed = await Article.findById(spqrArticle._id);
            expect(removed).toBeNull();
        });

        test('Should remove comments when parent article is removed', async () => {
            const wowArticle = await Article.create({
                title: "WOW",
                author: "Blizzard",
                body: "An article about WOW in WW3"
            });

            const comment = await Comment.create({
                title: "Comment to be Delete",
                author: "guest",
                body: "A comment that should be deleted",
                article: wowArticle._id
            });

            await articleService.remove(wowArticle._id);

            const removedComment = await Comment.findById(comment._id);

            expect(removedComment).toBeNull();
        });
    });

}) 
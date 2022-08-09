import { Article, IArticle } from "../models"; 

class ArticleService{
    fetch(){
        return Article.find().lean().exec();
    }

    find(id: any){
        return Article.findById(id).lean().exec();
    }

    create(article: IArticle){
        return Article.create(article);
    }

    update(id: any, article: IArticle){
        return Article.findByIdAndUpdate(id, article, {new: true}).lean().exec();
    }

    async remove(id: any){
        return await Article.findByIdAndRemove(id);
    }
}

export default ArticleService;
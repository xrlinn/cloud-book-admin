const rq = require('request-promise');
const cheerio = require('cheerio')
const bookModel = require('../model/book')
const titleModel = require('../model/title')
const articleModel = require('../model/article')


async function getBook (req,res,next) {
    try {
        const {url ,img, author, title} = req.body;
        const data = await rq.get(url)
        const $ = cheerio.load(data)
        let desc;

        // 第一步： 请求书籍的网址

        // 第二步：拿到书的描述 书的标题 在book集合中创建一条书籍记录

        // 第三步： 拿到目录 根据目录链接，去请求每一篇文的内容，存储到目录
        // 和文章中。

        // 第四步; 爬取完成

        desc = $('meta[name="description"]').attr('content')
        const book = await bookModel.create({
           title,
           img,
           author,
           desc
        })

        let baseUrl
        let titlesArrUrl = []
        let titleText = []
        const titleEle = $('.catalog a')
        let titleArr = url.split('/') // 字符串转数组
        titleArr.pop() // 去除最后一项
        baseUrl = titleArr.join('/') + '/' // 数组转字符串

        titleEle.each((index,item) => { // 得到所有目录为止
            titlesArrUrl.push(
                baseUrl + $(item).attr('href')
            )
            titleText.push($(item).text())
        })

        await bookModel.update({title},{
            length: titlesArrUrl.length
        })
        // async await 中foreach和map方法不好用 用for循环
        for(let i = 0; i < titlesArrUrl.length; i++){
            const item = titlesArrUrl[i]
            const index = i;
            console.log(item)
            const articleData = await rq.get(item)
            const $ = cheerio.load(articleData)
            const content = $('.content').text()

            const title = await titleModel.create({
                bookId: book._id,
                title: titleText[index],
                index,
                total: titlesArrUrl.length
            })

            const article = await articleModel.create({
                bookId: book._id,
                content,
                index,
                titleId: title._id 
            })
        }

        res.json({
            code: 200,
            msg: '爬取成功'
        })

    } catch (err) {
        next(err)
    }
}

async function getBookById (req,res,next) {
    try {
        const {id} = req.params
        const data = await bookModel.findById(id);
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}
async function getAllBook (req,res,next) {
    try {
        const data = await bookModel.find()
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getBook,
    getBookById,
    getAllBook
}


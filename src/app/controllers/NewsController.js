class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('Hello world!');
    }
}

module.exports = new NewsController();

const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    //[GET] /home
    index(req, res, next) {
        //callback
        // Course.find({}, function (err, courses) {
        //     if(!err) {
        //         res.json(courses)
        //     } else {
        //         next(err)
        //     }
        // })
        //promise
        Course.find({})
            .then(courses => {
                // courses = courses.map(course => course.toObject());
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
        // res.render('home');
    }

    // [GET] /news/:slug
    search(req, res) {
        res.send('Hello world!');
    }
}

module.exports = new SiteController();

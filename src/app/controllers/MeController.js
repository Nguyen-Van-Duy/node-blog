const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    
    //[get] me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
            res.render('me/stored-courses', {
                deletedCount,
                courses: mutipleMongooseToObject(courses)
            })
            )
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)})) 
        //     .catch(next)
    }

    //[get] me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {courses: mutipleMongooseToObject(courses)})) 
            .catch(next)
    }

}

module.exports = new MeController();

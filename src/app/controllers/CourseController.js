const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then( course => {
                // res.send('COURSES!' + course);
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)
        // res.send('COURSES!' + req.params.slug);
    }

    //[get] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    //[post] /me/stored/courses
    store(req, res) {
        const course = new Course(req.body)
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
    }

    //[post] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                courses: mongooseToObject(course)
            }))
            .catch(next)
    }

    //[put] courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }

    //[delete] courses/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[patch] courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[delete] courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:valid
                res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new CourseController();

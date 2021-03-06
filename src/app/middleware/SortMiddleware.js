module.exports = function SortMiddleware (req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default'
    }

    //kta url có _sort ko
    if(req.query.hasOwnProperty('_sort')) {
        // res.locals_sort.enabled = true;
        // res.locals._sort.type = res.query.type;
        // res.locals._sort.name = res.query.column;

        // hợp nhất object
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }

    next()
}
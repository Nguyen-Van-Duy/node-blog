const path = require('path');
const express = require('express');
//ghi lại yêu cầu lỗi vào console
const morgan = require('morgan');
//hỗ trợ viết html
const handlebars = require('express-handlebars');
const db = require('./config/db')
const app = express();
const route = require('./routes');

const methodOverride = require('method-override');

const SortMiddleware = require('./app/middleware/SortMiddleware')

//connect DB
db.connect()

app.use(morgan('combined'));

//nối vs public, express ktra file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//middleware xử lý dữ liệu form query post(body_parser -> qs dọc params trả lại object)
//bắt dữ liệu submit từ form
app.use(
    express.urlencoded({
        extend: true,
    }),
);
//xuất .json
// app.use(express.json());

app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleware)

//middleware 

// app.use(bacBaoVe)

// function bacBaoVe (req, res, next) {
//     if(['vethuong', 'vevip'].includes(req.query.ve)) {
//         req.face = 'vethuong';
//         return next()
//     }
//     res.status(403).json({message: 'error!'})
// }

// app.get('/middleware', 
//     function (req, res, next) {
//         if(['vethuong', 'vevip'].includes(req.query.ve)) {
//             req.face = 'vethuong';
//             return next()
//         }
//         res.status(403).json({message: 'error!'})
//     },
//     function (req, res, next) {
//         res.json({
//             message: 'successfully',
//             face: req.face
//         })
//     }
// )

// template engine
//app sd engine handlebars, name: handlebars
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            // sortable: (field, sort) => {

            // }
        }
    }),
);
//sd cho app là view engine là handlebars
app.set('view engine', 'hbs');

//set vị trí lấy views của app
//__dirname vi trí fie đang chạy
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

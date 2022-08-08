const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sinhvien',
});
db.connect();

//xu ly get (select)
app.get('/data', (req, res) => {
    var sql = 'select * from sinhvien';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);// gui ket qua cho reat native
    });
});

//xu ly post (insert)
app.post('/data', (req, res) => {
    console.log(req.body);
    //tham so truyen
    var data = { name: req.body.name, age: req.body.age };
    var sql = 'insert into sinhvien set ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({
            status: 'du lieu dc them thanh cong',
            no: null,
            name: req.body.name,
            age: req.body.age
        });
    });
});

app.listen(3000, function () {
    console.log("Server listening on http://localhost:3000");
})

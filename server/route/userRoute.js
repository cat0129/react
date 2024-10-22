const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const connection = require('../db');
const { jwtAuthentication } = require('../jwtAuth');

const bcrypt = require('bcrypt');

const JWT_KEY = "secret_key";
const ROUND = 10;

router.route("/")
    .get((req, res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.render('user', { list : results }); 
        });
    })
    .post((req, res)=>{
        const { email, password } = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE id = ?';
      
        connection.query(query, [email], async (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            const user = results[0];
            const pwd = results[0].pwd;
            // const hashedPwd = await bcrypt.hash(pwd, 10); // 10은 salt round 수
            // 사용자 정보를 DB에 저장
            // const newUser = await User.create({ email, pwd: hashedPwd });
            const result = await bcrypt.compare(password, pwd);

            if(result){
              const token = jwt.sign({userId:user.id, name:user.name}, JWT_KEY, {expiresIn:'1h'});
              res.json({ success: true, message : "로그인 성공", token });
              console.log(token);
            } else{
              res.json({ success: false, message: '실패!' });
            }
          } else {
            // 로그인 실패
            res.json({ success: false, message: '실패!' });
          }
        });
    });

router.route("/insert")
    .post((req, res) => {
        const { email, pwd } = req.body;
        const query = 'INSERT INTO TBL_USER (id, pwd) VALUES (?, ?)';

        // 비밀번호 해싱
        bcrypt.hash(pwd, ROUND, (err, hash) => {
            if (err) {
                console.error('비밀번호 해시 중 오류 발생:', err);
                return res.status(500).json({ success: false, message: "해시 오류" });
            }

            // 해시된 비밀번호로 DB에 사용자 정보 저장
            connection.query(query, [email, hash], (err, results) => {
                if (err) {
                    console.error('DB에 사용자 저장 중 오류 발생:', err);
                    return res.json({ success: false, message: "DB 오류" });
                }
                res.json({ success: true, message: "가입 성공" });
            });
        });
    });

module.exports = router;
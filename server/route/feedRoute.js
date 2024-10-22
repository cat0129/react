const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');

router.route("/")
    .get(jwtAuthentication, (req,res)=>{
        const query = 'SELECT * FROM TBL_FEED';
        connection.query(query, (err,results)=>{
            if(err){
                console.log('쿼리 실행 실패', err);
                return;
            }
            res.json({ success: true, list: results });
        })
    })
  
router.route("/:id")
    .delete((req,res)=>{
        const id = req.params.id;
        const query = 'DELETE FROM TBL_FEED WHERE ID=?';
        connection.query(query, [id], (err,result)=>{
            if(err){
                return res.json({success:false, message:"db오류"});
            }
            res.json({success:true, message:"삭제됨"});
        })
    })    

router.route("/:id")
    .put((req,res)=>{
        const id = req.params.id;
        const query = 'UPDATE TBL_FEED SET FAVORITE=FAVORITE+1 WHERE ID=?'
        connection.query(query, [id], (err,result)=>{
            if(err){
                return res.json({success:false, message:"db오류"});
            }
            res.json({success:true, message:"수정됨"});
        })
    })    

module.exports = router;
var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'db_siswa'
})
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

	let sql = "select * from tb_siswa";
	connection.query(sql,(err,rows)=>{
		if (err) {throw err}
  		res.render('index', { data: rows });
	})
});

router.get('/form/deleteData',(req,res,next)=>{
	let noinduk = req.param('noinduk');
	let sql = "delete from tb_siswa where noinduk='"+noinduk+"'";
	connection.query(sql,(err,result)=>{
		if(err)throw err;
		if(result){
			res.redirect('/')
		}
	})
})

router.post('/form/tambahData',(req,res,next)=>{
	let nama = req.body.nama;
	let noinduk = req.body.noinduk;
	let alamat = req.body.alamat;
	let hobi = req.body.hobi;

	let sql = "INSERT INTO tb_siswa (noinduk,nama,alamat,hobi) VALUES (?,?,?,?)";

	connection.query(sql,[noinduk,nama,alamat,hobi], (error,result)=>{
		if(error) throw error;
		res.redirect('/');
	})

router.post('/form/updateData',(req,res,next)=>{
	let nama = req.body.nama;
	let noinduk = req.body.noinduk;
	let alamat = req.body.alamat;
	let hobi = req.body.hobi;

	let sql = "update tb_siswa set nama='"+nama+"',alamat='"+alamat+"',hobi='"+hobi+"' where noinduk='"+noinduk+"' ";

	connection.query(sql,(error,result)=>{
		if(error) throw error;
		res.redirect('/');
		} )
	})


})

module.exports = router;

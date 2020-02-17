var express = require('express');
var router = express.Router();
var pdf = require('html-pdf');
var mysql = require('mysql');
var path          = require('path');
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
	let noinduk = req.query.noinduk;
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
});

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

router.get('/form/export',(req,res,next)=>{
	var table = "";
	var rowd = "";

	
	let sql = "select * from tb_siswa";
	connection.query(sql,(err,rows)=>{
		if (err) {
			res.json({status:false,message:'Query Failed'})
			return;}
			table += "<table border='1' style='width:100%;word-break:break-word;'>";
			table += "<tr>";
			table += "<th >Nomor Induk</th>";
			table += "<th >Nama";
			table += "</tr>";
	  		for(var i = 0;i < rows.length ; i++){
	  			rowd += "<tr>";
	  			rowd += "<td>";
	  			rowd += rows[i].noinduk;
	  			rowd += "</td>"
	  			rowd += "<td>";
	  			rowd += rows[i].nama;
	  			rowd += "</td>";
	  		}

			table += rowd;
			table += "</table>";
			pdf.create(table).toFile('public/tes.pdf',function(err,result){
			if (err){
			res.json({status:false,message:err.toString()})
			return;
			}
	  		res.json({status:true,message:'Success!'})
		})

	})

	})

module.exports = router;

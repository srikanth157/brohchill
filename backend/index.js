const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const mysql=require('mysql')

const app = express()
const port = process.env.PORT || 4040;

app.use(fileupload())
app.use(cors())

const pool = mysql.createPool({
    host:'localhost',
    user:"root",
    password:'srikanth@157',
    database:'brochill',
    connectionLimit:10
})

app.get('/brohchil',(req,res)=>{
    pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('inside connnected')
            connection.query('SELECT * FROM new_table ',(err,rows)=>{
                connection.release();
                if(!err){
                    res.send({rows})
                }else{
                    console.log(err)
                }
            })
        })
})


app.post('/upload', (req, res) =>
{
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.send('please upload a file');
    }
    
    sampleFile = req.files.file;
    uploadPath=__dirname+'/public/images/'+sampleFile.name
    
    sampleFile.mv(uploadPath,function(err){
        if(err) return res.send(err)
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('inside connnected')
            connection.query('INSERT INTO new_table (img_src) VALUES (?)',[uploadPath],(err,result)=>{
                connection.release();
                if(!err){
                    res.send('yes stored')
                }else{
                    console.log(err)
                }
            })
        })
       
    })
    
})



app.listen(port, () =>
{
    console.log('server running')
})
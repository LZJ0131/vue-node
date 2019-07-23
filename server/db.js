var mysql = require('mysql');


var connnectionPool = mysql.createPool({
  host    : 'localhost',
  user    : 'root',
  password: 'root',
  database: 'tour'
});

connnectionPool.getConnection(function(err, db){
  if(err){
      console.error('CONNECTION error: ', err);
      res.statusCode = 503;
      res.send({
          result : 'error',
          err :  err.code
      });
  }
  // db.query()
  db.release();
})

module.exports=connnectionPool

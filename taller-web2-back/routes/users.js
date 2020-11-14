var express = require('express');
var router = express.Router();
var User = require('../models/users')
var db = require('../config/mongoose')
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.once('open',function(){
    console.log('about to send users');
    User.find(function (err,users){
      if(err) return console.error(err);
      res.send(users)
    })
  })
});

/*POST user*/
router.post('/', (req,res)=>{
  console.log(req.body)
  const newUser=new User({firstname:req.body.firstname,
                          lastname:req.body.lastname,
                          username:req.body.username,
                          identification:req.body.identification,
                          photo:req.body.photo,
                          active:req.body.active,
                          password:req.body.password})
  db.once('open', function() {
      console.log('Connected to atlas')
      newUser.save(function(err,newUser){
        if (err) return console.error(err);
        console.log('A FUCKING USER HAS BEEN SAVED')
        res.send('A user has been saved successfully')
      })
  });
})

module.exports = router;

const CurWish = require('../models/wish');
const User = require('../models/user')

module.exports = {
    newWish,
    edit,
    showWish,
    delete: deleteWish,
    index
}

function index(req, res){
    CurWish.find({}, function(err, wishes){
        res.render('wishes/index', {wishes, user: req.user})
    })
}

function deleteWish(req, res) {
    console.log('delete start')
    CurWish.deleteOne(req.params.id);
    res.redirect('/users');
    console.log('delete end')
  }

function showWish(req, res){
    CurWish.findById(req.params.id, function(err, wish){
        res.render('wishes/show', {wish, user: req.user})
    })
}

function newWish(req, res) {
    User.findById(req.user._id)
        .exec(function (err, user) {
            const wish = new CurWish(req.body);
            user.wishes.push(wish)
            console.log(wish);
            console.log(req.user)
            // req.user.save(wish)
            wish.save(function (err) {
                user.save(function (e) {

                    if (err) return res.redirect('/users');
                    // res.render('wishes/show', { wish, user: req.user });
                    res.redirect(`/wishes/${wish._id}`);
                })
            });
        })
}

function edit(req, res) {
    console.log(req.params.id)
    console.log(req.body)
    CurWish.findOneAndUpdate({_id: req.params.id}, req.body, function (err, wish) {
        //verfies that shoe is owned by user
        console.log("wish wish: ", wish)
        // wish.save(function(err, newWish))
        res.redirect(`/wishes/${wish._id}`);
    });
}
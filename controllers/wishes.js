const CurWish = require('../models/wish');
const User = require('../models/user')

module.exports = {
    newWish,
    edit,
    showWish,
    delete: deleteWish,
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

            req.body.userId = req.user._id
            const wish = new CurWish(req.body);
            wish.user = req.user._id;
            user.posts.push(wish)
            console.log(wish);
            console.log(req.user)
            // req.user.save(wish)
            wish.save(function (err) {
                user.save(function (e) {

                    if (err) return res.redirect('/users');
                    res.render('wishes/show', { wish, user: req.user });
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
        res.redirect(`/wishes/pool/${wish._id}`);
    });
}
const CurWish = require('../models/wish');
const User = require('../models/user')

module.exports = {
    newWish,
    edit,
    showWish
}

function showWish(req, res){
    CurWish.findById(req.params.id, function(err, wish){
        res.render('wishes/show', {wish})
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
                    res.render('wishes/show', { wish });
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
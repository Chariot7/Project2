const CurWish = require('../models/wish');
const User = require('../models/user')

module.exports = {
    newWish,
    edit,
    showWish,
    delete: deleteWish,
    index,
    addLike,
    deleteLike,
}

function index(req, res) {
    // COMMENT IN THE CODE BELOW TO DELETE EVERY WISH
    // CurWish.deleteMany({}, function(err, wishes){   
    //     User.find({}, function (err, allUsers) {
    //         allUsers.forEach(u => {
    //             u.wishes = []
    //             u.save()
    //         })
    //     })
    //     res.render('wishes/index', {wishes, user: req.user}) 
    // })
    CurWish.find({}, function (err, wishes) {
        res.render('wishes/index', { wishes, user: req.user })
    })
}

function deleteWish(req, res) {
    console.log('delete start')
    console.log(req.user.wishes)
    console.log(req.params)
    CurWish.deleteOne({_id: req.params.id}, function(err) {
        console.log('delete end')
        res.redirect('/users');
    })
}

function showWish(req, res) {
    let wisher = undefined
    CurWish.findById(req.params.id, function (err, wish) {
        User.find({}, function (err, allUsers) {

            allUsers.forEach(u => {
           
                if (u.toString().includes(wish._id.toString())){
                    wisher = u
                }
            })
            CurWish.find({}, function (err, wishes) {
                res.render('wishes/show', { wishes, user: req.user, wish, wisher })
            })
            // res.render('wishes/show', { wish, user: req.user, wisher })
        })
    })
}

function addLike(req, res){
    console.log("HITTING ADD LIKE FUNCTION ")
    CurWish.findById(req.params.id, function(err, wish){
        User.findById(req.user._id, function(er, user){
            console.log("FOUND WISH AND USER")
            wish.likes.push(user._id)
            console.log(wish.likes)
            wish.save(function(err){
                console.log("WISH LIKE SAVED")
                res.redirect(`/wishes/${wish._id}`)
            })
        })
    })
}

function deleteLike(req, res) {
    console.log("HITTING DELETE LIKE FUNCTION ")
    CurWish.findById(req.params.id, function(err, wish){
        User.findById(req.user._id, function(er, user){
            console.log(wish.likes)
            console.log(user._id)
            wish.likes = wish.likes.filter(w => { 
                console.log(w);
                w._id != user._id ;
            })
            console.log(wish.likes)
            wish.save(function(err){
                console.log("WISH DELETE SAVED")
                res.redirect(`/wishes/${wish._id}`)
            })
        })
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
    CurWish.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, wish) {
        //verfies that shoe is owned by user
        console.log("wish wish: ", wish)
        // wish.save(function(err, newWish))
        res.redirect(`/wishes/${wish._id}`);
    });
}
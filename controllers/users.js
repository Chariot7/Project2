const CurUser = require('../models/user');

module.exports = {
    index,
}

function index(req, res, next) {
    console.log(req.query)
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
    CurUser.find(modelQuery).sort(sortKey).exec(function(err, users){
        if (err) return next(err);
        res.render('users/index', {users, name: req.query.name, sortKey, user: req.user});
    })
}
module.exports = {
    ensureAuthenticated : function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'please Log in to view this resource')
        res.redirect('./users/login');
    }
}
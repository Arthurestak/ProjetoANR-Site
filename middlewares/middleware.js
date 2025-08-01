exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.checkCsrfError  = (err, req, res, next) =>{
      if(err){
            console.log(err); 
            return res.render('404');
      }
      next();
}

exports.notFound = (req, res, next) =>{
       res.status(404).render('404'); 
       next();
}
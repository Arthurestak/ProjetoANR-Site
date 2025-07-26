exports.index =(req, res) =>{
    if(req.session.user) return res.render('home');
    return res.render('home_nao_logado');
  
}
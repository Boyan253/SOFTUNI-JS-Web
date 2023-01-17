module.exports = {
  async  get(req,res){
        let id = req.params.id
        let cars = await req.storage.getById(id)
        if (cars) {
            res.render('delete', {cars})
            
        }else{
            res.redirect('404')
        }
        
    },
   async post(req,res){
        let id = req.params.id

        try {
            await req.storage.deleteCarById(id, req.session.user.id)
            res.redirect('/')
        } catch (err) {
            res.redirect('404')
        }

    }
}
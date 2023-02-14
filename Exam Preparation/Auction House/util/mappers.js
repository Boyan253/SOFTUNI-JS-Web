function mapErrors(err) {
    if (Array.isArray(err)) {
        return err
    }
    else if(err.name == 'ValidationError'){
        return Object.values(err.errors).map(e => ({msg: e.message}))
    }else if(typeof err.message == 'string'){
        return [{msg:err.message}]
    }else{
        return [{msg:'Request error'}]
    }


}
function globalErrorMapper(error, req, res, next) {
    console.log('Im inside globalErrorMapper');
    const errors = mapErrors(error)
    console.log(req.path);
    res.render(req.path.slice(1), {errors})
  
}

function postViewModel(post){
    return {
        _id: post._id,
        title: post.title,
        keyword: post.keyword,
        location: post.location ,
        date: post.date,
        image: post.image,
        description: post.description,
        author: authorViewModel(post.author),
        votes: post.votes.map(voteViewModel),
        rating: post.rating
    

    }
}
function authorViewModel(user){

return {
    _id: user._id,
    firstName: user.firstName,
    lastName:user.lastName,
}

}
function voteViewModel(user){

    return {
        _id: user._id,
        email: user.email
    }
    
    }

module.exports = {
    mapErrors,
    postViewModel,
    globalErrorMapper
}
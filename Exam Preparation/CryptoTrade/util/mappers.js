function mapErrors(err) {
    if (Array.isArray(err)) {
        return err
    }
    else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }))
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }]
    } else {
        return [{ msg: 'Request error' }]
    }
}

function globalErrorMapper(error, req, res, next) {
    console.log('Im inside globalErrorMapper');
    const errors = mapErrors(error)
    console.log(req.path);
    res.render(req.path.slice(1), { errors })

}



function cryptoViewModel(crypto) {
    return {
        _id: crypto._id,
        name: crypto.name,
        image: crypto.image,
        buyCrypto: crypto.buyCrypto,
        payment: crypto.payment,
        price: crypto.price,
        description: crypto.description,
        owner: crypto.owner,


    }
}
function authorViewModel(user) {

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
    }

}
function voteViewModel(user) {

    return {
        _id: user._id,
        email: user.email
    }

}

module.exports = {
    mapErrors,
    cryptoViewModel,
    globalErrorMapper
}
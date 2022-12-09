const routes = {}

function register(path, handler){

routes[path] = handler


}
function match(req,res){
    const url = new URL(req.url, `http://${req.headers.host}`)
const handler = routes[url.pathname]

if (typeof handler == 'function') {
    handler(req,res)
}else{

routes.default(req,res)

}

}
module.exports = {
register,
match

}
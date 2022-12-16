const { getProducts, createProduct } = require("../data")
const { loadFragment, render } = require("../view")
module.exports = {
   async catalog(req, res) {
      const products = await getProducts()
      loadFragment('catalog', fragmet => {

         const result = fragmet.replace('{{{items}}}',
            products.map(p => `<li>${p.name} - ${p.price}</li>`).join('\n')
         );
         res.html(render(result, 'Catalog'))
         res.end()
      })
   },
   createGet(req, res) {
      loadFragment('create', fragmet => {
         res.html(render(fragmet, 'Create Product'))
      })
   },
   createPost(req, res) {
      let body = ''
      req.on('data', chunk => {
         body += chunk.toString()
      })
      req.on('end', async () => {
         const formData = body
            .split("&")
            .map(prop => prop.split('='))
            .reduce((r, [k, v]) => Object.assign(r, { [k]: decodeURIComponent(v.split('+').join(' ')) }), {})
       
       await createProduct({
         name: formData.name,
         price: Number(formData.price)
       })
       
            res.redirect('/catalog')
         console.log(formData);
      })

   }

}
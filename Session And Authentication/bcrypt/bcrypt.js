let bcrypt = require("bcrypt")

const pass = "123456"

async function start(){
const hash = await bcrypt.hash(pass,9)
console.log(hash);

}
start()
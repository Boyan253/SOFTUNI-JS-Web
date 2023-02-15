const Crypto = require('../models/Crypto')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const { cryptoViewModel } = require('../util/mappers')

async function createCrypto(crypto) {

  const result = new Crypto(crypto)

  await result.save()
}


async function getAllCrypto() {

  return await Crypto.find({}).lean()


}

async function getCryptoById(id) {

 if (mongoose.Types.ObjectId.isValid(id)) {
  return Crypto.findById(id).populate("owner").lean()
} else{
  return undefined
}
}
async function getCryptoAndUsers(id) {
  {
    return Crypto.findById(id).lean().populate('owner').populate('buyCrypto')
  }
}

async function updateCrypto(id, crypto) {

  const existing = await Crypto.findById(id)


  existing.name = crypto.name
  existing.image = crypto.image
  existing.price = crypto.price
  existing.description = crypto.description
  existing.payment = crypto.payment

  await existing.save()
}

// Register a helper function called "select"
// Handlebars.registerHelper('select', function(myValue, options  ) {
//     options = [
//         {value: "crypto-wallet", text: "Crypto Wallet"},
//         {value: "credit-card", text: "Credit Card"},
//         {value: "debit-card", text: "Debit Card"},
//         {value: "paypal", text: "Paypal"}
//       ];
//     var select = new Handlebars.SafeString('<select id= "payment" name= "payment">');
//     for (var i = 0, l = options.length; i < l; i++) {

//       var selected = (options[i].text === myValue) ? 'selected' : '';
//       var disabled = options[i].disabled ? 'disabled' : '';
//       select += '<option value="' + options[i].text + '" '+selected+' '+disabled+'>' + options[i].text + '</option>';
//     }
//     select += '</select>';
//     return select;
//   });

async function buyCrypto(userId, cryptoId) {


  const crypto = await Crypto.findById(cryptoId)
  if (crypto.buyCrypto.includes(userId)) {
    const err = new Error('Already Bought Crypto')
    next(err)
  }
  crypto.buyCrypto.push(userId)


  await crypto.save()
}

async function deleteCrypto(crypto) {
  return Crypto.findByIdAndDelete(crypto)
}
async function searchAll(query) {


  let crypto = {}

  if (query.name) {
    crypto.name = new RegExp(query.name, 'g')
  }
  if(query.payment){

    crypto.payment = new RegExp(query.payment, 'g')
  }
  console.log(crypto);
  // if (payment) {
  //   crypto.payment = { $gte: Number(query.from) }
  // }

  const cryptos = await Crypto.find(crypto)
console.log(cryptos);
  return cryptos.map(cryptoViewModel)

}
module.exports = {
  createCrypto,
  getAllCrypto,
  getCryptoById,
  getCryptoAndUsers,
  updateCrypto,
  buyCrypto,
  deleteCrypto,
  searchAll

}
const { verifyWhitelist, merkle_root } = require('../models/merkleTree.service')

const verify = (req, res) => {
  console.log(req.body)
  const address = req.body.address
  const mintStep = req.body.mintStep
  console.log(`address: ${address}`)
  console.log(`mintStep: ${mintStep}`)
  if (address == undefined || mintStep == undefined) {
    return res.status(400).send({
      msg: 'Invalid Parameter',
      success: false,
    })
  }
  const result = verifyWhitelist(address, mintStep)

  if (result === false) {
    return res.status(400).send({
      msg: 'Invalid Wallet Address',
      success: false,
    })
  }

  res.status(200).send({
    ...result,
    success: true,
  })
}

const get_merkle_root = (req, res) => {
  console.log(req.body)
  const address = req.body.address
  const mintStep = req.body.mintStep
  console.log(`address: ${address}`)
  console.log(`mintStep: ${mintStep}`)
  if (address == undefined || mintStep == undefined) {
    return res.status(400).send({
      msg: 'Invalid Parameter',
      success: false,
    })
  }
  const result = merkle_root(address, mintStep)

  if (result === false) {
    return res.status(400).send({
      msg: 'Invalid Wallet Address',
      success: false,
    })
  }

  res.status(200).send({
    ...result,
    success: true,
  })
}

module.exports = {
  verify,
  get_merkle_root,
}

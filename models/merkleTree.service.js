/**
 * This is the function for the backend:
 *
 * You receive the address at the endpoint
 *
 */
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const fs = require('fs')
const WAValidator = require('wallet-address-validator')

const verifyWhitelist = (address, mintStep) => {
  // Wallet Validate
  const valid = WAValidator.validate(address, 'ETH')
  if (!valid) {
    console.log('Address INVALID')
    return false
  }
  console.log('address: ', address)
  console.log('This is a valid address')

  let rawdata = fs.readFileSync(
    `./assets/whitelist_db/whitelist_${mintStep}.json`,
  )

  let whiteListArray = JSON.parse(rawdata)
  console.log('whitelistarray: ', whiteListArray)

  const leaves = whiteListArray.map((v) => keccak256(v))
  const tree = new MerkleTree(leaves, keccak256, { sort: true })
  const root = tree.getHexRoot()
  const leaf = keccak256(address)
  const proof = tree.getHexProof(leaf)
  const verified = tree.verify(proof, leaf, root)
  console.log('root: ', root)
  console.log('leaf: ', leaf)
  console.log('proof: ', proof)
  console.log('verified: ', verified)
  return { proof, leaf, verified }
}

const merkle_root = (address, mintStep) => {
  // Wallet Validate
  const valid = WAValidator.validate(address, 'ETH')
  if (!valid) {
    console.log('Address INVALID')
    return false
  }
  console.log('address: ', address)
  console.log('This is a valid address')

  let rawdata = fs.readFileSync(
    `./assets/whitelist_db/whitelist_${mintStep}.json`,
  )

  let whiteListArray = JSON.parse(rawdata)
  console.log('whitelistarray: ', whiteListArray)

  const leaves = whiteListArray.map((v) => keccak256(v))
  const tree = new MerkleTree(leaves, keccak256, { sort: true })
  const root = tree.getHexRoot()
  console.log('root: ', root)
  return { root }
}

module.exports = {
  verifyWhitelist,
  merkle_root,
}

const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'hello salon wire another gesture pledge push purpose devote erode finger number',
  'https://rinkeby.infura.io/QvtaQyfQgEChzSNt2f27'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const contractInstance = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 })

  console.log(contractInstance.options.address)
  // 0x60A2C6679fCb788DbD74EA8B8EC79A67c6311b3d
}

deploy()

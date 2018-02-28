import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import web3 from './web3'
import lottery from './lottery'

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance('0x60A2C6679fCb788DbD74EA8B8EC79A67c6311b3d')

    this.setState({ manager, players, balance })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const accounts = await web3.eth.getAccounts()

    this.setState({ message: 'Processing transaction...' })

    await lottery.methods.enter().send({
      value: web3.utils.toWei(this.state.value, 'ether'),
      from: accounts[0]
    })

    this.setState({ message: 'You are entered. Best of luck!' })
  }

  handleClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({ message: 'Transaction is being processed...' })

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'A winner has been picked!' })
  }

  render() {
    return (
      <div>
        <h2> Lottery Contract </h2>
        <p>
          This contract is managed by:: { this.state.manager }.
          There are currently { this.state.players.length } players competing to win { web3.utils.fromWei(this.state.balance, 'ether') } ether.
        </p>

        <hr />

        <h4> Would like to enter? </h4>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <lable> Enter the amount:: </lable>
            <input
              value={ this.state.value }
              onChange={ event => this.setState({ value: event.target.value }) }
            />
          </div>
          <button> Enter </button>
        </form>

        <hr />

        <h4> Ready to pick a winner? </h4>
        <button onClick={ this.handleClick }> Pick a Winner </button>
        <hr />

        <h1> { this.state.message }</h1>
      </div>
    )
  }
}

export default App

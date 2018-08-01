import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class UserInfo extends Component {

    state = { balance: 0 };

    componentDidMount() {
        let balance = 0;

        this.props.user.transactions.elements.forEach(transaction => {
            if (transaction.type.id === 0) {
                balance += transaction.amount;
            } else {
                balance -= transaction.amount;
            }
        });

        this.setState({ balance });
    }

    render() {
        return (
                <div className="col-md-4" key={this.props.user.id} id={this.props.user.id}>
                    <div className="card mb-4 box-shadow">

                        <div className="card-header text-center">
                            User Profile
                        </div>

                        <div className="card-body">

                            <p className="card-text">
                                <strong>
                                    {this.props.user.username}
                                </strong>
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">Transactions: {this.props.user.transactions.elements.length}</small>
                                <small className="text-muted">Balance: {this.state.balance}</small>
                            </div>
                        </div>

                    </div>
                </div>
        );
    }

}

class TransactionInfo extends Component {

    render() {
        return (
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <div className="card-body">
                        <p className="card-text">
                            <strong>
                                {this.props.transaction.type.name} Transaction of ${this.props.transaction.amount}.
                            </strong>
                            <br/>
                            <span className="text-muted">{this.props.transaction.description}, {this.props.transaction.timestamp}.</span>
                        </p>
                        <small className="text-muted">
                            Transaction #: {this.props.transaction.id}
                        </small>
                    </div>
                </div>
            </div>
        );
    }

}

class App extends Component {

  state = { users: [] };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Monash Money Tracker</h1>
            </header>
            <div className="py-5 bg-light">
                <div className="container">
                    {this.state.users.map(user =>

                        <div>
                            <div className="row">
                                <UserInfo user={user}/>
                            </div>
                            <div className="row">
                                {user.transactions.elements.map(transaction =>
                                    <TransactionInfo transaction={transaction}/>
                                )}
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
  }
}

export default App;

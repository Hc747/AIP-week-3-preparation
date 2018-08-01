const express = require('express');
const router = express.Router();

const TransactionType = Object.freeze({
    INBOUND: {
        id: 0,
        name: "Inbound"
    },
    OUTBOUND: {
        id: 1,
        name: "Outbound"
    }
});

class Transaction {

    constructor(id, type, amount, description, timestamp) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.timestamp = timestamp;
    }

}

class User {

    constructor(id, username, password, transactions) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.transactions = transactions || new Repository();
    }

}

class Repository {

    constructor(elements) {
        this.elements = elements || [];
    }

    add(element) {
        this.elements.push(element);
    }

    remove(element) {
        let index = elements.indexOf(element);
        if (index > -1) {
            elements.splice(index, 1);
        }
    }

    isEmpty() {
        return elements.length < 1;
    }

}

let users = new Repository();

users.add(new User(0, 'Tester', 'tester'));
users.add(new User(1, 'Demo', 'demo'));

users.elements[0].transactions.add(new Transaction(0, TransactionType.OUTBOUND, 50.0, 'My first outbound transaction', new Date()));
users.elements[0].transactions.add(new Transaction(1, TransactionType.INBOUND, 25.0, 'My first inbound transaction', new Date()));
users.elements[0].transactions.add(new Transaction(2, TransactionType.OUTBOUND, 50.0, 'Another outbound transaction', new Date()));
users.elements[0].transactions.add(new Transaction(3, TransactionType.INBOUND, 50.0, 'Another inbound transaction', new Date()));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users.elements);
});

module.exports = router;

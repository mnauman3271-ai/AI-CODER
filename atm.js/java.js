// i can use java js
console.log("noman")

let correctPIN = "1234";
let balance = 10000;

function login(pin) {
    if (pin === correctPIN) {
        console.log("Login successful!");
        return true;
    } else {
        console.log("Wrong PIN!");
        return false;
    }
}

function checkBalance() {
    console.log("Your balance is Rs.", balance);
}

function deposit(amount) {
    if (amount > 0) {
        balance += amount;
        console.log("Deposit successful!");
        console.log("New balance: Rs.", balance);
    } else {
        console.log("Invalid amount!");
    }
}

function withdraw(amount) {
    if (amount <= 0) {
        console.log("Invalid amount!");
    } else if (amount > balance) {
        console.log("Insufficient balance!");
    } else {
        balance -= amount;
        console.log("Please collect your cash.");
        console.log("Remaining balance: Rs.", balance);
    }
}

// ATM use karna
if (login("1234")) {
    checkBalance();
    deposit(2000);
    withdraw(3000);
    checkBalance();
}
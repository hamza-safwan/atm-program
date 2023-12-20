class Account {
    constructor(accountNumber, pin, balance) {
      this.accountNumber = accountNumber;
      this.pin = pin;
      this.balance = balance;
    }
  
    validatePin(enteredPin) {
      return this.pin === enteredPin;
    }
  
    getBalance() {
      return this.balance;
    }
  
    withdraw(amount) {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        console.log(`Amount withdrawn: $${amount}`);
        console.log(`Remaining balance: $${this.balance}`);
      } else {
        console.log("Invalid amount or insufficient balance.");
      }
    }
  
    deposit(amount) {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Amount deposited: $${amount}`);
        console.log(`Current balance: $${this.balance}`);
      } else {
        console.log("Invalid amount.");
      }
    }
  }
  
  class ATM {
    constructor(account) {
      this.account = account;
      this.attempts = 3;
    }
  
    async start() {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
  
      while (this.attempts > 0) {
        const enteredPin = await this.askQuestion(rl, "Enter your PIN: ");
        if (this.account.validatePin(enteredPin)) {
          await this.processTransactions(rl);
          break;
        } else {
          this.attempts--;
          console.log(`Invalid PIN. Attempts left: ${this.attempts}`);
        }
      }
  
      if (this.attempts === 0) {
        console.log("Too many incorrect attempts. Your account is locked. Please contact customer service.");
        rl.close();
      }
    }
  
    async askQuestion(rl, question) {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer);
        });
      });
    }
  
    async processTransactions(rl) {
      const options = ["Check Balance", "Withdraw Money", "Deposit Money", "Exit"];
      let choice = 0;
  
      while (choice !== 4) {
        this.displayMenu();
  
        choice = parseInt(await this.askQuestion(rl, "Choose an option: "));
        switch (choice) {
          case 1:
            console.log(`Current Balance: $${this.account.getBalance()}`);
            break;
          case 2:
            const withdrawAmount = parseFloat(await this.askQuestion(rl, "Enter amount to withdraw: $"));
            this.account.withdraw(withdrawAmount);
            break;
          case 3:
            const depositAmount = parseFloat(await this.askQuestion(rl, "Enter amount to deposit: $"));
            this.account.deposit(depositAmount);
            break;
          case 4:
            console.log("Thank you for using the ATM. Goodbye!");
            break;
          default:
            console.log("Invalid choice. Please try again.");
            break;
        }
      }
      rl.close();
    }
  
    displayMenu() {
      console.log("Welcome to the ATM!");
      console.log("1. Check Balance");
      console.log("2. Withdraw Money");
      console.log("3. Deposit Money");
      console.log("4. Exit");
    }
  }
  
  const userAccount = new Account("123456789", "1234", 1000.00);
  const atm = new ATM(userAccount);
  atm.start();
  
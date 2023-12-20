class Account:
    def __init__(self, account_number, pin, balance):
        self.account_number = account_number
        self.pin = pin
        self.balance = balance

    def validate_pin(self, entered_pin):
        return self.pin == entered_pin

    def get_balance(self):
        return self.balance

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"Amount withdrawn: ${amount}")
            print(f"Remaining balance: ${self.balance}")
        else:
            print("Invalid amount or insufficient balance.")

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Amount deposited: ${amount}")
            print(f"Current balance: ${self.balance}")
        else:
            print("Invalid amount.")


class ATM:
    def __init__(self, account):
        self.account = account
        self.attempts = 3

    def start(self):
        while self.attempts > 0:
            entered_pin = input("Enter your PIN: ")
            if self.account.validate_pin(entered_pin):
                self.process_transactions()
                break
            else:
                self.attempts -= 1
                print(f"Invalid PIN. Attempts left: {self.attempts}")

        if self.attempts == 0:
            print("Too many incorrect attempts. Your account is locked. Please contact customer service.")

    def process_transactions(self):
        choice = 0

        while choice != 4:
            self.display_menu()
            try:
                choice = int(input("Choose an option: "))
            except ValueError:
                print("Invalid choice. Please try again.")
                continue

            if choice == 1:
                print(f"Current Balance: ${self.account.get_balance()}")
            elif choice == 2:
                withdraw_amount = float(input("Enter amount to withdraw: $"))
                self.account.withdraw(withdraw_amount)
            elif choice == 3:
                deposit_amount = float(input("Enter amount to deposit: $"))
                self.account.deposit(deposit_amount)
            elif choice == 4:
                print("Thank you for using the ATM. Goodbye!")
            else:
                print("Invalid choice. Please try again.")

    def display_menu(self):
        print("Welcome to the ATM!")
        print("1. Check Balance")
        print("2. Withdraw Money")
        print("3. Deposit Money")
        print("4. Exit")


user_account = Account("123456789", "1234", 1000.00)
atm = ATM(user_account)
atm.start()

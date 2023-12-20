import java.util.Scanner;

class Account {
    private String accountNumber;
    private String pin;
    private double balance;

    public Account(String accountNumber, String pin, double balance) {
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.balance = balance;
    }

    public boolean validatePin(String enteredPin) {
        return pin.equals(enteredPin);
    }

    public double getBalance() {
        return balance;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Amount withdrawn: $" + amount);
            System.out.println("Remaining balance: $" + balance);
        } else {
            System.out.println("Invalid amount or insufficient balance.");
        }
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Amount deposited: $" + amount);
            System.out.println("Current balance: $" + balance);
        } else {
            System.out.println("Invalid amount.");
        }
    }
}

public class ATM {
    private Account account;

    public ATM(Account account) {
        this.account = account;
    }

    public void displayMenu() {
        System.out.println("Welcome to the ATM!");
        System.out.println("1. Check Balance");
        System.out.println("2. Withdraw Money");
        System.out.println("3. Deposit Money");
        System.out.println("4. Exit");
    }

    public void start() {
        Scanner scanner = new Scanner(System.in);

        boolean authenticated = false;
        int attempts = 3;
        while (!authenticated && attempts > 0) {
            System.out.print("Enter your PIN: ");
            String enteredPin = scanner.nextLine();

            if (account.validatePin(enteredPin)) {
                authenticated = true;
                break;
            } else {
                attempts--;
                System.out.println("Invalid PIN. Attempts left: " + attempts);
            }
        }

        if (authenticated) {
            int choice;
            do {
                displayMenu();
                System.out.print("Choose an option: ");
                choice = scanner.nextInt();
                switch (choice) {
                    case 1:
                        System.out.println("Current Balance: $" + account.getBalance());
                        break;
                    case 2:
                        System.out.print("Enter amount to withdraw: $");
                        double withdrawAmount = scanner.nextDouble();
                        account.withdraw(withdrawAmount);
                        break;
                    case 3:
                        System.out.print("Enter amount to deposit: $");
                        double depositAmount = scanner.nextDouble();
                        account.deposit(depositAmount);
                        break;
                    case 4:
                        System.out.println("Thank you for using the ATM. Goodbye!");
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                        break;
                }
            } while (choice != 4);
        } else {
            System.out.println("Too many incorrect attempts. Your account is locked. Please contact customer service.");
        }
        scanner.close();
    }

    public static void main(String[] args) {
        Account userAccount = new Account("123456789", "1234", 1000.00);
        ATM atm = new ATM(userAccount);
        atm.start();
    }
}

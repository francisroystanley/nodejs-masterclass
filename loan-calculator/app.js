const bankMapping = {
  BDO: loanAmount => new BDO(loanAmount),
  BPI: loanAmount => new BPI(loanAmount),
  METROBANK: loanAmount => new MetroBank(loanAmount)
};
const requiredArgs = ["bankName", "loanAmount", "loanTerm"];

const showErrorMsg = _args => {
  console.log(`${new Intl.ListFormat("en").format(_args)} argument required!`);
  process.exit();
};

const getArgs = () => {
  let argsObj = {};

  process.argv.forEach(arg => {
    let [key, value] = arg.split("=");

    if (!key) return;

    argsObj[key.replace("--", "")] = value;
  });

  validateArgs(argsObj);

  return argsObj;
};

const validateArgs = _args => {
  let missingArgs = [];

  requiredArgs.forEach(arg => {
    if (!(arg in _args || "--" + arg in _args)) missingArgs.push(arg);
  });

  if (missingArgs.length) showErrorMsg(missingArgs);
};

class Bank {
  constructor(loanAmount, interestRate) {
    this.loanAmount = loanAmount;
    this.interestRate = interestRate;
  }

  getMonthlyInstallment(loanTerm) {
    let interest = this.loanAmount * this.interestRate * loanTerm;
    let monthlyInstallment = (this.loanAmount + interest) / 12;

    return monthlyInstallment;
  }
}

class MetroBank extends Bank {
  constructor(loanAmount) {
    super(loanAmount, 0.015);
  }
}

class BPI extends Bank {
  constructor(loanAmount) {
    super(loanAmount, 0.012);
  }
}

class BDO extends Bank {
  constructor(loanAmount) {
    super(loanAmount, 0.017);
  }
}

class LoanCalculator {
  constructor(bankName, loanAmount, loanTerm) {
    this.bankName = bankName;
    this.loanAmount = loanAmount;
    this.loanTerm = loanTerm;

    this.getMonthlyInstallment();
  }

  getMonthlyInstallment() {
    let bank = bankMapping[this.bankName.toUpperCase()](this.loanAmount);
    let monthlyInstallment = bank.getMonthlyInstallment(this.loanTerm);
    console.log(monthlyInstallment);
  }
}

let args = getArgs();
let loanCalculator = new LoanCalculator(args.bankName, +args.loanAmount, +args.loanTerm);

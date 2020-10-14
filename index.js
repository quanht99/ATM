let customer_in4s = require("./customer-in4s.json");
let money_data = require("./money-data.json");

//return code để auto automation test
module.exports = ({ id, amount }) => {
    try {
        let index = customer_in4s.findIndex(e => e.id === id);
        if (index < 0) {
            throw new Error("Can't not find customer.");
        }
        if (typeof amount !== "number" || amount < 0) {
            throw new Error("Not valid")
        }
        let customer = customer_in4s[index];
        let total = 0;
        money_data.forEach(e => total += (e.value * e.count));
        console.log("Remain of money in ATM: ", total);
        if (amount > customer.account_balance) {
            throw new Error("The account balance is not enough to make the transaction");
        }
        if (amount > total) {
            throw new Error("Remain of money in ATM is not enough to pay for U");
        }

        let will_return = [];
        for (let i = 0; i < money_data.length; i++) {
            will_return[i] = 0;
        }
        index = money_data.length - 1;
        while (amount > 0 && index > 0) {
            let count = parseInt(amount / money_data[index].value);
            will_return[index] = count > money_data[index].count ? money_data[index].count : count;
            amount -= will_return[index] * money_data[index].value;
            console.log(amount);
            index--;
        }

        if (amount > 0) {
            throw new Error("Can't return money")
        }
        return {
            success: true,
            will_return: will_return
        }
    }
    catch (e) {
        //console.error(e.message)
        return {
            success: false,
            message: e.message
        }
    }
}
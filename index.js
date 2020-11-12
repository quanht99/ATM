let customer_in4s = require("./customer-in4s.json");
let money_data = require("./money-data.json");

//return code để auto automation test
module.exports = ({ id, amount }) => {
    let index = customer_in4s.findIndex(e => e.id === id);
    if (index < 0) {
        return getResponse(24);
    }
    if (typeof amount !== "number" || amount < 0 || amount > 1000000000 || id < 0 || id > 1000) {
        return getResponse(25);
    }
    let customer = customer_in4s[index];
    let total = 0;
    money_data.forEach(e => total += (e.value * e.count));
    console.log("Remain of money in ATM: ", total);
    if (amount > customer.account_balance) {
        return getResponse(21);
    }
    if (amount > total) {
        return getResponse(22);
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
        return getResponse(23);
    }
    //let response = getResponse(20);
    // return {
    //     ...response
    // }
    return getResponse(20);
}


getResponse = (code) => {
    let response = require("./response.json");
    let index = response.findIndex(e => e.code === code);
    return response[index];
}
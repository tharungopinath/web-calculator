function add (a, b) {
	return a+b;
};

function subtract (a, b) {
	return a-b;
};

function multiply (a, b) {
	answer = a*b;
    tempString = answer.toString();
    return toNum(tempString);
};

function divide (a, b) {
    answer = a/b;
    tempString = answer.toString();
	return toNum(tempString);
};

function toNum (str) {
    decimalIndex = str.indexOf(".");
    decimalPlaces = str.length - 1 - decimalIndex;
    if (decimalIndex == -1) {
        num = Number.parseInt(str);
    }
    else {
        if (decimalPlaces > 7) {
            num = Number.parseFloat(str);
            num = num.toFixed(7);
            num = Number.parseFloat(num);
        }
        else {
            num = Number.parseFloat(str);
        }
    }
    return num;
}

function formatNumber(val) {
    if (val === null || val === undefined) {
        return "";
    }
    const num = Number(val);
    if (!isFinite(num)) {
        return String(num);
    }
    const abs = Math.abs(num);
    if ((abs !== 0 && abs >= 1e12) || (abs !== 0 && abs < 1e-9)) {
        return num.toExponential(6);
    }
    let s = String(num);
    if (s.indexOf('.') !== -1) {
        s = parseFloat(num.toFixed(7)).toString();
    }
    if (s.replace('-', '').length > 12) {
        return num.toExponential(6);
    }
    return s;
}

const display = document.querySelector(".display");
const number = document.querySelectorAll('.number, #decimal');
const op = document.querySelectorAll(".operation");
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const back = document.querySelector("#backspace");

str1 = "";
str2 = "";
operations = ["+", "-", "*", "/"];
userOp = [];
let num1;
let num2;

number.forEach(btn => {
    btn.addEventListener('click', (event) => {
        op.forEach (btn => {
            btn.disabled = false;
        });
        const value = event.target.textContent.trim();
        if (userOp.length == 0){
            str1 += value;
            display.textContent = str1;
            num1 = toNum(str1);
        }
        else {
            str2 += value;
            display.textContent = str2;
            num2 = toNum(str2);
            equal.disabled = false;
        }
        if (event.target.id == "decimal") {
            btn.disabled = true;
        }
    });
});

op.forEach(btn => {
    if (str1.length < 1){
        btn.disabled = true;
    }
    btn.addEventListener("click", (event) => {
        decimal.disabled = false;
        userOp.push(event.target.textContent);
        if ((userOp.length > 0) && (str2.length < 1)){
            op.forEach(btn => {
                btn.disabled = true;
            });
        }
        if (userOp.length == 2){
            op.forEach(btn => {
                btn.disabled = true;
            });
            if (userOp[0] == '+') {
                num1 = add(num1, num2);
                display.textContent = formatNumber(num1);
                str1 = String(num1);
                userOp.shift();
                str2 = "";
                num2 = null;
                equal.disabled = true;
            }
            else if (userOp[0] == '-'){
                num1 = subtract(num1, num2);
                display.textContent = formatNumber(num1);
                str1 = String(num1);
                userOp.shift();
                str2 = "";
                num2 = null;
                equal.disabled = true;
            }
            else if (userOp[0] == '*'){
                num1 = multiply(num1, num2);
                display.textContent = formatNumber(num1);
                str1 = String(num1);
                userOp.shift();
                str2 = "";
                num2 = null;
                equal.disabled = true;
            }
            else {
                num1 = divide(num1, num2);
                display.textContent = formatNumber(num1);
                str1 = String(num1);
                userOp.shift();
                str2 = "";
                num2 = null;
                equal.disabled = true;
            }
        }
    });
});

clear.addEventListener("click", (event) => {
    str1 = "";
    str2 = "";
    num1 = null;
    num2 = null;
    userOp = [];
    equal.disabled = true;
    decimal.disabled = false;
    display.textContent = "";
});

if (str2.length < 1) {
    equal.disabled = true;
}
else {
    equal.disabled = false; 
}
equal.addEventListener("click", (event) => {
    if (userOp[0] == '+') {
        num1 = add(num1, num2);
        display.textContent = formatNumber(num1);
        userOp.shift();
        str2 = "";
        equal.disabled = true;
        str1 = "";
    }
    else if (userOp[0] == '-'){
        num1 = subtract(num1, num2);
        display.textContent = formatNumber(num1);
        userOp.shift();
        str2 = "";
        equal.disabled = true;
        str1 = "";
    }
    else if (userOp[0] == '*'){
        num1 = multiply(num1, num2);
        display.textContent = formatNumber(num1);
        userOp.shift();
        str2 = "";
        equal.disabled = true;
        str1 = "";
    }
    else if (userOp[0] == '/') {
        num1 = divide(num1, num2);
        display.textContent = formatNumber(num1);
        userOp.shift();
        str2 = "";
        equal.disabled = true;
        str1 = "";
    }
});
 
back.addEventListener("click", (event) => {
    if (userOp.length === 0) {
        if (str1.length > 0) {
            str1 = str1.slice(0, -1);
            display.textContent = str1;
            if (str1.length > 0) {
                num1 = toNum(str1);
            } else {
                num1 = null;
            }
            if (str1.indexOf('.') === -1) {
                decimal.disabled = false;
            }
            if (str1.length < 1) {
                op.forEach(b => b.disabled = true);
            }
        }
    } 
    else {
        if (str2.length > 0) {
            str2 = str2.slice(0, -1);
            display.textContent = str2;
            if (str2.length > 0) {
                num2 = toNum(str2);
                equal.disabled = false;
            } 
            else {
                num2 = null;
                equal.disabled = true;
                op.forEach(b => b.disabled = true);
            }
            if (str2.indexOf('.') === -1) {
                decimal.disabled = false;
            }
        } 
        else {
            userOp.pop();
            display.textContent = str1;
            op.forEach(b => {
                b.disabled = (str1.length < 1);
            });
            equal.disabled = true;
        }
    }
});
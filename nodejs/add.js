const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
const operation = String(process.argv[4]);

if (isNaN(a) || isNaN(b)) {
    console.log("Please provide two numbers");
    process.exit(1);
}
if (operation === ""){
    console.log("Please provide an operation");
    process.exit(1);
}
let result;
switch(operation){
    case "add":
        result = a + b;
        console.log(`${a} + ${b} = ${result}`);
        break;
    case "subtract":
        result = a - b;
        console.log(`${a} - ${b} = ${result}`);
        break;
    case "multiply":
        result = a * b;
        console.log(`${a} * ${b} = ${result}`);
        break;
    case "divide":
        if (b === 0){
            console.log("denominator cannot be zero")
            result = 0;
            console.log(`${a} / ${b} = INFINITE`);
            break
        }
        result = a / b;
        console.log(`${a} / ${b} = ${result}`);
        break;
    default:
        result = a + b;
        console.log("Operation did not match any options, so adding two numbers by default");
        console.log(`${a} + ${b} = ${result}`);
        break;
}
import location, { message, name, getGreeting } from "./myModules";
import add, { substract } from "./math";

console.log(message, name, location, getGreeting("Bob"));
console.log(add(1, 2), substract(5, 3));

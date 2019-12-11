// Named export - Has a name. Have as many as needed
// Default export - Has no name, You can only have one

const message = "Some message from myModule.js";
const name = "Tom";
const location = "Tokyo";
const getGreeting = name => {
  return `Welcome to course, ${name}`;
};

export { message, name, location as default, getGreeting };

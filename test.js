let person = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA'
  }
};

let fieldName = 'address.state';
console.log(person[fieldName]); // Output: "CA"

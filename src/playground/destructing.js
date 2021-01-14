const person = {
    name: "Rajiv",
    age: 30,
    location: {
        city: "Bharhe Chaura",
        temp: 10
    }
};

const { name, age } = person;
const { city, temp: temperature} = person.location

const addresee = ['Bharhe Chaura', 'Deoria', 'Bhatni'];

console.log(name, age, city, temperature)
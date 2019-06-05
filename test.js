const Obj = require('./dist/index');
const persons = {
    email: "AppDeveloper@app.io",
    name: "sky",
    contact: {
        address: "Astro World",
        country: "Canada",
        state: "ontario",
        phones: [
            "08100237733",
            "09036373373"
        ],
    },
};

const $persons = new Obj(persons);

$persons.set('babes', {
    chioma: {
        name: "Chioma Chukwuka",
        sisters: ["Juliet", "IB"]
    },
    love: {
        name: "Love John",
        brothers: ["John", "Joe"]
    }
});

const $chioma = $persons.cloneInstanceFrom('babes.chioma');
$chioma.set("degree", true);


const Persons = {
    name: "Xjs",
    foo: function () {
        console.log(this);
        console.log("I can inherit my class because i have the keyword `function`");
    },

    bar: () => {
        console.log(this);
        console.log("I CANNOT inherit my class because i don't have the keyword `function`");
    },
};

Persons.foo();

console.log();
console.log();
/////////////////////////////////////////////////////////

// console.log($chioma.get('name'));
// console.log($persons.return());
Persons.bar();
// console.log($persons.pick(['name', 'email']));

// console.log(persons.contact.country);

// if(persons.contact.hasOwnProperty('state')){
//     console.log(persons.contact.state);
// }


/////////////////////////////////////////////////////////
console.log();
console.log();

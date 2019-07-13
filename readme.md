# Javascript object collection.

 [**NPM**](https://www.npmjs.com/package/object-collection) |
 [**YARN**](https://yarnpkg.com/en/package/object-collection)

Built from **Lodash**'s object functions api.

so instead of `_.extend(obj, data)` you do `data.extend({})`.

All lodash helpers that **mutates** object returns `this`

### When to use ObjectCollection.
ObjectCollection is best used when accessing large objects **e.g** Api data, Your config object e.t.c

### Usage
```javascript
const Obj = require("object-collection");

// Creates empty object
let data = new Obj();
// => {}

const User = {name: "John", age: 32, gender: "male"};

// Use already existing object.
const user = new Obj(User);
// => {name: "John", age: 32, gender: 'male'}

// OR Use is a static helper to create new collection instance
const user = Obj.use(User);
// => {name: "John", age: 32, gender: "male"}


user.has("name")
// => true

user.pick(['name', 'age']);
// => {name: "John", age: 32}


user.set({hobbies: ['code', 'eat', 'sleep']});
// => {name: "John", age: 32, gender: "male", hobbies: ['code', 'eat', 'sleep']}
```

You get the idea right?
All object helpers in `lodash` are available on `this`

We also added a few more helpers. e.g

If a path in your object holds an `object` we can access it as a collection using `.path` helper
```javascript
// Add contact_details to User
user.set('contact_details', {
    address: 'No 1 Astro World', 
    phone: '+123456789',
    country: 'US',
});

user.path("contact_details");
// Returns message value as a collection

user.get("contact_details.address");
//OR
user.path("contact_details").get('address');
// => No 1 Astro World

user.path("contact_details").pick(['phone', 'US'])
// => {phone: '+123456789', country: 'US'}
```

#### Full Docs coming soon

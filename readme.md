# Javascript object collection.

built from **Lodash**'s object functions api.

so instead of `_.extend(obj, {})`
you do
`data.extend({})`.

**ALL mutable functions returns `this`**

Full Docs to out soon. :)

### Usage
```javascript
const Obj = require("object-collection");

let data = new Obj();
// Creates empty object
// => {}


data = new Obj({foo: "Bar", hello: "World"});
// => {foo: "Bar", hello: "World"}

/**
* Use is a static helper to create new collection instance
*/
data = data.use({foo: "Bar", hello: "World"});
// => {foo: "Bar", hello: "World"}


data.has("foo")
// => true

data.pick('foo');
// => {foo: bar}


data.set({message: {good: true, text: "welcome"}});
// => {foo: "Bar", hello: "World", message: {good: true, text: "welcome"}}
```

After Message has been set we can still access it using `.path` function
```javascript
data.path("message");
// Returns message value as a collection

data.path("message").set({icon:"fa-smile"});
// => {foo: "Bar", hello: "World", message: {
//          good: true, text: "welcome", icon: "fa-smile"
//      }}
```
    
    
`.path` is able to modify contents of main object unless cloned.
```javascript
data.path("message");
// Returns message value as a collection

const $newObj = data.cloneInstanceFrom("message").set({icon:"fa-smile"});
// => {ood: true, text: "welcome", icon: "fa-smile"}
```

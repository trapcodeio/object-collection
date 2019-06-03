# Javascript object collection.

built from **Loadash**'s object functions api.

so instead of `_.extend(obj, {})`
you do
`obj.extend({})`.

It is also chain-able.


### Usage
```javascript
const Obj = require("./index");
// OR
import Obj from "./index";


let $obj = new Obj();
// Creates empty object
// data: => {}


$obj = new Obj({foo: "Bar", hello: "World"});
// data: => {foo: "Bar", hello: "World"}

/**
* Use is a static helper to create new collection instance
*/
$obj = Obj.use({foo: "Bar", hello: "World"});
// data: => {foo: "Bar", hello: "World"}


$obj.set({message: {good: true, text: "welcome"}});
// data: => {foo: "Bar", hello: "World", message: {good: true, text: "welcome"}}
```

After Message has been set we can still access it using `.path` function
```javascript
$obj.path("message");
// Returns message value as a collection

$obj.path("message").set({icon:"fa-smile"});
// data: => {foo: "Bar", hello: "World", message: {
//          good: true, text: "welcome", icon: "fa-smile"
//      }}
```
    
    
`.path` is able to modify contents of main object unless cloned.
```javascript
$obj.path("message");
// Returns message value as a collection

const $newObj = $obj.cloneInstanceFrom("message").set({icon:"fa-smile"});
// data: => {ood: true, text: "welcome", icon: "fa-smile"}
```

import Obj = require("./index");

const $obj = Obj.use({foo: "Bar", hello: "World"});
// data: => {foo: "Bar", hello: "World"}

$obj.set({message: {good: true, text: "welcome"}});
$obj.path("message").set({icon: "fa-icon"});

const $clonedMessage = $obj.cloneInstanceFrom("message").set({text: "From Clone"});

console.log($obj.return());
console.log($clonedMessage.return());

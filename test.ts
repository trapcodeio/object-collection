import chalk from "chalk";
import ObjectCollection from "./index";
import set = Reflect.set;

// Console Log
const log = (...args) => console.log(...args);

// LogText with chalk.
const logText = (msg: string = "") => console.log(chalk.cyan("->", msg));

// Console Log
const space = () => log();

space();

////////////////////////////////////////////////////////
// Import lodash and static {ObjectCollection.use}
const {_, use} = ObjectCollection;

// Our Data
const data = {
    id: 1,
    title: "Beach Cleanup",
    // tslint:disable-next-line:object-literal-sort-keys
    date: "Aug 28 2018",
    time: "10:00",
    location: "Daytona Beach",
    description: "Let's clean up this beach.",
    organizer: "Adam Jahr",
    category: "sustainability",
    attendees: [
        {
            id: "abc123",
            name: "Adam Jahr",
        },
        {
            id: "def456",
            name: "Gregg Pollack",
        },
        {
            id: "ghi789",
            name: "Beth Swanson",
        },
        {
            id: "jkl101",
            name: "Mary Gordon",
        },
    ],
};

////////////////////////////////////////////////////////
const collection = use(data);

space();
logText("Pick [id, title, description]");
log(collection.pick([
    "id",
    "title",
    "description",
]));

space();
logText("Omit [organizer, attendees]");
log(collection.omit([
    "organizer",
    "attendees",
]));

space();
logText("Has path {id}");
log(collection.has("id"));

space();
logText("Get path {id}");
log(collection.get("id"));

space();
logText("Has path {address}");
log(collection.has("address"));

space();
logText("Set path {address: 'Astro World'}");
collection.set("address", "Astro World");

logText("Re-check Has path {address}");
log(collection.has("address"));

space();
logText("Get path {address}");
log(collection.get("address"));

space();
logText("Get first attendant using path: attendees[0]");
log(collection.get("attendees[0]"));

space();
logText("Get second attendant using .get('attendees')[1]");
log(collection.get("attendees")[1]);

space();
logText("Get third attendant using .path('attendees').get(2)");
log(collection.path("attendees").get(2));

space();
logText("Get back object");
log(collection.return());

space();
logText("Or using the object directly.");
log(data);
////////////////////////////////////////////////////////

# Breaking Changes

In a bid to convert to fully ESM with Cjs support.
A few of breaking changes occurred.

### ObjectCollection Import

```javascript
// From
import ObjectCollection from "object-collection";
// To
import {ObjectCollection} from "object-collection"

```

### Lodash Import

```javascript
// before this was possible
import {get} from "object-collection/lodash"

// Now you have to do this 
import lodash from "object-collection/lodash"
const {get} = lodash;
```
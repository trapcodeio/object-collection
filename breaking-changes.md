# Breaking Changes

In a bid to convert to fully ESM with Cjs support.
A lot of breaking changes occurred.

### ObjectCollection Import

```javascript
// From
import ObjectCollection from "object-collection";
// To
import {ObjectCollection} from "object-collection"

```

### Lodash Import

```javascript
// From
import {get} from "object-collection/lodash"
```
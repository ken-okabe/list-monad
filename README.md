# list-monad

Monads in JavaScript / sample implemantation

## List monad derived from `free-monoid`

<https://www.npmjs.com/package/free-monoid>

#### monad laws validation

```js
const util = require("util");
const validate = a => b => util.inspect(a) === util.inspect(b)
  ? true : false;

const f = x => (M)(x + 7);
const g = x => (M)(x * 5);
const a = 9;
const m = (M)(3)(5)(7);

console.log(
  validate(
    (M)(a).bind(f)
  )(
    f(a)
  )
);
console.log(
  validate(
    m.bind(M)
  )(
    m
  )
);
console.log(
  validate(
    m.bind(f)
      .bind(g)
  )(
    m.bind(x => f(x)
      .bind(g))
  )
);
```

```sh
true
true
true
```

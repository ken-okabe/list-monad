(() => {
  "use strict";

  const M = require("./index");

  const mlog = m => o => {
    console.log(m + "\n" + o.val);
    return o;
  };
  const x = (M)(1);
  const y = (M)(2);
  const z = (M)(10);

  const xyz = (x)(y)(z);

  mlog("xyz----------")(
    xyz
  );

  console.log("+++++++++++++++++++");


  console.log("------");


  mlog("--fold----")(
    (M)(1)(2)(3)
      .fold((a, b) => a + b)
  );

  mlog("--fold----")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (a)(b))
  );
  mlog("--fold2----")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (a)(b * 2))
  );

  mlog("--fmap----")(
    (M)(9)(8)
      .fmap((a) => (a))
  );
  const add5 = (a => a + 5);
  mlog("--fmap5----")(
    (M)(100)(101)
      .fmap(add5)
  );
  const add10 = a => a + 5;
  mlog("--fmap10----")(
    (M)(100)(101)
      .fmap(add5)
      .fmap(add5)
  );


  console.log(" array no good");
  console.log( // array no good
    [1, 2, 3].reduce((a, b) => [a, b])
  );

  const add1 = (a) => (a + 1);

  mlog("------")(
    (M)(999)(9).fmap(add1)
  );
  mlog("------")(
    (M)(9).fmap(add1)
  );


  const ff = (f) => f;
  mlog("------")(
    (add1).fmap(ff)
  );

  mlog("------")(
    (add1)(add1).fmap(f => f(3)) //4,4
  );

  mlog("------")(
    (M)(9).fmap(x => x)
  );
  console.log("------");

  const plus = (x) => (y => x + y);
  const plus1 = (M)(1)
    .fmap(plus);


  mlog("------")(
    (M)(1)(2)(3)
      .fmap((plus1)(plus1))
  );


  const double = (a) => (M)(a)(a);





  mlog("xyz--fmap------")(
    xyz
      .fmap(double)
      .fmap(double)
      .fmap((add1)(add1))
      .fmap(add1)
  );



  mlog("--fold----")(
    (M)(1)(2)(3)
      .fmap((plus1)(plus1))
      .fold((a, b) => (a + b))
  );



  const compose = (f, g) => x => g(f(x));
  const add2 = x => x + 2;

  const m = (M)(add2)(add2)(add2)
    .fold(compose);

  const p = (M)(0).fmap(m);
  console.log(p);
})();

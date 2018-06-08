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


  mlog("--fold----")(
    (M)(1)(2)(3)
      .fold((a, b) => a + b)
  );

  mlog("xyz----------")(
    xyz
  );

  console.log("+++++++++++++++++++");

  console.log("------");

  mlog("--fold----")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (a)(b))
  );
  mlog("--fold2----")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (a)(b * 2))
  );

  const add1 = (a) => (a + 1);


  mlog("---fmap---")(
    (M)(9).fmap(add1)
  );

  mlog("------")(
    (M)(999)(9).fmap(add1)
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
  mlog("------")(
    (M)(add1)(add1).fmap(f => f(3)) //
  );
  mlog("------")(
    (M)(add1).fmap(f => f(3)) //4
  );

  console.log(" array no good");
  console.log( // array no good
    [1, 2, 3].reduce((a, b) => [a, b])
  );


  mlog("------")(
    (M)(9).fmap(x => x)
  );

  console.log("------");


  const double = (a) => (M)(a)(a);

  mlog("xyz--fmap------")(
    xyz
      .fmap(double)
      .fmap(double)
      .fmap(add1)
  );

  const compose = (f, g) => (x => g(f(x)));
  const add20 = x => x + 20;
  const m = (M)(add20)(add20)(add20).fold(compose);
  //console.log(m);
  console.log(m.val[0](100));
  mlog("--fold--compose--")(
    (M)(3).fmap(M(add20)(add20)(add20))
  );

  /*
    const plus = (x) => (y => x + y);
    const plus1 = (M)(1)
      .fmap(plus);

    mlog("--123 p1 p1----")(
      (M)(1)(2)(3)
        .fmap(plus1)
    );
    mlog("--fold----")(
      (M)(1)(2)(3)
        .fmap((plus1)(plus1))
        .fold((a, b) => (a + b))
    );
  */


})();

(() => {
  "use strict";

  const M = require("./index");

  const toList = arr => arr.reduce((a, b) => (a)(b), (M));

  const mlog = m => o => {
    console.log(m + "\n" + o.val);
    return o;
  };

  const util = require("util");
  const validate = a => b => util.inspect(a) === util.inspect(b)
    ? true : false;

  const f = x => (M)(x + 7);
  const g = x => (M)(x * 5);
  const a = 9;
  const m = (M)(3);

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






  mlog("----------")(
    (M)(1)(2)(M)(3)
  );


  const x = (M)(1);
  const y = (M)(2);
  const z = (M)(10);

  console.log((M)(M)(M));

  const xyz = (x)(y)(z);
  mlog("xyz----------")(
    xyz
  );

  mlog("--fold----")(
    (M)(1)(2)(9)
      .fold((a, b) => a + b)
  );

  console.log("+++++++++++++++++++");

  mlog("fold to map")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (M)(a)(b * 2))
  );


  mlog("--fold- MM---")(
    (M)(10)(20)(30)(40)
      .fold((a, b) => (M)(a)(b)(a)(b))
  );

  const add1 = (a) => (a + 1);

  mlog("---bind---")(
    (M)(9).bind(add1)
  );

  mlog("------")(
    (M)(999)(9).bind(add1)
  );
  mlog("--bind----")(
    (M)(9)(8)
      .bind((a) => (a))
  );
  const add5 = (a => a + 5);
  mlog("--bind5----")(
    (M)(100)(101)
      .bind(add5)
  );
  const add10 = a => a + 5;
  mlog("--bind10----")(
    (M)(100)(101)
      .bind(add5)
      .bind(add5)
  );
  mlog("------")(
    (M)(add1)(add1).bind(f => f(3)) //
  );
  mlog("------")(
    (M)(add1).bind(f => f(3)) //4
  );

  mlog("------")(
    (M)(9).bind(x => x)
  );

  console.log("------");

  const double = (a) => (M)(a)(a);

  mlog("xyz--bind------")(
    xyz
      .bind(double)
      .bind(double)
      .bind(add1)
  );

  const compose = (f, g) => (x => g(f(x)));
  const add20 = x => x + 20;
  //console.log(m);
  mlog("--fold--compose 0--")(
    (M)(100).bind(add20)
  );

  mlog("--fold--compose--")(
    (M)(100)(200).bind(
      M(add20)(add20)(add20).fold(compose)
    )
  );

  const plus = (x) => (y => x + y);
  const plus1 = (M)(1)
    .bind(plus);

  mlog("--123 p1 p1----")(
    (M)(1)(2)(3)
      .bind(plus1)
  );
  mlog("--fold----")(
    (M)(1)(2)(3)
      .bind(plus1)
      .fold((a, b) => (a + b))
  );




})();

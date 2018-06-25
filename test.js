(
  () => {
  "use strict";

  const M = require("./index");

  const toList = arr => arr.reduce((a, b) => (a)(b), (M));

  const mlog = m => o => {
    console.log(m + "\n" + o.val);
    return o;
  };

  const util = require("util");
  const inspect = x => util.inspect(x);
  const validate = a => b => inspect(a) === inspect(b)
    ? true : false;

  const ilog = (x) => console.log(inspect(x));

  const f = x => (M)(x + 7);
  const g = x => (M)(x * 5);
  const a = 9;
  const m = (M)(3)(5)(7);

  //  M bind f = f = f bind M

  const fa = x => [x + 7];
  const ga = x => [x * 5];
  const aa = 9;
  const ma = [3, 5, 7];






  console.log("==--==--==");
  console.log(
    (M).bind(f)
  );


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
      m
        .bind(f)
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
      .fold((a, b) => (a + b))
  );
  mlog("--fold2----")(
    (M)(2)(1)
      .fold((a, b) => (10 * a + b))
  );
  mlog("--fold3----")(
    (M)(2)(1)
      .fold((a, b) => (M)(b))
  );

  const plus = (a, b) => a + b;
  mlog("--plus----")(
    (M)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)
      .fold(plus)
  );
  mlog("--plus plus----")(
    (M)(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)
      .fold(plus)
      .fold(plus)
  );

  console.log("Console monoid=================");
  (M)(1)(2)(9)
    .fold((a, b) => {
      const result = a + b;
      console.log("Console: " + result);
      return (result);
    });

  console.log("Operational monoid=================");
  const f1 = x => {
    console.log("function1--------");
    console.log("old " + x);
    const newVal = x + 1;
    console.log("new " + newVal);
    return newVal;
  };
  const f2 = x => {
    console.log("function2--------");
    console.log("old " + x);
    const newVal = x + 3;
    console.log("new " + newVal);
    return newVal;
  };
  const f3 = x => {
    console.log("function3--------");
    console.log("old " + x);
    const newVal = x + 1000;
    console.log("new " + newVal);
    return newVal;
  };

  (M)(1)(f1)(f2)(f3)
    .fold((a, b) => b(a));

  console.log("Operational monoid compostition=================");
  const compose = (f, g) => (x => g(f(x)));
  const f123 = (M)(f1)(f2)(f3)
    .fold(compose);

  (M)(1)(f123)
    .fold((a, b) => b(a));

  const op = (a, b) => b(a);
  const plus1 = (a) => (a + 1);

  mlog("===plus1 monoid ===")(

    (M)(9)(plus1).fold(op)

  );

  mlog("===plus1 plus1 monoid ===")(

    (M)(9)(plus1)(plus1).fold(op)

  );

  mlog("===plus1 ERROR monoid ===")(
    false
    //  (M)(100)(110)(plus1).fold(op)

  );

  const op1 = (a, b) => (typeof b
  == "function")
    ? b(a)
    : (M)(a)(b);

  const plus1Map = (a) => a.map(x => x + 1);

  mlog("===plus1 op1 monoid ===")(

    (M)(100)(110)(plus1Map).fold(op1)

  );
  mlog("===plus1plus1 op1 monoid ===")(

    (M)(100)(110)(plus1Map)(plus1Map).fold(op1)

  );

  const fmap = (f) => (a) => a.map(f);


  mlog("monoid map============")(
    (M)(10)(20)(30)
      .fold((a, b) => (M)(a)(b))
  );

  mlog("monoid map2============")(
    (M)(10)(20)(30)(fmap(a => a * 2)).fold(op1)
  );

  const list = (M)(10)(20)(30);

  const f_2 = a => a * 2;

  mlog("monoid list map3============")(
    (list)(fmap(f_2)).fold(op1)
  );



  mlog("max ============")(
    (M)(10)(20)(30)
      .fold((a, b) => (a > b) ? a : b)
  );

  mlog("min ============")(
    (M)(10)(20)(30)
      .fold((a, b) => (a < b) ? a : b)
  );

  mlog("first ============")(
    (M)(10)(20)(30)
      .fold((a, b) => (M)(a))
  );
  mlog("last ============")(
    (M)(10)(20)(30)
      .fold((a, b) => (M)(b))
  );

  mlog("even / odd ============")(
    (M)(1)(2)(3)(4)(5)(6)(7)(8)(9)(
      fmap(a => ((a % 2) === 0)
        ? (M)(a)
        : (M))
    )
      .fold(op1)
  );



  console.log("state monoid=================");
  (M)("state0")("update1")("update2")
    .fold((oldState, update) => {
      console.log("sate:" + oldState);
      console.log("update:" + update);
      return (update);
    });

  console.log("+++++++++++++++++++");

  mlog("fold to map")(
    (M)(10)(20)(30)(40)
      .bind(a => a * 2)
  );

  const add1 = (a) => (M)(a + 1);

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


  const add5 = a => (M)(a + 5);
  mlog("--bind5----")(
    (M)(100)(200)
      .bind(add5)
  );

  mlog("--bind5 bind5----")(
    (M)(100)(200)
      .bind(add5)
      .bind(add5)
  );

  const composeM = (f, g) => (
  x => (M)(x)
    .bind(f)
    .bind(g)
  );

  //monad
  const add20 = (M)(add5)(add5)(add5)(add5)
    .fold(composeM);

  mlog("--fold--compose--add20")(
    (M)(100)(200)
      .bind(add20)
  );


  (() => {

    const plus = (x) => (M)(y => x + y);
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

})();

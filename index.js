(() => {
  "use strict";

  const freeMonoid = require("./free-monoid");

  const _M = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;

    list.fold = (op) => {
      try { //check type error
        return (M)(list.val.reduce(op));
      } catch (e) {
        return (M)(list.val.reduce(op, (M)));
      }
    };
    const mapOp = f => ((a, b) => (a)(f(b)));
    list.fmap = (f) => list.fold(mapOp(f));

    //  const toList = arr => arr.reduce((a, b) => (a)(b), (M));
    //  const compose = (f, g) => (x => g(f(x)));

  //  const f = (M)(ff).fold(compose).val[0];
  };
  const listMonad = _M();

  //------------------
  const exporting = (typeof module === "object"
  && typeof module.exports === "object")
    ? module.exports = listMonad
    : self.listMonad = listMonad;
//============================
})();

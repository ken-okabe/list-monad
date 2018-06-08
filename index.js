(() => {
  "use strict";
  const freeMonoid = (operator) => {
    const M = (m) => (!!m && (!!m.M || m.identity))
      ? (m)
      : (() => {
        const a = b => (b.identity) //M
          ? (a)
          : !b.M
            ? (a)(M(b))
            : (() => {
              const ab = M();
              ab.units = a.units.concat(b.units);
              ab.val = ab.units.map(unit => unit.val[0]);
              return ab; // (a)(b)
            })();
        a.val = a.val ? [] : [m];
        a.units = [a];
        a.M = (m) => M(m);
        operator(a);
        return a;
      })();
    M.identity = true;
    M.val = (m) => (m);
    return M;
  };

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

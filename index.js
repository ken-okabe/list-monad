(() => {
  "use strict";
  const freeMonoid = (operator) => (() => {
    Array.prototype.flatten = function() {
      return Array.prototype.concat.apply([], this);
    };
    const M = (() => { //(M)(a)(b)
      const toList = arr => arr.reduce((a, b) => (a)(b), (M));
      const m = (a) => (Array.isArray(a))
        ? toList(a.flatten())
        : (!!a && (!!a.M || a.identity)) //left id M
          ? (a)
          : (() => {
            const ma = b => (b.identity) //right id M
              ? (ma)
              : !b.M
                ? (ma)(M(b))
                : (() => {
                  const mab = M();
                  mab.units = ma.units.concat(b.units);
                  mab.val = mab.units.map(unit => unit.val[0]);
                  return mab; // (m)(a)(b)
                })();
            ma.M = m;
            ma.val = [a];
            ma.units = [ma];
            operator(ma);
            return ma;
          })();
      m.identity = true;
      m.val = [m]; //["__IDENTITY__"];
      m.units = [m];
      return m;
    })();
    return M;
  })();
  //========================================================
  const _listMonad = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;
    list.fold = (op) => { //  fold(list)(op);-----
      const fold = list => op => [M, ...list.units] //init = M
        .reduce((a, b) => {
          const aVal = (a.val.length === 1)
            ? a.val[0] : a.val;
          const a1Val = b.val.map(bVal => op(aVal, bVal))[0];
          //identity * monoid should be monoid
          const err = (!!a.identity) && (!a1Val.M);
          const a1 = (M)(err ? b : a1Val); //error ->just shift
          return a1; // next a
        });
      return fold(list)((M)(op).val[0]); //(op) wrap and val
    }; //===============================================
    list.fmap = (f) => {
      const mapOp = f => (a, b) => (M)(a)(f(b));
      const f1 = (M)(f).val[0]; //list and val
      return list.fold(mapOp(f1));
    };
  };
  const listMonad = _listMonad();
  //------------------
  const exporting = (typeof module === "object"
  && typeof module.exports === "object")
    ? module.exports = listMonad
    : self.listMonad = listMonad;
//============================
})();

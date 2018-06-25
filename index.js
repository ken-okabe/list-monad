(() => {
  "use strict";
  const freeMonoid = (operator) => (() => {
    const flattenDeep = (arr1) => arr1
      .reduce((acc, val) => Array.isArray(val)
        ? acc.concat(flattenDeep(val))
        : acc.concat(val), []);
    const M = (() => { //(M)(a)(b)
      const toList = arr => arr.reduce((a, b) => (a)(b), (M));
      const m = (a) => (Array.isArray(a))
        ? toList(flattenDeep(a))
        : (!!a && !!a.M)
          ? (a)
          : (() => {
            const ma = b => (b === m) // right id
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
      m.M = m;
      m.val = [m]; //["__IDENTITY__"];
      m.units = [m];
      operator(m);
      return (m);
    })();
    return M;
  })();
  //========================================================
  const _listMonad = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;
    const toList = arr => arr.reduce((a, b) => (a)(b), (M));
    const mVal = (f) => (M)(f).val[0];
    list.Val = () => (list.val.length === 1)
      ? list.val[0] : list.val;
    list.fold = (op) => list.units //init = M
      .reduce((a, b) => {
        const a1Val = b.val
          .map(bVal => mVal(op)(a.Val(), bVal))[0];
        return (M)(a1Val);
      }) ;
    list.bind = (f) => list === M
      ? (f)
      : toList(list.units.map(unit => mVal(f)(unit.Val())));
  }; //===============================================
  const listMonad = _listMonad();
  //------------------
  const exporting = (typeof module === "object"
  && typeof module.exports === "object")
    ? module.exports = listMonad
    : self.listMonad = listMonad;
//============================
})();

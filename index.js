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
        a.M.identity = true;
        a.M.val = (m) => (m);
        operator(a);
        return a;
      })();
    M.identity = true;
    M.val = (m) => (m);
    return M;
  };

  const _listMonad = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;
    const toList = arr => arr.reduce((a, b) => (a)(b), (M));

    list.fold = (op) => { //===========================
      //  list1 = fold(list)(op);----------------------
      const fold = list => op => (list.length === 1)
        ? toList(list)
        : (() => {
          const [a, b, c, ...rest] = list;
          const new1 = op(a, b);
          const list1 = !!(new1.M) ||
          ((typeof a) === (typeof b)
          && (typeof b) === (typeof new1))
            ? [new1, c, ...rest]
            : [b, c, ...rest];
          const list2 = (!c) ? [new1] : list1;
          return fold(list2)(op); //need TailCallOptimization
        })();
      //----------------------------------
      const listVal0 = [M, ...list.val];
      return fold(listVal0)(op);
    //--------------------------------
    }; //===============================================
    const mapOp = f => ((a, b) => (M)(a)(f(b)));
    list.fmap = (f) => list.fold(mapOp(f));

    //  const compose = (f, g) => (x => g(f(x)));

  //  const f = (M)(ff).fold(compose).val[0];
  };
  const listMonad = _listMonad();

  //------------------
  const exporting = (typeof module === "object"
  && typeof module.exports === "object")
    ? module.exports = listMonad
    : self.listMonad = listMonad;
//============================
})();

(() => {
  "use strict";
  const freeMonoid = (operator) => (() => {
    const M = (() => { //(M)(a)(b)
      const m = (a) => (!!a && (!!a.M || a.identity)) //left id M
        ? (a)
        : (() => {
          const ma = b => (b.identity) //right id M
            ? (ma)
            : !b.M
              ? (ma)(M(b))
              : (() => {
                const mab = M();
                const [m, ...bUnits] = b.units;
                mab.units = ma.units.concat(bUnits);
                mab.val = mab.units.map(unit => unit.val[0]);
                return mab; // (m)(a)(b)
              })();
          ma.val = [a];
          ma.M = m;
          ma.units = m.units.concat(ma);
          operator(ma);
          return ma;
        })();
      m.identity = true;
      m.val = ["__IDENTITY__"];
      m.units = [m];
      return m;
    })();
    return M;
  })();

  const _listMonad = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;
    const toList = arr => arr.reduce((a, b) => (a)(b), (M));

    list.fold = (op) => { //===========================
      //  list1 = fold(list)(op);----------------------
      const fold = listA => op => (listA.length === 1)
        ? toList(listA)
        : (() => {
          console.log("listA=================");

          console.log(listA);
          const [a, b, ...rest] = listA;
          const a1 = (a === M.val[0])
            ? (M) : a;

          const new0 = op(a1, b);
          console.log("new0=================");

          console.log(new0.M);

          const new1 = ((a === M.val[0])) && (!new0.M)
            ? b //(M)  identiyString123
            : new0;
          console.log("new1=================");

          console.log(new1);
          const listA1 = [new1, ...rest];
          return fold(listA1)(op); //need TailCallOptimization
        })();
        //----------------------------------

      return fold(list.val)(op);
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

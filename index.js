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
      const fold = list => op => (list.units.length === 2)
        ? list
        : (() => {
          console.log("list=================");

          console.log(list);
          const [a, b, ...rest] = list.units;

          console.log("a  b  ===============");
          console.log(a.val[0]);
          console.log(b.val[0]);

          const a1 = (a.identity)
            ? a
            : a.val[0];

          const b1 = b.val[0];

          const new0 = op(a1, b1);
          console.log("new0=================");

          console.log(new0);

          const list1 = ((a.identity) && (!new0.M))
            ? (() => {
              const [c, ...rest1] = rest;
              const c1 = c.val[0];
              const new1 = op(b1, c1);
              return toList([M(new1), ...rest1])
            })() //(M)  identiyString123
            : toList([M(new0), ...rest]);

          console.log(list1);

          //    return fold(list1)(op); //need TailCallOptimization
          return fold(M(1)(2));
        })();
        //----------------------------------

      return fold(list)(op);
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

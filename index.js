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
            ma.val = [a];
            ma.M = m;
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
  const _listMonad = () => freeMonoid(operator);
  const operator = list => {


    const M = list.M;
    const toList = arr => arr.reduce((a, b) => (a)(b), (M));

    list.fold = (op) => { //===========================
      //  list1 = fold(list)(op);----------------------
      /*      console.log("NOW FOLDING-------------------");
            console.log(list);
            console.log("-----------------NOW FOLDING--");
      */
      const fold = list => op => [M, ...list.units]
        .reduce((a, b) => {
          /*      console.log("FOLDING=========================================");
                console.log(a);
                console.log(b);
                console.log("a.Val=================");
                console.log(a.val);
*/
          const aVal = (a.val.length === 1)
            ? a.val[0]
            : a.val;
          const a1Val = b.val.map(bVal => op(aVal, bVal))[0];

          /*
                    console.log("aVal1=================");
                    console.log(a1Val);
          */
          //identity * monoid should be monoid
          const err = (!!a.identity) && (!a1Val.M);

          /*        console.log("error=================");

                  console.log(err);
*/
          const a1Val2 = err
            ? b
            : a1Val;

          const a1 = (M)(a1Val2);
          /*        console.log("a1=================");
                  console.log(a1);

                  console.log((M)(a1Val));
*/
          return a1;

        });

      return fold(list)((M)(op).val[0]); //wrap and val for op
    //--------------------------------
    }; //===============================================
    const mapOp = f => (a, b) => (M)(a)(f(b));
    list.fmap = (f) => {
      const f1 = (M)(f).val[0]; //list and val
      return list.fold(mapOp(f1));
    };

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

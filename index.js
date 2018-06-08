(() => {
  "use strict";
  //++++++++++++++++++++++++++++++++++++++++++++++
  // Production steps of ECMA-262, Edition 5, 15.4.4.21
  // Reference: http://es5.github.io/#x15.4.4.21
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  Object.defineProperty(Array.prototype, 'typedReduce', {
    value: function(callback /*, initialValue*/ ) {
      if (this === null) {
        throw new TypeError('Array.prototype.typedReduce ' +
          'called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback +
          ' is not a function');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      var k = 0;
      var value;
      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array ' +
            'with no initial value');
        }
        value = o[k++];
      }
      let type;
      let typeVal;
      let type1

      let type1Val;
      while (k < len) {
        type = typeof value;
        typeVal = value;

        if (k in o) {
          value = callback(value, o[k], k, o);
        }
        type1 = typeof value;
        type1Val = value;
        (type !== type1)
          ? (() => {
            console.log("TYPE ERROR===============")
            console.log(type);
            console.log(typeVal);
            console.log(type1);
            console.log(type1Val);
            console.log("===============TYPE ERROR")
            throw new TypeError();
          })()
          : true;
        k++;
      }
      return value;
    }
  });
  //++++++++++++++++++++++++++++++++++++++++++++++






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

  const _listMonad = () => freeMonoid(operator);
  const operator = list => {
    const M = list.M;

    list.fold = (op) => {

      //reduce loop
      /*    list.val.reduce((acc,cur)=>
          {
         const x = op(acc,cur);
       });*/
      //    return (M)(list.val.typedReduce(op));

      try { //check type error
        return (M)(list.val.typedReduce(op, (M)));
      } catch (e) {
        return (M)(list.val.typedReduce(op));
      }
    };
    const mapOp = f => ((a, b) => (M)(a)(f(b)));

    list.fmap = (f) => list.fold(mapOp(f));

    //  const toList = arr => arr.reduce((a, b) => (a)(b), (M));
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

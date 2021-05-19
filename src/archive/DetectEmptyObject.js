var log = (s, f) => console.log(`${s} --> {}:${f({})}  {k:2}:${f({ k: 2 })}`);

function A(obj) {
  for (var i in obj) return false;
  return true;
}

function B(obj) {
  return JSON.stringify(obj) === "{}";
}

function C(obj) {
  return Object.keys(obj).length === 0;
}

function D(obj) {
  return Object.entries(obj).length === 0;
}

function E(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

function F(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function G(obj) {
  return typeof obj === "undefined" || !Boolean(Object.keys(obj)[0]);
}

function H(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

function I(obj) {
  return Object.values(obj).every((val) => typeof val === "undefined");
}

function J(obj) {
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

function K(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) == JSON.stringify({});
}

function L(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

function M(obj) {
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
}

function N(obj) {
  return (
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function O(obj) {
  return !(Object.getOwnPropertyNames != undefined
    ? Object.getOwnPropertyNames(obj).length != 0
    : (function () {
        for (var key in obj) break;
        return key != null && key != undefined;
      })());
}

log("A", A);
log("B", B);
log("C", C);
log("D", D);
log("E", E);
log("F", F);
log("G", G);
log("H", H);
log("I", I);
log("J", J);
log("K", K);
log("L", L);
log("M", M);
log("N", N);
log("O", O);

//////////////////////////////////////////////////////////////

// ECMA 5+:

// because Object.keys(new Date()).length === 0;
// we have to do some additional check
// obj // 👈 null and undefined check
// && Object.keys(obj).length === 0 && obj.constructor === Object
// Note, though, that this creates an unnecessary array (the return value of keys).

// Pre-ECMA 5:

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
// jQuery: jQuery.isEmptyObject({}); // true
// lodash: _.isEmpty({}); // true
// Underscore: _.isEmpty({}); // true
// Hoek

// Hoek.deepEqual({}, {}); // true
// ExtJS

// Ext.Object.isEmpty({}); // true
// AngularJS (version 1)

// angular.equals({}, {}); // true
// Ramda

// R.isEmpty({}); // true

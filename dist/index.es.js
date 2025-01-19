import Re, { memo as Ce, useState as B, useRef as Be, useEffect as xe, useMemo as Je } from "react";
var De = { exports: {} }, me = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function br() {
  if (ze) return me;
  ze = 1;
  var a = Re, m = Symbol.for("react.element"), s = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, b = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, t = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(j, h, i) {
    var c, R = {}, P = null, W = null;
    i !== void 0 && (P = "" + i), h.key !== void 0 && (P = "" + h.key), h.ref !== void 0 && (W = h.ref);
    for (c in h) f.call(h, c) && !t.hasOwnProperty(c) && (R[c] = h[c]);
    if (j && j.defaultProps) for (c in h = j.defaultProps, h) R[c] === void 0 && (R[c] = h[c]);
    return { $$typeof: m, type: j, key: P, ref: W, props: R, _owner: b.current };
  }
  return me.Fragment = s, me.jsx = y, me.jsxs = y, me;
}
var _e = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ke;
function gr() {
  return Ke || (Ke = 1, process.env.NODE_ENV !== "production" && function() {
    var a = Re, m = Symbol.for("react.element"), s = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), t = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), j = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), J = Symbol.iterator, ae = "@@iterator";
    function Q(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = J && e[J] || e[ae];
      return typeof r == "function" ? r : null;
    }
    var A = a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          n[o - 1] = arguments[o];
        ie("error", e, n);
      }
    }
    function ie(e, r, n) {
      {
        var o = A.ReactDebugCurrentFrame, d = o.getStackAddendum();
        d !== "" && (r += "%s", n = n.concat([d]));
        var v = n.map(function(l) {
          return String(l);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var z = !1, L = !1, oe = !1, se = !1, ue = !1, Y;
    Y = Symbol.for("react.module.reference");
    function M(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === f || e === t || ue || e === b || e === i || e === c || se || e === W || z || L || oe || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === R || e.$$typeof === y || e.$$typeof === j || e.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Y || e.getModuleId !== void 0));
    }
    function le(e, r, n) {
      var o = e.displayName;
      if (o)
        return o;
      var d = r.displayName || r.name || "";
      return d !== "" ? n + "(" + d + ")" : n;
    }
    function $(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case f:
          return "Fragment";
        case s:
          return "Portal";
        case t:
          return "Profiler";
        case b:
          return "StrictMode";
        case i:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case j:
            var r = e;
            return $(r) + ".Consumer";
          case y:
            var n = e;
            return $(n._context) + ".Provider";
          case h:
            return le(e, e.render, "ForwardRef");
          case R:
            var o = e.displayName || null;
            return o !== null ? o : O(e.type) || "Memo";
          case P: {
            var d = e, v = d._payload, l = d._init;
            try {
              return O(l(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, w = 0, K, V, ee, G, X, q, U;
    function x() {
    }
    x.__reactDisabledLog = !0;
    function D() {
      {
        if (w === 0) {
          K = console.log, V = console.info, ee = console.warn, G = console.error, X = console.group, q = console.groupCollapsed, U = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: x,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        w++;
      }
    }
    function ce() {
      {
        if (w--, w === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: K
            }),
            info: k({}, e, {
              value: V
            }),
            warn: k({}, e, {
              value: ee
            }),
            error: k({}, e, {
              value: G
            }),
            group: k({}, e, {
              value: X
            }),
            groupCollapsed: k({}, e, {
              value: q
            }),
            groupEnd: k({}, e, {
              value: U
            })
          });
        }
        w < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var fe = A.ReactCurrentDispatcher, re;
    function H(e, r, n) {
      {
        if (re === void 0)
          try {
            throw Error();
          } catch (d) {
            var o = d.stack.trim().match(/\n( *(at )?)/);
            re = o && o[1] || "";
          }
        return `
` + re + e;
      }
    }
    var de = !1, ne;
    {
      var je = typeof WeakMap == "function" ? WeakMap : Map;
      ne = new je();
    }
    function Ee(e, r) {
      if (!e || de)
        return "";
      {
        var n = ne.get(e);
        if (n !== void 0)
          return n;
      }
      var o;
      de = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = fe.current, fe.current = null, D();
      try {
        if (r) {
          var l = function() {
            throw Error();
          };
          if (Object.defineProperty(l.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(l, []);
            } catch (T) {
              o = T;
            }
            Reflect.construct(e, [], l);
          } else {
            try {
              l.call();
            } catch (T) {
              o = T;
            }
            e.call(l.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (T) {
            o = T;
          }
          e();
        }
      } catch (T) {
        if (T && o && typeof T.stack == "string") {
          for (var u = T.stack.split(`
`), S = o.stack.split(`
`), E = u.length - 1, C = S.length - 1; E >= 1 && C >= 0 && u[E] !== S[C]; )
            C--;
          for (; E >= 1 && C >= 0; E--, C--)
            if (u[E] !== S[C]) {
              if (E !== 1 || C !== 1)
                do
                  if (E--, C--, C < 0 || u[E] !== S[C]) {
                    var I = `
` + u[E].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && ne.set(e, I), I;
                  }
                while (E >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        de = !1, fe.current = v, ce(), Error.prepareStackTrace = d;
      }
      var ye = e ? e.displayName || e.name : "", te = ye ? H(ye) : "";
      return typeof e == "function" && ne.set(e, te), te;
    }
    function we(e, r, n) {
      return Ee(e, !1);
    }
    function Se(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ve(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, Se(e));
      if (typeof e == "string")
        return H(e);
      switch (e) {
        case i:
          return H("Suspense");
        case c:
          return H("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            return we(e.render);
          case R:
            return ve(e.type, r, n);
          case P: {
            var o = e, d = o._payload, v = o._init;
            try {
              return ve(v(d), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var g = Object.prototype.hasOwnProperty, N = {}, pe = A.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var r = e._owner, n = ve(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(n);
      } else
        pe.setExtraStackFrame(null);
    }
    function be(e, r, n, o, d) {
      {
        var v = Function.call.bind(g);
        for (var l in e)
          if (v(e, l)) {
            var u = void 0;
            try {
              if (typeof e[l] != "function") {
                var S = Error((o || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw S.name = "Invariant Violation", S;
              }
              u = e[l](r, l, o, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (E) {
              u = E;
            }
            u && !(u instanceof Error) && (F(d), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", n, l, typeof u), F(null)), u instanceof Error && !(u.message in N) && (N[u.message] = !0, F(d), _("Failed %s type: %s", n, u.message), F(null));
          }
      }
    }
    var Z = Array.isArray;
    function ge(e) {
      return Z(e);
    }
    function He(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Ze(e) {
      try {
        return Fe(e), !1;
      } catch {
        return !0;
      }
    }
    function Fe(e) {
      return "" + e;
    }
    function Ie(e) {
      if (Ze(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), Fe(e);
    }
    var Ae = A.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ne, $e;
    function er(e) {
      if (g.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function rr(e) {
      if (g.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function nr(e, r) {
      typeof e.ref == "string" && Ae.current;
    }
    function tr(e, r) {
      {
        var n = function() {
          Ne || (Ne = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function ar(e, r) {
      {
        var n = function() {
          $e || ($e = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, n, o, d, v, l) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: l,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return u._store = {}, Object.defineProperty(u._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(u, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function or(e, r, n, o, d) {
      {
        var v, l = {}, u = null, S = null;
        n !== void 0 && (Ie(n), u = "" + n), rr(r) && (Ie(r.key), u = "" + r.key), er(r) && (S = r.ref, nr(r, d));
        for (v in r)
          g.call(r, v) && !Qe.hasOwnProperty(v) && (l[v] = r[v]);
        if (e && e.defaultProps) {
          var E = e.defaultProps;
          for (v in E)
            l[v] === void 0 && (l[v] = E[v]);
        }
        if (u || S) {
          var C = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          u && tr(l, C), S && ar(l, C);
        }
        return ir(e, u, S, d, o, Ae.current, l);
      }
    }
    var Oe = A.ReactCurrentOwner, We = A.ReactDebugCurrentFrame;
    function he(e) {
      if (e) {
        var r = e._owner, n = ve(e.type, e._source, r ? r.type : null);
        We.setExtraStackFrame(n);
      } else
        We.setExtraStackFrame(null);
    }
    var Te;
    Te = !1;
    function Pe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === m;
    }
    function Le() {
      {
        if (Oe.current) {
          var e = O(Oe.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function sr(e) {
      return "";
    }
    var Ye = {};
    function ur(e) {
      {
        var r = Le();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Me(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = ur(r);
        if (Ye[n])
          return;
        Ye[n] = !0;
        var o = "";
        e && e._owner && e._owner !== Oe.current && (o = " It was passed a child from " + O(e._owner.type) + "."), he(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, o), he(null);
      }
    }
    function Ve(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ge(e))
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            Pe(o) && Me(o, r);
          }
        else if (Pe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = Q(e);
          if (typeof d == "function" && d !== e.entries)
            for (var v = d.call(e), l; !(l = v.next()).done; )
              Pe(l.value) && Me(l.value, r);
        }
      }
    }
    function lr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          n = r.propTypes;
        else
          return;
        if (n) {
          var o = O(r);
          be(n, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !Te) {
          Te = !0;
          var d = O(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function cr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var o = r[n];
          if (o !== "children" && o !== "key") {
            he(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), he(null);
            break;
          }
        }
        e.ref !== null && (he(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), he(null));
      }
    }
    var qe = {};
    function Ue(e, r, n, o, d, v) {
      {
        var l = M(e);
        if (!l) {
          var u = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var S = sr();
          S ? u += S : u += Le();
          var E;
          e === null ? E = "null" : ge(e) ? E = "array" : e !== void 0 && e.$$typeof === m ? (E = "<" + (O(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : E = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", E, u);
        }
        var C = or(e, r, n, d, v);
        if (C == null)
          return C;
        if (l) {
          var I = r.children;
          if (I !== void 0)
            if (o)
              if (ge(I)) {
                for (var ye = 0; ye < I.length; ye++)
                  Ve(I[ye], e);
                Object.freeze && Object.freeze(I);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ve(I, e);
        }
        if (g.call(r, "key")) {
          var te = O(e), T = Object.keys(r).filter(function(yr) {
            return yr !== "key";
          }), ke = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!qe[te + ke]) {
            var hr = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ke, te, hr, te), qe[te + ke] = !0;
          }
        }
        return e === f ? cr(C) : lr(C), C;
      }
    }
    function fr(e, r, n) {
      return Ue(e, r, n, !0);
    }
    function dr(e, r, n) {
      return Ue(e, r, n, !1);
    }
    var vr = dr, pr = fr;
    _e.Fragment = f, _e.jsx = vr, _e.jsxs = pr;
  }()), _e;
}
process.env.NODE_ENV === "production" ? De.exports = br() : De.exports = gr();
var p = De.exports, mr = function(a) {
  var m = a.value, s = a.onChange, f = a.options, b = a.inputType, t = b === void 0 ? "select" : b, y = a.placeholder, j = y === void 0 ? "" : y, h = a.disabled, i = h === void 0 ? !1 : h, c = a.required, R = c === void 0 ? !1 : c, P = a.theme, W = P === void 0 ? "light" : P, J = a.size, ae = J === void 0 ? "md" : J, Q = a.variant, A = Q === void 0 ? "outlined" : Q, _ = a.label, ie = a.error, z = ie === void 0 ? !1 : ie, L = a.className, oe = L === void 0 ? "" : L, se = a.style, ue = B(!1), Y = ue[0], M = ue[1], le = B(m), $ = le[0], O = le[1], k = B(f), w = k[0], K = k[1], V = Be(null), ee = Be(null);
  xe(function() {
    if (O(m), t !== "select") {
      var x = f.filter(function(D) {
        return D.label.toLowerCase().includes($.toLowerCase());
      });
      K(x);
    } else
      K(f);
  }, [m, $, f, t]), xe(function() {
    var x = function(D) {
      V.current && !V.current.contains(D.target) && M(!1);
    };
    return document.addEventListener("mousedown", x), function() {
      return document.removeEventListener("mousedown", x);
    };
  }, []);
  var G = [
    "flexible-input",
    "theme-".concat(W),
    "size-".concat(ae),
    "variant-".concat(A),
    z && "error",
    i && "disabled",
    Y && "open",
    oe
  ].filter(Boolean).join(" "), X = function(x) {
    O(x.target.value), M(!0);
  }, q = function(x) {
    s(x);
    var D = f.find(function(ce) {
      return ce.value === x;
    });
    t !== "select" && D && O(D.label), M(!1);
  }, U = function() {
    switch (t) {
      case "select":
      case "autocomplete":
      case "combobox":
        return /* @__PURE__ */ p.jsx("input", { ref: ee, type: "text", value: t === "select" ? m : $, onChange: X, disabled: i, required: R, placeholder: j, className: "flexible-input__input", onFocus: function() {
          return M(!0);
        } });
      default:
        return /* @__PURE__ */ p.jsx("input", { ref: ee, type: "text", value: $, onChange: X, disabled: i, required: R, placeholder: j, className: "flexible-input__input", onFocus: function() {
          return M(!0);
        } });
    }
  };
  return /* @__PURE__ */ p.jsxs("div", { className: G, ref: V, style: se, children: [
    _ && /* @__PURE__ */ p.jsxs("label", { className: "flexible-input__label", children: [
      _,
      R && /* @__PURE__ */ p.jsx("span", { className: "required-mark", children: "*" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "flexible-input__input-container", children: [
      U(),
      /* @__PURE__ */ p.jsx("svg", { className: "flexible-input__arrow ".concat(Y ? "open" : ""), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ p.jsx("path", { d: "M19 9l-7 7-7-7" }) })
    ] }),
    Y && /* @__PURE__ */ p.jsxs("div", { className: "flexible-input__options", children: [
      w.map(function(x) {
        return /* @__PURE__ */ p.jsx("div", { className: "flexible-input__option ".concat(m === x.value ? "selected" : ""), onClick: function() {
          return q(x.value);
        }, children: x.label }, x.value);
      }),
      w.length === 0 && /* @__PURE__ */ p.jsx("div", { className: "flexible-input__no-results", children: "هیچ نتیجه‌ای یافت نشد" })
    ] })
  ] });
};
const Ge = Ce(mr);
var _r = function(a, m, s, f) {
  function b(t) {
    return t instanceof s ? t : new s(function(y) {
      y(t);
    });
  }
  return new (s || (s = Promise))(function(t, y) {
    function j(c) {
      try {
        i(f.next(c));
      } catch (R) {
        y(R);
      }
    }
    function h(c) {
      try {
        i(f.throw(c));
      } catch (R) {
        y(R);
      }
    }
    function i(c) {
      c.done ? t(c.value) : b(c.value).then(j, h);
    }
    i((f = f.apply(a, [])).next());
  });
}, Er = function(a, m) {
  var s = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, b, t, y = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return y.next = j(0), y.throw = j(1), y.return = j(2), typeof Symbol == "function" && (y[Symbol.iterator] = function() {
    return this;
  }), y;
  function j(i) {
    return function(c) {
      return h([i, c]);
    };
  }
  function h(i) {
    if (f) throw new TypeError("Generator is already executing.");
    for (; y && (y = 0, i[0] && (s = 0)), s; ) try {
      if (f = 1, b && (t = i[0] & 2 ? b.return : i[0] ? b.throw || ((t = b.return) && t.call(b), 0) : b.next) && !(t = t.call(b, i[1])).done) return t;
      switch (b = 0, t && (i = [i[0] & 2, t.value]), i[0]) {
        case 0:
        case 1:
          t = i;
          break;
        case 4:
          return s.label++, { value: i[1], done: !1 };
        case 5:
          s.label++, b = i[1], i = [0];
          continue;
        case 7:
          i = s.ops.pop(), s.trys.pop();
          continue;
        default:
          if (t = s.trys, !(t = t.length > 0 && t[t.length - 1]) && (i[0] === 6 || i[0] === 2)) {
            s = 0;
            continue;
          }
          if (i[0] === 3 && (!t || i[1] > t[0] && i[1] < t[3])) {
            s.label = i[1];
            break;
          }
          if (i[0] === 6 && s.label < t[1]) {
            s.label = t[1], t = i;
            break;
          }
          if (t && s.label < t[2]) {
            s.label = t[2], s.ops.push(i);
            break;
          }
          t[2] && s.ops.pop(), s.trys.pop();
          continue;
      }
      i = m.call(a, s);
    } catch (c) {
      i = [6, c], b = 0;
    } finally {
      f = t = 0;
    }
    if (i[0] & 5) throw i[1];
    return { value: i[0] ? i[1] : void 0, done: !0 };
  }
}, Xe = Ce(function(a) {
  var m = a.message, s = a.style;
  return /* @__PURE__ */ p.jsxs("div", { className: "province-city-select__error", style: s, children: [
    /* @__PURE__ */ p.jsxs("svg", { className: "error-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ p.jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ p.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
      /* @__PURE__ */ p.jsx("line", { x1: "12", y1: "16", x2: "12", y2: "16" })
    ] }),
    /* @__PURE__ */ p.jsx("span", { children: m })
  ] });
}), Rr = Ce(function(a) {
  var m = a.style;
  return /* @__PURE__ */ p.jsx("div", { className: "province-city-select__loading", style: m, children: /* @__PURE__ */ p.jsx("div", { className: "loading-spinner" }) });
}), Cr = Ce(function(a) {
  var m = a.value, s = m === void 0 ? { province: "", city: "" } : m, f = a.onChange, b = a.theme, t = b === void 0 ? "light" : b, y = a.size, j = y === void 0 ? "md" : y, h = a.variant, i = h === void 0 ? "outlined" : h, c = a.isRequired, R = c === void 0 ? !1 : c, P = a.isDisabled, W = P === void 0 ? !1 : P, J = a.placeholders, ae = J === void 0 ? {
    province: "انتخاب استان",
    city: "انتخاب شهر"
  } : J, Q = a.labels, A = Q === void 0 ? {
    province: "استان",
    city: "شهر"
  } : Q, _ = a.className, ie = _ === void 0 ? "" : _, z = a.onProvinceChange, L = a.onCityChange, oe = a.selectorType, se = oe === void 0 ? "select" : oe, ue = a.style, Y = a.groupStyle, M = a.provinceInputStyle, le = a.cityInputStyle, $ = a.errorStyle, O = a.loadingStyle, k = B(s.province), w = k[0], K = k[1], V = B(s.city), ee = V[0], G = V[1], X = B(""), q = X[0], U = X[1], x = B([]), D = x[0], ce = x[1], fe = B(!0), re = fe[0], H = fe[1], de = B(null), ne = de[0], je = de[1], Ee = Je(function() {
    return D.map(function(g) {
      return {
        value: g.name,
        label: g.name
      };
    });
  }, [D]), we = Je(function() {
    var g;
    return ((g = D.find(function(N) {
      return N.name === w;
    })) === null || g === void 0 ? void 0 : g.cities.map(function(N) {
      return {
        value: N,
        label: N
      };
    })) || [];
  }, [D, w]);
  xe(function() {
    var g = function() {
      return _r(void 0, void 0, void 0, function() {
        var N, F, pe, F, be;
        return Er(this, function(Z) {
          switch (Z.label) {
            case 0:
              if (N = localStorage.getItem("provincesData"), N)
                try {
                  if (F = JSON.parse(N), Array.isArray(F))
                    return ce(F), H(!1), [
                      2
                      /*return*/
                    ];
                } catch (ge) {
                  console.error("Error parsing cached data:", ge);
                }
              Z.label = 1;
            case 1:
              return Z.trys.push([1, 4, , 5]), [4, fetch("https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json")];
            case 2:
              if (pe = Z.sent(), !pe.ok)
                throw new Error("Network response was not ok");
              return [4, pe.json()];
            case 3:
              if (F = Z.sent(), Array.isArray(F))
                ce(F), localStorage.setItem("provincesData", JSON.stringify(F)), H(!1);
              else
                throw new Error("Fetched data is not an array");
              return [3, 5];
            case 4:
              return be = Z.sent(), console.error("Error fetching provinces data:", be), je(be.message), H(!1), [3, 5];
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    g();
  }, []), xe(function() {
    K(s.province), G(s.city), s.province && s.city ? U("") : s.province ? s.city || U("لطفا شهر را انتخاب کنید") : U("لطفا استان را انتخاب کنید");
  }, [s]);
  var Se = Re.useCallback(function(g) {
    K(g), G(""), f == null || f({ province: g, city: "" }), z == null || z(g);
  }, [f, z]), ve = Re.useCallback(function(g) {
    G(g), f == null || f({ province: w, city: g }), L == null || L(g), w && g && U("");
  }, [f, L, w]);
  return /* @__PURE__ */ p.jsxs("div", { className: "province-city-select ".concat(ie), style: ue, children: [
    /* @__PURE__ */ p.jsx("div", { className: "province-city-select__group", style: Y, children: /* @__PURE__ */ p.jsx(Ge, { value: w, onChange: Se, options: Ee, inputType: se, placeholder: ae.province, disabled: W || re, required: R, theme: t, size: j, variant: i, label: A.province, error: !!q, style: M }) }),
    /* @__PURE__ */ p.jsx("div", { className: "province-city-select__group", style: Y, children: /* @__PURE__ */ p.jsx(Ge, { value: ee, onChange: ve, options: we, inputType: se, placeholder: ae.city, disabled: !w || W || re, required: R, theme: t, size: j, variant: i, label: A.city, error: !!q, style: le }) }),
    q && /* @__PURE__ */ p.jsx(Xe, { message: q, style: $ }),
    re && /* @__PURE__ */ p.jsx(Rr, { style: O }),
    ne && /* @__PURE__ */ p.jsx(Xe, { message: ne, style: $ })
  ] });
});
export {
  Cr as default
};

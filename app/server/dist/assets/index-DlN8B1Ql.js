(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
    new MutationObserver((r) => {
        for (const o of r) if (o.type === 'childList') for (const i of o.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && s(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(r) {
        const o = {};
        return (
            r.integrity && (o.integrity = r.integrity),
            r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
            r.crossOrigin === 'use-credentials'
                ? (o.credentials = 'include')
                : r.crossOrigin === 'anonymous'
                  ? (o.credentials = 'omit')
                  : (o.credentials = 'same-origin'),
            o
        );
    }
    function s(r) {
        if (r.ep) return;
        r.ep = !0;
        const o = n(r);
        fetch(r.href, o);
    }
})();
function ls(e) {
    const t = Object.create(null);
    for (const n of e.split(',')) t[n] = 1;
    return (n) => n in t;
}
const G = {},
    bt = [],
    je = () => {},
    hr = () => !1,
    Cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    cs = (e) => e.startsWith('onUpdate:'),
    ee = Object.assign,
    fs = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    $o = Object.prototype.hasOwnProperty,
    H = (e, t) => $o.call(e, t),
    I = Array.isArray,
    _t = (e) => Zt(e) === '[object Map]',
    gr = (e) => Zt(e) === '[object Set]',
    Ms = (e) => Zt(e) === '[object Date]',
    M = (e) => typeof e == 'function',
    Z = (e) => typeof e == 'string',
    Se = (e) => typeof e == 'symbol',
    K = (e) => e !== null && typeof e == 'object',
    mr = (e) => (K(e) || M(e)) && M(e.then) && M(e.catch),
    yr = Object.prototype.toString,
    Zt = (e) => yr.call(e),
    Ho = (e) => Zt(e).slice(8, -1),
    br = (e) => Zt(e) === '[object Object]',
    us = (e) => Z(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
    Nt = ls(',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'),
    On = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Uo = /-\w/g,
    tt = On((e) => e.replace(Uo, (t) => t.slice(1).toUpperCase())),
    Vo = /\B([A-Z])/g,
    ft = On((e) => e.replace(Vo, '-$1').toLowerCase()),
    _r = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    $n = On((e) => (e ? `on${_r(e)}` : '')),
    et = (e, t) => !Object.is(e, t),
    Hn = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t);
    },
    vr = (e, t, n, s = !1) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: s, value: n });
    },
    Ko = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let js;
const An = () =>
    js || (js = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {});
function Pn(e) {
    if (I(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = Z(s) ? Go(s) : Pn(s);
            if (r) for (const o in r) t[o] = r[o];
        }
        return t;
    } else if (Z(e) || K(e)) return e;
}
const Wo = /;(?![^(]*\))/g,
    zo = /:([^]+)/,
    qo = /\/\*[^]*?\*\//g;
function Go(e) {
    const t = {};
    return (
        e
            .replace(qo, '')
            .split(Wo)
            .forEach((n) => {
                if (n) {
                    const s = n.split(zo);
                    s.length > 1 && (t[s[0].trim()] = s[1].trim());
                }
            }),
        t
    );
}
function En(e) {
    let t = '';
    if (Z(e)) t = e;
    else if (I(e))
        for (let n = 0; n < e.length; n++) {
            const s = En(e[n]);
            s && (t += s + ' ');
        }
    else if (K(e)) for (const n in e) e[n] && (t += n + ' ');
    return t.trim();
}
function ko(e) {
    if (!e) return null;
    let { class: t, style: n } = e;
    return (t && !Z(t) && (e.class = En(t)), n && (e.style = Pn(n)), e);
}
const Jo = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    Zo = ls(Jo);
function xr(e) {
    return !!e || e === '';
}
function Yo(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let s = 0; n && s < e.length; s++) n = as(e[s], t[s]);
    return n;
}
function as(e, t) {
    if (e === t) return !0;
    let n = Ms(e),
        s = Ms(t);
    if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
    if (((n = Se(e)), (s = Se(t)), n || s)) return e === t;
    if (((n = I(e)), (s = I(t)), n || s)) return n && s ? Yo(e, t) : !1;
    if (((n = K(e)), (s = K(t)), n || s)) {
        if (!n || !s) return !1;
        const r = Object.keys(e).length,
            o = Object.keys(t).length;
        if (r !== o) return !1;
        for (const i in e) {
            const l = e.hasOwnProperty(i),
                c = t.hasOwnProperty(i);
            if ((l && !c) || (!l && c) || !as(e[i], t[i])) return !1;
        }
    }
    return String(e) === String(t);
}
const Sr = (e) => !!(e && e.__v_isRef === !0),
    mt = (e) =>
        Z(e)
            ? e
            : e == null
              ? ''
              : I(e) || (K(e) && (e.toString === yr || !M(e.toString)))
                ? Sr(e)
                    ? mt(e.value)
                    : JSON.stringify(e, wr, 2)
                : String(e),
    wr = (e, t) =>
        Sr(t)
            ? wr(e, t.value)
            : _t(t)
              ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r], o) => ((n[Un(s, o) + ' =>'] = r), n), {}) }
              : gr(t)
                ? { [`Set(${t.size})`]: [...t.values()].map((n) => Un(n)) }
                : Se(t)
                  ? Un(t)
                  : K(t) && !I(t) && !br(t)
                    ? String(t)
                    : t,
    Un = (e, t = '') => {
        var n;
        return Se(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
let ae;
class Xo {
    constructor(t = !1) {
        ((this.detached = t),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.__v_skip = !0),
            (this.parent = ae),
            !t && ae && (this.index = (ae.scopes || (ae.scopes = [])).push(this) - 1));
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, n;
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, n;
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
        }
    }
    run(t) {
        if (this._active) {
            const n = ae;
            try {
                return ((ae = this), t());
            } finally {
                ae = n;
            }
        }
    }
    on() {
        ++this._on === 1 && ((this.prevScope = ae), (ae = this));
    }
    off() {
        this._on > 0 && --this._on === 0 && ((ae = this.prevScope), (this.prevScope = void 0));
    }
    stop(t) {
        if (this._active) {
            this._active = !1;
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
            for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
            if (((this.cleanups.length = 0), this.scopes)) {
                for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index));
            }
            this.parent = void 0;
        }
    }
}
function Qo() {
    return ae;
}
let q;
const Vn = new WeakSet();
class Tr {
    constructor(t) {
        ((this.fn = t),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            ae && ae.active && ae.effects.push(this));
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        this.flags & 64 && ((this.flags &= -65), Vn.has(this) && (Vn.delete(this), this.trigger()));
    }
    notify() {
        (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Or(this);
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        ((this.flags |= 2), Ds(this), Ar(this));
        const t = q,
            n = be;
        ((q = this), (be = !0));
        try {
            return this.fn();
        } finally {
            (Pr(this), (q = t), (be = n), (this.flags &= -3));
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) hs(t);
            ((this.deps = this.depsTail = void 0), Ds(this), this.onStop && this.onStop(), (this.flags &= -2));
        }
    }
    trigger() {
        this.flags & 64 ? Vn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
        Zn(this) && this.run();
    }
    get dirty() {
        return Zn(this);
    }
}
let Cr = 0,
    Ft,
    Bt;
function Or(e, t = !1) {
    if (((e.flags |= 8), t)) {
        ((e.next = Bt), (Bt = e));
        return;
    }
    ((e.next = Ft), (Ft = e));
}
function ds() {
    Cr++;
}
function ps() {
    if (--Cr > 0) return;
    if (Bt) {
        let t = Bt;
        for (Bt = void 0; t; ) {
            const n = t.next;
            ((t.next = void 0), (t.flags &= -9), (t = n));
        }
    }
    let e;
    for (; Ft; ) {
        let t = Ft;
        for (Ft = void 0; t; ) {
            const n = t.next;
            if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
                try {
                    t.trigger();
                } catch (s) {
                    e || (e = s);
                }
            t = n;
        }
    }
    if (e) throw e;
}
function Ar(e) {
    for (let t = e.deps; t; t = t.nextDep) ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t));
}
function Pr(e) {
    let t,
        n = e.depsTail,
        s = n;
    for (; s; ) {
        const r = s.prevDep;
        (s.version === -1 ? (s === n && (n = r), hs(s), ei(s)) : (t = s),
            (s.dep.activeLink = s.prevActiveLink),
            (s.prevActiveLink = void 0),
            (s = r));
    }
    ((e.deps = t), (e.depsTail = n));
}
function Zn(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (t.dep.version !== t.version || (t.dep.computed && (Er(t.dep.computed) || t.dep.version !== t.version))) return !0;
    return !!e._dirty;
}
function Er(e) {
    if (
        (e.flags & 4 && !(e.flags & 16)) ||
        ((e.flags &= -17), e.globalVersion === Kt) ||
        ((e.globalVersion = Kt), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Zn(e)))
    )
        return;
    e.flags |= 2;
    const t = e.dep,
        n = q,
        s = be;
    ((q = e), (be = !0));
    try {
        Ar(e);
        const r = e.fn(e._value);
        (t.version === 0 || et(r, e._value)) && ((e.flags |= 128), (e._value = r), t.version++);
    } catch (r) {
        throw (t.version++, r);
    } finally {
        ((q = n), (be = s), Pr(e), (e.flags &= -3));
    }
}
function hs(e, t = !1) {
    const { dep: n, prevSub: s, nextSub: r } = e;
    if (
        (s && ((s.nextSub = r), (e.prevSub = void 0)), r && ((r.prevSub = s), (e.nextSub = void 0)), n.subs === e && ((n.subs = s), !s && n.computed))
    ) {
        n.computed.flags &= -5;
        for (let o = n.computed.deps; o; o = o.nextDep) hs(o, !0);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ei(e) {
    const { prevDep: t, nextDep: n } = e;
    (t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let be = !0;
const Rr = [];
function Ve() {
    (Rr.push(be), (be = !1));
}
function Ke() {
    const e = Rr.pop();
    be = e === void 0 ? !0 : e;
}
function Ds(e) {
    const { cleanup: t } = e;
    if (((e.cleanup = void 0), t)) {
        const n = q;
        q = void 0;
        try {
            t();
        } finally {
            q = n;
        }
    }
}
let Kt = 0;
class ti {
    constructor(t, n) {
        ((this.sub = t),
            (this.dep = n),
            (this.version = n.version),
            (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0));
    }
}
class gs {
    constructor(t) {
        ((this.computed = t),
            (this.version = 0),
            (this.activeLink = void 0),
            (this.subs = void 0),
            (this.map = void 0),
            (this.key = void 0),
            (this.sc = 0),
            (this.__v_skip = !0));
    }
    track(t) {
        if (!q || !be || q === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== q)
            ((n = this.activeLink = new ti(q, this)),
                q.deps ? ((n.prevDep = q.depsTail), (q.depsTail.nextDep = n), (q.depsTail = n)) : (q.deps = q.depsTail = n),
                Lr(n));
        else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
            const s = n.nextDep;
            ((s.prevDep = n.prevDep),
                n.prevDep && (n.prevDep.nextDep = s),
                (n.prevDep = q.depsTail),
                (n.nextDep = void 0),
                (q.depsTail.nextDep = n),
                (q.depsTail = n),
                q.deps === n && (q.deps = s));
        }
        return n;
    }
    trigger(t) {
        (this.version++, Kt++, this.notify(t));
    }
    notify(t) {
        ds();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
        } finally {
            ps();
        }
    }
}
function Lr(e) {
    if ((e.dep.sc++, e.sub.flags & 4)) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let s = t.deps; s; s = s.nextDep) Lr(s);
        }
        const n = e.dep.subs;
        (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
    }
}
const Yn = new WeakMap(),
    lt = Symbol(''),
    Xn = Symbol(''),
    Wt = Symbol('');
function te(e, t, n) {
    if (be && q) {
        let s = Yn.get(e);
        s || Yn.set(e, (s = new Map()));
        let r = s.get(n);
        (r || (s.set(n, (r = new gs())), (r.map = s), (r.key = n)), r.track());
    }
}
function $e(e, t, n, s, r, o) {
    const i = Yn.get(e);
    if (!i) {
        Kt++;
        return;
    }
    const l = (c) => {
        c && c.trigger();
    };
    if ((ds(), t === 'clear')) i.forEach(l);
    else {
        const c = I(e),
            d = c && us(n);
        if (c && n === 'length') {
            const u = Number(s);
            i.forEach((p, v) => {
                (v === 'length' || v === Wt || (!Se(v) && v >= u)) && l(p);
            });
        } else
            switch (((n !== void 0 || i.has(void 0)) && l(i.get(n)), d && l(i.get(Wt)), t)) {
                case 'add':
                    c ? d && l(i.get('length')) : (l(i.get(lt)), _t(e) && l(i.get(Xn)));
                    break;
                case 'delete':
                    c || (l(i.get(lt)), _t(e) && l(i.get(Xn)));
                    break;
                case 'set':
                    _t(e) && l(i.get(lt));
                    break;
            }
    }
    ps();
}
function gt(e) {
    const t = $(e);
    return t === e ? t : (te(t, 'iterate', Wt), ye(e) ? t : t.map(we));
}
function Rn(e) {
    return (te((e = $(e)), 'iterate', Wt), e);
}
function Ze(e, t) {
    return We(e) ? Tt(ct(e) ? we(t) : t) : we(t);
}
const ni = {
    __proto__: null,
    [Symbol.iterator]() {
        return Kn(this, Symbol.iterator, (e) => Ze(this, e));
    },
    concat(...e) {
        return gt(this).concat(...e.map((t) => (I(t) ? gt(t) : t)));
    },
    entries() {
        return Kn(this, 'entries', (e) => ((e[1] = Ze(this, e[1])), e));
    },
    every(e, t) {
        return Ne(this, 'every', e, t, void 0, arguments);
    },
    filter(e, t) {
        return Ne(this, 'filter', e, t, (n) => n.map((s) => Ze(this, s)), arguments);
    },
    find(e, t) {
        return Ne(this, 'find', e, t, (n) => Ze(this, n), arguments);
    },
    findIndex(e, t) {
        return Ne(this, 'findIndex', e, t, void 0, arguments);
    },
    findLast(e, t) {
        return Ne(this, 'findLast', e, t, (n) => Ze(this, n), arguments);
    },
    findLastIndex(e, t) {
        return Ne(this, 'findLastIndex', e, t, void 0, arguments);
    },
    forEach(e, t) {
        return Ne(this, 'forEach', e, t, void 0, arguments);
    },
    includes(...e) {
        return Wn(this, 'includes', e);
    },
    indexOf(...e) {
        return Wn(this, 'indexOf', e);
    },
    join(e) {
        return gt(this).join(e);
    },
    lastIndexOf(...e) {
        return Wn(this, 'lastIndexOf', e);
    },
    map(e, t) {
        return Ne(this, 'map', e, t, void 0, arguments);
    },
    pop() {
        return It(this, 'pop');
    },
    push(...e) {
        return It(this, 'push', e);
    },
    reduce(e, ...t) {
        return Ns(this, 'reduce', e, t);
    },
    reduceRight(e, ...t) {
        return Ns(this, 'reduceRight', e, t);
    },
    shift() {
        return It(this, 'shift');
    },
    some(e, t) {
        return Ne(this, 'some', e, t, void 0, arguments);
    },
    splice(...e) {
        return It(this, 'splice', e);
    },
    toReversed() {
        return gt(this).toReversed();
    },
    toSorted(e) {
        return gt(this).toSorted(e);
    },
    toSpliced(...e) {
        return gt(this).toSpliced(...e);
    },
    unshift(...e) {
        return It(this, 'unshift', e);
    },
    values() {
        return Kn(this, 'values', (e) => Ze(this, e));
    },
};
function Kn(e, t, n) {
    const s = Rn(e),
        r = s[t]();
    return (
        s !== e &&
            !ye(e) &&
            ((r._next = r.next),
            (r.next = () => {
                const o = r._next();
                return (o.done || (o.value = n(o.value)), o);
            })),
        r
    );
}
const si = Array.prototype;
function Ne(e, t, n, s, r, o) {
    const i = Rn(e),
        l = i !== e && !ye(e),
        c = i[t];
    if (c !== si[t]) {
        const p = c.apply(e, o);
        return l ? we(p) : p;
    }
    let d = n;
    i !== e &&
        (l
            ? (d = function (p, v) {
                  return n.call(this, Ze(e, p), v, e);
              })
            : n.length > 2 &&
              (d = function (p, v) {
                  return n.call(this, p, v, e);
              }));
    const u = c.call(i, d, s);
    return l && r ? r(u) : u;
}
function Ns(e, t, n, s) {
    const r = Rn(e);
    let o = n;
    return (
        r !== e &&
            (ye(e)
                ? n.length > 3 &&
                  (o = function (i, l, c) {
                      return n.call(this, i, l, c, e);
                  })
                : (o = function (i, l, c) {
                      return n.call(this, i, Ze(e, l), c, e);
                  })),
        r[t](o, ...s)
    );
}
function Wn(e, t, n) {
    const s = $(e);
    te(s, 'iterate', Wt);
    const r = s[t](...n);
    return (r === -1 || r === !1) && bs(n[0]) ? ((n[0] = $(n[0])), s[t](...n)) : r;
}
function It(e, t, n = []) {
    (Ve(), ds());
    const s = $(e)[t].apply(e, n);
    return (ps(), Ke(), s);
}
const ri = ls('__proto__,__v_isRef,__isVue'),
    Ir = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== 'arguments' && e !== 'caller')
            .map((e) => Symbol[e])
            .filter(Se),
    );
function oi(e) {
    Se(e) || (e = String(e));
    const t = $(this);
    return (te(t, 'has', e), t.hasOwnProperty(e));
}
class Mr {
    constructor(t = !1, n = !1) {
        ((this._isReadonly = t), (this._isShallow = n));
    }
    get(t, n, s) {
        if (n === '__v_skip') return t.__v_skip;
        const r = this._isReadonly,
            o = this._isShallow;
        if (n === '__v_isReactive') return !r;
        if (n === '__v_isReadonly') return r;
        if (n === '__v_isShallow') return o;
        if (n === '__v_raw')
            return s === (r ? (o ? gi : Fr) : o ? Nr : Dr).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
        const i = I(t);
        if (!r) {
            let c;
            if (i && (c = ni[n])) return c;
            if (n === 'hasOwnProperty') return oi;
        }
        const l = Reflect.get(t, n, ne(t) ? t : s);
        if ((Se(n) ? Ir.has(n) : ri(n)) || (r || te(t, 'get', n), o)) return l;
        if (ne(l)) {
            const c = i && us(n) ? l : l.value;
            return r && K(c) ? es(c) : c;
        }
        return K(l) ? (r ? es(l) : Ln(l)) : l;
    }
}
class jr extends Mr {
    constructor(t = !1) {
        super(!1, t);
    }
    set(t, n, s, r) {
        let o = t[n];
        const i = I(t) && us(n);
        if (!this._isShallow) {
            const d = We(o);
            if ((!ye(s) && !We(s) && ((o = $(o)), (s = $(s))), !i && ne(o) && !ne(s))) return (d || (o.value = s), !0);
        }
        const l = i ? Number(n) < t.length : H(t, n),
            c = Reflect.set(t, n, s, ne(t) ? t : r);
        return (t === $(r) && (l ? et(s, o) && $e(t, 'set', n, s) : $e(t, 'add', n, s)), c);
    }
    deleteProperty(t, n) {
        const s = H(t, n);
        t[n];
        const r = Reflect.deleteProperty(t, n);
        return (r && s && $e(t, 'delete', n, void 0), r);
    }
    has(t, n) {
        const s = Reflect.has(t, n);
        return ((!Se(n) || !Ir.has(n)) && te(t, 'has', n), s);
    }
    ownKeys(t) {
        return (te(t, 'iterate', I(t) ? 'length' : lt), Reflect.ownKeys(t));
    }
}
class ii extends Mr {
    constructor(t = !1) {
        super(!0, t);
    }
    set(t, n) {
        return !0;
    }
    deleteProperty(t, n) {
        return !0;
    }
}
const li = new jr(),
    ci = new ii(),
    fi = new jr(!0);
const Qn = (e) => e,
    cn = (e) => Reflect.getPrototypeOf(e);
function ui(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            o = $(r),
            i = _t(o),
            l = e === 'entries' || (e === Symbol.iterator && i),
            c = e === 'keys' && i,
            d = r[e](...s),
            u = n ? Qn : t ? Tt : we;
        return (
            !t && te(o, 'iterate', c ? Xn : lt),
            ee(Object.create(d), {
                next() {
                    const { value: p, done: v } = d.next();
                    return v ? { value: p, done: v } : { value: l ? [u(p[0]), u(p[1])] : u(p), done: v };
                },
            })
        );
    };
}
function fn(e) {
    return function (...t) {
        return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
    };
}
function ai(e, t) {
    const n = {
        get(r) {
            const o = this.__v_raw,
                i = $(o),
                l = $(r);
            e || (et(r, l) && te(i, 'get', r), te(i, 'get', l));
            const { has: c } = cn(i),
                d = t ? Qn : e ? Tt : we;
            if (c.call(i, r)) return d(o.get(r));
            if (c.call(i, l)) return d(o.get(l));
            o !== i && o.get(r);
        },
        get size() {
            const r = this.__v_raw;
            return (!e && te($(r), 'iterate', lt), r.size);
        },
        has(r) {
            const o = this.__v_raw,
                i = $(o),
                l = $(r);
            return (e || (et(r, l) && te(i, 'has', r), te(i, 'has', l)), r === l ? o.has(r) : o.has(r) || o.has(l));
        },
        forEach(r, o) {
            const i = this,
                l = i.__v_raw,
                c = $(l),
                d = t ? Qn : e ? Tt : we;
            return (!e && te(c, 'iterate', lt), l.forEach((u, p) => r.call(o, d(u), d(p), i)));
        },
    };
    return (
        ee(
            n,
            e
                ? { add: fn('add'), set: fn('set'), delete: fn('delete'), clear: fn('clear') }
                : {
                      add(r) {
                          !t && !ye(r) && !We(r) && (r = $(r));
                          const o = $(this);
                          return (cn(o).has.call(o, r) || (o.add(r), $e(o, 'add', r, r)), this);
                      },
                      set(r, o) {
                          !t && !ye(o) && !We(o) && (o = $(o));
                          const i = $(this),
                              { has: l, get: c } = cn(i);
                          let d = l.call(i, r);
                          d || ((r = $(r)), (d = l.call(i, r)));
                          const u = c.call(i, r);
                          return (i.set(r, o), d ? et(o, u) && $e(i, 'set', r, o) : $e(i, 'add', r, o), this);
                      },
                      delete(r) {
                          const o = $(this),
                              { has: i, get: l } = cn(o);
                          let c = i.call(o, r);
                          (c || ((r = $(r)), (c = i.call(o, r))), l && l.call(o, r));
                          const d = o.delete(r);
                          return (c && $e(o, 'delete', r, void 0), d);
                      },
                      clear() {
                          const r = $(this),
                              o = r.size !== 0,
                              i = r.clear();
                          return (o && $e(r, 'clear', void 0, void 0), i);
                      },
                  },
        ),
        ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
            n[r] = ui(r, e, t);
        }),
        n
    );
}
function ms(e, t) {
    const n = ai(e, t);
    return (s, r, o) =>
        r === '__v_isReactive' ? !e : r === '__v_isReadonly' ? e : r === '__v_raw' ? s : Reflect.get(H(n, r) && r in s ? n : s, r, o);
}
const di = { get: ms(!1, !1) },
    pi = { get: ms(!1, !0) },
    hi = { get: ms(!0, !1) };
const Dr = new WeakMap(),
    Nr = new WeakMap(),
    Fr = new WeakMap(),
    gi = new WeakMap();
function mi(e) {
    switch (e) {
        case 'Object':
        case 'Array':
            return 1;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2;
        default:
            return 0;
    }
}
function yi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : mi(Ho(e));
}
function Ln(e) {
    return We(e) ? e : ys(e, !1, li, di, Dr);
}
function bi(e) {
    return ys(e, !1, fi, pi, Nr);
}
function es(e) {
    return ys(e, !0, ci, hi, Fr);
}
function ys(e, t, n, s, r) {
    if (!K(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = yi(e);
    if (o === 0) return e;
    const i = r.get(e);
    if (i) return i;
    const l = new Proxy(e, o === 2 ? s : n);
    return (r.set(e, l), l);
}
function ct(e) {
    return We(e) ? ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function We(e) {
    return !!(e && e.__v_isReadonly);
}
function ye(e) {
    return !!(e && e.__v_isShallow);
}
function bs(e) {
    return e ? !!e.__v_raw : !1;
}
function $(e) {
    const t = e && e.__v_raw;
    return t ? $(t) : e;
}
function ut(e) {
    return (!H(e, '__v_skip') && Object.isExtensible(e) && vr(e, '__v_skip', !0), e);
}
const we = (e) => (K(e) ? Ln(e) : e),
    Tt = (e) => (K(e) ? es(e) : e);
function ne(e) {
    return e ? e.__v_isRef === !0 : !1;
}
function Y(e) {
    return _i(e, !1);
}
function _i(e, t) {
    return ne(e) ? e : new vi(e, t);
}
class vi {
    constructor(t, n) {
        ((this.dep = new gs()),
            (this.__v_isRef = !0),
            (this.__v_isShallow = !1),
            (this._rawValue = n ? t : $(t)),
            (this._value = n ? t : we(t)),
            (this.__v_isShallow = n));
    }
    get value() {
        return (this.dep.track(), this._value);
    }
    set value(t) {
        const n = this._rawValue,
            s = this.__v_isShallow || ye(t) || We(t);
        ((t = s ? t : $(t)), et(t, n) && ((this._rawValue = t), (this._value = s ? t : we(t)), this.dep.trigger()));
    }
}
function vt(e) {
    return ne(e) ? e.value : e;
}
const xi = {
    get: (e, t, n) => (t === '__v_raw' ? e : vt(Reflect.get(e, t, n))),
    set: (e, t, n, s) => {
        const r = e[t];
        return ne(r) && !ne(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function Br(e) {
    return ct(e) ? e : new Proxy(e, xi);
}
class Si {
    constructor(t, n, s) {
        ((this.fn = t),
            (this.setter = n),
            (this._value = void 0),
            (this.dep = new gs(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = Kt - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !n),
            (this.isSSR = s));
    }
    notify() {
        if (((this.flags |= 16), !(this.flags & 8) && q !== this)) return (Or(this, !0), !0);
    }
    get value() {
        const t = this.dep.track();
        return (Er(this), t && (t.version = this.dep.version), this._value);
    }
    set value(t) {
        this.setter && this.setter(t);
    }
}
function wi(e, t, n = !1) {
    let s, r;
    return (M(e) ? (s = e) : ((s = e.get), (r = e.set)), new Si(s, r, n));
}
const un = {},
    mn = new WeakMap();
let it;
function Ti(e, t = !1, n = it) {
    if (n) {
        let s = mn.get(n);
        (s || mn.set(n, (s = [])), s.push(e));
    }
}
function Ci(e, t, n = G) {
    const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = n,
        d = (A) => (r ? A : ye(A) || r === !1 || r === 0 ? Qe(A, 1) : Qe(A));
    let u,
        p,
        v,
        _,
        j = !1,
        O = !1;
    if (
        (ne(e)
            ? ((p = () => e.value), (j = ye(e)))
            : ct(e)
              ? ((p = () => d(e)), (j = !0))
              : I(e)
                ? ((O = !0),
                  (j = e.some((A) => ct(A) || ye(A))),
                  (p = () =>
                      e.map((A) => {
                          if (ne(A)) return A.value;
                          if (ct(A)) return d(A);
                          if (M(A)) return c ? c(A, 2) : A();
                      })))
                : M(e)
                  ? t
                      ? (p = c ? () => c(e, 2) : e)
                      : (p = () => {
                            if (v) {
                                Ve();
                                try {
                                    v();
                                } finally {
                                    Ke();
                                }
                            }
                            const A = it;
                            it = u;
                            try {
                                return c ? c(e, 3, [_]) : e(_);
                            } finally {
                                it = A;
                            }
                        })
                  : (p = je),
        t && r)
    ) {
        const A = p,
            k = r === !0 ? 1 / 0 : r;
        p = () => Qe(A(), k);
    }
    const B = Qo(),
        R = () => {
            (u.stop(), B && B.active && fs(B.effects, u));
        };
    if (o && t) {
        const A = t;
        t = (...k) => {
            (A(...k), R());
        };
    }
    let E = O ? new Array(e.length).fill(un) : un;
    const N = (A) => {
        if (!(!(u.flags & 1) || (!u.dirty && !A)))
            if (t) {
                const k = u.run();
                if (r || j || (O ? k.some((Q, me) => et(Q, E[me])) : et(k, E))) {
                    v && v();
                    const Q = it;
                    it = u;
                    try {
                        const me = [k, E === un ? void 0 : O && E[0] === un ? [] : E, _];
                        ((E = k), c ? c(t, 3, me) : t(...me));
                    } finally {
                        it = Q;
                    }
                }
            } else u.run();
    };
    return (
        l && l(N),
        (u = new Tr(p)),
        (u.scheduler = i ? () => i(N, !1) : N),
        (_ = (A) => Ti(A, !1, u)),
        (v = u.onStop =
            () => {
                const A = mn.get(u);
                if (A) {
                    if (c) c(A, 4);
                    else for (const k of A) k();
                    mn.delete(u);
                }
            }),
        t ? (s ? N(!0) : (E = u.run())) : i ? i(N.bind(null, !0), !0) : u.run(),
        (R.pause = u.pause.bind(u)),
        (R.resume = u.resume.bind(u)),
        (R.stop = R),
        R
    );
}
function Qe(e, t = 1 / 0, n) {
    if (t <= 0 || !K(e) || e.__v_skip || ((n = n || new Map()), (n.get(e) || 0) >= t)) return e;
    if ((n.set(e, t), t--, ne(e))) Qe(e.value, t, n);
    else if (I(e)) for (let s = 0; s < e.length; s++) Qe(e[s], t, n);
    else if (gr(e) || _t(e))
        e.forEach((s) => {
            Qe(s, t, n);
        });
    else if (br(e)) {
        for (const s in e) Qe(e[s], t, n);
        for (const s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && Qe(e[s], t, n);
    }
    return e;
}
function Yt(e, t, n, s) {
    try {
        return s ? e(...s) : e();
    } catch (r) {
        In(r, t, n);
    }
}
function De(e, t, n, s) {
    if (M(e)) {
        const r = Yt(e, t, n, s);
        return (
            r &&
                mr(r) &&
                r.catch((o) => {
                    In(o, t, n);
                }),
            r
        );
    }
    if (I(e)) {
        const r = [];
        for (let o = 0; o < e.length; o++) r.push(De(e[o], t, n, s));
        return r;
    }
}
function In(e, t, n, s = !0) {
    const r = t ? t.vnode : null,
        { errorHandler: o, throwUnhandledErrorInProduction: i } = (t && t.appContext.config) || G;
    if (t) {
        let l = t.parent;
        const c = t.proxy,
            d = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; l; ) {
            const u = l.ec;
            if (u) {
                for (let p = 0; p < u.length; p++) if (u[p](e, c, d) === !1) return;
            }
            l = l.parent;
        }
        if (o) {
            (Ve(), Yt(o, null, 10, [e, c, d]), Ke());
            return;
        }
    }
    Oi(e, n, r, s, i);
}
function Oi(e, t, n, s = !0, r = !1) {
    if (r) throw e;
    console.error(e);
}
const oe = [];
let Re = -1;
const xt = [];
let Ye = null,
    yt = 0;
const $r = Promise.resolve();
let yn = null;
function ze(e) {
    const t = yn || $r;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ai(e) {
    let t = Re + 1,
        n = oe.length;
    for (; t < n; ) {
        const s = (t + n) >>> 1,
            r = oe[s],
            o = zt(r);
        o < e || (o === e && r.flags & 2) ? (t = s + 1) : (n = s);
    }
    return t;
}
function _s(e) {
    if (!(e.flags & 1)) {
        const t = zt(e),
            n = oe[oe.length - 1];
        (!n || (!(e.flags & 2) && t >= zt(n)) ? oe.push(e) : oe.splice(Ai(t), 0, e), (e.flags |= 1), Hr());
    }
}
function Hr() {
    yn || (yn = $r.then(Vr));
}
function Pi(e) {
    (I(e) ? xt.push(...e) : Ye && e.id === -1 ? Ye.splice(yt + 1, 0, e) : e.flags & 1 || (xt.push(e), (e.flags |= 1)), Hr());
}
function Fs(e, t, n = Re + 1) {
    for (; n < oe.length; n++) {
        const s = oe[n];
        if (s && s.flags & 2) {
            if (e && s.id !== e.uid) continue;
            (oe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2));
        }
    }
}
function Ur(e) {
    if (xt.length) {
        const t = [...new Set(xt)].sort((n, s) => zt(n) - zt(s));
        if (((xt.length = 0), Ye)) {
            Ye.push(...t);
            return;
        }
        for (Ye = t, yt = 0; yt < Ye.length; yt++) {
            const n = Ye[yt];
            (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
        }
        ((Ye = null), (yt = 0));
    }
}
const zt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Vr(e) {
    try {
        for (Re = 0; Re < oe.length; Re++) {
            const t = oe[Re];
            t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Yt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
        }
    } finally {
        for (; Re < oe.length; Re++) {
            const t = oe[Re];
            t && (t.flags &= -2);
        }
        ((Re = -1), (oe.length = 0), Ur(), (yn = null), (oe.length || xt.length) && Vr());
    }
}
let pe = null,
    Kr = null;
function bn(e) {
    const t = pe;
    return ((pe = e), (Kr = (e && e.type.__scopeId) || null), t);
}
function _n(e, t = pe, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && Sn(-1);
        const o = bn(t);
        let i;
        try {
            i = e(...r);
        } finally {
            (bn(o), s._d && Sn(1));
        }
        return i;
    };
    return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function rt(e, t, n, s) {
    const r = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const l = r[i];
        o && (l.oldValue = o[i].value);
        let c = l.dir[s];
        c && (Ve(), De(c, n, 8, [e.el, l, e, t]), Ke());
    }
}
function Me(e, t) {
    if (ie) {
        let n = ie.provides;
        const s = ie.parent && ie.parent.provides;
        (s === n && (n = ie.provides = Object.create(s)), (n[e] = t));
    }
}
function _e(e, t, n = !1) {
    const s = Al();
    if (s || wt) {
        let r = wt
            ? wt._context.provides
            : s
              ? s.parent == null || s.ce
                  ? s.vnode.appContext && s.vnode.appContext.provides
                  : s.parent.provides
              : void 0;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && M(t) ? t.call(s && s.proxy) : t;
    }
}
const Ei = Symbol.for('v-scx'),
    Ri = () => _e(Ei);
function $t(e, t, n) {
    return Wr(e, t, n);
}
function Wr(e, t, n = G) {
    const { immediate: s, deep: r, flush: o, once: i } = n,
        l = ee({}, n),
        c = (t && s) || (!t && o !== 'post');
    let d;
    if (Jt) {
        if (o === 'sync') {
            const _ = Ri();
            d = _.__watcherHandles || (_.__watcherHandles = []);
        } else if (!c) {
            const _ = () => {};
            return ((_.stop = je), (_.resume = je), (_.pause = je), _);
        }
    }
    const u = ie;
    l.call = (_, j, O) => De(_, u, j, O);
    let p = !1;
    (o === 'post'
        ? (l.scheduler = (_) => {
              ue(_, u && u.suspense);
          })
        : o !== 'sync' &&
          ((p = !0),
          (l.scheduler = (_, j) => {
              j ? _() : _s(_);
          })),
        (l.augmentJob = (_) => {
            (t && (_.flags |= 4), p && ((_.flags |= 2), u && ((_.id = u.uid), (_.i = u))));
        }));
    const v = Ci(e, t, l);
    return (Jt && (d ? d.push(v) : c && v()), v);
}
function Li(e, t, n) {
    const s = this.proxy,
        r = Z(e) ? (e.includes('.') ? zr(s, e) : () => s[e]) : e.bind(s, s);
    let o;
    M(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = Qt(this),
        l = Wr(r, o.bind(s), n);
    return (i(), l);
}
function zr(e, t) {
    const n = t.split('.');
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
const Ii = Symbol('_vte'),
    Mi = (e) => e.__isTeleport,
    ji = Symbol('_leaveCb');
function vs(e, t) {
    e.shapeFlag & 6 && e.component
        ? ((e.transition = t), vs(e.component.subTree, t))
        : e.shapeFlag & 128
          ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
          : (e.transition = t);
}
function Te(e, t) {
    return M(e) ? ee({ name: e.name }, t, { setup: e }) : e;
}
function qr(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function Bs(e, t) {
    let n;
    return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const vn = new WeakMap();
function Ht(e, t, n, s, r = !1) {
    if (I(e)) {
        e.forEach((O, B) => Ht(O, t && (I(t) ? t[B] : t), n, s, r));
        return;
    }
    if (St(s) && !r) {
        s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ht(e, t, n, s.component.subTree);
        return;
    }
    const o = s.shapeFlag & 4 ? Ts(s.component) : s.el,
        i = r ? null : o,
        { i: l, r: c } = e,
        d = t && t.r,
        u = l.refs === G ? (l.refs = {}) : l.refs,
        p = l.setupState,
        v = $(p),
        _ = p === G ? hr : (O) => (Bs(u, O) ? !1 : H(v, O)),
        j = (O, B) => !(B && Bs(u, B));
    if (d != null && d !== c) {
        if (($s(t), Z(d))) ((u[d] = null), _(d) && (p[d] = null));
        else if (ne(d)) {
            const O = t;
            (j(d, O.k) && (d.value = null), O.k && (u[O.k] = null));
        }
    }
    if (M(c)) Yt(c, l, 12, [i, u]);
    else {
        const O = Z(c),
            B = ne(c);
        if (O || B) {
            const R = () => {
                if (e.f) {
                    const E = O ? (_(c) ? p[c] : u[c]) : j() || !e.k ? c.value : u[e.k];
                    if (r) I(E) && fs(E, o);
                    else if (I(E)) E.includes(o) || E.push(o);
                    else if (O) ((u[c] = [o]), _(c) && (p[c] = u[c]));
                    else {
                        const N = [o];
                        (j(c, e.k) && (c.value = N), e.k && (u[e.k] = N));
                    }
                } else O ? ((u[c] = i), _(c) && (p[c] = i)) : B && (j(c, e.k) && (c.value = i), e.k && (u[e.k] = i));
            };
            if (i) {
                const E = () => {
                    (R(), vn.delete(e));
                };
                ((E.id = -1), vn.set(e, E), ue(E, n));
            } else ($s(e), R());
        }
    }
}
function $s(e) {
    const t = vn.get(e);
    t && ((t.flags |= 8), vn.delete(e));
}
An().requestIdleCallback;
An().cancelIdleCallback;
const St = (e) => !!e.type.__asyncLoader,
    Gr = (e) => e.type.__isKeepAlive;
function Di(e, t) {
    kr(e, 'a', t);
}
function Ni(e, t) {
    kr(e, 'da', t);
}
function kr(e, t, n = ie) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let r = n;
            for (; r; ) {
                if (r.isDeactivated) return;
                r = r.parent;
            }
            return e();
        });
    if ((Mn(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent; ) (Gr(r.parent.vnode) && Fi(s, t, n, r), (r = r.parent));
    }
}
function Fi(e, t, n, s) {
    const r = Mn(t, e, s, !0);
    Xt(() => {
        fs(s[t], r);
    }, n);
}
function Mn(e, t, n = ie, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    Ve();
                    const l = Qt(n),
                        c = De(t, n, e, i);
                    return (l(), Ke(), c);
                });
        return (s ? r.unshift(o) : r.push(o), o);
    }
}
const Ge =
        (e) =>
        (t, n = ie) => {
            (!Jt || e === 'sp') && Mn(e, (...s) => t(...s), n);
        },
    Bi = Ge('bm'),
    ke = Ge('m'),
    $i = Ge('bu'),
    Hi = Ge('u'),
    jn = Ge('bum'),
    Xt = Ge('um'),
    Ui = Ge('sp'),
    Vi = Ge('rtg'),
    Ki = Ge('rtc');
function Wi(e, t = ie) {
    Mn('ec', e, t);
}
const zi = Symbol.for('v-ndc');
function qi(e, t, n, s) {
    let r;
    const o = n,
        i = I(e);
    if (i || Z(e)) {
        const l = i && ct(e);
        let c = !1,
            d = !1;
        (l && ((c = !ye(e)), (d = We(e)), (e = Rn(e))), (r = new Array(e.length)));
        for (let u = 0, p = e.length; u < p; u++) r[u] = t(c ? (d ? Tt(we(e[u])) : we(e[u])) : e[u], u, void 0, o);
    } else if (typeof e == 'number') {
        r = new Array(e);
        for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, o);
    } else if (K(e))
        if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, o));
        else {
            const l = Object.keys(e);
            r = new Array(l.length);
            for (let c = 0, d = l.length; c < d; c++) {
                const u = l[c];
                r[c] = t(e[u], u, c, o);
            }
        }
    else r = [];
    return r;
}
function Gi(e, t, n = {}, s, r) {
    if (pe.ce || (pe.parent && St(pe.parent) && pe.parent.ce)) {
        const d = Object.keys(n).length > 0;
        return (He(), Gt(de, null, [X('slot', n, s)], d ? -2 : 64));
    }
    let o = e[t];
    (o && o._c && (o._d = !1), He());
    const i = o && Jr(o(n)),
        l = n.key || (i && i.key),
        c = Gt(de, { key: (l && !Se(l) ? l : `_${t}`) + (!i && s ? '_fb' : '') }, i || [], i && e._ === 1 ? 64 : -2);
    return (o && o._c && (o._d = !0), c);
}
function Jr(e) {
    return e.some((t) => (kt(t) ? !(t.type === qe || (t.type === de && !Jr(t.children))) : !0)) ? e : null;
}
const ts = (e) => (e ? (bo(e) ? Ts(e) : ts(e.parent)) : null),
    Ut = ee(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => ts(e.parent),
        $root: (e) => ts(e.root),
        $host: (e) => e.ce,
        $emit: (e) => e.emit,
        $options: (e) => Yr(e),
        $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
                _s(e.update);
            }),
        $nextTick: (e) => e.n || (e.n = ze.bind(e.proxy)),
        $watch: (e) => Li.bind(e),
    }),
    zn = (e, t) => e !== G && !e.__isScriptSetup && H(e, t),
    ki = {
        get({ _: e }, t) {
            if (t === '__v_skip') return !0;
            const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: c } = e;
            if (t[0] !== '$') {
                const v = i[t];
                if (v !== void 0)
                    switch (v) {
                        case 1:
                            return s[t];
                        case 2:
                            return r[t];
                        case 4:
                            return n[t];
                        case 3:
                            return o[t];
                    }
                else {
                    if (zn(s, t)) return ((i[t] = 1), s[t]);
                    if (r !== G && H(r, t)) return ((i[t] = 2), r[t]);
                    if (H(o, t)) return ((i[t] = 3), o[t]);
                    if (n !== G && H(n, t)) return ((i[t] = 4), n[t]);
                    ns && (i[t] = 0);
                }
            }
            const d = Ut[t];
            let u, p;
            if (d) return (t === '$attrs' && te(e.attrs, 'get', ''), d(e));
            if ((u = l.__cssModules) && (u = u[t])) return u;
            if (n !== G && H(n, t)) return ((i[t] = 4), n[t]);
            if (((p = c.config.globalProperties), H(p, t))) return p[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: o } = e;
            return zn(r, t)
                ? ((r[t] = n), !0)
                : s !== G && H(s, t)
                  ? ((s[t] = n), !0)
                  : H(e.props, t) || (t[0] === '$' && t.slice(1) in e)
                    ? !1
                    : ((o[t] = n), !0);
        },
        has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: o, type: i } }, l) {
            let c;
            return !!(
                n[l] ||
                (e !== G && l[0] !== '$' && H(e, l)) ||
                zn(t, l) ||
                H(o, l) ||
                H(s, l) ||
                H(Ut, l) ||
                H(r.config.globalProperties, l) ||
                ((c = i.__cssModules) && c[l])
            );
        },
        defineProperty(e, t, n) {
            return (n.get != null ? (e._.accessCache[t] = 0) : H(n, 'value') && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n));
        },
    };
function Hs(e) {
    return I(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ns = !0;
function Ji(e) {
    const t = Yr(e),
        n = e.proxy,
        s = e.ctx;
    ((ns = !1), t.beforeCreate && Us(t.beforeCreate, e, 'bc'));
    const {
        data: r,
        computed: o,
        methods: i,
        watch: l,
        provide: c,
        inject: d,
        created: u,
        beforeMount: p,
        mounted: v,
        beforeUpdate: _,
        updated: j,
        activated: O,
        deactivated: B,
        beforeDestroy: R,
        beforeUnmount: E,
        destroyed: N,
        unmounted: A,
        render: k,
        renderTracked: Q,
        renderTriggered: me,
        errorCaptured: le,
        serverPrefetch: D,
        expose: U,
        inheritAttrs: Je,
        components: sn,
        directives: rn,
        filters: Fn,
    } = t;
    if ((d && Zi(d, s, null), i))
        for (const J in i) {
            const W = i[J];
            M(W) && (s[J] = W.bind(n));
        }
    if (r) {
        const J = r.call(n, n);
        K(J) && (e.data = Ln(J));
    }
    if (((ns = !0), o))
        for (const J in o) {
            const W = o[J],
                nt = M(W) ? W.bind(n, n) : M(W.get) ? W.get.bind(n, n) : je,
                on = !M(W) && M(W.set) ? W.set.bind(n) : je,
                st = Dt({ get: nt, set: on });
            Object.defineProperty(s, J, { enumerable: !0, configurable: !0, get: () => st.value, set: (Ce) => (st.value = Ce) });
        }
    if (l) for (const J in l) Zr(l[J], s, n, J);
    if (c) {
        const J = M(c) ? c.call(n) : c;
        Reflect.ownKeys(J).forEach((W) => {
            Me(W, J[W]);
        });
    }
    u && Us(u, e, 'c');
    function se(J, W) {
        I(W) ? W.forEach((nt) => J(nt.bind(n))) : W && J(W.bind(n));
    }
    if ((se(Bi, p), se(ke, v), se($i, _), se(Hi, j), se(Di, O), se(Ni, B), se(Wi, le), se(Ki, Q), se(Vi, me), se(jn, E), se(Xt, A), se(Ui, D), I(U)))
        if (U.length) {
            const J = e.exposed || (e.exposed = {});
            U.forEach((W) => {
                Object.defineProperty(J, W, { get: () => n[W], set: (nt) => (n[W] = nt), enumerable: !0 });
            });
        } else e.exposed || (e.exposed = {});
    (k && e.render === je && (e.render = k), Je != null && (e.inheritAttrs = Je), sn && (e.components = sn), rn && (e.directives = rn), D && qr(e));
}
function Zi(e, t, n = je) {
    I(e) && (e = ss(e));
    for (const s in e) {
        const r = e[s];
        let o;
        (K(r) ? ('default' in r ? (o = _e(r.from || s, r.default, !0)) : (o = _e(r.from || s))) : (o = _e(r)),
            ne(o) ? Object.defineProperty(t, s, { enumerable: !0, configurable: !0, get: () => o.value, set: (i) => (o.value = i) }) : (t[s] = o));
    }
}
function Us(e, t, n) {
    De(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Zr(e, t, n, s) {
    let r = s.includes('.') ? zr(n, s) : () => n[s];
    if (Z(e)) {
        const o = t[e];
        M(o) && $t(r, o);
    } else if (M(e)) $t(r, e.bind(n));
    else if (K(e))
        if (I(e)) e.forEach((o) => Zr(o, t, n, s));
        else {
            const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
            M(o) && $t(r, o, e);
        }
}
function Yr(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: r,
            optionsCache: o,
            config: { optionMergeStrategies: i },
        } = e.appContext,
        l = o.get(t);
    let c;
    return (
        l ? (c = l) : !r.length && !n && !s ? (c = t) : ((c = {}), r.length && r.forEach((d) => xn(c, d, i, !0)), xn(c, t, i)),
        K(t) && o.set(t, c),
        c
    );
}
function xn(e, t, n, s = !1) {
    const { mixins: r, extends: o } = t;
    (o && xn(e, o, n, !0), r && r.forEach((i) => xn(e, i, n, !0)));
    for (const i in t)
        if (!(s && i === 'expose')) {
            const l = Yi[i] || (n && n[i]);
            e[i] = l ? l(e[i], t[i]) : t[i];
        }
    return e;
}
const Yi = {
    data: Vs,
    props: Ks,
    emits: Ks,
    methods: jt,
    computed: jt,
    beforeCreate: re,
    created: re,
    beforeMount: re,
    mounted: re,
    beforeUpdate: re,
    updated: re,
    beforeDestroy: re,
    beforeUnmount: re,
    destroyed: re,
    unmounted: re,
    activated: re,
    deactivated: re,
    errorCaptured: re,
    serverPrefetch: re,
    components: jt,
    directives: jt,
    watch: Qi,
    provide: Vs,
    inject: Xi,
};
function Vs(e, t) {
    return t
        ? e
            ? function () {
                  return ee(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function Xi(e, t) {
    return jt(ss(e), ss(t));
}
function ss(e) {
    if (I(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function re(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function jt(e, t) {
    return e ? ee(Object.create(null), e, t) : t;
}
function Ks(e, t) {
    return e ? (I(e) && I(t) ? [...new Set([...e, ...t])] : ee(Object.create(null), Hs(e), Hs(t ?? {}))) : t;
}
function Qi(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = ee(Object.create(null), e);
    for (const s in t) n[s] = re(e[s], t[s]);
    return n;
}
function Xr() {
    return {
        app: null,
        config: {
            isNativeTag: hr,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let el = 0;
function tl(e, t) {
    return function (s, r = null) {
        (M(s) || (s = ee({}, s)), r != null && !K(r) && (r = null));
        const o = Xr(),
            i = new WeakSet(),
            l = [];
        let c = !1;
        const d = (o.app = {
            _uid: el++,
            _component: s,
            _props: r,
            _container: null,
            _context: o,
            _instance: null,
            version: Ml,
            get config() {
                return o.config;
            },
            set config(u) {},
            use(u, ...p) {
                return (i.has(u) || (u && M(u.install) ? (i.add(u), u.install(d, ...p)) : M(u) && (i.add(u), u(d, ...p))), d);
            },
            mixin(u) {
                return (o.mixins.includes(u) || o.mixins.push(u), d);
            },
            component(u, p) {
                return p ? ((o.components[u] = p), d) : o.components[u];
            },
            directive(u, p) {
                return p ? ((o.directives[u] = p), d) : o.directives[u];
            },
            mount(u, p, v) {
                if (!c) {
                    const _ = d._ceVNode || X(s, r);
                    return (
                        (_.appContext = o),
                        v === !0 ? (v = 'svg') : v === !1 && (v = void 0),
                        e(_, u, v),
                        (c = !0),
                        (d._container = u),
                        (u.__vue_app__ = d),
                        Ts(_.component)
                    );
                }
            },
            onUnmount(u) {
                l.push(u);
            },
            unmount() {
                c && (De(l, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
            },
            provide(u, p) {
                return ((o.provides[u] = p), d);
            },
            runWithContext(u) {
                const p = wt;
                wt = d;
                try {
                    return u();
                } finally {
                    wt = p;
                }
            },
        });
        return d;
    };
}
let wt = null;
const nl = (e, t) =>
    t === 'modelValue' || t === 'model-value' ? e.modelModifiers : e[`${t}Modifiers`] || e[`${tt(t)}Modifiers`] || e[`${ft(t)}Modifiers`];
function sl(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || G;
    let r = n;
    const o = t.startsWith('update:'),
        i = o && nl(s, t.slice(7));
    i && (i.trim && (r = n.map((u) => (Z(u) ? u.trim() : u))), i.number && (r = n.map(Ko)));
    let l,
        c = s[(l = $n(t))] || s[(l = $n(tt(t)))];
    (!c && o && (c = s[(l = $n(ft(t)))]), c && De(c, e, 6, r));
    const d = s[l + 'Once'];
    if (d) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        ((e.emitted[l] = !0), De(d, e, 6, r));
    }
}
const rl = new WeakMap();
function Qr(e, t, n = !1) {
    const s = n ? rl : t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const o = e.emits;
    let i = {},
        l = !1;
    if (!M(e)) {
        const c = (d) => {
            const u = Qr(d, t, !0);
            u && ((l = !0), ee(i, u));
        };
        (!n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c));
    }
    return !o && !l ? (K(e) && s.set(e, null), null) : (I(o) ? o.forEach((c) => (i[c] = null)) : ee(i, o), K(e) && s.set(e, i), i);
}
function Dn(e, t) {
    return !e || !Cn(t) ? !1 : ((t = t.slice(2).replace(/Once$/, '')), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, ft(t)) || H(e, t));
}
function Ws(e) {
    const {
            type: t,
            vnode: n,
            proxy: s,
            withProxy: r,
            propsOptions: [o],
            slots: i,
            attrs: l,
            emit: c,
            render: d,
            renderCache: u,
            props: p,
            data: v,
            setupState: _,
            ctx: j,
            inheritAttrs: O,
        } = e,
        B = bn(e);
    let R, E;
    try {
        if (n.shapeFlag & 4) {
            const A = r || s,
                k = A;
            ((R = Ie(d.call(k, A, u, p, _, v, j))), (E = l));
        } else {
            const A = t;
            ((R = Ie(A.length > 1 ? A(p, { attrs: l, slots: i, emit: c }) : A(p, null))), (E = t.props ? l : ol(l)));
        }
    } catch (A) {
        ((Vt.length = 0), In(A, e, 1), (R = X(qe)));
    }
    let N = R;
    if (E && O !== !1) {
        const A = Object.keys(E),
            { shapeFlag: k } = N;
        A.length && k & 7 && (o && A.some(cs) && (E = il(E, o)), (N = Ct(N, E, !1, !0)));
    }
    return (
        n.dirs && ((N = Ct(N, null, !1, !0)), (N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs)),
        n.transition && vs(N, n.transition),
        (R = N),
        bn(B),
        R
    );
}
const ol = (e) => {
        let t;
        for (const n in e) (n === 'class' || n === 'style' || Cn(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    il = (e, t) => {
        const n = {};
        for (const s in e) (!cs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function ll(e, t, n) {
    const { props: s, children: r, component: o } = e,
        { props: i, children: l, patchFlag: c } = t,
        d = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return s ? zs(s, i, d) : !!i;
        if (c & 8) {
            const u = t.dynamicProps;
            for (let p = 0; p < u.length; p++) {
                const v = u[p];
                if (eo(i, s, v) && !Dn(d, v)) return !0;
            }
        }
    } else return (r || l) && (!l || !l.$stable) ? !0 : s === i ? !1 : s ? (i ? zs(s, i, d) : !0) : !!i;
    return !1;
}
function zs(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (eo(t, e, o) && !Dn(n, o)) return !0;
    }
    return !1;
}
function eo(e, t, n) {
    const s = e[n],
        r = t[n];
    return n === 'style' && K(s) && K(r) ? !as(s, r) : s !== r;
}
function cl({ vnode: e, parent: t }, n) {
    for (; t; ) {
        const s = t.subTree;
        if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)) (((e = t.vnode).el = n), (t = t.parent));
        else break;
    }
}
const to = {},
    no = () => Object.create(to),
    so = (e) => Object.getPrototypeOf(e) === to;
function fl(e, t, n, s = !1) {
    const r = {},
        o = no();
    ((e.propsDefaults = Object.create(null)), ro(e, t, r, o));
    for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
    (n ? (e.props = s ? r : bi(r)) : e.type.props ? (e.props = r) : (e.props = o), (e.attrs = o));
}
function ul(e, t, n, s) {
    const {
            props: r,
            attrs: o,
            vnode: { patchFlag: i },
        } = e,
        l = $(r),
        [c] = e.propsOptions;
    let d = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const u = e.vnode.dynamicProps;
            for (let p = 0; p < u.length; p++) {
                let v = u[p];
                if (Dn(e.emitsOptions, v)) continue;
                const _ = t[v];
                if (c)
                    if (H(o, v)) _ !== o[v] && ((o[v] = _), (d = !0));
                    else {
                        const j = tt(v);
                        r[j] = rs(c, l, j, _, e, !1);
                    }
                else _ !== o[v] && ((o[v] = _), (d = !0));
            }
        }
    } else {
        ro(e, t, r, o) && (d = !0);
        let u;
        for (const p in l)
            (!t || (!H(t, p) && ((u = ft(p)) === p || !H(t, u)))) &&
                (c ? n && (n[p] !== void 0 || n[u] !== void 0) && (r[p] = rs(c, l, p, void 0, e, !0)) : delete r[p]);
        if (o !== l) for (const p in o) (!t || !H(t, p)) && (delete o[p], (d = !0));
    }
    d && $e(e.attrs, 'set', '');
}
function ro(e, t, n, s) {
    const [r, o] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let c in t) {
            if (Nt(c)) continue;
            const d = t[c];
            let u;
            r && H(r, (u = tt(c)))
                ? !o || !o.includes(u)
                    ? (n[u] = d)
                    : ((l || (l = {}))[u] = d)
                : Dn(e.emitsOptions, c) || ((!(c in s) || d !== s[c]) && ((s[c] = d), (i = !0)));
        }
    if (o) {
        const c = $(n),
            d = l || G;
        for (let u = 0; u < o.length; u++) {
            const p = o[u];
            n[p] = rs(r, c, p, d[p], e, !H(d, p));
        }
    }
    return i;
}
function rs(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const l = H(i, 'default');
        if (l && s === void 0) {
            const c = i.default;
            if (i.type !== Function && !i.skipFactory && M(c)) {
                const { propsDefaults: d } = r;
                if (n in d) s = d[n];
                else {
                    const u = Qt(r);
                    ((s = d[n] = c.call(null, t)), u());
                }
            } else s = c;
            r.ce && r.ce._setProp(n, s);
        }
        i[0] && (o && !l ? (s = !1) : i[1] && (s === '' || s === ft(n)) && (s = !0));
    }
    return s;
}
const al = new WeakMap();
function oo(e, t, n = !1) {
    const s = n ? al : t.propsCache,
        r = s.get(e);
    if (r) return r;
    const o = e.props,
        i = {},
        l = [];
    let c = !1;
    if (!M(e)) {
        const u = (p) => {
            c = !0;
            const [v, _] = oo(p, t, !0);
            (ee(i, v), _ && l.push(..._));
        };
        (!n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u));
    }
    if (!o && !c) return (K(e) && s.set(e, bt), bt);
    if (I(o))
        for (let u = 0; u < o.length; u++) {
            const p = tt(o[u]);
            qs(p) && (i[p] = G);
        }
    else if (o)
        for (const u in o) {
            const p = tt(u);
            if (qs(p)) {
                const v = o[u],
                    _ = (i[p] = I(v) || M(v) ? { type: v } : ee({}, v)),
                    j = _.type;
                let O = !1,
                    B = !0;
                if (I(j))
                    for (let R = 0; R < j.length; ++R) {
                        const E = j[R],
                            N = M(E) && E.name;
                        if (N === 'Boolean') {
                            O = !0;
                            break;
                        } else N === 'String' && (B = !1);
                    }
                else O = M(j) && j.name === 'Boolean';
                ((_[0] = O), (_[1] = B), (O || H(_, 'default')) && l.push(p));
            }
        }
    const d = [i, l];
    return (K(e) && s.set(e, d), d);
}
function qs(e) {
    return e[0] !== '$' && !Nt(e);
}
const xs = (e) => e === '_' || e === '_ctx' || e === '$stable',
    Ss = (e) => (I(e) ? e.map(Ie) : [Ie(e)]),
    dl = (e, t, n) => {
        if (t._n) return t;
        const s = _n((...r) => Ss(t(...r)), n);
        return ((s._c = !1), s);
    },
    io = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (xs(r)) continue;
            const o = e[r];
            if (M(o)) t[r] = dl(r, o, s);
            else if (o != null) {
                const i = Ss(o);
                t[r] = () => i;
            }
        }
    },
    lo = (e, t) => {
        const n = Ss(t);
        e.slots.default = () => n;
    },
    co = (e, t, n) => {
        for (const s in t) (n || !xs(s)) && (e[s] = t[s]);
    },
    pl = (e, t, n) => {
        const s = (e.slots = no());
        if (e.vnode.shapeFlag & 32) {
            const r = t._;
            r ? (co(s, t, n), n && vr(s, '_', r, !0)) : io(t, s);
        } else t && lo(e, t);
    },
    hl = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let o = !0,
            i = G;
        if (s.shapeFlag & 32) {
            const l = t._;
            (l ? (n && l === 1 ? (o = !1) : co(r, t, n)) : ((o = !t.$stable), io(t, r)), (i = t));
        } else t && (lo(e, t), (i = { default: 1 }));
        if (o) for (const l in r) !xs(l) && i[l] == null && delete r[l];
    },
    ue = _l;
function gl(e) {
    return ml(e);
}
function ml(e, t) {
    const n = An();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: o,
            createElement: i,
            createText: l,
            createComment: c,
            setText: d,
            setElementText: u,
            parentNode: p,
            nextSibling: v,
            setScopeId: _ = je,
            insertStaticContent: j,
        } = e,
        O = (f, a, h, b = null, g = null, m = null, w = void 0, S = null, x = !!a.dynamicChildren) => {
            if (f === a) return;
            (f && !Mt(f, a) && ((b = ln(f)), Ce(f, g, m, !0), (f = null)), a.patchFlag === -2 && ((x = !1), (a.dynamicChildren = null)));
            const { type: y, ref: P, shapeFlag: T } = a;
            switch (y) {
                case Nn:
                    B(f, a, h, b);
                    break;
                case qe:
                    R(f, a, h, b);
                    break;
                case Gn:
                    f == null && E(a, h, b, w);
                    break;
                case de:
                    sn(f, a, h, b, g, m, w, S, x);
                    break;
                default:
                    T & 1
                        ? k(f, a, h, b, g, m, w, S, x)
                        : T & 6
                          ? rn(f, a, h, b, g, m, w, S, x)
                          : (T & 64 || T & 128) && y.process(f, a, h, b, g, m, w, S, x, Rt);
            }
            P != null && g ? Ht(P, f && f.ref, m, a || f, !a) : P == null && f && f.ref != null && Ht(f.ref, null, m, f, !0);
        },
        B = (f, a, h, b) => {
            if (f == null) s((a.el = l(a.children)), h, b);
            else {
                const g = (a.el = f.el);
                a.children !== f.children && d(g, a.children);
            }
        },
        R = (f, a, h, b) => {
            f == null ? s((a.el = c(a.children || '')), h, b) : (a.el = f.el);
        },
        E = (f, a, h, b) => {
            [f.el, f.anchor] = j(f.children, a, h, b, f.el, f.anchor);
        },
        N = ({ el: f, anchor: a }, h, b) => {
            let g;
            for (; f && f !== a; ) ((g = v(f)), s(f, h, b), (f = g));
            s(a, h, b);
        },
        A = ({ el: f, anchor: a }) => {
            let h;
            for (; f && f !== a; ) ((h = v(f)), r(f), (f = h));
            r(a);
        },
        k = (f, a, h, b, g, m, w, S, x) => {
            if ((a.type === 'svg' ? (w = 'svg') : a.type === 'math' && (w = 'mathml'), f == null)) Q(a, h, b, g, m, w, S, x);
            else {
                const y = f.el && f.el._isVueCE ? f.el : null;
                try {
                    (y && y._beginPatch(), D(f, a, g, m, w, S, x));
                } finally {
                    y && y._endPatch();
                }
            }
        },
        Q = (f, a, h, b, g, m, w, S) => {
            let x, y;
            const { props: P, shapeFlag: T, transition: C, dirs: L } = f;
            if (
                ((x = f.el = i(f.type, m, P && P.is, P)),
                T & 8 ? u(x, f.children) : T & 16 && le(f.children, x, null, b, g, qn(f, m), w, S),
                L && rt(f, null, b, 'created'),
                me(x, f, f.scopeId, w, b),
                P)
            ) {
                for (const z in P) z !== 'value' && !Nt(z) && o(x, z, null, P[z], m, b);
                ('value' in P && o(x, 'value', null, P.value, m), (y = P.onVnodeBeforeMount) && Ee(y, b, f));
            }
            L && rt(f, null, b, 'beforeMount');
            const F = yl(g, C);
            (F && C.beforeEnter(x),
                s(x, a, h),
                ((y = P && P.onVnodeMounted) || F || L) &&
                    ue(() => {
                        (y && Ee(y, b, f), F && C.enter(x), L && rt(f, null, b, 'mounted'));
                    }, g));
        },
        me = (f, a, h, b, g) => {
            if ((h && _(f, h), b)) for (let m = 0; m < b.length; m++) _(f, b[m]);
            if (g) {
                let m = g.subTree;
                if (a === m || (po(m.type) && (m.ssContent === a || m.ssFallback === a))) {
                    const w = g.vnode;
                    me(f, w, w.scopeId, w.slotScopeIds, g.parent);
                }
            }
        },
        le = (f, a, h, b, g, m, w, S, x = 0) => {
            for (let y = x; y < f.length; y++) {
                const P = (f[y] = S ? Be(f[y]) : Ie(f[y]));
                O(null, P, a, h, b, g, m, w, S);
            }
        },
        D = (f, a, h, b, g, m, w) => {
            const S = (a.el = f.el);
            let { patchFlag: x, dynamicChildren: y, dirs: P } = a;
            x |= f.patchFlag & 16;
            const T = f.props || G,
                C = a.props || G;
            let L;
            if (
                (h && ot(h, !1),
                (L = C.onVnodeBeforeUpdate) && Ee(L, h, a, f),
                P && rt(a, f, h, 'beforeUpdate'),
                h && ot(h, !0),
                ((T.innerHTML && C.innerHTML == null) || (T.textContent && C.textContent == null)) && u(S, ''),
                y ? U(f.dynamicChildren, y, S, h, b, qn(a, g), m) : w || W(f, a, S, null, h, b, qn(a, g), m, !1),
                x > 0)
            ) {
                if (x & 16) Je(S, T, C, h, g);
                else if ((x & 2 && T.class !== C.class && o(S, 'class', null, C.class, g), x & 4 && o(S, 'style', T.style, C.style, g), x & 8)) {
                    const F = a.dynamicProps;
                    for (let z = 0; z < F.length; z++) {
                        const V = F[z],
                            ce = T[V],
                            fe = C[V];
                        (fe !== ce || V === 'value') && o(S, V, ce, fe, g, h);
                    }
                }
                x & 1 && f.children !== a.children && u(S, a.children);
            } else !w && y == null && Je(S, T, C, h, g);
            ((L = C.onVnodeUpdated) || P) &&
                ue(() => {
                    (L && Ee(L, h, a, f), P && rt(a, f, h, 'updated'));
                }, b);
        },
        U = (f, a, h, b, g, m, w) => {
            for (let S = 0; S < a.length; S++) {
                const x = f[S],
                    y = a[S],
                    P = x.el && (x.type === de || !Mt(x, y) || x.shapeFlag & 198) ? p(x.el) : h;
                O(x, y, P, null, b, g, m, w, !0);
            }
        },
        Je = (f, a, h, b, g) => {
            if (a !== h) {
                if (a !== G) for (const m in a) !Nt(m) && !(m in h) && o(f, m, a[m], null, g, b);
                for (const m in h) {
                    if (Nt(m)) continue;
                    const w = h[m],
                        S = a[m];
                    w !== S && m !== 'value' && o(f, m, S, w, g, b);
                }
                'value' in h && o(f, 'value', a.value, h.value, g);
            }
        },
        sn = (f, a, h, b, g, m, w, S, x) => {
            const y = (a.el = f ? f.el : l('')),
                P = (a.anchor = f ? f.anchor : l(''));
            let { patchFlag: T, dynamicChildren: C, slotScopeIds: L } = a;
            (L && (S = S ? S.concat(L) : L),
                f == null
                    ? (s(y, h, b), s(P, h, b), le(a.children || [], h, P, g, m, w, S, x))
                    : T > 0 && T & 64 && C && f.dynamicChildren && f.dynamicChildren.length === C.length
                      ? (U(f.dynamicChildren, C, h, g, m, w, S), (a.key != null || (g && a === g.subTree)) && fo(f, a, !0))
                      : W(f, a, h, P, g, m, w, S, x));
        },
        rn = (f, a, h, b, g, m, w, S, x) => {
            ((a.slotScopeIds = S), f == null ? (a.shapeFlag & 512 ? g.ctx.activate(a, h, b, w, x) : Fn(a, h, b, g, m, w, x)) : As(f, a, x));
        },
        Fn = (f, a, h, b, g, m, w) => {
            const S = (f.component = Ol(f, b, g));
            if ((Gr(f) && (S.ctx.renderer = Rt), Pl(S, !1, w), S.asyncDep)) {
                if ((g && g.registerDep(S, se, w), !f.el)) {
                    const x = (S.subTree = X(qe));
                    (R(null, x, a, h), (f.placeholder = x.el));
                }
            } else se(S, f, a, h, g, m, w);
        },
        As = (f, a, h) => {
            const b = (a.component = f.component);
            if (ll(f, a, h))
                if (b.asyncDep && !b.asyncResolved) {
                    J(b, a, h);
                    return;
                } else ((b.next = a), b.update());
            else ((a.el = f.el), (b.vnode = a));
        },
        se = (f, a, h, b, g, m, w) => {
            const S = () => {
                if (f.isMounted) {
                    let { next: T, bu: C, u: L, parent: F, vnode: z } = f;
                    {
                        const Ae = uo(f);
                        if (Ae) {
                            (T && ((T.el = z.el), J(f, T, w)),
                                Ae.asyncDep.then(() => {
                                    ue(() => {
                                        f.isUnmounted || y();
                                    }, g);
                                }));
                            return;
                        }
                    }
                    let V = T,
                        ce;
                    (ot(f, !1),
                        T ? ((T.el = z.el), J(f, T, w)) : (T = z),
                        C && Hn(C),
                        (ce = T.props && T.onVnodeBeforeUpdate) && Ee(ce, F, T, z),
                        ot(f, !0));
                    const fe = Ws(f),
                        Oe = f.subTree;
                    ((f.subTree = fe),
                        O(Oe, fe, p(Oe.el), ln(Oe), f, g, m),
                        (T.el = fe.el),
                        V === null && cl(f, fe.el),
                        L && ue(L, g),
                        (ce = T.props && T.onVnodeUpdated) && ue(() => Ee(ce, F, T, z), g));
                } else {
                    let T;
                    const { el: C, props: L } = a,
                        { bm: F, m: z, parent: V, root: ce, type: fe } = f,
                        Oe = St(a);
                    (ot(f, !1), F && Hn(F), !Oe && (T = L && L.onVnodeBeforeMount) && Ee(T, V, a), ot(f, !0));
                    {
                        ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(fe);
                        const Ae = (f.subTree = Ws(f));
                        (O(null, Ae, h, b, f, g, m), (a.el = Ae.el));
                    }
                    if ((z && ue(z, g), !Oe && (T = L && L.onVnodeMounted))) {
                        const Ae = a;
                        ue(() => Ee(T, V, Ae), g);
                    }
                    ((a.shapeFlag & 256 || (V && St(V.vnode) && V.vnode.shapeFlag & 256)) && f.a && ue(f.a, g),
                        (f.isMounted = !0),
                        (a = h = b = null));
                }
            };
            f.scope.on();
            const x = (f.effect = new Tr(S));
            f.scope.off();
            const y = (f.update = x.run.bind(x)),
                P = (f.job = x.runIfDirty.bind(x));
            ((P.i = f), (P.id = f.uid), (x.scheduler = () => _s(P)), ot(f, !0), y());
        },
        J = (f, a, h) => {
            a.component = f;
            const b = f.vnode.props;
            ((f.vnode = a), (f.next = null), ul(f, a.props, b, h), hl(f, a.children, h), Ve(), Fs(f), Ke());
        },
        W = (f, a, h, b, g, m, w, S, x = !1) => {
            const y = f && f.children,
                P = f ? f.shapeFlag : 0,
                T = a.children,
                { patchFlag: C, shapeFlag: L } = a;
            if (C > 0) {
                if (C & 128) {
                    on(y, T, h, b, g, m, w, S, x);
                    return;
                } else if (C & 256) {
                    nt(y, T, h, b, g, m, w, S, x);
                    return;
                }
            }
            L & 8
                ? (P & 16 && Et(y, g, m), T !== y && u(h, T))
                : P & 16
                  ? L & 16
                      ? on(y, T, h, b, g, m, w, S, x)
                      : Et(y, g, m, !0)
                  : (P & 8 && u(h, ''), L & 16 && le(T, h, b, g, m, w, S, x));
        },
        nt = (f, a, h, b, g, m, w, S, x) => {
            ((f = f || bt), (a = a || bt));
            const y = f.length,
                P = a.length,
                T = Math.min(y, P);
            let C;
            for (C = 0; C < T; C++) {
                const L = (a[C] = x ? Be(a[C]) : Ie(a[C]));
                O(f[C], L, h, null, g, m, w, S, x);
            }
            y > P ? Et(f, g, m, !0, !1, T) : le(a, h, b, g, m, w, S, x, T);
        },
        on = (f, a, h, b, g, m, w, S, x) => {
            let y = 0;
            const P = a.length;
            let T = f.length - 1,
                C = P - 1;
            for (; y <= T && y <= C; ) {
                const L = f[y],
                    F = (a[y] = x ? Be(a[y]) : Ie(a[y]));
                if (Mt(L, F)) O(L, F, h, null, g, m, w, S, x);
                else break;
                y++;
            }
            for (; y <= T && y <= C; ) {
                const L = f[T],
                    F = (a[C] = x ? Be(a[C]) : Ie(a[C]));
                if (Mt(L, F)) O(L, F, h, null, g, m, w, S, x);
                else break;
                (T--, C--);
            }
            if (y > T) {
                if (y <= C) {
                    const L = C + 1,
                        F = L < P ? a[L].el : b;
                    for (; y <= C; ) (O(null, (a[y] = x ? Be(a[y]) : Ie(a[y])), h, F, g, m, w, S, x), y++);
                }
            } else if (y > C) for (; y <= T; ) (Ce(f[y], g, m, !0), y++);
            else {
                const L = y,
                    F = y,
                    z = new Map();
                for (y = F; y <= C; y++) {
                    const he = (a[y] = x ? Be(a[y]) : Ie(a[y]));
                    he.key != null && z.set(he.key, y);
                }
                let V,
                    ce = 0;
                const fe = C - F + 1;
                let Oe = !1,
                    Ae = 0;
                const Lt = new Array(fe);
                for (y = 0; y < fe; y++) Lt[y] = 0;
                for (y = L; y <= T; y++) {
                    const he = f[y];
                    if (ce >= fe) {
                        Ce(he, g, m, !0);
                        continue;
                    }
                    let Pe;
                    if (he.key != null) Pe = z.get(he.key);
                    else
                        for (V = F; V <= C; V++)
                            if (Lt[V - F] === 0 && Mt(he, a[V])) {
                                Pe = V;
                                break;
                            }
                    Pe === void 0
                        ? Ce(he, g, m, !0)
                        : ((Lt[Pe - F] = y + 1), Pe >= Ae ? (Ae = Pe) : (Oe = !0), O(he, a[Pe], h, null, g, m, w, S, x), ce++);
                }
                const Rs = Oe ? bl(Lt) : bt;
                for (V = Rs.length - 1, y = fe - 1; y >= 0; y--) {
                    const he = F + y,
                        Pe = a[he],
                        Ls = a[he + 1],
                        Is = he + 1 < P ? Ls.el || ao(Ls) : b;
                    Lt[y] === 0 ? O(null, Pe, h, Is, g, m, w, S, x) : Oe && (V < 0 || y !== Rs[V] ? st(Pe, h, Is, 2) : V--);
                }
            }
        },
        st = (f, a, h, b, g = null) => {
            const { el: m, type: w, transition: S, children: x, shapeFlag: y } = f;
            if (y & 6) {
                st(f.component.subTree, a, h, b);
                return;
            }
            if (y & 128) {
                f.suspense.move(a, h, b);
                return;
            }
            if (y & 64) {
                w.move(f, a, h, Rt);
                return;
            }
            if (w === de) {
                s(m, a, h);
                for (let T = 0; T < x.length; T++) st(x[T], a, h, b);
                s(f.anchor, a, h);
                return;
            }
            if (w === Gn) {
                N(f, a, h);
                return;
            }
            if (b !== 2 && y & 1 && S)
                if (b === 0) (S.beforeEnter(m), s(m, a, h), ue(() => S.enter(m), g));
                else {
                    const { leave: T, delayLeave: C, afterLeave: L } = S,
                        F = () => {
                            f.ctx.isUnmounted ? r(m) : s(m, a, h);
                        },
                        z = () => {
                            (m._isLeaving && m[ji](!0),
                                T(m, () => {
                                    (F(), L && L());
                                }));
                        };
                    C ? C(m, F, z) : z();
                }
            else s(m, a, h);
        },
        Ce = (f, a, h, b = !1, g = !1) => {
            const { type: m, props: w, ref: S, children: x, dynamicChildren: y, shapeFlag: P, patchFlag: T, dirs: C, cacheIndex: L } = f;
            if ((T === -2 && (g = !1), S != null && (Ve(), Ht(S, null, h, f, !0), Ke()), L != null && (a.renderCache[L] = void 0), P & 256)) {
                a.ctx.deactivate(f);
                return;
            }
            const F = P & 1 && C,
                z = !St(f);
            let V;
            if ((z && (V = w && w.onVnodeBeforeUnmount) && Ee(V, a, f), P & 6)) Bo(f.component, h, b);
            else {
                if (P & 128) {
                    f.suspense.unmount(h, b);
                    return;
                }
                (F && rt(f, null, a, 'beforeUnmount'),
                    P & 64
                        ? f.type.remove(f, a, h, Rt, b)
                        : y && !y.hasOnce && (m !== de || (T > 0 && T & 64))
                          ? Et(y, a, h, !1, !0)
                          : ((m === de && T & 384) || (!g && P & 16)) && Et(x, a, h),
                    b && Ps(f));
            }
            ((z && (V = w && w.onVnodeUnmounted)) || F) &&
                ue(() => {
                    (V && Ee(V, a, f), F && rt(f, null, a, 'unmounted'));
                }, h);
        },
        Ps = (f) => {
            const { type: a, el: h, anchor: b, transition: g } = f;
            if (a === de) {
                Fo(h, b);
                return;
            }
            if (a === Gn) {
                A(f);
                return;
            }
            const m = () => {
                (r(h), g && !g.persisted && g.afterLeave && g.afterLeave());
            };
            if (f.shapeFlag & 1 && g && !g.persisted) {
                const { leave: w, delayLeave: S } = g,
                    x = () => w(h, m);
                S ? S(f.el, m, x) : x();
            } else m();
        },
        Fo = (f, a) => {
            let h;
            for (; f !== a; ) ((h = v(f)), r(f), (f = h));
            r(a);
        },
        Bo = (f, a, h) => {
            const { bum: b, scope: g, job: m, subTree: w, um: S, m: x, a: y } = f;
            (Gs(x),
                Gs(y),
                b && Hn(b),
                g.stop(),
                m && ((m.flags |= 8), Ce(w, f, a, h)),
                S && ue(S, a),
                ue(() => {
                    f.isUnmounted = !0;
                }, a));
        },
        Et = (f, a, h, b = !1, g = !1, m = 0) => {
            for (let w = m; w < f.length; w++) Ce(f[w], a, h, b, g);
        },
        ln = (f) => {
            if (f.shapeFlag & 6) return ln(f.component.subTree);
            if (f.shapeFlag & 128) return f.suspense.next();
            const a = v(f.anchor || f.el),
                h = a && a[Ii];
            return h ? v(h) : a;
        };
    let Bn = !1;
    const Es = (f, a, h) => {
            let b;
            (f == null ? a._vnode && (Ce(a._vnode, null, null, !0), (b = a._vnode.component)) : O(a._vnode || null, f, a, null, null, null, h),
                (a._vnode = f),
                Bn || ((Bn = !0), Fs(b), Ur(), (Bn = !1)));
        },
        Rt = { p: O, um: Ce, m: st, r: Ps, mt: Fn, mc: le, pc: W, pbc: U, n: ln, o: e };
    return { render: Es, hydrate: void 0, createApp: tl(Es) };
}
function qn({ type: e, props: t }, n) {
    return (n === 'svg' && e === 'foreignObject') || (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
        ? void 0
        : n;
}
function ot({ effect: e, job: t }, n) {
    n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function yl(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function fo(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (I(s) && I(r))
        for (let o = 0; o < s.length; o++) {
            const i = s[o];
            let l = r[o];
            (l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = r[o] = Be(r[o])), (l.el = i.el)), !n && l.patchFlag !== -2 && fo(i, l)),
                l.type === Nn && (l.patchFlag === -1 && (l = r[o] = Be(l)), (l.el = i.el)),
                l.type === qe && !l.el && (l.el = i.el));
        }
}
function bl(e) {
    const t = e.slice(),
        n = [0];
    let s, r, o, i, l;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const d = e[s];
        if (d !== 0) {
            if (((r = n[n.length - 1]), e[r] < d)) {
                ((t[s] = r), n.push(s));
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; ) ((l = (o + i) >> 1), e[n[l]] < d ? (o = l + 1) : (i = l));
            d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
    return n;
}
function uo(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : uo(t);
}
function Gs(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ao(e) {
    if (e.placeholder) return e.placeholder;
    const t = e.component;
    return t ? ao(t.subTree) : null;
}
const po = (e) => e.__isSuspense;
function _l(e, t) {
    t && t.pendingBranch ? (I(e) ? t.effects.push(...e) : t.effects.push(e)) : Pi(e);
}
const de = Symbol.for('v-fgt'),
    Nn = Symbol.for('v-txt'),
    qe = Symbol.for('v-cmt'),
    Gn = Symbol.for('v-stc'),
    Vt = [];
let ge = null;
function He(e = !1) {
    Vt.push((ge = e ? null : []));
}
function vl() {
    (Vt.pop(), (ge = Vt[Vt.length - 1] || null));
}
let qt = 1;
function Sn(e, t = !1) {
    ((qt += e), e < 0 && ge && t && (ge.hasOnce = !0));
}
function ho(e) {
    return ((e.dynamicChildren = qt > 0 ? ge || bt : null), vl(), qt > 0 && ge && ge.push(e), e);
}
function wn(e, t, n, s, r, o) {
    return ho(Le(e, t, n, s, r, o, !0));
}
function Gt(e, t, n, s, r) {
    return ho(X(e, t, n, s, r, !0));
}
function kt(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Mt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const go = ({ key: e }) => e ?? null,
    hn = ({ ref: e, ref_key: t, ref_for: n }) => (
        typeof e == 'number' && (e = '' + e),
        e != null ? (Z(e) || ne(e) || M(e) ? { i: pe, r: e, k: t, f: !!n } : e) : null
    );
function Le(e, t = null, n = null, s = 0, r = null, o = e === de ? 0 : 1, i = !1, l = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && go(t),
        ref: t && hn(t),
        scopeId: Kr,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: pe,
    };
    return (
        l ? (ws(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= Z(n) ? 8 : 16),
        qt > 0 && !i && ge && (c.patchFlag > 0 || o & 6) && c.patchFlag !== 32 && ge.push(c),
        c
    );
}
const X = xl;
function xl(e, t = null, n = null, s = 0, r = null, o = !1) {
    if (((!e || e === zi) && (e = qe), kt(e))) {
        const l = Ct(e, t, !0);
        return (n && ws(l, n), qt > 0 && !o && ge && (l.shapeFlag & 6 ? (ge[ge.indexOf(e)] = l) : ge.push(l)), (l.patchFlag = -2), l);
    }
    if ((Il(e) && (e = e.__vccOpts), t)) {
        t = mo(t);
        let { class: l, style: c } = t;
        (l && !Z(l) && (t.class = En(l)), K(c) && (bs(c) && !I(c) && (c = ee({}, c)), (t.style = Pn(c))));
    }
    const i = Z(e) ? 1 : po(e) ? 128 : Mi(e) ? 64 : K(e) ? 4 : M(e) ? 2 : 0;
    return Le(e, t, n, s, r, i, o, !0);
}
function mo(e) {
    return e ? (bs(e) || so(e) ? ee({}, e) : e) : null;
}
function Ct(e, t, n = !1, s = !1) {
    const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e,
        d = t ? yo(r || {}, t) : r,
        u = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: d,
            key: d && go(d),
            ref: t && t.ref ? (n && o ? (I(o) ? o.concat(hn(t)) : [o, hn(t)]) : hn(t)) : o,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: l,
            target: e.target,
            targetStart: e.targetStart,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== de ? (i === -1 ? 16 : i | 16) : i,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: c,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Ct(e.ssContent),
            ssFallback: e.ssFallback && Ct(e.ssFallback),
            placeholder: e.placeholder,
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
        };
    return (c && s && vs(u, c.clone(u)), u);
}
function Sl(e = ' ', t = 0) {
    return X(Nn, null, e, t);
}
function wl(e = '', t = !1) {
    return t ? (He(), Gt(qe, null, e)) : X(qe, null, e);
}
function Ie(e) {
    return e == null || typeof e == 'boolean' ? X(qe) : I(e) ? X(de, null, e.slice()) : kt(e) ? Be(e) : X(Nn, null, String(e));
}
function Be(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ct(e);
}
function ws(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (I(t)) n = 16;
    else if (typeof t == 'object')
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), ws(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !so(t) ? (t._ctx = pe) : r === 3 && pe && (pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else M(t) ? ((t = { default: t, _ctx: pe }), (n = 32)) : ((t = String(t)), s & 64 ? ((n = 16), (t = [Sl(t)])) : (n = 8));
    ((e.children = t), (e.shapeFlag |= n));
}
function yo(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === 'class') t.class !== s.class && (t.class = En([t.class, s.class]));
            else if (r === 'style') t.style = Pn([t.style, s.style]);
            else if (Cn(r)) {
                const o = t[r],
                    i = s[r];
                i && o !== i && !(I(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
            } else r !== '' && (t[r] = s[r]);
    }
    return t;
}
function Ee(e, t, n, s = null) {
    De(e, t, 7, [n, s]);
}
const Tl = Xr();
let Cl = 0;
function Ol(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || Tl,
        o = {
            uid: Cl++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new Xo(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            ids: t ? t.ids : ['', 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: oo(s, r),
            emitsOptions: Qr(s, r),
            emit: null,
            emitted: null,
            propsDefaults: G,
            inheritAttrs: s.inheritAttrs,
            ctx: G,
            data: G,
            props: G,
            attrs: G,
            slots: G,
            refs: G,
            setupState: G,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return ((o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = sl.bind(null, o)), e.ce && e.ce(o), o);
}
let ie = null;
const Al = () => ie || pe;
let Tn, os;
{
    const e = An(),
        t = (n, s) => {
            let r;
            return (
                (r = e[n]) || (r = e[n] = []),
                r.push(s),
                (o) => {
                    r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
                }
            );
        };
    ((Tn = t('__VUE_INSTANCE_SETTERS__', (n) => (ie = n))), (os = t('__VUE_SSR_SETTERS__', (n) => (Jt = n))));
}
const Qt = (e) => {
        const t = ie;
        return (
            Tn(e),
            e.scope.on(),
            () => {
                (e.scope.off(), Tn(t));
            }
        );
    },
    ks = () => {
        (ie && ie.scope.off(), Tn(null));
    };
function bo(e) {
    return e.vnode.shapeFlag & 4;
}
let Jt = !1;
function Pl(e, t = !1, n = !1) {
    t && os(t);
    const { props: s, children: r } = e.vnode,
        o = bo(e);
    (fl(e, s, o, t), pl(e, r, n || t));
    const i = o ? El(e, t) : void 0;
    return (t && os(!1), i);
}
function El(e, t) {
    const n = e.type;
    ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, ki)));
    const { setup: s } = n;
    if (s) {
        Ve();
        const r = (e.setupContext = s.length > 1 ? Ll(e) : null),
            o = Qt(e),
            i = Yt(s, e, 0, [e.props, r]),
            l = mr(i);
        if ((Ke(), o(), (l || e.sp) && !St(e) && qr(e), l)) {
            if ((i.then(ks, ks), t))
                return i
                    .then((c) => {
                        Js(e, c);
                    })
                    .catch((c) => {
                        In(c, e, 0);
                    });
            e.asyncDep = i;
        } else Js(e, i);
    } else _o(e);
}
function Js(e, t, n) {
    (M(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : K(t) && (e.setupState = Br(t)), _o(e));
}
function _o(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || je);
    {
        const r = Qt(e);
        Ve();
        try {
            Ji(e);
        } finally {
            (Ke(), r());
        }
    }
}
const Rl = {
    get(e, t) {
        return (te(e, 'get', ''), e[t]);
    },
};
function Ll(e) {
    const t = (n) => {
        e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, Rl), slots: e.slots, emit: e.emit, expose: t };
}
function Ts(e) {
    return e.exposed
        ? e.exposeProxy ||
              (e.exposeProxy = new Proxy(Br(ut(e.exposed)), {
                  get(t, n) {
                      if (n in t) return t[n];
                      if (n in Ut) return Ut[n](e);
                  },
                  has(t, n) {
                      return n in t || n in Ut;
                  },
              }))
        : e.proxy;
}
function Il(e) {
    return M(e) && '__vccOpts' in e;
}
const Dt = (e, t) => wi(e, t, Jt);
function at(e, t, n) {
    try {
        Sn(-1);
        const s = arguments.length;
        return s === 2
            ? K(t) && !I(t)
                ? kt(t)
                    ? X(e, null, [t])
                    : X(e, t)
                : X(e, null, t)
            : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && kt(n) && (n = [n]), X(e, t, n));
    } finally {
        Sn(1);
    }
}
const Ml = '3.5.28';
let is;
const Zs = typeof window < 'u' && window.trustedTypes;
if (Zs)
    try {
        is = Zs.createPolicy('vue', { createHTML: (e) => e });
    } catch {}
const vo = is ? (e) => is.createHTML(e) : (e) => e,
    jl = 'http://www.w3.org/2000/svg',
    Dl = 'http://www.w3.org/1998/Math/MathML',
    Fe = typeof document < 'u' ? document : null,
    Ys = Fe && Fe.createElement('template'),
    Nl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const r =
                t === 'svg'
                    ? Fe.createElementNS(jl, e)
                    : t === 'mathml'
                      ? Fe.createElementNS(Dl, e)
                      : n
                        ? Fe.createElement(e, { is: n })
                        : Fe.createElement(e);
            return (e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple), r);
        },
        createText: (e) => Fe.createTextNode(e),
        createComment: (e) => Fe.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Fe.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, '');
        },
        insertStaticContent(e, t, n, s, r, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (r && (r === o || r.nextSibling)) for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); );
            else {
                Ys.innerHTML = vo(s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e);
                const l = Ys.content;
                if (s === 'svg' || s === 'mathml') {
                    const c = l.firstChild;
                    for (; c.firstChild; ) l.appendChild(c.firstChild);
                    l.removeChild(c);
                }
                t.insertBefore(l, n);
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    },
    Fl = Symbol('_vtc');
function Bl(e, t, n) {
    const s = e[Fl];
    (s && (t = (t ? [t, ...s] : [...s]).join(' ')), t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t));
}
const Xs = Symbol('_vod'),
    $l = Symbol('_vsh'),
    Hl = Symbol(''),
    Ul = /(?:^|;)\s*display\s*:/;
function Vl(e, t, n) {
    const s = e.style,
        r = Z(n);
    let o = !1;
    if (n && !r) {
        if (t)
            if (Z(t))
                for (const i of t.split(';')) {
                    const l = i.slice(0, i.indexOf(':')).trim();
                    n[l] == null && gn(s, l, '');
                }
            else for (const i in t) n[i] == null && gn(s, i, '');
        for (const i in n) (i === 'display' && (o = !0), gn(s, i, n[i]));
    } else if (r) {
        if (t !== n) {
            const i = s[Hl];
            (i && (n += ';' + i), (s.cssText = n), (o = Ul.test(n)));
        }
    } else t && e.removeAttribute('style');
    Xs in e && ((e[Xs] = o ? s.display : ''), e[$l] && (s.display = 'none'));
}
const Qs = /\s*!important$/;
function gn(e, t, n) {
    if (I(n)) n.forEach((s) => gn(e, t, s));
    else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
    else {
        const s = Kl(e, t);
        Qs.test(n) ? e.setProperty(ft(s), n.replace(Qs, ''), 'important') : (e[s] = n);
    }
}
const er = ['Webkit', 'Moz', 'ms'],
    kn = {};
function Kl(e, t) {
    const n = kn[t];
    if (n) return n;
    let s = tt(t);
    if (s !== 'filter' && s in e) return (kn[t] = s);
    s = _r(s);
    for (let r = 0; r < er.length; r++) {
        const o = er[r] + s;
        if (o in e) return (kn[t] = o);
    }
    return t;
}
const tr = 'http://www.w3.org/1999/xlink';
function nr(e, t, n, s, r, o = Zo(t)) {
    s && t.startsWith('xlink:')
        ? n == null
            ? e.removeAttributeNS(tr, t.slice(6, t.length))
            : e.setAttributeNS(tr, t, n)
        : n == null || (o && !xr(n))
          ? e.removeAttribute(t)
          : e.setAttribute(t, o ? '' : Se(n) ? String(n) : n);
}
function sr(e, t, n, s, r) {
    if (t === 'innerHTML' || t === 'textContent') {
        n != null && (e[t] = t === 'innerHTML' ? vo(n) : n);
        return;
    }
    const o = e.tagName;
    if (t === 'value' && o !== 'PROGRESS' && !o.includes('-')) {
        const l = o === 'OPTION' ? e.getAttribute('value') || '' : e.value,
            c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
        ((l !== c || !('_value' in e)) && (e.value = c), n == null && e.removeAttribute(t), (e._value = n));
        return;
    }
    let i = !1;
    if (n === '' || n == null) {
        const l = typeof e[t];
        l === 'boolean' ? (n = xr(n)) : n == null && l === 'string' ? ((n = ''), (i = !0)) : l === 'number' && ((n = 0), (i = !0));
    }
    try {
        e[t] = n;
    } catch {}
    i && e.removeAttribute(r || t);
}
function Wl(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function zl(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
const rr = Symbol('_vei');
function ql(e, t, n, s, r = null) {
    const o = e[rr] || (e[rr] = {}),
        i = o[t];
    if (s && i) i.value = s;
    else {
        const [l, c] = Gl(t);
        if (s) {
            const d = (o[t] = Zl(s, r));
            Wl(e, l, d, c);
        } else i && (zl(e, l, i, c), (o[t] = void 0));
    }
}
const or = /(?:Once|Passive|Capture)$/;
function Gl(e) {
    let t;
    if (or.test(e)) {
        t = {};
        let s;
        for (; (s = e.match(or)); ) ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
    }
    return [e[2] === ':' ? e.slice(3) : ft(e.slice(2)), t];
}
let Jn = 0;
const kl = Promise.resolve(),
    Jl = () => Jn || (kl.then(() => (Jn = 0)), (Jn = Date.now()));
function Zl(e, t) {
    const n = (s) => {
        if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        De(Yl(s, n.value), t, 5, [s]);
    };
    return ((n.value = e), (n.attached = Jl()), n);
}
function Yl(e, t) {
    if (I(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                (n.call(e), (e._stopped = !0));
            }),
            t.map((s) => (r) => !r._stopped && s && s(r))
        );
    } else return t;
}
const ir = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    Xl = (e, t, n, s, r, o) => {
        const i = r === 'svg';
        t === 'class'
            ? Bl(e, s, i)
            : t === 'style'
              ? Vl(e, n, s)
              : Cn(t)
                ? cs(t) || ql(e, t, n, s, o)
                : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : Ql(e, t, s, i))
                  ? (sr(e, t, s),
                    !e.tagName.includes('-') && (t === 'value' || t === 'checked' || t === 'selected') && nr(e, t, s, i, o, t !== 'value'))
                  : e._isVueCE && (/[A-Z]/.test(t) || !Z(s))
                    ? sr(e, tt(t), s, o, t)
                    : (t === 'true-value' ? (e._trueValue = s) : t === 'false-value' && (e._falseValue = s), nr(e, t, s, i));
    };
function Ql(e, t, n, s) {
    if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && ir(t) && M(n)));
    if (
        t === 'spellcheck' ||
        t === 'draggable' ||
        t === 'translate' ||
        t === 'autocorrect' ||
        (t === 'sandbox' && e.tagName === 'IFRAME') ||
        t === 'form' ||
        (t === 'list' && e.tagName === 'INPUT') ||
        (t === 'type' && e.tagName === 'TEXTAREA')
    )
        return !1;
    if (t === 'width' || t === 'height') {
        const r = e.tagName;
        if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1;
    }
    return ir(t) && Z(n) ? !1 : t in e;
}
const ec = ee({ patchProp: Xl }, Nl);
let lr;
function xo() {
    return lr || (lr = gl(ec));
}
const tc = (...e) => {
        xo().render(...e);
    },
    nc = (...e) => {
        const t = xo().createApp(...e),
            { mount: n } = t;
        return (
            (t.mount = (s) => {
                const r = rc(s);
                if (!r) return;
                const o = t._component;
                (!M(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = ''));
                const i = n(r, !1, sc(r));
                return (r instanceof Element && (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')), i);
            }),
            t
        );
    };
function sc(e) {
    if (e instanceof SVGElement) return 'svg';
    if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
}
function rc(e) {
    return Z(e) ? document.querySelector(e) : e;
}
const oc = 'modulepreload',
    ic = function (e) {
        return '/' + e;
    },
    cr = {},
    ve = function (t, n, s) {
        let r = Promise.resolve();
        if (n && n.length > 0) {
            let d = function (u) {
                return Promise.all(
                    u.map((p) =>
                        Promise.resolve(p).then(
                            (v) => ({ status: 'fulfilled', value: v }),
                            (v) => ({ status: 'rejected', reason: v }),
                        ),
                    ),
                );
            };
            var i = d;
            document.getElementsByTagName('link');
            const l = document.querySelector('meta[property=csp-nonce]'),
                c = l?.nonce || l?.getAttribute('nonce');
            r = d(
                n.map((u) => {
                    if (((u = ic(u)), u in cr)) return;
                    cr[u] = !0;
                    const p = u.endsWith('.css'),
                        v = p ? '[rel="stylesheet"]' : '';
                    if (document.querySelector(`link[href="${u}"]${v}`)) return;
                    const _ = document.createElement('link');
                    if (
                        ((_.rel = p ? 'stylesheet' : oc),
                        p || (_.as = 'script'),
                        (_.crossOrigin = ''),
                        (_.href = u),
                        c && _.setAttribute('nonce', c),
                        document.head.appendChild(_),
                        p)
                    )
                        return new Promise((j, O) => {
                            (_.addEventListener('load', j), _.addEventListener('error', () => O(new Error(`Unable to preload CSS for ${u}`))));
                        });
                }),
            );
        }
        function o(l) {
            const c = new Event('vite:preloadError', { cancelable: !0 });
            if (((c.payload = l), window.dispatchEvent(c), !c.defaultPrevented)) throw l;
        }
        return r.then((l) => {
            for (const c of l || []) c.status === 'rejected' && o(c.reason);
            return t().catch(o);
        });
    },
    fr = (e, t) => {
        for (const n of Object.keys(t)) e.on(n, t[n]);
    },
    So = (e) => {
        for (const t of Object.keys(e)) {
            const n = e[t];
            n && Xe(n.cancel) && n.cancel();
        }
    },
    lc = (e) => (!e || typeof e.charAt != 'function' ? e : e.charAt(0).toUpperCase() + e.slice(1)),
    Xe = (e) => typeof e == 'function',
    dt = (e, t, n) => {
        for (const s in n) {
            const r = 'set' + lc(s);
            e[r]
                ? $t(
                      () => n[s],
                      (o, i) => {
                          e[r](o, i);
                      },
                  )
                : t[r] &&
                  $t(
                      () => n[s],
                      (o) => {
                          t[r](o);
                      },
                  );
        }
    },
    pt = (e, t, n = {}) => {
        const s = { ...n };
        for (const r in e) {
            const o = t[r],
                i = e[r];
            o && ((o && o.custom === !0) || (i !== void 0 && (s[r] = i)));
        }
        return s;
    },
    Ot = (e) => {
        const t = {},
            n = {};
        for (const s in e)
            if (s.startsWith('on') && !s.startsWith('onUpdate') && s !== 'onReady') {
                const r = s.slice(2).toLocaleLowerCase();
                t[r] = e[s];
            } else n[s] = e[s];
        return { listeners: t, attrs: n };
    },
    cc = async (e) => {
        const t = await Promise.all([
            ve(() => import('./marker-icon-2x-D4k_ikNW.js'), []),
            ve(() => import('./marker-icon-C2eJqgqv.js'), []),
            ve(() => import('./marker-shadow-DU6CIJ0p.js'), []),
        ]);
        (delete e.Default.prototype._getIconUrl,
            e.Default.mergeOptions({ iconRetinaUrl: t[0].default, iconUrl: t[1].default, shadowUrl: t[2].default }));
    },
    an = (e) => {
        const t = Y((...s) => console.warn(`Method ${e} has been invoked without being replaced`)),
            n = (...s) => t.value(...s);
        return ((n.wrapped = t), Me(e, n), n);
    },
    dn = (e, t) => (e.wrapped.value = t),
    Ue = (typeof self == 'object' && self.self === self && self) || (typeof global == 'object' && global.global === global && global) || globalThis,
    xe = (e) => {
        const t = _e(e);
        if (t === void 0) throw new Error(`Attempt to inject ${e.description} before it was provided.`);
        return t;
    },
    ht = Symbol('useGlobalLeaflet'),
    en = Symbol('addLayer'),
    wo = Symbol('removeLayer'),
    To = Symbol('registerControl'),
    fc = Symbol('registerLayerControl'),
    Co = Symbol('canSetParentHtml'),
    Oo = Symbol('setParentHtml'),
    Ao = Symbol('setIcon'),
    Po = Symbol('bindPopup'),
    uc = Symbol('bindTooltip'),
    Eo = Symbol('unbindPopup'),
    ac = Symbol('unbindTooltip'),
    tn = { options: { type: Object, default: () => ({}), custom: !0 } },
    nn = (e) => ({ options: e.options, methods: {} }),
    At = {
        ...tn,
        pane: { type: String },
        attribution: { type: String },
        name: { type: String, custom: !0 },
        layerType: { type: String, custom: !0 },
        visible: { type: Boolean, custom: !0, default: !0 },
    },
    Ro = (e, t, n) => {
        const s = xe(en),
            r = xe(wo),
            { options: o, methods: i } = nn(e),
            l = pt(e, At, o),
            c = () => s({ leafletObject: t.value }),
            d = () => r({ leafletObject: t.value }),
            u = {
                ...i,
                setAttribution(p) {
                    (d(), (t.value.options.attribution = p), e.visible && c());
                },
                setName() {
                    (d(), e.visible && c());
                },
                setLayerType() {
                    (d(), e.visible && c());
                },
                setVisible(p) {
                    t.value && (p ? c() : d());
                },
                bindPopup(p) {
                    if (!t.value || !Xe(t.value.bindPopup)) {
                        console.warn('Attempt to bind popup before bindPopup method available on layer.');
                        return;
                    }
                    t.value.bindPopup(p);
                },
                bindTooltip(p) {
                    if (!t.value || !Xe(t.value.bindTooltip)) {
                        console.warn('Attempt to bind tooltip before bindTooltip method available on layer.');
                        return;
                    }
                    t.value.bindTooltip(p);
                },
                unbindTooltip() {
                    t.value && (Xe(t.value.closeTooltip) && t.value.closeTooltip(), Xe(t.value.unbindTooltip) && t.value.unbindTooltip());
                },
                unbindPopup() {
                    t.value && (Xe(t.value.closePopup) && t.value.closePopup(), Xe(t.value.unbindPopup) && t.value.unbindPopup());
                },
                updateVisibleProp(p) {
                    n.emit('update:visible', p);
                },
            };
        return (
            Me(Po, u.bindPopup),
            Me(uc, u.bindTooltip),
            Me(Eo, u.unbindPopup),
            Me(ac, u.unbindTooltip),
            Xt(() => {
                (u.unbindPopup(), u.unbindTooltip(), d());
            }),
            { options: l, methods: u }
        );
    },
    dc = (e, t) => {
        if (e && t.default) return at('div', { style: { display: 'none' } }, t.default());
    },
    pc = { ...At, interactive: { type: Boolean, default: void 0 }, bubblingMouseEvents: { type: Boolean, default: void 0 } },
    Lo = {
        ...pc,
        stroke: { type: Boolean, default: void 0 },
        color: { type: String },
        weight: { type: Number },
        opacity: { type: Number },
        lineCap: { type: String },
        lineJoin: { type: String },
        dashArray: { type: String },
        dashOffset: { type: String },
        fill: { type: Boolean, default: void 0 },
        fillColor: { type: String },
        fillOpacity: { type: Number },
        fillRule: { type: String },
        className: { type: String },
    },
    hc = { ...Lo, radius: { type: Number }, latLng: { type: [Object, Array], required: !0, custom: !0 } };
({ ...hc });
const Pt = { ...tn, position: { type: String } },
    gc = (e, t) => {
        const { options: n, methods: s } = nn(e),
            r = pt(e, Pt, n),
            o = {
                ...s,
                setPosition(i) {
                    t.value && t.value.setPosition(i);
                },
            };
        return (
            Xt(() => {
                t.value && t.value.remove();
            }),
            { options: r, methods: o }
        );
    },
    mc = (e) => (e.default ? at('div', { ref: 'root' }, e.default()) : null);
({ ...Pt });
({ ...Pt });
({ ...Pt });
({ ...Pt });
({ ...Pt });
const Io = { ...At };
({ ...Io });
({ ...Io });
const Cs = {
        ...At,
        opacity: { type: Number },
        zIndex: { type: Number },
        tileSize: { type: [Number, Array, Object] },
        noWrap: { type: Boolean, default: void 0 },
        minZoom: { type: Number },
        maxZoom: { type: Number },
        className: { type: String },
    },
    Mo = (e, t, n) => {
        const { options: s, methods: r } = Ro(e, t, n),
            o = pt(e, Cs, s),
            i = {
                ...r,
                setTileComponent() {
                    var l;
                    (l = t.value) == null || l.redraw();
                },
            };
        return (
            Xt(() => {
                t.value.off();
            }),
            { options: o, methods: i }
        );
    },
    yc = (e, t, n, s) =>
        e.extend({
            initialize(r) {
                ((this.tileComponents = {}), this.on('tileunload', this._unloadTile), n.setOptions(this, r));
            },
            createTile(r) {
                const o = this._tileCoordsToKey(r);
                this.tileComponents[o] = t.create('div');
                const i = at({ setup: s, props: ['coords'] }, { coords: r });
                return (tc(i, this.tileComponents[o]), this.tileComponents[o]);
            },
            _unloadTile(r) {
                const o = this._tileCoordsToKey(r.coords);
                this.tileComponents[o] && ((this.tileComponents[o].innerHTML = ''), (this.tileComponents[o] = void 0));
            },
        });
({ ...Cs });
const ur = {
    iconUrl: { type: String },
    iconRetinaUrl: { type: String },
    iconSize: { type: [Object, Array] },
    iconAnchor: { type: [Object, Array] },
    popupAnchor: { type: [Object, Array] },
    tooltipAnchor: { type: [Object, Array] },
    shadowUrl: { type: String },
    shadowRetinaUrl: { type: String },
    shadowSize: { type: [Object, Array] },
    shadowAnchor: { type: [Object, Array] },
    bgPos: { type: [Object, Array] },
    className: { type: String },
};
({ ...ur, ...tn });
({ ...At });
function jo(e, t, n) {
    var s, r, o;
    (t === void 0 && (t = 50), n === void 0 && (n = {}));
    var i = (s = n.isImmediate) != null && s,
        l = (r = n.callback) != null && r,
        c = n.maxWait,
        d = Date.now(),
        u = [];
    function p() {
        if (c !== void 0) {
            var _ = Date.now() - d;
            if (_ + t >= c) return c - _;
        }
        return t;
    }
    var v = function () {
        var _ = [].slice.call(arguments),
            j = this;
        return new Promise(function (O, B) {
            var R = i && o === void 0;
            if (
                (o !== void 0 && clearTimeout(o),
                (o = setTimeout(function () {
                    if (((o = void 0), (d = Date.now()), !i)) {
                        var N = e.apply(j, _);
                        (l && l(N),
                            u.forEach(function (A) {
                                return (0, A.resolve)(N);
                            }),
                            (u = []));
                    }
                }, p())),
                R)
            ) {
                var E = e.apply(j, _);
                return (l && l(E), O(E));
            }
            u.push({ resolve: O, reject: B });
        });
    };
    return (
        (v.cancel = function (_) {
            (o !== void 0 && clearTimeout(o),
                u.forEach(function (j) {
                    return (0, j.reject)(_);
                }),
                (u = []));
        }),
        v
    );
}
const ar = {
        ...tn,
        center: { type: [Object, Array] },
        bounds: { type: [Array, Object] },
        maxBounds: { type: [Array, Object] },
        zoom: { type: Number },
        minZoom: { type: Number },
        maxZoom: { type: Number },
        paddingBottomRight: { type: [Object, Array] },
        paddingTopLeft: { type: Object },
        padding: { type: Object },
        worldCopyJump: { type: Boolean, default: void 0 },
        crs: { type: [String, Object] },
        maxBoundsViscosity: { type: Number },
        inertia: { type: Boolean, default: void 0 },
        inertiaDeceleration: { type: Number },
        inertiaMaxSpeed: { type: Number },
        easeLinearity: { type: Number },
        zoomAnimation: { type: Boolean, default: void 0 },
        zoomAnimationThreshold: { type: Number },
        fadeAnimation: { type: Boolean, default: void 0 },
        markerZoomAnimation: { type: Boolean, default: void 0 },
        noBlockingAnimations: { type: Boolean, default: void 0 },
        useGlobalLeaflet: { type: Boolean, default: !0, custom: !0 },
    },
    bc = Te({
        inheritAttrs: !1,
        emits: ['ready', 'update:zoom', 'update:center', 'update:bounds'],
        props: ar,
        setup(e, t) {
            const n = Y(),
                s = Ln({ ready: !1, layersToAdd: [], layersInControl: [] }),
                { options: r } = nn(e),
                o = pt(e, ar, r),
                { listeners: i, attrs: l } = Ot(t.attrs),
                c = an(en),
                d = an(wo),
                u = an(To),
                p = an(fc);
            Me(ht, e.useGlobalLeaflet);
            const v = Dt(() => {
                    const R = {};
                    return (e.noBlockingAnimations && (R.animate = !1), R);
                }),
                _ = Dt(() => {
                    const R = v.value;
                    return (
                        e.padding && (R.padding = e.padding),
                        e.paddingTopLeft && (R.paddingTopLeft = e.paddingTopLeft),
                        e.paddingBottomRight && (R.paddingBottomRight = e.paddingBottomRight),
                        R
                    );
                }),
                j = {
                    moveend: jo((R) => {
                        s.leafletRef &&
                            (t.emit('update:zoom', s.leafletRef.getZoom()),
                            t.emit('update:center', s.leafletRef.getCenter()),
                            t.emit('update:bounds', s.leafletRef.getBounds()));
                    }),
                    overlayadd(R) {
                        const E = s.layersInControl.find((N) => N.name === R.name);
                        E && E.updateVisibleProp(!0);
                    },
                    overlayremove(R) {
                        const E = s.layersInControl.find((N) => N.name === R.name);
                        E && E.updateVisibleProp(!1);
                    },
                };
            (ke(async () => {
                e.useGlobalLeaflet && (Ue.L = Ue.L || (await ve(() => import('./leaflet-src-BjTO0Wtd.js').then((D) => D.l), [])));
                const {
                    map: R,
                    CRS: E,
                    Icon: N,
                    latLngBounds: A,
                    latLng: k,
                    stamp: Q,
                } = e.useGlobalLeaflet ? Ue.L : await ve(() => import('./leaflet-src.esm-C210bVOb.js'), []);
                try {
                    o.beforeMapMount && (await o.beforeMapMount());
                } catch (D) {
                    console.error(`The following error occurred running the provided beforeMapMount hook ${D.message}`);
                }
                await cc(N);
                const me = typeof o.crs == 'string' ? E[o.crs] : o.crs;
                o.crs = me || E.EPSG3857;
                const le = {
                    addLayer(D) {
                        (D.layerType !== void 0 &&
                            (s.layerControl === void 0
                                ? s.layersToAdd.push(D)
                                : s.layersInControl.find((U) => Q(U.leafletObject) === Q(D.leafletObject)) ||
                                  (s.layerControl.addLayer(D), s.layersInControl.push(D))),
                            D.visible !== !1 && s.leafletRef.addLayer(D.leafletObject));
                    },
                    removeLayer(D) {
                        (D.layerType !== void 0 &&
                            (s.layerControl === void 0
                                ? (s.layersToAdd = s.layersToAdd.filter((U) => U.name !== D.name))
                                : (s.layerControl.removeLayer(D.leafletObject),
                                  (s.layersInControl = s.layersInControl.filter((U) => Q(U.leafletObject) !== Q(D.leafletObject))))),
                            s.leafletRef.removeLayer(D.leafletObject));
                    },
                    registerLayerControl(D) {
                        ((s.layerControl = D),
                            s.layersToAdd.forEach((U) => {
                                s.layerControl.addLayer(U);
                            }),
                            (s.layersToAdd = []),
                            u(D));
                    },
                    registerControl(D) {
                        s.leafletRef.addControl(D.leafletObject);
                    },
                    setZoom(D) {
                        const U = s.leafletRef.getZoom();
                        D !== U && s.leafletRef.setZoom(D, v.value);
                    },
                    setCrs(D) {
                        const U = s.leafletRef.getBounds();
                        ((s.leafletRef.options.crs = D), s.leafletRef.fitBounds(U, { animate: !1, padding: [0, 0] }));
                    },
                    fitBounds(D) {
                        s.leafletRef.fitBounds(D, _.value);
                    },
                    setBounds(D) {
                        if (!D) return;
                        const U = A(D);
                        U.isValid() &&
                            !(s.lastSetBounds || s.leafletRef.getBounds()).equals(U, 0) &&
                            ((s.lastSetBounds = U), s.leafletRef.fitBounds(U));
                    },
                    setCenter(D) {
                        if (D == null) return;
                        const U = k(D),
                            Je = s.lastSetCenter || s.leafletRef.getCenter();
                        (Je.lat !== U.lat || Je.lng !== U.lng) && ((s.lastSetCenter = U), s.leafletRef.panTo(U, v.value));
                    },
                };
                (dn(c, le.addLayer),
                    dn(d, le.removeLayer),
                    dn(u, le.registerControl),
                    dn(p, le.registerLayerControl),
                    (s.leafletRef = ut(R(n.value, o))),
                    dt(le, s.leafletRef, e),
                    fr(s.leafletRef, j),
                    fr(s.leafletRef, i),
                    (s.ready = !0),
                    ze(() => t.emit('ready', s.leafletRef)));
            }),
                jn(() => {
                    (So(j), s.leafletRef && (s.leafletRef.off(), s.leafletRef.remove()));
                }));
            const O = Dt(() => s.leafletRef),
                B = Dt(() => s.ready);
            return { root: n, ready: B, leafletObject: O, attrs: l };
        },
        render({ attrs: e }) {
            return (
                e.style || (e.style = {}),
                e.style.width || (e.style.width = '100%'),
                e.style.height || (e.style.height = '100%'),
                at('div', { ...e, ref: 'root' }, this.ready && this.$slots.default ? this.$slots.default() : {})
            );
        },
    }),
    _c = ['Symbol(Comment)', 'Symbol(Text)'],
    vc = ['LTooltip', 'LPopup'],
    Do = {
        ...At,
        draggable: { type: Boolean, default: void 0 },
        icon: { type: [Object] },
        zIndexOffset: { type: Number },
        latLng: { type: [Object, Array], custom: !0, required: !0 },
    },
    xc = (e, t, n) => {
        const { options: s, methods: r } = Ro(e, t, n),
            o = pt(e, Do, s),
            i = {
                ...r,
                setDraggable(l) {
                    t.value.dragging && (l ? t.value.dragging.enable() : t.value.dragging.disable());
                },
                latLngSync(l) {
                    (n.emit('update:latLng', l.latlng), n.emit('update:lat-lng', l.latlng));
                },
                setLatLng(l) {
                    if (l != null && t.value) {
                        const c = t.value.getLatLng();
                        (!c || !c.equals(l)) && t.value.setLatLng(l);
                    }
                },
            };
        return { options: o, methods: i };
    },
    Sc = (e, t) => {
        const n = t.slots.default && t.slots.default();
        return n && n.length && n.some(wc);
    };
function wc(e) {
    return !(_c.includes(e.type.toString()) || vc.includes(e.type.name));
}
const Tc = Te({
        name: 'LMarker',
        props: Do,
        setup(e, t) {
            const n = Y(),
                s = Y(!1),
                r = _e(ht),
                o = xe(en);
            (Me(Co, () => {
                var d;
                return !!((d = n.value) != null && d.getElement());
            }),
                Me(Oo, (d) => {
                    var u, p;
                    const v = Xe((u = n.value) == null ? void 0 : u.getElement) && ((p = n.value) == null ? void 0 : p.getElement());
                    v && (v.innerHTML = d);
                }),
                Me(Ao, (d) => {
                    var u;
                    return ((u = n.value) == null ? void 0 : u.setIcon) && n.value.setIcon(d);
                }));
            const { options: i, methods: l } = xc(e, n, t),
                c = { moveHandler: jo(l.latLngSync) };
            return (
                ke(async () => {
                    const { marker: d, divIcon: u } = r ? Ue.L : await ve(() => import('./leaflet-src.esm-C210bVOb.js'), []);
                    (Sc(i, t) && (i.icon = u({ className: '' })), (n.value = ut(d(e.latLng, i))));
                    const { listeners: p } = Ot(t.attrs);
                    (n.value.on(p),
                        n.value.on('move', c.moveHandler),
                        dt(l, n.value, e),
                        o({ ...e, ...l, leafletObject: n.value }),
                        (s.value = !0),
                        ze(() => t.emit('ready', n.value)));
                }),
                jn(() => So(c)),
                { ready: s, leafletObject: n }
            );
        },
        render() {
            return dc(this.ready, this.$slots);
        },
    }),
    Cc = { ...Lo, smoothFactor: { type: Number }, noClip: { type: Boolean, default: void 0 }, latLngs: { type: Array, required: !0, custom: !0 } },
    dr = { ...Cc },
    No = { ...tn, content: { type: String, default: null } },
    Oc = (e, t) => {
        const { options: n, methods: s } = nn(e),
            r = {
                ...s,
                setContent(o) {
                    t.value && o !== null && o !== void 0 && t.value.setContent(o);
                },
            };
        return { options: n, methods: r };
    },
    Ac = (e) => (e.default ? at('div', { ref: 'root' }, e.default()) : null),
    Pc = { ...No, latLng: { type: [Object, Array], default: () => [] } },
    Ec = (e, t) => {
        const { options: n, methods: s } = Oc(e, t);
        return { options: n, methods: s };
    },
    Rc = Te({
        name: 'LPopup',
        props: Pc,
        setup(e, t) {
            const n = Y(),
                s = Y(null),
                r = _e(ht),
                o = xe(Po),
                i = xe(Eo),
                { options: l, methods: c } = Ec(e, n);
            return (
                ke(async () => {
                    const { popup: d } = r ? Ue.L : await ve(() => import('./leaflet-src.esm-C210bVOb.js'), []);
                    ((n.value = ut(d(l))), e.latLng !== void 0 && n.value.setLatLng(e.latLng), dt(c, n.value, e));
                    const { listeners: u } = Ot(t.attrs);
                    (n.value.on(u), n.value.setContent(e.content || s.value || ''), o(n.value), ze(() => t.emit('ready', n.value)));
                }),
                jn(() => {
                    i();
                }),
                { root: s, leafletObject: n }
            );
        },
        render() {
            return Ac(this.$slots);
        },
    });
({ ...dr, latLngs: { ...dr.latLngs } });
const Os = {
        ...Cs,
        tms: { type: Boolean, default: void 0 },
        subdomains: {
            type: [String, Array],
            validator: (e) => (typeof e == 'string' ? !0 : Array.isArray(e) ? e.every((t) => typeof t == 'string') : !1),
        },
        detectRetina: { type: Boolean, default: void 0 },
        url: { type: String, required: !0, custom: !0 },
    },
    Lc = (e, t, n) => {
        const { options: s, methods: r } = Mo(e, t, n),
            o = pt(e, Os, s),
            i = { ...r };
        return { options: o, methods: i };
    },
    Ic = Te({
        props: Os,
        setup(e, t) {
            const n = Y(),
                s = _e(ht),
                r = xe(en),
                { options: o, methods: i } = Lc(e, n, t);
            return (
                ke(async () => {
                    const { tileLayer: l } = s ? Ue.L : await ve(() => import('./leaflet-src.esm-C210bVOb.js'), []);
                    n.value = ut(l(e.url, o));
                    const { listeners: c } = Ot(t.attrs);
                    (n.value.on(c), dt(i, n.value, e), r({ ...e, ...i, leafletObject: n.value }), ze(() => t.emit('ready', n.value)));
                }),
                { leafletObject: n }
            );
        },
        render() {
            return null;
        },
    });
({ ...No });
({ ...Os });
const pr = Y([]),
    pn = Y(!1);
function Mc() {
    return {
        data: pr,
        fetch: async () => {
            if (pn.value) return;
            pn.value = !0;
            const t = await Dc();
            ((pr.value = t.features.map(Nc)), (pn.value = !1));
        },
        isLoading: pn,
    };
}
const jc = '';
async function Dc() {
    return await (await fetch(jc + '/news')).json();
}
function Nc(e) {
    const t = [e.geometry.coordinates[1], e.geometry.coordinates[0]],
        r = [...new DOMParser().parseFromString(e.properties.html, 'text/html').body.querySelectorAll('a')].at(-1),
        o = r?.title,
        i = r?.href;
    return { location: e.properties.name, coordinates: t, title: o, url: i, imageUrl: e.properties.shareimage };
}
const Fc = { key: 0, class: 'loading-overlay flex fixed items-center justify-center' },
    Bc = Te({
        __name: 'LoadingOverlay',
        props: { visible: { type: Boolean } },
        setup(e) {
            const t = e;
            return (n, s) =>
                t.visible
                    ? (He(),
                      wn('div', Fc, [
                          s[0] || (s[0] = Le('label', { class: 'flex fixed text-white text-5xl' }, null, -1)),
                          Gi(n.$slots, 'default', {}, void 0),
                      ]))
                    : wl('', !0);
        },
    }),
    $c = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [s, r] of t) n[s] = r;
        return n;
    },
    Hc = $c(Bc, [['__scopeId', 'data-v-f8ed2fe6']]),
    Uc = { class: 'flex flex-col gap-2' },
    Vc = { class: 'text-nowrap font-semibold' },
    Kc = { class: 'italic font-normal' },
    Wc = { class: 'flex flex-col w-full max-h-10em gap-2 overflow-hidden' },
    zc = ['src', 'alt'],
    qc = ['href'],
    Gc = Te({
        __name: 'NewsMarkerContent',
        props: { location: {}, coordinates: {}, title: {}, url: {}, imageUrl: {} },
        setup(e) {
            const t = e;
            return (n, s) => (
                He(),
                wn('article', Uc, [
                    Le('h2', Vc, mt(t.location), 1),
                    Le('label', Kc, mt(t.coordinates[0]) + ', ' + mt(t.coordinates[1]), 1),
                    Le('figure', Wc, [
                        Le('img', { class: 'object-cover', src: t.imageUrl, alt: e.title, loading: 'lazy' }, null, 8, zc),
                        Le('label', null, mt(t.title), 1),
                    ]),
                    Le('a', { href: e.url, class: 'text-nowrap text-ellipsis overflow-hidden' }, mt(t.url), 9, qc),
                ])
            );
        },
    }),
    kc = Te({
        __name: 'NewsMarker',
        props: { location: {}, coordinates: {}, title: {}, url: {}, imageUrl: {} },
        setup(e) {
            const t = e;
            return (n, s) => (
                He(),
                Gt(
                    vt(Tc),
                    { 'lat-lng': t.coordinates },
                    { default: _n(() => [X(vt(Rc), null, { default: _n(() => [X(Gc, ko(mo(t)), null, 16)]), _: 1 })]), _: 1 },
                    8,
                    ['lat-lng'],
                )
            );
        },
    }),
    Jc = { style: { height: '100vh', width: '100vw' } },
    Zc = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    Yc = Te({
        __name: 'App',
        setup(e) {
            const { data: t, isLoading: n, fetch: s } = Mc(),
                r = Y(null),
                o = Y(5),
                i = Y([37, -97]),
                l = Y([]);
            function c() {
                const d = r.value?.leafletObject;
                if (d && t.value) {
                    const u = d.getBounds();
                    l.value = t.value.filter((p) => u.contains(p.coordinates));
                }
            }
            return (
                ke(async () => {
                    (await s(), c());
                }),
                (d, u) => (
                    He(),
                    wn(
                        de,
                        null,
                        [
                            Le('div', Jc, [
                                X(
                                    vt(bc),
                                    {
                                        ref_key: 'mapRef',
                                        ref: r,
                                        zoom: o.value,
                                        'onUpdate:zoom': u[0] || (u[0] = (p) => (o.value = p)),
                                        center: i.value,
                                        'use-global-leaflet': !1,
                                        options: { worldCopyJump: !0 },
                                        onMoveend: c,
                                    },
                                    {
                                        default: _n(() => [
                                            X(vt(Ic), { url: Zc, 'layer-type': 'base', name: 'OpenStreetMap' }),
                                            (He(!0),
                                            wn(
                                                de,
                                                null,
                                                qi(
                                                    l.value,
                                                    (p) => (He(), Gt(kc, yo({ key: p.url + p.coordinates.join() }, { ref_for: !0 }, p), null, 16)),
                                                ),
                                                128,
                                            )),
                                        ]),
                                        _: 1,
                                    },
                                    8,
                                    ['zoom', 'center'],
                                ),
                            ]),
                            X(Hc, { visible: vt(n) }, null, 8, ['visible']),
                        ],
                        64,
                    )
                )
            );
        },
    });
nc(Yc).mount('#app');

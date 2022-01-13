(() => {
  var t = {
      732: function (t) {
        t.exports = (function () {
          "use strict";
          function t() {
            return (
              (t =
                Object.assign ||
                function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var o in n)
                      Object.prototype.hasOwnProperty.call(n, o) &&
                        (t[o] = n[o]);
                  }
                  return t;
                }),
              t.apply(this, arguments)
            );
          }
          var e = "undefined" != typeof window,
            n =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            o = e && "IntersectionObserver" in window,
            r = e && "classList" in document.createElement("p"),
            i = e && window.devicePixelRatio > 1,
            a = {
              elements_selector: ".lazy",
              container: n || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
            },
            c = function (e) {
              return t({}, a, e);
            },
            s = function (t, e) {
              var n,
                o = "LazyLoad::Initialized",
                r = new t(e);
              try {
                n = new CustomEvent(o, { detail: { instance: r } });
              } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent(
                  o,
                  !1,
                  !1,
                  { instance: r }
                );
              }
              window.dispatchEvent(n);
            },
            l = "src",
            d = "srcset",
            u = "sizes",
            f = "poster",
            m = "llOriginalAttrs",
            h = "loading",
            v = "loaded",
            g = "applied",
            p = "error",
            _ = "native",
            b = "data-",
            E = "ll-status",
            y = function (t, e) {
              return t.getAttribute(b + e);
            },
            w = function (t) {
              return y(t, E);
            },
            L = function (t, e) {
              return (function (t, e, n) {
                var o = "data-ll-status";
                null !== n ? t.setAttribute(o, n) : t.removeAttribute(o);
              })(t, 0, e);
            },
            A = function (t) {
              return L(t, null);
            },
            I = function (t) {
              return null === w(t);
            },
            k = function (t) {
              return w(t) === _;
            },
            x = [h, v, g, p],
            C = function (t, e, n, o) {
              t &&
                (void 0 === o ? (void 0 === n ? t(e) : t(e, n)) : t(e, n, o));
            },
            O = function (t, e) {
              r
                ? t.classList.add(e)
                : (t.className += (t.className ? " " : "") + e);
            },
            S = function (t, e) {
              r
                ? t.classList.remove(e)
                : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            N = function (t) {
              return t.llTempImage;
            },
            T = function (t, e) {
              if (e) {
                var n = e._observer;
                n && n.unobserve(t);
              }
            },
            R = function (t, e) {
              t && (t.loadingCount += e);
            },
            M = function (t, e) {
              t && (t.toLoadCount = e);
            },
            W = function (t) {
              for (var e, n = [], o = 0; (e = t.children[o]); o += 1)
                "SOURCE" === e.tagName && n.push(e);
              return n;
            },
            q = function (t, e) {
              var n = t.parentNode;
              n && "PICTURE" === n.tagName && W(n).forEach(e);
            },
            P = function (t, e) {
              W(t).forEach(e);
            },
            $ = [l],
            j = [l, f],
            z = [l, d, u],
            D = function (t) {
              return !!t[m];
            },
            V = function (t) {
              return t[m];
            },
            G = function (t) {
              return delete t[m];
            },
            U = function (t, e) {
              if (!D(t)) {
                var n = {};
                e.forEach(function (e) {
                  n[e] = t.getAttribute(e);
                }),
                  (t[m] = n);
              }
            },
            F = function (t, e) {
              if (D(t)) {
                var n = V(t);
                e.forEach(function (e) {
                  !(function (t, e, n) {
                    n ? t.setAttribute(e, n) : t.removeAttribute(e);
                  })(t, e, n[e]);
                });
              }
            },
            H = function (t, e, n) {
              O(t, e.class_loading),
                L(t, h),
                n && (R(n, 1), C(e.callback_loading, t, n));
            },
            B = function (t, e, n) {
              n && t.setAttribute(e, n);
            },
            K = function (t, e) {
              B(t, u, y(t, e.data_sizes)),
                B(t, d, y(t, e.data_srcset)),
                B(t, l, y(t, e.data_src));
            },
            X = {
              IMG: function (t, e) {
                q(t, function (t) {
                  U(t, z), K(t, e);
                }),
                  U(t, z),
                  K(t, e);
              },
              IFRAME: function (t, e) {
                U(t, $), B(t, l, y(t, e.data_src));
              },
              VIDEO: function (t, e) {
                P(t, function (t) {
                  U(t, $), B(t, l, y(t, e.data_src));
                }),
                  U(t, j),
                  B(t, f, y(t, e.data_poster)),
                  B(t, l, y(t, e.data_src)),
                  t.load();
              },
            },
            Y = ["IMG", "IFRAME", "VIDEO"],
            J = function (t, e) {
              !e ||
                (function (t) {
                  return t.loadingCount > 0;
                })(e) ||
                (function (t) {
                  return t.toLoadCount > 0;
                })(e) ||
                C(t.callback_finish, e);
            },
            Q = function (t, e, n) {
              t.addEventListener(e, n), (t.llEvLisnrs[e] = n);
            },
            Z = function (t, e, n) {
              t.removeEventListener(e, n);
            },
            tt = function (t) {
              return !!t.llEvLisnrs;
            },
            et = function (t) {
              if (tt(t)) {
                var e = t.llEvLisnrs;
                for (var n in e) {
                  var o = e[n];
                  Z(t, n, o);
                }
                delete t.llEvLisnrs;
              }
            },
            nt = function (t, e, n) {
              !(function (t) {
                delete t.llTempImage;
              })(t),
                R(n, -1),
                (function (t) {
                  t && (t.toLoadCount -= 1);
                })(n),
                S(t, e.class_loading),
                e.unobserve_completed && T(t, n);
            },
            ot = function (t, e, n) {
              var o = N(t) || t;
              tt(o) ||
                (function (t, e, n) {
                  tt(t) || (t.llEvLisnrs = {});
                  var o = "VIDEO" === t.tagName ? "loadeddata" : "load";
                  Q(t, o, e), Q(t, "error", n);
                })(
                  o,
                  function (r) {
                    !(function (t, e, n, o) {
                      var r = k(e);
                      nt(e, n, o),
                        O(e, n.class_loaded),
                        L(e, v),
                        C(n.callback_loaded, e, o),
                        r || J(n, o);
                    })(0, t, e, n),
                      et(o);
                  },
                  function (r) {
                    !(function (t, e, n, o) {
                      var r = k(e);
                      nt(e, n, o),
                        O(e, n.class_error),
                        L(e, p),
                        C(n.callback_error, e, o),
                        r || J(n, o);
                    })(0, t, e, n),
                      et(o);
                  }
                );
            },
            rt = function (t, e, n) {
              !(function (t) {
                t.llTempImage = document.createElement("IMG");
              })(t),
                ot(t, e, n),
                (function (t) {
                  D(t) || (t[m] = { backgroundImage: t.style.backgroundImage });
                })(t),
                (function (t, e, n) {
                  var o = y(t, e.data_bg),
                    r = y(t, e.data_bg_hidpi),
                    a = i && r ? r : o;
                  a &&
                    ((t.style.backgroundImage = 'url("'.concat(a, '")')),
                    N(t).setAttribute(l, a),
                    H(t, e, n));
                })(t, e, n),
                (function (t, e, n) {
                  var o = y(t, e.data_bg_multi),
                    r = y(t, e.data_bg_multi_hidpi),
                    a = i && r ? r : o;
                  a &&
                    ((t.style.backgroundImage = a),
                    (function (t, e, n) {
                      O(t, e.class_applied),
                        L(t, g),
                        n &&
                          (e.unobserve_completed && T(t, e),
                          C(e.callback_applied, t, n));
                    })(t, e, n));
                })(t, e, n);
            },
            it = function (t, e, n) {
              !(function (t) {
                return Y.indexOf(t.tagName) > -1;
              })(t)
                ? rt(t, e, n)
                : (function (t, e, n) {
                    ot(t, e, n),
                      (function (t, e, n) {
                        var o = X[t.tagName];
                        o && (o(t, e), H(t, e, n));
                      })(t, e, n);
                  })(t, e, n);
            },
            at = function (t) {
              t.removeAttribute(l), t.removeAttribute(d), t.removeAttribute(u);
            },
            ct = function (t) {
              q(t, function (t) {
                F(t, z);
              }),
                F(t, z);
            },
            st = {
              IMG: ct,
              IFRAME: function (t) {
                F(t, $);
              },
              VIDEO: function (t) {
                P(t, function (t) {
                  F(t, $);
                }),
                  F(t, j),
                  t.load();
              },
            },
            lt = function (t, e) {
              (function (t) {
                var e = st[t.tagName];
                e
                  ? e(t)
                  : (function (t) {
                      if (D(t)) {
                        var e = V(t);
                        t.style.backgroundImage = e.backgroundImage;
                      }
                    })(t);
              })(t),
                (function (t, e) {
                  I(t) ||
                    k(t) ||
                    (S(t, e.class_entered),
                    S(t, e.class_exited),
                    S(t, e.class_applied),
                    S(t, e.class_loading),
                    S(t, e.class_loaded),
                    S(t, e.class_error));
                })(t, e),
                A(t),
                G(t);
            },
            dt = ["IMG", "IFRAME", "VIDEO"],
            ut = function (t) {
              return t.use_native && "loading" in HTMLImageElement.prototype;
            },
            ft = function (t, e, n) {
              t.forEach(function (t) {
                return (function (t) {
                  return t.isIntersecting || t.intersectionRatio > 0;
                })(t)
                  ? (function (t, e, n, o) {
                      var r = (function (t) {
                        return x.indexOf(w(t)) >= 0;
                      })(t);
                      L(t, "entered"),
                        O(t, n.class_entered),
                        S(t, n.class_exited),
                        (function (t, e, n) {
                          e.unobserve_entered && T(t, n);
                        })(t, n, o),
                        C(n.callback_enter, t, e, o),
                        r || it(t, n, o);
                    })(t.target, t, e, n)
                  : (function (t, e, n, o) {
                      I(t) ||
                        (O(t, n.class_exited),
                        (function (t, e, n, o) {
                          n.cancel_on_exit &&
                            (function (t) {
                              return w(t) === h;
                            })(t) &&
                            "IMG" === t.tagName &&
                            (et(t),
                            (function (t) {
                              q(t, function (t) {
                                at(t);
                              }),
                                at(t);
                            })(t),
                            ct(t),
                            S(t, n.class_loading),
                            R(o, -1),
                            A(t),
                            C(n.callback_cancel, t, e, o));
                        })(t, e, n, o),
                        C(n.callback_exit, t, e, o));
                    })(t.target, t, e, n);
              });
            },
            mt = function (t) {
              return Array.prototype.slice.call(t);
            },
            ht = function (t) {
              return t.container.querySelectorAll(t.elements_selector);
            },
            vt = function (t) {
              return (function (t) {
                return w(t) === p;
              })(t);
            },
            gt = function (t, e) {
              return (function (t) {
                return mt(t).filter(I);
              })(t || ht(e));
            },
            pt = function (t, n) {
              var r = c(t);
              (this._settings = r),
                (this.loadingCount = 0),
                (function (t, e) {
                  o &&
                    !ut(t) &&
                    (e._observer = new IntersectionObserver(
                      function (n) {
                        ft(n, t, e);
                      },
                      (function (t) {
                        return {
                          root: t.container === document ? null : t.container,
                          rootMargin: t.thresholds || t.threshold + "px",
                        };
                      })(t)
                    ));
                })(r, this),
                (function (t, n) {
                  e &&
                    window.addEventListener("online", function () {
                      !(function (t, e) {
                        var n;
                        ((n = ht(t)), mt(n).filter(vt)).forEach(function (e) {
                          S(e, t.class_error), A(e);
                        }),
                          e.update();
                      })(t, n);
                    });
                })(r, this),
                this.update(n);
            };
          return (
            (pt.prototype = {
              update: function (t) {
                var e,
                  r,
                  i = this._settings,
                  a = gt(t, i);
                M(this, a.length),
                  !n && o
                    ? ut(i)
                      ? (function (t, e, n) {
                          t.forEach(function (t) {
                            -1 !== dt.indexOf(t.tagName) &&
                              (function (t, e, n) {
                                t.setAttribute("loading", "lazy"),
                                  ot(t, e, n),
                                  (function (t, e) {
                                    var n = X[t.tagName];
                                    n && n(t, e);
                                  })(t, e),
                                  L(t, _);
                              })(t, e, n);
                          }),
                            M(n, 0);
                        })(a, i, this)
                      : ((r = a),
                        (function (t) {
                          t.disconnect();
                        })((e = this._observer)),
                        (function (t, e) {
                          e.forEach(function (e) {
                            t.observe(e);
                          });
                        })(e, r))
                    : this.loadAll(a);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  ht(this._settings).forEach(function (t) {
                    G(t);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (t) {
                var e = this,
                  n = this._settings;
                gt(t, n).forEach(function (t) {
                  T(t, e), it(t, n, e);
                });
              },
              restoreAll: function () {
                var t = this._settings;
                ht(t).forEach(function (e) {
                  lt(e, t);
                });
              },
            }),
            (pt.load = function (t, e) {
              var n = c(e);
              it(t, n);
            }),
            (pt.resetStatus = function (t) {
              A(t);
            }),
            e &&
              (function (t, e) {
                if (e)
                  if (e.length) for (var n, o = 0; (n = e[o]); o += 1) s(t, n);
                  else s(t, e);
              })(pt, window.lazyLoadOptions),
            pt
          );
        })();
      },
    },
    e = {};
  function n(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var i = (e[o] = { exports: {} });
    return t[o].call(i.exports, i, i.exports, n), i.exports;
  }
  (() => {
    "use strict";
    const t = {};
    let e = !0,
      o = (t = 500) => {
        let n = document.querySelector("body");
        if (e) {
          let o = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let t = 0; t < o.length; t++) {
              o[t].style.paddingRight = "0px";
            }
            (n.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, t),
            (e = !1),
            setTimeout(function () {
              e = !0;
            }, t);
        }
      },
      r = (t = 500) => {
        let n = document.querySelector("body");
        if (e) {
          let o = document.querySelectorAll("[data-lp]");
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight =
              window.innerWidth -
              document.querySelector(".site-wrapper").offsetWidth +
              "px";
          }
          (n.style.paddingRight =
            window.innerWidth -
            document.querySelector(".site-wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (e = !1),
            setTimeout(function () {
              e = !0;
            }, t);
        }
      };
    let i = document.querySelector(".icon-menu");
    function a(t) {
      return t.filter(function (t, e, n) {
        return n.indexOf(t) === e;
      });
    }
    new (n(732))({
      elements_selector: "[data-src],[data-srcset]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    t.watcher = new (class {
      constructor(t) {
        (this.config = Object.assign({ logging: !0 }, t)),
          this.observer,
          !document.documentElement.classList.contains("watcher") &&
            this.scrollWatcherRun();
      }
      scrollWatcherUpdate() {
        this.scrollWatcherRun();
      }
      scrollWatcherRun() {
        document.documentElement.classList.add("watcher"),
          this.scrollWatcherConstructor(
            document.querySelectorAll("[data-watch]")
          );
      }
      scrollWatcherConstructor(t) {
        if (t.length) {
          a(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let n = e.split("|"),
              o = { root: n[0], margin: n[1], threshold: n[2] },
              r = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  n = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  r = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === o.root &&
                  String(n) === o.margin &&
                  String(r) === o.threshold
                )
                  return t;
              }),
              i = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(r, i);
          });
        }
      }
      getScrollWatcherConfig(t) {
        let e = {};
        if (
          (document.querySelector(t.root) &&
            (e.root = document.querySelector(t.root)),
          (e.rootMargin = t.margin),
          !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
        ) {
          if ("prx" === t.threshold) {
            t.threshold = [];
            for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
          } else t.threshold = t.threshold.split(",");
          return (e.threshold = t.threshold), e;
        }
      }
      scrollWatcherCreate(t) {
        this.observer = new IntersectionObserver((t, e) => {
          t.forEach((t) => {
            this.scrollWatcherCallback(t, e);
          });
        }, t);
      }
      scrollWatcherInit(t, e) {
        this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
      }
      scrollWatcherIntersecting(t, e) {
        t.isIntersecting
          ? !e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view")
          : e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view");
      }
      scrollWatcherOff(t, e) {
        e.unobserve(t);
      }
      scrollWatcherCallback(t, e) {
        const n = t.target;
        this.scrollWatcherIntersecting(t, n),
          n.hasAttribute("data-watch-once") &&
            t.isIntersecting &&
            this.scrollWatcherOff(n, e),
          document.dispatchEvent(
            new CustomEvent("watcherCallback", { detail: { entry: t } })
          );
      }
    })({});
    let c = !1;
    var s;
    setTimeout(() => {
      if (c) {
        let t = new Event("windowScroll");
        window.addEventListener("scroll", function (e) {
          document.dispatchEvent(t);
        });
      }
    }, 0),
      (s = function () {
        function t(t) {
          var e = !0,
            n = !1,
            o = null,
            r = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function i(t) {
            return !!(
              t &&
              t !== document &&
              "HTML" !== t.nodeName &&
              "BODY" !== t.nodeName &&
              "classList" in t &&
              "contains" in t.classList
            );
          }
          function a(t) {
            t.classList.contains("focus-visible") ||
              (t.classList.add("focus-visible"),
              t.setAttribute("data-focus-visible-added", ""));
          }
          function c(t) {
            e = !1;
          }
          function s() {
            document.addEventListener("mousemove", l),
              document.addEventListener("mousedown", l),
              document.addEventListener("mouseup", l),
              document.addEventListener("pointermove", l),
              document.addEventListener("pointerdown", l),
              document.addEventListener("pointerup", l),
              document.addEventListener("touchmove", l),
              document.addEventListener("touchstart", l),
              document.addEventListener("touchend", l);
          }
          function l(t) {
            (t.target.nodeName && "html" === t.target.nodeName.toLowerCase()) ||
              ((e = !1),
              document.removeEventListener("mousemove", l),
              document.removeEventListener("mousedown", l),
              document.removeEventListener("mouseup", l),
              document.removeEventListener("pointermove", l),
              document.removeEventListener("pointerdown", l),
              document.removeEventListener("pointerup", l),
              document.removeEventListener("touchmove", l),
              document.removeEventListener("touchstart", l),
              document.removeEventListener("touchend", l));
          }
          document.addEventListener(
            "keydown",
            function (n) {
              n.metaKey ||
                n.altKey ||
                n.ctrlKey ||
                (i(t.activeElement) && a(t.activeElement), (e = !0));
            },
            !0
          ),
            document.addEventListener("mousedown", c, !0),
            document.addEventListener("pointerdown", c, !0),
            document.addEventListener("touchstart", c, !0),
            document.addEventListener(
              "visibilitychange",
              function (t) {
                "hidden" === document.visibilityState && (n && (e = !0), s());
              },
              !0
            ),
            s(),
            t.addEventListener(
              "focus",
              function (t) {
                var n, o, c;
                i(t.target) &&
                  (e ||
                    ((o = (n = t.target).type),
                    ("INPUT" === (c = n.tagName) && r[o] && !n.readOnly) ||
                      ("TEXTAREA" === c && !n.readOnly) ||
                      n.isContentEditable)) &&
                  a(t.target);
              },
              !0
            ),
            t.addEventListener(
              "blur",
              function (t) {
                var e;
                i(t.target) &&
                  (t.target.classList.contains("focus-visible") ||
                    t.target.hasAttribute("data-focus-visible-added")) &&
                  ((n = !0),
                  window.clearTimeout(o),
                  (o = window.setTimeout(function () {
                    n = !1;
                  }, 100)),
                  (e = t.target).hasAttribute("data-focus-visible-added") &&
                    (e.classList.remove("focus-visible"),
                    e.removeAttribute("data-focus-visible-added")));
              },
              !0
            ),
            t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host
              ? t.host.setAttribute("data-js-focus-visible", "")
              : t.nodeType === Node.DOCUMENT_NODE &&
                (document.documentElement.classList.add("js-focus-visible"),
                document.documentElement.setAttribute(
                  "data-js-focus-visible",
                  ""
                ));
        }
        if ("undefined" != typeof window && "undefined" != typeof document) {
          var e;
          window.applyFocusVisiblePolyfill = t;
          try {
            e = new CustomEvent("focus-visible-polyfill-ready");
          } catch (t) {
            (e = document.createEvent("CustomEvent")).initCustomEvent(
              "focus-visible-polyfill-ready",
              !1,
              !1,
              {}
            );
          }
          window.dispatchEvent(e);
        }
        "undefined" != typeof document && t(document);
      }),
      "object" == typeof exports && "undefined" != typeof module
        ? s()
        : "function" == typeof define && define.amd
        ? define(s)
        : s();
    const l = getComputedStyle(document.documentElement),
      d = l.getPropertyValue("--menu-breakpoint"),
      u = l.getPropertyValue("--transition-duration"),
      f = l.getPropertyValue("--transition-function");
    new ResizeObserver((t) => {
      const e = Math.floor(t[0].contentRect.width),
        n = document.querySelector(".menu__body");
      n.style.removeProperty("transition"),
        e <= d &&
          (n.style.removeProperty("transition"),
          setTimeout(() => {
            n.style.setProperty("transition", `transform ${u}ms ${f}`);
          }, u));
    }).observe(document.body);
    const m = (t) => {
        const e = document.querySelector(".inventory__cards-wrapper"),
          n = document.createElement("div");
        n.classList = "inventory__cards container";
        const o = (t, e) => {
            const { id: n, img: o, title: r, price: i } = e;
            let a = `\n         <article class="inventory__card card">\n            <header class="card__header">\n               <a class="card__link" href="#">\n                  <img class="card__img" src="${o}" alt="${r}">\n               </a>\n               <a class="card__shopping" href="cart.html">\n                  <img aria-hidden="true" src="img/icons/cart.svg" alt="Перейти в корзину">\n               </a>\n               <button class="card__button btn-reset button-style">\n                  В корзину\n               </button>\n            </header>\n            <div class="card__body">\n               <h3 class="card__title m-0">\n                  ${r}\n               </h3>\n            </div>\n            <footer class="card__footer">\n               <strong class="card__price">\n                  ${i}\n               </strong>\n      `;
            e.hasOwnProperty("discount")
              ? (a += `\n                  <s class="card__discount">\n                     ${e.discount}\n                  </s>\n               </footer>\n            </article>\n         `)
              : (a +=
                  "\n               </footer>\n            </article>\n         "),
              t.insertAdjacentHTML("beforeend", a);
          },
          r = (r) => {
            const i = r[t],
              a = i.limit,
              c = i.cards,
              s = c.length;
            for (let t = 0; t < Math.min(s, a); ++t) o(n, c[t]);
            ((e, o) => {
              e > o &&
                n.insertAdjacentHTML(
                  "beforeend",
                  `\n               <button class="inventory__load-more btn-reset" data-load="${t}">\n                  загрузить ещё\n               </button>\n               `
                );
            })(s, a),
              e.append(n),
              ((t, e, r) => {
                const i = n.querySelector(".inventory__load-more");
                if (i) {
                  const n = i.parentElement;
                  i.addEventListener("click", (a) => {
                    for (let i = e; i < r; ++i) o(n, t[i]);
                    n.removeChild(i);
                  });
                }
              })(c, a, s);
          };
        fetch("resources/inventory.json")
          .then((t) => t.json())
          .then((t) => {
            r(t);
          })
          .catch((t) => {
            console.log(t);
          });
      },
      h = document.querySelector(".inventory__taglist"),
      v = document.querySelectorAll(".inventory__tag");
    h?.addEventListener("click", (t) => {
      const e = t.target;
      e &&
        e.classList.contains("inventory__tag") &&
        (e.hasAttribute("aria-checked")
          ? e.removeAttribute("aria-checked")
          : e.setAttribute("aria-checked", "true"));
    }),
      v?.forEach((t) => {
        const e = t.getAttribute("data-tagname");
        !!t.getAttribute("aria-checked") && e && m(e);
      }),
      (window.FLS = !0),
      (function (t) {
        let e = new Image();
        (e.onload = e.onerror =
          function () {
            t(2 == e.height);
          }),
          (e.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (t) {
        let e = !0 === t ? "webp" : "no-webp";
        document.documentElement.classList.add(e);
      }),
      i &&
        i.addEventListener("click", function (t) {
          e &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock")
                ? (o(t), i.setAttribute("aria-expanded", "false"))
                : (r(t), i.setAttribute("aria-expanded", "true"));
            })(),
            document.documentElement.classList.toggle("menu-open"));
        }),
      (function () {
        if (document.querySelectorAll("[data-fullscreen]").length) {
          function t() {
            let t = 0.01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", `${t}px`);
          }
          window.addEventListener("resize", t), t();
        }
      })();
  })();
})();

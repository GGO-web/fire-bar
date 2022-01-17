(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let n = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = n + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    n = (e, n = 500) => (e.hidden ? s(e, n) : t(e, n)),
    i = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock")
        ? (o(e), l.setAttribute("aria-expanded", "false"))
        : (a(e), l.setAttribute("aria-expanded", "true"));
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".site-wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".site-wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  let l = document.querySelector(".icon-menu");
  function c(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  e.popup = new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          i &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        n = s.indexOf(document.activeElement);
      e.shiftKey && 0 === n && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || n !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e.length && e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && c(`[Попапос]: ${e}`);
    }
  })({});
  let d = (e, t = !1, s = 500, n = 0) => {
    const i = e instanceof HTMLElement ? e : document.querySelector(e);
    if (i) {
      let r = "",
        a = 0;
      t &&
        ((r = "header.header"), (a = document.querySelector(r).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: s,
        header: r,
        offset: n,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(),
          l.setAttribute("aria-expanded", "false"),
          document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(i, "", d);
      else {
        let e = i.getBoundingClientRect().top + scrollY;
        (e = a ? e - a : e),
          (e = n ? e - n : e),
          window.scrollTo({ top: e, behavior: "smooth" });
      }
      c(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else c(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  function p(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function u(e) {
    return e instanceof p(e).Element || e instanceof Element;
  }
  function f(e) {
    return e instanceof p(e).HTMLElement || e instanceof HTMLElement;
  }
  function h(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof p(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var m = Math.max,
    g = Math.min,
    v = Math.round;
  function b(e, t) {
    void 0 === t && (t = !1);
    var s = e.getBoundingClientRect(),
      n = 1,
      i = 1;
    if (f(e) && t) {
      var r = e.offsetHeight,
        o = e.offsetWidth;
      o > 0 && (n = v(s.width) / o || 1), r > 0 && (i = v(s.height) / r || 1);
    }
    return {
      width: s.width / n,
      height: s.height / i,
      top: s.top / i,
      right: s.right / n,
      bottom: s.bottom / i,
      left: s.left / n,
      x: s.left / n,
      y: s.top / i,
    };
  }
  function y(e) {
    var t = p(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function w(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function S(e) {
    return ((u(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function C(e) {
    return b(S(e)).left + y(e).scrollLeft;
  }
  function E(e) {
    return p(e).getComputedStyle(e);
  }
  function x(e) {
    var t = E(e),
      s = t.overflow,
      n = t.overflowX,
      i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(s + i + n);
  }
  function T(e, t, s) {
    void 0 === s && (s = !1);
    var n,
      i,
      r = f(t),
      o =
        f(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            s = v(t.width) / e.offsetWidth || 1,
            n = v(t.height) / e.offsetHeight || 1;
          return 1 !== s || 1 !== n;
        })(t),
      a = S(t),
      l = b(e, o),
      c = { scrollLeft: 0, scrollTop: 0 },
      d = { x: 0, y: 0 };
    return (
      (r || (!r && !s)) &&
        (("body" !== w(t) || x(a)) &&
          (c =
            (n = t) !== p(n) && f(n)
              ? { scrollLeft: (i = n).scrollLeft, scrollTop: i.scrollTop }
              : y(n)),
        f(t)
          ? (((d = b(t, !0)).x += t.clientLeft), (d.y += t.clientTop))
          : a && (d.x = C(a))),
      {
        x: l.left + c.scrollLeft - d.x,
        y: l.top + c.scrollTop - d.y,
        width: l.width,
        height: l.height,
      }
    );
  }
  function O(e) {
    var t = b(e),
      s = e.offsetWidth,
      n = e.offsetHeight;
    return (
      Math.abs(t.width - s) <= 1 && (s = t.width),
      Math.abs(t.height - n) <= 1 && (n = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: s, height: n }
    );
  }
  function A(e) {
    return "html" === w(e)
      ? e
      : e.assignedSlot || e.parentNode || (h(e) ? e.host : null) || S(e);
  }
  function L(e) {
    return ["html", "body", "#document"].indexOf(w(e)) >= 0
      ? e.ownerDocument.body
      : f(e) && x(e)
      ? e
      : L(A(e));
  }
  function $(e, t) {
    var s;
    void 0 === t && (t = []);
    var n = L(e),
      i = n === (null == (s = e.ownerDocument) ? void 0 : s.body),
      r = p(n),
      o = i ? [r].concat(r.visualViewport || [], x(n) ? n : []) : n,
      a = t.concat(o);
    return i ? a : a.concat($(A(o)));
  }
  function k(e) {
    return ["table", "td", "th"].indexOf(w(e)) >= 0;
  }
  function P(e) {
    return f(e) && "fixed" !== E(e).position ? e.offsetParent : null;
  }
  function _(e) {
    for (var t = p(e), s = P(e); s && k(s) && "static" === E(s).position; )
      s = P(s);
    return s &&
      ("html" === w(s) || ("body" === w(s) && "static" === E(s).position))
      ? t
      : s ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              f(e) &&
              "fixed" === E(e).position
            )
              return null;
            for (var s = A(e); f(s) && ["html", "body"].indexOf(w(s)) < 0; ) {
              var n = E(s);
              if (
                "none" !== n.transform ||
                "none" !== n.perspective ||
                "paint" === n.contain ||
                -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                (t && "filter" === n.willChange) ||
                (t && n.filter && "none" !== n.filter)
              )
                return s;
              s = s.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var M = "top",
    D = "bottom",
    I = "right",
    B = "left",
    j = "auto",
    q = [M, D, I, B],
    z = "start",
    N = "end",
    H = "viewport",
    V = "popper",
    G = q.reduce(function (e, t) {
      return e.concat([t + "-" + z, t + "-" + N]);
    }, []),
    F = [].concat(q, [j]).reduce(function (e, t) {
      return e.concat([t, t + "-" + z, t + "-" + N]);
    }, []),
    R = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function W(e) {
    var t = new Map(),
      s = new Set(),
      n = [];
    function i(e) {
      s.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!s.has(e)) {
              var n = t.get(e);
              n && i(n);
            }
          }),
        n.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        s.has(e.name) || i(e);
      }),
      n
    );
  }
  var Y = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function X() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
      t[s] = arguments[s];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function U(e) {
    void 0 === e && (e = {});
    var t = e,
      s = t.defaultModifiers,
      n = void 0 === s ? [] : s,
      i = t.defaultOptions,
      r = void 0 === i ? Y : i;
    return function (e, t, s) {
      void 0 === s && (s = r);
      var i,
        o,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Y, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        d = {
          state: a,
          setOptions: function (s) {
            var i = "function" == typeof s ? s(a.options) : s;
            p(),
              (a.options = Object.assign({}, r, a.options, i)),
              (a.scrollParents = {
                reference: u(e)
                  ? $(e)
                  : e.contextElement
                  ? $(e.contextElement)
                  : [],
                popper: $(t),
              });
            var o = (function (e) {
              var t = W(e);
              return R.reduce(function (e, s) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === s;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var s = e[t.name];
                  return (
                    (e[t.name] = s
                      ? Object.assign({}, s, t, {
                          options: Object.assign({}, s.options, t.options),
                          data: Object.assign({}, s.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(n, a.options.modifiers))
            );
            return (
              (a.orderedModifiers = o.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  s = e.options,
                  n = void 0 === s ? {} : s,
                  i = e.effect;
                if ("function" == typeof i) {
                  var r = i({ state: a, name: t, instance: d, options: n }),
                    o = function () {};
                  l.push(r || o);
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = a.elements,
                t = e.reference,
                s = e.popper;
              if (X(t, s)) {
                (a.rects = {
                  reference: T(t, _(s), "fixed" === a.options.strategy),
                  popper: O(s),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var n = 0; n < a.orderedModifiers.length; n++)
                  if (!0 !== a.reset) {
                    var i = a.orderedModifiers[n],
                      r = i.fn,
                      o = i.options,
                      l = void 0 === o ? {} : o,
                      p = i.name;
                    "function" == typeof r &&
                      (a =
                        r({ state: a, options: l, name: p, instance: d }) || a);
                  } else (a.reset = !1), (n = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                d.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                o ||
                  (o = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (o = void 0), e(i());
                    });
                  })),
                o
              );
            }),
          destroy: function () {
            p(), (c = !0);
          },
        };
      if (!X(e, t)) return d;
      function p() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        d.setOptions(s).then(function (e) {
          !c && s.onFirstUpdate && s.onFirstUpdate(e);
        }),
        d
      );
    };
  }
  var K = { passive: !0 };
  const Q = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var t = e.state,
        s = e.instance,
        n = e.options,
        i = n.scroll,
        r = void 0 === i || i,
        o = n.resize,
        a = void 0 === o || o,
        l = p(t.elements.popper),
        c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        r &&
          c.forEach(function (e) {
            e.addEventListener("scroll", s.update, K);
          }),
        a && l.addEventListener("resize", s.update, K),
        function () {
          r &&
            c.forEach(function (e) {
              e.removeEventListener("scroll", s.update, K);
            }),
            a && l.removeEventListener("resize", s.update, K);
        }
      );
    },
    data: {},
  };
  function Z(e) {
    return e.split("-")[0];
  }
  function J(e) {
    return e.split("-")[1];
  }
  function ee(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function te(e) {
    var t,
      s = e.reference,
      n = e.element,
      i = e.placement,
      r = i ? Z(i) : null,
      o = i ? J(i) : null,
      a = s.x + s.width / 2 - n.width / 2,
      l = s.y + s.height / 2 - n.height / 2;
    switch (r) {
      case M:
        t = { x: a, y: s.y - n.height };
        break;
      case D:
        t = { x: a, y: s.y + s.height };
        break;
      case I:
        t = { x: s.x + s.width, y: l };
        break;
      case B:
        t = { x: s.x - n.width, y: l };
        break;
      default:
        t = { x: s.x, y: s.y };
    }
    var c = r ? ee(r) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (o) {
        case z:
          t[c] = t[c] - (s[d] / 2 - n[d] / 2);
          break;
        case N:
          t[c] = t[c] + (s[d] / 2 - n[d] / 2);
      }
    }
    return t;
  }
  var se = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function ne(e) {
    var t,
      s = e.popper,
      n = e.popperRect,
      i = e.placement,
      r = e.variation,
      o = e.offsets,
      a = e.position,
      l = e.gpuAcceleration,
      c = e.adaptive,
      d = e.roundOffsets,
      u = e.isFixed,
      f =
        !0 === d
          ? (function (e) {
              var t = e.x,
                s = e.y,
                n = window.devicePixelRatio || 1;
              return { x: v(t * n) / n || 0, y: v(s * n) / n || 0 };
            })(o)
          : "function" == typeof d
          ? d(o)
          : o,
      h = f.x,
      m = void 0 === h ? 0 : h,
      g = f.y,
      b = void 0 === g ? 0 : g,
      y = o.hasOwnProperty("x"),
      w = o.hasOwnProperty("y"),
      C = B,
      x = M,
      T = window;
    if (c) {
      var O = _(s),
        A = "clientHeight",
        L = "clientWidth";
      if (
        (O === p(s) &&
          "static" !== E((O = S(s))).position &&
          "absolute" === a &&
          ((A = "scrollHeight"), (L = "scrollWidth")),
        (O = O),
        i === M || ((i === B || i === I) && r === N))
      )
        (x = D),
          (b -=
            (u && T.visualViewport ? T.visualViewport.height : O[A]) -
            n.height),
          (b *= l ? 1 : -1);
      if (i === B || ((i === M || i === D) && r === N))
        (C = I),
          (m -=
            (u && T.visualViewport ? T.visualViewport.width : O[L]) - n.width),
          (m *= l ? 1 : -1);
    }
    var $,
      k = Object.assign({ position: a }, c && se);
    return l
      ? Object.assign(
          {},
          k,
          ((($ = {})[x] = w ? "0" : ""),
          ($[C] = y ? "0" : ""),
          ($.transform =
            (T.devicePixelRatio || 1) <= 1
              ? "translate(" + m + "px, " + b + "px)"
              : "translate3d(" + m + "px, " + b + "px, 0)"),
          $)
        )
      : Object.assign(
          {},
          k,
          (((t = {})[x] = w ? b + "px" : ""),
          (t[C] = y ? m + "px" : ""),
          (t.transform = ""),
          t)
        );
  }
  const ie = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var s = t.styles[e] || {},
          n = t.attributes[e] || {},
          i = t.elements[e];
        f(i) &&
          w(i) &&
          (Object.assign(i.style, s),
          Object.keys(n).forEach(function (e) {
            var t = n[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        s = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, s.popper),
        (t.styles = s),
        t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var n = t.elements[e],
              i = t.attributes[e] || {},
              r = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : s[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            f(n) &&
              w(n) &&
              (Object.assign(n.style, r),
              Object.keys(i).forEach(function (e) {
                n.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const re = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        s = e.options,
        n = e.name,
        i = s.offset,
        r = void 0 === i ? [0, 0] : i,
        o = F.reduce(function (e, s) {
          return (
            (e[s] = (function (e, t, s) {
              var n = Z(e),
                i = [B, M].indexOf(n) >= 0 ? -1 : 1,
                r =
                  "function" == typeof s
                    ? s(Object.assign({}, t, { placement: e }))
                    : s,
                o = r[0],
                a = r[1];
              return (
                (o = o || 0),
                (a = (a || 0) * i),
                [B, I].indexOf(n) >= 0 ? { x: a, y: o } : { x: o, y: a }
              );
            })(s, t.rects, r)),
            e
          );
        }, {}),
        a = o[t.placement],
        l = a.x,
        c = a.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[n] = o);
    },
  };
  var oe = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ae(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return oe[e];
    });
  }
  var le = { start: "end", end: "start" };
  function ce(e) {
    return e.replace(/start|end/g, function (e) {
      return le[e];
    });
  }
  function de(e, t) {
    var s = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (s && h(s)) {
      var n = t;
      do {
        if (n && e.isSameNode(n)) return !0;
        n = n.parentNode || n.host;
      } while (n);
    }
    return !1;
  }
  function pe(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function ue(e, t) {
    return t === H
      ? pe(
          (function (e) {
            var t = p(e),
              s = S(e),
              n = t.visualViewport,
              i = s.clientWidth,
              r = s.clientHeight,
              o = 0,
              a = 0;
            return (
              n &&
                ((i = n.width),
                (r = n.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((o = n.offsetLeft), (a = n.offsetTop))),
              { width: i, height: r, x: o + C(e), y: a }
            );
          })(e)
        )
      : u(t)
      ? (function (e) {
          var t = b(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : pe(
          (function (e) {
            var t,
              s = S(e),
              n = y(e),
              i = null == (t = e.ownerDocument) ? void 0 : t.body,
              r = m(
                s.scrollWidth,
                s.clientWidth,
                i ? i.scrollWidth : 0,
                i ? i.clientWidth : 0
              ),
              o = m(
                s.scrollHeight,
                s.clientHeight,
                i ? i.scrollHeight : 0,
                i ? i.clientHeight : 0
              ),
              a = -n.scrollLeft + C(e),
              l = -n.scrollTop;
            return (
              "rtl" === E(i || s).direction &&
                (a += m(s.clientWidth, i ? i.clientWidth : 0) - r),
              { width: r, height: o, x: a, y: l }
            );
          })(S(e))
        );
  }
  function fe(e, t, s) {
    var n =
        "clippingParents" === t
          ? (function (e) {
              var t = $(A(e)),
                s = ["absolute", "fixed"].indexOf(E(e).position) >= 0,
                n = s && f(e) ? _(e) : e;
              return u(n)
                ? t.filter(function (e) {
                    return (
                      u(e) &&
                      de(e, n) &&
                      "body" !== w(e) &&
                      (!s || "static" !== E(e).position)
                    );
                  })
                : [];
            })(e)
          : [].concat(t),
      i = [].concat(n, [s]),
      r = i[0],
      o = i.reduce(function (t, s) {
        var n = ue(e, s);
        return (
          (t.top = m(n.top, t.top)),
          (t.right = g(n.right, t.right)),
          (t.bottom = g(n.bottom, t.bottom)),
          (t.left = m(n.left, t.left)),
          t
        );
      }, ue(e, r));
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function he(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function me(e, t) {
    return t.reduce(function (t, s) {
      return (t[s] = e), t;
    }, {});
  }
  function ge(e, t) {
    void 0 === t && (t = {});
    var s = t,
      n = s.placement,
      i = void 0 === n ? e.placement : n,
      r = s.boundary,
      o = void 0 === r ? "clippingParents" : r,
      a = s.rootBoundary,
      l = void 0 === a ? H : a,
      c = s.elementContext,
      d = void 0 === c ? V : c,
      p = s.altBoundary,
      f = void 0 !== p && p,
      h = s.padding,
      m = void 0 === h ? 0 : h,
      g = he("number" != typeof m ? m : me(m, q)),
      v = d === V ? "reference" : V,
      y = e.rects.popper,
      w = e.elements[f ? v : d],
      C = fe(u(w) ? w : w.contextElement || S(e.elements.popper), o, l),
      E = b(e.elements.reference),
      x = te({ reference: E, element: y, strategy: "absolute", placement: i }),
      T = pe(Object.assign({}, y, x)),
      O = d === V ? T : E,
      A = {
        top: C.top - O.top + g.top,
        bottom: O.bottom - C.bottom + g.bottom,
        left: C.left - O.left + g.left,
        right: O.right - C.right + g.right,
      },
      L = e.modifiersData.offset;
    if (d === V && L) {
      var $ = L[i];
      Object.keys(A).forEach(function (e) {
        var t = [I, D].indexOf(e) >= 0 ? 1 : -1,
          s = [M, D].indexOf(e) >= 0 ? "y" : "x";
        A[e] += $[s] * t;
      });
    }
    return A;
  }
  function ve(e, t, s) {
    return m(e, g(t, s));
  }
  const be = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        s = e.options,
        n = e.name,
        i = s.mainAxis,
        r = void 0 === i || i,
        o = s.altAxis,
        a = void 0 !== o && o,
        l = s.boundary,
        c = s.rootBoundary,
        d = s.altBoundary,
        p = s.padding,
        u = s.tether,
        f = void 0 === u || u,
        h = s.tetherOffset,
        v = void 0 === h ? 0 : h,
        b = ge(t, { boundary: l, rootBoundary: c, padding: p, altBoundary: d }),
        y = Z(t.placement),
        w = J(t.placement),
        S = !w,
        C = ee(y),
        E = "x" === C ? "y" : "x",
        x = t.modifiersData.popperOffsets,
        T = t.rects.reference,
        A = t.rects.popper,
        L =
          "function" == typeof v
            ? v(Object.assign({}, t.rects, { placement: t.placement }))
            : v,
        $ =
          "number" == typeof L
            ? { mainAxis: L, altAxis: L }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, L),
        k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        P = { x: 0, y: 0 };
      if (x) {
        if (r) {
          var j,
            q = "y" === C ? M : B,
            N = "y" === C ? D : I,
            H = "y" === C ? "height" : "width",
            V = x[C],
            G = V + b[q],
            F = V - b[N],
            R = f ? -A[H] / 2 : 0,
            W = w === z ? T[H] : A[H],
            Y = w === z ? -A[H] : -T[H],
            X = t.elements.arrow,
            U = f && X ? O(X) : { width: 0, height: 0 },
            K = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            Q = K[q],
            te = K[N],
            se = ve(0, T[H], U[H]),
            ne = S
              ? T[H] / 2 - R - se - Q - $.mainAxis
              : W - se - Q - $.mainAxis,
            ie = S
              ? -T[H] / 2 + R + se + te + $.mainAxis
              : Y + se + te + $.mainAxis,
            re = t.elements.arrow && _(t.elements.arrow),
            oe = re ? ("y" === C ? re.clientTop || 0 : re.clientLeft || 0) : 0,
            ae = null != (j = null == k ? void 0 : k[C]) ? j : 0,
            le = V + ie - ae,
            ce = ve(f ? g(G, V + ne - ae - oe) : G, V, f ? m(F, le) : F);
          (x[C] = ce), (P[C] = ce - V);
        }
        if (a) {
          var de,
            pe = "x" === C ? M : B,
            ue = "x" === C ? D : I,
            fe = x[E],
            he = "y" === E ? "height" : "width",
            me = fe + b[pe],
            be = fe - b[ue],
            ye = -1 !== [M, B].indexOf(y),
            we = null != (de = null == k ? void 0 : k[E]) ? de : 0,
            Se = ye ? me : fe - T[he] - A[he] - we + $.altAxis,
            Ce = ye ? fe + T[he] + A[he] - we - $.altAxis : be,
            Ee =
              f && ye
                ? (function (e, t, s) {
                    var n = ve(e, t, s);
                    return n > s ? s : n;
                  })(Se, fe, Ce)
                : ve(f ? Se : me, fe, f ? Ce : be);
          (x[E] = Ee), (P[E] = Ee - fe);
        }
        t.modifiersData[n] = P;
      }
    },
    requiresIfExists: ["offset"],
  };
  const ye = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        s = e.state,
        n = e.name,
        i = e.options,
        r = s.elements.arrow,
        o = s.modifiersData.popperOffsets,
        a = Z(s.placement),
        l = ee(a),
        c = [B, I].indexOf(a) >= 0 ? "height" : "width";
      if (r && o) {
        var d = (function (e, t) {
            return he(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : me(e, q)
            );
          })(i.padding, s),
          p = O(r),
          u = "y" === l ? M : B,
          f = "y" === l ? D : I,
          h =
            s.rects.reference[c] +
            s.rects.reference[l] -
            o[l] -
            s.rects.popper[c],
          m = o[l] - s.rects.reference[l],
          g = _(r),
          v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          y = d[u],
          w = v - p[c] - d[f],
          S = v / 2 - p[c] / 2 + b,
          C = ve(y, S, w),
          E = l;
        s.modifiersData[n] = (((t = {})[E] = C), (t.centerOffset = C - S), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        s = e.options.element,
        n = void 0 === s ? "[data-popper-arrow]" : s;
      null != n &&
        ("string" != typeof n || (n = t.elements.popper.querySelector(n))) &&
        de(t.elements.popper, n) &&
        (t.elements.arrow = n);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function we(e, t, s) {
    return (
      void 0 === s && (s = { x: 0, y: 0 }),
      {
        top: e.top - t.height - s.y,
        right: e.right - t.width + s.x,
        bottom: e.bottom - t.height + s.y,
        left: e.left - t.width - s.x,
      }
    );
  }
  function Se(e) {
    return [M, I, D, B].some(function (t) {
      return e[t] >= 0;
    });
  }
  var Ce = U({
      defaultModifiers: [
        Q,
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              s = e.name;
            t.modifiersData[s] = te({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              s = e.options,
              n = s.gpuAcceleration,
              i = void 0 === n || n,
              r = s.adaptive,
              o = void 0 === r || r,
              a = s.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: Z(t.placement),
                variation: J(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: i,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                ne(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  ne(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        ie,
        re,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              s = e.options,
              n = e.name;
            if (!t.modifiersData[n]._skip) {
              for (
                var i = s.mainAxis,
                  r = void 0 === i || i,
                  o = s.altAxis,
                  a = void 0 === o || o,
                  l = s.fallbackPlacements,
                  c = s.padding,
                  d = s.boundary,
                  p = s.rootBoundary,
                  u = s.altBoundary,
                  f = s.flipVariations,
                  h = void 0 === f || f,
                  m = s.allowedAutoPlacements,
                  g = t.options.placement,
                  v = Z(g),
                  b =
                    l ||
                    (v === g || !h
                      ? [ae(g)]
                      : (function (e) {
                          if (Z(e) === j) return [];
                          var t = ae(e);
                          return [ce(e), t, ce(t)];
                        })(g)),
                  y = [g].concat(b).reduce(function (e, s) {
                    return e.concat(
                      Z(s) === j
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var s = t,
                              n = s.placement,
                              i = s.boundary,
                              r = s.rootBoundary,
                              o = s.padding,
                              a = s.flipVariations,
                              l = s.allowedAutoPlacements,
                              c = void 0 === l ? F : l,
                              d = J(n),
                              p = d
                                ? a
                                  ? G
                                  : G.filter(function (e) {
                                      return J(e) === d;
                                    })
                                : q,
                              u = p.filter(function (e) {
                                return c.indexOf(e) >= 0;
                              });
                            0 === u.length && (u = p);
                            var f = u.reduce(function (t, s) {
                              return (
                                (t[s] = ge(e, {
                                  placement: s,
                                  boundary: i,
                                  rootBoundary: r,
                                  padding: o,
                                })[Z(s)]),
                                t
                              );
                            }, {});
                            return Object.keys(f).sort(function (e, t) {
                              return f[e] - f[t];
                            });
                          })(t, {
                            placement: s,
                            boundary: d,
                            rootBoundary: p,
                            padding: c,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : s
                    );
                  }, []),
                  w = t.rects.reference,
                  S = t.rects.popper,
                  C = new Map(),
                  E = !0,
                  x = y[0],
                  T = 0;
                T < y.length;
                T++
              ) {
                var O = y[T],
                  A = Z(O),
                  L = J(O) === z,
                  $ = [M, D].indexOf(A) >= 0,
                  k = $ ? "width" : "height",
                  P = ge(t, {
                    placement: O,
                    boundary: d,
                    rootBoundary: p,
                    altBoundary: u,
                    padding: c,
                  }),
                  _ = $ ? (L ? I : B) : L ? D : M;
                w[k] > S[k] && (_ = ae(_));
                var N = ae(_),
                  H = [];
                if (
                  (r && H.push(P[A] <= 0),
                  a && H.push(P[_] <= 0, P[N] <= 0),
                  H.every(function (e) {
                    return e;
                  }))
                ) {
                  (x = O), (E = !1);
                  break;
                }
                C.set(O, H);
              }
              if (E)
                for (
                  var V = function (e) {
                      var t = y.find(function (t) {
                        var s = C.get(t);
                        if (s)
                          return s.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (x = t), "break";
                    },
                    R = h ? 3 : 1;
                  R > 0;
                  R--
                ) {
                  if ("break" === V(R)) break;
                }
              t.placement !== x &&
                ((t.modifiersData[n]._skip = !0),
                (t.placement = x),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        be,
        ye,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              s = e.name,
              n = t.rects.reference,
              i = t.rects.popper,
              r = t.modifiersData.preventOverflow,
              o = ge(t, { elementContext: "reference" }),
              a = ge(t, { altBoundary: !0 }),
              l = we(o, n),
              c = we(a, i, r),
              d = Se(l),
              p = Se(c);
            (t.modifiersData[s] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: d,
              hasPopperEscaped: p,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": p,
              }));
          },
        },
      ],
    }),
    Ee = "tippy-content",
    xe = "tippy-backdrop",
    Te = "tippy-arrow",
    Oe = "tippy-svg-arrow",
    Ae = { passive: !0, capture: !0 },
    Le = function () {
      return document.body;
    };
  function $e(e, t, s) {
    if (Array.isArray(e)) {
      var n = e[t];
      return null == n ? (Array.isArray(s) ? s[t] : s) : n;
    }
    return e;
  }
  function ke(e, t) {
    var s = {}.toString.call(e);
    return 0 === s.indexOf("[object") && s.indexOf(t + "]") > -1;
  }
  function Pe(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function _e(e, t) {
    return 0 === t
      ? e
      : function (n) {
          clearTimeout(s),
            (s = setTimeout(function () {
              e(n);
            }, t));
        };
    var s;
  }
  function Me(e) {
    return [].concat(e);
  }
  function De(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Ie(e) {
    return e.split("-")[0];
  }
  function Be(e) {
    return [].slice.call(e);
  }
  function je(e) {
    return Object.keys(e).reduce(function (t, s) {
      return void 0 !== e[s] && (t[s] = e[s]), t;
    }, {});
  }
  function qe() {
    return document.createElement("div");
  }
  function ze(e) {
    return ["Element", "Fragment"].some(function (t) {
      return ke(e, t);
    });
  }
  function Ne(e) {
    return ke(e, "MouseEvent");
  }
  function He(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Ve(e) {
    return ze(e)
      ? [e]
      : (function (e) {
          return ke(e, "NodeList");
        })(e)
      ? Be(e)
      : Array.isArray(e)
      ? e
      : Be(document.querySelectorAll(e));
  }
  function Ge(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Fe(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Re(e) {
    var t,
      s = Me(e)[0];
    return null != s && null != (t = s.ownerDocument) && t.body
      ? s.ownerDocument
      : document;
  }
  function We(e, t, s) {
    var n = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[n](t, s);
    });
  }
  function Ye(e, t) {
    for (var s = t; s; ) {
      var n;
      if (e.contains(s)) return !0;
      s =
        null == s.getRootNode || null == (n = s.getRootNode())
          ? void 0
          : n.host;
    }
    return !1;
  }
  var Xe = { isTouch: !1 },
    Ue = 0;
  function Ke() {
    Xe.isTouch ||
      ((Xe.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Qe));
  }
  function Qe() {
    var e = performance.now();
    e - Ue < 20 &&
      ((Xe.isTouch = !1), document.removeEventListener("mousemove", Qe)),
      (Ue = e);
  }
  function Ze() {
    var e = document.activeElement;
    if (He(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var Je =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var et = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    tt = Object.assign(
      {
        appendTo: Le,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      et,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    st = Object.keys(tt);
  function nt(e) {
    var t = (e.plugins || []).reduce(function (t, s) {
      var n,
        i = s.name,
        r = s.defaultValue;
      i && (t[i] = void 0 !== e[i] ? e[i] : null != (n = tt[i]) ? n : r);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function it(e, t) {
    var s = Object.assign(
      {},
      t,
      { content: Pe(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(nt(Object.assign({}, tt, { plugins: t }))) : st
            ).reduce(function (t, s) {
              var n = (e.getAttribute("data-tippy-" + s) || "").trim();
              if (!n) return t;
              if ("content" === s) t[s] = n;
              else
                try {
                  t[s] = JSON.parse(n);
                } catch (e) {
                  t[s] = n;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (s.aria = Object.assign({}, tt.aria, s.aria)),
      (s.aria = {
        expanded: "auto" === s.aria.expanded ? t.interactive : s.aria.expanded,
        content:
          "auto" === s.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : s.aria.content,
      }),
      s
    );
  }
  function rt(e, t) {
    e.innerHTML = t;
  }
  function ot(e) {
    var t = qe();
    return (
      !0 === e
        ? (t.className = Te)
        : ((t.className = Oe), ze(e) ? t.appendChild(e) : rt(t, e)),
      t
    );
  }
  function at(e, t) {
    ze(t.content)
      ? (rt(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? rt(e, t.content) : (e.textContent = t.content));
  }
  function lt(e) {
    var t = e.firstElementChild,
      s = Be(t.children);
    return {
      box: t,
      content: s.find(function (e) {
        return e.classList.contains(Ee);
      }),
      arrow: s.find(function (e) {
        return e.classList.contains(Te) || e.classList.contains(Oe);
      }),
      backdrop: s.find(function (e) {
        return e.classList.contains(xe);
      }),
    };
  }
  function ct(e) {
    var t = qe(),
      s = qe();
    (s.className = "tippy-box"),
      s.setAttribute("data-state", "hidden"),
      s.setAttribute("tabindex", "-1");
    var n = qe();
    function i(s, n) {
      var i = lt(t),
        r = i.box,
        o = i.content,
        a = i.arrow;
      n.theme
        ? r.setAttribute("data-theme", n.theme)
        : r.removeAttribute("data-theme"),
        "string" == typeof n.animation
          ? r.setAttribute("data-animation", n.animation)
          : r.removeAttribute("data-animation"),
        n.inertia
          ? r.setAttribute("data-inertia", "")
          : r.removeAttribute("data-inertia"),
        (r.style.maxWidth =
          "number" == typeof n.maxWidth ? n.maxWidth + "px" : n.maxWidth),
        n.role ? r.setAttribute("role", n.role) : r.removeAttribute("role"),
        (s.content === n.content && s.allowHTML === n.allowHTML) ||
          at(o, e.props),
        n.arrow
          ? a
            ? s.arrow !== n.arrow &&
              (r.removeChild(a), r.appendChild(ot(n.arrow)))
            : r.appendChild(ot(n.arrow))
          : a && r.removeChild(a);
    }
    return (
      (n.className = Ee),
      n.setAttribute("data-state", "hidden"),
      at(n, e.props),
      t.appendChild(s),
      s.appendChild(n),
      i(e.props, e.props),
      { popper: t, onUpdate: i }
    );
  }
  ct.$$tippy = !0;
  var dt = 1,
    pt = [],
    ut = [];
  function ft(e, t) {
    var s,
      n,
      i,
      r,
      o,
      a,
      l,
      c,
      d = it(e, Object.assign({}, tt, nt(je(t)))),
      p = !1,
      u = !1,
      f = !1,
      h = !1,
      m = [],
      g = _e(Y, d.interactiveDebounce),
      v = dt++,
      b = (c = d.plugins).filter(function (e, t) {
        return c.indexOf(e) === t;
      }),
      y = {
        id: v,
        reference: e,
        popper: qe(),
        popperInstance: null,
        props: d,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: b,
        clearDelayTimeouts: function () {
          clearTimeout(s), clearTimeout(n), cancelAnimationFrame(i);
        },
        setProps: function (t) {
          0;
          if (y.state.isDestroyed) return;
          M("onBeforeUpdate", [y, t]), R();
          var s = y.props,
            n = it(e, Object.assign({}, s, je(t), { ignoreAttributes: !0 }));
          (y.props = n),
            F(),
            s.interactiveDebounce !== n.interactiveDebounce &&
              (B(), (g = _e(Y, n.interactiveDebounce)));
          s.triggerTarget && !n.triggerTarget
            ? Me(s.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : n.triggerTarget && e.removeAttribute("aria-expanded");
          I(), _(), C && C(s, n);
          y.popperInstance &&
            (Q(),
            J().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          M("onAfterUpdate", [y, t]);
        },
        setContent: function (e) {
          y.setProps({ content: e });
        },
        show: function () {
          0;
          var e = y.state.isVisible,
            t = y.state.isDestroyed,
            s = !y.state.isEnabled,
            n = Xe.isTouch && !y.props.touch,
            i = $e(y.props.duration, 0, tt.duration);
          if (e || t || s || n) return;
          if (L().hasAttribute("disabled")) return;
          if ((M("onShow", [y], !1), !1 === y.props.onShow(y))) return;
          (y.state.isVisible = !0), A() && (S.style.visibility = "visible");
          _(), N(), y.state.isMounted || (S.style.transition = "none");
          if (A()) {
            var r = k(),
              o = r.box,
              l = r.content;
            Ge([o, l], 0);
          }
          (a = function () {
            var e;
            if (y.state.isVisible && !h) {
              if (
                ((h = !0),
                S.offsetHeight,
                (S.style.transition = y.props.moveTransition),
                A() && y.props.animation)
              ) {
                var t = k(),
                  s = t.box,
                  n = t.content;
                Ge([s, n], i), Fe([s, n], "visible");
              }
              D(),
                I(),
                De(ut, y),
                null == (e = y.popperInstance) || e.forceUpdate(),
                M("onMount", [y]),
                y.props.animation &&
                  A() &&
                  (function (e, t) {
                    V(e, t);
                  })(i, function () {
                    (y.state.isShown = !0), M("onShown", [y]);
                  });
            }
          }),
            (function () {
              var e,
                t = y.props.appendTo,
                s = L();
              e =
                (y.props.interactive && t === Le) || "parent" === t
                  ? s.parentNode
                  : Pe(t, [s]);
              e.contains(S) || e.appendChild(S);
              (y.state.isMounted = !0), Q(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !y.state.isVisible,
            t = y.state.isDestroyed,
            s = !y.state.isEnabled,
            n = $e(y.props.duration, 1, tt.duration);
          if (e || t || s) return;
          if ((M("onHide", [y], !1), !1 === y.props.onHide(y))) return;
          (y.state.isVisible = !1),
            (y.state.isShown = !1),
            (h = !1),
            (p = !1),
            A() && (S.style.visibility = "hidden");
          if ((B(), H(), _(!0), A())) {
            var i = k(),
              r = i.box,
              o = i.content;
            y.props.animation && (Ge([r, o], n), Fe([r, o], "hidden"));
          }
          D(),
            I(),
            y.props.animation
              ? A() &&
                (function (e, t) {
                  V(e, function () {
                    !y.state.isVisible &&
                      S.parentNode &&
                      S.parentNode.contains(S) &&
                      t();
                  });
                })(n, y.unmount)
              : y.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          $().addEventListener("mousemove", g), De(pt, g), g(e);
        },
        enable: function () {
          y.state.isEnabled = !0;
        },
        disable: function () {
          y.hide(), (y.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          y.state.isVisible && y.hide();
          if (!y.state.isMounted) return;
          Z(),
            J().forEach(function (e) {
              e._tippy.unmount();
            }),
            S.parentNode && S.parentNode.removeChild(S);
          (ut = ut.filter(function (e) {
            return e !== y;
          })),
            (y.state.isMounted = !1),
            M("onHidden", [y]);
        },
        destroy: function () {
          0;
          if (y.state.isDestroyed) return;
          y.clearDelayTimeouts(),
            y.unmount(),
            R(),
            delete e._tippy,
            (y.state.isDestroyed = !0),
            M("onDestroy", [y]);
        },
      };
    if (!d.render) return y;
    var w = d.render(y),
      S = w.popper,
      C = w.onUpdate;
    S.setAttribute("data-tippy-root", ""),
      (S.id = "tippy-" + y.id),
      (y.popper = S),
      (e._tippy = y),
      (S._tippy = y);
    var E = b.map(function (e) {
        return e.fn(y);
      }),
      x = e.hasAttribute("aria-expanded");
    return (
      F(),
      I(),
      _(),
      M("onCreate", [y]),
      d.showOnCreate && ee(),
      S.addEventListener("mouseenter", function () {
        y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
      }),
      S.addEventListener("mouseleave", function () {
        y.props.interactive &&
          y.props.trigger.indexOf("mouseenter") >= 0 &&
          $().addEventListener("mousemove", g);
      }),
      y
    );
    function T() {
      var e = y.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function O() {
      return "hold" === T()[0];
    }
    function A() {
      var e;
      return !(null == (e = y.props.render) || !e.$$tippy);
    }
    function L() {
      return l || e;
    }
    function $() {
      var e = L().parentNode;
      return e ? Re(e) : document;
    }
    function k() {
      return lt(S);
    }
    function P(e) {
      return (y.state.isMounted && !y.state.isVisible) ||
        Xe.isTouch ||
        (r && "focus" === r.type)
        ? 0
        : $e(y.props.delay, e ? 0 : 1, tt.delay);
    }
    function _(e) {
      void 0 === e && (e = !1),
        (S.style.pointerEvents = y.props.interactive && !e ? "" : "none"),
        (S.style.zIndex = "" + y.props.zIndex);
    }
    function M(e, t, s) {
      var n;
      (void 0 === s && (s = !0),
      E.forEach(function (s) {
        s[e] && s[e].apply(s, t);
      }),
      s) && (n = y.props)[e].apply(n, t);
    }
    function D() {
      var t = y.props.aria;
      if (t.content) {
        var s = "aria-" + t.content,
          n = S.id;
        Me(y.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(s);
          if (y.state.isVisible) e.setAttribute(s, t ? t + " " + n : n);
          else {
            var i = t && t.replace(n, "").trim();
            i ? e.setAttribute(s, i) : e.removeAttribute(s);
          }
        });
      }
    }
    function I() {
      !x &&
        y.props.aria.expanded &&
        Me(y.props.triggerTarget || e).forEach(function (e) {
          y.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                y.state.isVisible && e === L() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function B() {
      $().removeEventListener("mousemove", g),
        (pt = pt.filter(function (e) {
          return e !== g;
        }));
    }
    function j(t) {
      if (!Xe.isTouch || (!f && "mousedown" !== t.type)) {
        var s = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!y.props.interactive || !Ye(S, s)) {
          if (
            Me(y.props.triggerTarget || e).some(function (e) {
              return Ye(e, s);
            })
          ) {
            if (Xe.isTouch) return;
            if (y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
              return;
          } else M("onClickOutside", [y, t]);
          !0 === y.props.hideOnClick &&
            (y.clearDelayTimeouts(),
            y.hide(),
            (u = !0),
            setTimeout(function () {
              u = !1;
            }),
            y.state.isMounted || H());
        }
      }
    }
    function q() {
      f = !0;
    }
    function z() {
      f = !1;
    }
    function N() {
      var e = $();
      e.addEventListener("mousedown", j, !0),
        e.addEventListener("touchend", j, Ae),
        e.addEventListener("touchstart", z, Ae),
        e.addEventListener("touchmove", q, Ae);
    }
    function H() {
      var e = $();
      e.removeEventListener("mousedown", j, !0),
        e.removeEventListener("touchend", j, Ae),
        e.removeEventListener("touchstart", z, Ae),
        e.removeEventListener("touchmove", q, Ae);
    }
    function V(e, t) {
      var s = k().box;
      function n(e) {
        e.target === s && (We(s, "remove", n), t());
      }
      if (0 === e) return t();
      We(s, "remove", o), We(s, "add", n), (o = n);
    }
    function G(t, s, n) {
      void 0 === n && (n = !1),
        Me(y.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, s, n),
            m.push({ node: e, eventType: t, handler: s, options: n });
        });
    }
    function F() {
      O() &&
        (G("touchstart", W, { passive: !0 }),
        G("touchend", X, { passive: !0 })),
        (function (e) {
          return e.split(/\s+/).filter(Boolean);
        })(y.props.trigger).forEach(function (e) {
          if ("manual" !== e)
            switch ((G(e, W), e)) {
              case "mouseenter":
                G("mouseleave", X);
                break;
              case "focus":
                G(Je ? "focusout" : "blur", U);
                break;
              case "focusin":
                G("focusout", U);
            }
        });
    }
    function R() {
      m.forEach(function (e) {
        var t = e.node,
          s = e.eventType,
          n = e.handler,
          i = e.options;
        t.removeEventListener(s, n, i);
      }),
        (m = []);
    }
    function W(e) {
      var t,
        s = !1;
      if (y.state.isEnabled && !K(e) && !u) {
        var n = "focus" === (null == (t = r) ? void 0 : t.type);
        (r = e),
          (l = e.currentTarget),
          I(),
          !y.state.isVisible &&
            Ne(e) &&
            pt.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (y.props.trigger.indexOf("mouseenter") < 0 || p) &&
          !1 !== y.props.hideOnClick &&
          y.state.isVisible
            ? (s = !0)
            : ee(e),
          "click" === e.type && (p = !s),
          s && !n && te(e);
      }
    }
    function Y(e) {
      var t = e.target,
        s = L().contains(t) || S.contains(t);
      if ("mousemove" !== e.type || !s) {
        var n = J()
          .concat(S)
          .map(function (e) {
            var t,
              s = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return s
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: s,
                  props: d,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var s = t.clientX,
            n = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              i = e.popperState,
              r = e.props.interactiveBorder,
              o = Ie(i.placement),
              a = i.modifiersData.offset;
            if (!a) return !0;
            var l = "bottom" === o ? a.top.y : 0,
              c = "top" === o ? a.bottom.y : 0,
              d = "right" === o ? a.left.x : 0,
              p = "left" === o ? a.right.x : 0,
              u = t.top - n + l > r,
              f = n - t.bottom - c > r,
              h = t.left - s + d > r,
              m = s - t.right - p > r;
            return u || f || h || m;
          });
        })(n, e) && (B(), te(e));
      }
    }
    function X(e) {
      K(e) ||
        (y.props.trigger.indexOf("click") >= 0 && p) ||
        (y.props.interactive ? y.hideWithInteractivity(e) : te(e));
    }
    function U(e) {
      (y.props.trigger.indexOf("focusin") < 0 && e.target !== L()) ||
        (y.props.interactive &&
          e.relatedTarget &&
          S.contains(e.relatedTarget)) ||
        te(e);
    }
    function K(e) {
      return !!Xe.isTouch && O() !== e.type.indexOf("touch") >= 0;
    }
    function Q() {
      Z();
      var t = y.props,
        s = t.popperOptions,
        n = t.placement,
        i = t.offset,
        r = t.getReferenceClientRect,
        o = t.moveTransition,
        l = A() ? lt(S).arrow : null,
        c = r
          ? {
              getBoundingClientRect: r,
              contextElement: r.contextElement || L(),
            }
          : e,
        d = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (A()) {
              var s = k().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? s.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? s.setAttribute("data-" + e, "")
                  : s.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        p = [
          { name: "offset", options: { offset: i } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !o } },
          d,
        ];
      A() &&
        l &&
        p.push({ name: "arrow", options: { element: l, padding: 3 } }),
        p.push.apply(p, (null == s ? void 0 : s.modifiers) || []),
        (y.popperInstance = Ce(
          c,
          S,
          Object.assign({}, s, { placement: n, onFirstUpdate: a, modifiers: p })
        ));
    }
    function Z() {
      y.popperInstance &&
        (y.popperInstance.destroy(), (y.popperInstance = null));
    }
    function J() {
      return Be(S.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      y.clearDelayTimeouts(), e && M("onTrigger", [y, e]), N();
      var t = P(!0),
        n = T(),
        i = n[0],
        r = n[1];
      Xe.isTouch && "hold" === i && r && (t = r),
        t
          ? (s = setTimeout(function () {
              y.show();
            }, t))
          : y.show();
    }
    function te(e) {
      if (
        (y.clearDelayTimeouts(), M("onUntrigger", [y, e]), y.state.isVisible)
      ) {
        if (
          !(
            y.props.trigger.indexOf("mouseenter") >= 0 &&
            y.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            p
          )
        ) {
          var t = P(!1);
          t
            ? (n = setTimeout(function () {
                y.state.isVisible && y.hide();
              }, t))
            : (i = requestAnimationFrame(function () {
                y.hide();
              }));
        }
      } else H();
    }
  }
  function ht(e, t) {
    void 0 === t && (t = {});
    var s = tt.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Ke, Ae),
      window.addEventListener("blur", Ze);
    var n = Object.assign({}, t, { plugins: s }),
      i = Ve(e).reduce(function (e, t) {
        var s = t && ft(t, n);
        return s && e.push(s), e;
      }, []);
    return ze(e) ? i[0] : i;
  }
  (ht.defaultProps = tt),
    (ht.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        tt[t] = e[t];
      });
    }),
    (ht.currentInput = Xe);
  Object.assign({}, ie, {
    effect: function (e) {
      var t = e.state,
        s = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, s.popper),
        (t.styles = s),
        t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow);
    },
  });
  ht.setDefaultProps({ render: ct });
  const mt = ht;
  let gt = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    fieldTipTrigger(e, t) {
      if (!e.hasAttribute("data-tippy")) {
        const s = new mt(e, {
          content: t,
          theme: "CFD",
          placement: "auto",
          trigger: "focusin",
          theme: "custom",
          duration: [300, 0],
          zIndex: 3,
          onMount() {
            (e.dataset.tippy = e.getAttribute("aria-describedby")),
              e.hasAttribute("data-tippy") &&
                !e.classList.contains("_form-error") &&
                (s.destroy(), e.removeAttribute("data-tippy"));
          },
        });
      }
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : "tel" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.fieldTipTrigger(e, "Это поле обязательное к заполнению"),
            this.telTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : "name" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.fieldTipTrigger(e, "Это поле обязательное к заполнению"),
            this.nameTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : "message" === e.dataset.required
          ? (this.fieldTipTrigger(e, "Напиши нам пару слов ◠ᴥ◠"),
            this.messageTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              gt.removeError(t);
          }
          let n = t.querySelectorAll(".checkbox__input");
          if (n.length > 0)
            for (let e = 0; e < n.length; e++) {
              n[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const n = s[t].querySelector("select");
                e.select.selectBuild(n);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    telTest: (e) => !/^([+]?(?:38)?)(0\d{9})$/.test(e.value),
    nameTest: (e) => !/^[a-zA-zа-яА-Яё]{4,}/.test(e.value),
    messageTest: (e) => !/^\s*\S+(?:\s+\S+){2,}\s*$/.test(e.value),
  };
  function vt(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function bt(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : vt(t[s]) &&
          vt(e[s]) &&
          Object.keys(t[s]).length > 0 &&
          bt(e[s], t[s]);
    });
  }
  (e.select = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        );
    }
    selectInit(e, t) {
      const s = this;
      let n = document.createElement("div");
      if (
        (n.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(n, e),
        n.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        n.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          n,
          this.selectClasses.classSelectTitle
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const n = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ).dataset.selectId
                }"]`
              ),
          i = this.getSelectElement(n).originalSelect;
        if ("click" === s) {
          if (!i.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                );
              this.optionAction(n, i, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(n);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(n, i, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? n.classList.add(this.selectClasses.classSelectFocus)
                : n.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        n(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody
        ).selectElement,
        n = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle
        ).selectElement;
      n && n.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t
                )}</span>`
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let n = "";
      return (
        (n += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (n += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (n += t ? s : ""),
        (n += t ? "</span>" : ""),
        (n += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (n += e.textContent),
        (n += t ? "</span>" : ""),
        (n += t ? "</span>" : ""),
        n
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        n = Array.from(e.options);
      if (n.length > 0) {
        let i = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (n = n.filter((e) => e.value)),
          (i += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          n.forEach((t) => {
            i += this.getOption(t, e);
          }),
          (i += t ? "</div>" : ""),
          i
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        n = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        i = e.dataset.class ? ` ${e.dataset.class}` : "",
        r = !!e.dataset.href && e.dataset.href,
        o = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let a = "";
      return (
        (a += r
          ? `<a ${o} ${n} href="${r}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${i}${s}">`
          : `<button ${n} class="${this.selectClasses.classSelectOption}${i}${s}" data-value="${e.value}" type="button">`),
        (a += this.getSelectElementContent(e)),
        (a += r ? "</a>" : "</button>"),
        a
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected"
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption
            )}[hidden]`
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && gt.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement,
        n = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        i = this;
      t.addEventListener("input", function () {
        n.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && i.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } })
      );
    }
    setLogging(e) {
      this.config.logging && c(`[select]: ${e}`);
    }
  })({})),
    (e.tippy = mt("[data-tippy-content]", {}));
  const yt = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function wt() {
    const e = "undefined" != typeof document ? document : {};
    return bt(e, yt), e;
  }
  const St = {
    document: yt,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function Ct() {
    const e = "undefined" != typeof window ? window : {};
    return bt(e, St), e;
  }
  class Et extends Array {
    constructor(e) {
      super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this);
    }
  }
  function xt(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...xt(e)) : t.push(e);
      }),
      t
    );
  }
  function Tt(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function Ot(e, t) {
    const s = Ct(),
      n = wt();
    let i = [];
    if (!t && e instanceof Et) return e;
    if (!e) return new Et(i);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = n.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          i.push(t.childNodes[e]);
      } else
        i = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            n = t.querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) s.push(n[e]);
          return s;
        })(e.trim(), t || n);
    } else if (e.nodeType || e === s || e === n) i.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof Et) return e;
      i = e;
    }
    return new Et(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(i)
    );
  }
  Ot.fn = Et.prototype;
  const At = "resize scroll".split(" ");
  function Lt(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          At.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : Ot(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  Lt("click"),
    Lt("blur"),
    Lt("focus"),
    Lt("focusin"),
    Lt("focusout"),
    Lt("keyup"),
    Lt("keydown"),
    Lt("keypress"),
    Lt("submit"),
    Lt("change"),
    Lt("mousedown"),
    Lt("mousemove"),
    Lt("mouseup"),
    Lt("mouseenter"),
    Lt("mouseleave"),
    Lt("mouseout"),
    Lt("mouseover"),
    Lt("touchstart"),
    Lt("touchend"),
    Lt("touchmove"),
    Lt("resize"),
    Lt("scroll");
  const $t = {
    addClass: function (...e) {
      const t = xt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = xt(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = xt(e.map((e) => e.split(" ")));
      return (
        Tt(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = xt(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, n, i] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const i = e.target.dom7EventData || [];
        if ((i.indexOf(e) < 0 && i.unshift(e), Ot(t).is(s))) n.apply(t, i);
        else {
          const e = Ot(t).parents();
          for (let t = 0; t < e.length; t += 1)
            Ot(e[t]).is(s) && n.apply(e[t], i);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof e[1] && (([t, n, i] = e), (s = void 0)),
        i || (i = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: n, proxyListener: r }),
              t.addEventListener(e, r, i);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: n, proxyListener: o }),
              t.addEventListener(e, o, i);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, n, i] = e;
      "function" == typeof e[1] && (([t, n, i] = e), (s = void 0)),
        i || (i = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let o;
          if (
            (!s && r.dom7Listeners
              ? (o = r.dom7Listeners[t])
              : s && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const s = o[e];
              (n && s.listener === n) ||
              (n &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === n)
                ? (r.removeEventListener(t, s.proxyListener, i), o.splice(e, 1))
                : n ||
                  (r.removeEventListener(t, s.proxyListener, i),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = Ct(),
        s = e[0].split(" "),
        n = e[1];
      for (let i = 0; i < s.length; i += 1) {
        const r = s[i];
        for (let s = 0; s < this.length; s += 1) {
          const i = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(r, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (i.dom7EventData = e.filter((e, t) => t > 0)),
              i.dispatchEvent(s),
              (i.dom7EventData = []),
              delete i.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(n) {
            n.target === this && (e.call(this, n), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = Ct();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = Ct(),
          t = wt(),
          s = this[0],
          n = s.getBoundingClientRect(),
          i = t.body,
          r = s.clientTop || i.clientTop || 0,
          o = s.clientLeft || i.clientLeft || 0,
          a = s === e ? e.scrollY : s.scrollTop,
          l = s === e ? e.scrollX : s.scrollLeft;
        return { top: n.top + a - r, left: n.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = Ct();
      let n;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (n = 0; n < this.length; n += 1)
            for (const t in e) this[n].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = Ct(),
        s = wt(),
        n = this[0];
      let i, r;
      if (!n || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (n.matches) return n.matches(e);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
        if (n.msMatchesSelector) return n.msMatchesSelector(e);
        for (i = Ot(e), r = 0; r < i.length; r += 1) if (i[r] === n) return !0;
        return !1;
      }
      if (e === s) return n === s;
      if (e === t) return n === t;
      if (e.nodeType || e instanceof Et) {
        for (i = e.nodeType ? [e] : e, r = 0; r < i.length; r += 1)
          if (i[r] === n) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return Ot([]);
      if (e < 0) {
        const s = t + e;
        return Ot(s < 0 ? [] : [this[s]]);
      }
      return Ot([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = wt();
      for (let n = 0; n < e.length; n += 1) {
        t = e[n];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const n = s.createElement("div");
            for (n.innerHTML = t; n.firstChild; )
              this[e].appendChild(n.firstChild);
          } else if (t instanceof Et)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = wt();
      let s, n;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const i = t.createElement("div");
          for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1)
            this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]);
        } else if (e instanceof Et)
          for (n = 0; n < e.length; n += 1)
            this[s].insertBefore(e[n], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && Ot(this[0].nextElementSibling).is(e)
            ? Ot([this[0].nextElementSibling])
            : Ot([])
          : this[0].nextElementSibling
          ? Ot([this[0].nextElementSibling])
          : Ot([])
        : Ot([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return Ot([]);
      for (; s.nextElementSibling; ) {
        const n = s.nextElementSibling;
        e ? Ot(n).is(e) && t.push(n) : t.push(n), (s = n);
      }
      return Ot(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && Ot(t.previousElementSibling).is(e)
            ? Ot([t.previousElementSibling])
            : Ot([])
          : t.previousElementSibling
          ? Ot([t.previousElementSibling])
          : Ot([]);
      }
      return Ot([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return Ot([]);
      for (; s.previousElementSibling; ) {
        const n = s.previousElementSibling;
        e ? Ot(n).is(e) && t.push(n) : t.push(n), (s = n);
      }
      return Ot(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? Ot(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return Ot(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let n = this[s].parentNode;
        for (; n; )
          e ? Ot(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
      }
      return Ot(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? Ot([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const n = this[s].querySelectorAll(e);
        for (let e = 0; e < n.length; e += 1) t.push(n[e]);
      }
      return Ot(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const n = this[s].children;
        for (let s = 0; s < n.length; s += 1)
          (e && !Ot(n[s]).is(e)) || t.push(n[s]);
      }
      return Ot(t);
    },
    filter: function (e) {
      return Ot(Tt(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys($t).forEach((e) => {
    Object.defineProperty(Ot.fn, e, { value: $t[e], writable: !0 });
  });
  const kt = Ot;
  function Pt(e, t = 0) {
    return setTimeout(e, t);
  }
  function _t() {
    return Date.now();
  }
  function Mt(e, t = "x") {
    const s = Ct();
    let n, i, r;
    const o = (function (e) {
      const t = Ct();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = o.transform || o.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((r =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (n = r.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? r.m41
          : 16 === n.length
          ? parseFloat(n[12])
          : parseFloat(n[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? r.m42
          : 16 === n.length
          ? parseFloat(n[13])
          : parseFloat(n[5])),
      i || 0
    );
  }
  function Dt(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function It(...e) {
    const t = Object(e[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
      const r = e[i];
      if (
        null != r &&
        ((n = r),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? n instanceof HTMLElement
          : n && (1 === n.nodeType || 11 === n.nodeType)))
      ) {
        const e = Object.keys(Object(r)).filter((e) => s.indexOf(e) < 0);
        for (let s = 0, n = e.length; s < n; s += 1) {
          const n = e[s],
            i = Object.getOwnPropertyDescriptor(r, n);
          void 0 !== i &&
            i.enumerable &&
            (Dt(t[n]) && Dt(r[n])
              ? r[n].__swiper__
                ? (t[n] = r[n])
                : It(t[n], r[n])
              : !Dt(t[n]) && Dt(r[n])
              ? ((t[n] = {}), r[n].__swiper__ ? (t[n] = r[n]) : It(t[n], r[n]))
              : (t[n] = r[n]));
        }
      }
    }
    var n;
    return t;
  }
  function Bt(e, t, s) {
    e.style.setProperty(t, s);
  }
  function jt({ swiper: e, targetPosition: t, side: s }) {
    const n = Ct(),
      i = -e.translate;
    let r,
      o = null;
    const a = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > i ? "next" : "prev",
      c = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      d = () => {
        (r = new Date().getTime()), null === o && (o = r);
        const l = Math.max(Math.min((r - o) / a, 1), 0),
          p = 0.5 - Math.cos(l * Math.PI) / 2;
        let u = i + p * (t - i);
        if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), c(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [s]: u });
            }),
            void n.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = n.requestAnimationFrame(d);
      };
    d();
  }
  let qt, zt, Nt;
  function Ht() {
    return (
      qt ||
        (qt = (function () {
          const e = Ct(),
            t = wt();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      qt
    );
  }
  function Vt(e = {}) {
    return (
      zt ||
        (zt = (function ({ userAgent: e } = {}) {
          const t = Ht(),
            s = Ct(),
            n = s.navigator.platform,
            i = e || s.navigator.userAgent,
            r = { ios: !1, android: !1 },
            o = s.screen.width,
            a = s.screen.height,
            l = i.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = i.match(/(iPad).*OS\s([\d_]+)/);
          const d = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === n;
          let f = "MacIntel" === n;
          return (
            !c &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${a}`) >= 0 &&
              ((c = i.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !u && ((r.os = "android"), (r.android = !0)),
            (c || p || d) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      zt
    );
  }
  function Gt() {
    return (
      Nt ||
        (Nt = (function () {
          const e = Ct();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      Nt
    );
  }
  const Ft = {
    on(e, t, s) {
      const n = this;
      if ("function" != typeof t) return n;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          n.eventsListeners[e] || (n.eventsListeners[e] = []),
            n.eventsListeners[e][i](t);
        }),
        n
      );
    },
    once(e, t, s) {
      const n = this;
      if ("function" != typeof t) return n;
      function i(...s) {
        n.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(n, s);
      }
      return (i.__emitterProxy = t), n.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if ("function" != typeof e) return s;
      const n = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[n](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((n, i) => {
                  (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let s, n, i;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((s = e[0]), (n = e.slice(1, e.length)), (i = t))
        : ((s = e[0].events), (n = e[0].data), (i = e[0].context || t)),
        n.unshift(i);
      return (
        (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(i, [e, ...n]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(i, n);
              });
        }),
        t
      );
    },
  };
  const Rt = {
    updateSize: function () {
      const e = this;
      let t, s;
      const n = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : n[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : n[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(n.css("padding-left") || 0, 10) -
            parseInt(n.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(n.css("padding-top") || 0, 10) -
            parseInt(n.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const n = e.params,
        { $wrapperEl: i, size: r, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && n.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = i.children(`.${e.params.slideClass}`),
        p = l ? e.virtual.slides.length : d.length;
      let u = [];
      const f = [],
        h = [];
      let m = n.slidesOffsetBefore;
      "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
      let g = n.slidesOffsetAfter;
      "function" == typeof g && (g = n.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = n.spaceBetween,
        w = -m,
        S = 0,
        C = 0;
      if (void 0 === r) return;
      "string" == typeof y &&
        y.indexOf("%") >= 0 &&
        (y = (parseFloat(y.replace("%", "")) / 100) * r),
        (e.virtualSize = -y),
        o
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        n.centeredSlides &&
          n.cssMode &&
          (Bt(e.wrapperEl, "--swiper-centered-offset-before", ""),
          Bt(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const E = n.grid && n.grid.rows > 1 && e.grid;
      let x;
      E && e.grid.initSlides(p);
      const T =
        "auto" === n.slidesPerView &&
        n.breakpoints &&
        Object.keys(n.breakpoints).filter(
          (e) => void 0 !== n.breakpoints[e].slidesPerView
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        x = 0;
        const o = d.eq(i);
        if (
          (E && e.grid.updateSlide(i, o, p, t), "none" !== o.css("display"))
        ) {
          if ("auto" === n.slidesPerView) {
            T && (d[i].style[t("width")] = "");
            const r = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              n.roundLengths)
            )
              x = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = s(r, "width"),
                t = s(r, "padding-left"),
                n = s(r, "padding-right"),
                i = s(r, "margin-left"),
                a = s(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) x = e + i + a;
              else {
                const { clientWidth: s, offsetWidth: r } = o[0];
                x = e + t + n + i + a + (r - s);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              n.roundLengths && (x = Math.floor(x));
          } else
            (x = (r - (n.slidesPerView - 1) * y) / n.slidesPerView),
              n.roundLengths && (x = Math.floor(x)),
              d[i] && (d[i].style[t("width")] = `${x}px`);
          d[i] && (d[i].swiperSlideSize = x),
            h.push(x),
            n.centeredSlides
              ? ((w = w + x / 2 + S / 2 + y),
                0 === S && 0 !== i && (w = w - r / 2 - y),
                0 === i && (w = w - r / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                n.roundLengths && (w = Math.floor(w)),
                C % n.slidesPerGroup == 0 && u.push(w),
                f.push(w))
              : (n.roundLengths && (w = Math.floor(w)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                f.push(w),
                (w = w + x + y)),
            (e.virtualSize += x + y),
            (S = x),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        o &&
          a &&
          ("slide" === n.effect || "coverflow" === n.effect) &&
          i.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
        n.setWrapperSize &&
          i.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
        E && e.grid.updateWrapperSize(x, u, t),
        !n.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let i = u[s];
          n.roundLengths && (i = Math.floor(i)),
            u[s] <= e.virtualSize - r && t.push(i);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if ((0 === u.length && (u = [0]), 0 !== n.spaceBetween)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !n.cssMode || t !== d.length - 1).css({
          [s]: `${y}px`,
        });
      }
      if (n.centeredSlides && n.centeredSlidesBounds) {
        let e = 0;
        h.forEach((t) => {
          e += t + (n.spaceBetween ? n.spaceBetween : 0);
        }),
          (e -= n.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (n.centerInsufficientSlides) {
        let e = 0;
        if (
          (h.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
          (e -= n.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            f.forEach((e, s) => {
              f[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: f,
          slidesSizesGrid: h,
        }),
        n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
      ) {
        Bt(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          Bt(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - h[h.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== b && e.emit("slidesGridLengthChange"),
        n.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        n = t.virtual && t.params.virtual.enabled;
      let i,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        n
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !n) break;
            s.push(o(e));
          }
      else s.push(o(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        s = t.params,
        { slides: n, rtlTranslate: i, snapGrid: r } = t;
      if (0 === n.length) return;
      void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      i && (o = e),
        n.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < n.length; e += 1) {
        const a = n[e];
        let l = a.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (l -= n[0].swiperSlideOffset);
        const c =
            (o + (s.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + s.spaceBetween),
          d =
            (o - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + s.spaceBetween),
          p = -(o - l),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          n.eq(e).addClass(s.slideVisibleClass)),
          (a.progress = i ? -c : c),
          (a.originalProgress = i ? -d : d);
      }
      t.visibleSlides = kt(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        n = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: r, isEnd: o } = t;
      const a = r,
        l = o;
      0 === n
        ? ((i = 0), (r = !0), (o = !0))
        : ((i = (e - t.minTranslate()) / n), (r = i <= 0), (o = i >= 1)),
        Object.assign(t, { progress: i, isBeginning: r, isEnd: o }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !a && t.emit("reachBeginning toEdge"),
        o && !l && t.emit("reachEnd toEdge"),
        ((a && !r) || (l && !o)) && t.emit("fromEdge"),
        t.emit("progress", i);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: n,
          activeIndex: i,
          realIndex: r,
        } = e,
        o = e.virtual && s.virtual.enabled;
      let a;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${i}"]`
            )
          : t.eq(i)),
        a.addClass(s.slideActiveClass),
        s.loop &&
          (a.hasClass(s.slideDuplicateClass)
            ? n
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : n
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let l = a.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(s.slideNextClass));
      let c = a.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(s.slidePrevClass)),
        s.loop &&
          (l.hasClass(s.slideDuplicateClass)
            ? n
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : n
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          c.hasClass(s.slideDuplicateClass)
            ? n
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : n
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: n,
          snapGrid: i,
          params: r,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < n.length; e += 1)
          void 0 !== n[e + 1]
            ? s >= n[e] && s < n[e + 1] - (n[e + 1] - n[e]) / 2
              ? (d = e)
              : s >= n[e] && s < n[e + 1] && (d = e + 1)
            : s >= n[e] && (d = e);
        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (i.indexOf(s) >= 0) c = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((c >= i.length && (c = i.length - 1), d === o))
        return void (c !== l && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: o,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        n = kt(e).closest(`.${s.slideClass}`)[0];
      let i,
        r = !1;
      if (n)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === n) {
            (r = !0), (i = e);
            break;
          }
      if (!n || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = n),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              kt(n).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = i),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const Wt = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: s, translate: n, $wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -n : n;
      if (t.cssMode) return n;
      let r = Mt(i[0], e);
      return s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: n,
          params: i,
          $wrapperEl: r,
          wrapperEl: o,
          progress: a,
        } = s;
      let l,
        c = 0,
        d = 0;
      s.isHorizontal() ? (c = n ? -e : e) : (d = e),
        i.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        i.cssMode
          ? (o[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -c
              : -d)
          : i.virtualTranslate ||
            r.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? c : d);
      const p = s.maxTranslate() - s.minTranslate();
      (l = 0 === p ? 0 : (e - s.minTranslate()) / p),
        l !== a && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, n = !0, i) {
      const r = this,
        { params: o, wrapperEl: a } = r;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        c = r.maxTranslate();
      let d;
      if (
        ((d = n && e > l ? l : n && e < c ? c : e),
        r.updateProgress(d),
        o.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!r.support.smoothScroll)
            return (
              jt({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
              !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(d),
            s &&
              (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(d),
            s &&
              (r.emit("beforeTransitionStart", t, i),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit("transitionEnd"));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function Yt({ swiper: e, runCallbacks: t, direction: s, step: n }) {
    const { activeIndex: i, previousIndex: r } = e;
    let o = s;
    if (
      (o || (o = i > r ? "next" : i < r ? "prev" : "reset"),
      e.emit(`transition${n}`),
      t && i !== r)
    ) {
      if ("reset" === o) return void e.emit(`slideResetTransition${n}`);
      e.emit(`slideChangeTransition${n}`),
        "next" === o
          ? e.emit(`slideNextTransition${n}`)
          : e.emit(`slidePrevTransition${n}`);
    }
  }
  const Xt = {
    slideTo: function (e = 0, t = this.params.speed, s = !0, n, i) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: f,
        enabled: h,
      } = r;
      if ((r.animating && a.preventInteractionOnTransition) || (!h && !n && !i))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, o);
      let g = m + Math.floor((o - m) / r.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1),
        (p || a.initialSlide || 0) === (d || 0) &&
          s &&
          r.emit("beforeSlideChangeStart");
      const v = -l[g];
      if ((r.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            n = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < n - (n - s) / 2
              ? (o = e)
              : t >= s && t < n && (o = e + 1)
            : t >= s && (o = e);
        }
      if (r.initialized && o !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== o
        )
          return !1;
      }
      let b;
      if (
        ((b = o > p ? "next" : o < p ? "prev" : "reset"),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(o),
          a.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== a.effect && r.setTranslate(v),
          "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (f[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              jt({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(o),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, n),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.$wrapperEl[0].addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, s = !0, n) {
      const i = this;
      let r = e;
      return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, n);
    },
    slideNext: function (e = this.params.speed, t = !0, s) {
      const n = this,
        { animating: i, enabled: r, params: o } = n;
      if (!r) return n;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
      const l = n.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (i && o.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      return o.rewind && n.isEnd
        ? n.slideTo(0, e, t, s)
        : n.slideTo(n.activeIndex + l, e, t, s);
    },
    slidePrev: function (e = this.params.speed, t = !0, s) {
      const n = this,
        {
          params: i,
          animating: r,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: c,
        } = n;
      if (!c) return n;
      if (i.loop) {
        if (r && i.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(l ? n.translate : -n.translate),
        u = o.map((e) => d(e));
      let f = o[u.indexOf(p) - 1];
      if (void 0 === f && i.cssMode) {
        let e;
        o.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (f = o[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      return (
        void 0 !== f &&
          ((h = a.indexOf(f)),
          h < 0 && (h = n.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((h = h - n.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        i.rewind && n.isBeginning
          ? n.slideTo(n.slides.length - 1, e, t, s)
          : n.slideTo(h, e, t, s)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, s) {
      return this.slideTo(this.activeIndex, e, t, s);
    },
    slideToClosest: function (e = this.params.speed, t = !0, s, n = 0.5) {
      const i = this;
      let r = i.activeIndex;
      const o = Math.min(i.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / i.params.slidesPerGroup),
        l = i.rtlTranslate ? i.translate : -i.translate;
      if (l >= i.snapGrid[a]) {
        const e = i.snapGrid[a];
        l - e > (i.snapGrid[a + 1] - e) * n && (r += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[a - 1];
        l - e <= (i.snapGrid[a] - e) * n && (r -= i.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, i.slidesGrid.length - 1)),
        i.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        n =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(kt(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - n / 2 ||
              r > e.slides.length - e.loopedSlides + n / 2
              ? (e.loopFix(),
                (r = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                Pt(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - n
            ? (e.loopFix(),
              (r = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              Pt(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const Ut = {
    loopCreate: function () {
      const e = this,
        t = wt(),
        { params: s, $wrapperEl: n } = e,
        i = n.children().length > 0 ? kt(n.children()[0].parentNode) : n;
      i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let r = i.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let n = 0; n < e; n += 1) {
            const e = kt(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            i.append(e);
          }
          r = i.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
      const o = [],
        a = [];
      r.each((t, s) => {
        const n = kt(t);
        s < e.loopedSlides && a.push(t),
          s < r.length && s >= r.length - e.loopedSlides && o.push(t),
          n.attr("data-swiper-slide-index", s);
      });
      for (let e = 0; e < a.length; e += 1)
        i.append(kt(a[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        i.prepend(kt(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: n,
        allowSlidePrev: i,
        allowSlideNext: r,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -o[t] - e.getTranslate();
      if (t < n) {
        (l = s.length - 3 * n + t), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      } else if (t >= s.length - n) {
        (l = -s.length + t + n), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function Kt(e) {
    const t = this,
      s = wt(),
      n = Ct(),
      i = t.touchEventsData,
      { params: r, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = kt(l.target);
    if ("wrapper" === r.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((i.isTouchEvent = "touchstart" === l.type),
      !i.isTouchEvent && "which" in l && 3 === l.which)
    )
      return;
    if (!i.isTouchEvent && "button" in l && l.button > 0) return;
    if (i.isTouched && i.isMoved) return;
    !!r.noSwipingClass &&
      "" !== r.noSwipingClass &&
      l.target &&
      l.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = kt(e.path[0]));
    const d = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      p = !(!l.target || !l.target.shadowRoot);
    if (
      r.noSwiping &&
      (p
        ? (function (e, t = this) {
            return (function t(s) {
              return s && s !== wt() && s !== Ct()
                ? (s.assignedSlot && (s = s.assignedSlot),
                  s.closest(e) || t(s.getRootNode().host))
                : null;
            })(t);
          })(d, l.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const u = o.currentX,
      f = o.currentY,
      h = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (h && (u <= m || u >= n.innerWidth - m)) {
      if ("prevent" !== h) return;
      e.preventDefault();
    }
    if (
      (Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = u),
      (o.startY = f),
      (i.touchStartTime = _t()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (i.allowThresholdMove = !1),
      "touchstart" !== l.type)
    ) {
      let e = !0;
      c.is(i.focusableElements) && (e = !1),
        s.activeElement &&
          kt(s.activeElement).is(i.focusableElements) &&
          s.activeElement !== c[0] &&
          s.activeElement.blur();
      const n = e && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !n) ||
        c[0].isContentEditable ||
        l.preventDefault();
    }
    t.emit("touchStart", l);
  }
  function Qt(e) {
    const t = wt(),
      s = this,
      n = s.touchEventsData,
      { params: i, touches: r, rtlTranslate: o, enabled: a } = s;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
      return void (
        n.startMoving &&
        n.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    if (n.isTouchEvent && "touchmove" !== l.type) return;
    const c =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      d = "touchmove" === l.type ? c.pageX : l.pageX,
      p = "touchmove" === l.type ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = d), void (r.startY = p);
    if (!s.allowTouchMove)
      return (
        (s.allowClick = !1),
        void (
          n.isTouched &&
          (Object.assign(r, { startX: d, startY: p, currentX: d, currentY: p }),
          (n.touchStartTime = _t()))
        )
      );
    if (n.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
      if (s.isVertical()) {
        if (
          (p < r.startY && s.translate <= s.maxTranslate()) ||
          (p > r.startY && s.translate >= s.minTranslate())
        )
          return (n.isTouched = !1), void (n.isMoved = !1);
      } else if (
        (d < r.startX && s.translate <= s.maxTranslate()) ||
        (d > r.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      n.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      kt(l.target).is(n.focusableElements)
    )
      return (n.isMoved = !0), void (s.allowClick = !1);
    if (
      (n.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = d), (r.currentY = p);
    const u = r.currentX - r.startX,
      f = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === n.isScrolling) {
      let e;
      (s.isHorizontal() && r.currentY === r.startY) ||
      (s.isVertical() && r.currentX === r.startX)
        ? (n.isScrolling = !1)
        : u * u + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(u))) / Math.PI),
          (n.isScrolling = s.isHorizontal()
            ? e > i.touchAngle
            : 90 - e > i.touchAngle));
    }
    if (
      (n.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === n.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (n.startMoving = !0)),
      n.isScrolling)
    )
      return void (n.isTouched = !1);
    if (!n.startMoving) return;
    (s.allowClick = !1),
      !i.cssMode && l.cancelable && l.preventDefault(),
      i.touchMoveStopPropagation && !i.nested && l.stopPropagation(),
      n.isMoved ||
        (i.loop && !i.cssMode && s.loopFix(),
        (n.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (n.allowMomentumBounce = !1),
        !i.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l)),
      s.emit("sliderMove", l),
      (n.isMoved = !0);
    let h = s.isHorizontal() ? u : f;
    (r.diff = h),
      (h *= i.touchRatio),
      o && (h = -h),
      (s.swipeDirection = h > 0 ? "prev" : "next"),
      (n.currentTranslate = h + n.startTranslate);
    let m = !0,
      g = i.resistanceRatio;
    if (
      (i.touchReleaseOnEdges && (g = 0),
      h > 0 && n.currentTranslate > s.minTranslate()
        ? ((m = !1),
          i.resistance &&
            (n.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + n.startTranslate + h) ** g))
        : h < 0 &&
          n.currentTranslate < s.maxTranslate() &&
          ((m = !1),
          i.resistance &&
            (n.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - n.startTranslate - h) ** g)),
      m && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        n.currentTranslate < n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        n.currentTranslate > n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (n.currentTranslate = n.startTranslate),
      i.threshold > 0)
    ) {
      if (!(Math.abs(h) > i.threshold || n.allowThresholdMove))
        return void (n.currentTranslate = n.startTranslate);
      if (!n.allowThresholdMove)
        return (
          (n.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (n.currentTranslate = n.startTranslate),
          void (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    i.followFinger &&
      !i.cssMode &&
      (((i.freeMode && i.freeMode.enabled && s.freeMode) ||
        i.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        i.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(n.currentTranslate),
      s.setTranslate(n.currentTranslate));
  }
  function Zt(e) {
    const t = this,
      s = t.touchEventsData,
      { params: n, touches: i, rtlTranslate: r, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", l),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    n.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = _t(),
      d = c - s.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        d < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((s.lastClickTime = _t()),
      Pt(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === i.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = n.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      n.cssMode)
    )
      return;
    if (t.params.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? p >= o[e] && p < o[e + t] && ((u = e), (f = o[e + t] - o[e]))
        : p >= o[e] && ((u = e), (f = o[o.length - 1] - o[o.length - 2]));
    }
    const h = (p - o[u]) / f,
      m = u < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (d > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (h >= n.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (h > 1 - n.longSwipesRatio ? t.slideTo(u + m) : t.slideTo(u));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(u + m)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(u + m),
          "prev" === t.swipeDirection && t.slideTo(u));
    }
  }
  function Jt() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: n, allowSlidePrev: i, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = n),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function es(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function ts() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: n } = e;
    if (!n) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let ss = !1;
  function ns() {}
  const is = (e, t) => {
    const s = wt(),
      {
        params: n,
        touchEvents: i,
        el: r,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      c = !!n.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== i.start ||
        !l.passiveListener ||
        !n.passiveListeners
      ) && { passive: !0, capture: !1 };
      r[d](i.start, e.onTouchStart, t),
        r[d](
          i.move,
          e.onTouchMove,
          l.passiveListener ? { passive: !1, capture: c } : c
        ),
        r[d](i.end, e.onTouchEnd, t),
        i.cancel && r[d](i.cancel, e.onTouchEnd, t);
    } else
      r[d](i.start, e.onTouchStart, !1),
        s[d](i.move, e.onTouchMove, c),
        s[d](i.end, e.onTouchEnd, !1);
    (n.preventClicks || n.preventClicksPropagation) &&
      r[d]("click", e.onClick, !0),
      n.cssMode && o[d]("scroll", e.onScroll),
      n.updateOnWindowResize
        ? e[p](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Jt,
            !0
          )
        : e[p]("observerUpdate", Jt, !0);
  };
  const rs = {
      attachEvents: function () {
        const e = this,
          t = wt(),
          { params: s, support: n } = e;
        (e.onTouchStart = Kt.bind(e)),
          (e.onTouchMove = Qt.bind(e)),
          (e.onTouchEnd = Zt.bind(e)),
          s.cssMode && (e.onScroll = ts.bind(e)),
          (e.onClick = es.bind(e)),
          n.touch && !ss && (t.addEventListener("touchstart", ns), (ss = !0)),
          is(e, "on");
      },
      detachEvents: function () {
        is(this, "off");
      },
    },
    os = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const as = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: n = 0,
          params: i,
          $el: r,
        } = e,
        o = i.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        c = os(e, i),
        d = os(e, l),
        p = i.enabled;
      c && !d
        ? (r.removeClass(
            `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (r.addClass(`${i.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === i.grid.fill)) &&
            r.addClass(`${i.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = l.direction && l.direction !== i.direction,
        f = i.loop && (l.slidesPerView !== i.slidesPerView || u);
      u && s && e.changeDirection(), It(e.params, l);
      const h = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !h ? e.disable() : !p && h && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", l),
        f &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - n + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t = "window", s) {
      if (!e || ("container" === t && !s)) return;
      let n = !1;
      const i = Ct(),
        r = "window" === t ? i.innerHeight : s.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: r * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: r, value: a } = o[e];
        "window" === t
          ? i.matchMedia(`(min-width: ${a}px)`).matches && (n = r)
          : a <= s.clientWidth && (n = r);
      }
      return n || "max";
    },
  };
  const ls = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: n, $el: i, device: r, support: o } = e,
        a = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((n) => {
                    e[n] && s.push(t + n);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: n },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
          ],
          s.containerModifierClass
        );
      t.push(...a), i.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const cs = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ds(e, t) {
    return function (s = {}) {
      const n = Object.keys(s)[0],
        i = s[n];
      "object" == typeof i && null !== i
        ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
            !0 === e[n] &&
            (e[n] = { auto: !0 }),
          n in e && "enabled" in i
            ? (!0 === e[n] && (e[n] = { enabled: !0 }),
              "object" != typeof e[n] ||
                "enabled" in e[n] ||
                (e[n].enabled = !0),
              e[n] || (e[n] = { enabled: !1 }),
              It(t, s))
            : It(t, s))
        : It(t, s);
    };
  }
  const ps = {
      eventsEmitter: Ft,
      update: Rt,
      translate: Wt,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            { params: n } = s;
          n.cssMode ||
            (n.autoHeight && s.updateAutoHeight(),
            Yt({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            { params: n } = s;
          (s.animating = !1),
            n.cssMode ||
              (s.setTransition(0),
              Yt({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Xt,
      loop: Ut,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"),
            (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: rs,
      breakpoints: as,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: n } = s;
          if (n) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: ls,
      images: {
        loadImage: function (e, t, s, n, i, r) {
          const o = Ct();
          let a;
          function l() {
            r && r();
          }
          kt(e).parent("picture")[0] || (e.complete && i)
            ? l()
            : t
            ? ((a = new o.Image()),
              (a.onload = l),
              (a.onerror = l),
              n && (a.sizes = n),
              s && (a.srcset = s),
              t && (a.src = t))
            : l();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const n = e.imagesToLoad[s];
            e.loadImage(
              n,
              n.currentSrc || n.getAttribute("src"),
              n.srcset || n.getAttribute("srcset"),
              n.sizes || n.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    us = {};
  class fs {
    constructor(...e) {
      let t, s;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (s = e[0])
          : ([t, s] = e),
        s || (s = {}),
        (s = It({}, s)),
        t && !s.el && (s.el = t),
        s.el && kt(s.el).length > 1)
      ) {
        const e = [];
        return (
          kt(s.el).each((t) => {
            const n = It({}, s, { el: t });
            e.push(new fs(n));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = Ht()),
        (n.device = Vt({ userAgent: s.userAgent })),
        (n.browser = Gt()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
      const i = {};
      n.modules.forEach((e) => {
        e({
          swiper: n,
          extendParams: ds(s, i),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const r = It({}, cs, i);
      return (
        (n.params = It({}, r, us, s)),
        (n.originalParams = It({}, n.params)),
        (n.passedParams = It({}, s)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        (n.$ = kt),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: t,
          classNames: [],
          slides: kt(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (n.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (n.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              n.support.touch || !n.params.simulateTouch
                ? n.touchEventsTouch
                : n.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: _t(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const n = s.minTranslate(),
        i = (s.maxTranslate() - n) * e + n;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const n = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: n }), e.emit("_slideClass", s, n);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: n,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (s.centeredSlides) {
        let e,
          t = n[a].swiperSlideSize;
        for (let s = a + 1; s < n.length; s += 1)
          n[s] &&
            !e &&
            ((t += n[s].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let s = a - 1; s >= 0; s -= 1)
          n[s] &&
            !e &&
            ((t += n[s].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < n.length; e += 1) {
          (t ? i[e] + r[e] - i[a] < o : i[e] - i[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          i[a] - i[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function n() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (n(), e.params.autoHeight && e.updateAutoHeight())
          : ((i =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            i || n()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        n = s.params.direction;
      return (
        e || (e = "horizontal" === n ? "vertical" : "horizontal"),
        e === n ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${n}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = kt(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const n = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let i = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = kt(e.shadowRoot.querySelector(n()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children(n());
      })();
      if (0 === i.length && t.params.createElements) {
        const e = wt().createElement("div");
        (i = kt(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            i.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: i,
          wrapperEl: i[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === i.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const s = this,
        { params: n, $el: i, $wrapperEl: r, slides: o } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          n.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttr("style"),
            r.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    n.slideVisibleClass,
                    n.slideActiveClass,
                    n.slideNextClass,
                    n.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      It(us, e);
    }
    static get extendedDefaults() {
      return us;
    }
    static get defaults() {
      return cs;
    }
    static installModule(e) {
      fs.prototype.__modules__ || (fs.prototype.__modules__ = []);
      const t = fs.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => fs.installModule(e)), fs)
        : (fs.installModule(e), fs);
    }
  }
  Object.keys(ps).forEach((e) => {
    Object.keys(ps[e]).forEach((t) => {
      fs.prototype[t] = ps[e][t];
    });
  }),
    fs.use([
      function ({ swiper: e, on: t, emit: s }) {
        const n = Ct();
        let i = null;
        const r = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (s("beforeResize"), s("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== n.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((i = new ResizeObserver((t) => {
                const { width: s, height: n } = e;
                let i = s,
                  o = n;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: s, target: n }) => {
                    (n && n !== e.el) ||
                      ((i = s ? s.width : (t[0] || t).inlineSize),
                      (o = s ? s.height : (t[0] || t).blockSize));
                  }
                ),
                  (i === s && o === n) || r();
              })),
              i.observe(e.el))
            : (n.addEventListener("resize", r),
              n.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
              n.removeEventListener("resize", r),
              n.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: s, emit: n }) {
        const i = [],
          r = Ct(),
          o = (e, t = {}) => {
            const s = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(t)
                  : r.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              i.push(s);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          s("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) o(t[e]);
              }
              o(e.$el[0], { childList: e.params.observeSlideChildren }),
                o(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          s("destroy", () => {
            i.forEach((e) => {
              e.disconnect();
            }),
              i.splice(0, i.length);
          });
      },
    ]);
  const hs = fs;
  function ms(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function gs({ swiper: e, extendParams: t, on: s, emit: n }) {
    const i = "swiper-pagination";
    let r;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${i}-bullet`,
        bulletActiveClass: `${i}-bullet-active`,
        modifierClass: `${i}-`,
        currentClass: `${i}-current`,
        totalClass: `${i}-total`,
        hiddenClass: `${i}-hidden`,
        progressbarFillClass: `${i}-progressbar-fill`,
        progressbarOppositeClass: `${i}-progressbar-opposite`,
        clickableClass: `${i}-clickable`,
        lockClass: `${i}-lock`,
        horizontalClass: `${i}-horizontal`,
        verticalClass: `${i}-vertical`,
      },
    }),
      (e.pagination = { el: null, $el: null, bullets: [] });
    let o = 0;
    function a() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        !e.pagination.$el ||
        0 === e.pagination.$el.length
      );
    }
    function l(t, s) {
      const { bulletActiveClass: n } = e.params.pagination;
      t[s]().addClass(`${n}-${s}`)[s]().addClass(`${n}-${s}-${s}`);
    }
    function c() {
      const t = e.rtl,
        s = e.params.pagination;
      if (a()) return;
      const i =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        c = e.pagination.$el;
      let d;
      const p = e.params.loop
        ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      if (
        (e.params.loop
          ? ((d = Math.ceil(
              (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
            )),
            d > i - 1 - 2 * e.loopedSlides && (d -= i - 2 * e.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== e.params.paginationType && (d = p + d))
          : (d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
        "bullets" === s.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const n = e.pagination.bullets;
        let i, a, p;
        if (
          (s.dynamicBullets &&
            ((r = n.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            c.css(
              e.isHorizontal() ? "width" : "height",
              r * (s.dynamicMainBullets + 4) + "px"
            ),
            s.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((o += d - (e.previousIndex - e.loopedSlides || 0)),
              o > s.dynamicMainBullets - 1
                ? (o = s.dynamicMainBullets - 1)
                : o < 0 && (o = 0)),
            (i = Math.max(d - o, 0)),
            (a = i + (Math.min(n.length, s.dynamicMainBullets) - 1)),
            (p = (a + i) / 2)),
          n.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${s.bulletActiveClass}${e}`)
              .join(" ")
          ),
          c.length > 1)
        )
          n.each((e) => {
            const t = kt(e),
              n = t.index();
            n === d && t.addClass(s.bulletActiveClass),
              s.dynamicBullets &&
                (n >= i && n <= a && t.addClass(`${s.bulletActiveClass}-main`),
                n === i && l(t, "prev"),
                n === a && l(t, "next"));
          });
        else {
          const t = n.eq(d),
            r = t.index();
          if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
            const t = n.eq(i),
              o = n.eq(a);
            for (let e = i; e <= a; e += 1)
              n.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (e.params.loop)
              if (r >= n.length) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                  n.eq(n.length - e).addClass(`${s.bulletActiveClass}-main`);
                n.eq(n.length - s.dynamicMainBullets - 1).addClass(
                  `${s.bulletActiveClass}-prev`
                );
              } else l(t, "prev"), l(o, "next");
            else l(t, "prev"), l(o, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(n.length, s.dynamicMainBullets + 4),
            o = (r * i - r) / 2 - p * r,
            a = t ? "right" : "left";
          n.css(e.isHorizontal() ? a : "top", `${o}px`);
        }
      }
      if (
        ("fraction" === s.type &&
          (c.find(ms(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
          c.find(ms(s.totalClass)).text(s.formatFractionTotal(p))),
        "progressbar" === s.type)
      ) {
        let t;
        t = s.progressbarOpposite
          ? e.isHorizontal()
            ? "vertical"
            : "horizontal"
          : e.isHorizontal()
          ? "horizontal"
          : "vertical";
        const n = (d + 1) / p;
        let i = 1,
          r = 1;
        "horizontal" === t ? (i = n) : (r = n),
          c
            .find(ms(s.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`)
            .transition(e.params.speed);
      }
      "custom" === s.type && s.renderCustom
        ? (c.html(s.renderCustom(e, d + 1, p)), n("paginationRender", c[0]))
        : n("paginationUpdate", c[0]),
        e.params.watchOverflow &&
          e.enabled &&
          c[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function d() {
      const t = e.params.pagination;
      if (a()) return;
      const s =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        i = e.pagination.$el;
      let r = "";
      if ("bullets" === t.type) {
        let n = e.params.loop
          ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.loop &&
          n > s &&
          (n = s);
        for (let s = 0; s < n; s += 1)
          t.renderBullet
            ? (r += t.renderBullet.call(e, s, t.bulletClass))
            : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        i.html(r), (e.pagination.bullets = i.find(ms(t.bulletClass)));
      }
      "fraction" === t.type &&
        ((r = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        i.html(r)),
        "progressbar" === t.type &&
          ((r = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
          i.html(r)),
        "custom" !== t.type && n("paginationRender", e.pagination.$el[0]);
    }
    function p() {
      e.params.pagination = (function (e, t, s, n) {
        const i = wt();
        return (
          e.params.createElements &&
            Object.keys(n).forEach((r) => {
              if (!s[r] && !0 === s.auto) {
                let o = e.$el.children(`.${n[r]}`)[0];
                o ||
                  ((o = i.createElement("div")),
                  (o.className = n[r]),
                  e.$el.append(o)),
                  (s[r] = o),
                  (t[r] = o);
              }
            }),
          s
        );
      })(e, e.originalParams.pagination, e.params.pagination, {
        el: "swiper-pagination",
      });
      const t = e.params.pagination;
      if (!t.el) return;
      let s = kt(t.el);
      0 !== s.length &&
        (e.params.uniqueNavElements &&
          "string" == typeof t.el &&
          s.length > 1 &&
          ((s = e.$el.find(t.el)),
          s.length > 1 &&
            (s = s.filter((t) => kt(t).parents(".swiper")[0] === e.el))),
        "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
        s.addClass(t.modifierClass + t.type),
        s.addClass(t.modifierClass + e.params.direction),
        "bullets" === t.type &&
          t.dynamicBullets &&
          (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
          (o = 0),
          t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
        "progressbar" === t.type &&
          t.progressbarOpposite &&
          s.addClass(t.progressbarOppositeClass),
        t.clickable &&
          s.on("click", ms(t.bulletClass), function (t) {
            t.preventDefault();
            let s = kt(this).index() * e.params.slidesPerGroup;
            e.params.loop && (s += e.loopedSlides), e.slideTo(s);
          }),
        Object.assign(e.pagination, { $el: s, el: s[0] }),
        e.enabled || s.addClass(t.lockClass));
    }
    function u() {
      const t = e.params.pagination;
      if (a()) return;
      const s = e.pagination.$el;
      s.removeClass(t.hiddenClass),
        s.removeClass(t.modifierClass + t.type),
        s.removeClass(t.modifierClass + e.params.direction),
        e.pagination.bullets &&
          e.pagination.bullets.removeClass &&
          e.pagination.bullets.removeClass(t.bulletActiveClass),
        t.clickable && s.off("click", ms(t.bulletClass));
    }
    s("init", () => {
      p(), d(), c();
    }),
      s("activeIndexChange", () => {
        (e.params.loop || void 0 === e.snapIndex) && c();
      }),
      s("snapIndexChange", () => {
        e.params.loop || c();
      }),
      s("slidesLengthChange", () => {
        e.params.loop && (d(), c());
      }),
      s("snapGridLengthChange", () => {
        e.params.loop || (d(), c());
      }),
      s("destroy", () => {
        u();
      }),
      s("enable disable", () => {
        const { $el: t } = e.pagination;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.pagination.lockClass
          );
      }),
      s("lock unlock", () => {
        c();
      }),
      s("click", (t, s) => {
        const i = s.target,
          { $el: r } = e.pagination;
        if (
          e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          r.length > 0 &&
          !kt(i).hasClass(e.params.pagination.bulletClass)
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && i === e.navigation.nextEl) ||
              (e.navigation.prevEl && i === e.navigation.prevEl))
          )
            return;
          const t = r.hasClass(e.params.pagination.hiddenClass);
          n(!0 === t ? "paginationShow" : "paginationHide"),
            r.toggleClass(e.params.pagination.hiddenClass);
        }
      }),
      Object.assign(e.pagination, {
        render: d,
        update: c,
        init: p,
        destroy: u,
      });
  }
  function vs({ swiper: e, extendParams: t, on: s }) {
    t({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let n = !1,
      i = !1;
    function r() {
      const t = e.thumbs.swiper;
      if (!t) return;
      const s = t.clickedIndex,
        n = t.clickedSlide;
      if (n && kt(n).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
      if (null == s) return;
      let i;
      if (
        ((i = t.params.loop
          ? parseInt(kt(t.clickedSlide).attr("data-swiper-slide-index"), 10)
          : s),
        e.params.loop)
      ) {
        let t = e.activeIndex;
        e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
          (e.loopFix(),
          (e._clientLeft = e.$wrapperEl[0].clientLeft),
          (t = e.activeIndex));
        const s = e.slides
            .eq(t)
            .prevAll(`[data-swiper-slide-index="${i}"]`)
            .eq(0)
            .index(),
          n = e.slides
            .eq(t)
            .nextAll(`[data-swiper-slide-index="${i}"]`)
            .eq(0)
            .index();
        i = void 0 === s ? n : void 0 === n ? s : n - t < t - s ? n : s;
      }
      e.slideTo(i);
    }
    function o() {
      const { thumbs: t } = e.params;
      if (n) return !1;
      n = !0;
      const s = e.constructor;
      if (t.swiper instanceof s)
        (e.thumbs.swiper = t.swiper),
          Object.assign(e.thumbs.swiper.originalParams, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
          Object.assign(e.thumbs.swiper.params, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          });
      else if (Dt(t.swiper)) {
        const n = Object.assign({}, t.swiper);
        Object.assign(n, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
          (e.thumbs.swiper = new s(n)),
          (i = !0);
      }
      return (
        e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
        e.thumbs.swiper.on("tap", r),
        !0
      );
    }
    function a(t) {
      const s = e.thumbs.swiper;
      if (!s) return;
      const n =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView,
        i = e.params.thumbs.autoScrollOffset,
        r = i && !s.params.loop;
      if (e.realIndex !== s.realIndex || r) {
        let o,
          a,
          l = s.activeIndex;
        if (s.params.loop) {
          s.slides.eq(l).hasClass(s.params.slideDuplicateClass) &&
            (s.loopFix(),
            (s._clientLeft = s.$wrapperEl[0].clientLeft),
            (l = s.activeIndex));
          const t = s.slides
              .eq(l)
              .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
              .eq(0)
              .index(),
            n = s.slides
              .eq(l)
              .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
              .eq(0)
              .index();
          (o =
            void 0 === t
              ? n
              : void 0 === n
              ? t
              : n - l == l - t
              ? s.params.slidesPerGroup > 1
                ? n
                : l
              : n - l < l - t
              ? n
              : t),
            (a = e.activeIndex > e.previousIndex ? "next" : "prev");
        } else (o = e.realIndex), (a = o > e.previousIndex ? "next" : "prev");
        r && (o += "next" === a ? i : -1 * i),
          s.visibleSlidesIndexes &&
            s.visibleSlidesIndexes.indexOf(o) < 0 &&
            (s.params.centeredSlides
              ? (o =
                  o > l ? o - Math.floor(n / 2) + 1 : o + Math.floor(n / 2) - 1)
              : o > l && s.params.slidesPerGroup,
            s.slideTo(o, t ? 0 : void 0));
      }
      let o = 1;
      const a = e.params.thumbs.slideThumbActiveClass;
      if (
        (e.params.slidesPerView > 1 &&
          !e.params.centeredSlides &&
          (o = e.params.slidesPerView),
        e.params.thumbs.multipleActiveThumbs || (o = 1),
        (o = Math.floor(o)),
        s.slides.removeClass(a),
        s.params.loop || (s.params.virtual && s.params.virtual.enabled))
      )
        for (let t = 0; t < o; t += 1)
          s.$wrapperEl
            .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
            .addClass(a);
      else
        for (let t = 0; t < o; t += 1) s.slides.eq(e.realIndex + t).addClass(a);
    }
    (e.thumbs = { swiper: null }),
      s("beforeInit", () => {
        const { thumbs: t } = e.params;
        t && t.swiper && (o(), a(!0));
      }),
      s("slideChange update resize observerUpdate", () => {
        e.thumbs.swiper && a();
      }),
      s("setTransition", (t, s) => {
        const n = e.thumbs.swiper;
        n && n.setTransition(s);
      }),
      s("beforeDestroy", () => {
        const t = e.thumbs.swiper;
        t && i && t && t.destroy();
      }),
      Object.assign(e.thumbs, { init: o, update: a });
  }
  window.addEventListener("load", function (e) {
    !(function () {
      if (document.querySelector(".swiper")) {
        const e = new hs(".product-gallery__thumbs", {
          modules: [gs],
          effect: "fade",
          observer: !0,
          observeParents: !0,
          slidesPerView: 4,
          spaceBetween: 27,
          speed: 800,
          pagination: {
            el: ".product-gallery__thumbs-pagination",
            clickable: !0,
          },
          breakpoints: {
            0: { slidesPerView: 3, spaceBetween: 10, autoHeight: !0 },
            768: { slidesPerView: 4, spaceBetween: 27 },
          },
          on: {},
        });
        new hs(".product-gallery__preview", {
          modules: [vs],
          effect: "fade",
          observer: !0,
          loop: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 30,
          speed: 800,
          thumbs: { swiper: e },
        });
      }
    })();
  });
  let bs = !1;
  function ys(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (bs) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (ys.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          n = {};
        (n.element = t), (n.parent = t.parentNode);
        let i = t;
        for (; !i.querySelector(s[0].trim()); ) i = i.parentElement;
        (n.destination = i.querySelector(s[0].trim())),
          (n.breakpoint = s[1] ? s[1].trim() : "767"),
          (n.place = s[2] ? s[2].trim() : "last"),
          (n.index = this.indexInParent(n.parent, n.element)),
          this.оbjects.push(n);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          n = String.prototype.split.call(s, ","),
          i = window.matchMedia(n[0]),
          r = n[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        i.addListener(function () {
          e.mediaHandler(i, o);
        }),
          this.mediaHandler(i, o);
      }
    }),
    (ys.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (ys.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (ys.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (ys.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (ys.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  var ws;
  new ys("max").init(),
    (ws = function () {
      function e(e) {
        var t = !0,
          s = !1,
          n = null,
          i = {
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
        function r(e) {
          return !!(
            e &&
            e !== document &&
            "HTML" !== e.nodeName &&
            "BODY" !== e.nodeName &&
            "classList" in e &&
            "contains" in e.classList
          );
        }
        function o(e) {
          e.classList.contains("focus-visible") ||
            (e.classList.add("focus-visible"),
            e.setAttribute("data-focus-visible-added", ""));
        }
        function a(e) {
          t = !1;
        }
        function l() {
          document.addEventListener("mousemove", c),
            document.addEventListener("mousedown", c),
            document.addEventListener("mouseup", c),
            document.addEventListener("pointermove", c),
            document.addEventListener("pointerdown", c),
            document.addEventListener("pointerup", c),
            document.addEventListener("touchmove", c),
            document.addEventListener("touchstart", c),
            document.addEventListener("touchend", c);
        }
        function c(e) {
          (e.target.nodeName && "html" === e.target.nodeName.toLowerCase()) ||
            ((t = !1),
            document.removeEventListener("mousemove", c),
            document.removeEventListener("mousedown", c),
            document.removeEventListener("mouseup", c),
            document.removeEventListener("pointermove", c),
            document.removeEventListener("pointerdown", c),
            document.removeEventListener("pointerup", c),
            document.removeEventListener("touchmove", c),
            document.removeEventListener("touchstart", c),
            document.removeEventListener("touchend", c));
        }
        document.addEventListener(
          "keydown",
          function (s) {
            s.metaKey ||
              s.altKey ||
              s.ctrlKey ||
              (r(e.activeElement) && o(e.activeElement), (t = !0));
          },
          !0
        ),
          document.addEventListener("mousedown", a, !0),
          document.addEventListener("pointerdown", a, !0),
          document.addEventListener("touchstart", a, !0),
          document.addEventListener(
            "visibilitychange",
            function (e) {
              "hidden" === document.visibilityState && (s && (t = !0), l());
            },
            !0
          ),
          l(),
          e.addEventListener(
            "focus",
            function (e) {
              var s, n, a;
              r(e.target) &&
                (t ||
                  ((n = (s = e.target).type),
                  ("INPUT" === (a = s.tagName) && i[n] && !s.readOnly) ||
                    ("TEXTAREA" === a && !s.readOnly) ||
                    s.isContentEditable)) &&
                o(e.target);
            },
            !0
          ),
          e.addEventListener(
            "blur",
            function (e) {
              var t;
              r(e.target) &&
                (e.target.classList.contains("focus-visible") ||
                  e.target.hasAttribute("data-focus-visible-added")) &&
                ((s = !0),
                window.clearTimeout(n),
                (n = window.setTimeout(function () {
                  s = !1;
                }, 100)),
                (t = e.target).hasAttribute("data-focus-visible-added") &&
                  (t.classList.remove("focus-visible"),
                  t.removeAttribute("data-focus-visible-added")));
            },
            !0
          ),
          e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host
            ? e.host.setAttribute("data-js-focus-visible", "")
            : e.nodeType === Node.DOCUMENT_NODE &&
              (document.documentElement.classList.add("js-focus-visible"),
              document.documentElement.setAttribute(
                "data-js-focus-visible",
                ""
              ));
      }
      if ("undefined" != typeof window && "undefined" != typeof document) {
        var t;
        window.applyFocusVisiblePolyfill = e;
        try {
          t = new CustomEvent("focus-visible-polyfill-ready");
        } catch (e) {
          (t = document.createEvent("CustomEvent")).initCustomEvent(
            "focus-visible-polyfill-ready",
            !1,
            !1,
            {}
          );
        }
        window.dispatchEvent(t);
      }
      "undefined" != typeof document && e(document);
    }),
    "object" == typeof exports && "undefined" != typeof module
      ? ws()
      : "function" == typeof define && define.amd
      ? define(ws)
      : ws();
  const Ss = getComputedStyle(document.documentElement),
    Cs = Ss.getPropertyValue("--menu-breakpoint"),
    Es = Ss.getPropertyValue("--transition-duration"),
    xs = Ss.getPropertyValue("--transition-function");
  new ResizeObserver((e) => {
    const t = Math.floor(e[0].contentRect.width),
      s = document.querySelector(".menu__body");
    s.style.removeProperty("transition"),
      t <= Cs &&
        (s.style.removeProperty("transition"),
        setTimeout(() => {
          s.style.setProperty("transition", `transform ${Es}ms ${xs}`);
        }, Es));
  }).observe(document.body);
  const Ts = (e) => {
      const t = document.querySelector(".inventory__cards-wrapper"),
        s = document.createElement("div");
      (s.classList = "inventory__cards container"),
        s.setAttribute("data-category", e);
      const n = (e, t) => {
          const { id: s, img: n, title: i, price: r } = t;
          let o = `\n         <article class="inventory__card card">\n            <header class="card__header">\n               <a class="card__link" href="#">\n                  <picture>\n                     <source class="card__img" srcset="${n}.webp" type="image/webp">\n                     <img class="card__img" src="${n}.jpg" alt="${i}">\n                  </picture>\n               </a>\n               <a class="card__shopping" href="cart.html">\n                  <img aria-hidden="true" src="img/icons/cart.svg" alt="Перейти в корзину">\n               </a>\n               <button class="card__button btn-reset button-style">\n                  В корзину\n               </button>\n            </header>\n            <div class="card__body">\n               <h3 class="card__title m-0">\n                  ${i}\n               </h3>\n            </div>\n            <footer class="card__footer">\n               <strong class="card__price">\n                  ${r}\n               </strong>\n      `;
          t.hasOwnProperty("discount")
            ? (o += `\n                  <s class="card__discount">\n                     ${t.discount}\n                  </s>\n               </footer>\n            </article>\n         `)
            : (o +=
                "\n               </footer>\n            </article>\n         "),
            e.insertAdjacentHTML("beforeend", o);
        },
        i = (i) => {
          const r = i[e],
            o = r.limit,
            a = r.cards,
            l = a.length;
          for (let e = 0; e < Math.min(l, o); ++e) n(s, a[e]);
          ((t, n) => {
            t > n &&
              s.insertAdjacentHTML(
                "beforeend",
                `\n               <button class="inventory__load-more btn-reset" data-load="${e}">\n                  загрузить ещё\n               </button>\n               `
              );
          })(l, o),
            t.append(s),
            ((e, t, i) => {
              const r = s.querySelector(".inventory__load-more");
              if (r) {
                const s = r.parentElement;
                r.addEventListener("click", (o) => {
                  for (let r = t; r < i; ++r) n(s, e[r]);
                  s.removeChild(r);
                });
              }
            })(a, o, l);
        };
      fetch("resources/inventory.json")
        .then((e) => e.json())
        .then((e) => {
          i(e);
        })
        .catch((e) => {
          console.log("No data for this category was found");
        });
    },
    Os = document.querySelector(".inventory__taglist"),
    As = document.querySelectorAll(".inventory__tag");
  Os?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.classList.contains("inventory__tag")) {
      const e = t.getAttribute("data-tagname");
      t.hasAttribute("data-selected")
        ? (t.removeAttribute("data-selected"),
          ((e) => {
            const t = document.querySelector(".inventory__cards-wrapper"),
              s = t.querySelector(`[data-category="${e}"]`);
            s && t.removeChild(s);
          })(e))
        : (t.setAttribute("data-selected", "true"), Ts(e));
    }
  }),
    As?.forEach((e) => {
      const t = e.getAttribute("data-tagname");
      e.hasAttribute("data-selected") && t && Ts(t);
    }),
    (window.FLS = !1),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    l &&
      l.addEventListener("click", function (e) {
        i && (r(), document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length) {
        function e() {
          let e = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${e}px`);
        }
        window.addEventListener("resize", e), e();
      }
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && gt.validateInput(t));
        });
    })(),
    (function (t) {
      e.popup && e.popup.open("some");
      const s = document.forms;
      if (s.length)
        for (const e of s)
          e.addEventListener("submit", function (e) {
            n(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              gt.formClean(t);
            });
      async function n(e, s) {
        if (0 === (t ? gt.getErrors(e) : 0)) {
          if (e.hasAttribute("data-ajax")) {
            s.preventDefault();
            const t = e.getAttribute("action")
                ? e.getAttribute("action").trim()
                : "#",
              n = e.getAttribute("method")
                ? e.getAttribute("method").trim()
                : "GET",
              r = new FormData(e);
            e.classList.add("_sending");
            const o = await fetch(t, { method: n, body: r });
            if (o.ok) {
              await o.json();
              e.classList.remove("_sending"), i(e);
            } else alert("Ошибка"), e.classList.remove("_sending");
          } else e.hasAttribute("data-dev") && (s.preventDefault(), i(e));
        } else {
          s.preventDefault();
          const t = e.querySelector("._form-error");
          t && e.hasAttribute("data-goto-error") && (d(t, !0, 1e3), t.focus());
        }
      }
      function i(t) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: t } })
        ),
          setTimeout(() => {
            if (e.popup) {
              const s = t.dataset.popupMessage;
              s && e.popup.open(s);
            }
          }, 0),
          gt.formClean(t),
          c(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    document.addEventListener("click", function (e) {
      let t = e.target;
      if (t.closest(".quantity__button")) {
        let e = parseInt(t.closest(".quantity").querySelector("input").value);
        t.classList.contains("quantity__button_plus")
          ? e++
          : (--e, e < 1 && (e = 1)),
          (t.closest(".quantity").querySelector("input").value = e);
      }
    });
})();

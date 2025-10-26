import { _ as re } from "./CQhFFXX-.js";
import { g as N, a as L, c as ie, s as le, _ as ce } from "./Pwuf4RdA.js";
import {
  e as V,
  r as h,
  g as Y,
  m as K,
  j as Q,
  p as x,
  q as P,
  f as C,
  h as ue,
  i as de,
  s as ve,
  u as me,
  c as p,
  a as e,
  k as U,
  v as D,
  l as F,
  b as k,
  n as O,
  t as I,
  w as R,
  T as j,
  x as he,
  y as _e,
  o as v,
  d as pe,
  F as fe,
  z as be,
} from "#entry";
import { s as we } from "./BforuV57.js";
function ge(n) {
  const u = V(),
    d = h(null),
    o = h(!1),
    c = h(null);
  function r() {
    return n.chainId ? N(n.chainId) : u.chainId ? N(u.chainId) : le;
  }
  async function _() {
    ((o.value = !0), (c.value = null));
    try {
      const w = r();
      if (!w) throw new Error("Unable to determine chain for reading");
      const i = L(w),
        f = await we(i, {
          address: n.address,
          abi: n.abi,
          functionName: n.functionName,
          args: n.args,
        });
      d.value = f;
    } catch (w) {
      const i = x(w);
      ((c.value = i), console.error("Contract read failed:", i));
    } finally {
      o.value = !1;
    }
  }
  async function g() {
    await _();
  }
  return (
    Y(
      () => [
        u.chainId,
        n.address,
        n.functionName,
        n.chainId,
        ...(n.args || []),
      ],
      () => {
        _();
      },
      { immediate: !0 }
    ),
    K(() => {}),
    { data: d, error: c, isLoading: o, refetch: g }
  );
}
function z(n) {
  const u = V(),
    d = Q(),
    o = h(null),
    c = h(!1),
    r = h(!1),
    _ = h(null);
  async function g(i) {
    (u.ensureConnected(),
      (c.value = !0),
      (r.value = !1),
      (_.value = null),
      (o.value = null));
    try {
      const f = N(u.chainId);
      if (!f) throw new Error("Unsupported chain");
      const m = await ie(f).writeContract({
        account: u.address,
        address: n.address,
        abi: n.abi,
        functionName: n.functionName,
        args: i?.args,
        value: i?.value,
        chain: f,
      });
      return (
        (o.value = m),
        (r.value = !0),
        d.showSuccess("Transaction sent", `Hash: ${m.slice(0, 10)}...`),
        m
      );
    } catch (f) {
      const s = x(f);
      throw ((_.value = s), d.showError("Transaction failed", P(s)), s);
    } finally {
      c.value = !1;
    }
  }
  async function w() {
    if (!o.value || !u.chainId)
      throw new Error("No transaction hash to wait for");
    const i = N(u.chainId);
    if (!i) throw new Error("Unsupported chain");
    const f = L(i);
    try {
      const s = await f.waitForTransactionReceipt({ hash: o.value });
      if (s.status === "success")
        return (d.showSuccess("Transaction confirmed"), s);
      throw new Error("Transaction failed");
    } catch (s) {
      const m = x(s);
      throw ((_.value = m), d.showError("Transaction failed", P(m)), m);
    }
  }
  return {
    write: g,
    waitForConfirmation: w,
    hash: o,
    isLoading: c,
    isSuccess: r,
    error: _,
  };
}
function J(n) {
  return {
    eventName: n.eventName ?? "Unknown",
    args: n.args ?? {},
    blockNumber: n.blockNumber ?? BigInt(0),
    transactionHash: n.transactionHash ?? "0x",
    logIndex: n.logIndex ?? 0,
    address: n.address,
  };
}
function q(n) {
  const u = V(),
    d = h([]),
    o = h(!1),
    c = h(null);
  let r = null;
  const _ = C(() => {
    const s = n.enabled;
    return typeof s == "boolean" ? s : s && "value" in s ? s.value : !0;
  });
  function g() {
    if (!(!u.chainId || !_.value))
      try {
        const s = N(u.chainId);
        if (!s) throw new Error("Unsupported chain");
        ((r = L(s).watchContractEvent({
          address: n.address,
          abi: n.abi,
          eventName: n.eventName,
          onLogs: (a) => {
            const b = a.map(J);
            ((d.value = [...b, ...d.value]), n.onLogs && n.onLogs(b));
          },
          onError: (a) => {
            const b = x(a);
            ((c.value = b), console.error("Event listener error:", b));
          },
        })),
          (o.value = !0));
      } catch (s) {
        const m = x(s);
        ((c.value = m), console.error("Failed to start event listener:", m));
      }
  }
  function w() {
    r && (r(), (r = null), (o.value = !1));
  }
  function i() {
    d.value = [];
  }
  async function f(s, m) {
    if (u.chainId)
      try {
        const a = N(u.chainId);
        if (!a) throw new Error("Unsupported chain");
        const B = (
          await L(a).getContractEvents({
            address: n.address,
            abi: n.abi,
            eventName: n.eventName,
            fromBlock: s,
            toBlock: m,
          })
        ).map(J);
        return ((d.value = [...d.value, ...B]), B);
      } catch (a) {
        const b = x(a);
        throw (
          (c.value = b),
          console.error("Failed to fetch past events:", b),
          b
        );
      }
  }
  return (
    Y(
      () => [u.chainId, _.value],
      () => {
        (w(), _.value && g());
      },
      { immediate: !0 }
    ),
    K(() => {
      w();
    }),
    {
      events: d,
      isListening: o,
      error: c,
      startWatching: g,
      stopWatching: w,
      clearEvents: i,
      fetchPastEvents: f,
    }
  );
}
const S = [
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "Decreament",
      type: "event",
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !1,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "Increament",
      type: "event",
    },
    {
      inputs: [],
      name: "decreament",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getValue",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "increament",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  T = "0xE1154A98ca967d28B505D8DF29ebCE3dcB6B7BEe",
  ye = { class: "counter-page" },
  ke = { class: "page-header" },
  Ce = { class: "page-header__content" },
  Ie = { key: 0, class: "page-header__badge" },
  Ee = { key: 1, class: "content-grid" },
  Ne = { class: "counter-card" },
  Se = { class: "counter-card__header" },
  Te = ["disabled"],
  xe = { class: "counter-display" },
  Be = { key: 0, class: "counter-value counter-value--loading" },
  De = { key: 1, class: "counter-value" },
  Le = { class: "counter-number" },
  We = { key: 0, class: "network-warning" },
  Ae = { class: "network-warning__icon" },
  Ue = { class: "counter-actions" },
  Fe = ["disabled"],
  Re = { class: "counter-button__icon" },
  Ve = ["disabled"],
  He = { class: "counter-button__icon" },
  $e = { key: 0, class: "transaction-status" },
  Me = ["href"],
  Pe = { class: "events-card" },
  Oe = { class: "events-card__header" },
  je = ["disabled"],
  ze = { key: 0, class: "network-warning" },
  Je = { class: "network-warning__icon" },
  qe = { key: 1, class: "events-empty" },
  Ge = { key: 2, class: "events-list" },
  Ye = { class: "event-item__content" },
  Ke = { class: "event-item__header" },
  Qe = { class: "event-item__message" },
  Xe = { class: "event-item__meta" },
  Ze = { class: "contract-card" },
  et = { class: "contract-card__header" },
  tt = { class: "contract-info" },
  nt = { class: "contract-info__item" },
  st = { class: "contract-info__value" },
  at = { class: "contract-info__item" },
  ot = { class: "contract-info__value" },
  rt = { class: "abi-section" },
  it = { class: "abi-section__header" },
  lt = { key: 0, class: "abi-code-wrapper" },
  ct = { class: "abi-code" },
  G = 11155111,
  ht = ue({
    __name: "contract",
    setup(n) {
      const { isConnected: u, chainId: d } = de(),
        o = Q(),
        c = h(!1),
        r = h(null),
        _ = h(!1),
        g = h(!1),
        w = C(() => (d.value && N(d.value)?.name) || "Unknown"),
        i = C(() => d.value === G),
        f = C(() => a.value?.isLoading),
        s = C(() => !i.value || c.value || a.value?.isLoading),
        m = C(() => !i.value || c.value || a.value?.isLoading),
        a = h(null);
      ve(() => {
        a.value = ge({
          address: T,
          abi: S,
          functionName: "getValue",
          watch: !1,
          chainId: G,
        });
      });
      const b = z({ address: T, abi: S, functionName: "increament" }),
        W = z({ address: T, abi: S, functionName: "decreament" }),
        B = q({
          address: T,
          abi: S,
          eventName: "Increament",
          enabled: i,
          onLogs: (l) => {
            (o.showSuccess("Counter Incremented!", "Transaction confirmed"),
              a.value?.refetch());
          },
        }),
        H = q({
          address: T,
          abi: S,
          eventName: "Decreament",
          enabled: i,
          onLogs: (l) => {
            (o.showSuccess("Counter Decremented!", "Transaction confirmed"),
              a.value?.refetch());
          },
        }),
        $ = C(() =>
          [...B.events.value, ...H.events.value].sort((l, t) => {
            const A = l.blockNumber || BigInt(0);
            return (t.blockNumber || BigInt(0)) > A ? 1 : -1;
          })
        ),
        X = C(() =>
          r.value ? `${_e().public.blockExplorerUrl}/tx/${r.value}` : "#"
        ),
        M = C(() => JSON.stringify(S, null, 2));
      async function Z() {
        ((c.value = !0), (r.value = null));
        try {
          const l = await b.write();
          l &&
            ((r.value = l),
            o.showInfo("Transaction Submitted", "Waiting for confirmation..."),
            await b.waitForConfirmation(),
            (r.value = null),
            await a.value?.refetch());
        } catch (l) {
          console.error("Increment failed:", l);
        } finally {
          c.value = !1;
        }
      }
      async function ee() {
        ((c.value = !0), (r.value = null));
        try {
          const l = await W.write();
          l &&
            ((r.value = l),
            o.showInfo("Transaction Submitted", "Waiting for confirmation..."),
            await W.waitForConfirmation(),
            (r.value = null),
            await a.value?.refetch());
        } catch (l) {
          console.error("Decrement failed:", l);
        } finally {
          c.value = !1;
        }
      }
      function te(l) {
        return l.args && l.args.message
          ? l.args.message
          : "Counter value updated on blockchain";
      }
      function ne() {
        (B.clearEvents(), H.clearEvents(), o.showInfo("Events Cleared"));
      }
      async function se() {
        (await navigator.clipboard.writeText(M.value),
          (_.value = !0),
          o.showSuccess("ABI copied to clipboard"),
          setTimeout(() => {
            _.value = !1;
          }, 2e3));
      }
      function ae() {
        g.value = !g.value;
      }
      return (
        me({
          title: "Counter - Nuxt DApp",
          meta: [
            {
              name: "description",
              content: "Interact with smart contract counter",
            },
          ],
        }),
        (l, t) => {
          const A = re,
            y = ce;
          return (
            v(),
            p("div", ye, [
              e("div", ke, [
                e("div", Ce, [
                  t[2] ||
                    (t[2] = e(
                      "div",
                      null,
                      [
                        e(
                          "h1",
                          { class: "page-title" },
                          "Smart Contract Counter"
                        ),
                        e(
                          "p",
                          { class: "page-description" },
                          " Interact with the deployed counter contract on the blockchain "
                        ),
                      ],
                      -1
                    )),
                  F(u)
                    ? (v(),
                      p("div", Ie, [
                        ...(t[1] ||
                          (t[1] = [
                            e(
                              "div",
                              {
                                class:
                                  "status-indicator status-indicator--connected",
                              },
                              null,
                              -1
                            ),
                            e("span", null, "Connected", -1),
                          ])),
                      ]))
                    : D("", !0),
                ]),
              ]),
              F(u)
                ? (v(),
                  p("div", Ee, [
                    e("div", Ne, [
                      e("div", Se, [
                        t[4] || (t[4] = e("h2", null, "Current Value", -1)),
                        e(
                          "button",
                          {
                            onClick: t[0] || (t[0] = (E) => a.value.refetch()),
                            class: "icon-button",
                            disabled: f.value,
                          },
                          [
                            (v(),
                            p(
                              "svg",
                              {
                                class: O({ spin: a.value?.isLoading }),
                                width: "20",
                                height: "20",
                                viewBox: "0 0 20 20",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                              [
                                ...(t[3] ||
                                  (t[3] = [
                                    e(
                                      "path",
                                      {
                                        d: "M15.8333 10C15.8333 13.2217 13.2217 15.8333 10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10C4.16667 6.77834 6.77834 4.16667 10 4.16667",
                                        stroke: "currentColor",
                                        "stroke-width": "1.5",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                      },
                                      null,
                                      -1
                                    ),
                                    e(
                                      "path",
                                      {
                                        d: "M13.3333 4.16667H15.8333V6.66667",
                                        stroke: "currentColor",
                                        "stroke-width": "1.5",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                      },
                                      null,
                                      -1
                                    ),
                                  ])),
                              ],
                              2
                            )),
                          ],
                          8,
                          Te
                        ),
                      ]),
                      e("div", xe, [
                        a.value?.isLoading
                          ? (v(),
                            p("div", Be, [
                              ...(t[5] ||
                                (t[5] = [
                                  e("div", { class: "spinner" }, null, -1),
                                ])),
                            ]))
                          : (v(),
                            p("div", De, [
                              e(
                                "span",
                                Le,
                                I(a.value?.data?.toString() || 0),
                                1
                              ),
                            ])),
                      ]),
                      i.value
                        ? D("", !0)
                        : (v(),
                          p("div", We, [
                            e("div", Ae, [k(y, { name: "info" })]),
                            t[6] ||
                              (t[6] = e(
                                "div",
                                { class: "network-warning__content" },
                                [
                                  e("h4", null, "Wrong Network"),
                                  e(
                                    "p",
                                    null,
                                    " This Contract is deployed on Sepolia testnet. Please switch to Sepolia to interact with it. "
                                  ),
                                ],
                                -1
                              )),
                          ])),
                      e("div", Ue, [
                        e(
                          "button",
                          {
                            onClick: ee,
                            disabled: s.value,
                            class: "counter-button counter-button--decrement",
                          },
                          [
                            e("span", Re, [k(y, { name: "minus" })]),
                            t[7] ||
                              (t[7] = e(
                                "span",
                                { class: "counter-button__text" },
                                "Decrement",
                                -1
                              )),
                          ],
                          8,
                          Fe
                        ),
                        e(
                          "button",
                          {
                            onClick: Z,
                            disabled: m.value,
                            class: "counter-button counter-button--increment",
                          },
                          [
                            e("span", He, [k(y, { name: "plus" })]),
                            t[8] ||
                              (t[8] = e(
                                "span",
                                { class: "counter-button__text" },
                                "Increment",
                                -1
                              )),
                          ],
                          8,
                          Ve
                        ),
                      ]),
                      k(
                        j,
                        { name: "fade" },
                        {
                          default: R(() => [
                            r.value
                              ? (v(),
                                p("div", $e, [
                                  t[10] ||
                                    (t[10] = e(
                                      "div",
                                      { class: "transaction-status__content" },
                                      [
                                        e(
                                          "div",
                                          { class: "transaction-status__icon" },
                                          [e("span", { class: "pulse-dot" })]
                                        ),
                                        e(
                                          "div",
                                          { class: "transaction-status__info" },
                                          [
                                            e(
                                              "h4",
                                              null,
                                              "Transaction Pending"
                                            ),
                                            e(
                                              "p",
                                              null,
                                              "Waiting for confirmation..."
                                            ),
                                          ]
                                        ),
                                      ],
                                      -1
                                    )),
                                  e(
                                    "a",
                                    {
                                      href: X.value,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      class: "transaction-status__link",
                                    },
                                    [
                                      t[9] ||
                                        (t[9] = pe(" View on Explorer ", -1)),
                                      k(y, { name: "explore" }),
                                    ],
                                    8,
                                    Me
                                  ),
                                ]))
                              : D("", !0),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    e("div", Pe, [
                      e("div", Oe, [
                        t[11] || (t[11] = e("h2", null, "Recent Events", -1)),
                        e(
                          "button",
                          {
                            onClick: ne,
                            class: "btn-ghost btn-sm",
                            disabled: !i.value,
                          },
                          " Clear All ",
                          8,
                          je
                        ),
                      ]),
                      i.value
                        ? $.value.length === 0
                          ? (v(),
                            p("div", qe, [
                              k(y, { name: "clock" }),
                              t[13] ||
                                (t[13] = e("h4", null, "No Events Yet", -1)),
                              t[14] ||
                                (t[14] = e(
                                  "p",
                                  null,
                                  "Increment or decrement the counter to see blockchain events",
                                  -1
                                )),
                            ]))
                          : (v(),
                            p("div", Ge, [
                              k(
                                he,
                                { name: "list" },
                                {
                                  default: R(() => [
                                    (v(!0),
                                    p(
                                      fe,
                                      null,
                                      be(
                                        $.value.slice(0, 10),
                                        (E, oe) => (
                                          v(),
                                          p(
                                            "div",
                                            {
                                              key: `${E.blockNumber}-${oe}`,
                                              class: "event-item",
                                            },
                                            [
                                              e(
                                                "div",
                                                {
                                                  class: O([
                                                    "event-item__icon",
                                                    `event-item__icon--${E.eventName === "Increament" ? "increment" : "decrement"}`,
                                                  ]),
                                                },
                                                [
                                                  E.eventName === "Increament"
                                                    ? (v(),
                                                      U(y, {
                                                        key: 0,
                                                        name: "increase",
                                                      }))
                                                    : (v(),
                                                      U(y, {
                                                        key: 1,
                                                        name: "decrease",
                                                      })),
                                                ],
                                                2
                                              ),
                                              e("div", Ye, [
                                                e("div", Ke, [
                                                  e(
                                                    "h4",
                                                    null,
                                                    I(
                                                      E.eventName ===
                                                        "Increament"
                                                        ? "Incremented"
                                                        : "Decremented"
                                                    ),
                                                    1
                                                  ),
                                                  t[15] ||
                                                    (t[15] = e(
                                                      "span",
                                                      {
                                                        class:
                                                          "event-item__time",
                                                      },
                                                      "Just now",
                                                      -1
                                                    )),
                                                ]),
                                                e("p", Qe, I(te(E)), 1),
                                                e("div", Xe, [
                                                  e(
                                                    "span",
                                                    null,
                                                    "Block: " +
                                                      I(
                                                        E.blockNumber?.toString()
                                                      ),
                                                    1
                                                  ),
                                                ]),
                                              ]),
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]))
                        : (v(),
                          p("div", ze, [
                            e("div", Je, [k(y, { name: "info" })]),
                            t[12] ||
                              (t[12] = e(
                                "div",
                                { class: "network-warning__content" },
                                [
                                  e("h4", null, "Wrong Network"),
                                  e(
                                    "p",
                                    null,
                                    " This Contract is deployed on Sepolia testnet. Please switch to Sepolia to interact with it. "
                                  ),
                                ],
                                -1
                              )),
                          ])),
                    ]),
                    e("div", Ze, [
                      e("div", et, [
                        t[16] ||
                          (t[16] = e("h2", null, "Contract Details", -1)),
                        e("button", { onClick: se, class: "icon-button" }, [
                          k(y, { name: "copy" }),
                        ]),
                      ]),
                      e("div", tt, [
                        e("div", nt, [
                          t[17] ||
                            (t[17] = e(
                              "span",
                              { class: "contract-info__label" },
                              "Address",
                              -1
                            )),
                          e("code", st, I(F(T)), 1),
                        ]),
                        e("div", at, [
                          t[18] ||
                            (t[18] = e(
                              "span",
                              { class: "contract-info__label" },
                              "Network",
                              -1
                            )),
                          e("span", ot, I(w.value), 1),
                        ]),
                      ]),
                      e("div", rt, [
                        e("div", it, [
                          t[19] || (t[19] = e("h3", null, "Contract ABI", -1)),
                          e(
                            "button",
                            { onClick: ae, class: "btn-ghost btn-sm" },
                            I(g.value ? "Hide" : "Show"),
                            1
                          ),
                        ]),
                        k(
                          j,
                          { name: "slide" },
                          {
                            default: R(() => [
                              g.value
                                ? (v(),
                                  p("div", lt, [e("pre", ct, I(M.value), 1)]))
                                : D("", !0),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                    ]),
                  ]))
                : (v(), U(A, { key: 0 })),
            ])
          );
        }
      );
    },
  });
export { ht as default };

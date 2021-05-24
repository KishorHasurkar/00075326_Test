var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, f, d) {
    a instanceof String && (a = String(a));
    for (var c = a.length, g = 0; g < c; g++) {
        var b = a[g];
        if (f.call(d, b, g, a)) return {
            i: g,
            v: b
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;

$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, f, d) {
    a != Array.prototype && a != Object.prototype && (a[f] = d.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);

$jscomp.polyfill = function(a, f, d, c) {
    if (f) {
        d = $jscomp.global;
        a = a.split(".");
        for (c = 0; c < a.length - 1; c++) {
            var g = a[c];
            g in d || (d[g] = {});
            d = d[g]
        }
        a = a[a.length - 1];
        c = d[a];
        f = f(c);
        f != c && null != f && $jscomp.defineProperty(d, a, {
            configurable: !0,
            writable: !0,
            value: f
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, d) {
        return $jscomp.findInternal(this, a, d).v
    }
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(a) {
    var f = 0;
    return function() {
        return f < a.length ? {
            done: !1,
            value: a[f++]
        } : {
            done: !0
        }
    }
};

$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.SymbolClass = function(a, f) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: f
    })
};
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
};

$jscomp.Symbol = function() {
    function a(d) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (d || "") + "_" + f++, d)
    }
    var f = 0;
    return a
}();

$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
};

$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return a
};

$jscomp.iteratorFromArray = function(a, f) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var d = 0,
        c = {
            next: function() {
                if (d < a.length) {
                    var g = d++;
                    return {
                        value: f(g, a[g]),
                        done: !1
                    }
                }
                c.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return c.next()
            }
        };
    c[Symbol.iterator] = function() {
        return c
    };
    return c
};

(function(a, f) {
    f.clientAccountStatic = {
        getJsonUrl: "/2code/handlers/webservice/get-json.ashx",
        setJsonUrl: "/2code/handlers/webservice/set-json.ashx"
    };
    f.clientAccountStatic.popups = {};
    f.clientAccountStatic.popups.init = function(d) {
        var c, g, b;
        d.find("[data-popup]").each(function() {
            c = a(this).attr("data-popup");
            void 0 != c && (b = a(c), a.each(a(this).data(), function(a, c) {
                g = b.find(".data-" + a);
                void 0 != g && g.html(c)
            }), a.colorbox({
                width: b.attr("data-width") + "px",
                height: b.attr("data-height") + "px",
                inline: !0,
                href: c,
                fixed: !0,

                scrolling: !1
            }), b.find(".close-colorbox").off("click").on("click", function() {
                a.colorbox.close();
                return !1
            }))
        })
    };
    f.clientAccountStatic.popups.open = function(d, c, g) {
        var b = a(d);
        for (var e = 0; e < c.length; e++) {
            var h = c[e];
            var k = h.title;
            h = h.value;
            void 0 != k && void 0 != h && (k = b.find(".data-" + k), void 0 != k && k.html(h));
            b.find(".close-colorbox").off("click").on("click", function() {
                a.colorbox.close();
                return !1
            });
            b.find(".reload").click(function() {
                window.location.reload()
            });
            k = {
                width: b.attr("data-width") + "px",
                height: b.attr("data-height") +

                "px",
                inline: !0,
                href: d,
                fixed: !0,
                scrolling: !1
            };
            "false" === b.attr("data-overlayClose") && (k.overlayClose = !1);
            a.colorbox(a.extend({}, k, g))
        }
    };
    f.clientAccountStatic.popups.initUpgradePopupEvents = function() {
        var d = a("#buy-online-upgrade-popup"),
            c = a("#register-upgrade-popup"),
            g = a("#upgrade-tb"),
            b = a("#upgrade-popup-tb-box"),
            e = a("#upgrade-popup-btn"),
            h = a("#upgrade-tb-err"),
            k = a.trim(a("#upgrade-popup-client").text()),
            f;
        d.change(function() {
            h.text("");
            a(this).get(0).checked && (b.hide(0), g.val(""))
        });
        c.change(function() {
            h.text("");

            a(this).get(0).checked && b.show(0)
        });
        g.click(function() {
            h.text("")
        });
        e.click(function(b) {
            b.preventDefault();
            k = a.trim(a("#upgrade-popup-client").text());
            d.get(0).checked ? window.location.href = "/account/upgrades?productID=" + k : (f = a.trim(g.val()), "" === f ? h.text("This field is required.") : (h.text(""), window.location.href = "/account/upgrades?productID=" + k + "&code=" + f));
            return !1
        })
    };
    f.clientAccountStatic.errors = {
        ok: {
            code: "ERR000",
            msg: ""
        },
        ERR000: {
            msg: ""
        },
        error: {
            code: "ERR001",
            msg: 'An error has occurred. <a href="/contact-orders" title="">Contact the Orders Team</a>.'
        },

        ERR001: {
            msg: 'An error has occurred. <a href="/contact-orders" title="">Contact the Orders Team</a>.'
        },
        invalidSerialID: {
            code: "ERR014",
            msg: "Invalid serial number"
        },
        ERR014: {
            msg: "Invalid serial number"
        },
        serialIDAlreadyUsedInThisAccount: {
            code: "ERR031",
            msg: 'This serial number is already registered in your account. If you have not activated it, <a href="/support/activate" title="">click here</a>.'
        },
        ERR031: {
            msg: 'This serial number is already registered in your account. If you have not activated it, <a href="/support/activate" title="">click here</a>.'
        },

        serialNumberAlreadyRegisteredAnotherAccount: {
            code: "ERR032",
            msg: "This serial number has already been registered to another account."
        },
        ERR032: {
            msg: "This serial number has already been registered to another account."
        },
        ERR033: {
            msg: 'In order to register an upgrade serial, please click the Upgrade link next to your product, and then select "Register your upgrade code / serial number, purchased from a Waves dealer".'
        },
        unknown: {
            msg: 'An error has occurred. Please <a href="/contact-orders" title="">Contact the Orders Team</a>.'
        }
    }
})(jQuery,

global);
(function(a, f) {
    var d = function(c, d, b) {
        c = {
            options: c,
            json: d,
            tabsJson: null,
            isLowerCase: b,
            displayInfo: null,
            architectures: [],
            productTypes: [],
            archAndTypes: []
        };
        d = a.trim(c.json.toString());
        c.isLowerCase && (d = d.toLowerCase());
        d = "" != d ? a.parseJSON(d) : null;
        c.tabsJson = d;
        if (null != c.tabsJson && (d = c.isLowerCase ? "displayinfo" : "DisplayInfo", void 0 != c.tabsJson[d])) {
            c.displayInfo = c.tabsJson[d];
            for (var e in c.displayInfo) if (-1 === a.inArray(e, c.architectures)) {
                c.architectures.push(e);
                void 0 === c.archAndTypes[e] && (c.archAndTypes[e] =

                []);
                for (var h in c.displayInfo[e]) d = parseInt(c.displayInfo[e][h], 10), !isNaN(d) && 0 < d && (c.archAndTypes[e][h] = d, -1 === a.inArray(h, c.productTypes) && c.productTypes.push(h))
            }
        }
        return jQuery.extend(this, c)
    };
    f.clientAccountStatic.tabsJson = function(a, g, b) {
        return new d(a, g, b)
    }
})(jQuery, global);
(function(a, f) {
    f.clientAccountStatic.data = {};
    f.clientAccountStatic.data.enterIlokAccountName = function(d, c, g) {
        d = {
            json: JSON.stringify(c),
            link: "d7a79316-8d6c-4457-b333-58d0bb7a912f",
            domain: d,
            urlParams: ""
        };
        a.ajax({
            url: f.clientAccountStatic.setJsonUrl,
            type: "POST",
            data: d,
            cache: !1
        }).done(function(b) {
            a.isFunction(g) && g(b)
        })
    };
    f.clientAccountStatic.data.getClientProducts = function(d, c, g, b, e) {
        return a.ajax({
            url: f.clientAccountStatic.getJsonUrl,
            dataType: "html",
            type: "GET",
            cache: !1,
            data: {
                domain: d,
                url: "04da8648-b609-409f-9e36-42421213fe4a",

                urlParams: c + "/" + g + "/" + b,
                wcid: c
            }
        }).done(function(c) {
            a.isFunction(e) && e(g, b, c)
        })
    };
    f.clientAccountStatic.data.getDisplayInfo = function(d, c, g) {
        a.ajax({
            url: f.clientAccountStatic.getJsonUrl,
            dataType: "html",
            type: "GET",
            cache: !1,
            data: {
                url: "16be9277-3aa4-4f07-bf54-3a23fe72b2d0",
                domain: d,
                urlParams: c,
                wcid: c
            }
        }).done(function(b) {
            a.isFunction(g) && g(b)
        })
    };
    f.clientAccountStatic.data.getClientSubscriptions = function(d, c, g) {
        a.ajax({
            url: f.clientAccountStatic.getJsonUrl,
            dataType: "html",
            type: "GET",
            cache: !1,
            data: {
                url: "cf442d21-6465-4e44-8644-9727bd630848",

                domain: d,
                urlParams: c,
                wcid: c
            }
        }).done(function(b) {
            a.isFunction(g) && g(b)
        })
    };
    f.clientAccountStatic.data.getRTO = function(d, c, g) {
        a.ajax({
            url: f.clientAccountStatic.getJsonUrl,
            dataType: "html",
            type: "GET",
            cache: !1,
            data: {
                url: "d33ae541-abe6-4b36-a485-9d53b7a1941f",
                domain: d,
                urlParams: c,
                wcid: c
            }
        }).done(function(b) {
            a.isFunction(g) && g(b)
        })
    };
    f.clientAccountStatic.data.cancelSubscription = function(d, c, g, b) {
        a.ajax({
            url: "/2code/handlers/cart/cancel-sbs.aspx?token=" + d.get("token") + "&label=" + d.get("label"),
            dataType: "html",

            type: "GET",
            cache: !1,
            data: {
                orderid: c,
                sbsPlanID: g
            }
        }).done(function(c) {
            a.isFunction(b) && b(c)
        })
    };
    f.clientAccountStatic.data.getAvalibleDemoProducts = function(d, c, g, b) {
        a.ajax({
            url: f.clientAccountStatic.getJsonUrl,
            dataType: "html",
            type: "GET",
            cache: !1,
            data: {
                url: "3542d2d2-6fe1-4208-88cf-ce9ead2eb0a8",
                domain: d,
                urlParams: c,
                wcid: c
            }
        }).done(function(b) {
            a.isFunction(g) && g(b)
        }).fail(function() {
            a.isFunction(b) && b()
        })
    };
    f.clientAccountStatic.data.getStudioRackNativeFree = function(d, c, g, b, e) {
        d = {
            json: JSON.stringify({
                WavesClientId: c,

                CampaignCode: g
            }),
            link: "e8efdad8-c50d-4921-a366-f6e74311c2f3",
            domain: d,
            urlParams: "",
            wcid: c
        };
        a.ajax({
            url: f.clientAccountStatic.setJsonUrl,
            type: "POST",
            data: d,
            cache: !1
        }).done(function(c) {
            null != c && a.isFunction(b) && b(a.parseJSON(c))
        }).fail(function() {
            a.isFunction(e) && e()
        })
    };
    f.clientAccountStatic.data.registerDemoProduct = function(d, c, g, b, e, h) {
        d = {
            json: JSON.stringify({
                WavesClientId: c,
                NonSerializedProductID: g
            }),
            link: "f0fd69f3-c779-4e2e-88d1-09b8a779c232",
            domain: d,
            urlParams: "",
            skuNumber: b,
            wcid: c
        };
        a.ajax({
            url: "/2code/handlers/account/register-demo-product-hanlder.ashx",

            type: "POST",
            data: d,
            cache: !1
        }).done(function(b) {
            null != b && a.isFunction(e) && e(a.parseJSON(b))
        }).fail(function() {
            a.isFunction(h) && h()
        })
    };
    f.clientAccountStatic.data.registerNewProductSerial = function(d, c, g, b, e) {
        d = {
            json: JSON.stringify({
                WavesClientId: c,
                SerialId: g
            }),
            wcid: c,
            link: "03366465-d756-40e1-8dce-be56568178ac",
            domain: d,
            urlParams: ""
        };
        a.ajax({
            url: f.clientAccountStatic.setJsonUrl,
            type: "POST",
            data: d,
            cache: !1
        }).done(function(c) {
            null != c && a.isFunction(b) && b(a.parseJSON(c))
        }).fail(function() {
            a.isFunction(e) &&

            e()
        })
    };
    f.clientAccountStatic.data.updateClientProduct = function(d, c, g, b, e) {
        var h;
        d = {
            json: JSON.stringify(c),
            link: "78b6b536-9efc-41a4-b836-a5aff06484c4",
            domain: d,
            urlParams: ""
        };
        return a.ajax({
            url: f.clientAccountStatic.setJsonUrl,
            type: "POST",
            data: d,
            cache: !1
        }).done(function(e) {
            null != e && a.isFunction(b) && (h = a.extend({}, a.parseJSON(e), c, g), b(h))
        }).fail(function() {
            a.isFunction(e) && e()
        })
    };
    f.clientAccountStatic.data.isCurrentUser = function(d, c) {
        if (-1 !== window.location.href.indexOf("/cms/getdoc/")) c(!0);
        else {
            var g =

            !1,
                b, e = "",
                h = "";
            var k = a('[data-type="security-token"] input');
            var f = a('[data-type="security-label"]');
            0 < k.length && (e = k.val());
            0 < f.length && (h = f.text());
            a.ajax({
                url: "/2code/handlers/account/is-current-user.ashx?id=" + d + "&token=" + e + "&label=" + h,
                type: "GET",
                cache: !1
            }).done(function(e) {
                e && (b = JSON.parse(e), g = !0 === b.isCurrentUser);
                a.isFunction(c) && c(g)
            }).fail(function() {
                a.isFunction(c) && c(!1)
            })
        }
    }
})(jQuery, global);
(function(a, f) {
    f.clientAccountStatic.templates = {};
    f.clientAccountStatic.templates.addTemplate = function(d) {
        var c = {};
        var g = a("#" + d);
        0 < g.length && (c[d] = g.get(0));
        a.templates(c)
    };
    f.clientAccountStatic.templates.render = function(d, c, g) {
        var b = "";
        d = a.render[d];
        null != d && (b = d(c), g.html(b));
        return b
    };
    f.clientAccountStatic.templates.initTabContentTemplates = function(d) {
        var c = {};
        if (void 0 != d.archAndTypes) {
            for (var g in d.archAndTypes) for (var b in d.archAndTypes[g]) {
                var e = g + b + "Template";
                var h = a("#" + e);
                0 < h.length &&

                (c[e] = h.get(0))
            }
            a.templates(c)
        }
    };
    (f.clientAccountStatic.templates.initHelpers = function() {
        a.views.helpers({
            getLength: function(a) {
                return null != a ? (Object.keys || (Object.keys = function(a) {
                    var c = [],
                        b;
                    for (b in a) Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
                    return c
                }), Object.keys(a).length) : 0
            },
            inArray: function(d, c) {
                return a.inArray(d, c)
            },
            parseDate: function(a) {
                var c = a.indexOf("T");
                if (-1 == c) return Date.parse(a).toString("MMM dd, yyyy");
                a = a.substring(0, c);
                return Date.parse(a).toString("MMM dd, yyyy")
            },

            countProducts: function(a, c, g) {
                for (var b, e = 0, h = 0; h < a.length; h++) b = a[h], -1 === g ? e++ : void 0 != b[c] && void 0 != b[c].Version && void 0 != b[c].Version.VersionMajor && b[c].Version.VersionMajor === g && e++;
                return e
            }
        })
    })()
})(jQuery, global);
(function(a) {
    var f = function(b) {
        var c = a("#serial-number-submit");
        a("form").validate({
            onsubmit: !1,
            errorPlacement: function(a, c) {
                b.errorClient.html(a)
            }
        });
        c.click(function(c) {
            c.preventDefault();
            a(this).prop("disabled", !0);
            var e = !0;
            b.preloader.show(0);
            b.errorServer.html("");
            b.errorServer.addClass("hidden");
            b.serialNumberInput.valid() || (e = !1);
            e ? b.root.trigger(b.getJsonEvent, [a.trim(b.serialNumberInput.val())]) : (c.preventDefault(), b.preloader.hide(0), a("#serial-number-submit").prop("disabled", !1), a("#serial-number-submit").removeAttr("disabled"))
        });

        0 < b.serialNumberInput.length && b.serialNumberInput.rules("add", {
            required: !0,
            regex: "^([a-zA-Z0-9-]){10,40}$",
            messages: {
                regex: "Invalid serial number.",
                required: "This field is required."
            }
        });
        b.serialNumberInput.click(function() {
            b.errorServer.addClass("hidden")
        })
    }, d = function(a) {
        var b = "";
        a && a.VersionString && (b = "1.0" == a.VersionString || "2.0" == a.VersionString ? "" : "V" + a.VersionString);
        return b
    }, c = function() {
        var b, c = {}, e, d, g;
        a("[data-itemcodes-popup]").each(function() {
            b = a(this);
            if (e = a.trim(b.attr("data-itemcodes-popup"))) {
                d =

                e.split(",");
                for (var m = 0; m < d.length; m++)(g = a.trim(d[m])) && (c[g] = '[data-itemcodes-popup="' + e + '"]')
            }
        });
        return c
    }, g = function(b) {
        global.clientAccountStatic.popups.open("#ok-popup", b, {
            overlayClose: !1,
            onComplete: function() {
                a.colorbox.resize()
            }
        })
    }, b = function(b, c) {
        global.clientAccountStatic.popups.open(b, c, {
            overlayClose: !1,
            onComplete: function() {
                a.colorbox.resize()
            }
        })
    }, e = function(c) {
        c.serialNumberInput.on("paste", function(b) {
            var c = a(this);
            window.clipboardData && window.clipboardData.getData ? (b.preventDefault(),

            c.val(a.trim(window.clipboardData.getData("Text")))) : b.originalEvent.clipboardData && b.originalEvent.clipboardData.getData && (b.preventDefault(), c.val(a.trim(b.originalEvent.clipboardData.getData("text/plain"))))
        });
        c.root.bind(c.getJsonEvent, function(e, h) {
            var f;
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(e) {
                e ? global.clientAccountStatic.data.registerNewProductSerial(c.domain, c.wavesUserGUID, h, function(e) {
                    c.preloader.hide(0);
                    a("#serial-number-submit").prop("disabled", !1);
                    a("#serial-number-submit").removeAttr("disabled");

                    if (e) if (f = a.trim(e.desc.toString()), f === global.clientAccountStatic.errors.ok.code) {
                        if (e = e.output, null != e && 0 < e.length) if (c.serialNumberInput.val(""), 1 === e.length) {
                            e = e[0];
                            var m = [{
                                title: "productname",
                                value: e.ProductName
                            }, {
                                title: "serial",
                                value: e.SerialID
                            }, {
                                title: "version",
                                value: d(e)
                            }];
                            "5" == e.DisplayInfoProductType.toString() && m.push({
                                title: "rental",
                                value: "<br/>The Rental period begins once the license has been activated."
                            });
                            var h = m;
                            c.serialNumberOneProduct.show(0);
                            c.serialNumberManyProducts.hide(0);
                            (m =

                            e.ItemCode) && c.itemcodes[m] ? (m = c.itemcodes[m], b(m, [{
                                title: "productname",
                                value: e.ProductName
                            }, {
                                title: "serial",
                                value: e.SerialID
                            }])) : g(h)
                        } else {
                            m = "";
                            if (e) for (var l = 0; l < e.length; l++) h = e[l], m += "<li>" + h.ProductName + d(h) + " " + h.SerialID + "</li>";
                            h = [{
                                title: "many",
                                value: m
                            }];
                            c.serialNumberOneProduct.hide(0);
                            c.serialNumberManyProducts.show(0);
                            g(h)
                        }
                    } else void 0 != global.clientAccountStatic.errors[f] ? c.errorServer.html(global.clientAccountStatic.errors[f].msg) : c.errorServer.html(global.clientAccountStatic.errors.unknown.msg),

                    c.errorServer.removeClass("hidden")
                }, function() {}) : window.location.reload()
            })
        });
        c.serial_number_par.click(function() {
            c.serial_number_tip.is(":hidden") ? c.serial_number_tip.slideDown(c.serial_number_tip_duration) : c.serial_number_tip.slideUp(c.serial_number_tip_duration)
        })
    };
    global.plugins.push({
        name: "client-account-register-new-product",
        init: function() {
            var b = {
                serial_number_tip_duration: 500,
                itemcodes: c(),
                domain: a("#domain").text(),
                wavesUserGUID: a("#waves-user-guid").text(),
                getJsonEvent: "getJsonEvent",

                root: a("#wrapper"),
                errorClient: a("#error-client"),
                errorServer: a("#error-server"),
                serial_number_tip: a("#serial-number-hidden-text"),
                serial_number_par: a("#serial-number-link-par"),
                preloader: a(".button-preloader"),
                serialNumberInput: a("#serial-number-tb"),
                serialNumberOneProduct: a("#ok-popup-one-product"),
                serialNumberManyProducts: a("#ok-popup-many-products")
            };
            f(b);
            e(b);
            0 < b.serialNumberInput.val().length && (console.log(), a("#serial-number-submit").click())
        }
    })
})(jQuery);
(function(a) {
    var f = function() {
        try {
            window.fbq("track", "Lead")
        } catch (c) {
            setTimeout(function() {
                f()
            }, 1E3)
        }
    }, d = function(c) {
        c.$btn.on("click", function() {
            var d = a.trim(c.$ccCode.text());
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(b) {
                b ? (c.$preloader.removeClass("hidden"), c.$error.addClass("hidden"), c.$ok.addClass("hidden"), global.clientAccountStatic.data.getStudioRackNativeFree(c.domain, c.wavesUserGUID, d, function(b) {
                    (b = b.output) && 0 === Number(b.SuccessCode) && b.Serial ? (c.$serial.text(b.Serial),

                    c.$ok.removeClass("hidden"), c.$preloader.addClass("hidden"), c.$btn.hide(), f()) : (-2 == b.SuccessCode || -3 == b.SuccessCode ? a('[data-error-code="' + b.SuccessCode + '"]').removeClass("hidden") : a('[data-error-code="default"]').removeClass("hidden"), c.$preloader.addClass("hidden"))
                }, function() {
                    c.$error.find("p").html("An error has occurred");
                    c.$error.removeClass("hidden");
                    c.$preloader.addClass("hidden")
                })) : window.location.reload()
            })
        })
    };
    global.plugins.push({
        name: "client-account-studiorack-free",
        init: function() {
            var c =

            {
                $btn: a('[data-type="get-studiorack-btn"]'),
                wavesUserGUID: a("#waves-user-guid").text(),
                domain: a("#domain").text(),
                $preloader: a('[data-type="preloader"]'),
                $ok: a('[data-type="ok"]'),
                $error: a('[data-type="error"]'),
                $serial: a('[data-type="serial"]'),
                $ccCode: a('[data-type="cc-code"]')
            };
            d(c)
        }
    })
})(jQuery);
(function(a) {
    var f = function(a) {
        var b = {};
        0 >= arguments.length && (a = window.location.search);
        if (1 < a.length) {
            var c = a.substring(1).split("&");
            for (var e = 0; e < c.length; e++) {
                var d = c[e];
                d = d.split("=");
                2 === d.length && (b[d[0]] = d[1])
            }
        }
        return b
    }, d = function(a) {
        a.placeholderJQ.hide(0);
        a.topContentJQ.hide(0);
        a.supportError.show(0)
    }, c = function(a) {
        a.placeholderJQ.hide(0);
        a.topContentJQ.hide(0);
        a.registerDemoPreloaderJQ.show(0)
    }, g = function(a) {
        a.reloadDataLinkJQ.click(function() {
            b(a);
            a.placeholderJQ.show(0);
            a.topContentJQ.show(0);

            a.placeholderJQ.show(0);
            a.topContentJQ.show(0);
            a.supportError.hide(0);
            return !1
        })
    }, b = function(a) {
        global.clientAccountStatic.data.isCurrentUser(a.wavesUserGUID, function(b) {
            b ? global.clientAccountStatic.data.getAvalibleDemoProducts(a.domain, a.wavesUserGUID, function(b) {
                a.root.trigger(a.options.getJsonCompletedEvent, [b]);
                b ? a.json = h(a, b) : d(a);
                e(a)
            }, function() {
                d(a)
            }) : window.location.reload()
        })
    }, e = function(b) {
        var e = "";
        e = a.render.jplistTemplate({
            content: b.json
        });
        b.placeholderJQ.html(e);
        a(".info-text[data-num]").click(function() {
            var b =

            a(this).attr("data-num"),
                c = a("#popup-status-" + b);
            a.colorbox({
                width: c.attr("data-width") + "px",
                height: c.attr("data-height") + "px",
                inline: !0,
                href: "#popup-status-" + b,
                fixed: !0,
                scrolling: !1
            })
        });
        a(".AddToCartLink").click(function(e) {
            e.preventDefault();
            e = a(this).attr("data-id");
            var d = a(this).attr("data-item-code");
            if (void 0 != e) {
                c(b);
                a("html, body").animate({
                    scrollTop: 0
                }, 0);
                var h = a(this).parents('[data-type="jplist-item"]').find("a:first").attr("href");
                k(b, e, d, h, function(a) {})
            }
            return !1
        });
        a("#wrapper").jplist({
            itemsBox: ".jplist-main-list",

            itemPath: '[data-type="jplist-item"]',
            panelPath: ".jplist-panel",
            deepLinking: !0,
            redrawCallback: function(b, c, e) {
                a("img.lazy").lazyload()
            }
        })
    }, h = function(b, c) {
        b = "";
        global.domain.gtm.isEnabled() && (b = global.domain.gtm.getDomain());
        c = a.trim(c.toString());
        c = c.replace(/~\/1lib/g, b + "/1lib");
        return "" != c ? a.parseJSON(c) : null
    }, k = function(b, c, e, h, g) {
        global.clientAccountStatic.data.isCurrentUser(b.wavesUserGUID, function(f) {
            f ? global.clientAccountStatic.data.registerDemoProduct(b.domain, b.wavesUserGUID, c, e, function(c) {
                if (null !=

                c) {
                    var e = c.desc;
                    e === global.clientAccountStatic.errors.ok.code ? (window.dataLayer && window.dataLayer.push({
                        GA_event_action: "Demo Registered",
                        GA_event_category: document.location.pathname,
                        GA_event_label: global.domain.gtm.getCategoryFromURL(h),
                        event: "GTM event To GA"
                    }), window.location.href = b.redirectDemoComplete + "?demo=" + h) : (b.registerDemoPreloaderJQ.hide(0), d(b), window.dataLayer && window.dataLayer.push({
                        GA_event_action: "Demo Failed",
                        GA_event_category: document.location.pathname,
                        GA_event_label: global.domain.gtm.getCategoryFromURL(h),

                        event: "GTM event To GA"
                    }));
                    a.isFunction(g) && g(c)
                }
            }, function() {}) : window.location.reload()
        })
    }, n = function(a, b) {
        for (var c, e, d = null, h = 0; h < a.json.length; h++) if (c = a.json[h], e = c.Product, null != e && (e = e.Url) && e === b) {
            d = c;
            break
        }
        return d
    }, l = function(b) {
        var c, e, g, f, l;
        var m = b.qs.demo;
        void 0 !== m && (b.placeholderJQ.hide(0), b.demoQSPreloaderJQ.show(0), global.clientAccountStatic.data.isCurrentUser(b.wavesUserGUID, function(p) {
            p ? global.clientAccountStatic.data.getAvalibleDemoProducts(b.domain, b.wavesUserGUID, function(p) {
                b.root.trigger(b.options.getJsonCompletedEvent,

                [p]);
                p ? b.json = h(b, p) : d(b);
                c = n(b, m);
                null != c ? (e = c.Product, g = c.PromotionalClientProductStatus, null != e && null != g && (f = g.Status, "22" === f && (b.demoQSPreloaderJQ.hide(0), b.topContentJQ.hide(0), b.status22ErrBox.show(0)), "23" === f && (b.demoQSPreloaderJQ.hide(0), b.topContentJQ.hide(0), b.status23ErrBox.show(0)), "1" === f && (b.demoQSPreloaderJQ.hide(0), b.topContentJQ.hide(0), b.status1ErrBox.show(0)), "0" === f && (l = e.WLSNonSerializedProductID, b.root.trigger(b.options.demoIDEvent, [l]), k(b, l.toString(), null, a.trim(e.Url),

                function(a) {})))) : (b.demoQSPreloaderJQ.hide(0), d(b))
            }, function() {
                d(b)
            }) : window.location.reload()
        }))
    }, p = function(c, e) {
        e = {
            options: c,
            root: e,
            json: null,
            qs: {},
            domain: a("#domain").text(),
            wavesUserGUID: a("#waves-user-guid").text(),
            redirectDemoComplete: a("#redirect-demo-complete").text(),
            placeholderJQ: a("#placeholder"),
            supportError: a("#support-error"),
            demoQSPreloaderJQ: a("#demo-qs-preloader"),
            topContentJQ: a("#top-page-content"),
            registerDemoPreloaderJQ: a("#register-demo-preloader"),
            reloadDataLinkJQ: a("#reload-data-link"),

            status22ErrBox: a("#status-22-error"),
            status23ErrBox: a("#status-23-error"),
            status1ErrBox: a("#status-1-error")
        };
        e.options = a.extend(!0, {
            getJsonCompletedEvent: "getJsonCompletedEvent",
            demoIDEvent: "demoIDEvent"
        }, c);
        "" === a.trim(e.domain) || "" === a.trim(e.wavesUserGUID) ? d(e) : (e.qs = f(), void 0 !== e.qs.demo ? l(e) : (global.clientAccountStatic.templates.addTemplate("jplistTemplate"), g(e), b(e)));
        return jQuery.extend(this, e)
    };
    p.prototype.getQueryString = function(a) {
        return f(a)
    };
    jQuery.fn.clientAccountDemoWS = function(b) {
        return this.each(function() {
            var c =

            new p(b, a(this));
            a(this).data("clientAccountDemoWS", c)
        })
    };
    global.plugins.push({
        name: "client-account-demo-products",
        init: function() {
            a("#wrapper").clientAccountDemoWS()
        }
    })
})(jQuery);
(function(a) {
    var f = function() {
        a("input").on("click", function(d) {
            d = a(".error-box");
            d.is(":visible") && d.hide(0)
        });
        a('[data-validation-group="true"]').on("waves.validation.ok", function() {
            a(".button-preloader").addClass("button-preloader-show")
        })
    };
    global.plugins.push({
        name: "client-account-change-password",
        init: function() {
            0 < a("#change-password").length && f()
        }
    })
})(jQuery);
(function(a) {
    var f = function() {
        a("#preloader").hide(0);
        a("#download-error").show(0)
    }, d = function(d) {
        global.clientAccountStatic.data.getDisplayInfo(d.domain, d.wavesUserGUID, function(b) {
            "" !== a.trim(b) ? (b = a.parseJSON(b), b.DisplayInfo && b.DisplayInfo.Hardware ? c(d.domain, d.wavesUserGUID, function(b) {
                for (var c = d.productsList, e, g = !1, l = 0; l < c.length; l++) if (e = c[l], -1 != a.inArray(e, b)) {
                    g = !0;
                    break
                }
                g ? (a("#preloader").hide(0), a("#download-content").show(0)) : f()
            }) : f()) : f()
        })
    }, c = function(c, b, e) {
        var d, g = null,
            f = [],
            l;
        global.clientAccountStatic.data.getClientProducts(c,

        b, "Hardware", "Hardware", function(b, c, h) {
            if (h && (d = a.trim(h.toString()), "" !== d && (g = a.parseJSON(d), a.isArray(g) && a.isFunction(e)))) {
                for (b = 0; b < g.length; b++) l = g[b], l.Product && l.Product.Name && f.push(a.trim(l.Product.Name));
                e(f)
            }
        })
    };
    global.plugins.push({
        name: "download-special",
        init: function() {
            var c = {
                domain: a("#domain").text(),
                userid: a("#userid").text(),
                wavesUserGUID: a("#waves-user-guid").text(),
                productsList: []
            }, b = [],
                e;
            var h = a("#product-numbers-list").text().split(",");
            for (var f = 0; f < h.length; f++)(e = a.trim(h[f])) &&

            b.push(e);
            c.productsList = b;
            d(c)
        }
    })
})(jQuery);
(function(a) {
    var f = function(d) {
        d.$couponSum.on("click", function() {
            a(".server-error").html("")
        });
        a('[data-validation-group="true"]').on("waves.validation.ok", function() {
            a(".button-preloader").show(0)
        })
    };
    global.plugins.push({
        name: "friendbuy-coupon",
        init: function() {
            var d = {
                $couponSum: a(".coupon-sum")
            };
            f(d)
        }
    })
})(jQuery);
(function(a) {
    var f = function(c) {
        c.root.bind(c.options.toggleButtonChangeEvent, function(a, b, e) {
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(a) {
                if (a) switch (b) {
                    case "Subscription":
                        global.clientAccountStatic.data.getClientSubscriptions(c.domain, c.wavesUserGUID, function(a) {
                            a && c.root.trigger(c.options.drawTabContentEvent, ["Subscription", "Subscription", a])
                        });
                        break;
                    case "RTO":
                        global.clientAccountStatic.data.getRTO(c.domain, c.wavesUserGUID, function(a) {
                            a && c.root.trigger(c.options.drawTabContentEvent,

                            ["RTO", "RTO", a])
                        });
                        break;
                    default:
                        global.clientAccountStatic.data.getClientProducts(c.domain, c.wavesUserGUID, b, e, function(a, b, e) {
                            e && c.root.trigger(c.options.drawTabContentEvent, [a, b, e])
                        })
                } else window.location.reload()
            })
        });
        c.root.bind(c.options.enterIlokAccountEvent, function(d, b) {
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(e) {
                e ? global.clientAccountStatic.data.enterIlokAccountName(c.domain, b, function(b) {
                    void 0 != b && c.root.trigger(c.options.enterIlokAccountAnswerEvent, [a.parseJSON(b)])
                }) :

                window.location.reload()
            })
        })
    }, d = function(c, d) {
        var b = {
            options: c,
            root: d,
            domain: a("#domain").text(),
            userid: a("#userid").text(),
            wavesUserGUID: a("#waves-user-guid").text(),
            tabsObj: null,
            viewObj: null
        };
        b.options = a.extend(!0, {
            slideDuration: 300,
            drawTabsEvent: "caDrawTabsEvent",
            drawTabContentEvent: "caDrawTabContentEvent",
            toggleButtonChangeEvent: "caToggleBtnChangedEvent",
            enterIlokAccountEvent: "enterIlokAccountEvent",
            enterIlokAccountAnswerEvent: "enterIlokAccountAnswerEvent"
        }, c);
        b.viewObj = new jQuery.fn.clientAccountWS.view(b.options,

        d);
        global.clientAccountStatic.data.getDisplayInfo(b.domain, b.wavesUserGUID, function(a) {
            a && (b.tabsObj = new global.clientAccountStatic.tabsJson(b.options, a, !0), b.root.trigger(b.options.drawTabsEvent, [b.tabsObj]))
        });
        return jQuery.extend(this, b)
    };
    jQuery.fn.clientAccountWS = function(c) {
        return this.each(function() {
            var g = new d(c, a(this));
            f(g);
            a(this).data("clientAccountWS", g)
        })
    };
    global.plugins.push({
        name: "client-account-my-products",
        init: function() {
            a("#wrapper").clientAccountWS()
        }
    })
})(jQuery);
(function(a) {
    var f = function(a) {
        a = a.tabsJQ.data("jtabs");
        var b = null;
        a && (b = a.$tabs);
        return b
    }, d = function(b) {
        var c, e;
        f(b).find(".tabs-radio-menu").each(function() {
            e = a(this);
            c = e.find("[data-type]");
            2 > c.length && e.addClass("hide-radio-buttons-menu")
        })
    }, c = function(c) {
        c.root.bind(c.options.drawTabsEvent, function(g, k) {
            global.clientAccountStatic.templates.render("tabsTemplate", {
                tabs: k
            }, c.placeholderJQ);
            if (k.displayInfo) {
                c.tabsJQ = a("#client-account-tabs");
                c.tabsJQ.jtabs({
                    callback: "",
                    cookies: !1,
                    cookie_name: "jtabsMyProducts",

                    tab_anchor: !0,
                    tab_anchor_duration: 0,
                    tab_anchor_jump: !1
                });
                c.tabsPlaceholdersJQ = a('[data-placeholder="true"]');
                c.showAllTab = a("#show-all-tab");
                g = f(c);
                null != g && (c.radioButtonsListJQ = g.find("[data-type]"));
                h(c);
                if (k = c.tabsJQ.data("jtabs")) g = k.$tabs, k = k.$navItems, g && k && (e(c, k, g), b(c, g));
                g = c.tabsJQ.find(".nav li");
                k = g.filter(".current");
                0 < k.length ? k.trigger("click") : g.eq(0).trigger("click");
                d(c)
            }
        });
        c.root.bind(c.options.drawTabContentEvent, function(b, e, d, f) {
            "All" !== d && (b = c.radioButtonsListJQ.filter('[data-arch="' +

            e + '"][data-type="' + d + '"]'), b.attr("data-status", "done"), f = a.trim(f.toString()), "" !== f && (f = a.parseJSON(f), f = global.clientAccountStatic.templates.render(e + d + "Template", {
                products: f
            }, a("#" + (e + d + "Placeholder"))), e = c.radioButtonsListJQ.filter('[data-arch="' + e + '"][data-type="All"]'), 0 < e.length && (d = e.find('[data-holder-type="' + d + '"]'), 0 < d.length && (d.html(f), d.attr("data-status", "done"))), g(c)))
        });
        c.popupEnterIlokTBJQ.click(function() {
            c.popupEnterIlokServerErrorJQ.hide(0)
        });
        c.popupEnterIlokBtnJQ.click(function() {
            var b =

            a.trim(c.popupEnterIlokTBJQ.val());
            if ("" === b) c.popupEnterIlokServerErrorJQ.html("This field is required"), c.popupEnterIlokServerErrorJQ.show(0);
            else {
                c.popupEnterIlokServerErrorJQ.hide(0);
                c.popupEnterIlokPreloaderJQ.show(0);
                var e = a.trim(c.popupEnterIlokJQ.find(".data-clientproductid").text());
                var d = a.trim(c.popupEnterIlokJQ.find(".data-promotionalid").text());
                b = {
                    ClientProductID: e,
                    NonSerializedClientProductID: d,
                    iLokAccountName: b
                };
                c.root.trigger(c.options.enterIlokAccountEvent, [b])
            }
        });
        c.root.bind(c.options.enterIlokAccountAnswerEvent,

        function(a, b) {
            a = b.desc;
            c.popupEnterIlokPreloaderJQ.hide(0);
            a === global.clientAccountStatic.errors.ok.code ? (c.popupEnterIlokBeforeSubmitJQ.hide(0), c.popupEnterIlokServerOkJQ.show(0)) : (void 0 != global.clientAccountStatic.errors[a] ? c.popupEnterIlokServerErrorJQ.html(global.clientAccountStatic.errors[a].msg) : c.popupEnterIlokServerErrorJQ.html(global.clientAccountStatic.errors.unknown.msg), c.popupEnterIlokServerErrorJQ.show(0))
        });
        global.clientAccountStatic.popups.initUpgradePopupEvents()
    }, g = function(b) {
        a(".version-box .header").off("click").on("click",

        function() {
            var c = a(this);
            var e = c.next(".content");
            e.is(":visible") ? e.slideUp(b.options.slideDuration, function() {
                c.addClass("closed")
            }) : e.slideDown(b.options.slideDuration, function() {
                c.removeClass("closed")
            })
        });
        b.radioButtonsListJQ.find("[data-popup]").off("click").on("click", function() {
            var c = [];
            var e = a(this).attr("data-popup");
            void 0 != e && (a.each(a(this).data(), function(a, b) {
                c.push({
                    title: a,
                    value: b
                })
            }), global.clientAccountStatic.popups.open(e, c, {
                onClosed: function() {
                    var c = a("#buy-online-upgrade-popup");

                    b.popupEnterIlokTBJQ.val("");
                    b.popupEnterIlokServerErrorJQ.hide(0);
                    b.popupEnterIlokServerOkJQ.hide(0);
                    b.popupEnterIlokPreloaderJQ.hide(0);
                    b.popupEnterIlokBeforeSubmitJQ.show(0);
                    c.get(0).checked = !0;
                    c.trigger("change")
                }
            }))
        });
        b.showAllTab.click(function() {
            b.showAllTab.addClass("current");
            b.tabsPlaceholdersJQ.hide(0);
            a("#show-all-preloader").show(0)
        })
    }, b = function(b, c) {
        c.find("[data-type]").change(function() {
            var c, e;
            var d = a(this);
            var f = d.attr("data-status");
            var g = d.attr("data-type");
            var h = d.attr("data-arch");

            switch (f) {
                case "inprocess":
                    break;
                case "done":
                    break;
                default:
                    d.attr("data-status", "inprocess"), "All" !== h && "All" === g ? k(b, h):
                        b.root.trigger(b.options.toggleButtonChangeEvent, [h, g])
            }
            if ("checkbox" === d.attr("type").toString().toLowerCase()) {
                var n = b.tabsPlaceholdersJQ.filter('[data-type="' + g + '"][data-arch="' + h + '"]');
                d.get(0).checked ? n.show(0) : n.hide(0)
            } else b.tabsPlaceholdersJQ.each(function() {
                n = a(this);
                e = n.attr("data-type");
                c = n.attr("data-arch");
                e === g && c === h ? n.show(0) : n.hide(0)
            })
        })
    }, e = function(b, c, e) {
        c.click(function() {
            var b;

            var c = a(this).attr("data-name");
            var d = e.filter('[data-name="' + c + '"]').find("[data-type]");
            c = d.filter('[type="radio"]');
            d = d.filter('[type="checkbox"]');
            if (0 < c.length) {
                var f = c.filter(":checked");
                c = 0 === f.length ? c.eq(0) : f.eq(0);
                c.get(0).checked = !0;
                c.trigger("change")
            }
            d.each(function() {
                b = a(this);
                b.get(0).checked = !0;
                b.trigger("change")
            })
        })
    }, h = function(b) {
        var c = {}, e, d;
        if (b = b.tabsJQ.data("jtabs")) if (b = b.$tabs) b.find("[data-type]").each(function() {
            var b = a(this);
            var f = b.attr("data-type");
            d = b.attr("data-arch") +

            f + "Template";
            e = a("#" + d);
            0 < e.length && (c[d] = e.get(0))
        }), a.templates(c)
    }, k = function(b, c) {
        var e, d, f;
        b.radioButtonsListJQ.filter('[data-arch="' + c + '"][data-type="All"]').find("[data-holder-type]").each(function() {
            d = a(this);
            e = d.attr("data-status");
            "done" !== e && (f = d.attr("data-holder-type"), b.root.trigger(b.options.toggleButtonChangeEvent, [c, f]))
        })
    }, n = function(b, c) {
        b = {
            options: b,
            root: c,
            placeholderJQ: a("#placeholder"),
            tabsJQ: null,
            tabsPlaceholdersJQ: null,
            radioButtonsListJQ: null,
            showAllTab: null,
            popupEnterIlokJQ: a("#popup-enter-ilok"),

            popupEnterIlokBtnJQ: a("#enter-ilok-btn"),
            popupEnterIlokTBJQ: a("#enter-ilok-tb"),
            popupEnterIlokServerErrorJQ: a("#enter-ilok-server-error"),
            popupEnterIlokServerOkJQ: a("#enter-ilok-server-ok"),
            popupEnterIlokPreloaderJQ: a("#enter-ilok-preloader"),
            popupEnterIlokBeforeSubmitJQ: a("#enter-ilok-before-submit")
        };
        global.clientAccountStatic.templates.addTemplate("tabsTemplate");
        return jQuery.extend(this, b)
    };
    jQuery.fn.clientAccountWS.view = function(a, b) {
        a = new n(a, b);
        c(a);
        return a
    }
})(jQuery);
(function(a) {
    var f = function(c) {
        c.root.bind(c.options.toggleButtonChangeEvent, function(a, b, e) {
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(a) {
                if (a) switch (b) {
                    case "Subscription":
                        global.clientAccountStatic.data.getClientSubscriptions(c.domain, c.wavesUserGUID, function(a) {
                            a && c.root.trigger(c.options.drawTabContentEvent, ["Subscription", "Subscription", a])
                        });
                        break;
                    case "RTO":
                        global.clientAccountStatic.data.getRTO(c.domain, c.wavesUserGUID, function(a) {
                            a && c.root.trigger(c.options.drawTabContentEvent,

                            ["RTO", "RTO", a])
                        });
                        break;
                    default:
                        global.clientAccountStatic.data.getClientProducts(c.domain, c.wavesUserGUID, b, e, function(a, b, e) {
                            e && c.root.trigger(c.options.drawTabContentEvent, [a, b, e])
                        })
                } else window.location.reload()
            })
        });
        c.root.bind(c.options.enterIlokAccountEvent, function(d, b) {
            global.clientAccountStatic.data.isCurrentUser(c.wavesUserGUID, function(e) {
                e ? global.clientAccountStatic.data.enterIlokAccountName(c.domain, b, function(b) {
                    void 0 != b && c.root.trigger(c.options.enterIlokAccountAnswerEvent, [a.parseJSON(b)])
                }) :

                window.location.reload()
            })
        })
    }, d = function(c, d) {
        var b = {
            options: c,
            root: d,
            domain: a("#domain").text(),
            userid: a("#userid").text(),
            wavesUserGUID: a("#waves-user-guid").text(),
            tabsObj: null,
            viewObj: null
        };
        b.options = a.extend(!0, {
            slideDuration: 300,
            drawTabsEvent: "caDrawTabsEvent",
            drawTabContentEvent: "caDrawTabContentEvent",
            toggleButtonChangeEvent: "caToggleBtnChangedEvent",
            enterIlokAccountEvent: "enterIlokAccountEvent",
            enterIlokAccountAnswerEvent: "enterIlokAccountAnswerEvent"
        }, c);
        b.viewObj = new jQuery.fn.clientAccountWSAll.view(b.options,

        d);
        global.clientAccountStatic.data.getDisplayInfo(b.domain, b.wavesUserGUID, function(a) {
            a && (b.tabsObj = new global.clientAccountStatic.tabsJson(b.options, a, !1), b.root.trigger(b.options.drawTabsEvent, [b.tabsObj]))
        });
        return jQuery.extend(this, b)
    };
    jQuery.fn.clientAccountWSAll = function(c) {
        return this.each(function() {
            var g = new d(c, a(this));
            f(g);
            a(this).data("clientAccountWSAll", g)
        })
    };
    global.plugins.push({
        name: "client-account-my-products-all",
        init: function() {
            a("#wrapper").clientAccountWSAll()
        }
    })
})(jQuery);
(function(a) {
    var f = function(b) {
        b.root.bind(b.options.drawTabsEvent, function(c, f) {
            global.clientAccountStatic.templates.render("tabsTemplate", {
                tabs: f
            }, b.placeholderJQ);
            b.sectionsJQ = a("#sections [data-type]");
            d(b);
            global.clientAccountStatic.templates.initTabContentTemplates(f);
            if (void 0 != f.archAndTypes) for (var e in f.archAndTypes) for (var g in f.archAndTypes[e]) b.root.trigger(b.options.toggleButtonChangeEvent, [e, g])
        });
        b.root.bind(b.options.drawTabContentEvent, function(e, d, f, g) {
            e = a.trim(g.toString());

            "" !== e && (e = a.parseJSON(e), global.clientAccountStatic.templates.render(d + f + "Template", {
                products: e
            }, a("#" + (d + f + "Placeholder"))), d = a("#" + d + f + "Placeholder"), c(b, d))
        });
        b.popupEnterIlokTBJQ.click(function() {
            b.popupEnterIlokServerErrorJQ.hide(0)
        });
        b.popupEnterIlokBtnJQ.click(function() {
            var c = a.trim(b.popupEnterIlokTBJQ.val());
            if ("" === c) b.popupEnterIlokServerErrorJQ.html("This field is required"), b.popupEnterIlokServerErrorJQ.show(0);
            else {
                b.popupEnterIlokServerErrorJQ.hide(0);
                b.popupEnterIlokPreloaderJQ.show(0);

                var d = a.trim(b.popupEnterIlokJQ.find(".data-clientproductid").text());
                var f = a.trim(b.popupEnterIlokJQ.find(".data-promotionalid").text());
                c = {
                    ClientProductID: d,
                    NonSerializedClientProductID: f,
                    iLokAccountName: c
                };
                b.root.trigger(b.options.enterIlokAccountEvent, [c])
            }
        });
        b.root.bind(b.options.enterIlokAccountAnswerEvent, function(a, c) {
            a = c.desc;
            b.popupEnterIlokPreloaderJQ.hide(0);
            a === global.clientAccountStatic.errors.ok.code ? (b.popupEnterIlokBeforeSubmitJQ.hide(0), b.popupEnterIlokServerOkJQ.show(0)) : (void 0 !=

            global.clientAccountStatic.errors[a] ? b.popupEnterIlokServerErrorJQ.html(global.clientAccountStatic.errors[a].msg) : b.popupEnterIlokServerErrorJQ.html(global.clientAccountStatic.errors.unknown.msg), b.popupEnterIlokServerErrorJQ.show(0))
        });
        global.clientAccountStatic.popups.initUpgradePopupEvents()
    }, d = function(b) {
        a(".tabs-radio-menu input").change(function() {
            var c;
            var d = a(this).attr("data-type");
            if ("All" === d) b.sectionsJQ.show(0);
            else {
                var f = d.split(",");
                b.sectionsJQ.hide(0);
                b.sectionsJQ.each(function() {
                    c =

                    a(this);
                    for (var b = 0; b < f.length; b++) d = f[b], a.trim(c.attr("data-type")) === a.trim(d) && c.show(0)
                })
            }
        })
    }, c = function(b, c) {
        c.find(".version-box .header").off("click").on("click", function() {
            var c = a(this);
            var e = c.next(".content");
            e.is(":visible") ? e.slideUp(b.options.slideDuration, function() {
                c.addClass("closed")
            }) : e.slideDown(b.options.slideDuration, function() {
                c.removeClass("closed")
            })
        });
        c.find("[data-popup]").off("click").on("click", function() {
            var c = [];
            var e = a(this).attr("data-popup");
            void 0 != e && (a.each(a(this).data(),

            function(a, b) {
                c.push({
                    title: a,
                    value: b
                })
            }), global.clientAccountStatic.popups.open(e, c, {
                onClosed: function() {
                    var c = a("#buy-online-upgrade-popup");
                    b.popupEnterIlokTBJQ.val("");
                    b.popupEnterIlokServerErrorJQ.hide(0);
                    b.popupEnterIlokServerOkJQ.hide(0);
                    b.popupEnterIlokPreloaderJQ.hide(0);
                    b.popupEnterIlokBeforeSubmitJQ.show(0);
                    c.get(0).checked = !0;
                    c.trigger("change")
                }
            }))
        })
    }, g = function(b, c) {
        b = {
            options: b,
            root: c,
            placeholderJQ: a("#placeholder"),
            sectionsJQ: null,
            popupEnterIlokJQ: a("#popup-enter-ilok"),
            popupEnterIlokBtnJQ: a("#enter-ilok-btn"),

            popupEnterIlokTBJQ: a("#enter-ilok-tb"),
            popupEnterIlokServerErrorJQ: a("#enter-ilok-server-error"),
            popupEnterIlokServerOkJQ: a("#enter-ilok-server-ok"),
            popupEnterIlokPreloaderJQ: a("#enter-ilok-preloader"),
            popupEnterIlokBeforeSubmitJQ: a("#enter-ilok-before-submit")
        };
        global.clientAccountStatic.templates.addTemplate("tabsTemplate");
        return jQuery.extend(this, b)
    };
    jQuery.fn.clientAccountWSAll.view = function(a, c) {
        a = new g(a, c);
        f(a);
        return a
    }
})(jQuery);
(function(a, f) {
    var d = function(c, d) {
        var b = {
            options: c,
            root: d,
            domain: a("#domain").text(),
            userid: a("#userid").text(),
            wavesUserGUID: a("#waves-user-guid").text(),
            viewObj: null,
            tabsObj: null
        };
        b.options = a.extend(!0, {
            tabsReadyEvent: "tabsReadyEvent",
            drawSectionEvent: "drawSectionEvent",
            getSectionEvent: "getSectionEvent",
            selectCbEvent: "selectCbEvent",
            deselectCbEvent: "deselectCbEvent"
        }, c);
        b.viewObj = new jQuery.fn.getLatestVersionWS.view(b.options, d, b.domain, b.wavesUserGUID);
        f.clientAccountStatic.data.getDisplayInfo(b.domain,

        b.wavesUserGUID, function(a) {
            void 0 != a && null != a && (b.tabsObj = new f.clientAccountStatic.tabsJson(b.options, a, !1), b.root.trigger(b.options.tabsReadyEvent, [b.tabsObj]))
        });
        return jQuery.extend(this, b)
    };
    jQuery.fn.getLatestVersionWS = function(c) {
        return this.each(function() {
            var f = new d(c, a(this));
            a(this).data("getLatestVersionWS", f)
        })
    };
    f.plugins.push({
        name: "client-account-get-latest-version",
        init: function() {
            a("#wrapper").getLatestVersionWS()
        }
    })
})(jQuery, global);
(function(a) {
    var f = function(b) {
        var c = [],
            e;
        a('#sections .row input[type="checkbox"]').each(function() {
            e = a(this).attr("data-id").replace("id-", "");
            c.push(e)
        });
        return c
    }, d = function(b) {
        var c, e = [],
            d, g = [],
            p, m, r, q, t = [],
            u = [],
            v = [];
        v = f(b);
        v.join(", ") !== b.idList.join(", ") ? (a("#id-err").show(0), a("#blue-btn-preloader").hide(0)) : (a('#sections input[type="checkbox"]:checked').each(function() {
            c = a(this).attr("data-id");
            r = a(this).attr("data-name");
            null != c && (p = c.replace("id-", ""), d = global.clientAccountStatic.data.updateClientProduct(b.domain,

            {
                ClientProductID: p,
                TimeToken: 0
            }, {
                Name: r
            }, function(a) {
                g.push(a)
            }, function() {}), e.push(d))
        }), a.when.apply(a, e).then(function(c) {
            b.placeholderJQ.hide(0);
            for (c = 0; c < g.length; c++) m = g[c], q = m.desc, null != q && "ERR000" === q ? u.push(m) : t.push(m);
            global.clientAccountStatic.templates.render(b.resultsTemplateId, {
                okList: u,
                errorsList: t
            }, b.resultMsg);
            b.resultMsg.show(0);
            a("html, body").animate({
                scrollTop: 0
            }, 0)
        }, function() {}))
    }, c = function(b) {
        var c = a("#all-cb"),
            e = a('#sections .row input[type="checkbox"]');
        c.change(function() {
            a(this).get(0).checked ?

            e.trigger(b.options.selectCbEvent) : e.trigger(b.options.deselectCbEvent)
        });
        e.change(function() {
            a(this).get(0).checked ? (b.getVersionBtn.removeClass("grey-button").addClass("blue-button"), b.mainErr.fadeOut()) : (c.get(0).checked = !1, 0 === e.filter(":checked").length && b.getVersionBtn.removeClass("blue-button").addClass("grey-button"))
        });
        e.bind(b.options.selectCbEvent, function() {
            var b = a(this);
            b.get(0).checked || (b.get(0).checked = !0, b.trigger("change"))
        });
        e.bind(b.options.deselectCbEvent, function() {
            var b = a(this);

            b.get(0).checked && (b.get(0).checked = !1, b.trigger("change"))
        });
        b.getVersionBtn.click(function(c) {
            var e = a(this);
            c.preventDefault();
            e.hasClass("blue-button") ? global.clientAccountStatic.data.isCurrentUser(b.wavesUserGUID, function(c) {
                c ? (a("#blue-btn-preloader").show(0), d(b)) : window.location.reload()
            }) : b.mainErr.fadeIn();
            return !1
        })
    }, g = function(b) {
        var e = [],
            d, g;
        b.root.bind(b.options.tabsReadyEvent, function(h, k) {
            global.clientAccountStatic.templates.render(b.mainTemplateId, {
                tabs: k
            }, b.placeholderJQ);
            global.clientAccountStatic.templates.initTabContentTemplates(k);

            if (void 0 != k.archAndTypes) {
                for (var n in k.archAndTypes) for (var l in k.archAndTypes[n]) "Full" == l && (d = global.clientAccountStatic.data.getClientProducts(b.domain, b.wavesUserGUID, n, l, function(b, c, e) {
                    void 0 != e && null != e && (e = a.trim(e.toString()), "" !== e && (e = a.parseJSON(e), global.clientAccountStatic.templates.render(b + c + "Template", {
                        products: e
                    }, a("#" + (b + c + "Placeholder")))))
                }), e.push(d));
                a.when.apply(a, e).then(function(e) {
                    b.idList = f(b);
                    b.getVersionBtn = a("#get-version-btn");
                    b.mainErr = a("#main-err .error-box");

                    g = a('#sections .row input[type="checkbox"]').length;
                    0 === g && (a("#error-msg").show(0), a("#sections").hide(0));
                    c(b);
                    e = window.location.hash;
                    null != e && (e = a.trim(e.replace("#", "")), "" !== e && (e = a('[data-id="' + e + '"]'), 0 < e.length && (e.get(0).checked = !0, e.trigger("change"))))
                }, function() {})
            }
        })
    }, b = function(b, c, d, f) {
        b = {
            options: b,
            root: c,
            domain: d,
            wavesUserGUID: f,
            idList: [],
            mainTemplateId: "mainContentTemplate",
            resultsTemplateId: "ResultsTemplate",
            placeholderJQ: a("#placeholder"),
            getVersionBtn: null,
            mainErr: null,
            resultMsg: a("#result-msg")
        };

        global.clientAccountStatic.templates.addTemplate(b.mainTemplateId);
        global.clientAccountStatic.templates.addTemplate(b.resultsTemplateId);
        return jQuery.extend(this, b)
    };
    jQuery.fn.getLatestVersionWS.view = function(a, c, d, f) {
        a = new b(a, c, d, f);
        g(a);
        return a
    }
})(jQuery);
(function(a) {
    var f = function(a, c) {
        a = {
            options: a,
            $root: c,
            viewObj: null
        };
        a.viewObj = new jQuery.fn.clientAccountSubscriptions.view(a.options, c);
        return jQuery.extend(this, a)
    };
    jQuery.fn.clientAccountSubscriptions = function(d) {
        return this.each(function() {
            var c = new f(d, a(this));
            a(this).data("clientAccountSubscriptions", c)
        })
    };
    global.plugins.push({
        name: "client-account-subscriptions",
        init: function() {
            a("#wrapper").clientAccountSubscriptions()
        }
    })
})(jQuery);
(function(a) {
    var f = function(b) {
        global.clientAccountStatic.data.getClientSubscriptions(b.domain, b.wavesUserGUID, function(b) {
            try {
                b = JSON.parse(b)
            } catch (n) {
                b = []
            }
            var c = 0;
            if (b) for (var e = 0; e < b.length; e++) b[e].HasSubscribedSerials && c++;
            0 < c ? a("#placeholder").html(a("#subscriptions-template").render(b)) : a("#placeholder").html(a("#subscriptions-empty").render({}))
        })
    }, d = function(b, c) {
        b = a('[data-type="product"][data-orderid="' + c + '"]:checked').length;
        c = a('[data-type="cancel-sbs"][data-orderid="' + c + '"]');
        0 < b ? c.removeClass("grey-button").addClass("blue-button") :

        c.removeClass("blue-button").addClass("grey-button")
    }, c = function(b) {
        a(document).on("change", '[data-type="select-all"]', function() {
            var c = a(this),
                f = c.prop("checked");
            c = c.attr("data-orderid");
            a('[data-type="product"][data-orderid="' + c + '"]').prop("checked", f);
            d(b, c)
        });
        a(document).on("change", '[data-type="product"]', function() {
            d(b, a(this).attr("data-orderid"))
        });
        a('[data-type="close"]').on("click", function(b) {
            b.preventDefault();
            a.colorbox.close();
            return !1
        });
        a('[data-type="cancel-sbs-ok"]').on("click",

        function(c) {
            c = a("#sbs-cancel-orderid").text();
            var e = a("#sbs-cancel-sbsplanid").text(),
                d = new global.app.security.TokenModel;
            a("#are-you-sure-panel").addClass("hidden");
            a("#are-you-sure-preloader").removeClass("hidden");
            global.clientAccountStatic.data.cancelSubscription(d, c, e, function(c) {
                try {
                    c = JSON.parse(c)
                } catch (l) {
                    c = null
                }
                f(b);
                c = c && c.IsValid;
                a("#are-you-sure-preloader").addClass("hidden");
                c ? a("#are-you-sure-ok").removeClass("hidden") : a("#are-you-sure-err").removeClass("hidden")
            })
        });
        a(document).on("click",

            '[data-type="cancel-sbs"]', function() {
            var b = a(this),
                c = b.attr("data-orderid"),
                d = b.attr("data-sbsplanid");
            if (0 < a('[data-type="product"][data-orderid="' + c + '"]:checked').length) b = a("#are-you-sure-popup"), a("#sbs-cancel-orderid").text(c), a("#sbs-cancel-sbsplanid").text(d), a("#are-you-sure-panel").removeClass("hidden"), a("#are-you-sure-preloader").addClass("hidden"), a("#are-you-sure-ok").addClass("hidden"), a("#are-you-sure-err").addClass("hidden"), a.colorbox({
                width: b.attr("data-width") + "px",
                height: b.attr("data-height") +

                "px",
                inline: !0,
                href: "#are-you-sure-popup",
                fixed: !0,
                scrolling: !1
            });
            else {
                var f = b.next('[data-type="no-selected-err"]');
                f.removeClass("hidden");
                window.setTimeout(function() {
                    f.fadeOut({
                        complete: function() {
                            a(this).addClass("hidden").removeAttr("style")
                        }
                    })
                }, 2E3)
            }
        });
        a(document).on("click", ".version-box .header", function() {
            var b = a(this);
            var c = b.next(".content");
            c.is(":visible") ? c.slideUp(300, function() {
                b.addClass("closed")
            }) : c.slideDown(300, function() {
                b.removeClass("closed")
            })
        })
    }, g = function(b, c) {
        b = {
            options: b,

            $root: c,
            domain: a("#domain").text(),
            userid: a("#userid").text(),
            wavesUserGUID: a("#waves-user-guid").text()
        };
        global.clientAccountStatic.templates.addTemplate("tabsTemplate");
        f(b);
        return jQuery.extend(this, b)
    };
    jQuery.fn.clientAccountSubscriptions.view = function(a, e) {
        a = new g(a, e);
        c(a);
        return a
    }
})(jQuery);
(function(a) {
    var f = function(a, c) {
        a = {
            options: a,
            $root: c,
            viewObj: null
        };
        a.viewObj = new jQuery.fn.clientAccountRTO.view(a.options, c);
        return jQuery.extend(this, a)
    };
    jQuery.fn.clientAccountRTO = function(d) {
        return this.each(function() {
            var c = new f(d, a(this));
            a(this).data("clientAccountRTO", c)
        })
    };
    global.plugins.push({
        name: "client-account-rto",
        init: function() {
            a("#wrapper").clientAccountRTO()
        }
    })
})(jQuery);
(function(a) {
    var f = function(c) {
        global.clientAccountStatic.data.getRTO(c.domain, c.wavesUserGUID, function(b) {
            try {
                b = JSON.parse(b)
            } catch (n) {
                b = []
            }
            for (var c = [], d = 0; d < b.length; d++) {
                var f = b[d];
                f.HasSubscribedSerials && f.CanBeUnsubscribed && c.push(f)
            }
            0 < c.length ? a("#placeholder").html(a("#rto-template").render(c)) : a("#placeholder").html(a("#rto-empty").render({}))
        })
    }, d = function(c) {
        a('[data-type="close"]').on("click", function(b) {
            b.preventDefault();
            a.colorbox.close();
            return !1
        });
        a('[data-type="cancel-sbs-ok"]').on("click",

        function(b) {
            b = a("#sbs-cancel-orderid").text();
            var e = a("#sbs-cancel-sbsplanid").text(),
                d = new global.app.security.TokenModel;
            a("#are-you-sure-panel").addClass("hidden");
            a("#are-you-sure-preloader").removeClass("hidden");
            global.clientAccountStatic.data.cancelSubscription(d, b, e, function(b) {
                try {
                    b = JSON.parse(b)
                } catch (n) {
                    b = null
                }
                f(c);
                b = b && b.IsValid;
                a("#are-you-sure-preloader").addClass("hidden");
                b ? a("#are-you-sure-ok").removeClass("hidden") : a("#are-you-sure-err").removeClass("hidden")
            })
        });
        a(document).on("click",

            '[data-type="cancel-sbs"]', function() {
            var b = a(this),
                c = b.attr("data-orderid");
            b = b.attr("data-sbsplanid");
            var d = a("#are-you-sure-popup");
            a("#sbs-cancel-orderid").text(c);
            a("#sbs-cancel-sbsplanid").text(b);
            a("#are-you-sure-panel").removeClass("hidden");
            a("#are-you-sure-preloader").addClass("hidden");
            a("#are-you-sure-ok").addClass("hidden");
            a("#are-you-sure-err").addClass("hidden");
            a.colorbox({
                width: d.attr("data-width") + "px",
                height: d.attr("data-height") + "px",
                inline: !0,
                href: "#are-you-sure-popup",
                fixed: !0,

                scrolling: !1
            })
        });
        a(document).on("click", ".version-box .header", function() {
            var b = a(this);
            var c = b.next(".content");
            c.is(":visible") ? c.slideUp(300, function() {
                b.addClass("closed")
            }) : c.slideDown(300, function() {
                b.removeClass("closed")
            })
        })
    }, c = function(c, b) {
        c = {
            options: c,
            $root: b,
            domain: a("#domain").text(),
            userid: a("#userid").text(),
            wavesUserGUID: a("#waves-user-guid").text()
        };
        global.clientAccountStatic.templates.addTemplate("tabsTemplate");
        f(c);
        return jQuery.extend(this, c)
    };
    jQuery.fn.clientAccountRTO.view =

    function(a, b) {
        a = new c(a, b);
        d(a);
        return a
    }
})(jQuery);
(function(a, f) {
    f.ui.waves.CertificationController = function() {
        var d = new f.ui.waves.CertificationModel({
            clientID: a.trim(a("#waves-user-guid").text()),
            examCode: a.trim(a("#exam-code").text()),
            dataUrl: a.trim(a("#data-url").text())
        });
        new f.ui.waves.CertificationView({
            model: d
        })
    };
    f.plugins.push({
        name: "certifications",
        init: f.ui.waves.CertificationController
    })
})(jQuery, global);
(function(a, f) {
    f.ui.waves.CertificationView = Backbone.View.extend({
        initialize: function() {
            this.model.fetch({
                dataType: "text",
                data: this.model.toJSON(),
                url: "/2code/handlers/certifications.ashx",
                cache: !1
            }).done(function(a) {
                a && window.location.replace(a)
            })
        }
    })
})(jQuery, global);
(function(a, f) {
    f.ui.waves.CertificationModel = Backbone.Model.extend({
        defaults: {
            clientID: null,
            examCode: null,
            dataUrl: null
        },
        initialize: function() {
            var a = new f.app.security.TokenModel;
            this.set(a.toJSON());
            this.set("url", this.get("dataUrl"))
        }
    })
})(jQuery, global);
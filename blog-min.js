(function(b) {
    var c = function(a) {
        a = b(".specials-order-hidden:eq(0)");
        var c = null,
            d = [],
            g = [],
            f = b("#post-gallery .product-gallery-content .list-li"),
            h;
        if (0 < a.length) try {
            c = b.parseJSON(a.html())
        } catch (k) {}
        c && 1 < f.length && (f.detach(), f.each(function(a, c) {
            b(this).attr("data-index", a)
        }), b.each(c, function(a, b) {
            h = f.filter('[data-nodeid="' + b.NodeID + '"]');
            0 < h.length && d.push({
                $product: h,
                dataItem: b
            })
        }), d.reverse(), b.each(d, function(a, b) {
            b.$product.attr("data-index", -a - 1)
        }), g = b.makeArray(f), g.sort(function(a, c) {
            var d =

            0,
                e = 0,
                d = Number(b(a).attr("data-index")) || 0,
                e = Number(b(c).attr("data-index")) || 0;
            return d - e
        }), b("#post-gallery .product-gallery-content").append(b(g)))
    };
    global.plugins.push({
        name: "magazine",
        init: function() {
            var a = {
                productGallery: b(".product-gallery")
            };
            c(a);
            b("[data-lb=true]").colorbox({
                fixed: !0,
                opacity: "0.6",
                waves_prefix: "image"
            })
        }
    })
})(jQuery);
(function(b) {
    var c = function() {
        b('[data-validation-group="true"]').on("waves.validation.error", function(a, c, d) {
            d && 0 < d.length && (a = d.eq(0), b("html, body").animate({
                scrollTop: a.offset().top
            }, 300))
        })
    };
    global.plugins.push({
        name: "wavesland",
        init: function() {
            c();
            b(".radio-group").each(function() {
                b(this).find('input[type="radio"]:eq(0)').attr("data-validation-type", "required")
            });
            global.domain.validation.init();
            b(".date-of-birth").datepicker({
                changeMonth: !0,
                changeYear: !0,
                yearRange: "-100:+0"
            });
            b(".arriving, .departing").datepicker()
        }
    })
})(jQuery);
(function(b) {
    var c = function(a) {
        var c = {
            fixed: !0,
            iframe: !0,
            innerWidth: "368px",
            innerHeight: "300px",
            opacity: "0.6",
            scrolling: !1,
            fastIframe: !1
        };
        a.preview.click(function() {
            b.colorbox(b.extend({
                href: "/specialpages/iframe/login"
            }, c))
        })
    };
    global.plugins.push({
        name: "videos-blog",
        init: function() {
            var a = {
                player: b("#player"),
                preview: b(".preview-img-secured img")
            };
            if (0 < a.player.length) {
                a.width = a.player.attr("data-width");
                a.height = a.player.attr("data-height");
                a.code = a.player.attr("data-code");
                a.domain = a.player.attr("data-domain");

                a.player_box = b("#player-box");
                var e = {
                    id: "player",
                    width: a.width,
                    height: a.height,
                    code: a.code,
                    default_coords: !1,
                    hd: !1,
                    domain: a.domain
                };
                "true" == a.player.attr("data-hd") && (e.hd = !0);
                b.videos(e)
            }
            0 < a.preview.length && c(a)
        }
    })
})(jQuery);
(function(b) {
    global.plugins.push({
        name: "videos-lightbox",
        init: function() {
            var c = b("#player"),
                a = {
                    id: "player",
                    width: 640,
                    height: 360,
                    code: window.location.search.replace("?code=", ""),
                    default_coords: !1,
                    hd: !1,
                    domain: "",
                    iframe: !0,
                    sharing: !1
                };
            "true" == c.attr("data-hd") && (a.hd = !0);
            b.videos(a)
        }
    })
})(jQuery);
(function(b) {
    global.plugins.push({
        name: "videos-embed",
        init: function() {
            var c = b("#player"),
                a = {
                    id: "player",
                    width: c.attr("data-width"),
                    height: c.attr("data-height"),
                    code: c.attr("data-code"),
                    default_coords: !1,
                    hd: !1,
                    domain: c.attr("data-domain"),
                    iframe: !0
                };
            "true" == c.attr("data-hd") && (a.hd = !0);
            b.videos(a)
        }
    })
})(jQuery);
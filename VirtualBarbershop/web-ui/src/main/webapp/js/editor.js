var Conf = function () {
        var j = {
            dev: {
                cookieDomain: ".polyvore.net",
                oldImgHost: "www.polyvore.net",
                imgHosts: ["img1.polyvore.net", "img2.polyvore.net"],
                httpsImgHost: "www.polyvore.net",
                blogUrl: "http://blog.polyvore.com",
                fbApiKey: "e006261993081197d9a617cbb0b6e7b6",
                fbMiniEditorAppId: "169696363050346",
                isStaging: true,
                appEffectsCategories: [327, 329, 330, 331]
            },
            testenv: {
                cookieDomain: ".polyvore.net",
                oldImgHost: "www.polyvore.net",
                imgHosts: ["img1.polyvore.net", "img2.polyvore.net"],
                httpsImgHost: "www.polyvore.net",
                blogUrl: "http://blog.polyvore.com",
                fbApiKey: "e006261993081197d9a617cbb0b6e7b6",
                fbMiniEditorAppId: "169696363050346",
                isStaging: true
            },
            sandbox: {
                cookieDomain: ".polyvore.net",
                oldImgHost: "www.polyvore.net",
                imgHosts: ["img1.polyvoreimg.com", "img2.polyvoreimg.com"],
                httpsImgHost: "www.polyvore.com",
                rewriteImgBase: true,
                blogUrl: "http://blog.polyvore.com",
                fbApiKey: "e006261993081197d9a617cbb0b6e7b6",
                fbMiniEditorAppId: "169696363050346",
                isStaging: true
            },
            live: {
                cookieDomain: ".polyvore.net",
                oldImgHost: "www.polyvore.com",
                imgHosts: ["img1.polyvoreimg.com", "img2.polyvoreimg.com"],
                httpsImgHost: "www.polyvore.com",
                cdnImgHosts: ["ak1.polyvoreimg.com", "ak2.polyvoreimg.com"],
                httpsCdnImgHost: "www.polyvore.com",
                rewriteImgBase: true,
                blogUrl: "http://blog.polyvore.com",
                fbApiKey: "e006261993081197d9a617cbb0b6e7b6",
                fbMiniEditorAppId: "123732014354410",
                isStaging: true,
                appEffectsCategories: [327, 329, 330, 331]
            },
            prod: {
                webHost: "www.polyvore.com",
                cookieDomain: ".polyvore.com",
                oldImgHost: "www.polyvore.com",
                imgHosts: ["img1.polyvoreimg.com", "img2.polyvoreimg.com"],
                httpsImgHost: "www.polyvore.com",
                cdnImgHosts: ["ak1.polyvoreimg.com", "ak2.polyvoreimg.com"],
                httpsCdnImgHost: "www.polyvore.com",
                rsrcUrlPrefix: "http://www.polyvorecdn.com/rsrc/",
                httpsRsrcUrlPrefix: "https://www.polyvore.com/rsrc/",
                rsrcExtUrlPrefix: "http://ext.polyvorecdn.com/rsrc/",
                noCachePrefix: "http://rsrc.polyvore.com/rsrc/",
                blogUrl: "http://blog.polyvore.com",
                fbApiKey: "3d1d18f72a710e20514cd62955686c8f",
                fbMiniEditorAppId: "131434943568989",
                isStaging: false,
                appEffectsCategories: [327, 329, 330, 331]
            }
        };
        var a = window.polyvore_mode || window._polyvoreMode || "prod";
        var h = j[a];
        var d = null;
        if (window._polyvoreLocale && window._polyvoreLocale != "en") {
            d = window._polyvoreLocale
        }
        var c = document.getElementsByTagName("script");
        c = c.length ? c[c.length - 1].src.toString() : "";
        if (c && !/^(([a-z]+):\/\/)/.test(c)) {
            var f = document.createElement("div");
            c = c.replace('"', "%22");
            f.innerHTML = '<a href="' + c + '" style="display:none">x</a>';
            c = f.firstChild.href
        }
        c = c.replace(/.*https?:\/\/[^\/]*\//, "/").replace(/(\/[^\/]*){2,2}$/, "");
        var g;

        function b(n, q) {
            var p = [n];
            var l = [];
            forEachKey(q, function (r) {
                l.push(r)
            });
            l.sort();
            l.forEach(function (r) {
                p.push(q[r])
            });
            var o = 0;
            p = p.join("");
            for (var m = 0, k = p.length; m < k; m++) {
                o += p.charCodeAt(m)
            }
            return o
        }
        return {
            getDevName: function () {
                return window._polyvoreDevName
            },
            getFbApiKey: function () {
                return h.fbApiKey
            },
            getCookieDomain: function () {
                return h.cookieDomain
            },
            getWebHost: function () {
                return h.webHost || window._polyvoreHost || "www.polyvore.net"
            },
            getWebUrlPrefix: function () {
                return Conf.getWebHost() + c
            },
            getImgHost: function (k, m) {
                if (getProtocol() == "https") {
                    return h.httpsImgHost
                }
                if (!m) {
                    m = {}
                }
                if (m.size == "x" || m.size == "l" || m.size == "e") {
                    return h.oldImgHost
                } else {
                    var l = b(k, m);
                    return h.imgHosts[l % h.imgHosts.length]
                }
            },
            getCDNImgHost: function (l, n) {
                if (getProtocol() == "https") {
                    return h.httpsCdnImgHost
                }
                var k = h.cdnImgHosts;
                if (!k) {
                    return ""
                }
                var m = b(l, n);
                return k[m % k.length]
            },
            getRsrcUrlPrefix: function (k) {
                if (g) {
                    return g
                }
                if (getProtocol() == "https") {
                    g = h.httpsRsrcUrlPrefix;
                    return h.httpsRsrcUrlPrefix
                }
                g = k ? h.rsrcExtUrlPrefix : h.rsrcUrlPrefix;
                if (!g) {
                    g = "http://" + Conf.getWebUrlPrefix() + "/rsrc/"
                }
                return g
            },
            getNoCachePrefix: function () {
                return h.noCachePrefix ? h.noCachePrefix : "http://" + Conf.getWebUrlPrefix() + "/rsrc/"
            },
            getBlogURL: function () {
                return h.blogUrl
            },
            isStaging: function () {
                return h.isStaging
            },
            setLocale: function (k) {
                d = k
            },
            getLocale: function () {
                return d
            },
            getModeName: function () {
                return a
            },
            getSetting: function (k) {
                return h[k]
            }
        }
    }();

function noop() {}
function flatten(b, a) {
    a = a || [];
    if (b !== undefined && b !== null) {
        if (b.constructor == Array) {
            b.map(function (c) {
                flatten(c, a)
            })
        } else {
            a.push(b)
        }
    }
    return a
}
function forEachKey(c, d, b) {
    for (var a in c) {
        if (c.hasOwnProperty(a)) {
            if (d.call(b, a, c[a])) {
                break
            }
        }
    }
}
function yield(a, b) {
    return window.setTimeout(Event.wrapper(a, b), 0)
}
function tryThese() {
    var f;
    for (var d = 0; d < arguments.length; d++) {
        var c = arguments[d];
        try {
            f = c();
            break
        } catch (g) {
            var b = 1
        }
    }
    return f
}
function plural(b, a, c, d) {
    b = Number(b);
    if (d && !b) {
        return d
    }
    if (a == "time") {
        switch (b) {
        case 1:
            return loc("once");
        case 2:
            return loc("twice");
        case 3:
            return loc("three") + " " + c;
        default:
            return b + " " + c
        }
    } else {
        switch (b) {
        case 1:
            return loc("one") + " " + a;
        case 2:
            return loc("two") + " " + c;
        case 3:
            return loc("three") + " " + c;
        default:
            return b + " " + c
        }
    }
}
function shortNumber(a) {
    if (a == 1) {
        return loc("one")
    } else {
        if (a == 2) {
            return loc("two")
        } else {
            if (a == 3) {
                return loc("three")
            }
        }
    }
    return a.toString()
}
function toArray(b) {
    if (b) {
        if (b.constructor == Array) {
            return b
        } else {
            if (b.constructor != String && b.nodeType === undefined && b.length !== undefined && !isNaN(Number(b.length))) {
                var c = [];
                for (var a = 0; a < b.length; ++a) {
                    c.push(b[a])
                }
                return c
            } else {
                return [b]
            }
        }
    } else {
        return []
    }
}
function createUUID() {
    var d = "0123456789abcdef".split("");
    var b = [];
    var c;
    for (var a = 0; a < 32; a++) {
        c = Math.floor(Math.random() * 16);
        if (a == 16) {
            b[a] = d[(c & 3) | 8]
        } else {
            b[a] = d[c]
        }
    }
    b[12] = "4";
    return b.join("")
}
function mergeObject(d, a, b) {
    for (var c in a) {
        if (a.hasOwnProperty(c) && (!b || !d.hasOwnProperty(c))) {
            d[c] = a[c]
        }
    }
    return d
}
function delayed(b, c) {
    var a;
    return function () {
        if (a) {
            clearTimeout(a)
        }
        var d = arguments;
        a = window.setTimeout(function () {
            b.apply(b, d)
        }, c)
    }
}
function splitWithMatches(h, j, c, b) {
    var f = [];
    var g = j.match(h) || [];
    var a = 0;
    var k = 0;
    while (a < g.length) {
        k = j.search(h);
        if (k < 0) {
            break
        }
        var l = j.substring(0, k);
        var d = g[a++];
        j = j.substring(k + d.length);
        if (l) {
            f.push(b ? b(l) : l)
        }
        if (d) {
            f.push(c ? c(d) : d)
        }
    }
    if (j) {
        f.push(b ? b(j) : j)
    }
    return f
}
function extend(subclass, supclass) {
    var a = function () {};
    a.prototype = supclass.prototype;
    subclass.prototype = new a();
    subclass.prototype.constructor = subclass;
    subclass.superclass = supclass.prototype;
    if (supclass.prototype.constructor == Object.prototype.constructor) {
        supclass.prototype.constructor = supclass
    }
}
function loopNonBlocking(a, f, c, d) {
    if (!f) {
        return
    }
    var b = function () {
            var j = true;
            var h = f;
            var g = new Date().getTime() + a;
            while (!h.apply(d)) {
                if (new Date().getTime() >= g) {
                    window.setTimeout(b, Browser.isIE ? 80 : 0);
                    j = false;
                    break
                }
            }
            if (j && c) {
                c.apply(d)
            }
        };
    window.setTimeout(b, 0)
}
function countingSemaphore(a, f, c) {
    var d = Event.wrapper(f, c);
    var b = Event.wrapper(function () {
        if (--a === 0) {
            d()
        }
    });
    b.inc = function (g) {
        a += g || 1
    };
    b.clean = function () {
        d = noop
    };
    return b
}
function post(b, c) {
    if (!c) {
        c = {}
    }
    if (window._xsrfToken) {
        c[".xsrf"] = window._xsrfToken
    }
    var a = createNode("form");
    a.action = buildAbsURL(buildURL(b));
    a.method = "POST";
    a.appendChild(createNode("input", {
        type: "hidden",
        name: "request",
        value: JSON2.stringify(c)
    }));
    a.appendChild(createNode("input", {
        type: "hidden",
        name: ".in",
        value: "json"
    }));
    document.body.appendChild(a);
    a.submit()
}
function cloneObject(d, a) {
    if (d === null) {
        return null
    }
    var b = new d.constructor();
    for (var c in d) {
        if (!a) {
            b[c] = d[c]
        } else {
            if (typeof (d[c]) == "object") {
                b[c] = cloneObject(d[c], a)
            } else {
                b[c] = d[c]
            }
        }
    }
    return b
}
function bucketName(a) {
    var b = window.polyvore_experiment_data && window.polyvore_experiment_data[a];
    b = b || {};
    return b.name || ""
}
function bucketIs(b, a) {
    return bucketName(b).toLowerCase() == a.toLowerCase()
}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) {}
function cache_buster() {
    return 1
}
if (!window.console) {
    window.console = {
        log: noop,
        debug: noop,
        error: noop
    }
}
var JS_VOID = "javascript:void(0)";

function isValidEmail(a) {
    return a && a.match(/^.+@[\w\-]+(\.[\w\-]+)*\.[A-Za-z]{2,10}/)
}
function toList(a) {
    if (a !== undefined && a !== null) {
        return (a.constructor == Array) ? a : [a]
    } else {
        return []
    }
}
function returnFalse() {
    return false
}
function teaser(c, b, a) {
    if (!c || c.length <= b) {
        return c
    }
    if (a === undefined) {
        a = "..."
    }
    if (b < 4) {
        b = 4
    }
    return c.substring(0, b - 3) + a
}
function pluralNumber(b, a, c) {
    b = Number(b);
    if (b === 1) {
        return b + " " + a
    }
    return b + " " + c
}
function Boolean(a) {
    a = Number(a);
    return !!a
}
function handleException(a) {
    ModalDialog.alert(a.message)
}
function fbs_click(a, b) {
    a = a || location.href;
    b = b || document.title;
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(a) + "&t=" + encodeURIComponent(b), "sharer", "toolbar=0,status=0,width=626,height=436");
    return false
}
function hiddenPost(a) {
    a.method = "POST";
    a.target = "polyvore_hidden_iframe";
    a.submit()
}
function parseUnit(a) {
    if (a && a.match(/^([0-9]+)([a-z%]+)$/)) {
        return {
            value: parseInt(RegExp.$1, 10),
            unit: RegExp.$2
        }
    }
    return {
        value: parseInt(a, 10),
        unit: ""
    }
}
function normalizeCSV(c) {
    if (c) {
        var b = c.split(",");
        var a = [];
        b.forEach(function (d) {
            d = d.trim();
            if (d) {
                a.push(d)
            }
        });
        c = a.join(",")
    }
    return c
}
function mantissa(a) {
    return parseFloat((a < 0 ? "-0." : "0.") + (("" + a).split(".")[1] || 0))
}
function reloadPage() {
    window.location.reload(true)
}
function _timeUnits() {
    return [{
        singular: loc("year"),
        plural: loc("years"),
        seconds: 31536000
    }, {
        singular: loc("month"),
        plural: loc("months"),
        seconds: 2592000
    }, {
        singular: loc("day"),
        plural: loc("days"),
        seconds: 86400
    }, {
        singular: loc("hour"),
        plural: loc("hours"),
        seconds: 3600
    }, {
        singular: loc("min"),
        plural: loc("minutes"),
        seconds: 60
    }]
}
function duration(d) {
    var a = _timeUnits();
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (d > c.seconds) {
            return plural(Math.round(d / c.seconds), c.singular, c.plural)
        }
    }
    return plural(Math.round(d), loc("second"), loc("seconds"))
}
function ts2age(a) {
    if (!a) {
        return 0
    }
    return new Date().getTime() / 1000 - a
}
function round(b, a) {
    a = a || 1;
    if (a > 1) {
        return Math.round(b / a) * a
    } else {
        a = 1 / a;
        return Math.round(b * a) / a
    }
}
function zSort(d, c) {
    return d.z - c.z
}
function mapRange(k, j, g) {
    var d = j.length;
    for (var c = 0; c < d; ++c) {
        var b = j[c];
        var a = j[c + 1];
        if (k >= b && k <= a) {
            var h = g[c];
            var f = g[c + 1];
            return (k - b) * (f - h) / (a - b) + h
        }
    }
    return
}
function range(c, a, f) {
    if (f > a) {
        return []
    }
    var d = [];
    for (var b = a; b <= f && b < c.length; b++) {
        d.push(c[b])
    }
    return d
}
function and_words(b) {
    var a = b[b.length - 1];
    var c = range(b, 0, b.length - 2).join(", ");
    return c ? (c + " " + loc("and") + " " + a) : a
}
function or_words(b) {
    var a = b[b.length - 1];
    var c = range(b, 0, b.length - 2).join(", ");
    return c ? (c + " " + loc("or") + " " + a) : a
}
function initSearchBox(k, j, d, f, g) {
    function h(n) {
        var m = $_(j);
        if (n || !InputHint.isHint(m)) {
            if (InputHint.isHint(m)) {
                m.value = ""
            }
            $_(k).submit()
        }
    }
    var b;
    var l;
    var a;
    Event.addListener(document, "modifiable", function () {
        function o(s, t) {
            if (!a) {
                if (!s.container) {
                    return
                }
                var r = s.container.parentNode;
                a = r.appendChild(createNode("div", null, null, s.container))
            }
            if (t == "shop") {
                show(a)
            } else {
                hide(a)
            }
        }
        var n = [];
        var p = {};
        var q;
        g.forEach(function (r) {
            if (r.selected) {
                q = r.hint
            }
            n.push({
                text: r.text,
                value: r.action,
                selected: r.selected
            });
            p[r.action] = r.hint
        });
        var m = $_(j);
        InputHint.add(m, q);
        if (d) {
            b = new DropDownMenu(n);
            Event.addListener(b, "change", function () {
                var r = b.getSelected();
                r = r.value || r.text;
                $_(k).action = buildURL(r);
                o(l, r);
                if (InputHint.isHint(m)) {
                    InputHint.setHint(m, p[r]);
                    InputHint.reset(m)
                } else {
                    yield(h)
                }
            })
        }
        Event.addSingleUseListener($_(j), "focus", function () {
            var r;
            if (b) {
                r = b.getSelected();
                r = r.value || r.text
            }
            o(l, r)
        });
        Event.addListener($_(f), "click", function () {
            h(true)
        });
        Event.addListener($_(f), "keydown", function (r) {
            if (r.keyCode == 13) {
                h(true)
            }
        })
    });
    if (d) {
        ["click", "focus"].forEach(function (m) {
            Event.addListener($_(d), m, function () {
                if (b) {
                    b.attach($_(d), DropDownMenu.POSITION_BOTTOM_RIGHT, 100);
                    b.show()
                }
            })
        })
    }
    var c = DataSourceDataManager.getShopACData();
    Event.addSingleUseListener(c, "loaded", function () {
        Event.addListener(document, "modifiable", function () {
            function n(p, o) {
                var q = p[o];
                if (!q) {
                    q = p.appendChild(createNode("input", {
                        type: "hidden",
                        name: o
                    }))
                }
                return q
            }
            var m = $_(j);
            l = new GroupedObjectAutoComplete(m, c || [], {
                menuWidth: 200,
                toggleOnLoaded: true,
                typeOrder: ["query", "category_id", "brand", "displayurl"],
                maxResults: {
                    query: 8,
                    category_id: 5,
                    brand: 8,
                    displayurl: 5
                },
                inputRenderer: function (o) {
                    return o.title
                },
                onSelect: function (q) {
                    var p = l.inputTokenizer;
                    p.caretToken(l.inputRenderer(q._data));
                    m.value = p.reconstructValue(true);
                    p.caretToken("");
                    m.value = "";
                    var o = n(m.form, q._data.filter_type);
                    o.value = q._data.value;
                    yield(function () {
                        m.blur()
                    });
                    m.form.submit()
                }
            })
        })
    });
    c.ensureLoaded()
}
function makeStatic(b) {
    for (var a in b) {
        func = b[a];
        if (typeof (func) == "function") {
            b[a] = Event.wrapper(func, b)
        }
    }
}
function consensusOrMediod(f, c) {
    var d = {};
    var a = null;
    var b = 1;
    c.forEach(function (g) {
        var h = Math.round(g / f) * f;
        if (d[h]) {
            d[h]++;
            if (d[h] > b) {
                b = d[h];
                a = g
            }
        } else {
            d[h] = 1
        }
    });
    if (b > 1) {
        return a
    }
    c = c.sort().uniq();
    return c[Math.round(c.length / 2)]
}
function openWindow(b, c, l, j) {
    var f = l || 800;
    var m = j || 600;
    var d = screen.height;
    var a = screen.width;
    var g = Math.round((a / 2) - (f / 2));
    var k = Math.round((d / 2) - (m / 2));
    var n = "";
    n = "left=" + g + ",top=" + k + ",width=" + f + ",height=" + m;
    n += ",personalbar=0,toolbar=0,scrollbars=1,resizable=1,location=0,menubar=0";
    return window.open(c, "pv_" + b, n)
}
function stack() {
    var a;
    try {
        window()
    } catch (b) {
        a = b.stack
    }
    if (a) {
        a = a.split("\n");
        a.pop();
        return a.join("\n")
    }
    return ""
}
function checkMainImg(b) {
    if (!document.querySelector) {
        return
    }
    var a = document.querySelector(b);
    if (!a) {
        return
    }
    var c = a.src || a.xsrc;
    if (!c) {
        return
    }
    getNaturalWidthHeight(c, function (d, f) {
        if (d > 1 && f > 1) {
            return
        }
        /*Beacon.log("1x1", {
            url: c
        })*/
    })
}
function future(h) {
    if (h <= 0) {
        return loc("right away")
    }
    var a = _timeUnits();
    for (var c = 0; c < a.length; c++) {
        var f = a[c];
        if (h >= f.seconds) {
            var g = Math.round(h / f.seconds);
            if (g === 1 && f.singular === loc("day")) {
                return loc("tomorrow")
            }
            return loc("in {duration}", {
                duration: plural(g, f.singular, f.plural)
            })
        }
    }
    var b = plural(h, loc("second"), loc("seconds"));
    return loc("in {duration}", {
        duration: b
    })
}
var BrowserDetect = {
    init: function () {
        this.browserInfo = this.searchInfo(this.dataBrowser) || null;
        this.browser = this.browserInfo ? this.browserInfo.identity : "An unknown browser";
        this.version = document.documentMode || this.searchVersion(navigator.userAgent, this.browserInfo) || this.searchVersion(navigator.appVersion, this.browserInfo) || "an unknown version";
        this.OSInfo = this.searchInfo(this.dataOS) || null;
        this.OS = this.OSInfo ? this.OSInfo.identity : "an unknown OS";
        this.layoutEngineInfo = this.searchInfo(this.dataLayoutEngine) || null;
        this.layoutEngine = this.layoutEngineInfo ? this.layoutEngineInfo.identity : "an unknown layout engine";
        this.layoutEngineVersion = this.searchVersion(navigator.userAgent, this.layoutEngineInfo) || this.searchVersion(navigator.appVersion) || "an unknown layout engine version"
    },
    searchInfo: function (d) {
        for (var a = 0; a < d.length; a++) {
            var b = d[a].string;
            var c = d[a].prop;
            if (b) {
                if (b.indexOf(d[a].subString) != -1) {
                    return d[a]
                }
            } else {
                if (c) {
                    return d[a]
                }
            }
        }
        return false
    },
    searchVersion: function (d, c) {
        var a = c ? c.versionSearch || c.identity : "";
        var b = d.indexOf(a);
        if (b == -1) {
            return false
        }
        return parseFloat(d.substring(b + a.length + 1))
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "IE",
        versionSearch: "MSIE",
        upgradeURL: "http://www.microsoft.com/windows/Internet-explorer/default.aspx"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox",
        upgradeURL: "http://www.getfirefox.com"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        upgradeURL: "http://www.apple.com/safari/download/"
    }, {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome",
        upgradeURL: "http://www.google.com/chrome"
    }, {
        prop: window.opera,
        identity: "Opera"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "iPad",
        identity: "iPad"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }],
    dataLayoutEngine: [{
        string: navigator.userAgent,
        subString: "AppleWebKit",
        identity: "WebKit"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Gecko",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Presto",
        identity: "Presto"
    }]
};
BrowserDetect.init();
var Browser = function () {
        return {
            isIE: "IE" == BrowserDetect.browser,
            isSafari: "Safari" == BrowserDetect.browser,
            isChrome: "Chrome" == BrowserDetect.browser,
            isOpera: "Opera" == BrowserDetect.browser,
            isMac: "Mac" == BrowserDetect.OS,
            isIPad: "iPad" == BrowserDetect.OS,
            isWindows: "Windows" == BrowserDetect.OS,
            isFirefox: "Firefox" == BrowserDetect.browser,
            isMozilla: "Mozilla" == BrowserDetect.browser,
            type: function (b, a, c) {
                return b == BrowserDetect.browser && (!a || a <= BrowserDetect.version) && (!c || c >= BrowserDetect.version)
            },
            layoutEngine: function (b, a, c) {
                return b == BrowserDetect.layoutEngine && (!a || a <= BrowserDetect.layoutEngineVersion) && (!c || c >= BrowserDetect.layoutEngineVersion)
            }
        }
    }();

function Set() {
    this.items = {};
    this._size = 0
}
Set.prototype.size = function () {
    return this._size
};
Set.prototype.forEach = function (b, a) {
    this.values().forEach(b, a)
};
Set.prototype.ncp = function (a) {
    if (this.contains(a)) {
        return false
    }
    this.put(a);
    return true
};
Set.prototype.contains = function (b) {
    var a = getHashKey(b);
    if (this.items[":" + a]) {
        return true
    } else {
        return false
    }
};
Set.prototype.get = function (a) {
    if (this.contains(a)) {
        return this.items[":" + getHashKey(a)]
    } else {
        return null
    }
};
Set.prototype.put = function (b) {
    var a = getHashKey(b);
    if (!this.items[":" + a]) {
        this.items[":" + a] = b;
        delete this._values;
        this._size++
    }
};
Set.prototype.remove = function (b) {
    var a = getHashKey(b);
    if (this.items[":" + a]) {
        delete this.items[":" + a];
        delete this._values;
        this._size--;
        return true
    }
    return false
};
Set.prototype.clear = function () {
    this.items = {};
    delete this._values;
    this._size = 0
};
Set.prototype.values = function () {
    if (this._values) {
        return this._values
    }
    var a = [];
    for (var b in this.items) {
        if (this.items.hasOwnProperty(b)) {
            a.push(this.items[b])
        }
    }
    return (this._values = a)
};
var getUID;
(function () {
    var a = 1;
    getUID = function (d) {
        var c = typeof (d);
        var b;
        if (c == "object" || c == "function") {
            b = d._uid;
            if (!b) {
                b = a++;
                try {
                    d._uid = b
                } catch (f) {}
            }
        } else {
            b = d
        }
        return b
    }
})();

function getHashKey(b) {
    switch (typeof (b)) {
    case "number":
    case "string":
        return b;
    case "boolean":
        return b ? 1 : 0;
    case "object":
        if (!b) {
            return b
        }
        var a;
        if (b.getHashKey && typeof (b.getHashKey) == "function") {
            return b.getHashKey()
        } else {
            a = getUID(b)
        }
        return a;
    default:
        return b
    }
}
function compare(f, d) {
    var c = typeof (f);
    var g = typeof (d);
    if (c != g) {
        return false
    }
    switch (c) {
    case "number":
    case "string":
    case "boolean":
        return f === d;
    default:
        return getHashKey(f) === getHashKey(d)
    }
}
function Hash() {
    this.items = {}
}
Hash._key = function (a) {
    return ":" + getHashKey(a)
};
Hash.prototype.merge = function (b) {
    for (var a in b) {
        if (b.hasOwnProperty(a)) {
            this.put(a, b[a])
        }
    }
};
Hash.prototype.put = function (a, b) {
    var c;
    if (this.contains(a)) {
        c = this.get(a)
    }
    this.items[Hash._key(a)] = b;
    return c
};
Hash.prototype.get = function (a) {
    return this.items[Hash._key(a)]
};
Hash.prototype.remove = function (a) {
    a = Hash._key(a);
    if (this.items[a]) {
        delete this.items[a]
    }
};
Hash.prototype.clear = function () {
    this.items = {}
};
Hash.prototype.contains = function (a) {
    return this.items.hasOwnProperty([Hash._key(a)])
};

function Interval(a, c, b) {
    this.timerId = 0;
    this.interval = a;
    this.f = Event.wrapper(function () {
        try {
            c.apply(b)
        } catch (d) {
            console.log(d)
        }
        if (this.timerId !== undefined) {
            this.reschedule()
        }
    }, this);
    this.reschedule()
}
Interval.prototype.clear = function () {
    if (this.timerId) {
        window.clearTimeout(this.timerId);
        delete this.timerId
    }
};
Interval.prototype.reschedule = function (a) {
    this.clear();
    this.interval = a || this.interval;
    this.timerId = window.setTimeout(this.f, this.interval)
};

function Cleaner() {
    var a = [];
    return {
        push: function (b) {
            if (b) {
                a.push(b)
            }
        },
        clean: function () {
            a.forEach(function (b) {
                if (b.clean && typeof (b.clean) == "function") {
                    b.clean()
                } else {
                    if (typeof (b) == "function") {
                        b.call()
                    }
                }
            });
            a = []
        }
    }
}
function EventMap() {
    this.events = {}
}
EventMap.prototype.getOrInitEventObjects = function (c, a) {
    var b = getUID(c);
    if (c && c.getAttribute && !c.getAttribute("_uid")) {
        c.setAttribute("_uid", b)
    }
    if (!this.events[b]) {
        this.events[b] = {}
    }
    if (!this.events[b][a]) {
        this.events[b][a] = {}
    }
    if (!this.events[b][a].listeners) {
        this.events[b][a].listeners = []
    }
    return this.events[b][a]
};
EventMap.prototype.getListenedEvent = function (c, a) {
    var b = getUID(c);
    return this.events[b] && this.events[b][a]
};
EventMap.prototype.getPVListeners = function (c, a) {
    var b = getUID(c);
    return this.getListenedEvent(c, a) && this.events[b][a].listeners
};
EventMap.prototype.release = function (b) {
    var a = getUID(b);
    return this.releaseId(a, b)
};
EventMap.prototype.releaseAll = function (a) {
    if (!document.querySelectorAll) {
        console.log("ReleaseAll not supported by this browser");
        return
    }
    var b = document.querySelectorAll("[_uid]");
    b = nodeListToArray(b);
    b.push(window);
    b.push(document);
    b.forEach(function (d) {
        var c = d._uid;
        if (c) {
            this.releaseId(c, d);
            if (a) {
                a(c, d)
            }
        }
    }, this);
    this.getSourceIDs().forEach(function (c) {
        this.releaseId(c)
    }, this)
};
EventMap.prototype.releaseId = function (f, d) {
    if (!this.events[f]) {
        return
    }
    for (var c in this.events[f]) {
        if (!this.events[f].hasOwnProperty(c)) {
            continue
        }
        var g = this.events[f][c].scrollBottomDetector;
        if (g) {
            g.clear()
        }
        var b = this.events[f][c].listeners;
        if (b.constructor != Array) {
            continue
        }
        if (d) {
            for (var a = 0; a < b.length; ++a) {
                if (Event.isBuiltIn(d, c)) {
                    Event.removeDomListener(d, c, b[a])
                }
            }
        }
        delete this.events[f][c]
    }
    delete this.events[f]
};
EventMap.prototype.getSourceIDs = function () {
    var a = [];
    forEachKey(this.events, function (b) {
        a.push(b)
    });
    return a
};

function Listener(c, b, a) {
    this.src = c;
    this.event = b;
    this.handler = a
}
Listener.prototype.clean = function () {
    var a = this.event;
    var b = this.src;
    if (this.src && this.event) {
        Event.removeListener(b, a, this.handler)
    }
    this.src = this.event = this.handler = null
};
var Event = function () {
        var WRAPPERS = {};
        var BUILTINS = {
            filterchange: true,
            abort: true,
            blur: true,
            change: true,
            click: true,
            contextmenu: true,
            dblclick: true,
            error: true,
            focus: true,
            keydown: true,
            keypress: true,
            transitionend: true,
            webkitTransitionEnd: true,
            webkitAnimationEnd: true,
            keyup: true,
            load: true,
            message: true,
            mousedown: true,
            mousemove: true,
            mouseover: true,
            mouseout: true,
            mouseup: true,
            reset: true,
            resize: true,
            scroll: true,
            select: true,
            selectstart: true,
            submit: true,
            unload: true,
            beforeunload: true,
            copy: true,
            DOMMouseScroll: true,
            mousewheel: true,
            DOMContentLoaded: true,
            touchstart: true,
            touchmove: true,
            touchend: true,
            touchcancel: true,
            pageshow: true,
            pagehide: true,
            popstate: true,
            orientationchange: true
        };
        var eventMap = new EventMap();
        var bubbleMap = {};
        var crossDomainPoller;
        var lastMsgTimeStamp = 0;
        var startHistoryLength = window.history.length - 1;
        var baseTime = new Date().getTime();
        var msgBuffer = [];
        var parentURL = (document.referrer + "").split("#")[0];

        function onHashChange(hash) {
            if (!hash || !window.location.href) {
                return
            }
            hash = decodeURIComponent((window.location.href).split("#")[1]);
            try {
                var msg = eval("(" + hash + ")");
                if (msg && msg.seq) {
                    if (msg.t < lastMsgTimeStamp) {
                        Event.trigger(Event.XFRAME, "back");
                        window.history.go(startHistoryLength - window.history.length)
                    } else {
                        lastMsgTimeStamp = (new Date()).getTime()
                    }
                    if (msg.seq == 1) {
                        msgBuffer = []
                    }
                    msgBuffer.push(msg.data);
                    if (msg.last) {
                        var data = eval("(" + msgBuffer.join("") + ")");
                        if (data.e) {
                            Event.trigger(Event.XFRAME, data.e, data.m)
                        }
                    } else {
                        Event.postMessage(window.parent, parentURL, "_ack")
                    }
                }
                var orig = (window.location.href).split("#")[0] + "#";
                var scroll = scrollXY();
                try {
                    window.location.replace(orig)
                } catch (e1) {
                    window.location = orig
                }
                setScroll(scroll)
            } catch (e2) {}
        }
        function postMessageChunk(tgt, base, data, seq, last) {
            var msg = encodeURIComponent(JSON2.stringify({
                data: "PLACEHOLDER",
                seq: seq,
                t: (new Date()).getTime(),
                last: last
            }));
            var length = data.length;
            if (data.match(/%$/)) {
                length -= 1;
                data = data.substr(0, length)
            } else {
                if (data.match(/%[0-9A-F]$/)) {
                    length -= 2;
                    data = data.substr(0, length)
                }
            }
            while (data.match(/%5C$/)) {
                length -= 3;
                data = data.substr(0, length)
            }
            msg = msg.replace("PLACEHOLDER", data);
            msg = base + "#" + msg;
            try {
                tgt.location.replace(msg)
            } catch (e2) {
                tgt.location = msg
            }
            return length
        }
        var fireOnceHash = new Hash();
        return {
            getPageXY: function (event, tmp) {
                var x = event.pageX;
                tmp = tmp ? tmp : new Point(0, 0);
                if (!x && 0 !== x) {
                    x = event.clientX || 0
                }
                var y = event.pageY;
                if (!y && 0 !== y) {
                    y = event.clientY || 0
                }
                if (Browser.isIE) {
                    var scroll = scrollXY();
                    tmp.x = x + scroll.x;
                    tmp.y = y + scroll.y
                } else {
                    tmp.x = x;
                    tmp.y = y
                }
                return tmp
            },
            getChar: function (event) {
                if (!event) {
                    return ""
                }
                return String.fromCharCode(event.charCode || event.keyCode)
            },
            addDomListener: function (source, event, wrapper) {
                if (event == "dblclick" && Browser.isSafari) {
                    source.ondblclick = wrapper
                } else {
                    if (source.addEventListener) {
                        source.addEventListener(event, wrapper, false)
                    } else {
                        if (source.attachEvent) {
                            source.attachEvent("on" + event, wrapper)
                        } else {
                            source["on" + event] = wrapper
                        }
                    }
                }
            },
            removeDomListener: function (source, event, wrapper) {
                if (source.removeEventListener) {
                    source.removeEventListener(event, wrapper, false)
                } else {
                    if (source.detachEvent) {
                        source.detachEvent("on" + event, wrapper)
                    } else {
                        source["on" + event] = null
                    }
                }
            },
            postMessage: function (tgt, base, event, message) {
                if (!tgt) {
                    tgt = window.parent
                }
                if (!tgt) {
                    return
                }
                if (!base) {
                    base = (document.referrer + "").split("#")[0]
                }
                try {
                    if (tgt.contentWindow) {
                        tgt = tgt.contentWindow
                    }
                } catch (el) {}
                base = base.split("#")[0];
                var msg = encodeURIComponent(JSON2.stringify(JSON2.stringify({
                    e: event,
                    m: message
                })).replace(/(^"|"$)/g, ""));
                var chunkSize = 8000;
                if (Browser.isIE) {
                    chunkSize = 1900
                }
                var seq = 1;
                var postNextChunk = function () {
                        var last = (msg.length <= chunkSize);
                        var length = last ? msg.length : chunkSize;
                        var chunk = msg.substr(0, length);
                        length = postMessageChunk(tgt, base, chunk, seq, last);
                        if (!last) {
                            msg = msg.substr(length)
                        }
                        seq++;
                        return last
                    };
                if (!postNextChunk()) {
                    var listener = Event.addListener(Event.XFRAME, "_ack", function () {
                        if (postNextChunk()) {
                            listener.clean()
                        }
                    })
                }
            },
            addListener: function (source, event, listener, object) {
                if (!source || !event) {
                    var jslint = window._Debug && window._Debug.logStackTrace();
                    console.log("ERROR: addListener called on invalid source or event:", source, event);
                    return
                }
                if (Browser.layoutEngine("WebKit") && event == "transitionend") {
                    event = "webkitTransitionEnd"
                }
                var wrapper;
                var fireOnce = Event.FIREONCE.get(source, event);
                if (fireOnce !== undefined) {
                    if (fireOnce) {
                        window.setTimeout(function () {
                            listener.apply(object)
                        });
                        return null
                    } else {
                        wrapper = function () {
                            Event.removeListener(source, event, wrapper);
                            listener.apply(object)
                        }
                    }
                }
                if (event == "scrollbottom") {
                    var eventObject = eventMap.getOrInitEventObjects(source, event);
                    if (!eventObject.scrollBottomDetector) {
                        eventObject.scrollBottomDetector = new ScrollBottomDetector(source)
                    }
                    if (!eventObject.scrollBottomDetector.isAttached()) {
                        eventObject.scrollBottomDetector.attach(source)
                    }
                    if (eventObject.scrollBottomDetector.isAtBottom()) {
                        yield(listener, object)
                    }
                } else {
                    if (event == "mousewheel" && Browser.isFirefox) {
                        event = "DOMMouseScroll"
                    }
                }
                if (source.tagName == "INPUT" && source.type) {
                    var inputType = source.type.toUpperCase();
                    if ((inputType == "CHECKBOX" || inputType == "RADIO") && event == "change" && Browser.isIE) {
                        event = "click";
                        wrapper = function () {
                            window.setTimeout(function () {
                                listener.apply(object)
                            }, 0)
                        }
                    }
                }
                if (!wrapper) {
                    wrapper = Event.wrapper(listener, object)
                }
                if (/mousepause([0-9]*)$/.test(event)) {
                    var timer = new Timer();
                    var delay = Number(RegExp.$1);
                    if (isNaN(delay) || (!delay && delay !== 0)) {
                        delay = 500
                    }
                    Event.addListener(source, "mousemove", function (e) {
                        timer.replace(wrapper, delay)
                    });
                    Event.addListener(source, "mouseout", timer.reset, timer)
                }
                switch (event) {
                case "dragstart":
                    Event.addListener(source, "mousedown", DragDrop.onMouseDown, DragDrop);
                    Event.addDomListener(source, "dragstart", Event.stop);
                    break;
                case "drop":
                    DragDrop.addDropListener(source);
                    break;
                default:
                    if (source == Event.XFRAME) {
                        if (!crossDomainPoller) {
                            crossDomainPoller = new Monitor(function () {
                                return window.location.hash
                            }, 100);
                            Event.addListener(crossDomainPoller, "change", onHashChange)
                        }
                    } else {
                        if (source == Event.BACKEND) {
                            if (!Event.BACKEND.listening) {
                                Event.addListener(Cookie, "change", Event.checkForBackendEvent);
                                Event.BACKEND.listening = true
                            }
                        } else {
                            if (Event.isBuiltIn(source, event)) {
                                Event.addDomListener(source, event, wrapper)
                            }
                        }
                    }
                }
                var listeners = eventMap.getOrInitEventObjects(source, event).listeners;
                listeners.push(wrapper);
                return new Listener(source, event, wrapper)
            },
            addSingleUseListener: function (source, event, listener, object) {
                var listenerRemover = function () {
                        var tmp = listener;
                        listener = null;
                        Event.removeListener(source, event, listenerRemover);
                        if (tmp) {
                            tmp.apply(this, arguments)
                        }
                    };
                return Event.addListener(source, event, listenerRemover, object)
            },
            removeListener: window._Debug ?
            function (source, event, method, object) {
                var cacheKey = getUID(method) + ":" + getUID(object);
                var wrappers = WRAPPERS[cacheKey] || [];
                wrappers.forEach(function (wrapper) {
                    Event._removeListener(source, event, wrapper)
                })
            } : function (source, event, method, object) {
                var wrapper = Event.wrapper(method, object);
                Event._removeListener(source, event, wrapper)
            },
            _removeListener: function (source, event, wrapper) {
                if (event == "drop") {
                    DragDrop.removeDropListener(source)
                } else {
                    if (source == Event.XFRAME) {} else {
                        if (Event.isBuiltIn(source, event)) {
                            Event.removeDomListener(source, event, wrapper)
                        }
                    }
                }
                var listeners = eventMap.getPVListeners(source, event) || [];
                for (var i = 0; i < listeners.length; ++i) {
                    if (listeners[i] == wrapper) {
                        listeners.splice(i, 1);
                        return
                    }
                }
            },
            addCustomBubble: function (child, parent) {
                if (child == parent) {
                    console.log("parent is the same as child");
                    return
                }
                var childId = getUID(child);
                if (!bubbleMap[childId]) {
                    bubbleMap[childId] = []
                }
                bubbleMap[childId].push(parent)
            },
            bubble: function () {
                var source = arguments[0];
                var event = arguments[1];
                var evt = arguments[2] || {};
                while (source) {
                    var listeners;
                    if ((listeners = eventMap.getPVListeners(source, event)) && listeners.length) {
                        arguments[0] = source;
                        Event.trigger.apply(Event, arguments);
                        if (evt.cancelBubble) {
                            break
                        }
                    }
                    source = source.parentNode
                }
            },
            trigger: function () {
                var source = arguments[0];
                var event = arguments[1];
                var i;
                var listenedEvent = eventMap.getListenedEvent(source, event);
                if (listenedEvent) {
                    var fireOnce = Event.FIREONCE.get(source, event);
                    if (fireOnce !== undefined) {
                        if (fireOnce) {
                            return
                        }
                    }
                    var args = Array.prototype.slice.apply(arguments, [2]);
                    if (listenedEvent.shouldBundle) {
                        listenedEvent.triggered = args;
                        return
                    }
                    var listeners = listenedEvent.listeners.slice(0);
                    var listener;
                    var errs = [];
                    if (Conf.isStaging()) {
                        for (i = 0; i < listeners.length; ++i) {
                            listener = listeners[i];
                            listener.apply(listener, args)
                        }
                    } else {
                        for (i = 0; i < listeners.length; ++i) {
                            listener = listeners[i];
                            try {
                                listener.apply(listener, args)
                            } catch (e) {
                                errs.push(e)
                            }
                        }
                    }
                    if (errs.length) {
                        console.error("Handlers for event ", event, " had errors: ", errs);
                        throw errs[0]
                    }
                } else {}
                var sourceId = getUID(source);
                if (bubbleMap[sourceId]) {
                    var parents = bubbleMap[sourceId];
                    for (i = 0; i < parents.length; i++) {
                        arguments[0] = parents[i];
                        Event.trigger.apply(Event, arguments)
                    }
                }
            },
            release: function (source) {
                eventMap.release(source);
                var sourceId = getUID(source);
                if (bubbleMap[sourceId]) {
                    delete bubbleMap[sourceId]
                }
                if (window.DragDrop !== undefined) {
                    DragDrop.removeDropListener(source)
                }
            },
            releaseAll: function () {
                eventMap.releaseAll(function (sourceId) {
                    if (bubbleMap[sourceId]) {
                        delete bubbleMap[sourceId]
                    }
                });
                if (window.DragDrop !== undefined) {
                    DragDrop.removeDropListener(source)
                }
            },
            rateLimit: function (method, delay) {
                if (!delay) {
                    return method
                } else {
                    var timer = new Timer();
                    var timerIsSet = true;
                    var hadCall = null;
                    timer.replace(function () {
                        if (hadCall) {
                            method.apply(null, hadCall);
                            timerIsSet = true;
                            hadCall = null;
                            timer.reschedule(delay)
                        } else {
                            hadCall = null;
                            timerIsSet = false
                        }
                    }, delay);
                    return function () {
                        if (timerIsSet) {
                            hadCall = arguments;
                            return
                        }
                        method.apply(null, arguments);
                        timerIsSet = true;
                        timer.reschedule(delay)
                    }
                }
            },
            wrapper: function (method, object) {
                if (!method) {
                    var jslint = window._Debug && window._Debug.logStackTrace();
                    console.log("Wrapper called with method = ", method);
                    return noop
                }
                if (!method.apply) {
                    var jslint2 = window._Debug && window._Debug.logStackTrace();
                    var origFunc = method;
                    method = function () {
                        window.__func = origFunc;
                        window.__obj = object;
                        window.__args = arguments;
                        var args = [];
                        for (var i = 0; i < arguments.length; ++i) {
                            args.push("__args[" + i + "]")
                        }
                        var rval = eval("(__obj || window).__func(" + args.join(",") + ")");
                        delete window.__args;
                        delete window.__obj;
                        delete window.__func;
                        return rval
                    }
                }
                var cacheKey = getUID(method) + ":" + getUID(object);
                if (window._Debug && (Browser.isFirefox || Browser.isChrome)) {
                    var stack = _Debug.getStackTrace();
                    var func = function () {
                            try {
                                return method.apply(object, arguments)
                            } catch (e) {
                                console.error(e, {
                                    exception: e,
                                    method: method,
                                    object: object,
                                    wrappedBy: stack,
                                    stack: e.stack.split(/\n/)
                                })
                            }
                        };
                    WRAPPERS[cacheKey] = WRAPPERS[cacheKey] || [];
                    WRAPPERS[cacheKey].push(func);
                    return func
                } else {
                    if (!object) {
                        return method
                    }
                    return (WRAPPERS[cacheKey] = WRAPPERS[cacheKey] ||
                    function () {
                        return method.apply(object, arguments)
                    })
                }
            },
            isBuiltIn: function (src, name) {
                if ((src.childNodes || src == window) && BUILTINS[name]) {
                    return true
                } else {
                    return false
                }
            },
            getSource: function (e) {
                return e.target || e.srcElement
            },
            getWheelDelta: function (e) {
                e = e || window.event;
                if (!e) {
                    return 0
                } else {
                    if (Browser.isIE) {
                        try {
                            return -e.wheelDelta / 120
                        } catch (err) {
                            return 0
                        }
                    } else {
                        if (Browser.isFirefox) {
                            return e.detail
                        } else {
                            if (Browser.isSafari || Browser.isChrome) {
                                return -e.wheelDelta / 3
                            } else {
                                return 0
                            }
                        }
                    }
                }
            },
            getRelatedTarget: function (e) {
                return e.relatedTarget || e.toElement || e.fromElement
            },
            stopBubble: function (event) {
                event.cancelBubble = true;
                if (event.stopPropagation) {
                    event.stopPropagation()
                }
            },
            stopDefault: function (event) {
                if (event.preventDefault) {
                    event.preventDefault()
                } else {
                    event.returnValue = false
                }
                return false
            },
            defaultPrevented: function (e) {
                return (e.defaultPrevented || e.returnValue === false || !! (e.getPreventDefault && e.getPreventDefault()))
            },
            stop: function (event) {
                if (event.type == "mousedown" || event.type == "click") {
                    if (window.Track !== undefined) {
                        Track.trackDomNode("click", Event.getSource(event))
                    }
                }
                Event.stopBubble(event);
                return Event.stopDefault(event)
            },
            checkForBackendEvent: function () {
                var events = Cookie.get("e", true);
                if (!events || !events.uuid) {
                    return
                }
                var now = new Date().getTime();
                if (!events._lts) {
                    events._lts = now;
                    Cookie.set("e", events)
                }
                if (baseTime - events._lts > 20000) {
                    Cookie.clear("e");
                    return
                }
                var seen = WindowSession.get("events") || {};
                if (seen[events.uuid]) {
                    return
                }
                seen[events.uuid] = now;
                forEachKey(seen, function (k) {
                    if (baseTime - seen[k] > 30000) {
                        delete seen[k]
                    }
                });
                WindowSession.set("events", seen);
                Event.triggerBackendEvents(events.list)
            },
            triggerBackendEvents: function (list) {
                if (list) {
                    Event.addListener(document, "modifiable", function () {
                        yield(function () {
                            list.forEach(function (event) {
                                event.unshift(Event.BACKEND);
                                Event.trigger.apply(Event, event)
                            })
                        })
                    })
                }
            },
            bundleEvents: function (source, event) {
                var listenedEvent = eventMap.getOrInitEventObjects(source, event);
                if (listenedEvent) {
                    delete listenedEvent.triggered;
                    listenedEvent.shouldBundle = true
                }
            },
            unbundleEvents: function (source, event, noTrigger) {
                var listenedEvent = eventMap.getListenedEvent(source, event);
                if (!listenedEvent) {
                    return
                }
                listenedEvent.shouldBundle = false;
                if (listenedEvent.triggered === undefined) {
                    return
                }
                if (!noTrigger) {
                    var args = [source, event];
                    args = args.concat(listenedEvent.triggered || []);
                    Event.trigger.apply(Event, args)
                }
                delete listenedEvent.triggered
            },
            pauseEvents: function (source, event) {
                Event.bundleEvents(source, event)
            },
            unpauseEvents: function (source, event) {
                Event.unbundleEvents(source, event, true)
            },
            XFRAME: {},
            BACKEND: {},
            FIREONCE: {
                get: function (src, event) {
                    var obj = fireOnceHash.get(src);
                    if (!obj) {
                        return undefined
                    }
                    return obj[event]
                },
                declare: function (src, event) {
                    var declaredEvents = fireOnceHash.get(src);
                    if (!declaredEvents) {
                        declaredEvents = {};
                        fireOnceHash.put(src, declaredEvents)
                    }
                    if (declaredEvents[event] === undefined) {
                        declaredEvents[event] = false;
                        var listener = Event.addListener(src, event, function () {
                            listener.clean();
                            declaredEvents[event] = true
                        })
                    }
                },
                reset: function (src, event) {
                    var declaredEvents = fireOnceHash.get(src);
                    if (!declaredEvents) {
                        console.log("WARNING: resetting an undeclared fireonce event");
                        return
                    }
                    declaredEvents[event] = false;
                    var listener = Event.addListener(src, event, function () {
                        listener.clean();
                        declaredEvents[event] = true
                    })
                }
            }
        }
    }();
Event.FIREONCE.declare(window, "load");
//Event.FIREONCE.declare(document, "domready");
Event.FIREONCE.declare(document, "modifiable");
Event.FIREONCE.declare(document, "available");
if (!Browser.isIE) {
    Event._domModOnAvail = Event.addListener(document, "available", function (a) {
        Event.trigger(document, "modifiable", a);
        if (Event._domModOnAvail) {
            Event._domModOnAvail.clean();
            delete Event._domModOnAvail
        }
    })
}
Event._domModOnReady = Event.addListener(document, "domready", function (b) {
    var a = function () {
            Event.trigger(document, "modifiable", b);
            if (Event._domModOnReady) {
                Event._domModOnReady.clean();
                delete Event._domModOnReady
            }
        };
    if (Browser.isIE && (document.getElementsByTagName("embed") || []).length) {
        window.setTimeout(a, 1000)
    } else {
        a()
    }
});
Event.addListener(window, "load", function () {
    if (!Event.FIREONCE.get(document, "domready")) {
        if (Browser.isSafari) {
            if (Event._safariTimer) {
                Event._safariTimer.clear();
                Event._safariTimer = null
            }
        }
        Event.trigger(document, "domready")
    }
    document.write = function (a) {
        (document.write._buffer = document.write._buffer || []).push(a)
    };
    document.writeln = function (a) {
        (document.write._buffer = document.write._buffer || []).push(a + "\n")
    }
});
if (Browser.isIE) {
    if (document.location.protocol != "https:") {
        document.write('<script id="__ie_onload" defer src="javascript:void(0)"><\/script>');
        try {
            document.getElementById("__ie_onload").onreadystatechange = function () {
                if (this.readyState == "complete") {
                    Event.trigger(document, "domready")
                }
            }
        } catch (ignore) {}
    }
} else {
    if (Browser.isSafari) {
        Event._safariTimer = new Interval(10, function () {
            if (/loaded|complete/.test(document.readyState)) {
                if (Event._safariTimer) {
                    Event._safariTimer.clear();
                    Event._safariTimer = null
                }
                Event.trigger(document, "domready")
            }
        })
    } else {
        if (Browser.isFirefox || Browser.isMozilla || Browser.isOpera) {
            Event.addListener(document, "DOMContentLoaded", function () {
                Event.trigger(document, "domready")
            })
        } else {}
    }
}
Event.addListener(window, "beforeunload", function () {
    if (Event.BACKEND.listening) {
        Event.removeListener(Cookie, "change", Event.checkForBackendEvent);
        Event.BACKEND.listening = false
    }
});

function Monitor(b, a) {
    var c = b();
    if (!a) {
        a = 100
    }
    this.check = function () {
        var d = b();
        if (d != c) {
            c = d;
            Event.trigger(this, "change", c)
        }
        return d
    };
    this.timer = new Interval(a, this.check, this)
}
Monitor.prototype.stop = function () {
    this.timer.clear()
};

function ScrollBottomDetector(a) {
    this.checkInterval = a.checkInterval || 1000;
    if (a.node) {
        this.attach(a.node)
    }
    this.clear()
}
ScrollBottomDetector.prototype.clear = function () {
    this._container = null;
    if (this._interval) {
        this._interval.clear();
        this._interval = null
    }
};
ScrollBottomDetector.prototype.isAttached = function () {
    return this._container !== null
};
ScrollBottomDetector.prototype.isAtBottom = function () {
    var c;
    if (!this._container || !(c = Dim.fromNode(this._container))) {
        this.clear();
        return false
    } else {
        if (c.h === 0 && c.w === 0) {
            return false
        }
    }
    var a = getWindowSize().h;
    var b = scrollXY().y + a;
    var d;
    if (this._container == document.body) {
        d = nodeXY(this._container).y + this._container.parentNode.scrollHeight
    } else {
        d = nodeXY(this._container).y + Dim.fromNode(this._container).h
    }
    return Math.abs(d - b) < Math.max(100, 1.5 * a)
};
ScrollBottomDetector.prototype.attach = function (a) {
    this._container = a;
    if (!this._interval) {
        this._interval = new Interval(this.checkInterval, function () {
            if (this.isAtBottom()) {
                Event.trigger(this._container, "scrollbottom")
            }
        }, this)
    }
    yield(function () {
        if (this.isAtBottom()) {
            Event.trigger(this._container, "scrollbottom")
        }
    }, this)
};
var WindowSession = function () {
        function a(c) {
            try {
                return JSON2.parse(c)
            } catch (d) {}
            return null
        }
        var b = {};
        Event.addListener(document, "modifiable", function () {
            b = a(window.name);
            if (!b || !b._pvid) {
                b = {
                    _pvid: Math.random()
                }
            }
        });
        return {
            id: function () {
                return b._pvid
            },
            set: function (c, d) {
                b[c] = d;
                window.name = JSON2.stringify(b)
            },
            get: function (c) {
                return b[c]
            },
            all: function () {
                return b
            }
        }
    }();

function isRightClick(a) {
    if (a.which) {
        return (a.which == 3)
    } else {
        if (a.button !== undefined) {
            return (a.button == 2)
        }
    }
    return false
}
function DataTransfer() {
    this.data = {};
    this.proxy = null;
    this.usingProxy = true
}
DataTransfer.prototype.setData = function (b, a) {
    this.data[b] = a
};
DataTransfer.prototype.getData = function (a) {
    return this.data[a]
};
var DragDrop = function () {
        var v = new Cleaner();
        var b = new Set();
        var d = new Point(0, 0);
        var s = new Point(0, 0);
        var h;
        var r;
        var x;
        var f = "init";
        var g;
        var q = null;
        var p;
        var n = true;
        var m;
        var w;

        function l(y) {
            Event.getPageXY(y, s);
            switch (f) {
            case "dragging":
                p.style.top = (s.y - g.y) + "px";
                p.style.left = (s.x - g.x) + "px";
                break;
            case "maybe":
                var z = Event.getSource(y);
                if (z == h && d.distance(s) > 3) {
                    if (Browser.isSafari) {
                        yield(function () {
                            o(y)
                        })
                    } else {
                        o(y)
                    }
                }
                break
            }
            return true
        }
        function u(A, B) {
            if (A.keepNode) {
                B.push(A.domNode)
            }
            var z = A.children;
            if (z) {
                if (!z.sorted) {
                    z.sort(zSort);
                    z.sorted = true
                }
                for (var y = 0; y < z.length; ++y) {
                    u(z[y], B)
                }
            }
        }
        function j(z) {
            var y;
            var B = {};
            z.forEach(function (F) {
                var C = null;
                var E = F;
                while (F && F.tagName != "HTML") {
                    var D = getUID(F);
                    var G = B[D];
                    if (!G) {
                        G = {
                            domNode: F,
                            z: Math.ceil(parseFloat(getStyle(F, "zIndex"))) || 0,
                            children: null
                        }
                    }
                    if (E == F) {
                        G.keepNode = true
                    }
                    if (C) {
                        G.children = G.children || [];
                        G.children.push(C)
                    }
                    if (B[D]) {
                        break
                    } else {
                        B[D] = G
                    }
                    C = G;
                    F = F.parentNode
                }
                y = y || C
            });
            var A = [];
            u(y, A);
            return A
        }
        function o(z) {
            x = new DataTransfer();
            z.xDataTransfer = x;
            Event.bubble(h, "dragstart", z);
            if (Browser.isIE) {
                v.push(Event.addListener(document, "selectstart", returnFalse))
            }
            p = x.proxy;
            if (!p) {
                return k()
            }
            n = x.usingProxy;
            var A = overlayZIndex(q);
            if (n) {
                if (!q) {
                    q = createNode("div", {
                        className: "dragproxy unselectable"
                    });
                    document.body.appendChild(q)
                }
                setNode(q, null, {
                    display: "block",
                    left: "0px",
                    top: "0px",
                    zIndex: A
                }, p);
                makeUnselectable(q);
                g = Dim.fromNode(q);
                g.x = g.w / 2;
                g.y = g.h / 2;
                setNode(q, null, {
                    visibility: "visible",
                    top: px(s.y - g.y),
                    left: px(s.x - g.x)
                });
                p = q
            } else {
                g = nodeXY(p);
                g.x = s.x - g.x;
                g.y = s.y - g.y;
                if (getStyle(p, "position") == "absolute") {
                    g.x -= depx(getStyle(p, "marginLeft"));
                    g.y -= depx(getStyle(p, "marginTop"))
                }
            }
            f = "dragging";
            m = ["dragging"];
            if (x.data) {
                forEachKey(x.data, function (C, B) {
                    var D = "dragging_" + C;
                    m.push(D);
                    if (B.type) {
                        m.push(D + "_" + B.type)
                    }
                })
            }
            addClass(document.body, m.join(" "));
            var y = j(b.values());
            if (w) {
                setNode(w, null, {
                    zIndex: A
                });
                show(w)
            } else {
                w = document.body.appendChild(createNode("div", {
                    className: "proxylayer"
                }, {
                    zIndex: A
                }))
            }
            y.forEach(function (D) {
                var G = Dim.fromNode(D);
                var F = nodeXY(D);
                var C = createNode("div", {
                    className: "dropproxy"
                }, {
                    top: px(F.y),
                    left: px(F.x),
                    width: px(G.w),
                    height: px(G.h)
                });
                var E = C;
                var B;
                if (window.Matrix && (B = Matrix.extract(D))) {
                    E = B.apply(C, D._data) || E
                }
                w.appendChild(C);
                E.node = D;
                Event.addListener(C, "mouseover", t);
                Event.addListener(C, "mouseout", a)
            });
            v.push(function () {
                hide(w);
                clearNode(w)
            })
        }
        function t(y) {
            if (!r) {
                var z = Event.getSource(y);
                y.xDataTransfer = x;
                Event.trigger(z.node, "dragenter", y);
                if (!x.cancelDefault) {
                    r = z.node
                }
            }
        }
        function a(y) {
            if (r) {
                var z = Event.getSource(y);
                y.xDataTransfer = x;
                Event.trigger(z.node, "dragleave", y);
                r = null
            }
        }
        function c(y) {
            if (f == "dragging") {
                y.xDataTransfer = x;
                if (r) {
                    Event.bubble(r, "drop", y, r);
                    if (y.cancelDefault) {}
                }
                Event.bubble(h, "dragend", y, r)
            }
            k()
        }
        function k() {
            if (n) {
                setNode(q, null, {
                    display: "none"
                }, "")
            }
            if (m) {
                removeClass(document.body, m.join(" "));
                m = null
            }
            v.clean();
            d.x = d.y = s.x = s.y = 0;
            h = r = x = p = null;
            cleanupProxy = true;
            f = "init";
            Event.trigger(DragDrop, "dragend")
        }
        return {
            getData: function () {
                return x
            },
            proxy: function () {
                if (n) {
                    return q
                }
                return null
            },
            onMouseDown: function (y) {
                if (f != "init") {
                    k()
                }
                f = "maybe";
                Event.getPageXY(y, d);
                h = Event.getSource(y);
                v.push(Event.addListener(document, "mousemove", l));
                v.push(Event.addListener(document, "mouseup", c));
                v.push(Event.addListener(h, "contextmenu", Event.stop));
                if (Browser.isSafari) {} else {
                    Event.trigger(document, "mymousedown", y);
                    return Event.stop(y)
                }
            },
            addDropListener: function (y) {
                b.put(y)
            },
            removeDropListener: function (y) {
                b.remove(y)
            }
        }
    }();
var Cookie = function () {
        var _cookie = null;
        var _domain = null;
        var _interval = null;
        var _user = {};
        var _canNotSetCookies = false;
        var _whitelist = null;
        Event.addListener(document, "modifiable", function () {
            _interval = new Interval(1000, function () {
                if (!_cookie || _cookie != document.cookie) {
                    _cookie = document.cookie;
                    Event.trigger(this, "change")
                }
            }, Cookie);
            Cookie.set("__test", "foo");
            if (Cookie.get("__test")) {
                Cookie.set("__test")
            } else {
                _canNotSetCookies = true
            }
        });
        return {
            clear: function (name) {
                var date = new Date();
                date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
                var cookie = name + "=''; expires=" + date.toGMTString() + "; path=/; domain=.";
                _domain = _domain || Conf.getCookieDomain() || "";
                var parts = _domain.split(".");
                if (parts.length > 2) {
                    parts.splice(0, parts.length - 2)
                }
                document.cookie = cookie + parts.join(".");
                return true
            },
            set: function (name, data, ttl) {
                if (!_whitelist) {
                    _whitelist = window._cookieWhitelist || [];
                    for (var i = 0; i < _whitelist.length; i++) {
                        _whitelist[i] = _whitelist[i].replace("{id}", Auth.userId() || Auth.browserId())
                    }
                }
                if (_whitelist && _whitelist.length) {
                    var whitelisted = false;
                    for (var j = 0; j < _whitelist.length; j++) {
                        if (name.toLowerCase() == _whitelist[j].toLowerCase()) {
                            whitelisted = true;
                            break
                        }
                    }
                    if (!whitelisted) {
                        console.log("Cookie.set called with non-whitelisted name: ", name);
                        return false
                    }
                }
                var value = "";
                if (data) {
                    if (data.constructor == String) {
                        value = data
                    } else {
                        value = encodeURIComponent(JSON2.stringify(data))
                    }
                }
                var expires = "";
                if (value === "") {
                    ttl = -1
                }
                if (ttl !== undefined) {
                    var date = new Date();
                    date.setTime(date.getTime() + (ttl * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString()
                }
                try {
                    if (!_domain) {
                        _domain = Conf.getCookieDomain()
                    }
                    if (value !== "") {
                        var limit = 8192;
                        if (Browser.isIE) {
                            limit = 4096
                        }
                        var extra = 56 + _domain.length;
                        var oldLength = 0;
                        if (document.cookie) {
                            var cookies = document.cookie.split(/;\s*/);
                            oldLength = cookies.length * extra + document.cookie.length
                        }
                        var oldValue = Cookie.get(name, false);
                        var oldValueLength = oldValue ? oldValue.length : 0;
                        if ((oldLength + value.length - oldValueLength) > limit) {
                            var error = "exceeds " + limit + " bytes limit for cookie";
                            console.log(error);
                            throw (error)
                        }
                    }
                    document.cookie = name + "=" + value + expires + "; path=/; domain=" + _domain;
                    return true
                } catch (e) {
                    _canNotSetCookies = true;
                    return false
                }
            },
            get: function (name, parse) {
                var cookies = document.cookie.split(/;\s*/);
                for (var i = 0; i < cookies.length; ++i) {
                    var bits = cookies[i].split("=", 2);
                    if (bits[0] == name) {
                        if (parse) {
                            try {
                                return eval("(" + decodeURIComponent(bits[1]) + ")")
                            } catch (e) {}
                        } else {
                            return bits[1]
                        }
                    }
                }
                return null
            },
            canNotSetCookies: function () {
                return _canNotSetCookies
            }
        }
    }();

function Timer() {
    this.timerID = null
}
Timer.prototype.reset = function () {
    if (this.timerID) {
        window.clearTimeout(this.timerID);
        this.timerID = null;
        this.cb = null
    }
};
Timer.prototype.replace = function (a, b) {
    this.cb = a;
    this.reset();
    this.timerID = window.setTimeout(a, b)
};
Timer.prototype.reschedule = function (a) {
    if (this.timerID) {
        window.clearTimeout(this.timerID)
    }
    if (this.cb) {
        this.timerID = window.setTimeout(this.cb, a)
    }
};
var Auth = function () {
        var d = 0;
        var a = {};
        var f = null;
        var b = {};
        var c = {};
        if (window.Event && Event.addListener) {
            Event.addListener(Event.BACKEND, "signin", function (g) {
                window._xsrfToken = g || window._xsrfToken;
                a = {};
                f = null;
                b = {};
                c = {};
                localStorage.setItem("signedInBefore", 1)
            });
            Event.addListener(Event.BACKEND, "signout", function () {
                window._xsrfToken = null;
                a = {};
                f = null;
                b = {};
                c = {}
            })
        }
        yield(function () {
            if (Auth.isLoggedIn()) {
                localStorage.setItem("signedInBefore", 1)
            }
        });
        return {
            user: function () {
                if (!a.id) {
                    var g = Cookie.get("l", false);
                    if (g && g.match(/\bid&([0-9]+)/)) {
                        a.id = RegExp.$1
                    }
                    if (g && g.match(/\bn&([^&]+)/)) {
                        a.name = decodeURIComponent(RegExp.$1)
                    }
                    if (g && g.match(/\bsp&1/)) {
                        a.isSponsor = true
                    }
                }
                return a
            },
            userId: function () {
                return Auth.user().id
            },
            isSponsorUser: function () {
                return Auth.user().isSponsor ? true : false
            },
            userCookie: function () {
                return Cookie.get("l", false)
            },
            browserId: function () {
                if (!d) {
                    d = parseInt(Cookie.get("v"), 10)
                }
                return d
            },
            setToken: function (g) {
                f = g
            },
            getToken: function () {
                return f
            },
            setUser: function (g) {
                a = g
            },
            isLoggedIn: function () {
                return (f || Auth.userCookie()) && window._xsrfToken
            },
            setServices: function (g, k, j) {
                var h = j || "";
                b[h] = g;
                c[h] = k
            },
            getServices: function (j, h) {
                var g = h || "";
                if (b[g]) {
                    j(b[g], c[g]);
                    return
                }
                Ajax.get({
                    hideProgress: true,
                    action: "account.sharing",
                    data: {
                        filter: g
                    },
                    onSuccess: function (k) {
                        Auth.setServices(k.services_data, k.quickshare, g)
                    },
                    onError: function () {
                        Auth.setServices({}, false, g)
                    },
                    onFinally: function () {
                        j(b[g], c[g])
                    }
                })
            }
        }
    }();
if (!window.isHTMLMobile && !isHTMLMobile()) {
    Event.addListener(Event.BACKEND, "migrated_browser_save", function (a) {
        if (localStorage.getItem("hide_signin_on_migrated_browser_save")) {
            return
        }
        Feedback.message(loc("Did you mean to sign in?"));
        SignInBox.signInOrRegister({
            onSuccess: reloadPage,
            onCancel: function () {
                localStorage.setItem("hide_signin_on_migrated_browser_save", 1)
            }
        })
    })
}
function callOrSignIn(a) {
    if (Auth.isLoggedIn()) {
        a()
    } else {
        SignInBox.signInOrRegister({
            onSuccess: function () {
                a()
            }
        })
    }
}
function Dim(a, b) {
    this.w = Math.abs(a);
    this.h = Math.abs(b);
    if (a === 0) {
        this.aspect = Math.INF
    } else {
        this.aspect = b / a
    }
}
Dim.fromNode = function (a) {
    return new Dim(parseInt(a.offsetWidth, 10), parseInt(a.offsetHeight, 10))
};
Dim.prototype.toString = function () {
    return "(" + this.w + "x" + this.h + ")"
};
Dim.prototype.scale = function (a) {
    this.w = this.w * a;
    this.h = this.h * a
};
Dim.prototype.clone = function () {
    return new Dim(this.w, this.h)
};
Dim.prototype.fit = function (a) {
    var b = Math.min(a.w / this.w, a.h / this.h);
    if (b < 1) {
        this.scale(b)
    }
};
Dim.prototype.equals = function (a) {
    return !(this.w != a.w || this.h != a.h)
};

function Rect(b, d, a, c) {
    this.x1 = b || 0;
    this.y1 = d || 0;
    this.x2 = a || 0;
    this.y2 = c || 0
}
Rect.fromNode = function (a) {
    var c = nodeXY(a);
    var b = Dim.fromNode(a);
    return new Rect(c.x, c.y, c.x + b.w, c.y + b.h)
};
Rect.prototype.toString = function () {
    return "(" + [this.x1, this.y1, this.x2, this.y2].join(", ") + ")"
};
Rect.prototype.equals = function (a) {
    return !(this.x1 != a.x1 || this.y1 != a.y1 || this.x2 != a.x2 || this.y2 != a.y2)
};
Rect.prototype.translate = function (b, a) {
    this.x1 += b;
    this.y1 += a;
    this.x2 += b;
    this.y2 += a;
    return this
};
Rect.prototype.getLocationXY = function (a) {
    switch (a) {
    case "n":
        return new Point(this.x1 + this.width() / 2, this.y1);
    case "ne":
        return new Point(this.x2, this.y1);
    case "e":
        return new Point(this.x2, this.y1 + this.height() / 2);
    case "se":
        return new Point(this.x2, this.y2);
    case "s":
        return new Point(this.x1 + this.width() / 2, this.y2);
    case "sw":
        return new Point(this.x1, this.y2);
    case "w":
        return new Point(this.x1, this.y1 + this.height() / 2);
    case "nw":
        return new Point(this.x1, this.y1)
    }
};
Rect.oppositeLocation = function (a) {
    switch (a) {
    case "n":
        return "s";
    case "ne":
        return "sw";
    case "e":
        return "w";
    case "se":
        return "nw";
    case "s":
        return "n";
    case "sw":
        return "ne";
    case "w":
        return "e";
    case "nw":
        return "se"
    }
    return "n"
};
Rect.prototype.move = function (c, b, a) {
    this.x1 = c.x1 + b;
    this.x2 = c.x2 + b;
    this.y1 = c.y1 + a;
    this.y2 = c.y2 + a;
    return this
};
Rect.prototype.scale = function (b, a) {
    if (a) {
        this.translate(-a.x, -a.y)
    }
    this.x1 *= b.x;
    this.y1 *= b.y;
    this.x2 *= b.x;
    this.y2 *= b.y;
    if (a) {
        this.translate(a.x, a.y)
    }
    return this
};
Rect.prototype.aspect = function () {
    return this.height() / this.width()
};
Rect.prototype.setAspect = function (a) {
    this.setHeight(this.width() * a, 0)
};
Rect.prototype.expand = function (a) {
    this.x1 = Math.min(this.x1, a.x1);
    this.y1 = Math.min(this.y1, a.y1);
    this.x2 = Math.max(this.x2, a.x2);
    this.y2 = Math.max(this.y2, a.y2);
    return this
};
Rect.prototype.clone = function () {
    return new Rect(this.x1, this.y1, this.x2, this.y2)
};
Rect.prototype.width = function () {
    return Math.abs(this.x2 - this.x1)
};
Rect.prototype.setWidth = function (a, c) {
    if (c || c === 0) {
        var f = a - this.width();
        c = Math.max(this.x1, c);
        c = Math.min(this.x2, c);
        var b = this.width() ? Math.abs(this.x1 - c) / this.width() : 0.5;
        var d = b * Math.abs(f);
        if (f < 0) {
            this.x1 += d
        } else {
            this.x1 -= d
        }
    }
    return (this.x2 = this.x1 + a)
};
Rect.prototype.height = function () {
    return Math.abs(this.y2 - this.y1)
};
Rect.prototype.setHeight = function (b, d) {
    if (d || d === 0) {
        var f = b - this.height();
        d = Math.max(this.y1, d);
        d = Math.min(this.y2, d);
        var c = this.height() ? Math.abs(this.y1 - d) / this.height() : 0.5;
        var a = c * Math.abs(f);
        if (f < 0) {
            this.y1 += a
        } else {
            this.y1 -= a
        }
    }
    return (this.y2 = this.y1 + b)
};
Rect.prototype.area = function () {
    return this.width() * this.height()
};
Rect.prototype.top = function () {
    return this.y1
};
Rect.prototype.bottom = function () {
    return this.y2
};
Rect.prototype.left = function () {
    return this.x1
};
Rect.prototype.right = function () {
    return this.x2
};
Rect.prototype.dim = function () {
    return new Dim(this.width(), this.height())
};
Rect.prototype.center = function () {
    return new Point((this.x2 + this.x1) / 2, (this.y2 + this.y1) / 2)
};
Rect.prototype.XYWH = function () {
    return {
        x: this.left(),
        y: this.top(),
        w: this.width(),
        h: this.height()
    }
};
Rect.prototype.getTransformedBounds = function (b, a) {
    var c = this.clone();
    if (a) {
        c.translate(-a.x, -a.y)
    }
    var d = [b.transform(c.x1, c.y1), b.transform(c.x2, c.y1), b.transform(c.x2, c.y2), b.transform(c.x1, c.y2)];
    c.x1 = Math.min(d[0].x, d[1].x, d[2].x, d[3].x);
    c.y1 = Math.min(d[0].y, d[1].y, d[2].y, d[3].y);
    c.x2 = Math.max(d[0].x, d[1].x, d[2].x, d[3].x);
    c.y2 = Math.max(d[0].y, d[1].y, d[2].y, d[3].y);
    if (a) {
        c.translate(a.x, a.y)
    }
    return c
};
Rect.prototype.isInside = function (a) {
    return this.x1 <= a.x && a.x <= this.x2 && this.y1 <= a.y && a.y <= this.y2
};
var InputHint = function () {
        return {
            reset: function (a) {
                a = $_(a);
                if (a) {
                    var b = a.getAttribute("input_hint") || "";
                    if (b) {
                        addClass(a, "input_hint")
                    }
                    a.value = b
                }
            },
            setValue: function (a, b) {
                a = $_(a);
                if (a) {
                    removeClass(a, "input_hint");
                    if (b) {
                        a.value = b
                    } else {
                        a.value = ""
                    }
                }
            },
            setHint: function (a, b) {
                a = $_(a);
                if (a && b) {
                    a.setAttribute("input_hint", b)
                }
            },
            isHint: function (a) {
                a = $_(a);
                return hasClass(a, "input_hint")
            },
            add: function (a, c, b) {
                a = $_(a);
                b = $_(b);
                if (a && c) {
                    InputHint.setHint(a, c);
                    if (!inputValue(a)) {
                        InputHint.reset(a)
                    }
                    Event.addListener(a, "focus", function () {
                        if (InputHint.isHint(a)) {
                            removeClass(a, "input_hint");
                            a.value = ""
                        }
                    });
                    Event.addListener(a, "blur", function () {
                        if (InputHint.isHint(a) || !a.value) {
                            addClass(a, "input_hint");
                            a.value = a.getAttribute("input_hint")
                        }
                    });
                    Event.addListener(window, "beforeunload", function () {
                        if (InputHint.isHint(a)) {
                            a.value = ""
                        }
                    });
                    if (b) {
                        Event.addListener(b, "submit", function () {
                            if (InputHint.isHint(a)) {
                                a.value = ""
                            }
                        })
                    }
                }
            }
        }
    }();
var JSON2;
if (!JSON2) {
    JSON2 = {}
}(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    Date.prototype.toJSON = function (key) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    };
    String.prototype.toJSON = Number.prototype.toJSON = function (key) {
        return this.valueOf()
    };
    Boolean.prototype.toJSON = function (key) {
        return this.valueOf() ? 1 : 0
    };
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
            return value ? 1 : 0;
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON2.parse !== "function") {
        JSON2.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());

function Point(a, b) {
    this.x = a;
    this.y = b
}
Point.prototype.distance = function (a) {
    return Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2))
};
Point.prototype.equals = function (a) {
    return (this.x == a.x) && (this.y == a.y)
};
Point.origin = new Point(0, 0);
Point.prototype.toString = function () {
    return this.x + "," + this.y
};

function Props(a) {
    this.v = a || {}
}
Props.prototype.toArray = function () {
    return cloneObject(this.v)
};
Props.prototype.isEmpty = function () {
    var a = false;
    forEachKey(this.v, function (b, c) {
        return (a = true)
    });
    return !a
};
Props.prototype.clear = function () {
    var a = !this.isEmpty();
    this.v = {};
    if (a) {
        Event.trigger(this, "change", {})
    }
};
Props.prototype.set = function (b, d) {
    var a = this.v[b];
    if (d != a) {
        this.v[b] = d;
        var c = {};
        c[b] = {
            value: d,
            old: a
        };
        Event.trigger(this, "change", c)
    }
};
Props.prototype.reset = function (a) {
    Event.bundleEvents(this, "change");
    this.clear();
    this.update(a);
    Event.unbundleEvents(this, "change")
};
Props.prototype.get = function (a) {
    return this.v[a]
};
Props.prototype.update = function (a) {
    var g = false;
    var f = {};
    for (var c in a) {
        if (a.hasOwnProperty(c)) {
            var d = a[c];
            var b = this.v[c];
            if (d != b) {
                this.v[c] = d;
                g = true;
                f[c] = {
                    value: d,
                    old: b
                }
            }
        }
    }
    if (g) {
        Event.trigger(this, "change", f)
    }
    return g
};
Props.prototype.equals = function (a) {
    var f = false;
    for (var c in a) {
        if (a.hasOwnProperty(c)) {
            var d = a[c];
            var b = this.v[c];
            if (d != b) {
                f = true
            }
        }
    }
    return !f
};
Props.prototype.persist = function () {};
Props.prototype.restore = function () {};
RegExp.escape = (function () {
    var a = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
    var b = new RegExp("(\\" + a.join("|\\") + ")", "g");
    return function (c) {
        return c.replace(b, "\\$1")
    }
})();
if (!Array.prototype.sortByFreq) {
    Array.prototype.sortByFreq = function () {
        var b = {};
        this.forEach(function (a) {
            if (b[a]) {
                b[a]++
            } else {
                b[a] = 1
            }
        });
        var c = [];
        forEachKey(b, function (a) {
            c.push({
                k: a,
                v: b[a]
            })
        });
        return c.sort(function (f, d) {
            return f.v - d.v
        }).map(function (a) {
            return a.k
        })
    }
}
if (!Array.prototype.map) {
    Array.prototype.map = function (g, d) {
        var c = Event.wrapper(g, d);
        var a = [];
        for (var b = 0; b < this.length; ++b) {
            a.push(c(this[b], b, this))
        }
        return a
    }
}
if (!Array.max) {
    Array.max = function (a) {
        return Math.max.apply(Math, a)
    }
}
if (!Array.min) {
    Array.min = function (a) {
        return Math.min.apply(Math, a)
    }
}
if (!Array.prototype.forEachNonBlocking) {
    Array.prototype.forEachNonBlocking = function (b, f, c, h) {
        var d = 0;
        var g = this;
        var a = this.length;
        f = h ? Event.wrapper(f, h) : f;
        c = h ? Event.wrapper(c || noop, h) : (c || noop);
        loopNonBlocking(b, function () {
            if (d < a) {
                f(g[d++])
            } else {
                return true
            }
        }, c)
    }
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (h, g) {
        var d = Event.wrapper(h, g);
        var a = [];
        for (var b = 0; b < this.length; ++b) {
            var c = this[b];
            if (d(c)) {
                a.push(c)
            }
        }
        return a
    }
}
Array.prototype.uniq_by_key = function (b) {
    var a = {};
    return this.filter(function (d) {
        var c = d[b];
        if (c && a[c]) {
            return false
        }
        a[c] = true;
        return true
    })
};
if (!Array.prototype.uniq) {
    Array.prototype.uniq = function () {
        var a = [];
        var b = {};
        for (var c = 0; c < this.length; ++c) {
            var d = this[c];
            if (!b.hasOwnProperty(d)) {
                b[d] = 1;
                a.push(d)
            }
        }
        return a
    }
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (g, d) {
        var c = Event.wrapper(g, d);
        var a = this.length;
        for (var b = 0; b < this.length; ++b) {
            if (a != this.length) {
                throw "Attempt to modify array in forEach"
            }
            c(this[b])
        }
    }
}
if (!Array.prototype.forEachReverse) {
    Array.prototype.forEachReverse = function (g, d) {
        var c = Event.wrapper(g, d);
        var a = this.length;
        for (var b = a - 1; b >= 0; --b) {
            if (a != this.length) {
                throw "Attempt to modify array in forEach"
            }
            if (c(this[b])) {
                break
            }
        }
    }
}
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (b) {
        var a = this.length;
        if (typeof (b) != "function") {
            throw new TypeError()
        }
        if (a === 0 && arguments.length == 1) {
            throw new TypeError()
        }
        var c = 0;
        var d;
        if (arguments.length >= 2) {
            d = arguments[1]
        } else {
            do {
                if (c in this) {
                    d = this[c++];
                    break
                }
                if (++c >= a) {
                    throw new TypeError()
                }
            } while (true)
        }
        for (; c < a; c++) {
            if (c in this) {
                d = b.call(null, d, this[c], c, this)
            }
        }
        return d
    }
}
if (!Array.prototype.find) {
    Array.prototype.find = function (c, a) {
        a = a || compare;
        var b;
        for (b = 0; b < this.length; b++) {
            if (a(c, this[b])) {
                return b
            }
        }
        return -1
    }
}
if (!Array.prototype.contains) {
    Array.prototype.contains = function (b, a) {
        return this.find(b, a) >= 0
    }
}
if (!Array.prototype.some) {
    Array.prototype.some = function (b) {
        for (var a = 0; a < this.length; ++a) {
            if (b(this[a])) {
                return true
            }
        }
        return false
    }
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (c, a) {
        var b = this.find(c, a);
        if (b > -1) {
            return this.splice(b, 1)
        } else {
            return false
        }
    }
}
if (!Array.prototype.removeAll) {
    Array.prototype.removeAll = function (c, b) {
        var a = [];
        var d = false;
        do {
            d = this.remove(c, b);
            if (d !== false) {
                a.push(d)
            }
        } while (d);
        if (a.length > 0) {
            return a
        } else {
            return false
        }
    }
}
Array.prototype.swap = function (c, a) {
    var b = this[a];
    this[a] = this[c];
    this[c] = b
};
if (!String.prototype.ucFirst) {
    String.prototype.ucFirst = function () {
        if (this.length) {
            return this.charAt(0).toUpperCase() + this.substr(1)
        }
        return this
    }
}
if (!Date.prototype.stdTimezoneOffset) {
    Date.prototype.stdTimezoneOffset = function () {
        var a = new Date(this.getFullYear(), 0, 1);
        var b = new Date(this.getFullYear(), 6, 1);
        return Math.max(a.getTimezoneOffset(), b.getTimezoneOffset())
    }
}
if (!Date.prototype.dst) {
    Date.prototype.dst = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset()
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }
}
if (!String.prototype.ltrim) {
    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, "")
    }
}
if (!String.prototype.rtrim) {
    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, "")
    }
}
String.prototype.patternCount = function (b) {
    if (!b) {
        return 0
    }
    if (typeof (b) == "object" && b.constructor == RegExp.prototype.constructor) {
        b = new RegExp(b.source, "g")
    }
    var a = 0;
    this.replace(b, function () {
        a++
    });
    return a
};
if ("abc".split(/(b)/).length < 3) {
    String.prototype._oldSplit = String.prototype.split;
    String.prototype.split = function (c, a) {
        if (typeof (c) == "object" && c.constructor == RegExp.prototype.constructor) {
            var b = c.source;
            if (b.patternCount("\\(") < b.patternCount("(")) {
                var d = "$";
                while (this.indexOf(d) > -1) {
                    d += "$"
                }
                c = new RegExp(b, "g");
                return this.replace(c, function (f, g) {
                    return d + g + d
                })._oldSplit(d, a)
            }
        }
        return this._oldSplit(c, a)
    }
}
if (window.SVGAnimatedString) {
    SVGAnimatedString.prototype.split = function () {
        return []
    }
}
function escapeHTML(a) {
    return a.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/ {2}/g, "&nbsp;&nbsp;").replace(/\"/g, "&quot;")
}
function str2nodes(str, container) {
    var html = (str || "").split(/(<\/?scrip[t][^>]*>)/);
    var js = [];
    var inScript = false;
    html = html.filter(function (snippet) {
        snippet = (snippet || "").trim();
        if (!snippet) {
            return false
        } else {
            if (/^[<]script/.test(snippet)) {
                inScript = true;
                return false
            } else {
                if (snippet == "<\/script>") {
                    inScript = false;
                    return false
                } else {
                    if (inScript) {
                        js.push(snippet);
                        return false
                    } else {
                        return snippet
                    }
                }
            }
        }
    });
    var tmp = createNode("div", null, null, html.join(""));
    if (container) {
        while (tmp.childNodes.length) {
            container.appendChild(tmp.childNodes[0])
        }
        eval("(function(){" + js.join(";") + "}())")
    } else {
        return {
            nodes: toArray(tmp.childNodes),
            js: function () {
                eval("(function(){" + js.join(";") + "}())")
            }
        }
    }
}
function addList(d, b, a, c) {
    return d.appendChild(createNode("li", a, c, b))
}
function inputValue(a) {
    var b = null;
    if (window.InputHint && InputHint.isHint(a)) {
        return b
    }
    switch (a.tagName) {
    case "INPUT":
        switch (a.type) {
        case "text":
        case "submit":
        case "password":
        case "hidden":
        case "file":
            b = a.value;
            break;
        case "checkbox":
        case "radio":
            if (a.checked) {
                b = a.value
            }
            break
        }
        break;
    case "BUTTON":
    case "TEXTAREA":
    case "SELECT":
        b = a.value;
        break;
    default:
        throw "Not an input element"
    }
    return b
}
function decodeHtml(a) {
    if (!a) {
        return a
    }
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
}
function createImg(a, b) {
    var c = createNode("img", a, b);
    if (a.width) {
        c.width = a.width
    }
    if (a.height) {
        c.height = a.height
    }
    return c
}
function addTextCtrl(d, b) {
    var a = d.parentNode;
    var f = createNode("input", b);
    var g = createNode("span", {
        className: "add_row",
        title: loc("Add another option")
    });
    Event.addListener(g, "click", function () {
        addTextCtrl(g, b)
    });
    var c = createNode("span", {
        className: "del_row",
        title: loc("Remove this option")
    });
    Event.addListener(c, "click", function () {
        delTextCtrl(c)
    });
    domInsertAfter(a, createNode("li", null, null, [f, g, c]))
}
function delTextCtrl(b) {
    var a = b.parentNode;
    if (domRealChildrenCount(a.parentNode) < 3) {
        ModalDialog.alert(loc("You need at least two options"));
        return
    }
    domRemoveNode(a)
}
function createCopyPaste(b, c) {
    if (!b) {
        b = {}
    }
    var a = createNode("textarea", {
        className: "copypaste",
        readOnly: true,
        name: b.name,
        id: b.id,
        wrap: "soft",
        rows: b.rows || 6,
        cols: 30
    }, null, "");
    a.value = decodeHtml(c);
    Event.addListener(a, "click", function (d) {
        a.focus();
        a.select()
    });
    return a
}
function createInput(d, a, c) {
    if (!a) {
        a = {}
    }
    var f;
    a.type = d;
    switch (d) {
    case "radio":
    case "checkbox":
        return createCheckboxOrRadio(d, a, c);
    default:
        if (Browser.type("IE", 6, 8)) {
            var b = ['<input type="', d, '"'];
            if (a.name) {
                b.push(' name="');
                b.push(a.name + '"')
            }
            if (a.id) {
                b.push(' id="');
                b.push(a.id + '"')
            }
            b.push(" />");
            f = document.createElement(b.join(""));
            delete a.name;
            delete a.id;
            delete a.type;
            setNode(f, a, c)
        } else {
            f = _createNode("input", a, c)
        }
        return f
    }
}
function createCheckboxOrRadio(c, a, b) {
    if (!a) {
        a = {}
    }
    a.checked = a.defaultChecked = a.checked ? true : null;
    var d;
    if (Browser.type("IE", 6, 8) && c.toLowerCase() == "radio") {
        d = document.createElement(['<input type="radio" name="', a.name, '" id="', a.id, '" />'].join(""));
        setNode(d, a, b)
    } else {
        d = _createNode("input", a, b)
    }
    setNode(d, {
        type: c
    });
    if (a.value !== undefined) {
        d.setAttribute("value", a.value)
    }
    return d
}
function createSelect(b, f, c, d) {
    var a = createNode("select", b, f);
    c.forEach(function (h) {
        var g = a.appendChild(createNode("option", {
            value: h.value
        }, null, h.label));
        if (d && h.value == d) {
            setNode(g, {
                selected: true
            })
        }
    });
    return a
}
function createLabel(a, f, b) {
    var c = _createNode("label", a, f, b);
    var d = createNode("span");
    d.innerHTML = outerHTML(c);
    return d.childNodes[0]
}
function createList(a, d, b) {
    var c = createNode("ul", a, d);
    if (b) {
        b.forEach(function (f) {
            addList(c, f)
        })
    }
    return c
}
function createHTML(k, d, a, j) {
    var c = ["<", k, " "];
    var b, f;
    if (a) {
        if (Browser.isIE && a.hasOwnProperty("opacity") && !a.filter) {
            f = a.opacity;
            if (f || f === 0) {
                a.filter = "alpha(opacity=" + f * 100 + ")";
                a.zoom = a.zoom || 1
            }
        }
        var h = [];
        for (b in a) {
            if (!a.hasOwnProperty(b)) {
                continue
            }
            f = a[b];
            if (!f) {
                continue
            }
            var g = b.replace(/([A-Z])/g, "-$1").toLowerCase();
            h.push(g, ":", f, ";")
        }
        d = d || {};
        if (d.style) {
            d.style += ";" + h.join("")
        } else {
            d.style = h.join("")
        }
    }
    if (d) {
        if (d.hasOwnProperty("className")) {
            d["class"] = d.className
        }
        for (b in d) {
            if (!d.hasOwnProperty(b)) {
                continue
            }
            f = d[b];
            if (f || f === "" || f === false || f === 0) {
                c.push(b);
                c.push('="');
                c.push(f.replace('"', "&quot;"));
                c.push('" ')
            }
        }
    }
    c.push(">");
    if (j) {
        if (typeof (j) == "string") {
            c.push(j)
        } else {
            if (j.constructor == Array) {
                for (b = 0; b < j.length; ++b) {
                    if (typeof (j[b]) == "string") {
                        c.push(j[b])
                    } else {
                        c.push(outerHTML(j[b]))
                    }
                }
            } else {
                c.push(outerHTML(j))
            }
        }
    }
    if (!/^(br|option|li)$/.test(k)) {
        c.push("</", k, ">")
    }
    return c.join("")
}
function outboundLink(b, c, a) {
    b = b || {};
    b.target = "_blank";
    b.className = b.className || "outbound";
    b.trackelement = b.trackelement || "site";
    return createNode("a", b, c, a)
}
function getTbody(a) {
    var b = a.getElementsByTagName("tbody");
    if (b && b.length > 0) {
        return b[0]
    } else {
        return a.appendChild(createNode("tbody"))
    }
}
function outerHTML(b) {
    var a = document.createElement("div");
    replaceChild(a, b);
    return a.innerHTML
}
function selectInputText(b, d, a) {
    if (b.setSelectionRange) {
        b.setSelectionRange(d, a)
    } else {
        if (b.createTextRange) {
            var c = b.createTextRange();
            c.moveStart("character", d);
            c.moveEnd("character", a - b.value.length);
            c.select()
        } else {
            b.select()
        }
    }
}
function getCaretPosition(a) {
    if (!a.value) {
        return 0
    }
    try {
        if (typeof (a.selectionStart) == "number") {
            if (document.activeElement != a) {
                return -1
            }
            return a.selectionStart
        } else {
            if (document.selection) {
                try {
                    var f = document.selection.createRange();
                    var c = a.createTextRange();
                    c.setEndPoint("StartToStart", f);
                    return inputValue(a).lastIndexOf(c.text)
                } catch (d) {
                    return -1
                }
            } else {
                return -1
            }
        }
    } catch (b) {
        if (b.message.indexOf("Component returned failure code: 0x80004005") === 0 && !isAttachedToDom(a)) {
            return -1
        }
        throw b
    }
}
function stripHtml(a) {
    a = a.replace(/<[^>]*>/g, "");
    a = a.replace(/[ \t]+/g, " ");
    return a
}
function getVisibleHtmlText(a) {
    a = a.replace(/<script[^>]*>.*?<\/script>/ig, "");
    a = a.replace(/<head[^>]*>.*?<\/head>/ig, "");
    a = a.replace(/<style[^>]*>.*?<\/style>/ig, "");
    a = stripHtml(a);
    a = a.replace(/([\s\u00a0]){2,}/g, "$1");
    return a
}
function insertScriptNode(f, d) {
    var a = document.getElementsByTagName("script");
    if (a) {
        var b = a.length;
        for (var c = 0; c < b; c++) {
            if (a[c].src == f) {
                return
            }
        }
    }
    Event.addListener(document, "modifiable", function () {
        var h = false;
        var g = createNode("script", {
            src: f
        });
        if (d) {
            g.onload = g.onreadystatechange = function () {
                if (h) {
                    return
                }
                var j = this.readyState;
                if (j && j != "complete" && j != "loaded") {
                    return
                }
                g.onreadystatechange = g.onload = null;
                h = true;
                d.call()
            }
        }
        document.body.appendChild(g)
    })
}
function appendScript(f, b, c, a) {
    f = f || document.body;
    a = a || noop;
    b = b || {};
    var g;
    if (!b.src && c && c.trim()) {
        g = createNode("script", b);
        g.text = c;
        g.type = "any";
        f.appendChild(g);
        if (b.type) {
            g.setAttribute("type", b.type)
        } else {
            g.removeAttribute("type")
        }
        window._lsn = g;
        (new Function(g.text))();
        window._lsn = null;
        yield(a)
    } else {
        g = createNode("script", b);
        if (a) {
            var d;
            g.onload = g.onerror = g.onreadystatechange = function () {
                if (d) {
                    return
                }
                var h = g.readyState;
                if (h && h != "complete" && h != "loaded") {
                    return
                }
                window._lsn = g._prevLSN;
                d = true;
                g.onreadystatechange = g.onload = g.onerror = null;
                yield(a)
            }
        }
        g._prevLSN = window._lsn || null;
        window._lsn = g;
        f.appendChild(g)
    }
    return g
}
function flushDocumentWriteBuffer(d, a) {
    d = d || document.body;
    a = a || noop;
    var b = document.write._buffer;
    if (!b) {
        yield(a);
        return
    }
    b = b.join("");
    document.write._buffer.length = 0;
    b = createNode("div", null, null, "<br/>" + b);
    b.removeChild(b.firstChild);
    var c = [];
    while (b.childNodes.length) {
        c.push(b.removeChild(b.lastChild))
    }
    _appendNodes(d, c, a)
}
function _appendNodes(f, c, b) {
    if (!c || !c.length) {
        yield(b);
        return
    }
    var g = c.pop();
    if (g.tagName == "SCRIPT") {
        var a = {};
        if (g.src) {
            a.src = g.src
        }
        if (g.type) {
            a.type = g.type
        }
        appendScript(f, a, g.text, function () {
            flushDocumentWriteBuffer(f, function () {
                _appendNodes(f, c, b)
            })
        })
    } else {
        var h = g.cloneNode(false);
        if (g.nodeType == 3) {
            f.appendChild(h);
            yield(function () {
                _appendNodes(f, c, b)
            })
        } else {
            f.appendChild(h);
            var d = [];
            while (g.childNodes.length) {
                d.push(g.removeChild(g.lastChild))
            }
            yield(function () {
                _appendNodes(h, d, function () {
                    _appendNodes(f, c, b)
                })
            })
        }
    }
}
function $_(a) {
    if (a && a.constructor == String) {
        return document.getElementById(a)
    }
    return a
}
function setNode(node, data, f, b) {
    if (!node) {
        return null
    }
    var c, h;
    if (f) {
        var d = node.style;
        if (Browser.isIE && f.hasOwnProperty("opacity") && typeof (d.filter) == "string") {
            h = f.opacity;
            if (h || h === 0) {
                d.filter = "alpha(opacity=" + h * 100 + ")";
                if (!node.currentStyle || !node.currentStyle.hasLayout) {
                    d.zoom = 1
                }
            } else {
                d.filter = null
            }
            delete f.opacity
        }
        for (c in f) {
            if (f.hasOwnProperty(c)) {
                h = f[c];
                h = h === undefined ? null : h;
                if (d[c] != h) {
                    d[c] = h
                }
            }
        }
    }
    if (data) {
        if (data.hasOwnProperty("className")) {
            data["class"] = data.className
        }
        for (c in data) {
            if (data.hasOwnProperty(c)) {
                h = data[c];
                if (h !== node.getAttribute(c)) {
                    if (h || h === "" || h === false || h === 0) {
                        node.setAttribute(c, h)
                    } else {
                        node.removeAttribute(c)
                    }
                }
            }
        }
    }
    if (b !== undefined) {
        replaceChild(node, b)
    }
    return node
}
function createNode(b, a, d, c) {
    return setNode(document.createElement(b), a, d, c)
}
function replaceChild(c, a) {
    if (a && typeof (a) == "string" && a.indexOf("<object") === 0) {
        c.innerHTML = a;
        return
    }
    var b = createNode("div");
    if (c.childNodes && c.childNodes.length) {
        clearNode(c)
    }
    a = flatten(a);
    a.forEach(function (f) {
        var d = typeof (f);
        switch (d) {
        case "string":
            f = f.replace(/^ /, "&nbsp;");
            b.innerHTML = f;
            while (b.childNodes.length) {
                c.appendChild(b.childNodes[0])
            }
            b.innerHTML = "";
            break;
        case "number":
            c.appendChild(document.createTextNode(f));
            break;
        default:
            c.appendChild(f)
        }
    })
}
function clearNode(b, a) {
    purge(b, a);
    domRemoveDescendants(b, false)
}
function domRemoveDescendants(g, d) {
    if (!g) {
        return
    }
    var c, f, b;
    if ((c = g.childNodes)) {
        b = c.length;
        for (f = b - 1; f >= 0; --f) {
            domRemoveNode(c[f], d)
        }
    }
}
function domRemoveNode(c, a) {
    if (!c) {
        return
    }
    if (a || a === undefined) {
        purge(c, true)
    }
    if (!Browser.isIE || c.tagName == "SCRIPT") {
        if (c.parentNode) {
            c.parentNode.removeChild(c)
        }
        return
    }
    var g = $_("IELeakGarbageBin");
    if (!g) {
        g = document.body.appendChild(createNode("div", {
            id: "IELeakGarbageBin"
        }, {
            display: "none"
        }))
    }
    var d = [c];
    while (d.length) {
        var f = d.pop();
        if (f.tagName == "SCRIPT") {
            f.parentNode.removeChild(f)
        } else {
            for (var b = 0; b < f.childNodes.length; ++b) {
                d.push(f.childNodes[b])
            }
        }
    }
    g.appendChild(c);
    g.innerHTML = ""
}
var textContent;
if (Browser.isIE) {
    textContent = function (a) {
        if (a.nodeType == 3) {
            return a.nodeValue
        } else {
            return a.innerText
        }
    }
} else {
    textContent = function (a) {
        return a.textContent
    }
}
function _nodeCleaner() {
    Event.release(this);
    var a = this.attributes;
    if (!a) {
        return
    }
    for (var b = 0; b < a.length;) {
        var c = a[b].name;
        if (typeof this[c] === "function") {
            this[c] = null
        } else {
            ++b
        }
    }
}
function purge(g, f) {
    if (!g || g.nodeName == "EMBED") {
        return
    }
    var c, d, b, h;
    if (f) {
        _nodeCleaner.call(g)
    }
    c = g.childNodes;
    if (c) {
        b = c.length;
        for (d = 0; d < b; d += 1) {
            purge(c[d], true)
        }
    }
}
function nodeListToArray(c) {
    var a = [];
    if (c && c.length) {
        for (var b = 0; b < c.length; ++b) {
            a.push(c[b])
        }
    }
    return a
}
var Dom = function () {
        var a = 0;
        return {
            uniqueId: function (b) {
                return "js_" + (b || "") + (++a)
            }
        }
    }();

function fullCreateNode(b, a, f, c) {
    var d = b.toLowerCase();
    switch (d) {
    case "input":
        return createInput(a.type, a, f);
    case "label":
        return createLabel(a, f, c)
    }
    return _createNode(b, a, f, c)
}
createNode = fullCreateNode;

function _createNode(b, a, d, c) {
    return setNode(document.createElement(b), a, d, c)
}
function createSprite(b, a) {
    return createNode("div", {
        className: "sprite " + (b || "")
    }, null, a)
}
function domInsertAfter(b, a) {
    return b.parentNode.insertBefore(a, b.nextSibling)
}
function domInsertAtTop(b, a) {
    if (b.childNodes && b.childNodes.length > 0) {
        b.insertBefore(a, b.childNodes[0])
    } else {
        b.appendChild(a)
    }
}
function domContainsChild(a, b) {
    while (b) {
        if (b == a) {
            return true
        }
        b = b.parentNode
    }
    return false
}
function delayedClearNode(j, d) {
    if (!j || j.nodeName == "EMBED") {
        return
    }
    var c, h, b, k;
    if (d) {
        _nodeCleaner.apply(j)
    }
    var f = [];
    var g = createNode("div", null, {
        display: "none"
    });
    c = j.childNodes;
    if (c) {
        while (c.length) {
            g.appendChild(c[0])
        }
    }
    window.setTimeout(function () {
        loopNonBlocking(20, function () {
            if (!f.length) {
                return true
            }
            var a = f.shift();
            ExecQueue.push(Event.wrapper(_nodeCleaner, a));
            c = a.childNodes;
            if (c) {
                b = c.length;
                for (h = 0; h < b; h += 1) {
                    f.push(c[h])
                }
            }
        })
    }, 200)
}
function domRealChildrenCount(d) {
    var b = d.childNodes;
    var a = 0;
    for (var c = 0; c < b.length; ++c) {
        if (b[c].nodeType == 1) {
            a++
        }
    }
    return a
}
function domPrev(a) {
    do {
        a = a.previousSibling
    } while (a && a.nodeType != 1);
    return a
}
function domNext(a) {
    do {
        a = a.nextSibling
    } while (a && a.nodeType != 1);
    return a
}
function isAttachedToDom(a) {
    while (a) {
        if (a == document.body) {
            return true
        }
        a = a.parentNode
    }
    return false
}
function domPoke(a, b) {
    if (b || Browser.type("IE", 0, 6)) {
        setNode(a, null, {
            zoom: 0
        });
        yield(function () {
            setNode(a, null, {
                zoom: 1
            })
        })
    }
}
function getElementsWithAttributes(q) {
    q = q || {};
    var o = q.root || document;
    var c = q.tagName || "*";
    var h = q.attributes || [];
    if (o.querySelectorAll) {
        try {
            var f = h.length ? [c, "[", h.join("]["), "]"].join("") : c;
            return o.querySelectorAll(f)
        } catch (n) {}
    } else {
        var l = [];
        var a = o.getElementsByTagName(c);
        h = h.map(function (j) {
            var r = j.split("=");
            if (r.length != 2) {
                r = [j, null]
            } else {
                r[1] = r[1].replace(/^(\"|\')/, "").replace(/(\"|\')$/, "")
            }
            return {
                name: r[0],
                value: r[1]
            }
        });
        for (var k = 0; k < a.length; k++) {
            var d = a[k];
            var p = true;
            for (var g = 0; g < h.length; g++) {
                var m = h[g];
                var b = d.getAttribute(m.name);
                if (!b || (m.value && b !== m.value)) {
                    p = false;
                    break
                }
            }
            if (p) {
                l.push(d)
            }
        }
        return l
    }
}
function getElementsByClassName(c) {
    var a = c.root || document;
    var g = c.tagName || "*";
    var h = c.className;
    var f = [];
    var b = a.getElementsByTagName(g);
    for (var d = 0; d < b.length; d++) {
        if (hasClass(b[d], h)) {
            f.push(b[d])
        }
    }
    return f
}
function inOrderTraversal(b, c, a) {
    if (!b) {
        return a || null
    }
    if (!c) {
        c = document
    }
    if (b(c)) {
        if (!a) {
            return c
        }
        a.push(c)
    }
    for (var d = 0; d < c.childNodes.length; ++d) {
        var f = inOrderTraversal(b, c.childNodes[d], a);
        if (f && !a) {
            return f
        }
    }
    return a || null
}
function domGetContainer(a) {
    while (a && a.nodeType != 1) {
        a = a.parentNode
    }
    if (!a) {
        return null
    }
    if (a.nodeName.match(/INPUT|IMG/)) {
        return domGetContainer(a.parentNode)
    }
    return a
}
function lastScriptNode() {
    if (window._lsn) {
        return window._lsn
    }
    var a = document.getElementsByTagName("script");
    return a ? a[a.length - 1] : null
}
function matchingAncestor(c, b, a) {
    b = b.toUpperCase();
    while (c && c.tagName != "HTML" && c.tagName != "BODY" && c.getAttribute) {
        if (c.tagName == b && c.getAttribute(a)) {
            return c
        }
        c = c.parentNode
    }
    return null
}
function setDefaultEmbedWMode(a) {
    a = a || "opaque";
    Event.addListener(document, "domready", Browser.isIE ?
    function () {
        var f = document.getElementsByTagName("object");
        var k;
        var m;
        var j;
        var g;
        var l;
        for (var d = 0; d < f.length; ++d) {
            var c = f[d];
            if (!/<embed\b/i.test(c.innerHTML)) {
                continue
            }
            j = (/\bwmode=.?([\w]+)/i.test(c.innerHTML) ? RegExp.$1 : "Window").toLowerCase();
            if (j != "window" || j == a) {
                continue
            }
            k = c.parentNode;
            m = c.nextSibling;
            g = outerHTML(c);
            if (/\bwmode=/i.test(g)) {
                g = g.replace(/\bwmode=(\'|\")?[\w]+(\'|\")?/ig, "wmode=" + a)
            } else {
                g = g.replace(/<embed\b/ig, "<embed wmode=" + a)
            }
            g = g.replace(/<param[^>]*\bwmode\b[^>]*>(<\/param>)?/i, "");
            g = g.replace(/<\/object>/ig, "<param name=wmode value=" + a + " /></object>");
            l = createNode("div", null, null, g).childNodes[0];
            k.insertBefore(l, m)
        }
        var b = document.getElementsByTagName("embed");
        for (d = 0; d < b.length; ++d) {
            var h = b[d];
            j = (h.getAttribute("wmode") || "Window").toLowerCase();
            if (j != "window" || j == a || !h.parentNode || h.parentNode.tagName.toLowerCase() == "object") {
                continue
            }
            k = h.parentNode;
            m = h.nextSibling;
            g = outerHTML(h);
            g = g.replace(/<embed\b/ig, "<embed wmode=" + a);
            l = createNode("div", null, null, g).childNodes[0];
            k.insertBefore(l, m)
        }
    } : function () {
        var g = document.getElementsByTagName("embed");
        for (var c = 0; c < g.length; ++c) {
            var h = g[c];
            var b = (h.getAttribute("wmode") || "Window").toLowerCase();
            if (b != "window" || b == a) {
                continue
            }
            setNode(h, {
                wmode: a
            });
            var f = h.parentNode;
            var d = h.nextSibling;
            f.removeChild(h);
            f.insertBefore(h, d)
        }
    })
}
function toggleClass(c, b) {
    if (!c || c.className === undefined || !b) {
        return null
    }
    var d = c.className.split(/\s+/);
    var a = b.split(/\s+/);
    a.forEach(function (f) {
        if (d.contains(f)) {
            d.removeAll(f)
        } else {
            d.push(f)
        }
    });
    d.removeAll("");
    return setNode(c, {
        className: d.join(" ")
    })
}
function addClass(b, a) {
    if (!b || b.className === undefined || !a) {
        return null
    }
    var d = b.className.split(/\s+/);
    var c = a.split(/\s+/);
    c.forEach(function (f) {
        if (!d.contains(f)) {
            d.push(f)
        }
    });
    d.removeAll("");
    return setNode(b, {
        className: d.join(" ")
    })
}
function removeClass(c, b) {
    if (!c || c.className === undefined || !b) {
        return null
    }
    var d = c.className.split(/\s+/);
    var a = b.split(/\s+/);
    a.forEach(function (f) {
        d.removeAll(f)
    });
    d.removeAll("");
    return setNode(c, {
        className: d.join(" ")
    })
}
function hasClass(b, a) {
    if (!b || b.className === undefined || !a) {
        return null
    }
    var c = b.className.split(/\s+/);
    return c.contains(a)
}
function getStyle(b, c) {
    if (b.nodeType != 1) {
        return null
    }
    if (b.style[c]) {
        return b.style[c]
    } else {
        if (b.currentStyle) {
            return b.currentStyle[c]
        } else {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                c = c.replace(/([A-Z])/g, "-$1");
                c = c.toLowerCase();
                var a = document.defaultView.getComputedStyle(b, "");
                return a && a.getPropertyValue(c)
            } else {
                return null
            }
        }
    }
}
function scrollXY(b, a) {
    if (!b) {
        b = new Point()
    }
    if (!a || a == window) {
        if (window.pageXOffset !== undefined) {
            b.x = window.pageXOffset;
            b.y = window.pageYOffset
        } else {
            if (document.documentElement) {
                b.x = document.documentElement.scrollLeft;
                b.y = document.documentElement.scrollTop
            } else {
                b.x = document.body.scrollLeft;
                b.y = document.body.scrollTop
            }
        }
    } else {
        b.x = a.scrollLeft;
        b.y = a.scrollTop
    }
    return b
}
function px(a) {
    return Math.round(a) + "px"
}
function hasDim(a) {
    return parseInt(a.offsetWidth, 10) > 0 && parseInt(a.offsetHeight, 10) > 0
}
function hide(a) {
    addClass(a, "hidden");
    addClass(a, "invisible");
    setNode(a, null, {
        display: "none",
        visibility: "hidden"
    })
}
function show(a) {
    removeClass(a, "hidden");
    removeClass(a, "invisible");
    setNode(a, null, {
        display: "block",
        visibility: "inherit"
    })
}
function getWindowSize() {
    var a = document.compatMode;
    if (a || Browser.isIE) {
        if (a == "CSS1Compat") {
            return new Dim(document.documentElement.clientWidth, document.documentElement.clientHeight)
        } else {
            return new Dim(document.body.clientWidth, document.body.clientHeight)
        }
    } else {
        return new Dim(window.innerWidth, window.innerHeight)
    }
}
function nodeXY(b) {
    //console.log($(b).offset());
    var off = $(b).offset();
    return new Point(off.left, off.top);
    if (b.getBoundingClientRect && !Browser.layoutEngine("WebKit")) {
        var k = window.document;
        var d;
        try {
            d = b.getBoundingClientRect()
        } catch (h) {
            return new Point(0, 0)
        }
        var a = Math.max(k.documentElement.scrollTop, k.body.scrollTop);
        var c = Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
        if (Browser.isIE) {
            d.left -= 2;
            d.top -= 2
        }
        return new Point(d.left + c, d.top + a)
    } else {
        var l = new Point(b.offsetLeft, b.offsetTop);
        var f = b.offsetParent;
        var j = Browser.isSafari;
        var g = getStyle(b, "position") == "absolute";
        if (f != b) {
            while (f) {
                l.x += f.offsetLeft;
                l.y += f.offsetTop;
                if (j && !g && getStyle(f, "position") == "absolute") {
                    g = true
                }
                f = f.offsetParent
            }
        }
        if (j && g) {
            l.x -= document.body.offsetLeft;
            l.y -= document.body.offsetTop
        }
        f = b.parentNode;
        while (f && f.tagName != "HTML" && f.tagName != "BODY") {
            if (getStyle(f, "display") != "inline") {
                l.x -= f.scrollLeft;
                l.y -= f.scrollTop
            }
            f = f.parentNode
        }
        return l
    }
}
function showInline(a) {
    removeClass(a, "hidden");
    removeClass(a, "invisible");
    setNode(a, null, {
        display: "inline",
        visibility: "inherit"
    })
}
function disable(a) {
    setNode(a, {
        disabled: true
    })
}
function enable(a) {
    setNode(a, {
        disabled: null
    })
}
function getElementSize(a) {
    return new Dim(a.offsetWidth + depx(getStyle(a, "marginLeft")) + depx(getStyle(a, "marginRight")), a.offsetHeight + depx(getStyle(a, "marginTop")) + depx(getStyle(a, "marginBottom")))
}
function setScroll(f) {
    var c = document.documentElement;
    var a = document.body;
    c.scrollLeft = a.scrollLeft = f.x;
    c.scrollTop = a.scrollTop = f.y
}
function scrollToMiddle(b, a) {
    a = a || (b ? b.parentNode : null);
    if (!b || !a) {
        return
    }
    return b.offsetTop + b.clientHeight / 2 - a.clientHeight / 2
}
function scrollUp(a, b) {
    if (b.offsetTop < a.scrollTop) {
        a.scrollTop = b.offsetTop
    } else {
        if (b.offsetTop > a.scrollTop + a.offsetHeight) {
            a.scrollTop = b.offsetTop + b.offsetHeight - a.offsetHeight
        }
    }
}
function scrollDown(a, b) {
    if (b.offsetTop + b.offsetHeight > a.scrollTop + a.offsetHeight) {
        a.scrollTop = b.offsetTop + b.offsetHeight - a.offsetHeight
    } else {
        if (b.offsetTop + b.offsetHeight < a.scrollTop) {
            a.scrollTop = b.offsetTop
        }
    }
}
function isDescendantOfFixed(a) {
    while (a) {
        if (getStyle(a, "position") == "fixed") {
            return true
        }
        a = a.parentElement
    }
    return false
}
var _scrollbarWidth = -1;

function getScrollbarWidth() {
    if (_scrollbarWidth > 0) {
        return _scrollbarWidth
    }
    if (Browser.type("IE", 0, 6)) {
        return (_scrollbarWidth = 20)
    }
    if (_scrollbarWidth < 0) {
        _scrollbarWidth = 0;
        var b = createNode("div", null, {
            height: "50px",
            width: "50px",
            display: "block",
            overflowY: "scroll",
            visibility: "hidden",
            position: "absolute",
            top: "0"
        });
        var a = b.appendChild(createNode("div"));
        Event.addListener(document, "modifiable", function () {
            document.body.appendChild(b);
            yield(function () {
                _scrollbarWidth = Dim.fromNode(b).w - Dim.fromNode(a).w;
                domRemoveNode(b)
            })
        })
    }
    return 14
}
getScrollbarWidth();
var _modifiableStyleSheet;
var _cssRules = {};
var _toUpperCase = function (b, a) {
        return (a || "").toUpperCase()
    };

function _getModifiableStyleSheet() {
    if (_modifiableStyleSheet) {
        return _modifiableStyleSheet
    }
    try {
        var a = document.getElementsByTagName("head")[0] || document.body;
        a.appendChild(createNode("style", {
            type: "text/css"
        }))
    } catch (b) {
        return (_modifiableStyleSheet = document.styleSheets[0])
    }
    return (_modifiableStyleSheet = document.styleSheets[document.styleSheets.length - 1])
}
function editCSSStyleText(g, c) {
    if (Browser.isIE) {
        return setNode(g, null, c)
    }
    var f = {};
    for (var b = 0; b < g.style.length; ++b) {
        var a = g.style[b].replace(/-([a-z])/, _toUpperCase);
        f[a] = g.style[a]
    }
    forEachKey(c, function (j, h) {
        h = h === undefined ? null : h;
        if (h || h === 0) {
            f[j] = h
        } else {
            delete f[j]
        }
    });
    var d = [];
    forEachKey(f, function (j, h) {
        j = j.replace(/([A-Z])/g, "-$1").toLowerCase();
        d.push(j, ":", h, ";")
    });
    g.style.cssText = d.join("");
    return g
}
function editCSSRule(d, a) {
    a = a || {};
    var l;
    if ((l = _cssRules[d])) {
        return editCSSStyleText(l, a)
    }
    var h = noop;
    var c;
    if (document.baseURI != window.location.toString() && (Browser.layoutEngine("WebKit") || Browser.type("IE", 0, 7)) && (c = document.getElementsByTagName("base")).length) {
        var b;
        var n;
        for (var f = c.length - 1; f >= 0; --f) {
            if (c[f].href) {
                b = c[f];
                n = b.nextSibling
            }
        }
        if (b) {
            b.parentNode.removeChild(b)
        }
        var k = document.head;
        if (!k) {
            k = document.getElementsByTagName("head");
            k = k[k.length - 1]
        }
        var j = k.appendChild(createNode("base", {
            href: window.location.toString()
        }));
        h = function () {
            if (j) {
                j.parentNode.removeChild(j)
            }
            if (b) {
                k.insertBefore(b, n)
            }
        }
    }
    var m = _getModifiableStyleSheet();
    if (!_modifiableStyleSheet) {
        h();
        return null
    }
    if (_modifiableStyleSheet.addRule && _modifiableStyleSheet.rules) {
        _modifiableStyleSheet.addRule(d, "width:auto");
        l = _modifiableStyleSheet.rules[_modifiableStyleSheet.rules.length - 1]
    } else {
        if (_modifiableStyleSheet.insertRule && _modifiableStyleSheet.cssRules) {
            _modifiableStyleSheet.insertRule(d + "{}", _modifiableStyleSheet.cssRules.length);
            l = _modifiableStyleSheet.cssRules[_modifiableStyleSheet.cssRules.length - 1]
        }
    }
    if (!l) {
        h();
        return null
    }
    if (!a.width) {
        a.width = ""
    }
    _cssRules[d] = l;
    var g = editCSSStyleText(l, a);
    h();
    return g
}
function getNaturalWidthHeight(b, c) {
    var a = new Image();
    a.onload = function () {
        c(a.width, a.height)
    };
    a.src = b
}
function getElementInnerDim(a) {
    return new Dim(a.offsetWidth - depx(getStyle(a, "paddingLeft")) - depx(getStyle(a, "borderLeftWidth")) - depx(getStyle(a, "paddingRight")) - depx(getStyle(a, "borderRightWidth")), a.offsetHeight - depx(getStyle(a, "paddingTop")) - depx(getStyle(a, "borderTopWidth")) - depx(getStyle(a, "paddingBottom")) - depx(getStyle(a, "borderBottomWidth")))
}
function getElementShift(b, a) {
    if (a == "top") {
        return depx(getStyle(b, "paddingTop")) + depx(getStyle(b, "borderTopWidth"))
    } else {
        if (a == "bottom") {
            return depx(getStyle(b, "paddingBottom")) + depx(getStyle(b, "borderBottomWidth"))
        } else {
            if (a == "left") {
                return depx(getStyle(b, "paddingLeft")) + depx(getStyle(b, "borderLeftWidth"))
            } else {
                if (a == "right") {
                    return depx(getStyle(b, "paddingRight")) + depx(getStyle(b, "borderRightWidth"))
                }
            }
        }
    }
    return 0
}
function overlayZIndex(d) {
    var c = 4999990;
    var b = document.body.childNodes || [];
    for (var a = 0; a < b.length; ++a) {
        c = Math.max(c, Math.ceil(parseFloat(getStyle(b[a], "zIndex"))) || 0)
    }
    return (d && Math.ceil(parseFloat(getStyle(d, "zIndex"))) == c) ? c : c + 10
}
if (Browser.isSafari) {
    editCSSRule(".glow", {
        outlineStyle: "auto"
    })
}
function makeUnselectable(a) {
    Event.addListener(a, "selectstart", returnFalse);
    Event.addListener(a, "drag", returnFalse);
    addClass(a, "unselectable");
    setNode(a, {
        unselectable: "on"
    })
}
function depx(a) {
    if (!a || !a.match(/([\-0-9.]+)px/)) {
        return 0
    } else {
        return Number(RegExp.$1)
    }
}
function buildURL(f, g, h, k) {
    g = g || {};
    var b;
    if (f == "profile" && !h && g.name) {
        b = g.name;
        delete g.name;
        delete g.id
    }
    var c = hashToQueryArray(g);
    var d = Auth.getToken();
    if (d) {
        if (f.indexOf("img-") !== 0) {
            c.push(".tok=" + encodeURIComponent(d))
        }
    }
    var j = Conf.getLocale();
    if (j) {
        if (f.indexOf("img-") !== 0) {
            c.push(".locale=" + encodeURIComponent(j))
        }
    }
    if (b) {
        var a = c.length ? ("?" + c.join("&")) : "";
        return buildVanityURL(b, a, k)
    }
    h = h || "cgi";
    c = "../" + h + "/" + f + (c.length ? ("?" + c.join("&")) : "");
    if (k && k != getProtocol()) {
        return buildAbsURL(c, k)
    } else {
        return c
    }
}
function normalizeURL(a) {
    var d = a;
    var b = "";
    if (isAbsURL(a) && a.length > 8) {
        b = a.substr(0, a.indexOf("/", 8));
        d = a.substr(b.length)
    } else {
        d = a
    }
    var c = d.split("/");
    var f = [];
    c.forEach(function (g) {
        if (g == ".") {
            return
        } else {
            if (g == ".." && f.length > 0) {
                if (f[f.length - 1] === "") {
                    return
                } else {
                    if (f[f.length - 1] == "..") {
                        f.push(g)
                    } else {
                        f.pop()
                    }
                }
            } else {
                f.push(g)
            }
        }
    });
    return b + f.join("/")
}
function _validateCDNImgParams(b, a) {
    return b == "img-set" || b == "img-thing" || b == "img-buddy"
}
function buildImgURL(c, b) {
    var a;
    if (_validateCDNImgParams(c, b)) {
        a = buildCDNImgURL(c, b)
    }
    return a || buildPolyvoreImgURL(c, b)
}
function hashImgParams(d, h) {
    var g = [d];
    var b = [];
    forEachKey(h, function (j) {
        b.push(j)
    });
    b.sort();
    b.forEach(function (j) {
        g.push(h[j])
    });
    var f = 0;
    g = g.join("");
    for (var c = 0, a = g.length; c < a; c++) {
        f += g.charCodeAt(c)
    }
    return f
}
function buildCDNImgURL(b, g) {
    var d = hashImgParams(b, g);
    var k, h;
    if (b == "img-set" || b == "img-thing" || b == "img-buddy") {
        if (b == "img-set") {
            g.id = g.spec_uuid;
            delete g.spec_uuid
        }
        h = Conf.getCDNImgHost(b, g);
        if (!h) {
            if (b == "img-set") {
                g.spec_uuid = g.id;
                delete g.id
            }
            return ""
        }
        var a = g[".out"];
        delete g[".out"];
        var j = [];
        forEachKey(g, function (m, l) {
            j.push(m)
        });
        j.sort();
        var f = ["/cgi", b];
        for (var c = 0; c < j.length; ++c) {
            f.push(j[c], encodeURIComponent(g[j[c]]))
        }
        k = [f.join("/"), ".", a].join("")
    } else {
        console.log("CDN was not enabled for " + b);
        return ""
    }
    return [getProtocol() + "://", h, k].join("")
}
function buildPolyvoreImgURL(c, b) {
    if (c == "img-set") {
        b.id = b.spec_uuid;
        delete b.cid;
        delete b.spec_uuid;
        if (b[".sig"]) {
            console.log("signed url generation from js layer is not allowed")
        }
    }
    var a = "http://" + Conf.getWebUrlPrefix() + "/cgi/" + buildURL(c, b);
    if (Conf.getSetting("rewriteImgBase")) {
        a = a.replace(/^https?:\/\/[^\/]+(.*\/cgi\/)(.*)/, getProtocol() + "://" + Conf.getImgHost(c, b) + "/cgi/$2")
    } else {
        a = a.replace(/^https?:\/\/[^\/]+/, getProtocol() + "://" + Conf.getImgHost(c, b))
    }
    return normalizeURL(a)
}
function buildRsrcURL(b, a) {
    return "resources/" + b;
    //return normalizeURL(Conf.getRsrcUrlPrefix(a) + b)
}
function buildAbsURL(k, g, c) {
    if (isAbsURL(k)) {
        return k
    }
    if (!g) {
        g = getProtocol()
    }
    var l;
    if (k.charAt(0) == "/") {
        var h = c ? c : Conf.getWebHost();
        l = g + "://" + h + k
    } else {
        if (!window._dirname) {
            var a = parseUri(window.location);
            var j = a.path.split(/\//);
            j.pop();
            j.push("");
            a.path = j.join("/");
            if (a.path.charAt(0) != "/") {
                a.path = "/" + a.path
            }
            window._dirname = reconstructUri({
                protocol: "",
                authority: a.authority,
                path: a.path
            })
        }
        var f = window._dirname;
        var b = c || window._polyvoreHost;
        if (b) {
            var d = f.match(/(\:\/\/)(.*?)(\/.*)/);
            f = d[1] + b + d[3]
        }
        l = g + f + k
    }
    return normalizeURL(l)
}
function getHostModePrefixes() {
    return ["live", "www", "testenv"]
}
function buildVanityURL(c, h, f) {
    var b = Conf.getCookieDomain();
    h = h || "";
    c = c.toLowerCase();
    c = c.replace(/![a-z0-9\-]/, "");
    var d = c + b;
    if (Conf.getDevName()) {
        d = c + "." + Conf.getDevName() + b
    }
    var g = Conf.getModeName();
    if (getHostModePrefixes().contains(g)) {
        d = g + "." + d
    }
    var a = buildAbsURL("/" + h, f, d);
    return a
}
function isAbsURL(a) {
    return (/^https?:\/\//).test(a)
}
function getProtocol() {
    if (!window._protocol) {
        var a = window.location.href;
        window._protocol = a.match(/^(\w+):/)[1]
    }
    return window._protocol
}
function parseUri(f) {
    var d = parseUri.options,
        a = d.parser[d.strictMode ? "strict" : "loose"].exec(f),
        c = {},
        b = 14;
    while (b--) {
        c[d.key[b]] = a[b] || ""
    }
    c[d.q.name] = {};
    c[d.key[12]].replace(d.q.parser, function (h, g, j) {
        if (g) {
            c[d.q.name][g] = j
        }
    });
    return c
}
parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

function reconstructUri(d) {
    var c = [d.protocol, "://", d.authority, d.port ? ":" + d.port : "", d.path];
    if (d.queryKey) {
        var b = [];
        forEachKey(d.queryKey, function (g, f) {
            b.push(g)
        });
        if (b.length) {
            c.push("?");
            b.sort();
            for (var a = 0; a < b.length; ++a) {
                if (a) {
                    c.push("&")
                }
                c.push(b[a], "=", d.queryKey[b[a]])
            }
        }
    }
    if (d.anchor) {
        c.push("#", d.anchor)
    }
    return c.join("")
}
function parsePolyvoreURL(b) {
    var f = parseUri(b);
    var j = f.path.split("/");
    j.shift();
    var h = j.pop();
    var a = {};
    if (h.match(/(?:set|thing|buddy)\.\d+/)) {
        var g = h.split(".");
        h = "img-" + g.shift();
        var d;
        if (h == "img-set") {
            if (g.length > 3) {
                d = ["cid", "spec_uuid", "size", ".out"]
            } else {
                return {
                    action: h,
                    args: {},
                    isStatic: true
                }
            }
        } else {
            if (h == "img-thing") {
                if (g.length > 3) {
                    d = ["tid", "size", "mask", ".out"]
                } else {
                    d = ["tid", "size", ".out"]
                }
            } else {
                if (h == "img-buddy") {
                    d = ["id", "size", ".out"]
                }
            }
        }
        for (var c = 0; c < d.length; c++) {
            a[d[c]] = g[c]
        }
        if (h == "img-thing" && a.mask) {
            a.mask = 1
        }
    } else {
        if (j.length > 1 && h.match(/^.*\.jpg$/i)) {
            return {
                action: j.pop(),
                args: {},
                isStatic: true
            }
        } else {
            a = f.queryKey
        }
        if (h == "img-set") {
            a.spec_uuid = a.id;
            delete a.id
        }
    }
    return {
        action: h,
        args: a
    }
}
function cleanURL(b) {
    if (!b) {
        return null
    }
    b = b.trim();
    if (!b.match(/^http:\/\//)) {
        b = b.replace(/^\w+:\/\//, "");
        b = "http://" + b
    }
    var a = parseUri(b);
    delete a.port;
    return reconstructUri(a)
}
function fullyQualified(a) {
    a = a || "./";
    if (!/^(([a-z]+):\/\/)/.test(a)) {
        var b = document.createElement("div");
        a = a.replace('"', "%22");
        b.innerHTML = '<a href="' + a + '" style="display:none">x</a>';
        a = b.firstChild.href
    }
    return a
}
function isPolyvoreURL(a) {
    if (!window.POLVYORE_URL) {
        window.POLYVORE_URL = new RegExp("http(s)?://.*" + Conf.getCookieDomain())
    }
    return a.match(POLYVORE_URL)
}
function isHTMLMobile() {
    var a = Cookie.get("m");
    return (a == "1" || a == 1)
}
function hashToQueryArray(a) {
    var f = [];
    var b = [];
    for (key in a) {
        if (a.hasOwnProperty(key)) {
            f.push(key)
        }
    }
    f = f.sort();
    for (var c = 0; c < f.length; ++c) {
        key = f[c];
        var g = a[key];
        var d = typeof (g);
        if (g !== undefined && d != "function" && g !== null && g !== "") {
            b.push(key + "=" + encodeURIComponent(g))
        }
    }
    return b
}
Form.TYPES = {
    html: function (a) {
        a.nodes = [a.value]
    },
    spacer: function (a) {
        a.nodes = [createNode("hr")]
    },
    hidden: function (a) {
        a.nodes = createNode("input", {
            type: "hidden",
            id: a.id,
            name: a.name,
            value: a.value
        })
    },
    text: function (a) {
        a.focusable = a.focusable === undefined ? true : a.focusable;
        a.inputNode = createNode("input", {
            type: "text",
            id: a.id,
            name: a.name,
            value: a.value
        });
        if (a.maxlength && (a.htmllevel || "none") === "none") {
            setNode(a.inputNode, {
                maxlength: a.maxlength
            })
        }
        a.nodes = [a.inputNode]
    },
    username: function (b) {
        b.focusable = b.focusable === undefined ? true : b.focusable;
        b.minlength = 4;
        b.maxlength = 32;
        b.validators.push(Validate.userName);
        b.inputNode = createNode("input", {
            type: "text",
            id: b.id,
            name: b.name,
            value: b.value
        });
        if (b.maxlength && (b.htmllevel || "none") === "none") {
            setNode(b.inputNode, {
                maxlength: b.maxlength
            })
        }
        var d = createNode("span", {
            className: "feedback hidden"
        });
        var a = createNode("div", {
            className: "suggestions"
        });
        var c = new CheckAvailability(b.inputNode, d, a);
        b.validators.push(Validate.userNameAvailable(c));

        function f() {
            b.inputNode.value = b.inputNode.value.toLowerCase()
        }
        Event.addListener(b.inputNode, "blur", f);
        Event.addListener(b.inputNode, "change", f);
        b.nodes = [b.inputNode, d, a]
    },
    password: function (a) {
        a.focusable = a.focusable === undefined ? true : a.focusable;
        a.inputNode = createNode("input", {
            type: "password",
            id: a.id,
            name: a.name,
            value: a.value
        });
        a.nodes = [a.inputNode]
    },
    checkbox: function (a) {
        a.inputNode = createNode("input", {
            type: "checkbox",
            id: a.id,
            name: a.name,
            value: a.value,
            checked: a.checked
        });
        var b = createNode("label", {
            "for": a.id
        }, null, a.value);
        a.nodes = [a.inputNode, b]
    },
    strip_selector: function (a) {
        a.inputNode = createNode("input", {
            type: "hidden",
            name: i.name,
            id: i.id
        });
        var b = createNode("div");
        StripSelector.show(i.renderer, {
            container: b,
            input: a.inputNode,
            source: i.source,
            items: i.items,
            value: i.value
        });
        a.nodes = [a.inputNode, b]
    },
    buttons: function (a) {
        var b = a.buttons.map(function (c) {
            c.className = c.className || "";
            var d;
            switch (c.type) {
            case "submit":
                d = createNode("input", {
                    type: c.type,
                    id: c.id,
                    className: c.className || "btn btn_action",
                    name: c.name,
                    value: c.label,
                    disabled: c.disabled
                });
                break;
            case "cancel":
                d = createNode("span", {
                    id: c.id,
                    className: c.className || "clickable"
                }, null, c.label);
                break;
            case "link":
                d = createNode("a", {
                    id: c.id,
                    className: c.className,
                    href: c.url
                }, null, c.label);
                break
            }
            if (c.onClick) {
                Event.addListener(d, "click", c.onClick)
            }
            return d
        });
        a.nodes = [createNode("ul", {
            className: "actions horizontal"
        }, null, b.map(function (c) {
            return createNode("li", null, null, c)
        }))]
    }
};

function Form(a) {
    a = a || {};
    a.action = a.action || "";
    a.method = a.method || "";
    a.className = a.className || "";
    a.data = a.data || {};
    a.inputs = a.inputs || [];
    var b = createNode("form", {
        enctype: "multipart/form-data",
        id: a.id || Dom.uniqueId("form"),
        action: a.action,
        method: a.method,
        className: "newform " + a.className
    });
    this._formNode = b;
    Event.addListener(b, "submit", function (f) {
        return this.submit(f)
    }, this);
    if (a.onSubmit) {
        Event.addListener(this, "submit", a.onSubmit)
    }
    this._validationQueueEnabled = false;
    this._validationQueue = [];
    var d = Event.wrapper(function () {
        return Event.addListener(document, "mousedown", function () {
            this._validationQueueEnabled = true;
            Event.addSingleUseListener(document, "mouseup", function () {
                this._validationQueueEnabled = false;
                this.triggerQueuedValidation()
            }, this)
        }, this)
    }, this);
    var c = false;
    this._inputs = a.inputs;
    a.inputs.forEach(function (f) {
        if (!f || !f.type) {
            return
        }
        f.id = f.id || Dom.uniqueId();
        f.value = a.data[f.name] || f.value || "";
        f.checked = a.data[f.name] || f.checked || f.defaultChecked || false;
        f.label = f.label || "";
        f.validators = f.validators || [];
        var h = ["input", "type_" + f.type, f.className].join(" ");
        var k = b.appendChild(createNode("div", {
            className: h
        }));
        if (!Form.TYPES[f.type]) {
            throw "input type " + f.type + " does not have a renderer"
        }
        Form.TYPES[f.type](f);
        if (f.minlength) {
            f.validators.unshift(Validate.minlength)
        }
        if (f.maxlength) {
            f.validators.unshift(Validate.maxlength)
        }
        if (f.required) {
            addClass(k, "required_input");
            f.validators.unshift(Validate.required)
        }
        if (f.label) {
            if (f.inputNode) {
                k.appendChild(createNode("label", {
                    "for": f.id
                }, null, f.label))
            } else {
                k.appendChild(createNode("div", {
                    className: "label"
                }, null, f.label))
            }
        }
        k.appendChild(createNode("div", {
            className: "value"
        }, null, f.nodes));
        if (f.hint) {
            k.appendChild(createNode("div", {
                className: "meta input_hint"
            }, null, f.hint))
        }
        if (f.inputNode) {
            Event.addListener(f.inputNode, "focus", function () {
                var l = d();
                Event.addSingleUseListener(f.inputNode, "blur", function () {
                    l.clean()
                })
            });
            if (!c && f.focusable && f.inputNode.focus) {
                this._firstInputNode = f.inputNode;
                yield(function () {
                    f.inputNode.focus()
                });
                c = true
            }
            f.errorNode = k.appendChild(createNode("ul", {
                className: "error"
            }));
            var g = function () {
                    this.validateInput(f, true)
                };
            var j = function () {
                    this.validateInput(f, false)
                };
            Event.addListener(f.inputNode, "blur", j, this);
            Event.addListener(f.inputNode, "change", j, this);
            Event.addListener(f.inputNode, "keydown", g, this);
            Event.addListener(f.inputNode, "keypress", g, this)
        }
    }, this)
}
Form.prototype.validateInput = function (c, b) {
    if (this._validationQueueEnabled) {
        this._validationQueue.push(arguments);
        return false
    }
    c.isValid = true;
    var h = [];
    if (c.inputNode) {
        var g = inputValue(c.inputNode);
        for (var f = 0; f < c.validators.length; f++) {
            var d = c.validators[f];
            var a = d(g, c, b);
            c.isValid = c.isValid && a.valid;
            if (!a.valid) {
                if (a.msg) {
                    h.push(a.msg)
                }
                break
            }
        }
    }
    if (c.errorNode) {
        setNode(c.errorNode, null, null, h.map(function (j) {
            return createNode("li", null, null, j)
        }))
    }
    return c.isValid
};
Form.prototype.triggerQueuedValidation = function () {
    var b = true;
    while (this._validationQueue.length > 0) {
        var a = this._validationQueue.pop();
        b = b && Form.prototype.validateInput.apply(this, a)
    }
    return b
};
Form.prototype.getNode = function () {
    return this._formNode
};
Form.prototype.focusFirst = function () {
    if (this._firstInputNode && this._firstInputNode.focus) {
        this._firstInputNode.focus()
    }
};
Form.prototype.validate = function () {
    var a = true;
    this._inputs.forEach(function (b) {
        a = this.validateInput(b) && a
    }, this);
    return a
};
Form.prototype.getData = function () {
    var a = {};
    this._inputs.forEach(function (b) {
        if (b.inputNode) {
            a[b.name] = inputValue(b.inputNode)
        }
    });
    return a
};
Form.prototype.submit = function (a) {
    if (!this.validate()) {
        return a ? Event.stop(a) : false
    }
    Event.trigger(this, "submit", a);
    return true
};

function createForm(d) {
    d.id = d.id || Dom.uniqueId("form");
    var c = createNode("form", {
        id: d.id,
        enctype: "multipart/form-data"
    });
    if (d.action) {
        c.action = d.action
    }
    if (d.method) {
        c.method = d.method
    }
    var f = d.onSubmit ? d.onSubmit : Event.stop;
    Event.addListener(c, "submit", f);
    var b = createFormBody(c, d);
    var a = createNode("div", {
        className: "fieldset stdform"
    });
    c.appendChild(a);
    a.appendChild(b);
    return c
}
function createFormBody(a, l) {
    var g = l.inputs;
    var d = l.data;
    var c = l.noLabel;
    var j = l.id || a.getAttribute("id");
    if (d) {
        g.forEach(function (m) {
            if (!m || !m.name) {
                return
            }
            if (m.type == "twitter") {
                m.checked = d.twitter_post ? true : null;
                m.msg = d.twitter_msg;
                return
            }
            if (d[m.name] === undefined) {
                m.value = m.value || ""
            } else {
                if (m.type == "checkbox") {
                    m.checked = d[m.name] ? true : false
                } else {
                    m.value = d[m.name]
                }
            }
            if (!m.options || (d[m.name] && !d[m.name].contains)) {
                return
            }
            if (m.type == "checkboxes") {
                m.options.forEach(function (n) {
                    n.checked = (d[m.name] && d[m.name].contains(n.value)) ? true : null
                })
            }
        })
    }
    var k = createNode("table", {
        cellspacing: 0,
        cellpadding: 0
    });
    var f = createNode("tbody");
    k.appendChild(f);
    var h = createNode("div", null, null, k);
    hide(h);
    document.body.appendChild(h);
    var b = function (m) {
            if (m && m.type != "hidden") {
                Event.addListener(document, "modifiable", function () {
                    yield(function () {
                        m.focus()
                    })
                });
                b = noop
            }
        };
    g.forEach(function (an) {
        if (!an) {
            return
        }
        if (!an.id) {
            an.id = "input" + getUID(an)
        }
        var aj = createNode("label", {
            "for": an.id
        }, null, an.label);
        if (an.required) {
            aj.appendChild(createNode("span", {
                className: "required"
            }, null, "*"))
        }
        var H = {
            type: an.validate,
            minlength: an.minlength,
            maxlength: an.maxlength,
            htmllevel: an.htmllevel
        };
        if (Browser.isIE) {
            aj = createNode("span", null, null, aj);
            aj = createNode("span", null, null, aj.innerHTML)
        }
        var af = an.list ? toList(an.value).join(", ") : (an.value || "");
        var A, p, am, ad;
        var q = false;
        switch (an.type) {
        case "header":
            f.appendChild(createNode("tr", null, null, createNode("td", {
                colSpan: 2
            }, null, createNode("h5", null, null, an.value))));
            return;
        case "subheader":
            A = f.appendChild(createNode("tr"));
            A.appendChild(createNode("td", {
                className: "label"
            }, null, ""));
            A.appendChild(createNode("td", {
                className: "value"
            }, null, createNode("h4", null, null, an.value)));
            return;
        case "spacer":
            f.appendChild(createNode("tr", {
                className: an.rowClassName,
                id: an.rowId
            }, null, createNode("td", {
                colSpan: 2,
                className: "spacer"
            }, null, "&nbsp")));
            return;
        case "rofullspan":
            f.appendChild(createNode("tr", null, null, createNode("td", {
                colSpan: 2,
                className: "rofullspan"
            }, null, an.value)));
            return;
        case "rotext":
            p = createNode("span", {
                id: an.id,
                className: an.className
            }, null, an.value);
            break;
        case "roimg":
            p = createNode("img", {
                src: an.src,
                width: an.width,
                height: an.height
            });
            break;
        case "tip":
            A = f.appendChild(createNode("tr"));
            A.appendChild(createNode("td", {
                className: "label"
            }, null, ""));
            A.appendChild(createNode("td", {
                className: "value"
            }, null, createNode("span", {
                className: "tip"
            }, null, an.value)));
            return;
        case "file":
            p = createNode("input", {
                name: an.name,
                id: an.id,
                type: "file"
            });
            break;
        case "hidden":
            a.appendChild(createNode("input", {
                name: an.name,
                id: an.id,
                type: "hidden",
                value: af
            }));
            return;
        case "user":
            var G = af.buddyicon ? af.buddyicon : -1;
            var I = buildImgURL("img-buddy", {
                id: G,
                ".out": "jpg",
                size: "li"
            });
            p = createNode("span", {
                className: "buddyicon_li"
            }, {
                backgroundImage: 'url("' + I + '")'
            }, af.user_name);
            p.appendChild(createNode("input", {
                name: an.name,
                id: an.id,
                type: "hidden",
                value: af.user_id
            }));
            break;
        case "username":
            var u = createNode("input", {
                name: an.name,
                id: an.id,
                type: "text",
                value: decodeHtml(af)
            });
            b(u);
            var V = createNode("span");
            p = createNode("span", {
                className: "username_status"
            }, null, [u, V]);
            var X = new CheckAvailability(u, V, an.placeholder, an.available);
            H.type = H.type || "USERNAME";

            function ab() {
                u.value = u.value.toLowerCase()
            }
            Event.addListener(u, "blur", ab);
            Event.addListener(u, "change", ab);
            break;
        case "select":
            p = createNode("select", {
                name: an.name,
                id: an.id
            });
            for (am = 0; am < an.options.length; ++am) {
                ad = an.options[am];
                var au;
                var av;
                if (typeof (ad) == "object") {
                    au = ad.value;
                    av = ad.label
                } else {
                    au = ad;
                    av = ad
                }
                p.appendChild(createNode("option", {
                    value: au,
                    selected: (au == af ? "selected" : null)
                }, null, av))
            }
            break;
        case "text":
        case "url":
        case "price":
            var n = {
                name: an.name,
                id: an.id,
                type: "text",
                value: decodeHtml(af)
            };
            if (an.maxlength && (an.htmllevel || "none") === "none") {
                n.maxlength = an.maxlength
            }
            p = createNode("input", n);
            b(p);
            if (!H.type) {
                switch (an.type) {
                case "text":
                    H.type = "TEXT";
                    break;
                case "price":
                    H.type = "PRICE";
                    break;
                case "url":
                    H.type = "URL";
                    break
                }
            }
            break;
        case "email":
            p = createNode("input", {
                name: an.name,
                id: an.id,
                type: "text",
                value: decodeHtml(af),
                maxlength: 255
            });
            b(p);
            H.type = H.type || "EMAIL";
            break;
        case "textarea":
            p = createNode("textarea", {
                name: an.name,
                id: an.id,
                rows: an.rows || 5
            }, null, "");
            b(p);
            p.value = decodeHtml(af);
            if (an.trackKs) {
                var L = new TrackKeyStroke(p)
            }
            if (an.highlight) {
                yield(function () {
                    HighlightingTextarea.init(p, {
                        msg: an.highlight_emptymsg,
                        maxHeight: an.highlight_fixedheight ? 0 : null
                    })
                })
            }
            q = true;
            H.type = H.type || "TEXTAREA";
            break;
        case "password":
            p = createNode("input", {
                name: an.name,
                id: an.id,
                type: "password",
                value: decodeHtml(af)
            });
            b(p);
            if (an.verify) {
                var U = p;
                var r = createNode("span");
                p = createNode("span", null, null, [p, r]);
                delayed(function () {
                    var v = new VerifyPassword($_(an.verify), U, r)
                }, 0)()
            }
            break;
        case "copypaste":
            p = createNode("span", {
                className: "copypaste_holder"
            }, null, createCopyPaste(an, af));
            break;
        case "checkbox":
            if (!an.checkboxes && an.name) {
                an.checkboxes = [{
                    id: an.id,
                    name: an.name,
                    checked: an.checked,
                    label: an.label,
                    disabled: an.disabled,
                    defaultChecked: an.defaultChecked
                }];
                an.id = null
            }
            an.id = an.id || Dom.uniqueId("checkbox");
            var D = [];
            an.checkboxes.forEach(function (v) {
                var aw;
                if (v.checked !== undefined) {
                    aw = v.checked
                } else {
                    if (d[v.name] !== undefined) {
                        aw = !! d[v.name]
                    } else {
                        aw = v.defaultChecked
                    }
                }
                var ax = v.id || Dom.uniqueId("checkbox_" + v.name);
                D.push(createNode("span", {
                    className: "checkbox"
                }, null, [createCheckboxOrRadio("checkbox", {
                    id: ax,
                    name: v.name,
                    value: 1,
                    checked: aw,
                    disabled: v.disabled
                }), createLabel({
                    "for": ax
                }, null, v.label)]))
            });
            var B = an.cols || 1;
            if (D.length > 1) {
                if (an.cols !== undefined) {
                    var s = [];
                    for (var ar = 0; ar < D.length + B - 1; ar += B) {
                        var aa = [];
                        for (var al = 0; al < B; al++) {
                            aa.push(createNode("td", null, null, (ar + al < D.length) ? D[ar + al] : ""))
                        }
                        s.push(createNode("tr", null, null, aa))
                    }
                    p = createNode("table", {
                        cellspacing: 0,
                        cellpadding: 0,
                        className: "checkboxes"
                    }, null, [createNode("tbody", null, null, s)])
                } else {
                    p = createNode("div", {
                        id: an.id,
                        className: "checkboxes horizontal"
                    }, null, D)
                }
            } else {
                p = D[0]
            }
            if (an.sidelabel) {
                aj = createNode("label", {
                    "for": an.id
                }, null, an.sidelabel)
            } else {
                aj = createNode("label")
            }
            q = ((D.length / B) > 1);
            break;
        case "checkboxes":
            p = createNode("div", {
                id: an.id,
                className: "checkboxes"
            });
            an.options.forEach(function (v) {
                v.id = v.id || Dom.uniqueId("checkbox_" + an.name);
                v.name = an.name;
                v.list = true;
                p.appendChild(createNode("div", {
                    className: "checkbox"
                }, null, [createCheckboxOrRadio("checkbox", v), createLabel({
                    "for": v.id
                }, null, v.label)]))
            });
            break;
        case "radios":
            p = createNode("div", {
                id: an.id,
                className: "radios"
            });
            an.options.forEach(function (v) {
                v.id = Dom.uniqueId("radio_" + an.name);
                v.name = an.name;
                v.enabled = true;
                v.checked = af && v.value && (v.value == af);
                p.appendChild(createNode("div", {
                    className: "radio"
                }, null, [createCheckboxOrRadio("radio", v), createLabel({
                    "for": v.id
                }, null, v.label)]))
            });
            break;
        case "buttons":
            var R = an.buttons.map(function (v) {
                var aw = v.type;
                switch (aw) {
                case "submit":
                    p = createNode("input", {
                        type: "submit",
                        value: v.label,
                        disabled: v.disabled,
                        id: v.id
                    });
                    b(p);
                    break;
                case "button":
                    p = createNode("input", {
                        type: "button",
                        value: v.label,
                        disabled: v.disabled,
                        id: v.id
                    });
                    b(p);
                    Event.addListener(p, "click", v.onClick);
                    break;
                case "cancel":
                    p = createNode("span", {
                        className: "clickable cancel",
                        id: v.id
                    }, null, v.label);
                    Event.addListener(p, "click", v.onClick);
                    break;
                case "link":
                    p = createNode("span", {
                        className: "clickable",
                        id: v.id
                    }, null, v.label);
                    Event.addListener(p, "click", v.onClick);
                    break;
                default:
                    throw "Invalid button type: " + aw
                }
                return p
            });
            p = createNode("span", {
                className: "button_list"
            }, null, R);
            if (an.centered) {
                f.appendChild(createNode("tr", null, null, createNode("td", {
                    colSpan: 2,
                    align: "center"
                }, null, p)));
                return
            }
            break;
        case "agecheck":


            function at(aA, az, ay, aw) {
                var v = [];
                for (var ax = aA; ax <= az; ax++) {
                    v.push(createNode("option", {
                        value: ax,
                        selected: ax == ay ? true : null
                    }, null, ax))
                }
                if (aw) {
                    v = v.reverse()
                }
                v.unshift(createNode("option", {
                    value: "",
                    selected: "" === ay ? true : null
                }, null, "---"));
                return v
            }
            af = af || new Date();
            var ag = (new Date()).getFullYear();
            p = createNode("div", null, null, [createNode("select", {
                name: an.name + "_m"
            }, null, at(1, 12, "")), "&nbsp;", createNode("select", {
                name: an.name + "_d"
            }, null, at(1, 31, "")), "&nbsp;", createNode("select", {
                name: an.name + "_y"
            }, null, at(1900, ag, "", true))]);
            break;
        case "fbconnect":
            p = createNode("div", {
                className: "btn btn_action btn_connect"
            }, null, loc("Connect with Facebook"));
            Event.addListener(p, "click", function () {
                ModalDialog.hide();
                //Track.stat("inc", "facebook", ["connect_start", "signin"]);
                if (an.track) {
                    var v = ["connect_start"].concat(an.track);
                    //Track.stat("inc", "regtests", v)
                }
                Facebook.login({
                    doRedirect: false,
                    onSuccess: an.onSuccess,
                    permissions: an.permissions,
                    browserId: an.browserId,
                    track: an.track
                })
            });
            break;
        case "strip_selector":
            p = createNode("div");
            var P = p.appendChild(createNode("input", {
                type: "hidden",
                name: an.name,
                id: an.id
            }));
            StripSelector.show(an.renderer, {
                container: p,
                input: P,
                source: an.source,
                items: an.items,
                value: an.value
            });
            q = true;
            break;
        case "calendar":
            var aq;
            if (an.date) {
                aq = an.date
            } else {
                if (af) {
                    aq = new Date(af)
                } else {
                    aq = new Date()
                }
            }
            p = createNode("div", null, null, aq.toLocaleString());
            var N = a.appendChild(createNode("input", {
                name: an.name,
                id: an.id,
                type: "hidden",
                value: aq.getTime()
            }));
            var ac = new CalendarAndTime();
            ac.setDate(aq);
            Event.addListener(ac, "select", function (v) {
                ac.setDate(v);
                setNode(p, null, null, v.toLocaleString());
                N.value = v.getTime()
            });
            Event.addListener(p, "click", function (v) {
                ac.show(v)
            });
            break;
        case "set_style_picker":
            var C = af;
            var m = [createLabel({
                className: "embed_radio embed_details",
                "for": an.id + "embed_details"
            }, null, createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_details",
                value: "details",
                checked: C == "details"
            })), createLabel({
                className: "embed_radio embed_grid",
                "for": an.id + "embed_grid"
            }, null, createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_grid",
                value: "grid",
                checked: C == "grid"
            })), createLabel({
                className: "embed_radio embed_list",
                "for": an.id + "embed_list"
            }, null, createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_list",
                value: "list",
                checked: C == "list"
            })), createLabel({
                className: "embed_radio embed_basic",
                "for": an.id + "embed_basic"
            }, null, createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_basic",
                value: "basic",
                checked: C == "basic" || C === null
            }))];
            p = createNode("div", {
                className: "embed_type",
                id: an.id
            }, null, m);
            break;
        case "lookbook_style_picker":
            var W = af;
            var x = [createLabel({
                "for": an.id + "embed_slideshow"
            }, null, [createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_slideshow",
                value: "slideshow",
                checked: W == "slideshow"
            }), createNode("span", {
                className: "embed_radio embed_slideshow"
            }, null, loc("Slideshow"))]), createLabel({
                "for": an.id + "embed_carousel"
            }, null, [createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_carousel",
                value: "carousel",
                checked: W == "carousel"
            }), createNode("span", {
                className: "embed_radio embed_carousel"
            }, null, loc("Carousel"))]), createLabel({
                "for": an.id + "embed_grid"
            }, null, [createCheckboxOrRadio("radio", {
                name: an.name,
                id: an.id + "embed_grid",
                value: "grid",
                checked: W == "grid"
            }), createNode("span", {
                className: "embed_radio embed_lb_grid"
            }, null, loc("Image grid"))])];
            p = createNode("div", {
                className: "embed_lb_type",
                id: an.id
            }, null, x);
            break;
        case "size_picker":
            p = createNode("div", {
                className: "selectoption"
            });
            var E = a.appendChild(createInput("hidden", {
                value: af,
                name: an.name
            }));
            var ai = {
                sizes: [{
                    value: "l",
                    label: loc("300px")
                }, {
                    value: "e",
                    label: loc("400px")
                }, {
                    value: "x",
                    label: loc("500px")
                }, {
                    value: "y",
                    label: loc("600px")
                }]
            };
            if (an.itemType === "lookbook") {
                ai.widthOnly = true
            }
            if (!an.disableCustom) {
                ai.custom = {
                    width: true,
                    height: false,
                    defaultValue: "c600x600"
                }
            }
            SizePicker.add(p, E, ai);
            break;
        case "item_picker":
            p = createNode("div");
            Share.createItemPicker(an.items, p, "", an.basedon_tid);
            break;
        case "quick_share":
            var J = createInput("hidden", {
                value: af,
                name: an.listName
            });
            var ap = createCheckboxOrRadio("checkbox", {
                name: an.name,
                id: an.id + "on",
                value: "on",
                checked: an.checked
            });
            var w = createLabel({
                "for": an.id + "on"
            }, null, loc("Quick share with friends"));
            var O = createNode("span", null, null, [ap, w]);
            var ah = Share.createAccountPicker({
                accounts: an.services,
                input: J,
                inDialog: an.inDialog,
                inParent: an.inParent
            });
            var ao = function () {
                    if (ap.checked) {
                        show(ah)
                    } else {
                        hide(ah)
                    }
                };
            Event.addListener(J, "change", function () {
                ap.checked = true;
                if (!J.value.length) {
                    hide(O)
                } else {
                    showInline(O)
                }
                ao()
            });
            Event.addListener(ap, "change", ao);
            ao();
            p = createNode("div", {
                className: "quickshare"
            }, null, [O, ah, J]);
            break;
        case "quick_share_compact":
            var M = createInput("hidden", {
                value: af,
                name: an.listName
            });
            var Q = createCheckboxOrRadio("checkbox", {
                name: an.name,
                id: an.id + "on",
                value: "on",
                checked: an.checked
            });
            var t = Share.createAccountPicker({
                accounts: an.services,
                input: M,
                inDialog: an.inDialog,
                inParent: an.inParent,
                checkbox: Q,
                accountListClass: " "
            });
            p = createNode("div", {
                className: "quickshare"
            }, null, [t, M]);
            break;
        default:
            throw "invalid type: " + an.type
        }
        if (an.list) {
            setNode(p, {
                list: an.list
            })
        }
        if (q) {
            an.rowClassName = an.rowClassName ? an.rowClassName + " form_multiline" : "form_multiline"
        }
        A = f.appendChild(createNode("tr", {
            id: an.rowId,
            className: an.rowClassName
        }));
        if (c) {
            A.appendChild(createNode("td", {
                className: "value nolabel"
            }, null, p))
        } else {
            var F = "label";
            A.appendChild(createNode("td", {
                className: "label"
            }, null, aj));
            A.appendChild(createNode("td", {
                className: "value"
            }, null, p))
        }
        if (an.placeholder) {
            var S = f.appendChild(createNode("tr"));
            S.appendChild(createNode("td", {
                className: "placeholder"
            }));
            S.appendChild(createNode("td", {
                className: "placeholder",
                id: an.placeholder
            }))
        }
        var T = createNode("tr");
        var o;
        if (an.error || H.type) {
            var ak = {};
            if (!an.error) {
                ak.display = "none"
            }
            var Z = "validate_" + an.name + "_error";
            o = createNode("tr", {
                id: Z
            }, ak);
            o.appendChild(createNode("td"));
            o.appendChild(createNode("td", {
                className: "error"
            }, null, an.error));
            f.appendChild(o);
            if (H.type && H.type.toLowerCase() != "none") {
                var Y = H.type;
                delete H.type;
                yield(function () {
                    Validate.formMonitor(a, an.id, Y, o, H)
                })
            }
        }
        if (an.hint) {
            f.appendChild(T);
            T.appendChild(createNode("td"));
            T.appendChild(createNode("td", {
                className: "explain"
            }, null, an.hint))
        }
        if (an.requiredIf) {
            var K = $_(an.requiredIf);
            if (K) {
                var ae = Browser.isIE ? "inline" : "table-row";
                setNode(A, null, {
                    display: inputValue(K) ? ae : "none"
                });
                setNode(T, null, {
                    display: inputValue(K) ? ae : "none"
                });
                Event.addListener(K, "change", function () {
                    setNode(A, null, {
                        display: inputValue(K) ? ae : "none"
                    });
                    setNode(T, null, {
                        display: inputValue(K) ? ae : "none"
                    })
                })
            } else {
                console.log("requiredIf src not found")
            }
        }
        if (an.ac_data) {
            var y;
            if (an.ac_data.data) {
                y = an.ac_data.data
            } else {
                if (an.ac_data.action) {
                    y = new AjaxDataSource(an.ac_data.action, {
                        data: an.ac_data.params || {}
                    }, {
                        hideProgress: true
                    })
                }
            }
            var z = new AutoComplete(p, y, an.ac_data.options);
            Event.addListener(a, "destruct", z.destruct, z)
        }
    });
    h.removeChild(k);
    document.body.removeChild(h);
    return k
}
//megaserg removed OAuth and FacebookAuth
function validateData(c, b) {
    if (!c || !b) {
        return true
    }
    var d = 0;

    function a(f) {
        return !(f === undefined || f === "")
    }
    b.forEach(function (n) {
        if (!n.name || n.type == "hidden") {
            return
        }
        var k = c[n.name];
        if (n.requiredIf && !a(c[n.requiredIf])) {
            return
        }
        if (n.type == "checkbox") {
            if (n.checkboxes) {
                n.checkboxes.forEach(function (o) {
                    if (o.name == n.name) {
                        o.checked = k ? true : false
                    }
                })
            } else {
                n.checked = k ? true : false
            }
        } else {
            if (n.type == "agecheck") {
                if (c[n.name + "_y"] && c[n.name + "_m"] && c[n.name + "_d"]) {
                    var h = parseInt(c[n.name + "_y"], 10);
                    var l = parseInt(c[n.name + "_m"], 10);
                    var f = parseInt(c[n.name + "_d"], 10);
                    k = new Date(h, l - 1, f);
                    if (k.getMonth() == l - 1 && k.getDate() == f) {
                        n.value = k
                    } else {
                        k = -1;
                        n.value = 0
                    }
                } else {
                    k = undefined;
                    n.value = 0
                }
            } else {
                n.value = k
            }
        }
        n.error = null;
        if ((n.required || n.requiredIf) && !a(k)) {
            d++;
            n.error = n.errMsg;
            if (!n.error) {
                n.error = loc("Please enter a value for this field")
            }
        }
        if (n.validate) {
            if (n.validate.toLowerCase() != "none") {
                var j = Validate.validate(k, n.validate);
                if (!j.valid) {
                    d++;
                    n.error = j.msg;
                    return
                }
            }
        } else {
            var g = Validate.validate(k, n.type);
            if (!g.valid) {
                d++;
                n.error = g.msg;
                return
            }
        }
        if (n.type == "agecheck") {
            if (k == -1) {
                d++;
                n.error = loc("Please enter a valid date")
            } else {
                var m = new Date(k);
                m.setFullYear(m.getFullYear() + n.minAge);
                if (m - new Date() > 0) {
                    d++;
                    n.error = loc("You must be at least {minage} years old", {
                        minage: n.minAge
                    })
                }
            }
        }
    });
    return d === 0
}
function extractInputValues(f) {
    var a = {};
    for (var d = 0; d < f.elements.length; ++d) {
        var b = f.elements[d];
        var c = b.name;
        var g = inputValue(b);
        if (c) {
            if (b.getAttribute("list")) {
                if (b.type == "checkbox") {
                    if (g) {
                        if (a[c]) {
                            a[c].push(g)
                        } else {
                            a[c] = [g]
                        }
                    }
                } else {
                    a[c] = g ? g.split(/\s*[,\n]\s*#?/) : []
                }
            } else {
                if (b.type == "radio") {
                    if (g) {
                        a[c] = g
                    }
                } else {
                    a[c] = g
                }
            }
        }
    }
    return a
}
function requireLoginBeforeSubmit(b, c) {
    var a = $_(b);
    Event.addListener(a, "click", function (d) {
        Event.stopDefault(d);
        callOrSignIn(function () {
            setNode(a, {
                disabled: true
            });
            var f = $_(c);
            Event.trigger(f, "submit");
            yield(function () {
                if (!Validate.isFormValid(f)) {
                    setNode(a, {
                        disabled: null
                    });
                    return
                }
                f.appendChild(createNode("input", {
                    type: "hidden",
                    name: b,
                    value: inputValue(a)
                }));
                f.submit()
            })
        })
    })
}
function focusFirst(d) {
    d = d.constructor == String ? $_(d) : d;
    var f = d.elements;
    var a = function (g) {
            return function () {
                g.focus()
            }
        };
    for (var c = 0; c < f.length; ++c) {
        var b = f[c];
        if (b.type != "hidden") {
            Event.addListener(document, "modifiable", a(b));
            break
        }
    }
}
function formCancel(c, b) {
    c = $_(c);
    setNode(c, {
        onsubmit: null
    });
    Event.release(c);
    var d;
    for (var a = 0; a < c.elements.length; a++) {
        if (c.elements[a].type == "submit") {
            d = c.elements[a].name;
            break
        }
    }
    if (d) {
        c.appendChild(createNode("input", {
            type: "hidden",
            name: d,
            value: b || loc("Cancel")
        }))
    }
    c.submit()
}
var Validate = function () {
        var b = null;
        var a = {
            valid: true
        };
        return {
            validate: function (c, h, f, d) {
                if (!b) {
                    b = {
                        EMAIL: Validate.email,
                        DISPLAYNAME: Validate.displayName,
                        USERNAME: Validate.userName,
                        URL: Validate.url,
                        INTEGER: Validate.integer,
                        FLOAT: Validate.floatType,
                        DATE: Validate.date,
                        PRICE: Validate.price
                    }
                }
                f = f || {};
                c = "" + c;
                c = c.trim();
                if (c.length === 0) {
                    if (!f.required) {
                        return a
                    } else {
                        return {
                            valid: false,
                            msg: loc("Please enter a value for this field")
                        }
                    }
                }
                if (f.minlength && !d && c.length < f.minlength) {
                    return {
                        valid: false,
                        msg: loc("Please enter at least {min} characters for this field", {
                            min: f.minlength
                        })
                    }
                }
                if (f.maxlength) {
                    var j = c;
                    if ((f.htmllevel || "none") !== "none") {
                        j = stripHtml(j)
                    }
                    if (j.length > f.maxlength) {
                        return {
                            valid: false,
                            msg: loc("Please enter less than {max} characters for this field", {
                                max: f.maxlength
                            })
                        }
                    }
                }
                h = h || "";
                var g = b[h.toUpperCase()];
                if (!g) {
                    return a
                }
                return g(c, f, d)
            },
            formMonitor: function (j, f, h, k, g) {
                j = $_(j);
                if (!j) {
                    return
                }
                f = $_(f) || j[f];
                k = $_(k);
                if (!k) {
                    return
                }
                g = g || {};
                var d;
                if (hasClass(k, "error")) {
                    d = k
                } else {
                    d = getElementsByClassName({
                        root: k,
                        className: "error"
                    })[0]
                }
                if (!d || !f) {
                    return
                }
                j._invalidInputs = j._invalidInputs || {};
                var l = function (n) {
                        n = n && (!document.activeElement || document.activeElement === f);
                        var m = Validate.validate(f.value, h, g, n);
                        if (m.valid) {
                            delete j._invalidInputs[f.name];
                            setNode(k, null, {
                                display: "none"
                            })
                        } else {
                            j._invalidInputs[f.name] = true;
                            if (m.msg) {
                                setNode(k, null, {
                                    display: "table-row"
                                });
                                d.innerHTML = m.msg
                            } else {
                                setNode(k, null, {
                                    display: "none"
                                })
                            }
                        }
                        return m.valid
                    };
                if (h) {
                    var c = Event.rateLimit(function () {
                        l(true)
                    }, 100);
                    Event.addListener(f, "blur", function () {
                        l(false)
                    });
                    Event.addListener(f, "change", function () {
                        l(false)
                    });
                    Event.addListener(f, "keyup", c)
                }
                Event.addListener(j, "submit", function (m) {
                    if (l(false)) {
                        return
                    }
                    if (m) {
                        Event.stop(m)
                    }
                })
            },
            isFormValid: function (c) {
                var d = $_(c)._invalidInputs || {};
                var f = true;
                forEachKey(d, function () {
                    f = false;
                    return true
                });
                return f
            },
            required: function (f, d, c) {
                return f || c ? a : {
                    valid: false,
                    msg: loc("Please enter a value for this field")
                }
            },
            minlength: function (f, d, c) {
                if (c || !f || !f.length || f.length >= d.minlength) {
                    return a
                } else {
                    return {
                        valid: false,
                        msg: loc("Please enter at least {min} characters for this field", {
                            min: d.minlength
                        })
                    }
                }
            },
            maxlength: function (f, d, c) {
                if (c || !f || !f.length) {
                    return a
                } else {
                    return f.length <= d.maxlength ? a : {
                        valid: false,
                        msg: loc("Please enter less than {max} characters for this field", {
                            max: d.maxlength
                        })
                    }
                }
            },
            emailOrUserName: function (h, f, c) {
                var d = Validate.email(h, f, c);
                var g = Validate.userName(h, f, c);
                return d.valid || g.valid ? a : {
                    valid: false,
                    msg: loc("Not a valid email address or username")
                }
            },
            email: function (f, d, c) {
                d = d || {};
                if (c) {
                    if (f.match(/^[@\w\-\.\+]*$/)) {
                        return a
                    }
                }
                if (f.match(/^.+@[\w\-]+(\.[\w\-]+)*\.[A-Za-z]{2,10}/)) {
                    return a
                }
                return {
                    valid: false,
                    msg: loc("Not a valid email address")
                }
            },
            displayName: function (f, d, c) {
                d = d || {};
                if (c) {
                    if (f.match(/^\w+(\s\w+)*[\s]{0,1}$/)) {
                        return a
                    }
                }
                if (f.length === 0) {
                    return {
                        valid: false
                    }
                }
                if (f.match(/^\w+(\s\w+)*\w+$/)) {
                    return a
                }
                return {
                    valid: false,
                    msg: loc("Only normal characters, numbers and single spaces")
                }
            },
            userName: function (f, d, c) {
                d = d || {};
                if (f.length === 0) {
                    return {
                        valid: false,
                        msg: null
                    }
                }
                if (f.length < 4 && !c) {
                    return {
                        valid: false,
                        msg: loc("Too short")
                    }
                }
                if (f.length > 32) {
                    return {
                        valid: false,
                        msg: loc("Too long")
                    }
                }
                if (c) {
                    if (f.match(/^[a-z](-?[a-z0-9]+)*-?$/)) {
                        return a
                    }
                }
                if (f.match(/[A-Z]/) && c) {
                    return {
                        valid: false
                    }
                }
                if (!f.match(/^[a-z](-?[a-z0-9])*$/)) {
                    return {
                        valid: false,
                        msg: loc("Only lowercase letters (a-z), numbers (0-9), and dashes (-) are allowed. Cannot start or end with a number or dash.")
                    }
                }
                return a
            },
            url: function (f, d, c) {
                d = d || {};
                if (c) {
                    return a
                }
                if (f.length && !(f.indexOf("http://") === 0 || f.indexOf("https://") === 0)) {
                    f = "http://" + f
                }
                if (!f.match(/^https?:\/\/?[^.]+(\.[^.]+)+/)) {
                    return {
                        valid: false,
                        msg: loc("{url} is not a valid URL", {
                            url: f
                        })
                    }
                }
                return a
            },
            integer: function (f, d, c) {
                d = d || {};
                if (!f.match(/^\d+$/)) {
                    return {
                        valid: false,
                        msg: loc("Not a valid number")
                    }
                }
                if (!c) {
                    if ((d.min || d.min === 0) && f < Number(d.min)) {
                        return {
                            valid: false,
                            msg: loc("This value cannot be less than {number}", {
                                number: d.min
                            })
                        }
                    }
                }
                if ((d.max || d.max === 0) && f > Number(d.max)) {
                    return {
                        valid: false,
                        msg: loc("This value cannot be greater than {number}", {
                            number: d.max
                        })
                    }
                }
                return a
            },
            floatType: function (f, d, c) {
                d = d || {};
                if (!f.match(/^[0-9]*\.?[0-9]+$/)) {
                    return {
                        valid: false,
                        msg: loc("Not a valid number")
                    }
                }
                if (!c) {
                    if ((d.min || d.min === 0) && f < Number(d.min)) {
                        return {
                            valid: false,
                            msg: loc("This value cannot be less than {number}", {
                                number: d.min
                            })
                        }
                    }
                }
                if ((d.max || d.max === 0) && f > Number(d.max)) {
                    return {
                        valid: false,
                        msg: loc("This value cannot be greater than {number}", {
                            number: d.max
                        })
                    }
                }
                return a
            },
            date: function (g, f, c) {
                f = f || {};
                if (c) {
                    return a
                }
                var h = new Date(g);
                if (h && h.time) {
                    return {
                        valid: true,
                        msg: loc("Not a valid date")
                    }
                }
                return a
            },
            price: function (f, d, c) {
                d = d || {};
                if (!f.match(/^\s*\d+(\.\d{1,2})?\s*$/)) {
                    return {
                        valid: false,
                        msg: loc("Please enter a valid price")
                    }
                }
                return a
            },
            userNameAvailable: function (c) {
                return function () {
                    return c.available ? a : {
                        valid: false
                    }
                }
            }
        }
    }();
var ExecQueue = (function () {
    var b;
    var a = [];
    return {
        push: function (c, d) {
            a.push(c);
            if (!b && d !== false) {
                b = window.setTimeout(ExecQueue._exec, 200)
            }
        },
        exec: function () {
            if (!b) {
                ExecQueue._exec()
            } else {}
        },
        _exec: function () {
            var c = a;
            a = [];
            b = null;
            c.forEachNonBlocking(50, function (d) {
                d()
            })
        }
    }
})();
var Feedback = function () {
        var c;
        var f = new Timer();
        var d = 0;
        var a = new Interval(16, function () {
            d *= 1.03;
            setNode(c, null, {
                top: px(d)
            });
            if (d < -Dim.fromNode(c).h) {
                clearNode(c);
                b()
            }
        });
        a.clear();

        function b() {
            f.reset();
            a.clear();
            if (c) {} else {
                c = createNode("ul", {
                    id: "feedback_msg",
                    className: "drop_shadowed"
                });
                document.body.appendChild(c);
                Event.addListener(c, "click", Feedback.hide)
            }
        }
        return {
            hide: function () {
                if (!c) {
                    return
                }
                hide(c);
                b()
            },
            message: function (j, g, h) {
                Event.addListener(document, "modifiable", function () {
                    if (!g) {
                        g = 1000 + 50 * ((typeof (j) == "string") ? j.length : textContent(j).length)
                    }
                    b();
                    show(c);
                    setNode(c, null, {
                        top: "-16px",
                        zIndex: overlayZIndex(c)
                    });
                    addList(c, j);
                    f.replace(function () {
                        d = -16;
                        a.reschedule(16)
                    }, g);
                    if (h) {
                        Feedback.markRead(h)
                    }
                })
            },
            markRead: function (g) {
                if (Auth.userId()) {
                    /*Ajax.post({
                        action: "announcement.mark_read",
                        hideProgress: true,
                        data: {
                            id: g
                        }
                    })*/
                }
            },
            error: function (h, g) {
                Feedback.message(createNode("span", {
                    className: "warning"
                }, null, h), g)
            },
            messageFromResponse: function (g) {
                if ((g.message || {}).length) {
                    g.message.forEach(function (h) {
                        Feedback.message(h.content)
                    })
                }
            }
        }
    }();

function Segment(a, c) {
    this.a = a;
    this.b = c;
    this.slope = (this.b.y - this.a.y) / (this.b.x - this.a.x);
    this.yIntercept = this.a.y - this.slope * this.a.x;
    var b = 1 / Math.sqrt(1 + this.slope * this.slope);
    this.dir = {
        x: b,
        y: b ? this.slope * b : 1
    };
    if (this.dir.x) {
        this.lambda = (this.b.x - this.a.x) / this.dir.x
    } else {
        this.lambda = (this.b.y - this.a.y) / this.dir.y
    }
}
Segment.prototype.distanceTo = function (a) {
    return this.closestPoint(a).distance(a)
};
Segment.prototype.inSegment = function (a) {
    return (((a.x <= this.a.x && a.x >= this.b.x) || (a.x >= this.a.x && a.x <= this.b.x)) && ((a.y <= this.a.y && a.y >= this.b.y) || (a.y >= this.a.y && a.y <= this.b.y)))
};
Segment.prototype.closestPoint = function (b) {
    var a, g;
    if (this.slope === 0) {
        a = b.x;
        g = this.a.y
    } else {
        if (this.slope == Number.POSITIVE_INFINITY || this.slope == Number.NEGATIVE_INFINITY) {
            a = this.a.x;
            g = b.y
        } else {
            var f = b.y + b.x / this.slope;
            a = (this.slope * (f - this.yIntercept)) / (this.slope * this.slope + 1);
            g = this.slope * a + this.yIntercept
        }
    }
    var d = new Point(a, g);
    if (this.inSegment(d)) {
        return d
    } else {
        return this.a.distance(b) < this.b.distance(b) ? this.a : this.b
    }
};

function sameSigns(d, c) {
    return (d ^ c) >= 0
}
Segment.prototype.intersect = function (c, d) {
    if (d !== undefined) {
        return this.intersect(new Segment(c, d))
    }
    if (this.dir.x === 0 && c.dir.x !== 0) {
        return c.intersect(this)
    }
    if (this.dir.y === 0 && c.dir.y === 0) {
        if (c.a.y != this.a.y) {
            return null
        }
        if (c.a.x <= Math.max(this.a.x, this.b.x) && c.a.x >= Math.min(this.a.x, this.b.x)) {
            return new Point(c.a.x, this.a.y)
        }
        return null
    }
    if (this.dir.x === 0 && c.dir.x === 0) {
        if (c.a.x != this.a.x) {
            return null
        }
        if (c.a.y <= Math.max(this.a.y, this.b.y) && c.a.y >= Math.min(this.a.y, this.b.y)) {
            return new Point(this.a.x, c.a.y)
        }
        return null
    }
    var a = (this.dir.y * c.a.x - this.dir.y * this.a.x - this.dir.x * c.a.y + this.dir.x * this.a.y) / (this.dir.x * c.dir.y - this.dir.y * c.dir.x);
    var b = (c.a.x + a * c.dir.x - this.a.x) / this.dir.x;
    if (!sameSigns(b, this.lambda) || !sameSigns(a, c.lambda)) {
        return null
    }
    b = Math.abs(b);
    a = Math.abs(a);
    if (0 <= b && b <= Math.abs(this.lambda) && 0 <= a && a <= Math.abs(c.lambda)) {
        return new Point(this.a.x + b * this.dir.x, this.a.y + b * this.dir.y)
    } else {
        return null
    }
};


if (!window.localStorage) {
    window.localStorage = {
        getItem: noop,
        setItem: noop,
        removeItem: noop,
        clear: noop,
        key: noop,
        length: 0
    }
}
var L10N = function () {
        var a = {};
        var c = (window.Lexicon !== undefined);

        function b(f) {
            var d = "return " + f.replace(/\"/g, '\\"').split(/(\{\w+\})/).map(function (g) {
                return (g.match(/\{(\w+)\}/)) ? 'p["' + RegExp.$1 + '"]' : '"' + g + '"'
            }).join("+") + ";";
            return new Function("p", d)
        }
        return {
            loc: function (j, h) {
                if (h) {
                    for (key in h) {
                        if (h.hasOwnProperty(key) && (typeof (h[key]) == "object")) {
                            h[key] = outerHTML(h[key])
                        }
                    }
                }
                if (a[j]) {
                    return a[j](h)
                }
                var d = c ? Lexicon[j] || j : j;
                var g = (a[j] = b(d));
                return g(h)
            }
        }
    }();
var loc = L10N.loc;

function Undo(a) {
    a = a || {};
    this._maxHistory = Math.max(a.maxHistory, 2) || 30;
    this.clear()
}
Undo.prototype.clear = function () {
    this._past = [];
    this._future = [];
    this._present = null
};
Undo.prototype.push = function (b) {
    var a = null;
    if (this._present) {
        this._past.push(this._present);
        if (this._past.length > this._maxHistory) {
            a = this._past.shift()
        }
        this._future = []
    }
    this._present = b;
    return a
};
Undo.prototype.undo = function () {
    var a = null;
    if (this.canUndo()) {
        this._future.unshift(this._present);
        this._present = this._past.pop();
        a = this._present
    }
    return a
};
Undo.prototype.redo = function () {
    var a = null;
    if (this.canRedo()) {
        this._past.push(this._present);
        this._present = this._future.shift();
        a = this._present
    }
    return a
};
Undo.prototype.canUndo = function () {
    return this._past.length > 0
};
Undo.prototype.canRedo = function () {
    return this._future.length > 0
};
Undo.prototype.present = function () {
    return this._present
};

function Canvas() {
    this._items = [];
    this._view = {
        origin: new Point(0, 0),
        zoom: 1
    }
}
Canvas.prototype.init = function (b, a) {
    this._node = b;
    if (a || a === undefined) {
        this._selected = new SelectedItems(this._node)
    } else {
        this._selected = new NoopSelectedItems()
    }
    addClass(this._node, "unlocked");
    Event.addListener(this._selected, "beginmove", function () {
        Event.bundleEvents(this, "change")
    }, this);
    Event.addListener(this._selected, "endmove", function () {
        Event.unbundleEvents(this, "change")
    }, this);
    Event.addListener(this._selected, "beginrotate", function () {
        Event.bundleEvents(this, "change")
    }, this);
    Event.addListener(this._selected, "endrotate", function () {
        Event.unbundleEvents(this, "change")
    }, this);
    Event.addListener(this._selected, "beginresize", function () {
        Event.bundleEvents(this, "change")
    }, this);
    Event.addListener(this._selected, "endresize", function () {
        Event.unbundleEvents(this, "change")
    }, this);
    /* EMPTY: this._empty = b.appendChild(createNode("div", {
        className: "emptymsg"
    }, null, loc("Click here")));*/
    addClass(b, "empty");
    this.fakeInput = createNode("input", {
        id: "fakeInput"
    });
    b.appendChild(this.fakeInput);
    try {
        this.fakeInput.focus()
    } catch (c) {}
    Event.addListener(this._node, Browser.isFirefox ? "keypress" : "keydown", function (h) {
        if (h.keyCode == 9 && !this.locked) {
            var f = -1;
            var g = this._items.length;
            this._selected.values().forEach(function (j) {
                f = Math.max(f, j.z - 1);
                g = Math.min(g, j.z - 1)
            });
            this.clearSelection();
            var d;
            if (h.shiftKey) {
                d = g - 1
            } else {
                d = f + 1
            }
            d = (d + this._items.length) % this._items.length;
            this.select(this._items[d]);
            return Event.stop(h)
        } else {
            if (h.keyCode == 27) {
                this.clearSelection();
                this.multiSelect.cancel();
                this.fakeInput.focus();
                return Event.stop(h)
            }
        }
    }, this);
    Event.addListener(b, "mousedown", this.onMouseDown, this);
    Event.addListener(b, "keydown", this.onKeyDown, this);
    Event.addListener(document, "keyup", this.onKeyUp, this);
    Event.addListener(window, "blur", this._selected.show, this._selected);
    this.multiSelect = new MultiSelect(b);
    Event.addListener(this.multiSelect, "selected", function () {
        Event.bundleEvents(this, "select");
        this.multiSelect.forEach(function (d) {
            this.select(d)
        }, this);
        if (!this.locked && !this._selectionModifier) {
            this._selected.show()
        }
        Event.unbundleEvents(this, "select")
    }, this)
};
Canvas.prototype.getNode = function () {
    return this._node
};
Canvas.prototype.setEmptyMessage = function (a) {
    setNode(this._empty, null, null, a)
};
Canvas.prototype.appendControl = function (a) {
    Event.addListener(a, "mousedown", Event.stopBubble);
    Event.addListener(a, "keydown", Event.stopBubble);
    return this._node.appendChild(a)
};
Canvas.prototype.getSelected = function () {
    return this._selected
};
Canvas.prototype.getCanvasSize = function () {
    return Dim.fromNode(this._node)
};
Canvas.prototype.getBounds = function () {
    var a = new Rect(Infinity, Infinity, -Infinity, -Infinity);
    this.getItems().forEach(function (b) {
        a.expand(b.getBounds())
    });
    return a
};
Canvas.prototype.getView = function () {
    if (!this._view || !this._view.origin || !this._view.zoom) {
        /*Beacon.log("err", {
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "getview",
            v: JSON2.stringify(this._view),
            s: stack()
        }, 1)*/
    }
    return cloneObject(this._view, true)
};
Canvas.prototype.gotoView = function (a) {
    if (!a || !a.origin || !a.zoom) {
        /*Beacon.log("err", {
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "gotoview",
            nv: JSON2.stringify(a),
            s: stack()
        }, 1)*/
    }
    this.slide((a.origin.x - this._view.origin.x) * this._view.zoom, (a.origin.y - this._view.origin.y) * this._view.zoom);
    this.zoom(a.zoom / this._view.zoom);
    this._selected.redraw()
};
Canvas.prototype.fit = function (h) {
    var g = this.getBounds();
    var j = g.dim();
    var d = this.getCanvasSize();
    var f = Math.min(d.w / j.w, d.h / j.h) / 1.3;
    if (!h && f > 1 && f < 10) {
        f = 1
    }
    var a = new Point(d.w / 2, d.h / 2);
    var c = a.x - (g.x1 + j.w / 2);
    var b = a.y - (g.y1 + j.h / 2);
    this.slide(c, b);
    this.zoom(f);
    this._selected.redraw()
};
Canvas.prototype.slide = function (b, a) {
    if (b === 0 && a === 0) {
        return
    }
    if (!this._view.zoom) {
        /*Beacon.log("err", {
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "slide",
            view: JSON2.stringify(this._view),
            dx: b,
            dy: a,
            s: stack()
        }, 1)*/
    }
    this._view.origin.x += b / this._view.zoom;
    this._view.origin.y += a / this._view.zoom;
    Event.pauseEvents(this, "change");
    this.getItems().forEach(function (c) {
        c.beginMove();
        c.move(b, a, false, true);
        c.endMove()
    });
    Event.unpauseEvents(this, "change")
};
Canvas.prototype.zoom = function (c) {
    if (c == 1) {
        return
    }
    var b = this.getCanvasSize();
    var a = new Point(b.w / 2, b.h / 2);
    if (!c) {
        /*Beacon.log("err", {
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "zoom",
            z: c,
            s: stack()
        }, 1);
        return*/
    }
    this._view.zoom *= c;
    var d = new Point(c, c);
    Event.pauseEvents(this, "change");
    this._items.forEach(function (f) {
        f.setScale(d, a)
    });
    Event.unpauseEvents(this, "change")
};
Canvas.prototype.select = function (a) {
    if (a.unselectable) {
        return
    }
    this._selected.add(a);
    this.fakeInput.focus();
    if (!this.locked && !this._selectionModifier && !this._handlesRedraw) {
        this._handlesRedraw = yield(function () {
            delete this._handlesRedraw;
            this._selected.show()
        }, this)
    }
    Event.trigger(this, "select", a);
    Event.addListener(a, "updateactions", this.onUpdateActions, this)
};
Canvas.prototype.selectAll = function () {
    if (this.locked || this._selected.moving) {
        return
    }
    var a = null;
    this._items.forEach(function (b) {
        if (!b.unselectable && !this._selected.contains(b)) {
            this._selected.add(b);
            Event.addListener(b, "updateactions", this.onUpdateActions, this);
            a = b
        }
    }, this);
    Event.trigger(this, "select", a);
    this.fakeInput.focus();
    this._selected.show()
};
Canvas.prototype.unselect = function (a) {
    this._selected.remove(a);
    a.unselect();
    Event.removeListener(a, "updateactions", this.onUpdateActions, this);
    Event.trigger(this, "unselect", a)
};
Canvas.prototype.onUpdateActions = function (a) {
    Event.trigger(this, "updateactions", a)
};
Canvas.prototype.removeSelected = function () {
    var a = [];
    Event.pauseEvents(this, "change");
    Event.pauseEvents(this, "removeitem");
    this._selected.forEach(function (c) {
        var b;
        if (this.locked) {
            if (c.clearContent) {
                b = c.clearContent();
                if (b) {
                    this.unselect(c)
                }
            }
        } else {
            this.removeItem(c);
            b = c
        }
        if (b) {
            a.push(b)
        }
    }, this);
    Event.unpauseEvents(this, "change");
    Event.unpauseEvents(this, "removeitem");
    if (a.length) {
        Event.trigger(this, "removeitem", a);
        Event.trigger(this, "change")
    }
};
Canvas.prototype.cloneSelected = function () {
    var a = [];
    Event.bundleEvents(this, "change");
    Event.bundleEvents(this, "select");
    this._selected.forEach(function (b) {
        var c = b.clone();
        c.move(20, 20, false, true);
        a.push(c)
    }, this);
    a.sort(function (d, c) {
        return d.z - c.z
    }).forEach(function (b) {
        this.addItem(b)
    }, this);
    if (this._selected.size()) {
        this._selected.clear({
            keepMatrix: true
        })
    }
    a.forEach(function (b) {
        this.select(b)
    }, this);
    this._selected.show();
    Event.unbundleEvents(this, "select");
    Event.unbundleEvents(this, "change")
};
Canvas.prototype.raiseSelected = function (a) {
    this.raiseItems(this._selected.values(), a.shiftKey)
};
Canvas.prototype.lowerSelected = function (a) {
    this.lowerItems(this._selected.values(), a.shiftKey)
};
Canvas.prototype.arrangeTopSelected = function (b) {
    var a = this._selected;
    if (a.size() < 2) {
        return
    }
    Event.bundleEvents(this, "change");
    var c = a.getRect().top();
    a.forEach(function (d) {
        d.beginMove();
        d.move(0, c - d.getBounds().top());
        d.endMove()
    });
    Event.unbundleEvents(this, "change");
    a.redraw()
};
Canvas.prototype.arrangeBottomSelected = function (c) {
    var b = this._selected;
    if (b.size() < 2) {
        return
    }
    var a = b.getRect().bottom();
    Event.bundleEvents(this, "change");
    b.forEach(function (d) {
        d.beginMove();
        d.move(0, a - d.getBounds().bottom());
        d.endMove()
    });
    Event.unbundleEvents(this, "change");
    b.redraw()
};
Canvas.prototype.arrangeMiddleSelected = function (d) {
    var c = this._selected;
    if (c.size() < 2) {
        return
    }
    var a = c.values();
    var b = consensusOrMediod(2, a.map(function (f) {
        return f.getRect().center().y
    }));
    Event.bundleEvents(this, "change");
    c.forEach(function (f) {
        f.beginMove();
        f.move(0, b - f.getRect().center().y);
        f.endMove()
    });
    Event.unbundleEvents(this, "change");
    c.redraw()
};
Canvas.prototype.arrangeLeftSelected = function (b) {
    var a = this._selected;
    if (a.size() < 2) {
        return
    }
    var c = a.getRect().left();
    Event.bundleEvents(this, "change");
    a.forEach(function (d) {
        d.beginMove();
        d.move(c - d.getBounds().left(), 0);
        d.endMove()
    });
    Event.unbundleEvents(this, "change");
    a.redraw()
};
Canvas.prototype.arrangeRightSelected = function (c) {
    var b = this._selected;
    if (b.size() < 2) {
        return
    }
    var a = b.getRect().right();
    Event.bundleEvents(this, "change");
    b.forEach(function (d) {
        d.beginMove();
        d.move(a - d.getBounds().right(), 0);
        d.endMove()
    });
    Event.unbundleEvents(this, "change");
    b.redraw()
};
Canvas.prototype.arrangeCenterSelected = function (d) {
    var c = this._selected;
    if (c.size() < 2) {
        return
    }
    var b = c.values();
    var a = consensusOrMediod(2, b.map(function (f) {
        return f.getRect().center().x
    }));
    Event.bundleEvents(this, "change");
    c.forEach(function (f) {
        f.beginMove();
        f.move(a - f.getRect().center().x, 0);
        f.endMove()
    });
    Event.unbundleEvents(this, "change");
    c.redraw()
};
Canvas.prototype.arrangeSpreadHSelected = function (a) {
    var d = this._selected;
    if (d.size() < 2) {
        return
    }
    var h = d.values();
    var b = d.getRect().width();
    var f = h.map(function (l) {
        return l.getBounds().width()
    }).reduce(function (m, l) {
        return m + l
    });
    var k = Math.max(b - f, 0);
    k = k / (d.size() - 1);
    var g = h.sort(function (m, l) {
        return m.getBounds().left() - l.getBounds().left()
    });
    var c = g[0];
    var j = c.getBounds().left();
    Event.bundleEvents(this, "change");
    g.forEach(function (m) {
        var l = m.getBounds();
        m.beginMove();
        m.move(j - l.left(), 0);
        m.endMove();
        j += l.width() + k
    });
    Event.unbundleEvents(this, "change");
    d.redraw()
};
Canvas.prototype.arrangeSpreadVSelected = function (a) {
    var c = this._selected;
    if (c.size() < 2) {
        return
    }
    var f = c.values();
    var k = c.getRect().height();
    var b = f.map(function (l) {
        return l.getBounds().height()
    }).reduce(function (m, l) {
        return m + l
    });
    var j = Math.max(k - b, 0);
    j = j / (c.size() - 1);
    var d = f.sort(function (m, l) {
        return m.getBounds().top() - l.getBounds().top()
    });
    var h = d[0];
    Event.bundleEvents(this, "change");
    var g = h.getBounds().top();
    d.forEach(function (m) {
        var l = m.getBounds();
        m.beginMove();
        m.move(0, g - l.top());
        m.endMove();
        g += l.height() + j
    });
    Event.unbundleEvents(this, "change");
    c.redraw()
};
Canvas.prototype.clearSelection = function () {
    if (this._selected.size()) {
        this._selected.clear();
        Event.trigger(this, "unselect")
    }
};
Canvas.prototype.onMouseDown = function (b) {
    this.fakeInput.focus();
    var c = Event.getSource(b);
    while (c && (c != this._node)) {
        if (c._data && !c._data.unselectable) {
            var a = c._data;
            if (!this.locked && Canvas.isSelectionModifier(b)) {
                if (this._selected.contains(a)) {
                    this.unselect(a)
                } else {
                    this.select(a)
                }
            } else {
                if (!this._selected.contains(a)) {
                    this.clearSelection();
                    this.select(a)
                }
            }
            this._selected.onMouseDown(b);
            break
        }
        if (c.nodeName == "A") {
            return true
        }
        c = c.parentNode
    }
    if (!c || c == this._node) {
        if (!Canvas.isSelectionModifier(b)) {
            this.clearSelection()
        }
        if (!this.locked && this._items.length > 0) {
            this.multiSelect.beginMultiSelect(b, this._items, this._selected)
        }
    }
    return Event.stop(b)
};
Canvas.isSelectionModifier = Browser.isMac ?
function (a) {
    if (a.type == "keyup") {
        return a.keyCode == 224 || a.keyCode == 91 || a.keyCode == 93
    } else {
        return a.metaKey
    }
} : function (a) {
    if (a.type == "keyup") {
        return a.keyCode == 17 || a.keyCode == 16
    } else {
        return a.ctrlKey || a.shiftKey
    }
};
Canvas.prototype.onKeyDown = function (d) {
    if (!this._selected.size()) {
        return
    }
    if (Canvas.isSelectionModifier(d)) {
        this._selected.hide();
        this._selectionModifier = true
    }
    var b, a, c;
    switch (d.keyCode) {
    case 8:
    case 46:
        this.removeSelected();
        c = true;
        break;
    case 37:
        b = -1;
        a = 0;
        break;
    case 38:
        b = 0;
        a = -1;
        break;
    case 39:
        b = 1;
        a = 0;
        break;
    case 40:
        b = 0;
        a = 1;
        break
    }
    if (d.shiftKey) {
        b *= 10;
        a *= 10
    }
    if (b || a) {
        this._selected.beginMove();
        this._selected.move(b, a);
        this._selected.endMove();
        c = true
    }
    if (c) {
        return Event.stop(d)
    }
};
Canvas.prototype.onKeyUp = function (a) {
    if (!this.locked && Canvas.isSelectionModifier(a)) {
        this._selected.show();
        this._selectionModifier = false
    }
};
Canvas.prototype.freeze = function () {
    var b = [];
    this._items.forEach(function (c) {
        b.push(c.freeze())
    });
    var a = this.getView();
    if (!a || !a.zoom || !a.origin) {
        /*Beacon.log("err", {
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "freeze",
            v: JSON2.stringify(a),
            s: stack()
        }, 1)*/
    }
    return {
        items: b,
        view: this.getView()
    }
};
Canvas.prototype.thaw = function (c) {
    var b = c.items;
    var a = false;
    b.forEach(function (d) {
        if (a) {
            return
        }
        try {
            this.addItem(Item.thaw(d))
        } catch (f) {
            if (f.name == "pv_notsupported") {
                Feedback.message([loc("Sorry!") + " " + loc("One or more items cannot be displayed."), f.message].join("<br>"));
                a = true
            } else {
                throw f
            }
        }
    }, this);
    if (a) {
        this.clear()
    }
    if (c.view) {
        this._view = cloneObject(c.view, true)
    } else {
        this._view = {
            origin: new Point(0, 0),
            zoom: 1
        }
    }
};
Canvas.prototype.raiseItems = function (c, h) {
    var g, j;
    if (c.length == 1 && !h) {
        j = c[0];
        g = this._items.find(j);
        if (g + 1 < this._items.length) {
            this._items.swap(g, g + 1);
            j.setZIndex(g + 2);
            this._items[g].setZIndex(g + 1);
            Event.trigger(this, "change")
        }
        return
    } else {
        var f = false;
        var k = [];
        k.length = this._items.length;
        c.sort(zSort);
        var a = this._items.length - 1;
        var b = {};
        c.forEachReverse(function (n) {
            var m = n.z - 1;
            var l = h ? a : Math.min(m + 1, a);
            f = f || (l != m);
            k[l] = n;
            b[m] = l;
            a = l - 1
        });
        if (!f) {
            return
        }
        var d = this._items.length - 1;
        for (g = this._items.length - 1; g >= 0; --g) {
            j = this._items[g];
            if (b[g] !== undefined) {
                d = b[g]
            } else {
                while (k[d]) {
                    --d
                }
            }
            j.setZIndex(d + 1);
            k[d] = j;
            --d
        }
        this._items = k;
        Event.trigger(this, "change")
    }
};
Canvas.prototype.lowerItems = function (d, b) {
    var h, j;
    if (d.length == 1 && !b) {
        j = d[0];
        h = this._items.find(j);
        if (h > 0) {
            this._items.swap(h, h - 1);
            j.setZIndex(h);
            this._items[h].setZIndex(h + 1);
            Event.trigger(this, "change")
        }
        return
    } else {
        var g = false;
        var k = [];
        k.length = this._items.length;
        d.sort(zSort);
        var a = 0;
        var c = {};
        d.forEach(function (n) {
            var m = n.z - 1;
            var l = b ? a : Math.max(m - 1, a);
            g = g || (l != m);
            k[l] = n;
            c[m] = l;
            a = l + 1
        });
        if (!g) {
            return
        }
        var f = 0;
        for (h = 0; h < this._items.length; ++h) {
            j = this._items[h];
            if (c[h] !== undefined) {
                f = c[h]
            } else {
                while (k[f]) {
                    ++f
                }
            }
            j.setZIndex(f + 1);
            k[f] = j;
            ++f
        }
        this._items = k;
        Event.trigger(this, "change")
    }
};
Canvas.prototype.centerItem = function (a) {
    var b = this.getCanvasSize();
    a.move(-a.translation.x + b.w / 2, -a.translation.y + b.h / 2)
};
Canvas.prototype.addItem = function (b) {
    if (this.locked) {
        return
    }
    this._items.push(b);
    b.setZIndex(this._items.length);
    var a = b.getNode();
    makeUnselectable(a);
    this._node.appendChild(a);
    b.redraw();
    Event.addListener(b, "change", this.onItemChange, this);
    Event.addListener(b, "additem", this.onItemAddItem, this);
    Event.addListener(b, "removeitem", this.onItemRemoveItem, this);
    if (b instanceof TextItem) {
        Event.addListener(b, "change", function () {
            yield(this._selected.redraw, this._selected)
        }, this)
    }
    Event.trigger(this, "additem", [b]);
    Event.trigger(this, "change");
    if (this._items.length == 1) {
        removeClass(this._node, "empty");
        Event.trigger(this, "notempty")
    }
    if (Browser.isIE) {
        this._items.forEach(function (f) {
            if (!(f instanceof PlaceholderItem)) {
                return
            }
            if (!f._template_proxy) {
                var d = this._node.appendChild(createNode("div", {
                    className: "template_proxy"
                }));
                d._proxy_sizer = d.appendChild(createNode("div", {
                    className: "proxy_sizer"
                }));
                var c = f.getMatrix();
                if (c) {
                    c.apply(d, f)
                }
                f._template_proxy = d;
                d._data = f
            }
        }, this)
    }
    return true
};
Canvas.prototype.removeItem = function (a) {
    this._removeItem(a);
    Event.trigger(this, "removeitem", [a]);
    Event.trigger(this, "change")
};
Canvas.prototype._removeItem = function (a) {
    Event.removeListener(a, "change", this.onItemChange, this);
    Event.removeListener(a, "additem", this.onItemAddItem, this);
    Event.removeListener(a, "removeitem", this.onItemRemoveItem, this);
    this.unselect(a);
    this._items.remove(a);
    a.destruct();
    if (a._template_proxy) {
        domRemoveNode(a._template_proxy);
        a._template_proxy = null
    }
    if (this._items.length === 0) {
        addClass(this._node, "empty");
        Event.trigger(this, "empty")
    }
};
Canvas.prototype.getItems = function () {
    return this._items
};
Canvas.prototype.itemCount = function () {
    return this._items.length
};
Canvas.prototype.clear = function () {
    var a = [];
    while (this._items.length) {
        var b = this._items[0];
        this._removeItem(b);
        a.push(b)
    }
    if (a.length) {
        Event.trigger(this, "removeitem", a);
        Event.trigger(this, "change")
    }
};
Canvas.prototype.lock = function () {
    this._selected.hide();
    this.clearSelection();
    if (Browser.isIE) {
        var a = this._items.length + 2;
        this._items.forEach(function (f) {
            f.setSelectable(false);
            if (!f._template_proxy) {
                return
            }
            var d = f.getRect();
            var c = f._template_proxy;
            var b = f.getMatrix();
            if (b) {
                b.apply(c, f)
            }
            setNode(c, null, {
                zIndex: f.z + a,
                top: px(d.top()),
                left: px(d.left())
            });
            setNode(c._proxy_sizer, null, {
                width: px(d.width()),
                height: px(d.height())
            })
        }, this)
    } else {
        this._items.forEach(function (b) {
            b.setSelectable(false)
        })
    }
    this.locked = true;
    removeClass(this._node, "unlocked")
};
Canvas.prototype.unlock = function () {
    this._items.forEach(function (a) {
        a.setSelectable(true)
    });
    this._selected.show();
    this.clearSelection();
    this.locked = false;
    addClass(this._node, "unlocked")
};
Canvas.prototype.containsPlaceholder = function () {
    var a = this.getItems();
    for (var b = 0; b < a.length; ++b) {
        if (a[b] instanceof PlaceholderItem) {
            return true
        }
    }
    return false
};
Canvas.prototype.clearPlaceholders = function () {
    Event.bundleEvents(this, "change");
    this.getItems().forEach(function (a) {
        if (a.clearContent) {
            if (a.clearContent()) {
                this.unselect(a)
            }
        }
    }, this);
    Event.unbundleEvents(this, "change")
};
Canvas.prototype.onItemChange = function () {
    Event.trigger(this, "change")
};
Canvas.prototype.onItemAddItem = function (a) {
    this.clearSelection();
    if (a && a.placeholder) {
        this.select(a.placeholder)
    }
    Event.trigger(this, "additem", [a])
};
Canvas.prototype.onItemRemoveItem = function (a) {
    Event.trigger(this, "removeitem", [a])
};

function DataSource() {}
DataSource.prototype.destruct = noop;
DataSource.prototype.triggerChanges = function (a) {
    var d = false;
    var b;
    if (!a.length) {
        d = true
    } else {
        var c = Math.min(a.length, this.size());
        for (b = 0; b < c; b++) {
            if (!compare(a[b], this.get(b))) {
                d = true;
                break
            }
        }
        if (!d) {
            if (a.length < this.size()) {
                for (b = c; b < this.size(); b++) {
                    Event.trigger(this, "change", {
                        op: "add",
                        value: this.get(b),
                        pos: b
                    })
                }
            } else {
                for (b = c; b < a.length; b++) {
                    Event.trigger(this, "change", {
                        op: "del",
                        pos: c
                    })
                }
            }
        }
    }
    if (d) {
        Event.trigger(this, "change")
    }
};

function MemDataSource(a, b) {
    b = b || {};
    this.converter = b.converter ||
    function (c) {
        return c
    };
    this.setData(a);
    this.metadata = b.metadata || {};
    this.page = 1;
    this.morePages = false
}
extend(MemDataSource, DataSource);
MemDataSource.prototype.setData = function (a) {
    if (a) {
        this.items = a.map(this.converter)
    } else {
        this.items = []
    }
    Event.trigger(this, "change")
};
MemDataSource.prototype.appendData = function (a) {
    if (a) {
        this.items = this.items.concat(a.map(this.converter));
        Event.trigger(this, "change")
    }
};
MemDataSource.prototype.clear = function () {
    this.setData([])
};
MemDataSource.prototype.forEach = function (b, a) {
    this.items.forEach(b, a)
};
MemDataSource.prototype.forEachNonBlocking = function (a, c, b, d) {
    this.items.forEachNonBlocking(a, c, b, d)
};
MemDataSource.prototype.reload = function () {
    var a = cloneObject(this.metadata);
    a.result = a.result || {};
    a.result.items = this.items;
    Event.trigger(this, "load", a);
    Event.trigger(this, "loaded")
};
MemDataSource.prototype.ensureLoaded = function () {
    this.reload()
};
MemDataSource.prototype.size = function () {
    return this.items.length
};
MemDataSource.prototype.find = function (b, a) {
    return this.items.find(this.converter(b), a)
};
MemDataSource.prototype.contains = function (b, a) {
    return this.items.find(this.converter(b), a) >= 0
};
MemDataSource.prototype.unshift = function (a) {
    this.items.unshift(this.converter(a));
    Event.trigger(this, "change", {
        op: "add",
        pos: 0,
        value: a
    })
};
MemDataSource.prototype.remove = function (c, a) {
    var b = this.items.find(this.converter(c), a);
    if (b > -1) {
        var d = this.items.remove(c, a);
        if (d !== false) {
            Event.trigger(this, "change", {
                op: "del",
                pos: b,
                value: c
            })
        }
    }
};
MemDataSource.prototype.atFirstPage = function () {
    return true
};
MemDataSource.prototype.atLastPage = function () {
    return true
};
MemDataSource.prototype.append = function (a) {
    this.items.push(this.converter(a));
    return Event.trigger(this, "change", {
        op: "add",
        pos: this.items.length - 1,
        value: a
    })
};
MemDataSource.prototype.replace = function (b) {
    var a = this.items.find(b);
    if (a == -1) {
        return false
    }
    b = this.converter(b);
    this.items[a] = b;
    Event.trigger(this, "change", {
        op: "replace",
        pos: a,
        value: b
    });
    return true
};
MemDataSource.prototype.moveToEnd = function (b) {
    var a = this.items.find(b);
    if (a == -1 || a == this.items.length - 1) {
        return null
    }
    var c = this.items[a];
    this.items.splice(a, 1);
    this.items.push(c);
    return Event.trigger(this, "change", {
        op: "move",
        from: a,
        to: this.items.length - 1,
        value: c
    })
};
MemDataSource.prototype.moveBefore = function (c, f) {
    var d = this.converter(c);
    var b = this.items.find(d);
    var a = this.items.find(f);
    if (b == -1 || a == -1 || b == a - 1 || b == a) {
        return null
    }
    d = this.items[b];
    this.items.splice(b, 1);
    if (b < a) {
        --a
    }
    this.items.splice(a, 0, d);
    return Event.trigger(this, "change", {
        op: "move",
        from: b,
        to: a,
        value: d
    })
};
MemDataSource.prototype.insertBefore = function (b, d) {
    var a;
    if (d === null || (a = this.items.find(d)) == -1) {
        return this.append(b)
    }
    var c = this.converter(b);
    this.items.splice(a, 0, c);
    Event.trigger(this, "change", {
        op: "add",
        pos: a,
        value: c
    })
};
MemDataSource.prototype.prev = MemDataSource.prototype.next = MemDataSource.prototype.gotoPage = function () {};
MemDataSource.prototype.values = function () {
    return this.items
};
MemDataSource.prototype.get = function (a) {
    return this.items[a]
};
MemDataSource.prototype.getParams = function () {
    return null
};
MemDataSource.prototype.updateParams = function () {
    Event.trigger(this, "loaded")
};
MemDataSource.prototype.resetParams = function () {
    Event.trigger(this, "loaded")
};
MemDataSource.prototype.isDirty = function () {
    return false
};

function DomDataSource(a) {
    DomDataSource.superclass.constructor.call(this);
    this.dirty = true;
    this.metadata = {};
    this.data_element_id = a
}
extend(DomDataSource, MemDataSource);
DomDataSource.prototype._triggerError = function (a) {
    Event.trigger(this, "loaderror", new AjaxResult({
        message: [{
            type: "error",
            content: a
        }]
    }))
};
DomDataSource.prototype.ensureLoaded = function () {
    if (this.dirty) {
        this.reload();
        DomDataSource.superclass.ensureLoaded.call(this)
    } else {
        Event.trigger(this, "loaded")
    }
};
DomDataSource.prototype.reload = function () {
    var s = $_(this.data_element_id);
    if (!s) {
        this._triggerError("No data element with id: " + this.data_element_id);
        return
    }
    var g = s.getElementsByTagName("div");
    if (!g || g.length < 2) {
        this._triggerError("Malformed data element ");
        return
    }
    var n = g[0].getElementsByTagName("h2");
    if (n && n.length) {
        this.metadata.title = n[0].innerHTML
    }
    var r = g[1].getElementsByTagName("div");
    this.items = [];
    for (var f = 0; f < r.length; ++f) {
        var a = r[f];
        var k = a.getElementsByTagName("img");
        if (!k || !k.length || !k[0].src) {
            this._triggerError("malformed img node: " + a);
            continue
        }
        var m = k[0].getAttribute("xsrc");
        var q = m ? m : k[0].src;
        var p = k[0].height;
        var j = a.getElementsByTagName("a");
        if (!j || !j.length || !j[0].href) {
            this._triggerError("malformed a node: " + a);
            continue
        }
        var h = j[0].href;
        var b = parseUri(h).queryKey.id;
        var o = a.getElementsByTagName("span");
        var l = "";
        if (h.indexOf("/thing?") > 0) {
            if (!o || !o.length || o[0].childNodes.length < 1) {
                this._triggerError("malformed span node: " + a);
                continue
            }
            l = o[0].childNodes[0].innerHTML;
            this.items.push({
                type: "thing",
                id: b,
                imgurl: q,
                clickurl: h,
                imgh: p,
                imgw: p,
                itemtitle: l
            })
        } else {
            if (h.indexOf("/set?") > 0) {
                if (!o || !o.length || o[0].childNodes.length < 2 || !o[0].childNodes[1].href || !o[0].childNodes[1].innerHTML) {
                    this._triggerError("malformed span node: " + a);
                    continue
                }
                var c = o[0].childNodes[1].href;
                var d = o[0].childNodes[1].innerHTML;
                l = k[0].title || "";
                this.items.push({
                    type: "set",
                    id: b,
                    imgurl: q,
                    clickurl: h,
                    userurl: c,
                    user_name: d,
                    imgh: p,
                    imgw: p,
                    title: l
                })
            } else {
                this._triggerError("invalid item type for dom data source: " + h);
                continue
            }
        }
    }
    s.style.display = "none";
    this.dirty = false;
    Event.trigger(this, "change");
    Event.trigger(this, "loaded")
};
DomDataSource.prototype.isDirty = function () {
    return this.dirty
};

function AjaxDataSource(b, c, a) {
    a = a || {};
    this.converter = a.converter ||
    function (d) {
        return d
    };
    this.items = [];
    this.dirty = a.dirty === undefined ? true : a.dirty;
    this.loading = false;
    this.action = b;
    this.noclamp = a.noclamp;
    this.hideProgress = a.hideProgress;
    if (c && c instanceof Props) {
        this.params = c
    } else {
        this.params = new Props(cloneObject(c || {}, true))
    }
    Event.addListener(this.params, "change", this.reload, this);
    this.page = 1;
    this.morePages = false;
    this.contract = getUID(this);
    this.method = a.method || "GET";
    this.cacheResults = a.cacheResults
}
extend(AjaxDataSource, DataSource);
AjaxDataSource.prototype.destruct = function () {
    Ajax.abortContract(this.contract);
    CachedAjax.abortContract(this.contract);
    this.items = [];
    Event.release(this)
};
AjaxDataSource.prototype.clear = function () {
    this._clear();
    Event.trigger(this, "change")
};
AjaxDataSource.prototype._clear = function () {
    this.items = []
};
AjaxDataSource.prototype.forEach = function (b, a) {
    this.items.forEach(b, a)
};
AjaxDataSource.prototype.forEachNonBlocking = function (a, c, b, d) {
    this.items.forEachNonBlocking(a, c, b, d)
};
AjaxDataSource.prototype.find = function (b, a) {
    return this.items.find(b, a || compare)
};
AjaxDataSource.prototype.get = function (a) {
    return this.items[a]
};
AjaxDataSource.prototype.getParam = function (a) {
    return this.params.get(a)
};
AjaxDataSource.prototype.setParam = function (b, a) {
    this.params.set(b, a)
};
AjaxDataSource.prototype.updateParams = function (a) {
    return this.params.update(a)
};
AjaxDataSource.prototype.getAction = function () {
    return this.action
};
AjaxDataSource.prototype.setAction = function (b, c, a) {
    if (b != this.action || !this.params.equals(c)) {
        this.action = b;
        this.dirty = this.dirty || (a || {}).dirty;
        Event.pauseEvents(this.params, "change");
        c = c || {};
        c.page = 1;
        this.params.update(c);
        Event.unpauseEvents(this.params, "change");
        this.reload()
    }
};
AjaxDataSource.prototype.resetParams = function (a) {
    return this.params.reset(a)
};
AjaxDataSource.prototype.setParams = function (a) {
    this.params.update(a)
};
AjaxDataSource.prototype.getParams = function () {
    return this.params
};
AjaxDataSource.prototype.ensureLoaded = function () {
    if (this.dirty) {
        this.reload()
    } else {
        if (this.loading) {
            return
        } else {
            Event.trigger(this, "loaded")
        }
    }
};
AjaxDataSource.prototype.reload = function (d) {
    Event.trigger(this, "loading", d);
    var j = this.params.toArray();
    var b = cloneObject(this.items);
    if (d && d.length) {
        var a = true;
        forEachKey(d, function (k, l) {
            if (k != "length") {
                a = false
            }
        });
        if (a) {
            var h = this._start === undefined ? (this.page - 1) * this.getParam("length") : this._start;
            j._start = h;
            j._end = h + d.length.value
        }
    }
    var g = Event.wrapper(function (m) {
        Event.trigger(this, "load", m);
        if (m) {
            var l = m.result;
            this._clear();
            if (l) {
                var k = Number(l.current_page || l.page || 1);
                if (k < j.page && this.noclamp) {
                    this.morePages = false;
                    this.dirty = false
                } else {
                    this.page = k;
                    if (l.items && l.items.length) {
                        this.items = this.items.concat(l.items.map(this.converter))
                    }
                    this.morePages = l.total_pages ? this.page < Number(l.total_pages) : Boolean(l.more_pages);
                    this.dirty = false
                }
                this._start = j._start === undefined ? (k - 1) * j.length : j._start
            }
            this.triggerChanges(b)
        }
        yield(function () {
            Event.trigger(this, "loaded")
        }, this)
    }, this);
    var c = Event.wrapper(function (k) {
        Event.trigger(this, "loaderror", k)
    }, this);
    var f = Event.wrapper(function () {
        this.loading = false
    }, this);
    if (this.isDirty() && this.cacheResults) {
        /*CachedAjax.clear({
            action: this.action,
            data: j
        })*/
    }
    this.loading = true;
    if (this.cacheResults) {
        /*CachedAjax.request({
            method: this.method,
            action: this.action,
            hideProgress: this.hideProgress,
            data: j,
            contract: this.contract,
            onSuccess: g,
            onError: c,
            onFinally: f,
            expires: this.cacheResults
        })*/
    } else {
        /*Ajax.request({
            method: this.method,
            action: this.action,
            hideProgress: this.hideProgress,
            data: j,
            contract: this.contract,
            onSuccess: g,
            onError: c,
            onFinally: f
        })*/
    }
};
AjaxDataSource.prototype.atFirstPage = function () {
    return this.page == 1
};
AjaxDataSource.prototype.atLastPage = function () {
    return (!this.morePages)
};
AjaxDataSource.prototype.size = function () {
    return this.items.length
};
AjaxDataSource.prototype.onDirty = function () {
    this.dirty = true;
    Event.trigger(this, "dirty")
};
AjaxDataSource.prototype.contains = function (b, a) {
    return this.items.find(this.converter(b), a || compare) >= 0
};
AjaxDataSource.prototype.append = function (a) {
    return this.items.push(this.converter(a))
};
AjaxDataSource.prototype.prepend = function (a) {
    return this.items.unshift(this.converter(a))
};
AjaxDataSource.prototype.replace = function (b) {
    var a = this.items.find(b);
    if (a == -1) {
        return false
    }
    b = this.converter(b);
    this.items[a] = b;
    return true
};
AjaxDataSource.prototype.unshift = function (a) {
    return this.items.unshift(this.converter(a))
};
AjaxDataSource.prototype.remove = function (a) {
    this.items.remove(this.converter(a))
};
AjaxDataSource.prototype.prev = function () {
    return this.gotoPage(this.page - 1)
};
AjaxDataSource.prototype.next = function () {
    return this.gotoPage(this.page + 1)
};
AjaxDataSource.prototype.gotoPage = function (a) {
    if (!(a = Number(a)) || !(a = Math.floor(a)) || a <= 0 || (this.atLastPage() && a > this.page) || this.page == a) {
        return false
    }
    this.morePages = false;
    this.page = a;
    this.params.set("page", a);
    return true
};
AjaxDataSource.prototype.values = function () {
    return this.items
};
AjaxDataSource.prototype.isDirty = function () {
    return this.dirty
};

function ClusterDataSource(a, b) {
    ClusterDataSource.superclass.constructor.call(this, []);
    this.datasource = a;
    Event.addListener(a, "loaded", function () {
        this._computeClusters();
        Event.trigger(this, "loaded")
    }, this);
    Event.addListener(a, "change", this.onChange, this);
    this.setClusterSize(b)
}
extend(ClusterDataSource, MemDataSource);
ClusterDataSource.prototype.setClusterSize = function (a) {
    if (this.clusterSize && this.clusterSize == a) {
        return
    }
    this.clusterSize = a;
    this._computeClusters()
};
ClusterDataSource.prototype.getClusterSize = function () {
    return this.clusterSize
};
ClusterDataSource.prototype.onChange = function (a) {
    this._computeClusters()
};
ClusterDataSource.prototype.ensureLoaded = function () {
    this.datasource.ensureLoaded()
};
ClusterDataSource.prototype._computeClusters = function () {
    var b = this.datasource.values();
    var d = [];
    if (b && b.length > 0) {
        var a = [];
        d.push(a);
        for (var c = 0; c < b.length; ++c) {
            if (a.length == this.clusterSize) {
                a = [];
                d.push(a)
            }
            a.push(b[c])
        }
    }
    this.setData(d)
};

function CachedAjaxData(a) {
    this._pageSize = 50;
    this._timeOut = a || 600;
    this.reset()
}
CachedAjaxData.prototype.reset = function () {
    this._pages = {};
    this._cachedEntry = null;
    this._filters = {};
    this._timerId = null;
    delete this._totalResults
};
CachedAjaxData.prototype.contains = function (f) {
    if (this._cachedEntry) {
        return true
    }
    if (f._start === 0 && f._end === 0) {
        return (this._totalResults !== undefined && this._totalResults > 0)
    }
    var g = f._start || (f.page - 1) * f.length;
    var a = f._end || f.page * f.length;
    if (this._totalResults !== undefined) {
        a = Math.min(a, this._totalResults)
    }
    for (var c = g; c < a; c++) {
        var d = Math.floor(c / this._pageSize);
        var b = c % this._pageSize;
        if (!this._pages[d] || !this._pages[d][b]) {
            return false
        }
    }
    return true
};
CachedAjaxData.prototype.get = function (g) {
    var h = g._start || (g.page - 1) * g.length;
    var a = g._end || g.page * g.length;
    if (this._cachedEntry) {
        return this._cachedEntry
    }
    if (g._start === 0 && g._end === 0) {
        h = 0;
        a = this._totalResults || 0
    }
    if (this._totalResults !== undefined && h >= this._totalResults) {
        h = (Math.ceil(this._totalResults / g.length) - 1) * g.length;
        a = h + g.length
    }
    var d = [];
    for (var c = h; c < a; c++) {
        var f = Math.floor(c / this._pageSize);
        var b = c % this._pageSize;
        if (this._pages[f] && this._pages[f][b]) {
            d.push(this._pages[f][b])
        }
    }
    if (this._timeOut) {
        if (this._timerId) {
            clearTimeout(this._timerId)
        }
        this._timerId = setTimeout(Event.wrapper(function () {
            this.reset()
        }, this), this._timeOut * 1000)
    }
    return {
        page: g.page,
        items: d,
        more_pages: this.hasMorePages(g),
        filters: this._filters,
        current_page: this.getCurrentPage(g),
        total_pages: this.getTotalPages(g)
    }
};
CachedAjaxData.prototype.getTotalPages = function (a) {
    if (this._totalResults !== undefined) {
        return Math.ceil(this._totalResults / a.length)
    }
    return null
};
CachedAjaxData.prototype.getCurrentPage = function (a) {
    if (this._totalResults !== undefined && this._totalResults < a.page * a.length) {
        return this.getTotalPages(a)
    }
    return a.page
};
CachedAjaxData.prototype.hasMorePages = function (a) {
    if (this._totalResults !== undefined) {
        return (this._totalResults > a.page * a.length)
    }
    return true
};
CachedAjaxData.prototype.set = function (j, b) {
    if (b.items === undefined) {
        this._cachedEntry = b;
        return
    }
    var c = b.items;
    var g = b.current_page || b.page || j.page;
    if (!j.length) {
        j.length = c.length
    }
    var d = j.length * (g - 1);
    if ((b.total_pages && b.current_page == b.total_pages) || (b.more_pages !== undefined && !b.more_pages)) {
        this._totalResults = (g - 1) * j.length + c.length
    }
    for (var f = 0; f < c.length; f++) {
        var h = Math.floor((d + f) / this._pageSize);
        var a = (d + f) % this._pageSize;
        if (!this._pages[h]) {
            this._pages[h] = [];
            this._pages[h].length = this._pageSize
        }
        this._pages[h][a] = cloneObject(c[f], true)
    }
    if (b.filters) {
        this._filters = b.filters
    }
};
var CachedAjax = function () {
        var b = new Hash();
        var a = {};

        function d(g) {
            var f = ["action=" + encodeURIComponent(g.action)];
            forEachKey(g.data, function (h, j) {
                if (h != "reqSize" && h != "page" && h != "length" && h.indexOf("_") !== 0) {
                    f.push(h + "=" + encodeURIComponent(j))
                }
            });
            f.sort();
            return JSON2.stringify(f)
        }
        function c(k) {
            var l = k._start;
            var g = k._end;
            var j = [];
            j.hasPending = function () {
                for (var m = 0; m < this.length; ++m) {
                    if (this[m].pending) {
                        return true
                    }
                }
                return false
            };
            if (l === 0 && g === 0) {
                j.push({
                    _start: 0,
                    _end: 0,
                    pending: true
                });
                return j
            }
            var f = k.reqSize;
            l = Math.floor(l / f) * f;
            g = Math.ceil(g / f) * f;
            for (var h = l / f; h < g / f; h++) {
                j.push({
                    page: h + 1,
                    length: f,
                    pending: true
                })
            }
            return j
        }
        return {
            getCachedPage: function (f) {
                return b.get(d(f))
            },
            clearAll: function () {
                b.clear()
            },
            clear: function (g) {
                var f = d(g);
                b.remove(f)
            },
            abortContract: function (f) {
                var g = f && a[f];
                if (g) {
                    g.forEach(Ajax.abort);
                    delete a[f];
                    return true
                }
                return false
            },
            get: function (f) {
                f.method = "GET";
                return CachedAjax.request(f)
            },
            request: function (l) {
                l = cloneObject(l || {}, true);
                if (!l.data.page) {
                    l.data.page = 1
                }
                l.data.reqSize = l.data.reqSize || 50;
                var j = l.contract;
                CachedAjax.abortContract(j);
                if (l.data._start === undefined || l.data._end === undefined) {
                    if (l.data.length) {
                        l.data._start = (l.data.page - 1) * l.data.length;
                        l.data._end = l.data._start + l.data.length
                    } else {
                        l.data._start = 0;
                        l.data._end = 0
                    }
                }
                var h = d(l);
                var f = b.get(h);
                if (!f) {
                    f = new CachedAjaxData(l.expires);
                    b.put(h, f)
                }
                var k = l.onSuccess || noop;
                if (f.contains(l.data)) {
                    k({
                        result: f.get(l.data)
                    });
                    if (l.onFinally) {
                        l.onFinally()
                    }
                } else {
                    var m = c(l.data);
                    var g;
                    if (j) {
                        g = a[j] = []
                    }
                    m.forEach(function (n) {
                        if (f.contains(n)) {
                            n.pending = false;
                            return
                        }
                        var p = cloneObject(l.data, true);
                        p.page = n.page;
                        p.length = n.length;
                        delete p.reqSize;
                        delete p._start;
                        delete p._end;
                        /*var o = Ajax.request({
                            method: l.method || "GET",
                            action: l.action,
                            hideProgress: l.hideProgress,
                            data: p,
                            onSuccess: function (q) {
                                n.pending = false;
                                f.set(p, q.result);
                                if (!m.hasPending()) {
                                    k({
                                        result: f.get(l.data)
                                    });
                                    if (l.onFinally) {
                                        l.onFinally()
                                    }
                                    if (j && a[j] == g) {
                                        delete a[j]
                                    }
                                }
                            },
                            onError: function () {
                                if (l.onError) {
                                    l.onError.apply(null, arguments)
                                }
                                if (l.onFinally && !m.hasPending()) {
                                    l.onFinally()
                                }
                            }
                        });
                        if (g) {
                            g.push(o)
                        }*/
                    })
                }
            }
        }
    }();

function BaseFilter(d, c, b, a) {
    this.source = d;
    this.name = c;
    this.value = a;
    this.defaultValue = b;
    this.enabled = true;
    this.changedOn = 0
}
BaseFilter.prototype.set = function (a) {
    if (a == this.value) {
        return false
    }
    this.changedOn = new Date().getTime();
    this.value = a;
    var b = {
        page: 1
    };
    b[this.name] = a;
    this.source.updateParams(b);
    Event.trigger(this, "change", this);
    return true
};
BaseFilter.prototype.isDefaultValue = function () {
    return this.value == this.defaultValue
};
BaseFilter.prototype.clear = function () {
    this.set(this.defaultValue)
};
BaseFilter.createFakeDS = function (c, b, d) {
    var a = {
        result: {
            filters: {}
        }
    };
    a.result.filters[c] = {
        items: b
    };
    var f = {
        values: function () {
            return b
        },
        updateParams: function (g) {
            if (d) {
                d.updateParams(g)
            }
            Event.trigger(f, "load", a)
        }
    };
    if (d) {
        Event.addSingleUseListener(d, "load", function () {
            Event.trigger(f, "load", a)
        });
        Event.addListener(d, "loaded", function () {
            if (d.size()) {
                a.result.filters[c] = {
                    items: b
                }
            } else {
                a.result.filters[c] = null
            }
            Event.trigger(f, "load", a)
        })
    }
    yield(function () {
        Event.trigger(f, "load", a)
    });
    return f
};

function SelectFilter(f, d, b, a, c) {
    c = c || {};
    SelectFilter.superclass.constructor.call(this, f, d, b, a);
    Event.addListener(f, "load", this.onSourceLoad, this);
    this.requiresClear = c.requiresClear;
    this.sorter = c.defaultSort;
    this.defaultItem = {
        label: c.defaultLabel,
        idx: -1,
        value: c.defaultValue
    };
    this.selectedIdx = -1;
    this.options = [];
    this.enabled = false;
    if (c.options) {
        this.update({
            items: c.options
        })
    }
}
extend(SelectFilter, BaseFilter);
SelectFilter.prototype.clear = function () {
    this.select(-1)
};
SelectFilter.prototype.sort = function (c) {
    this.sorter = c;
    c.call(this, this.options);
    var a = 0;
    var b = false;
    this.options.forEach(function (d) {
        if (!b && this.selectedIdx == d.idx) {
            b = true;
            this.selectedIdx = a
        }
        d.idx = a;
        a++
    }, this);
    this.triggerUpdate()
};
SelectFilter.prototype.onSourceLoad = function (a) {
    var c = a.result.filters;
    var b;
    if (c && c.hasOwnProperty(this.name)) {
        b = c[this.name]
    }
    if (b) {
        this.update(b)
    } else {
        Event.trigger(this, "nodata")
    }
};
SelectFilter.prototype.update = function (c) {
    var b = [];
    var a = 0;
    if (this.selectedIdx != -1) {
        this.selectedIdx = c.items.length
    }
    if (this.sorter) {
        this.sorter.call(this, c.items)
    }
    if (c.items) {
        c.items.forEach(function (d) {
            if (d.value == this.value) {
                this.selectedIdx = a
            }
            d.idx = a;
            d.selected = (d.value == this.value);
            b.push(d);
            a++
        }, this)
    }
    this.options = b;
    this.enabled = true;
    this.triggerUpdate()
};
SelectFilter.prototype.triggerUpdate = function () {
    if (this.selectedIdx != -1 && this.requiresClear) {
        Event.trigger(this, "update", true)
    } else {
        Event.trigger(this, "update", false)
    }
};
SelectFilter.prototype.size = function () {
    return this.options.length
};
SelectFilter.prototype.get = function (a) {
    if (a == -1) {
        return this.defaultItem
    }
    return this.options[a]
};
SelectFilter.prototype.select = function (a) {
    this.selectedIdx = a;
    var b = this.selected();
    if (b) {
        this.set(b.value)
    }
};
SelectFilter.prototype.selectByValue = function (c, b) {
    b = b ||
    function (f, d) {
        return (f == d)
    };
    for (var a = 0; a < this.size(); ++a) {
        if (b(c, this.get(a).value)) {
            this.select(a);
            return true
        }
    }
    return false
};
SelectFilter.prototype.selected = function () {
    return this.get(this.selectedIdx)
};
SelectFilter.prototype.getIndex = function (c) {
    var a = this.options.length;
    for (var b = 0; b < a; b++) {
        if (this.options[b].value == c) {
            return b
        }
    }
    return -1
};

function Handle(a, b, c) {
    this.owner = a;
    this.location = b;
    this.type = c;
    var d = ["handle", b];
    if (c) {
        d.push(c)
    }
    this._node = createNode("div", {
        className: d.join(" ")
    });
    switch (b) {
    case "n":
        this.dirx = 0;
        this.diry = -1;
        break;
    case "s":
        this.dirx = 0;
        this.diry = 1;
        break;
    case "w":
        this.dirx = -1;
        this.diry = 0;
        break;
    case "e":
        this.dirx = 1;
        this.diry = 0;
        break;
    case "nw":
        this.dirx = -1;
        this.diry = -1;
        break;
    case "ne":
        this.dirx = 1;
        this.diry = -1;
        break;
    case "sw":
        this.dirx = -1;
        this.diry = 1;
        break;
    case "se":
        this.dirx = 1;
        this.diry = 1;
        break
    }
    Event.addListener(this._node, "mousedown", this.onMouseDown, this);
    this.setCursorLocation(b)
}
Handle.prototype.setCursorLocation = noop;
Handle.prototype.getNode = function () {
    return this._node
};
Handle.prototype.onMouseDown = function (a) {
    Event.addListener(document, "mouseup", this.onMouseUp, this);
    Event.addListener(document, "mousemove", this.onMouseMove, this);
    removeClass(this.owner._node.parentNode, "unlocked");
    document.body.style.cursor = this.cursor;
    this._previousFillingCursor = this.owner._filling.style.cursor;
    this.owner._filling.style.cursor = this.cursor;
    Event.trigger(this, "beginmove", a, this);
    return Event.stop(a)
};
Handle.prototype.onMouseMove = function (a) {
    Event.trigger(this, "move", a, this);
    Event.stopBubble(a);
    return false
};
Handle.prototype.onMouseUp = function (a) {
    addClass(this.owner._node.parentNode, "unlocked");
    Event.removeListener(document, "mouseup", this.onMouseUp, this);
    Event.removeListener(document, "mousemove", this.onMouseMove, this);
    document.body.style.cursor = "default";
    this.owner._filling.style.cursor = this._previousFillingCursor;
    Event.trigger(this, "endmove");
    return Event.stop(a)
};

function ResizeHandle(a, b) {
    ResizeHandle.superclass.constructor.call(this, a, b, "resize")
}
extend(ResizeHandle, Handle);
ResizeHandle.prototype.setCursorLocation = function (a) {
    this.cursor = a + "-resize";
    setNode(this._node, null, {
        cursor: this.cursor
    })
};

function RotateHandle(a, b) {
    RotateHandle.superclass.constructor.call(this, a, b, "rotate");
    var d = "crosshair";
    var c = Browser.isIE ? "" : " 13 4";
    this.cursor = ['url("', buildRsrcURL("rotate_arrow.cur"), '")', c, ",", d].join("");
    this._node.appendChild(createNode("div", {
        className: "rotatetip"
    }));
    setNode(this._node, null, {
        cursor: this.cursor
    })
}
extend(RotateHandle, Handle);

function SelectedItems(a) {
    this._items = new Set();
    this._visible = true;
    this._dragStart = new Point(0, 0, 0);
    console.log(a);
    var b = (this._node = a.appendChild(createNode("div", {
        className: "handles"
    })));
    if (Matrix.create().constructor == FiltersMatrix) {
        b = (this.selectNode = b.appendChild(createNode("div", {
            className: "handles_border"
        })))
    } else {
        this.selectNode = b;
        addClass(b, "handles_border")
    }
    this._canvasXY = nodeXY(a);
    this.handles = ["n", "s", "nw", "ne", "se", "sw", "w", "e"].map(function (c) {
        var d = new ResizeHandle(this, c);
        b.appendChild(d.getNode());
        Event.addListener(d, "beginmove", this.beginResize, this);
        Event.addListener(d, "move", this.resize, this);
        Event.addListener(d, "endmove", this.endResize, this);
        return d
    }, this);
    this.handles = this.handles.concat(["n"].map(function (c) {
        var d = new RotateHandle(this, c);
        b.appendChild(d.getNode());
        Event.addListener(d, "beginmove", this.beginRotate, this);
        Event.addListener(d, "move", this.rotate, this);
        Event.addListener(d, "endmove", this.endRotate, this);
        return d
    }, this));
    this.enabledHandles = {};
    this._filling = b.appendChild(createNode("div", {
        className: "filling"
    }));
    Event.addListener(this._filling, "mousedown", this.onMouseDown, this);
    this._matrix = Matrix.create();
    this._center = null
}
SelectedItems.rotationSnap = Math.PI / 4;
SelectedItems.WB_DUMMY = createNode("div");
SelectedItems.prototype.event2canvasXY = function (a) {
    var b = Event.getPageXY(a);
    b.x -= this._canvasXY.x;
    b.y -= this._canvasXY.y;
    return b
};
SelectedItems.prototype.beginResize = function (c, f) {
    Event.trigger(this, "beginresize");
    UI.whiteblock(SelectedItems.WB_DUMMY);
    var b = this.getRect();
    var a = b.center();
    this._center = a;
    this.resizeAnchorWorld = b.getLocationXY(Rect.oppositeLocation(f.location));
    this.resizeAnchor = {
        x: this.resizeAnchorWorld.x - a.x,
        y: this.resizeAnchorWorld.y - a.y
    };
    this.resizeAnchorWorld = this._matrix.transform(this.resizeAnchorWorld.x, this.resizeAnchorWorld.y, a);
    var d = this.event2canvasXY(c);
    d = this._matrix.inverse().transform(d.x - a.x, d.y - a.y);
    this.startDist = {
        x: d.x - this.resizeAnchor.x,
        y: d.y - this.resizeAnchor.y
    };
    this._items.forEach(function (g) {
        g.beginResize()
    })
};
SelectedItems.prototype.resize = function (d, g) {
    var f = this.event2canvasXY(d);
    f = this._matrix.inverse().transform(f.x - this._center.x, f.y - this._center.y);
    var h = {
        x: (f.x - this.resizeAnchor.x) / (this.startDist.x || 0.001),
        y: (f.y - this.resizeAnchor.y) / (this.startDist.y || 0.001)
    };
    var a = {
        x: h.x,
        y: h.y
    };
    if (g.dirx === 0) {
        a.x = 1;
        h.x = Math.abs(h.x)
    } else {
        if (g.diry === 0) {
            a.y = 1;
            h.y = Math.abs(h.y)
        }
    }
    var b = undefined;
    if (this._items.size() >= 2) {
        b = true
    }
    if (this._items.values().some(function (j) {
        return !j.canScale(a)
    })) {
        return
    }
    var c = this.resizeAnchorWorld;
    this._items.forEach(function (j) {
        j.scale(h, c, g, b)
    });
    this.redraw()
};
SelectedItems.prototype.endResize = function () {
    this._items.forEach(function (a) {
        a.endResize()
    });
    UI.hideWhiteblock();
    Event.trigger(this, "endresize")
};
SelectedItems.prototype.beginRotate = function (b, c) {
    Event.trigger(this, "beginrotate");
    UI.whiteblock(SelectedItems.WB_DUMMY);
    var a = this.getRect();
    this._center = a.center();
    var d = a.getLocationXY(c.location);
    d = this._matrix.transform(d.x, d.y, this._center);
    this._previousAngle = ratio2angle(d.x - this._center.x, -d.y + this._center.y) || 0;
    this._items.forEach(function (f) {
        f.beginRotate()
    })
};
SelectedItems.prototype.rotate = function (b) {
    var d = this.event2canvasXY(b);
    var c = ratio2angle(d.x - this._center.x, -d.y + this._center.y);
    if (b.shiftKey) {
        c = round(c, SelectedItems.rotationSnap)
    }
    var a = c - this._previousAngle;
    this._previousAngle = c;
    this._items.forEach(function (f) {
        f.rotate(a, this._center)
    }, this);
    this._matrix.rotate(a);
    this.redraw()
};
SelectedItems.prototype.endRotate = function () {
    this._previousAngle = null;
    this._items.forEach(function (a) {
        a.endRotate()
    });
    UI.hideWhiteblock();
    Event.trigger(this, "endrotate")
};
SelectedItems.prototype.beginMove = function (a) {
    Event.trigger(this, "beginmove");
    UI.whiteblock(SelectedItems.WB_DUMMY);
    this._items.forEach(function (b) {
        b.beginMove(a)
    });
    this.moving = true
};
SelectedItems.prototype.move = function (c, b, a) {
    this._items.forEach(function (f) {
        f.move(c, b, a)
    });
    var d = this.getRect();
    this._node.style.top = d.top() + "px";
    this._node.style.left = d.left() + "px"
};
SelectedItems.prototype.endMove = function () {
    this.moving = false;
    this._items.forEach(function (a) {
        a.endMove()
    });
    UI.hideWhiteblock();
    Event.trigger(this, "endmove")
};
SelectedItems.prototype.onMouseDown = function (a) {
    this._dragStart = Event.getPageXY(a, this._dragStart);
    this.beginMove(a);
    Event.addListener(document, "mouseup", this.onMouseUp, this);
    Event.addListener(document, "mousemove", this.onMouseMove, this);
    return Event.stop(a)
};
SelectedItems.prototype.onMouseUp = function (a) {
    Event.removeListener(document, "mousemove", this.onMouseMove, this);
    Event.removeListener(document, "mouseup", this.onMouseUp, this);
    this.endMove();
    return Event.stop(a)
};
SelectedItems.prototype.onMouseMove = function (b) {
    var a = Event.getPageXY(b);
    this.move(a.x - this._dragStart.x, a.y - this._dragStart.y, true)
};
SelectedItems.prototype.contains = function (a) {
    return this._items.contains(a)
};
SelectedItems.prototype.values = function () {
    return this._items.values()
};
SelectedItems.prototype.add = function (a) {
    this._items.put(a);
    if (this.size() == 1) {
        this.enableHandles({
            resize: a.getResizeHandles(),
            rotate: a.getRotateHandles()
        })
    } else {
        this.enableHandles({
            resize: ["nw", "ne", "se", "sw"],
            rotate: (Browser.type("IE", null, 8) || !bucketIs("launch", "on")) ? [] : a.getRotateHandles()
        })
    }
    a.select();
    Event.addListener(a, "resized", this.redraw, this);
    Event.addListener(a, "flipped", this.redraw, this);
    Event.addListener(a, "flopped", this.redraw, this)
};
SelectedItems.prototype.enableHandles = function (a) {
    this.enabledHandles = a;
    this.updateHandlesAndCursor()
};
SelectedItems.prototype.getRect = function () {
    if (this.size() == 1) {
        var f = this.getFirstItem();
        this._matrix = f.getMatrix().clone();
        return f.getRect()
    } else {
        if (Browser.type("IE", null, 8) || !bucketIs("launch", "on")) {
            this._matrix = Matrix.create();
            var d = null;
            this._items.forEach(function (h) {
                if (d) {
                    d.expand(h.getBounds())
                } else {
                    d = h.getBounds()
                }
            });
            return d
        } else {
            var b = this._matrix.inverse();
            var g = [];
            this._items.forEach(function (h) {
                var j = new Polygon(h.getRect());
                j.transform(h.getMatrix()).transform(b, Point.origin);
                g = g.concat(j.pts)
            });
            var a = new Polygon(g).center();
            a = this._matrix.transform(a.x, a.y, Point.origin);
            var c = null;
            this._items.forEach(function (h) {
                var j = new Polygon(h.getRect());
                j.transform(h.getMatrix()).transform(b, a);
                if (c) {
                    c.expand(j.bounds())
                } else {
                    c = j.bounds()
                }
            });
            return c
        }
    }
};
SelectedItems.prototype.redraw = function () {
    if (this._visible && this._items.size() > 0) {
        var c = this.getRect();
        var b = c.width();
        var a = c.height();
        if (Browser.isIE) {
            b = Math.ceil(b);
            a = Math.ceil(a)
        }
        b = px(b);
        a = px(a);
        if (this.selectNode != this._node) {
            this.selectNode.style.width = b;
            this.selectNode.style.height = a
        }
        this._filling.style.width = this._node.style.width = b;
        this._filling.style.height = this._node.style.height = a;
        this._node.style.top = c.top() + "px";
        this._node.style.left = c.left() + "px";
        if (this._matrix.isIdentity()) {
            Matrix.clear(this._node, {
                border: 1,
                margin: 50
            })
        } else {
            this._matrix.apply(this._node, this.getFirstItem(), {
                border: 1,
                margin: 50
            })
        }
        this.updateHandlesAndCursor();
        show(this._node)
    } else {
        hide(this._node)
    }
};
SelectedItems.prototype.remove = function (a) {
    this._remove(a);
    this.redraw()
};
SelectedItems.prototype._remove = function (a) {
    this._items.remove(a);
    Event.removeListener(a, "resized", this.redraw, this);
    Event.removeListener(a, "flipped", this.redraw, this);
    Event.removeListener(a, "flopped", this.redraw, this);
    a.unselect()
};
SelectedItems.prototype.clear = function (a) {
    a = a || {};
    this._items.values().forEach(this._remove, this);
    if (!a.keepMatrix) {
        this._matrix = Matrix.create()
    }
    this.redraw()
};
SelectedItems.prototype.show = function () {
    this._visible = true;
    this.redraw()
};
SelectedItems.prototype.hide = function () {
    this._visible = false;
    this.redraw()
};
SelectedItems.prototype.size = function () {
    return this._items.size()
};
SelectedItems.prototype.getFirstItem = function () {
    if (this.size() > 0) {
        var a = this._items.values();
        return a[0]
    } else {
        return null
    }
};
SelectedItems.prototype.forEach = function (b, a) {
    this._items.forEach(b, a)
};
SelectedItems.prototype.getInfo = function () {
    return (this.size() == 1) ? this.getFirstItem().getInfo() : null
};
SelectedItems.prototype.getIcon = function () {
    switch (this.size()) {
    case 0:
        return null;
    case 1:
        return this.getFirstItem().getIcon();
    default:
        return createNode("span", {
            className: "num_items meta"
        }, null, loc("{num} items", {
            num: this.size()
        }))
    }
};
SelectedItems.prototype.getActions = function () {
    var a = this.size();
    var d = {};
    if (a === 0) {
        return null
    } else {
        if (a == 1) {
            var b = this.getFirstItem();
            forEachKey(b.getActions(), function (h, f) {
                var g = f.method;
                d[h] = g;
                g.disabled = f.disabled;
                g.selected = f.selected;
                g.icon = f.icon
            }, this);
            return d
        } else {
            var c = {};
            this.forEach(function (g) {
                var f = g.getActions();
                forEachKey(f, function (k, h) {
                    if (h.single) {
                        return
                    }
                    var j = h.method;
                    j.disabled = h.disabled;
                    j.selected = h.selected;
                    j.icon = h.icon;
                    c[k] = c[k] || [];
                    c[k].push(j)
                })
            });
            forEachKey(c, function (g, f) {
                if (f.length != a) {
                    return
                }
                d[g] = Event.wrapper(function () {
                    var h = this.getRect();
                    f.forEach(function (j) {
                        j.call(this, h)
                    }, this)
                }, this)
            }, this);
            return d
        }
    }
};
SelectedItems.prototype.isHandleEnabled = function (b) {
    if (!b) {
        return false
    }
    var a = this.enabledHandles || {};
    a = a[b.type];
    if (!a) {
        return false
    }
    return a.find(b.location) >= 0
};
SelectedItems.prototype.updateHandlesAndCursor = function () {
    if (this.queuedHandlesUpdate) {
        return
    }
    this.queuedHandlesUpdate = yield(function () {
        delete this.queuedHandlesUpdate;
        this._updateHandlesAndCursor()
    }, this)
};
SelectedItems.prototype._updateHandlesAndCursor = function () {
    this.handles.forEach(function (a) {
        var b = this._matrix.transform(a.dirx, a.diry);
        var c = ratio2angle(b.x, -b.y);
        a.setCursorLocation(SelectedItems.angle2location(c / (2 * Math.PI) * 360));
        if (this.isHandleEnabled(a)) {
            show(a.getNode())
        } else {
            hide(a.getNode())
        }
    }, this)
};

function NoopSelectedItems() {}
extend(NoopSelectedItems, SelectedItems);
NoopSelectedItems.prototype.redraw = noop;
SelectedItems.angle2location = function (a) {
    if (337.5 <= a || a < 22.5) {
        return "e"
    } else {
        if (22.5 <= a && a < 67.5) {
            return "ne"
        } else {
            if (67.5 <= a && a < 112.5) {
                return "n"
            } else {
                if (112.5 <= a && a < 157.5) {
                    return "nw"
                } else {
                    if (157.5 <= a && a < 202.5) {
                        return "w"
                    } else {
                        if (202.5 <= a && a < 247.5) {
                            return "sw"
                        } else {
                            if (247.5 <= a && a < 292.5) {
                                return "s"
                            } else {
                                if (292.5 <= a && a < 337.5) {
                                    return "se"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

function ratio2angle(a, d) {
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(d, 2));
    var b = Math.acos(a / c);
    if (a < 0) {
        if (d < 0) {
            b = 2 * Math.PI - b
        }
    } else {
        if (d < 0) {
            b = 2 * Math.PI - b
        }
    }
    return b
}
function MultiSelect(a) {
    this.node = a.appendChild(createNode("div", {
        className: "multiselect"
    }));
    this._canvasXY = nodeXY(a);
    this._items = new Set();
    if (!Browser.layoutEngine("WebKit", 525)) {
        this._updateSelection = Event.rateLimit(Event.wrapper(this._updateSelection, this), 25)
    }
}
MultiSelect.WB_DUMMY = createNode("div");
MultiSelect.cachedItemRects = {};
MultiSelect.prototype._updateSelection = function () {
    if (!this.start || !this.end) {
        return
    }
    var c = this._generateIntersectTest();
    for (var a = 0; a < this.allItems.length; ++a) {
        var b = this.allItems[a];
        if (this._items.contains(b)) {
            if (!c(b)) {
                if (this._items.remove(b) && (!this.startSelection || !this.startSelection.contains(b))) {
                    b.unselect()
                }
            }
        } else {
            if (c(b)) {
                this._items.put(b);
                b.select()
            }
        }
    }
};
MultiSelect.prototype.beginMultiSelect = function (b, a, c) {
    UI.whiteblock(SelectedItems.WB_DUMMY);
    this.start = this._event2canvasXY(b);
    this.startSelection = c;
    this.allItems = a;
    Event.addListener(document, "mousemove", this.onMouseMove, this);
    Event.addListener(document, "mouseup", this.onMouseUp, this)
};
MultiSelect.prototype.onMouseMove = function (b) {
    var a = Event.getPageXY(b);
    this.end = this._event2canvasXY(b);
    this.redraw();
    this._updateSelection()
};
MultiSelect.prototype.onMouseUp = function (a) {
    UI.hideWhiteblock();
    Event.removeListener(document, "mousemove", this.onMouseMove, this);
    Event.removeListener(document, "mouseup", this.onMouseUp, this);
    if (this._items.size()) {
        Event.trigger(this, "selected")
    }
    this.clear()
};
MultiSelect.prototype._event2canvasXY = function (a) {
    var b = Event.getPageXY(a);
    b.x -= this._canvasXY.x;
    b.y -= this._canvasXY.y;
    return b
};
MultiSelect.prototype.getRect = function () {
    if (!this.start || !this.end) {
        return null
    }
    return new Rect(Math.min(this.start.x, this.end.x), Math.min(this.start.y, this.end.y), Math.max(this.start.x, this.end.x), Math.max(this.start.y, this.end.y))
};
MultiSelect.prototype.redraw = function (a) {
    if (!this.start || !this.end) {
        hide(this.node);
        return
    }
    a = a || this.getRect();
    setNode(this.node, null, {
        visibility: "visible",
        display: "block",
        left: a.left() + "px",
        top: a.top() + "px",
        width: a.width() + "px",
        height: a.height() + "px"
    })
};
MultiSelect.prototype.clear = function () {
    this.start = this.end = null;
    this._items.clear();
    this.redraw()
};
MultiSelect.prototype.cancel = function () {
    this.forEach(function (a) {
        a.unselect()
    }, this);
    this.clear()
};
MultiSelect.prototype.forEach = function (b, a) {
    this._items.forEach(b, a)
};
MultiSelect.prototype._generateIntersectTest = function () {
    var a = this.getRect();
    if (!a) {
        return noop
    }
    a.tl = {
        x: a.left(),
        y: a.top()
    };
    a.br = {
        x: a.right(),
        y: a.bottom()
    };
    a.tr = {
        x: a.br.x,
        y: a.tl.y
    };
    a.bl = {
        x: a.tl.x,
        y: a.br.y
    };
    return function (f) {
        var b = MultiSelect.cachedItemRects[getUID(f)];
        if (!b) {
            MultiSelect.cachedItemRects[getUID(f)] = (b = {
                onchange: Event.addListener(f, "change", function () {
                    delete b.rect
                }),
                onDestruct: Event.addListener(f, "change", function () {
                    delete MultiSelect.cachedItemRects[getUID(f)]
                })
            })
        }
        if (!b.rect) {
            b.rect = MultiSelect._getIntersectTestRect(f)
        }
        var h = b.rect;
        if (a.left() > h.bb.right || a.right() < h.bb.left || a.top() > h.bb.bottom || a.bottom() < h.bb.top) {
            return false
        }
        if (a.isInside(h.tl) || a.isInside(h.tr) || a.isInside(h.bl) || a.isInside(h.br)) {
            return true
        }
        var d = f.matrix.inverse();
        var g = h.center();
        if (h.isInside(d.transform(a.left(), a.top(), g)) || h.isInside(d.transform(a.right(), a.top(), g)) || h.isInside(d.transform(a.right(), a.bottom(), g)) || h.isInside(d.transform(a.left(), a.bottom(), g))) {
            return true
        }
        var c = false;
        h.segs.forEach(function (j) {
            if (!c) {
                c = !! (j.intersect(a.tl, a.tr) || j.intersect(a.tr, a.br) || j.intersect(a.br, a.bl) || j.intersect(a.bl, a.tl))
            }
        });
        return c
    }
};
MultiSelect._getIntersectTestRect = function (f) {
    var d = f.getRect();
    var a = d.center();
    var b = {
        x: d.left(),
        y: d.top()
    };
    var c = {
        x: d.right(),
        y: d.bottom()
    };
    var g = {
        x: c.x,
        y: b.y
    };
    var h = {
        x: b.x,
        y: c.y
    };
    d.tl = (b = f.matrix.transform(b.x, b.y, a));
    d.tr = (g = f.matrix.transform(g.x, g.y, a));
    d.bl = (h = f.matrix.transform(h.x, h.y, a));
    d.br = (c = f.matrix.transform(c.x, c.y, a));
    d.segs = [];
    d.segs.push(new Segment(b, g));
    d.segs.push(new Segment(g, c));
    d.segs.push(new Segment(c, h));
    d.segs.push(new Segment(h, b));
    d.bb = {
        left: Math.min(d.tl.x, d.tr.x, d.bl.x, d.br.x),
        right: Math.max(d.tl.x, d.tr.x, d.bl.x, d.br.x),
        top: Math.min(d.tl.y, d.tr.y, d.bl.y, d.br.y),
        bottom: Math.max(d.tl.y, d.tr.y, d.bl.y, d.br.y)
    };
    return d
};

function XImage() {
    this.outer = null
}
XImage.prototype.getNode = function () {
    return this.outer
};
XImage.prototype.setSize = function (a) {
    setNode(this.outer, {
        width: Math.round(a.width()),
        height: Math.round(a.height())
    }, {
        width: px(a.width()),
        height: px(a.height())
    })
};
XImage.prototype.setSrc = function (a) {
    this._src = a;
    setNode(this.outer, {
        src: a
    })
};
XImage.prototype.getSrc = function () {
    return this._src
};

function FiltersImage(a, c) {
    this.outer = createNode("div", {
        className: "img"
    });
    var f = this.outer.appendChild(createNode("div"));
    this.proxy = f.appendChild(createNode("img", null, {
        position: "absolute",
        visibility: "hidden"
    }));
    var b = function () {
            var g = this.proxy.src;
            if (Browser.type("IE", 0, 8)) {
                if (g.match(/^(\w+:\/\/[^\/]*\/)(.*)$/)) {
                    g = RegExp.$1 + encodeURIComponent(RegExp.$2)
                }
            }
            setNode(f, null, {
                width: "100%",
                height: "100%",
                filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + g + '",sizingMethod="scale")'
            });
            Event.trigger(this.outer, "load");
            setNode(this.outer, null, {
                display: "none"
            });
            var h = this;
            window.setTimeout(function () {
                setNode(h.outer, null, {
                    display: "block"
                });
                Event.trigger(h, "load")
            }, 0)
        };
    var d = function (g) {
            Event.trigger(this, "error", g)
        };
    Event.addListener(this.proxy, "load", b, this);
    Event.addListener(this.proxy, "error", d, this)
}
extend(FiltersImage, XImage);
FiltersImage.prototype.setSrc = function (a) {
    this._src = a;
    setNode(this.proxy, {
        src: a
    })
};
FiltersImage.prototype.getSrc = function () {
    return this._src
};

function DOMImage(a, b) {
    DOMImage.superclass.constructor(this);
    this.outer = createNode("img", a, b);
    Event.addListener(this.outer, "load", function () {
        Event.trigger(this, "load")
    }, this)
}
extend(DOMImage, XImage);
if (Browser.type("IE", 6, 8)) {
    window.createXImg = function (a, b) {
        return new FiltersImage(a, b)
    }
} else {
    window.createXImg = function (a, b) {
        return new DOMImage(a, b)
    }
}
function Matrix() {
    this.maxErr = 0.00001;
    this._reset()
}
Matrix.prototype._reset = function () {
    this.thaw([1, 0, 0, 1]);
    this._inverse = null
};
Matrix.prototype.thaw = function (a) {
    this._values = cloneObject(a);
    this._inverse = null;
    Event.trigger(this, "change")
};
Matrix.prototype.flip = function () {
    this._values[2] *= -1;
    this._values[3] *= -1;
    this._inverse = null;
    Event.trigger(this, "change")
};
Matrix.prototype.flop = function () {
    this._values[0] *= -1;
    this._values[1] *= -1;
    this._inverse = null;
    Event.trigger(this, "change")
};
Matrix.prototype.rotate = function (a) {
    var b = Math.cos(a);
    var d = Math.sin(a);
    var c = cloneObject(this._values);
    this._values[0] = b * c[0] + d * c[2];
    this._values[1] = b * c[1] + d * c[3];
    this._values[2] = -d * c[0] + b * c[2];
    this._values[3] = -d * c[1] + b * c[3];
    this._fix_err();
    this._inverse = null;
    Event.trigger(this, "change")
};
Matrix.prototype.transform = function (b, d, a) {
    if (a) {
        b -= a.x;
        d -= a.y
    }
    var c = new Point(this._values[0] * b + this._values[1] * d, this._values[2] * b + this._values[3] * d);
    if (a) {
        c.x += a.x;
        c.y += a.y
    }
    return c
};
Matrix.prototype._fix_err = function () {
    for (var a = 0; a < this._values.length; ++a) {
        this._values[a] = round(this._values[a], this.maxErr)
    }
};
Matrix.prototype.freeze = function () {
    return cloneObject(this._values)
};
Matrix.prototype.inverse = function () {
    if (!this._inverse) {
        this._inverse = Matrix.create();
        var a = 1 / (this._values[0] * this._values[3] - this._values[1] * this._values[2]);
        this._inverse.thaw([a * this._values[3], -a * this._values[1], -a * this._values[2], a * this._values[0]])
    }
    return this._inverse
};
Matrix.prototype.isIdentity = function () {
    return this._values[0] == 1 && this._values[1] === 0 && this._values[2] === 0 && this._values[3] == 1
};
Matrix.prototype.clone = function () {
    var a = Matrix.create();
    a.thaw(this.freeze());
    return a
};
Matrix.prototype.apply = Matrix.prototype.destruct = noop;

function FiltersMatrix() {
    FiltersMatrix.superclass.constructor.call(this)
}
extend(FiltersMatrix, Matrix);
FiltersMatrix.prototype.destruct = function () {
    FiltersMatrix.superclass.destruct.call(this);
    this.contract = null
};
FiltersMatrix.prototype.apply = function (f, p, k) {
    var d = f._matrix;
    if (!d) {
        var o = null;
        if (f.childNodes && f.childNodes.length) {
            o = [];
            for (var h = 0; h < f.childNodes.length; ++h) {
                o.push(f.childNodes[h])
            }
        }
        d = f._matrix = f.appendChild(createNode("div", {
            className: "matrix"
        }, null, o))
    }
    var b = d.filters["DXImageTransform.Microsoft.Matrix"];
    if (b) {
        this._applyOnFilter(b)
    } else {
        setNode(d, null, {
            marginTop: "-50000px"
        });
        yield(function () {
            var q = {
                filter: getStyle(f, "filter") + " progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')"
            };
            var r = getStyle(f, "backgroundColor");
            if (r && r != "transparent") {
                q.backgroundColor = r
            }
            f.style.filter = f.style.backgroundColor = "";
            setNode(d, null, q);
            yield(function () {
                try {
                    if (!d || !d.filters) {
                        return
                    }
                } catch (s) {
                    return
                }
                b = d.filters["DXImageTransform.Microsoft.Matrix"];
                if (!b) {
                    return
                }
                this._applyOnFilter(b);
                q.marginTop = null;
                delete q.filter;
                setNode(d, null, q)
            }, this)
        }, this)
    }
    var c = !! k;
    k = k || {};
    k.margin = k.margin || 0;
    k.border = k.border || 0;
    if (p) {
        var l = p.getRect();
        var n = l.dim();
        var m = l.center();
        l.translate(-m.x, -m.y);
        if (c) {
            l.setWidth(l.width() + 2 * (k.margin + k.border), 0);
            l.setHeight(l.height() + 2 * (k.margin + k.border), 0)
        }
        var a = l.getTransformedBounds(this, l.center());
        setNode(d, null, {
            left: (a.left() - l.left() - k.margin - k.border) + "px",
            top: (a.top() - l.top() - k.margin - k.border) + "px",
            padding: (k.margin) + "px",
            width: Math.ceil(n.w + 2 * k.border) + "px",
            height: Math.ceil(n.h + 2 * k.border) + "px"
        })
    } else {
        var j = Dim.fromNode(d.parentNode);
        var g = function () {
                setNode(d, null, {
                    left: -k.margin - k.border,
                    top: -k.margin - k.border,
                    padding: k.margin,
                    width: j.w + 2 * k.border,
                    height: j.h + 2 * k.border
                })
            };
        if (j.w && j.h) {
            g()
        } else {
            this.contract = true;
            yield(function () {
                if (!this.contract) {
                    return
                }
                j = Dim.fromNode(d.parentNode);
                g();
                this.contract = null
            }, this)
        }
    }
    return d
};
FiltersMatrix.prototype._applyOnFilter = function (a) {
    a.M11 = this._values[0];
    a.M12 = this._values[1];
    a.M21 = this._values[2];
    a.M22 = this._values[3]
};

function CSSMatrix(a) {
    CSSMatrix.superclass.constructor.call(this);
    this.styleName = a
}
extend(CSSMatrix, Matrix);
CSSMatrix.prototype.apply = function (b) {
    var a = [this._values[0], this._values[2], this._values[1], this._values[3], 0, 0].join(",");
    b.id = "haircutContainer";

    var cosinus = parseFloat(this._values[0]);
    if (cosinus > +1) cosinus = +0.99999999999999;
    if (cosinus < -1) cosinus = -0.999999999999999;
    var sinus = parseFloat(this._values[1]);
    var angle = Math.acos(cosinus);
    if (sinus < 0) angle = 2 * 3.1415926535897932384626433 - angle;
    console.log(cosinus, sinus, angle);
    window.globals.currentHaircut.angle = -angle;

    b.style[this.styleName] = ["matrix(", a, ")"].join("");
    return b
};

function FlipFlopMatrix() {
    FlipFlopMatrix.superclass.constructor.call(this);
    this.flopped = false;
    this.flipped = false
}
extend(FlipFlopMatrix, Matrix);
FlipFlopMatrix.prototype.rotate = null;
FlipFlopMatrix.prototype.thaw = function (a) {
    a[1] = Number(a[1]);
    a[2] = Number(a[2]);
    if (Math.abs(a[0]) != 1 || a[1] !== 0 || a[2] !== 0 || Math.abs(a[3]) != 1) {
        var b = new Error(loc("Please use one of the following browsers: {browser_list}", {
            browser_list: ["Internet Explorer 7.0+", "FireFox 3.5+", "Safari 3.1+", "Chrome 3.0+"].join(", ")
        }));
        b.name = "pv_notsupported";
        throw b
    }
    this.flipped = (a[1] === 0 && a[2] === 0 && a[3] == -1);
    this.flopped = (a[0] == -1 && a[1] === 0 && a[2] === 0);
    FlipFlopMatrix.superclass.thaw.call(this, a)
};
FlipFlopMatrix.prototype.flip = function () {
    this.flipped = !this.flipped;
    FlipFlopMatrix.superclass.flip.call(this)
};
FlipFlopMatrix.prototype.flop = function () {
    this.flopped = !this.flopped;
    FlipFlopMatrix.superclass.flop.call(this)
};
FlipFlopMatrix.prototype.apply = function (b, a) {
    if (typeof (a.updateImage) == "function") {
        try {
            a.updateImage()
        } catch (c) {
            window.setTimeout(function () {
                a.updateImage()
            })
        }
    }
    return b
};
FlipFlopMatrix.prototype.extraImgParams = function (a) {
    if (this.flipped) {
        a.flip = 1
    }
    if (this.flopped) {
        a.flop = 1
    }
    return a
};
if (Browser.type("IE", 7, 8)) {
    var idMatrix = new FiltersMatrix();
    Matrix.create = function () {
        return new FiltersMatrix()
    };
    Matrix.clear = function (a, b) {
        idMatrix.apply(a, null, b)
    };
    Matrix.extract = function (c) {
        var d = c._matrix;
        if (!d) {
            return null
        }
        var b = d.filters["DXImageTransform.Microsoft.Matrix"];
        if (!b) {
            return null
        }
        var a = Matrix.create();
        a.thaw([b.M11, b.M12, b.M21, b.M22]);
        return a
    }
} else {
    if (Browser.type("Firefox", 3.5) || Browser.layoutEngine("WebKit", 525) || Browser.type("IE", 9)) {
        var styleName;
        if (Browser.layoutEngine("WebKit")) {
            styleName = "WebkitTransform"
        } else {
            if (Browser.isIE) {
                styleName = "-ms-transform"
            } else {
                if (Browser.isFirefox) {
                    styleName = "MozTransform"
                } else {
                    styleName = "transform"
                }
            }
        }
        Matrix.create = function () {
            return new CSSMatrix(styleName)
        };
        Matrix.clear = function (b) {
            var a = {};
            a[styleName] = "none";
            setNode(b, null, a)
        };
        Matrix.extract = function (d) {
            var b = getStyle(d, styleName);
            if (!b) {
                return null
            }
            b = b.replace(/matrix\((.*)\)$/, "$1").split(",");
            var c = b[2];
            b[2] = b[1];
            b[1] = c;
            var a = Matrix.create();
            a.thaw(b);
            return a
        }
    } else {
        Matrix.create = function () {
            return new FlipFlopMatrix()
        };
        Matrix.clear = noop;
        Matrix.extract = function (a) {
            return null
        }
    }
}
function PercentMap(a) {
    a = a || {};
    this.setMin(a.min || 0);
    this.setMax(a.max || 1)
}
PercentMap.prototype.setMin = function (a) {
    this._min = a
};
PercentMap.prototype.setMax = function (a) {
    this._max = a
};
PercentMap.prototype.getPct = function (a) {
    return (a - this._min) / (this._max - this._min)
};
PercentMap.prototype.getValue = function (a) {
    return a * (this._max - this._min) + this._min
};

function Item(g) {
    var b = Number(g.w || 0);
    var d = Number(g.h || 0);
    var a = Number(g.x || 0);
    var j = Number(g.y || 0);
    if ((!b || !d) && !(this instanceof TextItem)) {
        /*Beacon.log("err", {
            tid: this.thing_id,
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "unfreeze",
            d: JSON2.stringify(g),
            s: stack()
        }, 1)*/
    }
    this.rect = new Rect(-b / 2, -d / 2, b / 2, d / 2);
    this.translation = new Point(a + b / 2, j + d / 2);
    var f = (this.node = createNode("div", {
        className: "item"
    }, {
        left: "0px",
        top: "0px",
        zIndex: "1"
    }));
    f._data = this;
    var c = (this.matrix = Matrix.create());
    Event.addListener(c, "change", function () {
        this.bgColorNode = c.apply(this.getNode(), this, {
            border: 1
        })
    }, this);
    if (c.constructor == FiltersMatrix) {
        this.selectNode = this.node.appendChild(createNode("div"));
        Event.addListener(this, "scale", function () {
            c.apply(this.getNode(), this, {
                border: 1
            })
        }, this);
        Event.addListener(this, "resized", function () {
            c.apply(this.getNode(), this, {
                border: 1
            })
        }, this)
    } else {
        this.bgColorNode = this.selectNode = this.node
    }
    addClass(this.selectNode, "selectNode");
    if (g.transform) {
        c.thaw(g.transform)
    } else {
        if (g.flipped) {
            this.flip()
        }
        if (g.flopped) {
            this.flop()
        }
    }
    this.z = g.z || 1;
    this.unselect()
}
Item.constrainAspect = function (a) {
    var b = Math.max(a.x, a.y);
    return new Point(b, b)
};
Item.TYPES = {
    TEXT: "text",
    IMAGE: "image",
    PLACEHOLDER: "ph",
    AMAZON_MP3: "amazon_mp3",
    FB_PHOTO: "fb_photo",
    COLORBLOCK: "colorblock"
};
Item.thaw = function (b) {
    var a = Item._thaw(b);
    return a
};
Item._thaw = function (a) {
    switch (a.type) {
    case Item.TYPES.TEXT:
        return new TextItem(a);
    case Item.TYPES.IMAGE:
        return new ImageItem(a);
    case Item.TYPES.AMAZON_MP3:
        return new AmazonMP3Item(a);
    case Item.TYPES.FB_PHOTO:
        return new FBPhoto(a);
    case Item.TYPES.PLACEHOLDER:
        return new PlaceholderItem(a);
    case Item.TYPES.COLORBLOCK:
        return new ColorBlockItem(a);
    default:
        return new ImageItem(a)
    }
};
Item.cleanSpecForSaving = function (a) {
    if (a.type == Item.TYPES.IMAGE) {
        ["masking_policy", "title", "url", "displayurl", "host", "orig_price", "lc_display_price", "display_price", "oa", "a", "visibility"].forEach(function (b) {
            delete a[b]
        });
        if (!a.mask_spec || !a.mask_spec.length) {
            delete a.mask_spec
        }
        if (!a.opacity) {
            delete a.opacity
        }
        if (!a.mask_dirty) {
            delete a.mask_dirty
        }
        if (!a.mask_id) {
            delete a.mask_id
        }
        if (!a.colorize) {
            delete a.colorize
        }
    } else {
        if (a.type == Item.TYPES.PLACEHOLDER) {
            if (a.content) {
                Item.cleanSpecForSaving(a.content)
            }
        }
    }
    if (!a.transform || (a.transform[0] * 1 == 1 && a.transform[1] * 1 === 0 && a.transform[2] * 1 === 0 && a.transform[3] * 1 == 1)) {
        delete a.transform
    }
    if (!a.link) {
        delete a.link
    }
    if (!a.bgColor) {
        delete a.bgColor
    }
};
Item.prototype.shouldConstrainAspect = function () {
    return true
};
Item.prototype.clone = function () {
    return Item.thaw(this.freeze())
};
Item.prototype.getNode = function () {
    return this.node
};
Item.prototype.getMinWidth = Item.prototype.getMinHeight = function () {
    return 10
};
Item.prototype.getResizeHandles = function () {
    return ["nw", "ne", "se", "sw"]
};
Item.prototype.getRotateHandles = function () {
    return this.matrix.rotate === null ? [] : ["n"]
};
Item.prototype.getRect = function () {
    var a = this.rect.clone();
    a.translate(this.translation.x, this.translation.y);
    return a
};
Item.prototype.getMatrix = function () {
    return this.matrix
};
Item.prototype.getBounds = function () {
    var a = this.rect.getTransformedBounds(this.matrix);
    a.translate(this.translation.x, this.translation.y);
    return a
};
Item.prototype.destruct = function () {
    Event.trigger(this, "destruct");
    delayedClearNode(this.node);
    domRemoveNode(this.node);
    Event.release(this);
    this.img = null;
    this.node = null;
    if (this.matrix) {
        this.matrix.destruct()
    }
    this.matrix = null;
    if (this.opacitySlider) {
        this.opacitySlider.destruct();
        this.opacitySlider = null
    }
};
Item.prototype.freeze = function () {
    var a = this.getRect().XYWH();
    a.z = this.z;
    if ((!a.w || !a.h) && !(this instanceof TextItem)) {
        /*Beacon.log("err", {
            tid: this.thing_id,
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "freezing",
            s: stack()
        }, 1)*/
    }
    if (!this.matrix.isIdentity()) {
        a.transform = this.matrix.freeze()
    }
    return a
};
Item.prototype.select = Browser.type("IE", null, 8) ?
function () {
    if (this.selected) {
        return
    }
    this.selected = true;
    addClass(this.selectNode, "selected");
    this.selectNode._unselectedOpacity = this.selectNode._unselectedOpacity || getStyle(this.selectNode, "filter").replace(/.*alpha\(opacity=([0-9]+).*/, "$1") || 100;
    setNode(this.selectNode, null, {
        opacity: 0.8
    })
} : function () {
    if (this.selected) {
        return
    }
    this.selected = true;
    addClass(this.selectNode, "selected")
};
Item.prototype.unselect = Browser.type("IE", null, 8) ?
function () {
    if (!this.selected) {
        return
    }
    this.selected = false;
    removeClass(this.selectNode, "selected");
    setNode(this.selectNode, null, {
        opacity: (this.selectNode._unselectedOpacity || 100) / 100
    })
} : function () {
    if (!this.selected) {
        return
    }
    this.selected = false;
    removeClass(this.selectNode, "selected")
};
Item.prototype.setSelectable = function (a) {
    this.unselectable = !a
};
Item.prototype.beginMove = function () {
    this.translationStart = cloneObject(this.translation);
    Event.trigger(this, "beginmove")
};
Item.prototype.endMove = function () {
    var a;
    Event.trigger(this, "endmove");
    if (this.translationStart && !this.translationStart.equals(this.translation)) {
        a = true;
        Event.trigger(this, "change");
        Event.trigger(this, "moved")
    }
    this.translationStart = null;
    return a
};
Item.prototype.move = function (c, b, a) {
    if (a) {
        if (!this.translationStart) {
            return
        }
        this.translation.x = this.translationStart.x + c;
        this.translation.y = this.translationStart.y + b
    } else {
        this.translation.x += c;
        this.translation.y += b
    }
    this.node.style.cssText = this.node.style.cssText.replace(/left:[^p]*px/i, "left:" + round(this.rect.x1 + this.translation.x, 0.001) + "px").replace(/top:[^p]*px/i, "top:" + round(this.rect.y1 + this.translation.y, 0.001) + "px")
};
Item.prototype.beginResize = function () {
    this.rectStart = this.rect.clone();
    this.translationStart = cloneObject(this.translation);
    Event.trigger(this, "beginresize")
};
Item.prototype.endResize = function () {
    Event.trigger(this, "endresize");
    var a = false;
    if (!this.rectStart.equals(this.rect) || !this.translationStart.equals(this.translation)) {
        Event.trigger(this, "change");
        Event.trigger(this, "resized", this);
        a = true
    }
    this.rectStart = this.translationStart = null;
    return a
};
Item.prototype.canScale = function (a, c) {
    var b = (c || c === undefined) ? this.rectStart : this.rect;
    return (b.width() * a.x >= this.getMinWidth()) && (b.height() * a.y >= this.getMinHeight())
};
Item.prototype.scale = function (c, a, d, b) {
    this._scale(c, a, b);
    this.redraw()
};
Item.prototype._scale = function (c, a, f) {
    if (f === undefined) {
        f = this.shouldConstrainAspect()
    }
    /* megaserg:aspect */ f = false;
    c = f ? Item.constrainAspect(c) : c;
    this.rect = this.rectStart.clone();
    this.rect.scale(c);

    if (a) {
        var b = this.matrix.inverse().transform(a.x - this.translationStart.x, a.y - this.translationStart.y);
        var d = this.matrix.transform(c.x * -b.x, c.y * -b.y);
        this.translation.x = d.x + a.x;
        this.translation.y = d.y + a.y
    } else {
        this.translation.x = this.translationStart.x * c.x;
        this.translation.y = this.translationStart.y * c.y
    }
    if ((!this.rect.width() || !this.rect.height()) && !(this instanceof TextItem)) {
        /*Beacon.log("err", {
            tid: this.thing_id,
            cid: (window.app || {}).cid,
            did: (window.app || {}).did,
            o: "scale",
            re: JSON2.stringify(this.getRect()),
            r: JSON2.stringify(c),
            c: JSON2.stringify(a),
            s: stack()
        }, 1)*/
    }
    Event.trigger(this, "scale")
};
Item.prototype.setScale = function (c, a, d, b) {
    this.beginResize();
    this.scale(c, a, d, b);
    return this.endResize()
};
Item.prototype.beginRotate = function () {
    this.matrixStart = new Matrix();
    this.translationStart = cloneObject(this.translation)
};
Item.prototype.rotate = function (b, a) {
    this.matrix.rotate(b);
    if (a) {
        this.matrixStart.rotate(b);
        this.translation = this.matrixStart.transform(this.translationStart.x, this.translationStart.y, a);
        if (Browser.isSafari) {
            yield(this.redraw, this)
        } else {
            this.redraw()
        }
    }
};
Item.prototype.endRotate = function () {
    this.translationStart = null;
    this.matrixStart = null;
    Event.trigger(this, "change");
    Event.trigger(this, "rotated")
};
Item.prototype.flop = function (b) {
    if (b && b.center) {
        var a = b.center();
        this.translation.x = 2 * a.x - this.translation.x;
        this.redraw()
    }
    this.matrix.flop();
    Event.trigger(this, "change");
    Event.trigger(this, "flopped", this)
};
Item.prototype.flip = function (b) {
    if (b && b.center) {
        var a = b.center();
        this.translation.y = 2 * a.y - this.translation.y;
        this.redraw()
    }
    this.matrix.flip();
    Event.trigger(this, "change");
    Event.trigger(this, "flipped", this)
};
Item.prototype.setZIndex = function (a) {
    this.z = a;
    this.redraw()
};
Item.prototype.redraw = function () {
    var a = {
        left: px(this.rect.x1 + this.translation.x),
        top: px(this.rect.y1 + this.translation.y),
        zIndex: this.z === undefined ? "" : this.z
    };
    setNode(this.node, null, a);
    a = {
        width: px(this.rect.width()),
        height: px(this.rect.height())
    };
    setNode(this.selectNode, null, a)
};
Item.prototype.onSaved = noop;
Item.prototype.hasContent = function () {
    return true
};
Item.prototype.getIcon = function () {
    console.log("implement getIcon")
};
Item.prototype.getActions = function () {
    console.log("implement getActions")
};
Item.prototype.getInfo = function () {
    console.log("implement getInfo")
};
Item.prototype.setColor = noop;
Item.prototype.setOpacity = noop;
Item.prototype.getColorControl = function () {
    if (!Item.colorDS) {
        Item.colorDS = new MemDataSource(ColorPicker.getColorList())
    }
    var d = createNode("span", {
        className: "interactive"
    });
    var c = {
        caption: loc("Color"),
        defaultLabel: loc("All colors"),
        options: Item.colorDS.values(),
        textBoxRenderer: DropDownItemHelper.renderColorTextBox
    };
    var b = new SelectFilter(Item.colorDS, "color", this.color, this.color, c);
    var a = FilterUI.factory("colorpicker", b, c);
    a.attach(d);
    Event.addListener(b, "change", function () {
        this.setColor(b.value)
    }, this);
    return d
};
Item.prototype.getOpacityControl = function () {
    if (Browser.type("IE", 6, 8)) {
        return null
    }
    if (this.opacitySlider) {
        this.opacitySlider.destruct()
    }
    if (!this.opacity) {
        this.opacity = 1
    }
    var l = Math.max(((this.opacity - 0.1) / 0.9) * 100, 0);
    var h = {
        value: l,
        style: {
            width: px(75),
            marginLeft: px(2),
            marginRight: px(2)
        }
    };
    var c = Slider.create(h);
    var b = 0;
    var j = Event.wrapper(function () {
        b = c.getValue()
    }, this);
    var f = Event.wrapper(function (m) {
        this.setOpacity((c.getValue() / 100) * 0.9 + 0.1)
    }, this);
    var g = Event.wrapper(function (m) {
        this.setOpacity((c.getValue() / 100) * 0.9 + 0.1)
    }, this);
    Event.addListener(c, "beginslide", j);
    Event.addListener(c, "change", f);
    Event.addListener(c, "endslide", g);
    addClass(c.getNode(), "interactive right");
    var d = createNode("img", {
        src: buildRsrcURL("icons/icon_transparency_clear.gif"),
        width: px(16),
        height: px(16),
        alt: loc("More transparent"),
        className: "right"
    });
    var a = createNode("img", {
        src: buildRsrcURL("icons/icon_transparency_solid.gif"),
        width: px(16),
        height: px(16),
        alt: loc("More solid"),
        className: "right"
    });
    var k = createNode("div", {
        title: loc("Transparency")
    }, null, [a, c.getNode(), d]);
    this.opacitySlider = c;
    return k
};

function ImageItem(data) {
    ImageItem.superclass.constructor.call(this, data);
    this.data = data;
    this.img = createXImg();
    this.thing_id = data.thing_id;
    this.masking_policy = data.masking_policy;
    if (data.bkgd === undefined || data.bkgd === null) {
        this.bkgd = (this.masking_policy == "never" || this.masking_policy == "default_no")
    } else {
        this.bkgd = Boolean(data.bkgd)
    }
    this.opacity = Number(data.opacity || 0);
    this.color = data.colorize;
    data.allow_colorizable = data.allow_colorizable || data.colorize;
    data.allow_opacity = data.allow_opacity || data.opacity;
    if (data.allow_colorizable || data.allow_opacity) {
        this.masking_policy = "default_no";
        this.keepBackground = true;
        this.bkgd = true;
        if (data.allow_opacity && !this.opacity && !Browser.type("IE", 6, 8)) {
            this.opacity = 0.55
        }
    }
    if (data.allow_colorizable && !this.color) {
        this.color = "#000000"
    }
    this.mask_spec = eval(data.mask_spec) || [];
    this.mask_dirty = 0;
    this.aspect = Number(data.a || this.rect.aspect());
    this.orig_aspect = Number(data.oa || (Number(data.oh) / Number(data.ow)));
    if (!this.mask_spec.length && this.bkgd) {
        this.rect.setAspect(this.orig_aspect)
    }
    this.selectNode.appendChild(this.img.getNode());
    this.updateImage()
}
extend(ImageItem, Item);
ImageItem.prototype.onSaved = function () {
    this.mask_dirty = 0;
    this.mask_id = 0
};
ImageItem.prototype.redraw = function () {
    this.node.style.cssText = this.node.style.cssText.replace(/left:[^p]*px/i, "left:" + round(this.rect.x1 + this.translation.x, 0.001) + "px").replace(/top:[^p]*px/i, "top:" + round(this.rect.y1 + this.translation.y, 0.001) + "px").replace(/z-index:[ .0-9]*\b/i, "z-index:" + (this.z === undefined ? "" : this.z));
    if (this.opacity) {
        setNode(this.img.getNode(), null, {
            opacity: this.opacity
        })
    }
    this.img.setSize(this.rect)
};
ImageItem.prototype.updateImage = function () {
    this.img.setSrc(this.computeImgURL())
};
ImageItem.prototype.freeze = function () {
    var a = ImageItem.superclass.freeze.call(this);
    var b = {
        type: Item.TYPES.IMAGE,
        thing_id: this.thing_id,
        oa: this.orig_aspect,
        masking_policy: this.masking_policy,
        bkgd: !! this.bkgd,
        mask_spec: this.mask_spec,
        mask_dirty: this.mask_dirty,
        mask_id: this.mask_id,
        opacity: this.opacity,
        colorize: this.color
    };
    if (this.mask_spec.length) {
        b.mask_spec = this.mask_spec
    }
    if (this.mask_dirty) {
        b.mask_dirty = this.mask_dirty
    }
    if (this.mask_id) {
        b.mask_id = this.mask_id
    }["title", "url", "displayurl", "orig_price", "lc_display_price", "display_price", "visibility"].forEach(function (c) {
        b[c] = this.data[c]
    }, this);
    return mergeObject(a, b)
};
ImageItem.prototype.clone = function () {
    var b = ImageItem.superclass.clone.call(this);
    b.mask_spec = [];
    for (var a = 0; a < this.mask_spec.length; a++) {
        b.mask_spec.push(cloneObject(this.mask_spec[a]))
    }
    return b
};
ImageItem.prototype.computeImgURL = function (c, b) {
	return this.thing_id;
    var a = {
        tid: this.thing_id,
        size: "orig",
        ".out": (!b && this.bkgd && !this.mask_spec.length && !this.color ? "jpg" : "png")
    };
    if (!this.bkgd) {
        a.mask = 1
    }
    if (this.mask_spec.length) {
        a.mask_spec = JSON2.stringify(this.mask_spec)
    }
    if (!c && this.matrix.extraImgParams) {
        this.matrix.extraImgParams(a)
    }
    if (this.color) {
        a.color = this.color
    }
    return buildImgURL("img-thing", a)
};
ImageItem.prototype.mask = function (a) {
    if (!this.mask_spec.length && this.bkgd == a) {
        return
    }
    this.rect.setAspect(this.bkgd ? this.aspect : this.orig_aspect);
    this.bkgd = Boolean(a);
    this.mask_spec = [];
    this.updateImage();
    this.redraw();
    Event.trigger(this, "resized", this);
    Event.trigger(this, "updateactions", this);
    Event.trigger(this, "change")
};
ImageItem.prototype.setDimensions = function (a) {
    this.rect.setWidth(a.w, 0);
    this.rect.setHeight(a.h, 0);
    this.redraw();
    Event.trigger(this, "resized", this)
};
ImageItem.prototype.setMaskSpec = function (c, a, d) {
    this.mask_spec = [];
    for (var b = 0; b < c.length; b++) {
        this.mask_spec.push(new Point(c[b].x, c[b].y))
    }
    if (a) {
        this.mask_id = a
    } else {
        this.mask_dirty = 1
    }
    if (this.mask_spec.length) {
        this.bkgd = 1
    }
    this.updateImage();
    Event.trigger(this, "updateactions", this);
    this.setDimensions(d);
    Event.trigger(this, "change")
};
ImageItem.prototype.getActions = function () {
    var a = {
        flop_btn: {
            method: Event.wrapper(this.flop, this)
        },
        flip_btn: {
            method: Event.wrapper(this.flip, this)
        }
    };
    if (this.masking_policy != "never") {
        a.cropbkgd_btn = {
            method: Event.wrapper(this.startCrop, this),
            selected: !! this.mask_spec.length,
            single: true
        };
        if (!this.keepBackground) {
            a.hidebkgd_btn = {
                method: Event.wrapper(function () {
                    this.mask(false)
                }, this),
                disabled: !this.mask_spec.length && !this.bkgd,
                selected: !this.mask_spec.length && !this.bkgd,
                single: true
            };
            a.showbkgd_btn = {
                method: Event.wrapper(function () {
                    this.mask(true)
                }, this),
                disabled: !this.mask_spec.length && !! this.bkgd,
                selected: !this.mask_spec.length && !! this.bkgd,
                single: true
            }
        }
    }
    return a
};
ImageItem.prototype.startCrop = function () {
    LassoDialog.showExpanded(this)
};
ImageItem.prototype.getInfo = function () {
    if (this.data) {
        var d = this.data;
        var b = [];
        if (this.data.allow_opacity || this.data.allow_colorizable) {
            var c = createNode("div", {
                className: "control_line"
            });
            if (this.data.allow_colorizable) {
                var a = this.getColorControl();
                addClass(a, "right");
                c.appendChild(a)
            }
            if (this.data.allow_opacity) {
                var f = this.getOpacityControl();
                if (f) {
                    addClass(f, "right");
                    if (this.data.allow_colorizable) {
                        setNode(f, null, {
                            marginRight: "4px"
                        })
                    }
                    c.appendChild(f)
                }
            }
            c.appendChild(createNode("br", {
                className: "clear"
            }));
            b.push(c)
        }
        if (d.title) {
            b.push(createNode("div", null, null, teaser(d.title, 60)))
        }
        if (d.url && d.displayurl && !(this.data.allow_opacity || this.data.allow_colorizable)) {
            b.push(createNode("span", {
                className: "interactive"
            }, {
                clear: "both"
            }, UI.priceAndLink(d, {
                showOriginalPrice: true,
                showUnlocalizedPrice: true
            })))
        }
        b.push(createNode("div", {
            className: "clear"
        }));
        return b
    }
    return null
};
ImageItem.prototype.getIcon = function () {
    return UI.itemRender(this, "li")
};
ImageItem.prototype.getUnmaskedDim = function () {
    if (!this.mask_spec.length) {
        return this.rect.dim()
    }
    var a = 1;
    var d = 0;
    this.mask_spec.forEach(function (f) {
        a = Math.min(a, f.x);
        d = Math.max(d, f.x)
    });
    var b = this.rect.width() / (d - a);
    var c = b * this.orig_aspect;
    return new Dim(b, c)
};
ImageItem.prototype.setColor = function (a) {
    this.color = a;
    this.updateImage();
    this.redraw();
    Event.trigger(this, "change")
};
ImageItem.prototype.setOpacity = function (a) {
    this.opacity = a;
    this.updateImage();
    this.redraw();
    Event.trigger(this, "change")
};

function FBPhoto(b) {
    this.fbImgUrl = b.imgurl;
    this.pid = b.pid;
    FBPhoto.superclass.constructor.call(this, b);
    var a = 3;
    Event.addListener(this.img, "error", function () {
        a--;
        if (a) {
            this.img.setSrc("");
            window.setTimeout(Event.wrapper(function () {
                this.updateImage()
            }, this), 200)
        }
    }, this);
    if (!this.rect.width()) {
        getNaturalWidthHeight(b.imgurl, Event.wrapper(function (c, d) {
            if (c && d) {
                b.w = c;
                b.h = d
            } else {
                b.w = 200;
                b.h = 200
            }
            b.x = 0;
            b.y = 0;
            this.rect = new Rect(-b.w / 2, -b.h / 2, b.w / 2, b.h / 2);
            this.translation = new Point(b.x + b.w / 2, b.y + b.h / 2);
            Event.trigger(this, "change");
            Event.trigger(this, "sized", this)
        }, this))
    }
}
extend(FBPhoto, ImageItem);
FBPhoto.mapImgUrl = function (a, b) {
    var d = UI.sizeMap[b].dim;
    var c;
    if (d < 100) {
        c = "t"
    } else {
        if (d < 150) {
            c = "s"
        } else {}
    } if (c) {
        a = a.replace(/_n\.jpg/, "_" + c + ".jpg").replace(/\/n([^\/]*)\.jpg$/, "/" + c + "$1.jpg")
    }
    return a
};
FBPhoto.prototype.startCrop = function () {
    LassoDialog.showSimple(imgUrl, this, {
        header: loc("Crop your friend's face by drawing a path around it..."),
        onSuccess: Event.wrapper(function (b, a) {
            this.mask_spec = b || [];
            this.updateImage();
            Event.trigger(this, "updateactions", this);
            this.setDimensions(a);
            Event.trigger(this, "change")
        }, this)
    })
};
FBPhoto.prototype.getActions = function () {
    var a = FBPhoto.superclass.getActions.call(this);
    return a
};
FBPhoto.prototype.getIcon = function () {
    var a = UI.sizeMap.li.dim;
    return createNode("img", {
        width: a,
        height: a,
        src: this.fbImgUrl
    }, {
        width: px(a),
        height: px(a)
    })
};
FBPhoto.prototype.computeImgURL = function (c, b) {
    var a = {
        url: this.fbImgUrl,
        ".out": (!b && this.bkgd && !this.mask_spec.length) ? "jpg" : "png"
    };
    if (!this.bkgd) {
        a.mask = 1
    }
    if (this.mask_spec.length) {
        a.mask_spec = JSON2.stringify(this.mask_spec)
    }
    if (!c && this.matrix.extraImgParams) {
        this.matrix.extraImgParams(a)
    }
    return buildImgURL("img-fbphoto", a)
};
FBPhoto.prototype.freeze = function () {
    var a = FBPhoto.superclass.freeze.call(this);
    var b = {
        imgurl: this.img.getSrc(),
        type: Item.TYPES.FB_PHOTO,
        mask_spec: this.mask_spec,
        pid: this.pid
    };
    return mergeObject(a, b)
};

function TextItem(a) {
    this.font_id = a.font_id;
    this.point = a.point || 100;
    this.paddings = {
        t: 0,
        r: 0,
        b: 0,
        l: 0,
        w: 0
    };
    if (!a.w) {
        a.h = a.h || 0;
        this.autoResize = a.w = 200
    }
    this.startScl = this.scl = a.scale || 1;
    this.state = "init";
    TextItem.superclass.constructor.call(this, a);
    this.selectNode.style.cssText += ";width:1px;";
    this.node.style.cssText += ";width:1px;";
    addClass(this.selectNode, "textitem");
    this.tokensNode = this.selectNode.appendChild(createNode("div"));
    this.setMinTokenWidth(this.getMinWidth());
    this.setColor(a.color || "#000000");
    this.setBGColor(a.bgColor || "");
    this.text = (a.text || a.text === 0) ? "" + a.text : loc("I Love Polyvore");
    this.link = a.link || "";
    this.tokens = this.text.split(/\s+/).map(function (b) {
        return {
            word: b
        }
    });
    this.desiredMetrics = {
        contract: getUID(this)
    };
    this.cleaner = new Cleaner();
    this.cleaner.push(Event.wrapper(function () {
        Ajax.abortContract(this.desiredMetrics.contract)
    }, this));
    this.computeFontMetrics()
}
extend(TextItem, Item);
TextItem.prototype.destruct = function () {
    this.cleaner.clean();
    TextItem.superclass.destruct.call(this)
};
TextItem.CACHED_METRICS = {};
TextItem.fontListDS = null;
TextItem.colorDS = null;
TextItem.getCachedMetrics = function (a) {
    var b = a + ":";
    return (TextItem.CACHED_METRICS[b] = TextItem.CACHED_METRICS[b] || new Hash())
};
TextItem.getSpaceWidth = function (a) {
    var b = TextItem.getCachedMetrics(a).get(" ") || {
        ml: 0,
        w: 0,
        mr: 0
    };
    return b.ml + b.w + b.mr
};
TextItem.prototype.getActions = function () {
    return {}
};
TextItem.prototype.getInfo = function () {
    var a = createNode("form");
    if (!Item.colorDS) {
        Item.colorDS = new MemDataSource(ColorPicker.getColorList())
    }
    var l = new Toolbar();
    a.appendChild(l.getNode());
    l.addSpring();
    var c = l.add();
    addClass(c, "interactive");
    TextItem.fontListDS = TextItem.fontListDS || new AjaxDataSource("font.list", {
        length: 1000,
        ver: 1
    });
    var h = new FontPicker({
        listHeight: "200px"
    });
    this.cleaner.push(Event.addListener(h, "change", function (n) {
        if (n) {
            this.setFont(n)
        }
    }, this));
    var b = TextItem.fontListDS;
    this.cleaner.push(Event.addSingleUseListener(b, "loaded", function () {
        var n = b.find(this, function (q, p) {
            return q.font_id == p.font_id
        });
        var o = b.values();
        if (n < 0) {
            n = o.length;
            o = b.values().concat({
                font_id: this.font_id,
                type: "text"
            })
        }
        h.setItems(o);
        h.select(o[n]);
        c.appendChild(h.getNode())
    }, this));
    b.ensureLoaded();
    l.add(this.getColorControl());
    var j = new Toolbar();
    a.appendChild(j.getNode());
    j.addSpring();
    j.add(loc("Text"));
    var m = createNode("input", {
        type: "text",
        value: this.text,
        maxlength: 100,
        className: "interactive"
    });
    j.add(m);
    var g = createNode("input", {
        className: "url",
        type: "text",
        value: this.link,
        maxlength: 1024
    });
    var f = new Toolbar();
    a.appendChild(f.getNode());
    f.addSpring();
    var d = createNode("input", {
        className: "interactive",
        type: "submit",
        value: loc("Update")
    });
    f.add(d);

    function k() {
        var o = TextItem.cleanText(m.value);
        var n = cleanURL(g.value) || "";
        if ((o && o != this.getText()) || (n != this.getLink())) {
            enable(d)
        } else {
            disable(d)
        }
    }
    this.cleaner.push(Event.addListener(m, "keyup", k, this));
    this.cleaner.push(Event.addListener(g, "keyup", k, this));
    k.apply(this);
    this.cleaner.push(Event.addListener(a, "submit", function (n) {
        m.value = TextItem.cleanText(m.value);
        if (m.value) {
            this.setText(m.value)
        }
        g.value = cleanURL(g.value);
        if (g.value) {
            this.setLink(g.value)
        }
        k.apply(this);
        return Event.stop(n)
    }, this));
    return a
};
TextItem.prototype.getIcon = function () {
    return UI.fontIconRender(this, "li")
};
TextItem.prototype.freeze = function () {
    var d = this.tokens;
    var a = 0;
    var f = [];
    for (var c = 0; c < d.length; ++c) {
        var b = d[c].node;
        if (b) {
            f.push({
                t: b.getAttribute("title"),
                x: this.paddings.l * this.scl + b.offsetLeft - parseInt(b.style.marginLeft, 10),
                y: this.paddings.t * this.scl + b.offsetTop - parseInt(b.style.marginTop, 10)
            })
        }
    }
    var g = this.getRect();
    var k = Math.max.apply(null, this.getLineMetrics().map(function (l) {
        return l.width
    }).concat(0));
    k = Math.ceil(k);
    if (k && !this.bgColor && hasDim(this.selectNode) && k <= g.width()) {
        g.translate(-this.translation.x, -this.translation.y);
        g.setWidth(k, g.left());
        var h = g.center();
        g.translate(-h.x, -h.y);
        h = this.matrix.transform(h.x, h.y);
        g.translate(h.x + this.translation.x, h.y + this.translation.y)
    }
    var j = g.XYWH();
    j.z = this.z;
    j.transform = this.matrix.freeze();
    return mergeObject(j, {
        type: Item.TYPES.TEXT,
        font_id: this.font_id,
        point: this.point,
        scale: this.scl,
        text: this.text,
        link: this.link,
        color: this.color,
        bgColor: this.bgColor,
        pos: f
    })
};
TextItem.prototype.setColor = function (a) {
    if (a && a != this.color) {
        this.color = a;
        this.rebuildTokens();
        Event.trigger(this, "change")
    }
};
TextItem.prototype.setBGColor = function (a) {
    a = a || "";
    if (a != this.bgColor) {
        this.bgColor = a
    }
    setNode(this.bgColorNode, null, {
        backgroundColor: this.bgColor
    });
    Event.trigger(this, "change")
};
TextItem.cleanText = function (a) {
    return a.replace(/<\/?[^>]+>/g, "").replace(/<|>/g, "").replace(/\s+/g, " ").trim()
};
TextItem.prototype.getLink = function () {
    return this.link
};
TextItem.prototype.setLink = function (a) {
    a = a || "";
    if (a != this.link) {
        this.link = a;
        Event.trigger(this, "change")
    }
};
TextItem.prototype.getText = function () {
    if (Ajax.getContract(this.desiredMetrics.contract)) {
        return this.desiredMetrics.text
    } else {
        return this.text
    }
};
TextItem.prototype.setText = function (a) {
    a = TextItem.cleanText(a);
    if ((a || a === 0) && (a != this.text || Ajax.getContract(this.desiredMetrics.contract))) {
        this.desiredMetrics.text = a;
        this.computeFontMetrics()
    }
};
TextItem.prototype.setFont = function (a) {
    if (a && (a.font_id != this.font_id || Ajax.getContract(this.desiredMetrics.contract))) {
        this.desiredMetrics.font_id = a.font_id;
        this.computeFontMetrics();
        return true
    }
    return false
};
TextItem.prototype.beginResize = function () {
    this.startScl = this.scl;
    this.getRect();
    TextItem.superclass.beginResize.call(this)
};
TextItem.prototype.shouldConstrainAspect = function (a) {
    a = a || {};
    switch (a.location) {
    case "w":
    case "e":
    case "n":
    case "s":
        return false
    }
    return true
};
TextItem.prototype.scale = function (b, a, c) {
    c = c || {};
    switch (c.location) {
    case "w":
    case "e":
    case "n":
    case "s":
        if (this.rectStart.width() * b.x >= this._minTokenWidth) {
            this._scale(b, a, false)
        }
        break;
    default:
        b = Item.constrainAspect(b);
        this.scl = this.startScl * b.x;
        this._scale(b, a);
        this._scaleTokens()
    }
    this.redraw()
};
TextItem.prototype.redraw = function () {
    this.selectNode.style.cssText = this.selectNode.style.cssText.replace(/width:[^p]*px/i, "width:" + px(this.rect.width())).replace(/z-index:[ .0-9]*\b/i, "z-index:" + (this.z === undefined ? "" : this.z));
    var a = this.getRect();
    this.node.style.cssText = this.node.style.cssText.replace(/width:[^p]*px/i, "width:" + px(a.width())).replace(/left:[^p]*px/i, "left:" + round(a.left(), 0.001) + "px").replace(/top:[^p]*px/i, "top:" + round(a.top(), 0.001) + "px").replace(/z-index:[ .0-9]*\b/i, "z-index:" + (this.z === undefined ? "" : this.z))
};
TextItem.prototype.computeFontMetrics = function (a) {
    a = a || this.desiredMetrics;
    a.font_id = a.font_id || this.font_id;
    a.text = a.text || this.text;
    a.point = a.point || this.point;
    var b = TextItem.getCachedMetrics(a.font_id);
    var c = a.text.split(/\s+/).filter(function (d) {
        return b.contains(d) ? false : true
    }).uniq().sort();
    if (c.length <= 0) {
        this.state = "ready";
        Ajax.abortContract(a.contract);
        this.onComputeMetricsFinish(a);
        return true
    } else {
        if (!b.contains(" ")) {
            c.push(" ")
        }
        /*Ajax.get({
            action: "text-metrics",
            contract: a.contract,
            data: {
                v: 5,
                tokens: c,
                font_id: a.font_id,
                point: a.point
            },
            onSuccess: Event.wrapper(function (d) {
                this.state = "ready";
                b.merge(d.metrics);
                this.onComputeMetricsFinish(a)
            }, this)
        });*/
        return false
    }
};
TextItem.prototype.onComputeMetricsFinish = function (a) {
    var b = false;
    if (this.text != a.text) {
        this.text = a.text;
        this.tokens = this.text.split(/\s+/).map(function (c) {
            return {
                word: c
            }
        });
        b = true
    }
    if (this.font_id != a.font_id) {
        this.font_id = a.font_id;
        b = true;
        yield(function () {
            Event.trigger(this, "updateactions", this)
        }, this)
    }
    this.rebuildTokens();
    Event.bundleEvents(this, "change");
    if (this.autoResize) {
        this.scl = this.autoResize / this.rect.width() * this.scl;
        this.rect.setWidth(this.autoResize, 0);
        this._scaleTokens();
        this.autoResize = null
    } else {
        Event.trigger(this, "resized", this)
    }
    if (b) {
        Event.trigger(this, "change")
    }
    Event.unbundleEvents(this, "change");
    Event.trigger(this, "metricsuptodate")
};
TextItem.prototype.getLineMetrics = function () {
    var h = [];
    if (this.state != "ready") {
        return h
    }
    var k = this.scl;
    var j = TextItem.getCachedMetrics(this.font_id);
    var l = TextItem.getSpaceWidth(this.font_id);
    var a = (this.paddings.r + this.paddings.l) * k;
    var b;
    for (var f = 0; f < this.tokens.length; ++f) {
        var d = j.get(this.tokens[f].word);
        var c = this.tokens[f].node;
        var g = c.offsetTop + c.offsetHeight + depx(getStyle(c, "margin-bottom"));
        if (!b || g > b.baseline) {
            b = {
                tokens: [],
                baseline: g,
                width: a
            };
            h.push(b)
        }
        b.width += Math.round(d.w * k) + Math.round(-d.ml * k) + Math.round(-d.mr * k + l * k);
        b.tokens.push(this.tokens[f])
    }
    return h
};
TextItem.prototype._scaleTokens = function () {
    if (this.state != "ready") {
        return
    }
    var k = this.tokens;
    var l = TextItem.getCachedMetrics(this.font_id);
    var o = TextItem.getSpaceWidth(this.font_id);
    var n = this.scl;
    var b = -1;
    var j = this.getLineMetrics();
    b = Math.min.apply(null, j.map(function (m) {
        return m.width
    }));
    for (var h = 0; h < k.length; ++h) {
        var g = k[h];
        var a = g.word;
        var f = l.get(a);
        var c = (Math.round(f.h * n) - Math.round(f.mt * n) - Math.round(f.mb * n)) - Math.round((f.h - f.mt - f.mb) * n);
        setNode(g.node, null, {
            width: px(f.w * n),
            height: px(f.h * n),
            marginLeft: px(-f.ml * n),
            marginRight: px(-f.mr * n + o * n),
            marginTop: px(-f.mt * n),
            marginBottom: px(-(c + f.mb * n))
        })
    }
    var d = this.paddings;
    setNode(this.tokensNode, null, {
        padding: [d.t * n, d.r * n, d.b * n, d.l * n].map(px).join(" ")
    });
    this.setMinTokenWidth((d.w + d.r + d.l) * this.scl);
    if (this.rect.width() < b) {
        this.rect.setWidth(b, 0)
    }
    Event.trigger(this, "resized", this)
};
TextItem.prototype.rebuildTokens = function () {
    if (this.state != "ready") {
        return
    }
    clearNode(this.tokensNode);
    var o = TextItem.getCachedMetrics(this.font_id);
    var r = TextItem.getSpaceWidth(this.font_id);
    var n = this.tokens;
    var d = (this.paddings = {
        t: 0,
        r: 0,
        b: 0,
        l: 0,
        w: 0
    });
    var q = this.scl;
    var b = countingSemaphore(n.length, function () {
        yield(this.redraw, this)
    }, this);
    this.cleaner.push(b);
    var h = this.color;
    var p = this.bgColor;
    var s = {
        font_id: this.font_id,
        point: this.point,
        color: h,
        ".out": "png"
    };
    setNode(this.bgColorNode, null, {
        backgroundColor: p
    });
    for (var l = 0; l < n.length; ++l) {
        var g = n[l];
        var a = g.word;
        var f = o.get(a);
        d.t = Math.max(d.t, f.mt);
        d.r = Math.max(d.r, f.mr);
        d.b = Math.max(d.b, f.mb);
        d.l = Math.max(d.l, f.ml);
        d.w = Math.max(d.w, f.w - (f.mr + f.ml));
        s.text = a;
        var k = buildImgURL("img-text.bg", s);
        var c = (Math.round(f.h * q) - Math.round(f.mt * q) - Math.round(f.mb * q)) - Math.round((f.h - f.mt - f.mb) * q);
        var j = createXImg();
        Event.addSingleUseListener(j, "load", b);
        j.setSrc(k);
        setNode(j.getNode(), {
            src: k,
            title: a
        }, {
            width: px(f.w * q),
            height: px(f.h * q),
            marginLeft: px(-f.ml * q),
            marginRight: px(-f.mr * q + r * q),
            marginTop: px(-f.mt * q),
            marginBottom: px(-(c + f.mb * q))
        });
        g.node = this.tokensNode.appendChild(j.getNode())
    }
    setNode(this.tokensNode, null, {
        padding: [d.t * q, d.r * q, d.b * q, d.l * q].map(px).join(" ")
    });
    this.setMinTokenWidth((d.w + d.r + d.l) * q);
    this.redraw()
};
TextItem.prototype.setMinTokenWidth = function (a) {
    a = a + 1;
    this._minTokenWidth = a;
    if (this.rect.width() < a) {
        this.rect.setWidth(a, 0);
        Event.trigger(this, "resized", this);
        this.redraw()
    }
};
TextItem.prototype.getResizeHandles = function () {
    return ["e", "w", "nw", "ne", "sw", "se"]
};
TextItem.prototype.getRect = function () {
    if (this.selectNode) {
        setNode(this.selectNode, null, {
            width: px(this.rect.width())
        });
        var a = this.selectNode.clientHeight;
        if (a && this.rect.height() != a) {
            this.rect.setHeight(a, 0);
            Event.trigger(this, "resized", this)
        }
    }
    return TextItem.superclass.getRect.call(this)
};
TextItem.prototype.flip = TextItem.prototype.flop = noop;
TextItem.prototype.setOpacity = function (a) {
    this.opacity = a;
    this.redraw();
    Event.trigger(this, "change")
};

function AmazonMP3Item(a) {
    AmazonMP3Item.superclass.constructor.call(this, a);
    this.data = a;
    this.img = createXImg();
    this.selectNode.appendChild(this.img.getNode());
    this.img.setSrc(a.imgurl)
}
extend(AmazonMP3Item, Item);
AmazonMP3Item.prototype.getActions = function () {
    return {}
};
AmazonMP3Item.prototype.freeze = function () {
    var a = AmazonMP3Item.superclass.freeze.call(this);
    a = mergeObject(a, {
        type: Item.TYPES.AMAZON_MP3,
        asin: this.data.asin,
        title: this.data.title,
        artist: this.data.artist,
        imgurl: this.data.imgurl,
        url: this.data.url
    });
    return a
};
AmazonMP3Item.prototype.getIcon = function () {
    return UI.AmazonMP3Render(this.data, "li")
};
AmazonMP3Item.prototype.getInfo = function () {
    if (this.data) {
        var b = this.data;
        var a = [];
        if (b.title) {
            a.push(createNode("div", null, null, teaser(b.title, 100)));
            a.push(createNode("div", {
                className: "meta"
            }, null, teaser(b.artist, 100)))
        }
        if (b.url) {
            a.push(createNode("span", {
                className: "interactive"
            }, null, UI.faviconLink(b, "_blank")))
        }
        return a
    }
    return null
};
AmazonMP3Item.prototype.redraw = function () {
    this.node.style.cssText = this.node.style.cssText.replace(/left:[^p]*px/i, "left:" + round(this.rect.x1 + this.translation.x, 0.001) + "px").replace(/top:[^p]*px/i, "top:" + round(this.rect.y1 + this.translation.y, 0.001) + "px").replace(/z-index:[ .0-9]*\b/i, "z-index:" + (this.z === undefined ? "" : this.z));
    this.img.setSize(this.rect)
};
AmazonMP3Item.prototype.flip = AmazonMP3Item.prototype.flop = noop;

function PlaceholderItem(a) {
    this._setContentCleaner = new Cleaner();
    PlaceholderItem.superclass.constructor.call(this, a);
    this.selectNode.appendChild(createNode("div", {
        className: "bg"
    }));
    this.dropHint = a.dropHint;
    this.hintNode = this.selectNode.appendChild(createNode("div", {
        className: "ph_hint"
    }, null, this.dropHint || loc("Drag item here")));
    makeUnselectable(this.hintNode);
    this._updateHintNodeFontSize();
    addClass(this.node, "placeholder");
    this._clearContent();
    if (a.content) {
        this.setContent(Item.thaw(a.content))
    }
    this.setSelectable(true);
    Event.addListener(this.node, "dragenter", this._onDragEnter, this);
    Event.addListener(this.node, "dragleave", this._onDragLeave, this)
}
extend(PlaceholderItem, Item);
PlaceholderItem.prototype.destruct = function () {
    this._clearContent();
    if (this.sliderSize) {
        this.sliderSize.destruct();
        this.sliderSize = null
    }
    if (this.sliderAspect) {
        this.sliderAspect.destruct();
        this.sliderAspect = null
    }
    this._setContentCleaner.clean();
    PlaceholderItem.superclass.destruct.call(this)
};
PlaceholderItem.prototype.freeze = function () {
    var a = this.getRect().XYWH();
    a.z = this.z;
    a.transform = this.matrix.freeze();
    a.type = Item.TYPES.PLACEHOLDER;
    if (this._content) {
        a.content = this._content.freeze()
    }
    if (this.dropHint) {
        a.dropHint = this.dropHint
    }
    return a
};
PlaceholderItem.prototype.redraw = function () {
    var c = this.node.style;
    c.left = round(this.rect.x1 + this.translation.x, 0.001) + "px";
    c.top = round(this.rect.y1 + this.translation.y, 0.001) + "px";
    c.zIndex = this.z === undefined ? "" : this.z;
    var a = round(this.rect.width()) + "px";
    var b = round(this.rect.height()) + "px";
    this.selectNode.style.width = a;
    this.selectNode.style.height = b
};
PlaceholderItem.prototype.clearContent = function () {
    var a = this._content;
    this._clearContent();
    if (a) {
        Event.trigger(this, "removeitem", a);
        Event.trigger(this, "change");
        return a
    }
    return null
};
PlaceholderItem.prototype._clearContent = function () {
    this._percentMap = null;
    addClass(this.selectNode, "empty");
    show(this.hintNode);
    if (this._content) {
        delete this._content.placeholder;
        this.selectNode.removeChild(this._content.getNode());
        Event.release(this._content);
        this._content.destruct();
        this.unselectable = true;
        this._content = null
    }
};
PlaceholderItem.prototype.setContent = function (c, b) {
    if (!c || c == this._content) {
        return
    }
    this._setContentCleaner.clean();
    if (c.rect.width() === 0) {
        this._setContentCleaner.push(Event.addSingleUseListener(c, "sized", function () {
            this._setContent(c, b)
        }, this))
    } else {
        if (c instanceof TextItem && !c.computeFontMetrics()) {
            var a = Event.addSingleUseListener(c, "metricsuptodate", function () {
                var d = c;
                c = null;
                this._setContent(d, b)
            }, this);
            this._setContentCleaner.push(function () {
                a.clean();
                if (c) {
                    c.destruct()
                }
            })
        } else {
            this._setContent(c, b)
        }
    }
};
PlaceholderItem.prototype._setContent = function (c, a) {
    this._clearContent();
    this.selectNode.appendChild(c.getNode());
    this._content = c;
    c.placeholder = this;
    if (a) {
        this._fitContent()
    } else {
        this._content.redraw()
    }
    this._content.unselectable = true;
    this.unselectable = false;
    var b = function () {
            if (c == this._content) {
                var f;
                var d;
                if (c.rect.aspect() > 1) {
                    d = c.getMinWidth();
                    f = 2 * this.rect.height() / c.rect.aspect()
                } else {
                    d = Math.max(c.getMinWidth(), c.getMinHeight() / c.rect.aspect());
                    f = 2 * this.rect.width()
                }
                this._percentMap.setMax(f);
                this._percentMap.setMin(d)
            }
        };
    Event.addListener(c, "change", b, this);
    this._percentMap = new PercentMap();
    b.apply(this);
    Event.addListener(c, "resized", function (d) {
        if (this.sliderSize) {
            this.sliderSize.setValue(this._percentMap.getPct(this._content.rect.width()) * 100)
        }
    }, this);
    Event.addListener(c, "updateactions", function () {
        var d = [this, "updateactions"].concat(toArray(arguments));
        Event.trigger.apply(null, d)
    }, this);
    hide(this.hintNode);
    removeClass(this.selectNode, "empty");
    if (c instanceof TextItem) {
        Event.addListener(this._content, "metricsuptodate", this._fitContent, this)
    }
    Event.addListener(c, "change", this._setContentCleaner.clean, this._setContentCleaner);
    Event.trigger(this, "additem", this._content);
    Event.trigger(this, "change")
};
PlaceholderItem.prototype.hasContent = function () {
    return !!this._content
};
PlaceholderItem.prototype.getContent = function () {
    return this._content
};
PlaceholderItem.prototype.fitContent = function () {
    if (this._fitContent()) {
        Event.trigger(this, "resized");
        Event.trigger(this, "change");
        return true
    }
    return false
};
PlaceholderItem.prototype._fitContent = function () {
    var h = this._content;
    if (!h) {
        return false
    }
    var a = h.getRect();
    var g = this.getRect();
    var f = g.width() / a.width();
    var c = g.height() / a.height();
    if (h.shouldConstrainAspect()) {
        f = (c = Math.min(f, c))
    }
    if (f != 1 || c != 1) {
        h.beginResize();
        h.scale({
            x: f,
            y: c
        });
        h.endResize()
    }
    a = h.getRect();
    var d = (g.width() - a.width()) / 2 - a.left();
    var b = (g.height() - a.height()) / 2 - a.top();
    if (d !== 0 || b !== 0) {
        h.move(d, b)
    }
    return round(f + d + b, 0.001) != 1
};
PlaceholderItem.prototype.select = function () {
    if (this._content && this.droppable) {
        this._content.select()
    } else {
        PlaceholderItem.superclass.select.call(this)
    }
};
PlaceholderItem.prototype.unselect = function () {
    if (this._content && this.droppable) {
        this._content.unselect()
    } else {
        PlaceholderItem.superclass.unselect.call(this)
    }
};
PlaceholderItem.prototype.beginMove = function (b) {
    if (this._content && this.droppable) {
        var a = this._content.getRect();
        this.xMin = -a.width() / 2 + 10;
        this.xMax = this.rect.width() + a.width() / 2 - 10;
        this.yMin = -a.height() / 2 + 10;
        this.yMax = this.rect.height() + a.height() / 2 - 10;
        this._content.beginMove()
    } else {
        PlaceholderItem.superclass.beginMove.call(this)
    }
};
PlaceholderItem.prototype.endMove = function () {
    if (this._content && this.droppable) {
        var a = this._content.endMove();
        if (a) {
            Event.trigger(this, "change")
        }
        return a
    } else {
        return PlaceholderItem.superclass.endMove.call(this)
    }
};
PlaceholderItem.prototype.move = function (d, b, a, h) {
    if (this._content && this.droppable && !h) {
        var c = this.matrix.inverse().transform(d, b);
        var g, f;
        if (a) {
            if (!this._content.translationStart) {
                return
            }
            g = this._content.translationStart.x + c.x;
            f = this._content.translationStart.y + c.y
        } else {
            g = this._content.translation.x + c.x;
            f = this._content.translation.y + c.y
        }
        g = Math.min(this.xMax, Math.max(this.xMin, g));
        f = Math.min(this.yMax, Math.max(this.yMin, f));
        this._content.move(g - this._content.translation.x, f - this._content.translation.y, false)
    } else {
        PlaceholderItem.superclass.move.apply(this, arguments)
    }
};
PlaceholderItem.prototype.shouldConstrainAspect = function () {
    return false
};
PlaceholderItem.prototype.endResize = function (b) {
    Event.bundleEvents(this, "change");
    var a = PlaceholderItem.superclass.endResize.call(this);
    if (a && this._content && b !== false) {
        this._fitContent();
        this._content.redraw()
    }
    Event.unbundleEvents(this, "change");
    return a
};
PlaceholderItem.prototype.setScale = function (c, a, f, b) {
    var g;
    var d = {
        x: this.rect.width() / 2,
        y: this.rect.height() / 2
    };
    this.beginResize();
    this.scale(c, a, f, b);
    g = this.endResize(false);
    if (g && this._content) {
        this._content.setScale.call(this._content, c, d, f, b);
        this._content.move(this.rect.width() / 2 - d.x, this.rect.height() / 2 - d.y)
    }
    return g
};
PlaceholderItem.prototype.scale = function (c, a, d, b) {
    PlaceholderItem.superclass._scale.call(this, c, a, b);
    this.redraw();
    this._updateHintNodeFontSize()
};
PlaceholderItem.prototype._updateHintNodeFontSize = function () {
    if (Browser.type("IE", null, 8)) {
        return
    }
    var a = mapRange(Math.min(this.rect.width(), this.rect.height()), [0, 50, 120, 10000], [0.7, 0.7, 1.5, 1.5]);
    a = round(a, 0.01) + "em";
    setNode(this.hintNode, null, {
        fontSize: a
    })
};
PlaceholderItem.prototype.getIcon = function () {
    if (this._content && this.droppable) {
        return this._content.getIcon()
    }
    return null
};
PlaceholderItem.prototype.getInfo = function () {
    if (this._content && this.droppable) {
        var d = [];
        if (this.sliderSize) {
            this.sliderSize.destruct()
        }
        var m = this.getIcon();
        setNode(m, {
            className: "right smaller_icon",
            width: null,
            height: null
        }, {
            width: null,
            height: null
        });
        var a = this.getIcon();
        setNode(a, {
            className: "right"
        });
        var l = (this.sliderSize = Slider.create({
            nubDim: 4.5
        }));
        addClass(l.getNode(), "interactive right sliderSize");
        d.push(createNode("div", {
            className: "ph_controls"
        }, null, [a, l.getNode(), m, '<br class="clear">']));
        var n = this._content.rect.width();
        l.setValue(this._percentMap.getPct(n) * 100);
        Event.addListener(this._content, "change", function () {
            l.setValue(this._percentMap.getPct(this._content.rect.width()) * 100)
        }, this);
        Event.addListener(l, "beginslide", function () {
            this._content.beginResize();
            n = this._content.rect.width()
        }, this);
        Event.addListener(l, "change", function (q, s) {
            var r = Number(l.getValue()) / 100;
            if (!r && r !== 0) {
                return
            }
            if (!l.sliding()) {
                this._content.beginResize()
            }
            var p = this._percentMap.getValue(r) / n;
            var o = this._content.rectStart;
            if (this._content.translation.x + p * o.width() / 2 < 10 || this._content.translation.x - p * o.width() / 2 > this.rect.width() - 10 || this._content.translation.y + p * o.height() / 2 < 10 || this._content.translation.y - p * o.height() / 2 > this.rect.height() - 10) {
                l.setValue(s);
                return
            }
            this._content.scale({
                x: p,
                y: p
            }, {
                x: this._content.translation.x,
                y: this._content.translation.y
            });
            if (!l.sliding()) {
                if (this._content.endResize()) {
                    Event.trigger(this, "change")
                }
            }
        }, this);
        Event.addListener(l, "endslide", function () {
            if (this._content.endResize()) {
                Event.trigger(this, "change")
            }
        }, this);
        if (this._content instanceof TextItem) {
            if (this.sliderAspect) {
                this.sliderAspect.destruct()
            }
            var h = (this.sliderAspect = Slider.create({
                nubDim: 4.5
            }));
            addClass(h.getNode(), "interactive right sliderAspect");
            d.push(createNode("div", {
                className: "ph_controls"
            }, null, [createNode("ul", {
                className: "right wider"
            }, null, "---".split("").map(function (o) {
                return createNode("li", null, null, o)
            })), h.getNode(), createNode("ul", {
                className: "right taller"
            }, null, "---".split("").map(function (o) {
                return createNode("li", null, null, o)
            })), '<br class="clear">']));
            var c = this._content.rect.width();
            var j = 0;
            this._content.getLineMetrics().forEach(function (o) {
                j += o.width
            });
            var g = new PercentMap({
                min: this._content.getMinWidth(),
                max: j
            });
            h.setValue(g.getPct(c) * 100);
            Event.addListener(this._content, "change", function () {
                var o = 0;
                this._content.getLineMetrics().forEach(function (p) {
                    o += p.width
                });
                g.setMax(o);
                g.setMin(this._content._minTokenWidth);
                h.setValue(g.getPct(this._content.rect.width()) * 100)
            }, this);
            Event.addListener(h, "beginslide", function () {
                this._content.beginResize();
                c = this._content.rect.width()
            }, this);
            Event.addListener(h, "change", function (p, r) {
                var q = Number(h.getValue()) / 100;
                if (!q && q !== 0) {
                    return
                }
                if (!h.sliding()) {
                    this._content.beginResize()
                }
                var o = g.getValue(q) / c;
                this._content.scale({
                    x: o,
                    y: 1
                }, {
                    x: this._content.translation.x,
                    y: this._content.translation.y
                }, {
                    location: "w"
                }, false);
                if (!h.sliding()) {
                    if (this._content.endResize()) {
                        Event.trigger(this, "change")
                    }
                }
            }, this);
            Event.addListener(h, "endslide", function () {
                if (this._content.endResize()) {
                    Event.trigger(this, "change")
                }
            }, this)
        }
        var b = toArray(this._content.getInfo());
        if (b.length) {
            d = d.concat(b)
        }
        return d
    } else {
        var k = createNode("input", {
            name: "drophint",
            type: "text",
            maxlength: 100,
            className: "interactive"
        });
        var f = this.dropHint;
        Event.addListener(k, "keypress", function () {
            yield(function () {
                this.dropHint = k.value.trim();
                setNode(this.hintNode, null, null, this.dropHint || this.defaultDropHint)
            }, this)
        }, this);
        Event.addListener(k, "blur", function () {
            if (this.dropHint != f) {
                Event.trigger(this, "change")
            }
        }, this);
        InputHint.add(k, textContent(this.hintNode));
        if (this.dropHint) {
            InputHint.setValue(k, this.dropHint)
        }
        return [createNode("label", {
            "for": "drophint"
        }, {
            paddingRight: "4px"
        }, loc("Hint")), k]
    }
};
PlaceholderItem.prototype.getActions = function () {
    if (this._content && this.droppable) {
        var b = {
            fit_btn: {
                method: Event.wrapper(this.fitContent, this)
            }
        };
        var a = this._content.getActions();
        if (a.flop_btn) {
            b.flop_btn = a.flop_btn;
            b.flop_btn.method = Event.wrapper(this.flop, this)
        }
        if (a.flip_btn) {
            b.flip_btn = a.flip_btn;
            b.flip_btn.method = Event.wrapper(this.flip, this)
        }
        if (a.hidebkgd_btn) {
            b.hidebkgd_btn = a.hidebkgd_btn;
            b.hidebkgd_btn.method = Event.wrapper(function () {
                this.mask(false)
            }, this)
        }
        if (a.showbkgd_btn) {
            b.showbkgd_btn = a.showbkgd_btn;
            b.showbkgd_btn.method = Event.wrapper(function () {
                this.mask(true)
            }, this)
        }
        return b
    } else {
        return {}
    }
};
PlaceholderItem.prototype.flop = function () {
    if (this._content && this.droppable) {
        this._content.flop();
        Event.trigger(this, "change");
        Event.trigger(this, "flopped", this)
    }
};
PlaceholderItem.prototype.flip = function () {
    if (this._content && this.droppable) {
        this._content.flip();
        Event.trigger(this, "change");
        Event.trigger(this, "flipped", this)
    }
};
PlaceholderItem.prototype.mask = function (a) {
    if (this._content && this.droppable) {
        this._content.mask(a);
        Event.trigger(this, "resized", this);
        Event.trigger(this, "updateactions", this);
        Event.trigger(this, "change")
    }
};
PlaceholderItem.prototype._onDrop = function (b) {
    var c = b.xDataTransfer.getData("item");
    if (!c || (c.type && c.type != Item.TYPES.IMAGE && c.type != Item.TYPES.AMAZON_MP3 && (!bucketIs("launch", "on") || c.type != Item.TYPES.TEXT) && c.type != Item.TYPES.FB_PHOTO && c.type != Item.TYPES.COLORBLOCK)) {
        return
    }
    Event.bundleEvents(this, "change");
    var a = Item.thaw(c);
    if (c.mask) {
        a.mask(false)
    }
    this.setContent(a, true);
    this.droppable = true;
    Event.unbundleEvents(this, "change");
    removeClass(this.selectNode, "drophover");
    return Event.stop(b)
};
PlaceholderItem.prototype._onDragEnter = function (a) {
    if (this.droppable && a.xDataTransfer && a.xDataTransfer.getData("item")) {
        addClass(this.selectNode, "drophover")
    }
};
PlaceholderItem.prototype._onDragLeave = function (a) {
    if (this.droppable) {
        removeClass(this.selectNode, "drophover")
    }
};
PlaceholderItem.prototype.setSelectable = function (a) {
    if (a) {
        Event.removeListener(this.node, "drop", this._onDrop, this);
        this.defaultDropHint = loc("Placeholder");
        removeClass(this.node, "droppable");
        setNode(this.hintNode, null, null, this.dropHint || this.defaultDropHint);
        this.droppable = false;
        this.unselectable = false;
        if (this._content) {
            addClass(this.selectNode, "empty");
            show(this.hintNode);
            setNode(this._content.selectNode, null, {
                visibility: "hidden"
            })
        }
    } else {
        Event.addListener(this.node, "drop", this._onDrop, this);
        addClass(this.node, "droppable");
        removeClass(this.selectNode, "drophover");
        this.defaultDropHint = loc("Drag item here");
        setNode(this.hintNode, null, null, this.dropHint || this.defaultDropHint);
        this.droppable = true;
        this.unselectable = !this._content;
        if (this._content) {
            this._content.unselect();
            removeClass(this.selectNode, "empty");
            hide(this.hintNode);
            setNode(this._content.selectNode, null, {
                visibility: "visible"
            })
        }
    }
};
PlaceholderItem.prototype.getResizeHandles = function () {
    return (this._content && this.droppable) ? [] : PlaceholderItem.superclass.getResizeHandles.call(this)
};
PlaceholderItem.prototype.getRotateHandles = function () {
    return (this._content && this.droppable) ? [] : PlaceholderItem.superclass.getRotateHandles.call(this)
};

function SimpleImageItem(b) {
    this.src = b.src;
    SimpleImageItem.superclass.constructor.call(this, b);
    this.img = createXImg();
    this.selectNode.appendChild(this.img.getNode());
    this.updateImage();
    var a = 3;
    Event.addListener(this.img, "error", function () {
        a--;
        if (a) {
            this.img.setSrc("");
            window.setTimeout(Event.wrapper(function () {
                this.updateImage()
            }, this), 200)
        }
    }, this);
    if (!this.rect.width()) {
        getNaturalWidthHeight(b.imgurl, Event.wrapper(function (c, d) {
            if (c && d) {
                b.w = c;
                b.h = d
            } else {
                b.w = 200;
                b.h = 200
            }
            b.x = 0;
            b.y = 0;
            this.rect = new Rect(-b.w / 2, -b.h / 2, b.w / 2, b.h / 2);
            this.translation = new Point(b.x + b.w / 2, b.y + b.h / 2);
            this.aspect = Number(b.a || this.rect.aspect());
            Event.trigger(this, "change");
            Event.trigger(this, "sized", this)
        }, this))
    }
}
extend(SimpleImageItem, Item);
SimpleImageItem.prototype.getActions = function () {
    return []
};
SimpleImageItem.prototype.getIcon = function () {
    var a = UI.sizeMap.li.dim;
    return createNode("img", {
        width: a,
        height: a,
        src: this.src
    }, {
        width: px(a),
        height: px(a)
    })
};
SimpleImageItem.prototype.computeImgURL = function (b, a) {
    return this.src
};
SimpleImageItem.prototype.updateImage = function () {
    this.img.setSrc(this.computeImgURL())
};
SimpleImageItem.prototype.redraw = function () {
    this.node.style.cssText = this.node.style.cssText.replace(/left:[^p]*px/i, "left:" + round(this.rect.x1 + this.translation.x, 0.001) + "px").replace(/top:[^p]*px/i, "top:" + round(this.rect.y1 + this.translation.y, 0.001) + "px").replace(/z-index:[ .0-9]*\b/i, "z-index:" + (this.z === undefined ? "" : this.z));
    this.img.setSize(this.rect)
};

function ColorBlockItem(a) {
    a.w = Number(a.w || 0);
    a.h = Number(a.h || 0);
    a.x = Number(a.x || 0);
    a.y = Number(a.y || 0);
    if (!a.w || !a.h) {
        a.h = 200;
        a.w = 200
    }
    ColorBlockItem.superclass.constructor.call(this, a);
    this.data = a;
    this.color = this.data.color || "#00000000";
    this.title = this.data.title;
    this.clid = this.data.clid;
    this.opacity = this.data.opacity;
    this.canvas = createNode("div", null, {
        backgroundColor: this.color,
        width: "100%",
        height: "100%"
    });
    this.selectNode.appendChild(this.canvas);
    yield(this.redraw, this)
}
extend(ColorBlockItem, Item);
ColorBlockItem.prototype.getActions = function () {
    var a = {
        square_btn: {
            method: Event.wrapper(this.makeSquare, this)
        }
    };
    return a
};
ColorBlockItem.prototype.redraw = function () {
    ColorBlockItem.superclass.redraw.call(this);
    if (this.opacity) {
        setNode(this.canvas, null, {
            opacity: this.opacity
        })
    }
};
ColorBlockItem.prototype.freeze = function () {
    var a = ColorBlockItem.superclass.freeze.call(this);
    a = mergeObject(a, {
        type: Item.TYPES.COLORBLOCK,
        color: this.color,
        clid: this.clid,
        title: this.title,
        opacity: this.opacity
    });
    return a
};
ColorBlockItem.prototype.getIcon = function () {
    var a = UI.sizeMap.i.dim;
    return createNode("span", {
        className: "coloricon"
    }, {
        backgroundColor: this.color,
        width: px(a),
        height: px(a),
        marginBottom: px(4),
        marginRight: px(4)
    })
};
ColorBlockItem.getUrl = function (c) {
    var b = "http://www.colourlovers.com/";
    var a = c.color.substring(1);
    if (a.length == 1) {
        a = a + a + a + a + a + a
    } else {
        if (a.length == 2) {
            a = a + a + a
        } else {
            if (a.length == 3) {
                a = a + a
            }
        }
    }
    b += "color/" + a;
    return b
};
ColorBlockItem.prototype.getInfo = function () {
    if (this.data) {
        var c = this.data;
        var a = [];
        var f = this.getOpacityControl();
        if (f) {
            a.push(createNode("div", null, {
                clear: "both"
            }, f))
        }
        var d = createNode("div", null, {
            "float": "right",
            clear: "both"
        }, this.data.title || this.color);
        a.push(d);
        var b = outboundLink({
            href: ColorBlockItem.getUrl(this.data)
        }, null, "colourlovers.com");
        a.push(createNode("div", {
            className: "interactive"
        }, {
            clear: "both"
        }, b));
        return a
    }
    return null
};
ColorBlockItem.prototype.setColor = function (a) {
    if (this.color == a) {
        return
    }
    this.color = a;
    setNode(this.canvas, null, {
        backgroundColor: this.color
    });
    Event.trigger(this, "updateactions", this)
};
ColorBlockItem.prototype.scale = function (c, a, d, b) {
    d = d || {};
    if (b) {
        ColorBlockItem.superclass.scale.apply(this, arguments)
    } else {
        switch (d.location) {
        case "w":
        case "e":
            c.y = 1;
            break;
        case "n":
        case "s":
            c.x = 1;
            break;
        default:
        }
        this._scale(c, a, b);
        this.redraw()
    }
};
ColorBlockItem.prototype.shouldConstrainAspect = function () {
    return false
};
ColorBlockItem.prototype.getResizeHandles = function () {
    return ["n", "s", "e", "w", "nw", "ne", "se", "sw"]
};
ColorBlockItem.prototype.flip = ColorBlockItem.prototype.flop = noop;
ColorBlockItem.prototype.makeSquare = function () {
    var a = {
        x: 1,
        y: 1
    };
    this.beginResize();
    if (this.rect.width() < this.rect.height()) {
        a.x = this.rect.height() / this.rect.width()
    } else {
        a.y = this.rect.width() / this.rect.height()
    }
    this._scale(a, this.translation, false);
    this.redraw();
    this.endResize()
};
ColorBlockItem.prototype.setOpacity = function (a) {
    this.opacity = a;
    this.redraw();
    Event.trigger(this, "change")
};
var ModalDialog = function () {
        setDefaultEmbedWMode("opaque");
        var c;
        var f;
        var b;
        var h;
        var a;
        var d = false;

        function g() {
            if (c) {
                return
            }
            h = createNode("div", {
                className: "close"
            }, null, "&times;");
            b = createNode("span", {
                className: "container"
            }, null, h);
            f = createNode("center", {
                className: "dialog"
            }, {
                display: "none"
            }, b);
            c = createNode("div", {
                className: "block"
            }, {
                display: "none"
            });
            document.body.appendChild(c);
            document.body.appendChild(f);
            Event.addListener(document, "keydown", function (j) {
                if (j.keyCode == 27 && d) {
                    ModalDialog.hide();
                    return Event.stop(j)
                }
            });
            Event.addListener(window, "resize", ModalDialog.rePosition)
        }
        return {
            init: g,
            isShown: function () {
                return d
            },
            getContent: function () {
                if (!d) {
                    return null
                }
                return a
            },
            setContent: function (j) {
                if (!d) {
                    return
                }
                g();
                a = j;
                while (b.childNodes.length) {
                    b.removeChild(b.childNodes[0])
                }
                setNode(b, null, null, flatten([h, a]));
                Event.addSingleUseListener(h, "click", ModalDialog.hide);
                ModalDialog.rePosition()
            },
            show: function (j) {
                g();
                d = true;
                ModalDialog.setContent(j);
                ModalDialog.reRaise();
                show(c);
                show(f);
                ModalDialog.rePosition();
                yield(ModalDialog.rePosition);
                Event.trigger(ModalDialog, "show");
                return false
            },
            reRaise: function () {
                if (!d) {
                    return
                }
                var j = overlayZIndex();
                setNode(c, null, {
                    zIndex: j
                });
                setNode(f, null, {
                    zIndex: j + 1
                })
            },
            rePosition: function () {
                if (!d) {
                    return
                }
                var l = Dim.fromNode(f);
                var j = getWindowSize();
                if (j.h > l.h) {
                    var k = Math.min((j.h - l.h) / 3, 50);
                    setNode(f, null, {
                        position: "fixed",
                        top: px(k)
                    })
                } else {
                    var m = scrollXY();
                    setNode(f, null, {
                        position: "absolute",
                        top: px(m.y)
                    })
                }
            },
            hide: function (j) {
                if (!d) {
                    return
                }
                g();
                j = j || (j === undefined);
                setNode(f, null, {
                    display: "none"
                });
                setNode(c, null, {
                    display: "none"
                });
                if (a) {
                    b.removeChild(a);
                    if (j) {
                        Event.trigger(a, "destruct");
                        purge(a)
                    }
                    a = null
                }
                d = false;
                Event.trigger(ModalDialog, "hide")
            },
            createErrorElement: function (j) {
                return {
                    type: "rotext",
                    id: j,
                    className: "error",
                    rowClassName: "error_placeholder"
                }
            },
            show_uic: function (k) {
                k = k || {};
                if (k.constructor !== Object) {
                    k = {
                        body: k
                    }
                }
                k.id = k.id || "";
                k.className = k.className || "";
                var l = createNode("div", {
                    id: k.id,
                    className: "uic " + k.className
                });
                var j = l.appendChild(createNode("div", {
                    className: "body"
                }));
                if (k.title) {
                    j.appendChild(createNode("h2", null, null, k.title))
                }
                if (k.body) {
                    j.appendChild(k.body)
                }
                if (k.actions && k.actions.length > 0) {
                    l.appendChild(UI.renderActions(k.actions))
                }
                if (k.onHide) {
                    Event.addSingleUseListener(ModalDialog, "hide", k.onHide)
                }
                ModalDialog.show(l)
            },
            alert: function (j) {
                j = j || {};
                if (j.constructor !== Object) {
                    j = {
                        title: j
                    }
                }
                j.className = (j.className || "") + " alert";
                j.actions = [{
                    label: createNode("span", {
                        className: "btn btn_action"
                    }, null, j.okLabel || loc("OK")),
                    action: function () {
                        (j.onOk || noop)();
                        ModalDialog.hide()
                    }
                }];
                return ModalDialog.show_uic(j)
            },
            confirm: function (j) {
                j = j || {};
                if (j.constructor !== Object) {
                    j = {
                        title: j
                    }
                }
                j.className = (j.className || "") + " confirm";
                j.actions = [{
                    label: createNode("span", {
                        className: "btn btn_action"
                    }, null, j.okLabel || loc("OK")),
                    action: function () {
                        (j.onOk || noop)();
                        ModalDialog.hide()
                    }
                }, {
                    label: j.cancelLabel || loc("Cancel"),
                    action: function () {
                        (j.onCancel || noop)();
                        ModalDialog.hide()
                    }
                }];
                return ModalDialog.show_uic(j)
            }
        }
    }();

function TabBox(a, b) {
    b = b || {};
    this.node = d;
    this.tabs = new Set();
    this.selected = null;
    this.autoAdjustTabDim = b.autoAdjustTabDim;
    var c = ["tabpanel", b.className || "", this.autoAdjustTabDim ? (this.tabpanelClassName = Dom.uniqueId()) : ""].join(" ");
    var d = createNode("div", {
        className: c
    });
    a.appendChild(d);
    this.tabsNode = d.appendChild(createNode("div", {
        className: "tabs",
        trackcontext: "tabs"
    }));
    if (b.allowNewTab) {
        this.newTab = createNode("span", {
            id: "newtab",
            className: "tab",
            trackelement: "new_tab",
            href: "#foo",
            title: loc("Open a new tab")
        }, null, "+");
        this.tabsNode.appendChild(this.newTab);
        Event.addListener(this.newTab, "click", function (f) {
            Event.trigger(this, "newtab");
            Event.stop(f)
        }, this);
        makeUnselectable(this.newTab)
    }
    this.brClear = this.tabsNode.appendChild(createNode("br", {
        className: "clear"
    }));
    this.content = d.appendChild(createNode("div", {
        className: "panels" + (b.bordered ? " bordered" : ""),
        trackcontext: "resultset",
        trackelement: "resultset"
    }));
    Event.addListener(window, "resize", this.adjustTabDim, this)
}
TabBox.prototype.unshiftTab = function (a) {
    this.addTab(a, this.tabsNode.childNodes[0])
};
TabBox.prototype.addTab = function (a, b) {
    if (this.autoAdjustTabDim) {
        addClass(a.getTabNode(), "auto")
    }
    this.addHeaderNode(a.getTabNode(), b);
    Event.addListener(a, "select", function () {
        this.onSelect(a)
    }, this);
    if (a.closable()) {
        Event.addListener(a, "close", function () {
            this.removeTab(a)
        }, this)
    }
    makeUnselectable(a.getTabNode());
    this.content.appendChild(a.getPanelNode());
    this.tabs.put(a);
    if (a.initiallySelected()) {
        this.select(a)
    }
    this.adjustTabDim()
};
TabBox.prototype.addHeaderNode = function (b, a) {
    a = a || this.newTab || this.brClear;
    if (a) {
        this.tabsNode.insertBefore(b, a)
    } else {
        this.tabsNode.appendChild(b)
    }
};
TabBox.prototype.removeTab = function (c) {
    var d = c.getTabNode();
    removeClass(c.getTabNode(), "auto");
    var b = 0;
    for (; b < this.tabsNode.childNodes.length; ++b) {
        if (this.tabsNode.childNodes[b] == d) {
            this.tabsNode.removeChild(d);
            break
        }
    }
    this.content.removeChild(c.getPanelNode());
    this.tabs.remove(c);
    c.destruct();
    if (c == this.selected) {
        var a = this.tabs.values();
        if (a && a.length) {
            if (a.length <= b) {
                b = a.length - 1
            }
            this.select(a[b])
        }
    }
    this.adjustTabDim()
};
TabBox.prototype.adjustTabDim = function () {
    if (this.autoAdjustTabDim) {
        var a = 100000;
        this.tabs.forEach(function (b) {
            var c = b.getTabNode();
            a = Math.min(a, Dim.fromNode(c).h)
        });
        editCSSRule("." + this.tabpanelClassName + ".tabpanel > .tabs > .tab.auto", {
            height: px(a - 9)
        })
    }
};
TabBox.prototype.select = function (a) {
    Event.trigger(a, "select", a)
};
TabBox.prototype.onSelect = function (a) {
    if (!a) {
        return
    }
    if (this.selected) {
        if (a == this.selected) {
            return
        } else {
            this.selected.hide()
        }
    }
    a.show();
    Event.trigger(this, "select", a);
    this.selected = a
};
TabBox.prototype.add = function (a) {
    a.forEach(function (b) {
        this.addTab(b)
    }, this)
};
TabBox.prototype.clear = function () {
    clearNode(node);
    this.tabs.clear()
};

UI = {};
UI.maybeRenderMore = function (d) {
    var f = $_(d.moreNode);
    var a = $_(d.contentNode);
    var c = d.moreOnClick;
    if (!f || !a) {
        return
    }
    var b = function () {
            var g = function () {
                    setNode(a, null, {
                        maxHeight: "none"
                    });
                    hide(f)
                };
            if (a.clientHeight === 0 || a.scrollHeight - a.clientHeight <= 17) {
                g()
            } else {
                f.innerHTML = loc("more") + "...";
                show(f);
                Event.addListener(f, "click", function (h) {
                    Event.stop(h);
                    if (c) {
                        c()
                    } else {
                        g()
                    }
                })
            }
        };
    if (a.scrollHeight === 0 && a.clientHeight === 0) {
        Event.addListener(document, "modifiable", b)
    } else {
        b()
    }
};
var URI_PATH_CHARS = "[a-z0-9\\-~_.!*'();@&=+$,\\/?%#\\[\\]:]";
var PORT_CHARS = "[0-9:]";
var DOMAIN_CHARS = "[a-z0-9\\-.]";
var SCHEME_CHARS = "[a-z]+";
var EMAIL_CHARS = "[a-z0-9!#$%&'*+-/=?^_`{|}~]";
var GENERIC_TLDS = "(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|([a-z]{2}))";
var LINKABLE_REGEXP = new RegExp("\\b(((" + SCHEME_CHARS + ":\\/\\/)|(" + EMAIL_CHARS + "+@))?(" + DOMAIN_CHARS + "+\\." + GENERIC_TLDS + ")(" + PORT_CHARS + "*)(\\/" + URI_PATH_CHARS + "*)?)\\b", "igm");
var GENERIC_TLDS_REGEXP = new RegExp("\\." + GENERIC_TLDS + "\\b");
var MENTION_REGEXP = new RegExp("(\\w*@[a-z][a-z0-9\\-]{2,30}[a-z0-9])", "gi");
UI.activateLinks = function (c, b) {
    c = $_(c);
    var a = function () {
            LINKABLE_REGEXP.lastIndex = 0;
            _activateLinks(c, b)
        };
    Event.addListener(document, "modifiable", a)
};

function _activateLinksOnMatch(c, d) {
    if (!c || /\.\./.test(c)) {
        return c
    }
    var b = parseUri(c);
    GENERIC_TLDS_REGEXP.lastIndex = 0;
    if (!GENERIC_TLDS_REGEXP.test(b.host) || (b.host.split(".").length <= 2 && !b.path.length && !b.protocol.length)) {
        return c
    }
    var a = c;
    if (!b.protocol || b.protocol.length < 2) {
        if (/[^\b]@[^\b]/.test(c)) {
            a = "mailto:" + c
        } else {
            a = "http://" + c
        }
    } else {
        if (!/^https?/.test(b.protocol)) {
            a = null
        }
    }
    var f = c;
    if (d) {
        f = teaser(f, d)
    }
    if (a) {
        if (/polyvore.com\//.test(a)) {
            c = '<a rel="nofollow" href="' + a + '">' + f + "</a>"
        } else {
            c = '<a rel="nofollow" target="_blank" href="' + a + '">' + f + "</a>"
        }
    }
    return c
}
function _activateMentionsOnMatch(b, c) {
    if (!b || b.charAt(0) != "@") {
        return b
    }
    var a = buildVanityURL(b.substring(1).toLowerCase());
    b = '<a name="' + b + '" /><a rel="nofollow" href="' + a + '">' + b + "</a>";
    return b
}
function _activateLinks(d, h, c) {
    c = Number(c) || 0;
    if (d.nodeType == 3) {
        var g = escapeHTML(textContent(d));
        if (g.length + c > 32000) {
            return 0
        }
        var a = splitWithMatches(LINKABLE_REGEXP, g, _activateLinksOnMatch).join("");
        a = splitWithMatches(MENTION_REGEXP, a, _activateMentionsOnMatch).join("");
        if (g != a) {
            var k = createNode("span", null, null, a);
            var j = d.parentNode;
            j.insertBefore(k, d);
            domRemoveNode(d)
        }
        return g.length
    } else {
        if (d.tagName == "A") {
            return 0
        } else {
            if (d.childNodes && d.childNodes.length > 0) {
                var b = 0;
                for (var f = 0; f < d.childNodes.length; f++) {
                    b += _activateLinks(d.childNodes[f], h, c + b)
                }
                return b
            }
        }
    }
    return 0
}
if (!window.UI) {
    UI = {}
}
UI.sizeMap = {
    i: {
        url: "s",
        dim: 16
    },
    li: {
        url: "s",
        dim: 23
    },
    t: {
        url: "s",
        dim: 50
    },
    s: {
        url: "s",
        dim: 100
    },
    m: {
        url: "m",
        dim: 150
    },
    g: {
        url: "l",
        dim: 268
    },
    l: {
        url: "l",
        dim: 300
    },
    e: {
        url: "e",
        dim: 400
    },
    x: {
        url: "x",
        dim: 500
    },
    y: {
        url: "y",
        dim: 600
    },
    t2: {
        url: "s",
        dim: 42
    },
    s2: {
        url: "m",
        dim: 124
    },
    m2: {
        url: "l",
        dim: 152
    },
    l2: {
        url: "l",
        dim: 268
    }
};
UI.numberSuffixes = "1 K M B T Q".split(" ");
UI.filter2label = {
    category_id: loc("Category"),
    price_int: loc("Price"),
    brand: loc("Brand"),
    color: loc("Color"),
    bgColor: loc("Background Color"),
    displayurl: loc("Store"),
    query: loc("Suggest")
};
UI.sortedSizeMap = [];
forEachKey(UI.sizeMap, function (b, a) {
    a.key = b;
    UI.sortedSizeMap.push(a)
});
UI.sortedSizeMap = UI.sortedSizeMap.sort(function (d, c) {
    return d.dim - c.dim
});
UI.getImageKeyForSize = function (b) {
    for (var a = 0; a < UI.sortedSizeMap.length; a++) {
        if (UI.sortedSizeMap[a].dim >= b) {
            return UI.sortedSizeMap[a].key
        }
    }
    return UI.sortedSizeMap[UI.sortedSizeMap.length - 1].key
};
UI.getSmallestImageKeyForSize = function (b) {
    for (var a = 1; a < UI.sortedSizeMap.length; a++) {
        if (UI.sortedSizeMap[a].dim > b) {
            return UI.sortedSizeMap[a - 1].key
        }
    }
    return UI.sortedSizeMap[UI.sortedSizeMap.length - 1].key
};
UI.faviconLink = function (f, g) {
    var d = f.host;
    var b = f.displayurl;
    if (!b) {
        d = parseUri(f.url).authority;
        b = b || d
    }
    var a = (f.instock === undefined) ? true : f.instock;
    var c = buildImgURL("img-favicon", {
        url: d,
        ".out": "png"
    });
    return createNode("a", {
        className: a ? "favicon outbound" : "favicon unavailable",
        target: g,
        href: f.url,
        paidurl: f.paid_url,
        orighost: b,
        trackelement: "site",
        oid: Track.classAndId("thing", f.thing_id)
    }, {
        backgroundImage: "url(" + c + ")"
    }, b)
};
UI.fontGridRender = function (b, a) {
    var c = createNode("a", {
        href: "#foo",
        title: b.title,
        className: "hover_clickable grid"
    });
    c.appendChild(UI.fontListRender(b, a));
    return c
};
UI.fontListRender = function (c, b) {
    var g = 40;
    b = b || "";
    var a = c.color;
    var d = c.bgColor || "";
    var f = createNode("div", {
        title: c.title,
        className: "hider " + b
    }, {
        height: px(g)
    });
    f.appendChild(createNode("img", {
        src: buildImgURL("img-text.list", {
            font_id: c.font_id,
            color: a,
            height: g,
            width: 2 * g,
            ".out": "png"
        }),
        alt: c.title
    }, {
        backgroundColor: d,
        padding: d ? "0 4px" : ""
    }));
    return f
};
UI.AmazonMP3Render = function (d, c) {
    c = c || "t";
    var a = new Dim(d.w, d.h);
    var f = UI.sizeMap[c].dim;
    a.fit(new Dim(f, f));
    var b = d.imgurl;
    b = b.replace(".jpg", "._SL" + f + "_.jpg");
    return createNode("img", {
        className: "unselectable",
        width: a.w,
        height: a.h,
        src: b
    })
};
UI.questionListRender = function (j) {
    var a = createNode("div", {
        className: "idea question"
    });
    if (j.attachment) {
        var g = j.attachment;
        var b = a.appendChild(createNode("div", {
            className: "left"
        }));
        var c = b.appendChild(createNode("div", {
            className: "bordered"
        }));
        var k = "t";
        var h = c.appendChild(createImg({
            src: buildImgURL("img-thing", {
                tid: g.thing_id,
                size: k,
                ".out": "jpg"
            }),
            height: UI.sizeMap[k].dim,
            width: UI.sizeMap[k].dim
        }));
        var d = b.appendChild(createNode("div", {
            className: "clickable add"
        }, null, loc("Add to set")));
        Event.addListener(c, "click", function (l) {
            Event.trigger(j, "click", l, c)
        });
        Event.addListener(d, "click", function (l) {
            Event.trigger(j, "add")
        });
        Event.addListener(h, "dragstart", function (l) {
            Event.trigger(j, "dragstart", l)
        })
    }
    var f = a.appendChild(createNode("div"));
    f.appendChild(createNode("h5", null, null, createNode("a", {
        href: j.next_steps.url,
        target: "_blank"
    }, null, j.title)));
    f.appendChild(createNode("span", {
        className: "meta"
    }, null, [plural(j.answer_count, loc("answer"), loc("answers"), loc("No answers")).ucFirst(), ". ", loc("Asked {age} ago", {
        age: duration(j.age)
    }), "."]));
    f.appendChild(createNode("p", null, null, j.description));
    a.appendChild(createNode("div", {
        className: "clear"
    }));
    return a
};
UI.productPlacementRender = function (c) {
    var b = createNode("div", {
        className: "product_placement"
    });
    var d = b.appendChild(createNode("div", {
        className: "pptitle clickable"
    }, null, c.title));
    Event.addListener(d, "click", function () {
        Event.trigger(b, "action")
    });
    var a = createNode("ul", {
        className: "product_placement_items clearfix"
    });
    c.items.forEach(function (f) {
        var g = a.appendChild(createNode("li"));
        g.appendChild(UI.itemRender(f, "t"));
        Event.addListener(g, "mousedown", function () {
            Event.trigger(b, "action", f)
        })
    });
    b.appendChild(a);
    return b
};
UI.contestListRender = function (c) {
    var g = createNode("div", {
        className: "idea contest"
    });
    if (c.imgurl) {
        var d = g.appendChild(createNode("div", {
            className: "left bordered"
        }));
        var b = "t";
        d.appendChild(createImg({
            src: c.imgurl,
            width: UI.sizeMap[b].dim,
            height: UI.sizeMap[b].dim
        }));
        Event.addListener(d, "click", function () {
            Event.trigger(g, "action")
        })
    }
    var a = g.appendChild(createNode("div", {
        className: "body"
    }));
    var f = a.appendChild(createNode("div", {
        className: "clickable"
    }, null, c.title));
    Event.addListener(f, "click", function () {
        Event.trigger(g, "action")
    });
    a.appendChild(createNode("span", {
        className: "meta"
    }, null, [c.group_id ? loc("from {group}", {
        group: createNode("a", {
            href: buildURL("group.show", {
                id: c.group_id
            }),
            target: "_blank"
        }, null, c.group_title)
    }) + ". " : null, plural(c.active_entry_count, loc("entry"), loc("entries"), loc("No entries")).ucFirst(), ". ", loc("{duration} left", {
        duration: duration(c.time_left)
    }), "."]));
    a.appendChild(createNode("p", null, null, c.intro));
    g.appendChild(createNode("div", {
        className: "clear"
    }));
    return g
};
UI.AmazonMP3ListRender = function (c, b) {
    b = b || "t";
    var d = UI.sizeMap[b].dim;
    var a = c.imgurl;
    a = a.replace(".jpg", "._SL" + d + "_.jpg");
    return createNode("a", {
        href: "#foo",
        className: "amazon_mp3"
    }, null, [createNode("div", {
        className: "bordered imgwrap"
    }, {
        width: px(d),
        height: px(d),
        backgroundImage: "url(" + a + ")"
    }), createNode("span", null, null, [c.title, createNode("div", {
        className: "meta"
    }, null, c.artist)]), createNode("br", {
        className: "clear"
    })])
};
UI.itemShopRender = function (c, b) {
    if (!c || !b) {
        return null
    }
    var d = UI.sizeMap[b];
    var a = createNode("a", {
        title: c.title,
        href: buildURL("thing", {
            id: c.thing_id
        }, c.title)
    }, null, createImg({
        className: "hoverborder",
        width: d.dim,
        height: d.dim,
        src: buildImgURL("img-thing", {
            tid: c.thing_id,
            size: d.url,
            ".out": "jpg"
        })
    }));
    return createNode("div", {
        trackelement: "overlay"
    }, null, [a, createNode("div", {
        className: "item_meta size_" + b,
        trackelement: "under"
    }, null, [createNode("span", c.offer ? {
        className: "offer_title"
    } : null, null, c.title), createNode("div", null, null, UI.priceAndLink(c, {
        showOriginalPrice: true
    }))])])
};
UI.fbContactGridHeaderRender = function (a) {
    return a.name
};
UI.fbContactGridRender = function (j, l) {
    l = l || "s";
    l = "s";
    var b = UI.sizeMap[l].dim;
    var c = j.id;
    var h = j.buddyicon || -1;
    var k = buildImgURL("img-buddy", {
        id: h,
        ".out": "jpg",
        size: l
    });
    var d = j.fb.pic_square || "";
    var a = createNode("div", {
        className: "fbprofile"
    }, null, [createImg({
        width: 50,
        height: 50,
        src: d
    }), createNode("div", {
        className: "under name"
    }, null, j.fb.name)]);
    var g = createNode("a", {
        target: "_blank",
        href: buildURL("profile", {
            id: c,
            name: j.name
        })
    }, null, j.name);
    var f = createNode("div", {
        className: "pvprofile size_" + l
    }, null, [createImg({
        width: b,
        height: b,
        src: k
    }), createNode("div", {
        className: "under name"
    }, null, [g])]);
    Event.addListener(g, "click", function (m) {
        return Event.stopBubble(m)
    });
    return createNode("div", {
        href: "#foo",
        className: "grid fbcontact"
    }, null, [f, a])
};
UI.imageGridRender = function (b, a) {
    a = a || "s";
    var c = UI.sizeMap[a].dim;
    return createNode("a", {
        title: b.title,
        className: "grid",
        href: "#foo"
    }, null, createImg({
        width: c,
        height: c,
        src: buildImgURL("img-hosted", {
            id: b.image_id,
            ".out": "jpg"
        })
    }))
};
UI.itemGridRender = function (b, a) {
    a = a || "s";
    var c = UI.sizeMap[a].dim;
    var d = {
        tid: b.thing_id,
        size: UI.sizeMap[a].url,
        ".out": "jpg"
    };
    if (b.color) {
        d.color = b.color;
        d[".out"] = "png"
    }
    return createNode("a", {
        title: UI.getFullItemTitle(b),
        className: "grid",
        href: "#foo"
    }, null, createImg({
        width: c,
        height: c,
        src: buildImgURL("img-thing", d)
    }))
};
UI.userGridRenderAutoPageSize = function (c, b) {
    b = b || "s";
    var g = UI.sizeMap[b].dim;
    var a = buildImgURL("img-buddy", {
        size: UI.sizeMap[b].url,
        ".out": "jpg",
        id: c.buddyicon
    });
    var d = createNode("img", {
        src: a,
        width: px(g),
        height: px(g)
    });
    var f = c.user_name || c.name;
    var h = createNode("div", {
        className: "meta user_under_text"
    }, {
        width: px(g)
    }, f);
    return createNode("a", {
        title: f,
        className: "grid autosize",
        trackelement: "item",
        href: "#foo"
    }, null, [d, h])
};
UI.itemGridRenderAutoSize = function (g, k, l) {
    k = k || "s";
    l = l || {};
    var c = UI.sizeMap[k].dim;
    var j = {
        size: UI.sizeMap[k].url,
        ".out": "jpg"
    };
    var a = "img-";
    if (g.thing_id) {
        a += "thing";
        j.tid = g.thing_id;
        if (g.color) {
            j.color = g.color;
            j[".out"] = "png"
        }
    } else {
        if (g.spec_uuid || g.cid) {
            a += "set";
            j.cid = g.id || g.cid;
            j.spec_uuid = g.spec_uuid
        } else {
            if (g.buddyicon) {
                a += "buddy";
                j.id = g.buddyicon;
                j.spec_uuid = g.spec_uuid
            } else {
                console.log("WARN: Unknown item type in itemGridRenderAutoSize")
            }
        }
    }
    var h = buildImgURL(a, j);
    var f;
    if (Browser.isIE) {
        var b = new FiltersImage({
            src: h
        }, {
            width: "100%"
        });
        f = b.outer;
        setNode(f, null, {
            height: "100%"
        });
        b.setSrc(h)
    } else {
        f = createNode("img", {
            src: h
        }, {
            width: "100%"
        })
    }
    var d = "";
    if (g.thing_id) {
        d = UI.getFullItemTitle(g)
    } else {
        d = g.name
    }
    return createNode("a", {
        title: d,
        className: "grid autosize " + (l.className || ""),
        trackelement: "item",
        href: "#foo"
    }, null, f)
};
UI.priceAndLink = function (g, d) {
    if (!d) {
        d = {}
    }
    var c = (g.instock === undefined) ? true : g.instock;
    var b = [];
    if (d.showOriginalPrice && (g.lc_orig_price || g.orig_price) && c) {
        b.push(createNode("span", {
            className: "orig_price"
        }, null, g.lc_orig_price || g.orig_price));
        b.push("&nbsp;")
    }
    if (g.lc_display_price) {
        b.push(createNode("span", {
            className: "price"
        }, null, g.lc_display_price));
        if (d.showUnlocalizedPrice) {
            b.push("&nbsp;");
            b.push(createNode("span", {
                className: "price"
            }, null, "(" + g.display_price + ")"))
        }
        b.push("&nbsp;- ")
    } else {
        if (g.display_price) {
            b.push(createNode("span", {
                className: "price"
            }, null, g.display_price));
            b.push("&nbsp;- ")
        }
    }
    var a = {
        href: g.url,
        paidurl: g.paid_url,
        orighost: g.displayurl,
        oid: Track.classAndId("thing", g.thing_id)
    };
    if (d.showNotbuyableTooltip && !c) {
        a.showtooltip = true
    }
    var h = d.displayUrlMaxSize;
    var f = outboundLink(a, null, h ? teaser(g.displayurl, h) : g.displayurl);
    if (d.showNotbuyableTooltip && !c) {
        Event.addListener(f, "click", function (j) {
            return Event.stop(j)
        })
    }
    b.push(f);
    return b
};
UI.itemNotbuyableTooltipRender = function (c) {
    var b = createNode("div", {
        className: "notbuyable",
        trackcontext: "notbuyable"
    });
    var a = b.appendChild(createNode("ul", {
        className: "container list"
    }));
    addList(a, loc("This item appears to be sold out."));
    addList(a, createNode("a", {
        href: c.url,
        paidurl: c.paid_url,
        orighost: c.orighost,
        oid: Track.classAndId("thing", c.thing_id),
        target: "_blank",
        trackelement: "continue"
    }, null, loc("Continue to {site} anyway", {
        site: c.orighost
    }) + "?"));
    addList(a, "&nbsp;");
    var d = createNode("div", null, {
        display: "none"
    });
    addList(a, d);
    /*Ajax.get({
        action: "thing.similar",
        data: {
            id: c.thing_id,
            length: 3,
            ".out": "jsonx"
        },
        hideProgress: true,
        onSuccess: function (f) {
            if (!f || !f.result || !f.result.html) {
                return
            }
            UI.replaceNodes(f.result.replacements);
            str2nodes(f.result.html, d);
            show(d);
            ModalDialog.rePosition()
        }
    });*/
    return b
};
UI.renderBreadcrumb = function (d) {
    if (!d) {
        return null
    }
    var a = createNode("div", {
        className: "breadcrumb"
    });
    for (var c = 0; c < d.length; c++) {
        var b = d[c];
        a.appendChild(createNode("a", {
            href: b.url
        }, null, b.anchor));
        if (c + 1 < d.length) {
            a.appendChild(createNode("span", null, null, " &gt; "))
        }
    }
    return a
};
UI.itemShopToolTipRender = function (k) {
    var l = "l2";
    var g = UI.sizeMap[l];
    var f = outboundLink({
        title: k.title,
        href: k.url,
        paidurl: k.paid_url,
        orighost: k.displayurl,
        trackelement: "img",
        oid: Track.classAndId("thing", k.thing_id)
    });
    k.imgurl = buildImgURL("img-thing", {
        tid: k.thing_id,
        size: UI.sizeMap[l].url,
        ".out": "jpg"
    });
    var c = f.appendChild(UI.renderItem(k, {
        size: l
    }));
    var a = createNode("div");
    a.appendChild(f);
    if (bucketName("shop_alt_views") == "yes") {
        /*Ajax.get({
            action: "thing.alternate",
            data: {
                id: k.thing_id,
                length: 5
            },
            hideProgress: true,
            onSuccess: function (n) {
                if (!n.result || !n.result.alts || n.result.alts.length < 2) {
                    return
                }
                var o = createNode("div", {
                    id: "alt_views"
                });
                a.appendChild(o);
                var p;
                o.appendChild(UI.layoutN(n.result.alts, {
                    n: 5,
                    size: "t2",
                    renderer: function (s) {
                        var r = UI.renderItem(s, {
                            size: "t2",
                            className: "hoverborder"
                        });
                        if (s.thing_id == k.thing_id) {
                            p = r;
                            addClass(r, "current")
                        }
                        var q;
                        Event.addListener(r, "mouseover", function (t) {
                            if (p) {
                                removeClass(p, "current")
                            }
                            addClass(r, "current");
                            p = r;
                            s.imgurl = buildImgURL("img-thing", {
                                tid: s.thing_id,
                                size: UI.sizeMap[l].url,
                                ".out": "jpg"
                            });
                            s.clickurl = k.clickurl;
                            q = q || UI.renderItem(s, {
                                size: l
                            });
                            f.replaceChild(q, c);
                            c = q
                        });
                        Event.addListener(r, "click", Event.stop, Event);
                        return r
                    }
                }))
            }
        })*/
    }
    var d = createNode("ul", {
        className: "list",
        trackelement: "tooltip"
    });
    if (k.breadcrumb) {
        addList(d, UI.renderBreadcrumb(k.breadcrumb))
    }
    if (k.title) {
        addList(d, createNode("h2", null, null, k.title))
    }
    addList(d, UI.priceAndLink(k, {
        showOriginalPrice: true,
        showUnlocalizedPrice: true
    }));
    if (k.offer) {
        addList(d, k.offer, {
            className: "offer"
        })
    }
    if (k.description) {
        addList(d, UI.renderTextMore({
            text: k.description,
            numLines: 5
        }), {
            className: "description"
        })
    }
    var m = buildURL("thing", {
        id: k.thing_id
    }, k.seo_title);
    if (Auth.isSponsorUser()) {
        var j = [UI.renderPromoteButton({
            className: "btn btn_action",
            type: "thing",
            id: k.thing_id,
            is_promoted: k.is_promoted,
            promotion_end_ts: k.promotion_end_ts,
            sprite: true
        }), UI.renderFavoritesNew({
            className: "btn",
            type: "thing",
            id: k.thing_id,
            can_change_fav: true,
            fav_count: k.save_count,
            is_user_fav: k.in_user_items
        }), UI.buyButtonRender(k, {
            className: "btn",
            label: true,
            sprite: true
        }), createNode("a", {
            href: m
        }, null, loc("View product details") + " &raquo;")];
        addList(d, createNode("ul", {
            className: "actions new_actions clearfix"
        }, null, j.map(function (n) {
            return createNode("li", null, null, n)
        })))
    } else {
        var h = [UI.buyButtonRender(k, {
            label: true,
            sprite: true
        }), UI.renderFavoritesNew({
            className: "btn",
            type: "thing",
            id: k.thing_id,
            can_change_fav: true,
            fav_count: k.save_count,
            is_user_fav: k.in_user_items
        })];
        addList(d, createNode("ul", {
            className: "actions new_actions clearfix"
        }, null, h.map(function (n) {
            return createNode("li", null, null, n)
        })));
        addList(d, createNode("a", {
            href: m,
            target: "_blank"
        }, null, loc("Related looks and items") + " &raquo;"));
        var b = createNode("div", {
            className: "items"
        });
        addList(d, b);
        /*Ajax.get({
            action: "thing.similar",
            data: {
                id: k.thing_id,
                length: 3,
                size: "s2"
            },
            hideProgress: true,
            onSuccess: function (n) {
                if (!n.result || !n.result.items || n.result.items.length < 3) {
                    return
                }
                b.appendChild(UI.layoutN(n.result.items, {
                    n: 3,
                    size: "s2",
                    renderer: function (o) {
                        return UI.renderItem(o, {
                            target: "_blank",
                            size: "s2",
                            className: "hoverborder"
                        })
                    }
                }))
            }
        })*/
    }
    return ToolTip.renderImageAndDetails(a, d)
};
UI.itemOverlayRender = function (d, c) {
    if (!c) {
        c = "m"
    }
    var f = UI.sizeMap[c].dim;
    var h = buildURL("thing", {
        id: d.thing_id
    }, d.seo_title);
    var a = createNode("a", {
        title: d.title,
        href: h
    }, null, createImg({
        className: "bordered",
        width: f,
        height: f,
        src: buildImgURL("img-thing", {
            tid: d.thing_id,
            size: UI.sizeMap[c].url,
            ".out": "jpg"
        })
    }));
    var g = createNode("div", {
        className: "tooltip_overlay details"
    });
    var b = g.appendChild(createNode("ul", {
        className: "list"
    }));
    if (d.title) {
        addList(b, createNode("a", {
            title: d.title,
            href: h
        }, null, teaser(d.title, 65)))
    }
    addList(b, UI.priceAndLink(d, {
        showOriginalPrice: true,
        showUnlocalizedPrice: true,
        showNotbuyableTooltip: true,
        displayUrlMaxSize: 25
    }));
    addList(b, UI.renderFavoritesNew({
        type: "thing",
        id: d.thing_id,
        can_change_fav: true,
        no_sprite: true,
        className: "meta"
    }));
    addList(b, createNode("a", {
        className: "meta",
        href: h
    }, null, loc("View sets with this item")));
    if (d.shop_link) {
        addList(b, createNode("a", {
            className: "meta",
            href: d.shop_link.url
        }, null, loc("Shop for {items}", {
            items: d.shop_link.anchor
        })))
    }
    return ToolTip.renderImageAndDetails(a, g)
};
UI.buyButtonRender = function (c, b) {
    b = b || {};
    b.className = b.className || "btn btn_buy";
    var a = b.label ? loc("Buy at {store}", {
        store: c.displayurl
    }) : loc("Buy");
    if (b.sprite) {
        a = outerHTML(createSprite("buyit")) + " " + a
    }
    return outboundLink({
        className: b.className,
        href: c.url,
        paidurl: c.paid_url,
        orighost: c.displayurl,
        trackelement: "buy",
        oid: Track.classAndId("thing", c.thing_id),
        target: "_blank",
        hideFocus: 1
    }, null, a)
};
UI.renderRecommendedContact = function (d, f) {
    if (!f) {
        f = {}
    }
    var c = createNode("div", {
        className: "rec_follow " + (f.contact_class || "")
    });
    if (!d.buddyicon) {
        d.buddyicon = -1
    }
    var g = buildURL("profile", {
        id: d.user_id,
        name: d.user_name
    });
    c.appendChild(createNode("div", {
        className: "left icon"
    }, null, createNode("a", {
        href: g,
        target: "_blank"
    }, null, createImg({
        src: buildImgURL("img-buddy", {
            id: d.buddyicon,
            ".out": "jpg",
            size: "s"
        }),
        width: 50,
        height: 50,
        title: d.user_name,
        className: "bordered"
    }))));
    var b = c.appendChild(createNode("div", {
        className: "info"
    }));
    b.appendChild(createNode("div", {
        className: "name"
    }, null, createNode("a", {
        href: g,
        target: "_blank"
    }, null, d.user_name)));
    b.appendChild(createNode("div", {
        className: "meta"
    }, null, d.user_meta));
    var a = b.appendChild(createNode("span", {
        className: "btn follow_action " + (f.action_class || "")
    }, null, loc("Follow")));
    Follow.init(a, {
        user_id: d.user_id,
        user_name: d.user_name,
        no_popup: true,
        count_node: null,
        follower_count: d.follower_count,
        stat: f.stat,
        contact_list_name: f.contact_list_name
    });
    return c
};
UI.amazonMP3OverlayRender = function (g) {
    var c = "m";
    var h = UI.sizeMap[c].dim;
    var f = createNode("ul", {
        className: "list"
    });
    g.w *= 100;
    g.h *= 100;
    var d = UI.AmazonMP3Render(g, "m");
    var b = f.appendChild(createNode("li", {
        className: "left"
    }, null, d));
    addClass(d, "grid");
    addList(f, teaser(g.title, 100));
    addList(f, UI.faviconLink(g, "_blank"));
    var j = AmazonWidget.getMp3Html({
        width: 120,
        height: 90,
        asin: g.asin
    });
    var a = addList(f, "");
    window.setTimeout(function () {
        replaceChild(a, j)
    }, 0);
    return f
};
UI.setGridRender = function (b, a) {
    if (!a) {
        a = "s"
    }
    var c = UI.sizeMap[a].dim;
    return createNode("a", {
        title: b.title,
        className: "grid",
        href: "#foo"
    }, null, createImg({
        width: c,
        height: c,
        src: buildImgURL("img-set", {
            cid: b.type == "c" ? b.id : null,
            spec_uuid: b.spec_uuid,
            size: UI.sizeMap[a].url,
            ".out": "jpg"
        })
    }))
};
UI.buildLookbookImgURL = function (b, a) {
    if (b.spec_uuid) {
        return buildImgURL("img-set", {
            cid: b.id,
            spec_uuid: b.spec_uuid,
            size: UI.sizeMap[a].url,
            ".out": "jpg"
        })
    } else {
        if (b.thing_id) {
            return buildImgURL("img-thing", {
                tid: b.thing_id,
                size: UI.sizeMap[a].url,
                ".out": "jpg"
            })
        } else {
            if (b.buddyicon) {
                return buildImgURL("img-buddy", {
                    id: b.buddyicon,
                    size: UI.sizeMap[a].url,
                    ".out": "jpg"
                })
            }
        }
    }
};
UI.setGridRenderLookbook = function (d, c) {
    if (!c) {
        c = "s"
    }
    var b = createNode("div", {
        className: "lookbookedit lookbookOuter"
    });
    var g = createNode("img", {
        src: UI.buildLookbookImgURL(d, c)
    });
    var a = UI.renderStack(createNode("a", {
        title: d.title,
        href: "#foo"
    }, {
        textDecoration: "none"
    }, g));
    addClass(a, "mod_stack_size_" + c);
    b.appendChild(a);
    if (d.title) {
        var f = b.appendChild(createNode("div", {
            className: "under_long"
        }, null, d.title))
    }
    return b
};
UI.renderStack = function (a) {
    return createNode("div", {
        className: "mod_stack"
    }, null, createNode("div", {
        className: "mod_stack_layer"
    }, null, createNode("div", {
        className: "mod_stack_layer"
    }, null, createNode("div", {
        className: "mod_stack_layer"
    }, null, a))))
};
UI.setGridRenderAutoSize = function (d, c, b) {
    c = c || "s";
    b = b || {};
    var h = UI.sizeMap[c].dim;
    var j = {
        spec_uuid: d.spec_uuid,
        size: UI.sizeMap[c].url,
        ".out": "jpg"
    };
    if (d.id && d.type == "c") {
        j.cid = d.id
    }
    if (d.type == "d" && d.basedon_tid) {
        j.filled_template = 1
    }
    var a = buildImgURL("img-set", j);
    var f;
    if (Browser.isIE) {
        var g = new FiltersImage({
            src: a
        }, {
            width: "100%"
        });
        f = g.outer;
        setNode(f, null, {
            height: "100%"
        });
        g.setSrc(a);
        f._image = g
    } else {
        f = createNode("img", {
            src: a
        }, {
            width: "100%"
        })
    }
    return createNode(b.tag || "a", {
        title: d.title,
        className: "grid autosize " + (b.className || ""),
        href: "#foo"
    }, null, f)
};
UI.setCarouselRenderWithBy = function (d, c) {
    if (!c) {
        c = "t"
    }
    var f = UI.sizeMap[c].dim;
    var a = d.clickurl ? d.clickurl : buildURL("set", {
        id: d.id
    }, d.seo_title);
    var b = createNode("a", {
        className: "hoverborder",
        href: a
    }, null, createImg({
        width: f,
        height: f,
        title: d.title,
        src: d.imgurl ? d.imgurl : buildImgURL("img-set", {
            cid: d.id,
            spec_uuid: d.spec_uuid,
            size: UI.sizeMap[c].url,
            ".out": "jpg"
        })
    }));
    var g = [];
    if (d.userurl || d.user_id) {
        g = [loc("by") + " ", createNode("a", {
            href: d.userurl ? d.userurl : buildURL("profile", {
                id: d.user_id,
                name: d.user_name
            })
        }, null, d.user_name)]
    } else {
        if (d.itemtitle) {
            g = [createNode("a", {
                href: a
            }, null, d.itemtitle)]
        }
    }
    return createNode("div", {
        className: "grid"
    }, null, [b, addClass(createNode("span", {
        className: "under"
    }, null, g), "size_" + c)])
};
UI.setCarouselRenderWithLike = function (d, c) {
    if (!c) {
        c = "t"
    }
    var f = UI.sizeMap[c].dim;
    var b = createNode("a", {
        className: "hoverborder",
        href: buildURL("set", {
            id: d.id
        }, d.seo_title)
    }, null, createImg({
        width: f,
        height: f,
        src: d.imgurl ? d.imgurl : buildImgURL("img-set", {
            cid: d.id,
            spec_uuid: d.spec_uuid,
            size: UI.sizeMap[c].url,
            ".out": "jpg"
        })
    }));
    var a = UI.renderFavoritesNew({
        id: d.id,
        type: "set",
        fav_count: d.fav_count,
        is_user_fav: d.is_user_fav,
        can_change_fav: false
    });
    return createNode("div", {
        className: "grid"
    }, null, [b, createNode("div", {
        className: "under_carousel under size_" + c
    }, null, a)])
};
UI.renderFavoritesCompact = function (b) {
    if (!b.type || !b.id || !b.can_change_fav) {
        return null
    }
    var f = mergeObject({
        like_this: loc("Like this"),
        you_like_this: loc("You like this")
    }, b.labels || {});
    if (!b.no_sprite) {
        var c = outerHTML(createSprite("likeit"));
        forEachKey(f, function (g) {
            f[g] = c + f[g]
        })
    }
    b.node_id = b.node_id || ("favorite_" + b.type + "_" + b.id);
    var d = createNode("span", {
        id: b.node_id,
        className: (b.className || "") + (b.can_change_fav ? " clickable" : ""),
        oid: b.oid,
        trackelement: "likeit"
    }, null, (b.is_user_fav ? f.you_like_this : f.like_this));
    var a = new LikeItToggle({
        id: b.id,
        type: b.type,
        is_user_fav: b.is_user_fav,
        button: d,
        liked_button: f.you_like_this,
        not_liked_button: f.like_this
    });
    return d
};
UI.renderFavoritesNew = function (c) {
    c = c || {};
    c.className = c.className || "";
    c._new_favorites = true;
    var d = (c.fav_count || 0) - (c.is_user_fav ? 1 : 0);
    var b = plural(d, loc("like"), loc("likes"), "", 1);
    var a = plural(d, loc("save"), loc("saves"), "", 1);
    var f = mergeObject(c.labels || {}, c.type === "thing" ? {
        none_yet: loc("No saves yet"),
        no_likes: loc("Save this"),
        just_me: loc("I saved this"),
        others: a.ucFirst(),
        others_me: (a + " + " + loc("me")).ucFirst()
    } : {
        none_yet: loc("No likes yet"),
        no_likes: loc("Like this"),
        just_me: loc("I like this"),
        others: b.ucFirst(),
        others_me: (b + " + " + loc("me")).ucFirst()
    });
    if (!d && !c.can_change_fav) {
        c.labels = {
            like_this: f.none_yet
        }
    } else {
        if (d) {
            c.labels = {
                like_this: f.others,
                you_like_this: f.others_me
            }
        } else {
            c.labels = {
                like_this: f.no_likes,
                you_like_this: f.just_me
            }
        }
    }
    if (c.is_user_fav) {
        c.className = ["faved", c.className].join(" ")
    }
    return UI.renderFavoritesCompact(c)
};
UI.itemListRender = function (f, b) {
    if (!b) {
        b = {}
    }
    var d = b.size || "m";
    var h = UI.sizeMap[d].dim;
    var c = createNode("ul", {
        className: "list"
    });
    var g = f.clickUrl || buildURL("thing", {
        id: f.thing_id
    }, f.seo_title);
    var a = createNode("a", {
        href: g,
        target: "_blank"
    }, null, createImg({
        className: "bordered",
        width: h,
        height: h,
        src: UI.buildLookbookImgURL(f, d)
    }));
    if (b.dragableImage) {
        Event.addListener(a, "dragstart", function (j) {
            j.xDataTransfer.setData("item", f);
            j.xDataTransfer.proxy = createNode("img", {
                src: UI.buildLookbookImgURL(f, "s"),
                width: 50,
                height: 50
            });
            Event.stop(j)
        })
    }
    c.appendChild(createNode("li", {
        className: "left"
    }, null, a));
    if (f.title) {
        addList(c, f.title)
    }
    return c
};
UI.setListRender = function (f, b) {
    if (!b) {
        b = {}
    }
    var d = b.size || "m";
    var h = UI.sizeMap[d].dim;
    var c = createNode("ul", {
        className: "list"
    });
    var g = f.clickUrl || buildURL("set", {
        id: f.id
    }, f.seo_title);
    var a = createNode("a", {
        href: g,
        target: "_blank"
    }, null, createImg({
        className: "bordered",
        width: h,
        height: h,
        src: buildImgURL("img-set", {
            cid: f.id,
            spec_uuid: f.spec_uuid,
            size: UI.sizeMap[d].url,
            ".out": "jpg"
        })
    }));
    if (b.dragableImage) {
        Event.addListener(a, "dragstart", function (j) {
            j.xDataTransfer.setData("set", f);
            j.xDataTransfer.proxy = createNode("img", {
                src: buildImgURL("img-set", {
                    cid: f.id,
                    spec_uuid: f.spec_uuid,
                    size: "s",
                    ".out": "jpg"
                }),
                width: 50,
                height: 50
            });
            Event.stop(j)
        })
    }
    c.appendChild(createNode("li", {
        className: "left"
    }, null, a));
    if (f.title) {
        addList(c, f.title)
    }
    return c
};
UI.draftListRender = function (f, b) {
    if (!b) {
        b = {}
    }
    var d = b.size || "m";
    var g = UI.sizeMap[d].dim;
    var c = createNode("ul", {
        className: "list"
    });
    var h = {
        spec_uuid: f.spec_uuid,
        size: UI.sizeMap[d].url,
        ".out": "jpg"
    };
    if (f.type == "d" && f.basedon_tid) {
        h.filled_template = 1
    }
    var a = createImg({
        className: "bordered",
        width: g,
        height: g,
        src: buildImgURL("img-set", h)
    });
    if (b.dragableImage) {
        Event.addListener(a, "dragstart", function (j) {
            j.xDataTransfer.setData("draft", f);
            j.xDataTransfer.proxy = createNode("img", {
                src: buildImgURL("img-set", h),
                width: 50,
                height: 50
            });
            Event.stop(j)
        })
    }
    c.appendChild(createNode("li", {
        className: "left"
    }, null, a));
    if (f.updated_ago) {
        c.appendChild(createNode("li", null, null, f.updated_ago))
    }
    return c
};
UI.lookbookListRender = function (f, b) {
    if (!b) {
        b = {}
    }
    var d = b.size || "m";
    var g = UI.sizeMap[d].dim;
    var c = createNode("ul", {
        className: "list"
    });
    var a = createImg({
        className: "bordered",
        width: g,
        height: g,
        src: UI.buildLookbookImgURL(f, d)
    });
    if (f.id) {
        a = createNode("a", {
            href: buildURL("collection", {
                id: f.id
            }, f.seo_title),
            target: "_blank"
        }, null, a)
    }
    if (b.dragableImage) {
        Event.addListener(a, "dragstart", function (h) {
            h.xDataTransfer.setData("lookbook", f);
            h.xDataTransfer.proxy = createNode("img", {
                src: UI.buildLookbookImgURL(f, "s"),
                width: 50,
                height: 50
            });
            Event.stop(h)
        })
    }
    c.appendChild(createNode("li", {
        className: "left"
    }, null, a));
    if (f.title) {
        c.appendChild(createNode("li", null, null, f.title))
    }
    return c
};
UI.fontIconRender = function (b, a) {
    a = a || "t";
    var c = UI.sizeMap[a].dim;
    return createImg({
        width: c,
        height: c,
        title: b.title,
        src: buildImgURL("img-text.icon", {
            font_id: b.font_id,
            size: UI.sizeMap[a].url,
            ".out": "jpg"
        })
    })
};
UI.fbFittedImage = function (b, a) {
    return UI.fittedImage({
        imgurl: b.imgurl,
        title: b.caption
    }, a)
};
UI.fittedImage = function (b, a) {
    var c = UI.sizeMap[a].dim;
    return createNode("div", {
        className: "fitted_image"
    }, {
        height: px(c),
        width: px(c)
    }, [createNode("span"), createNode("img", {
        src: b.imgurl,
        alt: b.title || b.name
    }, {
        maxWidth: px(c),
        maxHeight: px(c)
    })])
};
UI.getFullItemTitle = function (a) {
    var b = a.title || a.name || "";
    if (b) {
        if (a.display_price) {
            b += " - " + a.display_price
        }
        if (a.displayurl) {
            b += " - " + a.displayurl
        }
    }
    return b
};
UI.itemRender = function (b, a) {
    a = a || "t";
    var c = UI.sizeMap[a].dim;
    var d = {
        tid: b.thing_id,
        size: UI.sizeMap[a].url,
        ".out": "jpg"
    };
    if (b.color) {
        d.color = b.color;
        d[".out"] = "png"
    }
    return createImg({
        width: c,
        height: c,
        title: UI.getFullItemTitle(b),
        src: "" //buildImgURL("img-thing", d)
    })
};
UI.setRenderWithLink = function (b, a) {
    return createNode("a", {
        target: "_blank",
        href: buildURL("set", {
            id: b.id
        }, b.seo_title)
    }, {
        display: "block",
        position: "relative"
    }, UI.setRender(b, a))
};
UI.setRender = function (b, a) {
    a = a || "t";
    var c = UI.sizeMap[a].dim;
    return createImg({
        className: "img_size_" + a,
        width: c,
        height: c,
        title: b.title,
        src: b.imgurl ? b.imgurl : buildImgURL("img-set", {
            cid: b.id,
            spec_uuid: b.spec_uuid,
            size: UI.sizeMap[a].url,
            ".out": "jpg"
        })
    })
};
UI.renderPerson = function (c, a) {
    if (!a) {
        a = {}
    }
    var b = c.user_id;
    var f = c.buddyicon || -1;
    var d = buildImgURL("img-buddy", {
        id: f,
        ".out": "jpg",
        size: "li"
    });
    return createNode("a", {
        target: a.newWindow ? "_blank" : "",
        href: buildURL("profile", {
            id: c.user_id,
            name: c.user_name
        }),
        className: "buddyicon_li"
    }, {
        backgroundImage: "url(" + d + ")"
    }, c.user_name)
};
UI.renderBuddyIcon = function (b, d) {
    var c = b.user_id;
    var g = b.buddyicon || -1;
    d = d || "t";
    var f = UI.sizeMap[d].dim;
    var a = createNode("img", {
        src: buildImgURL("img-buddy", {
            id: g,
            ".out": "jpg",
            size: UI.sizeMap[d].url
        }),
        width: f,
        height: f,
        className: "bordered buddyicon img_size_" + d,
        alt: b.user_name
    });
    if (c == -1) {
        return a
    } else {
        return createNode("a", {
            href: buildURL("profile", {
                id: c,
                name: b.user_name
            }),
            className: "buddy_icon"
        }, null, a)
    }
};
UI.renderCommentUIC = function (b, m) {
    m = m || {};
    var l = m.size || "t2";
    var a = createNode("a", {
        className: "left",
        href: buildURL("profile", {
            id: b.user.user_id,
            name: b.user.user_name
        })
    }, null, b.user.user_name);
    var d = createNode("div", {
        className: "title clearfix"
    }, null, a);
    if (b.user.user_id == Auth.userId()) {
        var k = {
            className: "delete",
            label: loc("Delete"),
            action: function () {
                Comment.del(b.cls || "collection", b.id)
            }
        };
        var h = d.appendChild(createNode("ul", {
            className: "actions inline right"
        }));
        h.appendChild(UI.renderAction(k))
    }
    var f = Math.floor(ts2age(b.createdon_ts));
    if (f > 0) {
        f = loc("wrote {age} ago", {
            age: duration(f)
        })
    } else {
        f = loc("wrote moments ago")
    }
    var j = createNode("div", {
        className: "meta"
    }, null, f.ucFirst());
    var c = createNode("div", {
        className: "list_item_icon"
    }, null, UI.renderBuddyIcon(b.user, l));
    var g = createNode("div", {
        className: "filling_block"
    }, null, [d, j, UI.renderTextMore({
        text: b.comment,
        escape: false
    })]);
    return createNode("div", {
        id: "comment_" + b.id,
        className: "list_item clearfix " + (b.is_moderator ? "moderator_highlight " : "") + (m.className || "")
    }, null, [c, g])
};
UI.promoteLabels = function (m) {
    var j = m.type;
    if (!j) {
        return
    }
    var d = new Date().getTime() / 1000;
    var b, h, f;
    if (j === "set") {
        b = loc("Promote set");
        h = loc("Unpromote set")
    } else {
        if (j === "thing") {
            b = loc("Promote item");
            h = loc("Unpromote item")
        } else {
            if (j === "collection") {
                b = loc("Promote collection");
                h = loc("Unpromote collection")
            }
        }
    }
    f = h;
    var k = 7 * 24 * 60 * 60;
    var a = future(k);
    var l = m.promotion_end_ts || (k + d);
    var c = future(l - d);
    h = h + ". " + loc("Ends {intime}", {
        intime: c
    });
    f = f + ". " + loc("Ends {intime}", {
        intime: a
    });
    var g = mergeObject(m.labels || {}, {
        promote_label: b,
        unpromote_label: h,
        unpromote_js_label: f
    });
    return g
};
UI.renderPromoteButton = function (b) {
    b = b || {};
    if (!b.type || !b.id) {
        return
    }
    b.node_id = b.node_id || Dom.uniqueId();
    b.className = b.className || "";
    var d = UI.promoteLabels(b);
    if (b.sprite) {
        d.promote_label = outerHTML(createSprite("promoteit")) + " " + d.promote_label;
        d.unpromote_label = outerHTML(createSprite("unpromoteit")) + " " + d.unpromote_label;
        d.unpromote_js_label = outerHTML(createSprite("unpromoteit")) + " " + d.unpromote_js_label
    }
    var c = createNode("span", {
        id: b.node_id,
        className: b.className
    }, null, b.is_promoted ? d.unpromote_label : d.promote_label);
    var a = new PromoteItToggle({
        id: b.id,
        type: b.type,
        is_promoted: b.is_promoted,
        button: c,
        promote_button: d.promote_label,
        unpromote_button: d.unpromote_js_label
    });
    return c
};
UI.renderActions = function (c, a) {
    a = a || {};
    a.className = a.className || "";
    var b = createNode("ul", {
        className: "actions " + a.className
    });
    c.forEach(function (d) {
        b.appendChild(UI.renderAction(d))
    });
    return b
};
UI.renderAction = function (action) {
    var className = action.className || "";
    var li = createNode("li", {
        className: "actions"
    });
    li.appendChild(createSprite(className));
    var node = null;
    if (action.url) {
        node = createNode("a", {
            href: action.url
        }, null, action.label)
    } else {
        if (action.action) {
            node = createNode("span", {
                className: "clickable"
            }, null, action.label)
        } else {
            node = createNode("span", null, null, action.label)
        }
    }
    li.appendChild(node);
    var onclick = noop;
    if (action.action) {
        if (typeof (action.action) === "string") {
            onclick = function () {
                eval("(" + action.action + ")")
            }
        } else {
            onclick = action.action
        }
    } else {
        if (action.url) {
            onclick = function () {
                window.location = action.url
            }
        }
    }
    if (action.confirm) {
        Event.addListener(node, "click", function (event) {
            ModalDialog.confirm({
                title: action.confirm,
                onOk: onclick
            });
            return Event.stop(event)
        })
    } else {
        Event.addListener(node, "click", function (event) {
            onclick();
            return Event.stop(event)
        })
    }
    return li
};
UI.renderCenterMiddle = function (a) {
    return createNode("table", {
        className: "centermiddle"
    }, null, createNode("tbody", {
        className: "centermiddletbody"
    }, null, createNode("tr", {
        className: "centermiddlerow"
    }, null, createNode("td", {
        className: "centermiddlecell"
    }, null, a))))
};
UI.renderEditorItemAction = function (a, b, d) {
    if (d instanceof Array) {
        var c = d;
        d = function () {
            UI.showItemDropDownMenu(b.id, c)
        }
    }
    return UI.renderEditorItemButton(b, d)
};
UI.showItemDropDownMenu = function (a, c) {
    var b = new DropDownMenu(c);
    Event.addListener(b, "hide", function () {
        if (b) {
            b.destruct();
            b = null
        }
    });
    b.attach($_(a), DropDownMenu.POSITION_BOTTOM_LEFT, 150);
    b.show()
};
UI.renderEditorItemButton = function (b, d) {
    var a = {
        id: b.id
    };
    if (b.trackelement) {
        a.trackelement = b.trackelement
    }
    var c = createNode("button", a, null, createSprite("", b.title));
    Event.addListener(c, "click", d);
    Event.addListener(c, "mousedown", Event.stop);
    c.title = b.alt;
    return c
};
UI.displayAjaxMessages = function (b, a) {
    if (!b) {
        return
    }
    b.forEach(function (c) {
        Feedback.message(createNode("span", {
            className: c.type
        }, null, c.content), c.delay || c.duration)
    })
};
UI.modalDisplayAjaxMessages = function (b) {
    if (!b) {
        return
    }
    var a = [];
    b.forEach(function (c) {
        a.push({
            type: "rotext",
            value: createNode("span", {
                className: c.type
            }, null, c.content)
        })
    });
    a.push({
        type: "buttons",
        centered: true,
        buttons: [{
            label: loc("OK"),
            type: "button",
            onClick: ModalDialog.hide
        }]
    });
    ModalDialog.show(createForm({
        inputs: a,
        noLabel: true
    }))
};
UI.displayAjaxErrors = function (a, b) {
    b = $_(b);
    if (b) {
        setNode(b, null, null, a.extractGeneralErrorMessages().join("<br>"))
    }
    if (a.form_error) {
        forEachKey(a.form_error, function (f, c) {
            var d = inOrderTraversal(function (g) {
                return g.name == f
            });
            if (!d) {
                return false
            }
            d.parentNode.appendChild(createNode("div", {
                className: "error"
            }, null, c));
            return true
        })
    }
};
UI.maybeRenderMorePolaroid = function (g) {
    var f = $_(g.moreNode);
    var j = $_(g.contentNode);
    var o = $_(g.imgDiv);
    var h = $_(g.textDiv);
    var m;
    var l;
    var b;
    var a;
    var k;
    var d = true;
    var c = new Animation({
        duration: 250,
        renderer: function (q) {
            if (d) {
                q = 1 - q
            }
            var p = m + q * (l - m);
            setNode(o, null, {
                height: px(p)
            });
            setNode(h, null, {
                height: px(b - p - a)
            })
        }
    });
    var n = function () {
            setNode(o, null, {
                overflow: "hidden"
            });
            setNode(h, null, {
                overflow: "hidden"
            });
            var q = Dim.fromNode(h).h;
            m = m || Dim.fromNode(o).h;
            b = b || (q + m);
            var r = Dim.fromNode(j.parentNode).h;
            k = k || getStyle(j, "maxHeight");
            d = !d;
            setNode(j, null, {
                maxHeight: d ? k : "none"
            });
            f.innerHTML = (d ? loc("more") : loc("less")) + "...";
            var s = Dim.fromNode(j.parentNode).h;
            var p = q + (s - r);
            l = l === undefined ? Math.max(m - (p - q), 0) : l;
            a = a || (q - getElementInnerDim(h).h);
            c.run();
            Event.addListener(c, "done", function () {
                setNode(h, null, {
                    overflowY: "auto"
                });
                Event.trigger(h, "expanded")
            });
            c.run()
        };
    UI.maybeRenderMore({
        moreNode: f,
        contentNode: j,
        moreOnClick: n
    })
};
UI.renderTextMore = function (a) {
    a = a || {};
    style = a.style || {};
    style.maxHeight = px(16 * (a.numLines || 2));
    var d = a.text.split("\n");
    if (a.escape || a.escape === undefined) {
        d = d.map(escapeHTML)
    }
    d = d.join("<br>");
    var c = createNode("div", {
        className: "tease"
    }, style, d);
    var b = createNode("div", {
        className: "tease_more clickable"
    }, {
        display: "none"
    });
    UI.activateLinks(c);
    if (a.imgNode || a.metaNode) {
        UI.maybeRenderMorePolaroid({
            moreNode: b,
            contentNode: c,
            imgDiv: a.imgNode,
            textDiv: a.metaNode
        })
    } else {
        UI.maybeRenderMore({
            moreNode: b,
            contentNode: c
        })
    }
    return createNode("div", {
        className: "tease_container " + (a.className || "")
    }, null, [c, b])
};
UI.whiteblock = function (b) {
    if (!UI._whiteblock) {
        UI._whiteblock = document.body.appendChild(createNode("div", {
            className: "whiteblock"
        }));
        Event.addListener(UI._whiteblock, "click", UI.hideWhiteblock);
        UI._whiteblockStack = []
    }
    if (b) {
        var a = overlayZIndex(UI._whiteblock);
        if (UI._aboveWhiteblock) {
            UI._whiteblockStack.push(UI._aboveWhiteblock);
            UI._aboveWhiteblock = b;
            setNode(UI._whiteblock, null, {
                zIndex: a
            });
            setNode(UI._aboveWhiteblock, null, {
                zIndex: a + 1
            })
        } else {
            UI._aboveWhiteblock = b;
            setNode(UI._whiteblock, null, {
                zIndex: a
            });
            setNode(UI._aboveWhiteblock, null, {
                zIndex: a + 1
            })
        }
        if (b.parentNode != document.body) {
            document.body.appendChild(b)
        }
        show(UI._whiteblock);
        show(UI._aboveWhiteblock)
    }
    return UI._whiteblock
};
UI.hideWhiteblock = function () {
    if (UI._aboveWhiteblock && UI._aboveWhiteblock.parentNode) {
        UI._aboveWhiteblock.parentNode.removeChild(UI._aboveWhiteblock);
        UI._aboveWhiteblock = null
    }
    if (UI._whiteblockStack && UI._whiteblockStack.length) {
        UI.whiteblock(UI._whiteblockStack.pop())
    } else {
        hide(UI._whiteblock)
    }
};
UI.renderPolaroids = function (f, m, b) {
    var l = createNode("div");
    for (var c = 0; c < f.length; c++) {
        var k = f[c];
        var g = k["class"];
        var j = (c + 1) % b ? "" : "last";
        var a = l.appendChild(createNode("div", {
            className: "polaroid polaroid_size_" + m + " polaroid_" + g + " " + j
        }));
        var d = a.appendChild(createNode("div"));
        if (g == "collection") {
            d.appendChild(createNode("a", {
                href: k.clickurl
            }, null, UI.setRender(k, m)));
            a.appendChild(createNode("div", {
                className: "under_polaroid no_caption"
            }, null, createNode("div", {
                className: "unit"
            }, null, k.text_under)))
        } else {
            if (g == "thing") {
                d.appendChild(createNode("a", {
                    href: k.clickurl
                }, null, UI.itemRender(k, m)));
                var h = a.appendChild(createNode("div", {
                    className: "under_polaroid no_caption"
                }, null, createNode("div", {
                    className: "unit"
                }, null, k.text_under)));
                h.appendChild(createNode("div", {
                    className: "unit shop_link"
                }, null, UI.priceAndLink(k, {
                    showOriginalPrice: true
                })))
            }
        }
    }
    return l
};
UI.renderAnswer = function (f) {
    var d = createNode("div", {
        className: "qa_entry answer first"
    });
    var g = d.appendChild(createNode("div", {
        className: "left"
    }));
    g.appendChild(UI.renderBuddyIcon(f));
    var a = buildURL("profile", {
        id: f.user_id,
        name: f.user_name
    });
    g.appendChild(createNode("div", {
        className: "text_under"
    }, null, createNode("a", {
        href: a
    }, null, f.user_name)));
    var c = d.appendChild(createNode("div", {
        className: "right"
    }));
    var h = c.appendChild(createNode("div", {
        className: "longtext comment"
    }, null, f.text));
    UI.activateLinks(h);
    if (f.attachments.length) {
        var b = [];
        f.attachments.forEach(function (j) {
            b.push(j.data)
        });
        c.appendChild(UI.renderPolaroids(b, "m", 3))
    }
    c.appendChild(createNode("br", {
        className: "clear"
    }));
    c.appendChild(createNode("span", {
        className: "meta"
    }, null, loc("Answered moments ago")));
    return d
};
UI.renderSetStream = function (a) {
    container = $_(a.container);
    var f = a.stream;
    var h = a.cid;
    var b = a.size || "s2";
    var c = function (j, k) {
            switch (k.type) {
            case "fav":
                return buildURL("set", {
                    id: j.id,
                    faved_by: k.fav_userid
                }, j.seo_title);
            case "lookbook":
                return buildURL("set", {
                    id: j.id,
                    lid: k.lid
                }, j.seo_title);
            case "set":
                return buildURL("set", {
                    id: j.id,
                    stream: null
                }, j.seo_title)
            }
        };
    clearNode(container);
    var g = container.appendChild(createNode("div", {
        className: "car"
    }));
    g.appendChild(createNode("center", null, {
        height: "100%"
    }, createNode("span", {
        className: "loading"
    }, {
        height: "100%"
    })));
    makeUnselectable(g);
    var d;
    if (f.items) {
        d = new MemDataSource(f.items);
        yield(d.ensureLoaded, d)
    } else {
        d = new AjaxDataSource(f.datasource.action, f.datasource.params);
        Event.addListener(window, "load", d.ensureLoaded, d)
    }
    Event.addSingleUseListener(d, "loaded", function () {
        clearNode(g);
        var l = 2;
        var j = a.index;
        if (!j && j !== 0) {
            j = d.values().find({
                id: h
            }, function (o, n) {
                return o.id == n.id
            });
            j = Math.min(j, d.values().length - l);
            j = Math.max(j, 0)
        }
        var k = new CarouselWindow({
            data: d,
            duration: 300,
            className: "thin_carousel",
            renderer: function (p) {
                var n = UI.setRender(p, b);
                var o = createNode("a", {
                    href: c(p, f),
                    className: "hoverborder item " + (p.id == h ? "current" : "")
                }, null, n);
                return o
            },
            size: l,
            index: j
        });
        g.appendChild(k.getNode());
        var m = new FloatingPaginator({
            carouselWindow: k,
            container: g,
            className: "streamPag"
        });
        m.redraw();
        setNode(g, {
            trackcontext: "car." + f.type
        });
        setNode(m.next, {
            trackelement: "next"
        });
        setNode(m.prev, {
            trackelement: "prev"
        });
        k.redraw()
    })
};
UI.itemsGridRender = function (c, f) {
    var h = UI.sizeMap[f].dim;
    var b = createNode("div", {
        className: "grids"
    });
    for (var d = 0; d < c.length; d++) {
        var g = c[d];
        var a = b.appendChild(UI.itemGridRender(g, f));
        if (g.clickurl) {
            a.setAttribute("href", g.clickurl)
        }
    }
    return b
};
UI.setsGridRender = function (d, c) {
    var f = UI.sizeMap[c].dim;
    var a = createNode("div", {
        className: "grids"
    });
    for (var b = 0; b < d.length; b++) {
        a.appendChild(UI.setGridRender(d[b], c))
    }
    return a
};
UI.highchart = function (options) {
    options = options || {};
    options.tooltip = options.tooltip || {};
    options.yAxis = options.yAxis || {};
    options.yAxis.labels = options.yAxis.labels || {};
    options.xAxis = options.xAxis || {};
    options.xAxis.labels = options.xAxis.labels || {};
    if (options.tooltip.formatter) {
        eval("(options.tooltip.formatter = " + options.tooltip.formatter + ")")
    }
    if (options.yAxis.labels.formatter) {
        eval("(options.yAxis.labels.formatter = " + options.yAxis.labels.formatter + ")")
    }
    if (options.xAxis.labels.formatter) {
        eval("(options.xAxis.labels.formatter = " + options.xAxis.labels.formatter + ")")
    }
    return new Highcharts.Chart(options)
};
UI.highchart.FORMAT_NUMBER_SHORT = function () {
    return UI.formatNumberShort(this.value)
};
UI.highchart.FORMAT_DATE_TT_ANALYTICS = function () {
    var c = this.point.y_raw === undefined ? this.y : this.point.y_raw;
    var b = 0;
    var a = mantissa(c);
    if (a) {
        b = Math.min(("" + a).length, 5)
    }
    return [Highcharts.dateFormat("%b %d, %Y", new Date(this.x), 1), "<br>", this.series.name, ": ", "<b>", Highcharts.numberFormat(c, b), "</b>"].join("")
};
UI.highchart.FORMAT_HRS_AGO_XLABEL = function () {
    return this.value > 1 ? this.value - 1 : loc("Now")
};
UI.highchart.FORMAT_HRS_AGO_TT = function () {
    return [(this.x > 1) ? loc("{age} hours ago", {
        age: this.x
    }) : loc("Past hour"), " : ", "<b>", this.y, "</b>", " ", this.series.name].join("")
};
UI.highchart.FORMAT_DATE_TT = function () {
    var a = this.point.y_raw === undefined ? this.y : this.point.y_raw;
    return [Highcharts.dateFormat("%b %d", new Date(this.x), 1), " : ", "<b>", UI.formatNumberShort(a), "</b>", " ", this.series.name].join("")
};
UI.formatNumberShort = function (b) {
    if (b < 1000) {
        return b
    }
    var a = 0;
    while (b >= 1000 && UI.numberSuffixes[a + 1]) {
        b /= 1000;
        ++a
    }
    b = b > 10 ? Math.round(b) : round(b, 0.1);
    return b + UI.numberSuffixes[a]
};
UI.colorBlockRender = function (d, a) {
    var b;
    if (a.w) {
        b = a
    } else {
        b = new Dim(UI.sizeMap[a].dim, UI.sizeMap[a].dim)
    }
    var c = createNode("div", {
        color: d.color.toUpperCase()
    }, {
        position: "relative",
        backgroundColor: d.color,
        width: px(b.w),
        height: px(b.h)
    });
    if (d.color.toUpperCase() == "#FFFFFF") {
        c.appendChild(createNode("div", {
            className: "whiteHighlight"
        }))
    }
    return createNode("a", {
        title: d.title || loc("Rectangle"),
        className: "colorblock",
        href: "#foo"
    }, null, c)
};
UI.colorBlockAutoSizeRender = function (d, a) {
    var b;
    if (a.w) {
        b = a
    } else {
        b = new Dim(UI.sizeMap[a].dim, UI.sizeMap[a].dim)
    }
    var c = createNode("div", {
        color: d.color.toUpperCase()
    }, {
        position: "relative",
        backgroundColor: d.color,
        width: "100%",
        height: "100%"
    });
    if (d.color.toUpperCase() == "#FFFFFF") {
        c.appendChild(createNode("div", {
            className: "whiteHighlight"
        }))
    }
    return createNode("a", {
        title: d.title || loc("Rectangle"),
        className: "grid shape autosize",
        href: "#foo"
    }, null, c)
};
UI.renderDropDownMenu = function (b, d) {
    var g = b.choices || [];
    if (g.length === 0) {
        return d
    }
    var f = b.id || Dom.uniqueId("drop_down_menu");
    var a = b.anchor_id || Dom.uniqueId("drop_down_menu_anchor");
    var c = createNode("span", {
        id: f,
        className: "mod_drop_down_menu"
    }, null, [createNode("span", {
        className: "content"
    }, null, d), createNode("span", {
        id: a,
        className: "anchor"
    }, null, [createNode("span", {
        className: "mod_arrow down blue"
    }, null, "")])]);
    DropDownMenu.createNavDropDown(f, a, g, b.position || "bottom_left");
    return c
};
UI.replaceNodes = function (d) {
    d = d || [];
    for (var b = 0; b < d.length; b++) {
        var c = d[b];
        var f = $_(c.id);
        if (f) {
            var a = str2nodes(c.html);
            setNode(f, null, null, a.nodes);
            a.js()
        }
    }
};
UI.layoutN = function (a, b) {
    return createNode("ul", {
        id: b.id || "",
        className: "layout_n horizontal " + (b.className || "")
    }, null, UI.layoutNBody(a, b))
};
UI.layoutNBody = function (h, k) {
    h = h || [];
    k = k || {};
    var a = k.n;
    var j = k.size || "m2";
    var b = k.offset || 0;
    var f = k.no_last_row || b;
    var g = k.renderer ||
    function (m) {
        return m
    };
    var l = [];
    var c = b;
    var d;
    if (a && !f) {
        d = h.length - (h.length % a || a)
    }
    return h.map(function (n) {
        var m = ["size_" + j];
        if (a && c % a == a - 1) {
            m.push("last")
        }
        if (d !== undefined && c >= d) {
            m.push("last_row")
        }++c;
        return createNode("li", {
            className: m.join(" ")
        }, null, g(n, {
            size: j
        }))
    })
};
UI.renderItem = function (c, a) {
    var f;
    var b = [];
    if (a.size) {
        f = UI.sizeMap[a.size].dim;
        b.push("img_size_" + a.size)
    }
    if (a.className) {
        b.push(a.className)
    }
    var d = createNode("img", {
        id: a.id || "",
        src: c.imgurl,
        className: b.join(" "),
        width: f || c.imgw,
        height: f || c.imgh,
        title: c.title_attr || c.title || "",
        alt: c.alt || c.title,
        trackelement: c.trackelement
    });
    if (c.clickurl) {
        d = createNode("a", {
            oid: a.oid || "",
            className: a.linkClass || "",
            target: a.target || "",
            href: c.clickurl
        }, null, d)
    }
    return d
};
UI.box = function (d, c) {
    var a = d.attributes || {};
    a.className = "box " + a.className;
    var b = d.header_attributes || {};
    b.className = "hd " + b.className;
    var j = d.body_attributes || {};
    j.className = "bd " + j.className;
    var f = createNode("div", a);
    var h = createNode("div", b);
    if (d.header) {
        h.appendChild(createNode("h3", null, null, d.header))
    }
    if (d.actions) {
        UI.renderActions(d.actions, {
            className: "inline"
        })
    }
    f.appendChild(h);
    var g = createNode("div", j, null, c);
    f.appendChild(g);
    return f
};
UI.moreFans = function (b) {
    b = b || {};
    var a = $_(b.container);
    var c = $_(b.actuator);
    Event.addListener(c, "click", function (j) {
        var l = b.n;
        var f = b.size;
        var h = UI.sizeMap[f].dim;
        var k = function (m) {
                m.title = loc("{user} liked this {ago} ago.", {
                    user: m.user_name,
                    ago: duration(m.age)
                });
                m.alt = m.user_name;
                return UI.renderItem(m, {
                    id: m.domid || "",
                    size: f
                })
            };
        var d = [];
        var g = new AutoPaginator(b.action, {
            id: b.object_id,
            length: 200,
            page: 0
        }, {
            scrollbottomNode: a,
            attachNode: a,
            disableUrlRewrite: true,
            prefetch: false,
            onNext: function (m) {
                var o = m.items.filter(function (q) {
                    q.domid = ["fan", q.id || q.age].join("");
                    return !$_(q.domid) && !d.contains(q)
                });
                o.unshift.apply(o, d);
                if (m.more_pages) {
                    var p = o.length % l;
                    d = o.splice(o.length - p, p)
                }
                var n = UI.layoutNBody(o, {
                    no_last_row: m.more_pages,
                    n: l,
                    size: f,
                    renderer: k
                });
                n.forEach(function (q) {
                    a.appendChild(q)
                });
                if (nodeXY(a).y + Dim.fromNode(a).h < scrollXY().y + getWindowSize().h) {
                    yield(this.next, this)
                }
            }
        });
        g.next();
        domRemoveNode(c);
        return Event.stop(j)
    })
};

function LocalStorageDataSource(a) {
    LocalStorageDataSource.superclass.constructor.call(this, [], a);
    this.action = a.action;
    this.params = a.params || {
        ".cacheable": 1,
        ver: 11
    };
    this.onSuccess = a.onSuccess;
    this.noPatricia = a.noPatricia;
    this.dirty = true
}
extend(LocalStorageDataSource, MemDataSource);
LocalStorageDataSource.prototype.getCacheKey = function () {
    var a = ["action=" + encodeURIComponent(this.action)];
    forEachKey(this.params, function (b, c) {
        if (b != "reqSize" && b != "page" && b != "length" && b.indexOf("_") !== 0) {
            a.push(b + "=" + encodeURIComponent(c))
        }
    });
    a.sort();
    return JSON2.stringify(a)
};
LocalStorageDataSource.prototype.isDirty = function () {
    return this.dirty
};
LocalStorageDataSource.prototype.reload = function () {
    Event.trigger(this, "loading");
    if (this.loadStarted) {
        Event.trigger(this, "loaded");
        return
    }
    this.loadStarted = true;
    var f = this.action;
    var d = this;
    var c = this.getCacheKey();
    var b = function (g) {
            if (!g && window.localStorage && localStorage.setItem && localStorage.setItem != noop) {
                LocalStorageCache.set(c, d.values(), LocalStorageCache.WEEK)
            }
            this.dirty = false;
            Event.trigger(d, "loaded")
        };
    var a;
    if (window.localStorage && (a = LocalStorageCache.get(c))) {
        if (a) {
            Event.pauseEvents(this, "change");
            this.setData(a);
            Event.unpauseEvents(this, "change");
            if (this.noPatricia) {
                b(true)
            } else {
                (this.patricia = new Patricia()).insert(this.values(), function () {
                    b(true)
                })
            }
            return
        }
    }
    this.patricia = new Patricia();
    //megaserg
    /*
	Ajax.get({
        action: f,
        data: this.params,
        hideProgress: true,
        onSuccess: function (g) {
            d.onSuccess(g, d, b)
        }
    })*/
};
var DataSourceDataManager = (function () {
    var a = {};
    return {
        _getGroupedObjectData: function (b) {
            if (!a[b]) {
                a[b] = new LocalStorageDataSource({
                    action: b,
                    onSuccess: function (j, h, c) {
                        if (!j.ac_data) {
                            return
                        }
                        var f = buildImgURL("img-favicon", {
                            url: "__URL__",
                            ".out": "png"
                        }, "cgi");
                        var d = [];
                        forEachKey(j.ac_data, function (m, l) {
                            d.push(m)
                        });
                        var g = countingSemaphore(d.length, c);
                        d.forEach(function (l) {
                            var k = (j.ac_data[l] || {}).items || [];
                            k.forEachNonBlocking(32, function (n) {
                                var m;
                                if (typeof (n) == "string") {
                                    m = {
                                        title: n,
                                        filter_type: l,
                                        value: n
                                    }
                                } else {
                                    m = {
                                        title: n.label || n.value,
                                        filter_type: l,
                                        value: n.value || n.label
                                    }
                                }
                                if (l == "displayurl") {
                                    m.imgurl = f.replace("__URL__", encodeURIComponent(m.title))
                                }
                                h.append(m);
                                h.patricia.insert(m)
                            }, function () {
                                Event.trigger(h, "loaded");
                                g()
                            })
                        })
                    }
                })
            }
            return a[b]
        },
        getSearchTabData: function () {
            return DataSourceDataManager._getGroupedObjectData("autocomplete.editor")
        },
        getShopACData: function () {
            return DataSourceDataManager._getGroupedObjectData("autocomplete.shop")
        },
        getAnalyticsACData: function () {
            return DataSourceDataManager._getGroupedObjectData("autocomplete.top_brands_and_hosts")
        },
        getTagData: function () {
            var b = "autocomplete.tag_trends";
            if (!a[b]) {
                a[b] = new LocalStorageDataSource({
                    action: b,
                    onSuccess: function (f, d, c) {
                        if (!f.result || !f.result.items) {
                            return
                        }
                        f.result.items.forEachNonBlocking(32, function (g) {
                            d.append(g);
                            d.patricia.insert(g)
                        }, c)
                    }
                })
            }
            return a[b]
        }
    }
})();
var LocalStorageCache = (function () {
    var WEEK = 1000 * 60 * 60 * 24 * 7;
    var metaKeyPrefix = "meta_";

    function getMetaKey(key) {
        return metaKeyPrefix + key
    }
    var lastCleanup = Number(localStorage.getItem("last_cleanup")) || 0;
    if (lastCleanup + WEEK < new Date().getTime()) {
        yield(function () {
            LocalStorageCache.cleanup()
        })
    }
    return {
        WEEK: WEEK,
        set: function (key, value, expires) {
            localStorage.setItem(key, "(" + JSON2.stringify(value) + ")");
            if (expires) {
                localStorage.setItem(getMetaKey(key), "(" + JSON2.stringify({
                    createdon: new Date().getTime(),
                    expires: new Date().getTime() + expires
                }) + ")")
            }
        },
        get: function (key) {
            var metaDataStr = localStorage.getItem(getMetaKey(key));
            if (metaDataStr) {
                var metaData;
                try {
                    metaData = eval(metaDataStr)
                } catch (e) {}
                if (!metaData) {
                    return this.remove(key)
                }
                var expires = Number(metaData.expires);
                if (expires && expires < new Date().getTime()) {
                    return this.remove(key)
                }
            }
            var dataStr = localStorage.getItem(key);
            if (!dataStr) {
                return this.remove(key)
            }
            var data;
            try {
                data = eval(dataStr)
            } catch (e2) {}
            return data ? data : this.remove(key)
        },
        remove: function (key) {
            localStorage.removeItem(key);
            localStorage.removeItem(getMetaKey(key));
            return null
        },
        cleanup: function () {
            localStorage.setItem("last_cleanup", new Date().getTime());
            var keysToDelete = [];
            for (var i = 0, len = localStorage.length; i < len; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(metaKeyPrefix) < 0) {
                    keysToDelete.push(key)
                }
            }
            keysToDelete.forEach(this.get, this)
        }
    }
})();

function Montage(a, c, b) {
    if (!b) {
        b = {}
    }
    this.contest = b.contest;
    this.lookbooks = b.lookbooks;
    this.productPlacement = b.product_placement;
    this.maxSetItems = b.max_set_items;
    this.searchTab = b.search_tab || {};
    this.template_edit = b.template_edit;
    this.setUserInfo(b.user_info);
    this.state = "clean";
    this.canvas = new Canvas();
    console.log("canvas init with", a);
    console.log(nodeXY(a));
    this.canvas.init(a);
    this.palette = new TabBox(c, {
        bordered: true,
        autoAdjustTabDim: true,
        allowNewTab: true
    });
    this.cid = null;
    this.did = null;
    this.basedon_tid = null;
    this.tid = null;
    this.info = new Props();
    this.info.update({
        title: null,
        description: null,
        category: null,
        tags: null,
        groups: null
    });
    Event.addListener(document, "modifiable", this.onLoad, this);
    Event.addListener(window, "beforeunload", this.onUnLoad, this);
    Event.addListener(window, "resize", this.onResize, this);
	Event.addListener(a, "drop", this.onCanvasDrop, this);
    this.availableActions = {};
    this.enabledActions = [];
    this._undo = new Undo();
    this.defaultControlsState = this.template_edit ? "editTemplate" : "editSet";
    this.setControlsState(this.defaultControlsState);
    this._birth = Math.round(new Date().getTime() / 1000)
}
Montage.prototype.setUserInfo = function (a) {
    if (!a) {
        a = {}
    }
    this.isUserTrusted = a.is_user_trusted;
    this.myGroups = a.my_groups;
    this.accounts = a.accounts || [];
    Event.addListener(Event.BACKEND, "oauth_unconnect", function (b) {
        for (var c = 0; c < this.accounts.length; c++) {
            if (this.accounts[c].service == b) {
                this.accounts[c].authorized = false;
                Event.trigger(this.accounts, "change", this.accounts[c]);
                break
            }
        }
    }, this);
    Event.addListener(Event.BACKEND, "oauth_connect", function (b) {
        for (var c = 0; c < this.accounts.length; c++) {
            if (this.accounts[c].service == b.service) {
                mergeObject(this.accounts[c].service, b);
                Event.trigger(this.accounts, "change", this.accounts[c]);
                break
            }
        }
    }, this);
    Event.trigger(this, "userinfo")
};
Montage.prototype.setContainerSize = function () {
    var b = getWindowSize();
    var a = b.h - Rect.fromNode($_("edapp")).top();
    /*setNode($_("edapp"), null, {
        height: px(a - 9)
    });
    setNode($_("canvas"), null, {
        height: px(a - 18)
    })*/
    a = 460;
    setNode($_("edapp"), null, {
        height: px(a - 9)
    });
    setNode($_("canvas"), null, {
        height: px(a - 18)
    })
    app.canvas._selected._canvasXY = nodeXY($_("canvas"));
};
Montage.prototype.onLoad = function () {
    this.init()
};
Montage.prototype.onResize = function () {
    this.setContainerSize()
};
Montage.prototype.clear = function (a) {
    a = a || {};
    this.info.update({
        title: null,
        description: null,
        category: null,
        tags: null,
        groups: null
    });
    this.cid = null;
    this.did = null;
    this.basedon_tid = null;
    this.tid = null;
    this.setControlsState(this.defaultControlsState);
    this.canvas.clear();
    this.modified = false;
    this.transitState("new");
    this.status();
    this._clearUndo()
};
Montage.prototype.init = function () {
    this.setContainerSize();
    this._tid_editor_clickthrough = LocalStorageCache.get("tid_editor_clickthrough");
    LocalStorageCache.remove("tid_editor_clickthrough");
    Event.addSingleUseListener(this, "nonemptycanvas", function () {
        //Track.stat("inc", "action_from_canvas_text", ["nonemptycanvas", bucketName("blank_canvas_text")])
    });
    var a = this.canvas;
    Event.addListener(a, "select", this.onSelect, this);
    Event.addListener(a, "unselect", this.onUnSelect, this);
    Event.addListener(a, "updateactions", this.updateActions, this);
    Event.addListener(a, "change", this.onCanvasChange, this);
    Event.addListener(this, "saved", this.onSaved, this);
    this.statusBar = a.appendControl(createNode("div", {
        className: "statusbar"
    })).appendChild(createNode("div", {
        id: "statustext"
    }));
    Event.addListener(Event.BACKEND, "loaditem", this.loadItem, this);
    Event.addListener(Event.BACKEND, "loadset", this.onLoadSet, this);
    Event.addListener(Event.BACKEND, "loadtemplate", this.onLoadTemplate, this);
    Event.addListener(Event.BACKEND, "loaddraft", this.onLoadDraft, this);
    Event.addListener(Event.BACKEND, "filltemplate", this.onFillTemplate, this);
    Event.addListener(Event.BACKEND, "signin", this.onSignIn, this);
    Event.addListener(Event.BACKEND, "oauth_twitter", this.refreshUserInfo, this);
    Event.addListener(Event.BACKEND, "deleteset", function (b) {
        if (this.cid == b) {
            this.clear()
        }
    }, this);
    Event.addListener(Event.BACKEND, "deletedraft", function (b) {
        if (this.did == b) {
            this.clear()
        }
    }, this);
    Event.addListener(Event.BACKEND, "deletetemplate", function (b) {
        if (this.tid == b) {
            this.clear()
        }
    }, this);
    Event.checkForBackendEvent();
    this._clearUndo()
};
Montage.prototype.status = function (b, a) {
    if (b) {
        setNode(this.statusBar, {
            className: a || "alert"
        }, null, b)
    } else {
        setNode(this.statusBar, {
            className: ""
        })
    }
};
Montage.prototype.updateActions = function () {
    clearNode(this.actions);
    clearNode(this.itemInfo);
    var d = this.canvas.getSelected();
    var l = d.size();
    if (l === 0) {
        return
    }
    /*var j = d.getIcon();
    if (j) {
        addList(this.actions, j)
    }*/
    var c = d.getActions() || {};
    mergeObject(c, this.availableActions);
    var b = this.enabledActions;
    var k = {};
    var h = 0;
    var f = 0;
    if (c.hidebkgd_btn) {
        k.hidebkgd_btn = c.hidebkgd_btn;
        ++h;
        if (!k.hidebkgd_btn.disabled) {
            ++f
        }
    }
    if (c.showbkgd_btn) {
        k.showbkgd_btn = c.showbkgd_btn;
        ++h;
        if (!k.showbkgd_btn.disabled) {
            ++f
        }
    }
    if (c.cropbkgd_btn) {
        k.cropbkgd_btn = c.cropbkgd_btn;
        ++h;
        if (!k.cropbkgd_btn.disabled) {
            ++f
        }
    }
    if (h > 2 || (h == 2 && f > 1)) {
        c.bg_btns = k;
        delete c.hidebkgd_btn;
        delete c.showbkgd_btn;
        delete c.cropbkgd_btn
    }
    var g = {};
    ["arrange_top_btn", "arrange_middle_btn", "arrange_bottom_btn", "arrange_left_btn", "arrange_center_btn", "arrange_right_btn", "arrange_spread_horizontal_btn", "arrange_spread_vertical_btn"].forEach(function (m) {
        g[m] = c[m];
        delete c[m]
    });
    c.arrange_btns = g;
    b.forEach(function (m) {
        var p = m.id;
        var o = c[p];
        if (!o || o.disabled || (l > 1 && m.single) || (l == 1 && m.multi)) {
            return
        }
        if (typeof (o) == "object") {
            var n = o;
            o = [];
            b.forEach(function (q) {
                if (n[q.id]) {
                    o.push(q);
                    q.method = n[q.id];
                    q.text = q.shortTitle || q.title;
                    q.selected = q.method.selected
                }
            })
        }
        m.trackelement = p;
        addList(this.actions, UI.renderEditorItemAction(d, m, o))
    }, this);
    var a = d.getInfo();
    if (a) {
        replaceChild(this.itemInfo, a)
    }
};
Montage.prototype.onSelect = function (a) {
    this.updateActions()
};
Montage.prototype.onUnSelect = function () {
    this.updateActions()
};
Montage.prototype.onCanvasChange = function () {
    var a = this.info.get("title");
    if (this.canvas.itemCount() === 0) {
        this.modified = false;
        hide(this.toolbar)
    } else {
        this.modified = true;
        show(this.toolbar)
    }
    this._recordUndoState();
    this.updateControls();
    this.transitState("edit")
};
Montage.prototype.onSaved = function (b, a) {
    this.onNotModified()
};
Montage.prototype.onNotModified = function () {
    this.modified = false;
    this._notModifiedState = this._undo.present();
    this.updateControls()
};
Montage.prototype.confirmDiscard = function () {
    if (this.modified) {
        return confirm(loc("Are you sure you want to discard your changes?"))
    } else {
        return true
    }
};
Montage.prototype.validate = function () {
    this.validateErrorMsg = "";
    var a = 0;
    var b = false;
    this.canvas.getItems().forEach(function (c) {
        if (c.constructor != TextItem && c.constructor != ColorBlockItem && c.constructor != SimpleImageItem) {
            a++
        }
        if (c.constructor == PlaceholderItem && c.hasContent()) {
            b = true
        }
    });
    if (a < 2) {
        this.validateErrorMsg = loc("Sets need at least two products.");
        return false
    }
    if (this.basedon_tid && !b) {
        this.validateErrorMsg = loc("You must fill at least 1 placeholder.");
        return false
    }
    return true
};
Montage.prototype.showPublishDialog = function (d, c) {
    if (!this.validate()) {
        Event.trigger(this, "saveerror");
        ModalDialog.alert(this.validateErrorMsg);
        return
    }
    Event.trigger(this, "saveview");
    var b = "";
    var a = "";
    if (c) {
        b = c.prefs.prefill_title;
        a = c.prefs.prefill_notes
    }
    SetInfoBox.show({
        isNewSet: this.cid ? false : true,
        header: c ? loc("Publish Set and Enter Contest") : loc("Publish Set"),
        saveLabel: c ? loc("Enter Contest") : loc("Publish"),
        title: this.info.get("title") || b,
        description: this.info.get("description") || a,
        category: this.info.get("category"),
        tags: this.info.get("tags"),
        groups: this.info.get("groups"),
        availableGroups: this.myGroups,
        accounts: this.accounts,
        items: this.canvas.getItems(),
        onSave: Event.wrapper(function (g) {
            this.info.update(g);
            var f = {
                post_share: g.post_share,
                quickshare: g.quickshare,
                quickshare_list: g.quickshare_list
            };
            if (c) {
                f.contest_id = c.id
            }
            this.doPublish({
                onSuccess: function () {
                    Event.trigger(this, "savesuccess");
                    d.apply(this, arguments)
                },
                extras: f
            })
        }, this),
        onCancel: Event.wrapper(function () {
            Event.trigger(this, "savecancelled")
        }, this)
    })
};
Montage.prototype.onSignIn = function () {
    this.refreshUserInfo()
};
Montage.prototype.refreshUserInfo = function () {
    /*Ajax.get({
        action: "app.user_info",
        onSuccess: Event.wrapper(function (a) {
            this.setUserInfo(a.user_info)
        }, this)
    }, this)*/
};
Montage.prototype.onPublish = function (a) {
    Event.trigger(this, "saveclick");
    Event.addSingleUseListener(Event.BACKEND, "register", function () {
        //Track.stat("inc", "publish_from_masthead", [bucketName("mast_announcement"), bucketName("tid_editor_clickthrough"), this._tid_editor_clickthrough])
    }, this);
    var b = function (f) {
            var d = buildURL("set", {
                id: f.id
            });
            if (f.post_share) {
                var g = Share.connectDialog(this.accounts, true);
                Event.addSingleUseListener(g, "done", function () {
                    var c = {
                        spec_uuid: f.uuid,
                        quickshare: "on",
                        quickshare_list: []
                    };
                    for (var h = 0; h < this.accounts.length; h++) {
                        var j = this.accounts[h];
                        if (j.options.publish_default) {
                            c.quickshare_list.push(j.service)
                        }
                    }
                    if (c.quickshare_list.length) {
                        c.quickshare_list = c.quickshare_list.join(",");
                        /*Ajax.post({
                            busyMsg: loc("Sharing") + "...",
                            action: "set.share",
                            data: c,
                            onSuccess: function (k) {},
                            onFinally: function () {
                                window.location = d
                            }
                        });*/
                        return
                    }
                    window.location = d
                }, this);
                return
            }
            window.location = d
        };
    b = Event.wrapper(b, this);
    this._loginOrDo(function () {
        this.showPublishDialog(b)
    }, this)
};
Montage.prototype._loginOrDo = function (a, c) {
    a = Event.wrapper(a, c);
    if (Auth.isLoggedIn()) {
        a();
        return
    }
    var b = countingSemaphore(2, a);
    Event.addSingleUseListener(this, "userinfo", b);
    SignInBox.signInOrRegister({
        onSuccess: b
    })
};
Montage.prototype.doPublish = function (b) {
    var a = this.canvas.freeze().items;
    a.forEach(Item.cleanSpecForSaving);
    var c = {
        dirty: true,
        id: this.cid,
        did: this.did,
        basedon_tid: this.basedon_tid,
        title: this.info.get("title"),
        description: this.info.get("description"),
        category: this.info.get("category"),
        tags: this.info.get("tags"),
        groups: this.info.get("groups"),
        items: a
    };
    mergeObject(c, b.extras);
    /*Ajax.post({
        busyMsg: loc("Publishing set") + "...",
        action: "set.publish",
        data: c,
        onSuccess: Event.wrapper(function (f) {
            Track.stat("inc", "action_from_canvas_text", ["publish", bucketName("blank_canvas_text")]);
            var d = (this.cid != f.result.cid);
            this.cid = f.result.cid;
            this.did = null;
            this.info.update({
                title: f.result.title,
                description: f.result.description,
                category: f.result.category,
                tags: f.result.tags,
                groups: f.result.groups
            });
            this.canvas.getItems().forEach(function (g) {
                g.onSaved()
            });
            Event.trigger(this, "saved", f.result.cid, d);
            SetInfoBox.hide();
            UI.displayAjaxMessages(f.message, 30000);
            this.transitState("publish");
            if (b.onSuccess) {
                b.onSuccess.call(this, {
                    id: this.cid,
                    uuid: f.result.spec_uuid,
                    post_share: b.extras.post_share,
                    extras: b.extras
                })
            }
        }, this),
        onError: Event.wrapper(function (d) {
            Event.trigger(this, "saveerror");
            this.showPublishDialog(b.onSuccess);
            yield(function () {
                UI.displayAjaxErrors(d, "error_msg")
            })
        }, this)
    })*/
};
Montage.prototype.onSaveDraft = function () {
    callOrSignIn(Event.wrapper(this.doSaveDraft, this))
};
Montage.prototype.doSaveDraft = function () {
    var a = this.canvas.freeze().items;
    if (!a || a.length < 1) {
        return
    }
    a.forEach(Item.cleanSpecForSaving);
    var b = this.tid;
    if (this.template_edit) {
        b = b || 0
    }
    if (!this.did && !this.cid && !b) {
        this.did = "temp_" + createUUID();
        this.transitState("savedraft")
    }
    if (this.saveBtn) {
        setNode(this.saveBtn.childNodes[0], null, null, loc("Saving draft") + "...");
        setNode(this.saveBtn, {
            disabled: "true"
        })
    }
    /*Ajax.post({
        hideProgress: !! this.saveBtn,
        action: "set.draft",
        data: {
            id: this.cid,
            did: this.did,
            tid: b,
            basedon_tid: this.basedon_tid,
            items: a
        },
        onSuccess: Event.wrapper(function (c) {
            if (!this.did || /^temp_/.test(this.did)) {
                this.did = c.did
            }
            this.transitState("savedraft");
            UI.displayAjaxMessages(c.message);
            this.onNotModified();
            this.updateControls()
        }, this)
    })*/
};
Montage.prototype.onUnLoad = function (b) {
    if (this.canvas.itemCount() > this.maxSetItems) {
        return (b.returnValue = loc("This set exceeds the {max_items} item limit and cannot be saved.", {
            max_items: this.maxSetItems
        }))
    } else {
        if (this.modified && Auth.isLoggedIn()) {
            Event.stop(b);
            b.returnValue = loc("Are you sure you want to discard your changes?");
            return loc("Are you sure you want to discard your changes?")
        } else {
            if (!Auth.isLoggedIn()) {
                LocalStorageCache.set("app_spec", JSON2.stringify(this.canvas.freeze().items), LocalStorageCache.WEEK);
                if (Math.random() < 0.1) {
                    var a = this.canvas.freeze().items;
                    a.forEach(Item.cleanSpecForSaving);
                    a.forEach(function (c) {
                        c.x = Math.round(c.x);
                        c.y = Math.round(c.y);
                        c.w = Math.round(c.w);
                        c.h = Math.round(c.h);
                        if (c.scale) {
                            c.scale = Math.round(c.scale, 0.0001)
                        }
                    });
                    /*Ajax.post({
                        action: "set.signedout_log",
                        data: {
                            birth: this._birth,
                            basedon_tid: this.basedon_tid,
                            items: a
                        }
                    })*/
                }
            }
        }
    }
};
Montage.prototype.onCanvasDrop = function (b) {
    var c = b.xDataTransfer.getData("item");
	console.log("inside onCanvasDrop, c: ", c);
    if (c) {
        var d = Event.getPageXY(b);
		var a = nodeXY(this.canvas.getNode());
        d.x -= a.x;
        d.y -= a.y;
        this.addItem(c, d)
    } else {
        if ((c = b.xDataTransfer.getData("set"))) {
            this.onLoadSet(c.id)
        } else {
            if ((c = b.xDataTransfer.getData("draft"))) {
                this.onLoadDraft(c.id)
            } else {
                if ((c = b.xDataTransfer.getData("template"))) {
                    if (c.fill) {
                        this.onFillTemplate(c.id)
                    } else {
                        this.onLoadTemplate(c.id)
                    }
                }
            }
        }
    }
    //Track.trackEvent("drop", "canvas")
};
Montage.prototype.addItem = function (f, h) {
	console.log('addItem called: ', f, h);
    if (this.loading || this.canvas.locked) {
        return
    }
    var c = this.canvas;
    var g = new Dim(f.w, f.h);
    /*g.fit({
        w: 200,
        h: 200
    });*/
    f.w = g.w;
    f.h = g.h;
    var d = Item.thaw(f);
    d.bgColorNode.id = "haircutContainer";
	console.log('inside addItem, d: ', d);
    if (h) {
        var a = d.getRect().center();
        if (h.relative) {
            c.centerItem(d);
            d.move(h.x, h.y)
        } else {
            d.move(h.x - a.x, h.y - a.y)
        }
    } else {
        c.centerItem(d)
    }
    function b() {
        c.clearSelection();
        if (c.addItem(d)) {
            c.select(d)
        }
    }
	console.log('inside addItem, before type: ', f.type);
    if (f.type == Item.TYPES.TEXT) {
        Event.addSingleUseListener(d, "metricsuptodate", b);
        d.computeFontMetrics()
    } else {
		console.log('b to be called');
        b()
    }
    if (c.itemCount() !== 0) {
        Event.trigger(this, "nonemptycanvas")
    }
};
Montage.prototype.loadItem = function (a, b) {
    if (this.controlsState == "fillTemplate") {
        this.clear()
    }
    /*Ajax.get({
        busyMsg: loc("Loading item") + "...",
        action: "item",
        data: {
            id: a
        },
        onSuccess: Event.wrapper(function (c) {
            this.addItem(c.thing, b)
        }, this)
    })*/
};
Montage.prototype.deleteItem = function (a) {
    /*Ajax.post({
        busyMsg: loc("Deleting item") + "...",
        action: "favorite.delete_thing",
        data: {
            tid: a.thing_id
        }
    })*/
};
Montage.prototype.addItemToMyStuff = function (a) {
    /*Ajax.post({
        busyMsg: loc("Adding item") + "...",
        action: "favorite.add_thing",
        data: {
            tid: a.thing_id
        }
    })*/
};
Montage.prototype.onLoadSet = function (a) {
    if (this.confirmDiscard()) {
        this.clear();
        this.loadSet(a)
    }
};
Montage.prototype.loadSet = function (a) {
    this.loading = true;
    /*Ajax.get({
        busyMsg: loc("Loading set") + "...",
        action: "set.load",
        data: {
            id: a
        },
        contract: getHashKey(this),
        onSuccess: Event.wrapper(function (b) {
            this.onSetLoaded(b);
            if (b.collection.basedon_tid) {
                this.setControlsState("fillTemplate")
            } else {
                this.setControlsState("editSet")
            }
            if (b.collection.did) {
                this.transitState("loaddraft");
                Feedback.message(loc("The latest draft of this set has been loaded"))
            } else {
                this.transitState("loadset")
            }
        }, this),
        onFinally: Event.wrapper(function () {
            this.loading = false
        }, this)
    })*/
};
Montage.prototype.onLoadTemplate = function (a) {
    if (!this.template_edit) {
        return
    }
    if (this.confirmDiscard()) {
        this.clear();
        this.loadTemplate(a)
    }
};
Montage.prototype.loadTemplate = function (a) {
    this.loading = true;
    /*Ajax.get({
        busyMsg: loc("Loading template") + "...",
        action: "template.load",
        data: {
            id: a,
            loaddraft: true
        },
        contract: getHashKey(this),
        onSuccess: Event.wrapper(function (b) {
            b.collection = b.template;
            this.onSetLoaded(b);
            this.setControlsState("editTemplate");
            if (this.did) {
                this.transitState("loaddraft");
                Feedback.message(loc("The latest draft of this template has been loaded"))
            } else {
                this.transitState("loadtemplate")
            }
        }, this),
        onFinally: Event.wrapper(function () {
            this.loading = false
        }, this)
    })*/
};
Montage.prototype.onFillTemplate = function (a) {
    if (this.template_edit) {
        return
    }
    if (this.confirmDiscard()) {
        this.clear();
        this.fillTemplate(a)
    }
};
Montage.prototype.fillTemplate = function (a) {
    this.loading = true;
    /*Ajax.get({
        busyMsg: loc("Loading template") + "...",
        action: "template.load",
        data: {
            id: a,
            loaddraft: false
        },
        contract: getHashKey(this),
        onSuccess: Event.wrapper(function (c) {
            c.collection = c.template;
            var b = c.collection.isOwner;
            c.collection.isOwner = 1;
            c.collection.basedon_tid = c.collection.tid;
            delete c.collection.tid;
            if (!b) {
                delete c.collection.title;
                delete c.collection.description;
                delete c.collection.category;
                delete c.collection.tags;
                delete c.collection.groups
            }
            this.onSetLoaded(c);
            if (!b) {
                Event.pauseEvents(this.canvas, "change");
                this.canvas.clearPlaceholders();
                Event.unpauseEvents(this.canvas, "change")
            }
            this._clearUndo();
            this.onNotModified();
            this.setControlsState("fillTemplate");
            this.transitState("filltemplate")
        }, this),
        onFinally: Event.wrapper(function () {
            this.loading = false
        }, this)
    })*/
};
Montage.prototype.onLoadDraft = function (a) {
    if (this.confirmDiscard()) {
        this.clear();
        this.loadDraft(a)
    }
};
Montage.prototype.loadDraft = function (a) {
    this.loading = true;
    /*Ajax.get({
        busyMsg: loc("Loading draft") + "...",
        action: "set.load",
        data: {
            did: a
        },
        contract: getHashKey(this),
        onSuccess: Event.wrapper(function (b) {
            this.onSetLoaded(b);
            if (b.collection.basedon_tid) {
                this.setControlsState("fillTemplate")
            } else {
                if (b.collection.cid) {
                    this.setControlsState("editSet")
                } else {
                    if (b.collection.tid) {
                        this.setControlsState("editTemplate")
                    } else {
                        this.setControlsState(this.canvas.containsPlaceholder() ? "editTemplate" : this.defaultControlsState)
                    }
                }
            }
            this.transitState("loaddraft")
        }, this),
        onFinally: Event.wrapper(function () {
            this.loading = false
        }, this)
    })*/
};
Montage.prototype.onSetLoaded = function (c) {
    var d = c.collection;
    var b = (this.canvas.itemCount() === 0);
    this.info.update({
        title: d.title,
        description: d.description,
        category: d.category,
        tags: d.tags,
        groups: d.groups
    });
    var a;
    if (!b) {
        this.canvas.fit();
        a = this.canvas.freeze().items;
        this.canvas.clear()
    }
    this.canvas.thaw({
        items: d.items
    });
    this.canvas.fit();
    if (!b) {
        this.canvas.thaw({
            items: a
        })
    }
    this.cid = d.cid;
    this.did = d.did;
    this.tid = d.tid;
    this.is_template_draft = this.tid === 0;
    this.basedon_tid = d.basedon_tid;
    if (d.isOwner === 1 && b) {
        this.onNotModified()
    }
    this._clearUndo();
    this.updateControls()
};
Montage.prototype.undo = function () {
    this._restoreUndoState(this._undo.undo())
};
Montage.prototype.redo = function () {
    this._restoreUndoState(this._undo.redo())
};
Montage.prototype._recordUndoState = function () {
    this._undo.push(this.canvas.freeze())
};
Montage.prototype._restoreUndoState = function (a) {
    if (a) {
        Event.pauseEvents(this.canvas, "change");
        var b = this.canvas.getView();
        if (!b || !b.origin || !b.zoom) {
            /*Beacon.log("err", {
                o: "restoreundo",
                nv: JSON2.stringify(b),
                s: stack()
            }, 1)*/
        }
        this.canvas.unlock();
        this.canvas.clear();
        this.canvas.thaw(a);
        this.canvas.gotoView(b);
        this.modified = (this._notModifiedState != a);
        this.setControlsState(this.controlsState);
        if (this.canvas.itemCount() === 0) {
            hide(this.toolbar)
        } else {
            show(this.toolbar)
        }
        Event.unpauseEvents(this.canvas, "change")
    }
};
Montage.prototype._clearUndo = function () {
    this._undo.clear();
    this._recordUndoState();
    this._notModifiedState = this._undo.present()
};
Montage.prototype.deleteSet = function (a) {
    /*Ajax.post({
        busyMsg: loc("Deleting set") + "...",
        action: "set.delete",
        data: {
            id: a.id
        }
    })*/
};
Montage.prototype.discardDraft = function (a) {
    /*Ajax.post({
        busyMsg: loc("Discarding draft") + "...",
        action: "set.discard",
        data: {
            did: a.id
        }
    })*/
};
Montage.prototype.deleteTemplate = function (a) {
    /*Ajax.post({
        busyMsg: loc("Deleting template") + "...",
        action: "template.delete",
        data: {
            id: a.id
        }
    })*/
};
Montage.prototype.onNew = function () {
    //Track.stat("inc", "newbtn", ["click", Auth.isLoggedIn() ? "signedin" : "signedout"]);
    if (this.confirmDiscard()) {
        //Track.stat("inc", "newbtn", ["confirm", Auth.isLoggedIn() ? "signedin" : "signedout"]);
        this.clear()
    }
};
Montage.prototype.onZoomIn = function () {
    this.canvas.zoom(1.25)
};
Montage.prototype.onZoomOut = function () {
    this.canvas.zoom(0.8)
};
Montage.prototype.onFit = function () {
    this.canvas.fit()
};
Montage.prototype.transitState = function (a) {
    var b = Cookie.get("as", true);
    switch (a) {
    case "new":
        this.state = "clean";
        Cookie.clear("as");
        break;
    case "loaddraft":
        this.state = "did";
        Cookie.set("as", {
            did: this.did,
            basedon_tid: this.basedon_tid,
            cid: this.cid,
            tid: this.tid,
            is_template_draft: this.is_template_draft
        });
        break;
    case "savedraft":
        this.state = "did";
        Cookie.set("as", {
            did: this.did,
            basedon_tid: this.basedon_tid,
            cid: this.cid,
            tid: this.tid,
            is_template_draft: this.is_template_draft
        });
        break;
    case "loadset":
        this.state = "cid";
        Cookie.set("as", {
            cid: this.cid,
            basedon_tid: this.basedon_tid
        });
        break;
    case "filltemplate":
        this.state = "cid";
        Cookie.set("as", {
            cid: this.cid,
            basedon_tid: this.basedon_tid
        });
        break;
    case "loadtemplate":
        if (this.template_edit) {
            this.state = "tid";
            Cookie.set("as", {
                tid: this.tid
            })
        }
        break;
    case "publish":
        this.state = "published";
        Cookie.clear("as");
        break;
    case "edit":
        switch (this.state) {
        case "clean":
            this.state = "modified";
            if (!Auth.isLoggedIn()) {
                Cookie.set("as", {
                    basedon_tid: this.basedon_tid
                })
            }
            break;
        case "published":
            if (this.tid) {
                this.state = "tid";
                Cookie.set("as", {
                    tid: this.tid
                })
            } else {
                if (this.cid) {
                    this.state = "cid";
                    Cookie.set("as", {
                        cid: this.cid,
                        basedon_tid: this.basedon_tid
                    })
                }
            }
            break;
        default:
        }
        break;
    default:
        throw "Invalid action " + a
    }
    if (a != "publish") {
        Feedback.hide()
    }
};
Montage.prototype.restoreState = function () {
    if (this.loading || this.state == "cid" || this.state == "did" || this.state == "tid") {
        return
    }
    var state = Cookie.get("as", true);
    if (!state) {
        return
    }
    if (Auth.isLoggedIn()) {
        if (this.template_edit) {
            if (state.did && !state.cid && !state.basedon_tid && state.is_template_draft) {
                this.loadDraft(state.did)
            } else {
                if (state.tid) {
                    this.onLoadTemplate(state.tid)
                }
            }
        } else {
            if (state.did && !state.tid && !state.is_template_draft) {
                this.loadDraft(state.did)
            } else {
                if (state.cid) {
                    this.loadSet(state.cid)
                } else {
                    if (state.basedon_tid) {
                        this.onFillTemplate(state.basedon_tid)
                    }
                }
            }
        }
    } else {
        var localStorageSpec = LocalStorageCache.get("app_spec");
        if (localStorageSpec) {
            var data = {
                collection: {
                    basedon_tid: state && state.basedon_tid,
                    items: []
                }
            };
            try {
                data.collection.items = eval("(" + localStorageSpec + ")")
            } catch (e) {}
            this.onSetLoaded(data);
            this.setControlsState(data.collection.basedon_tid ? "fillTemplate" : this.defaultControlsState)
        }
    }
};
Montage.prototype.setControlsState = function (a) {
    switch (a || "") {
    case "fillTemplate":
        this.controlsState = a;
        this.canvas.lock();
        Event.pauseEvents(this.canvas, "change");
        this.canvas.fit(true);
        Event.unpauseEvents(this.canvas, "change");
        break;
    case "tryTemplate":
        this.controlsState = a;
        this.canvas.lock();
        break;
    case "editTemplate":
        this.controlsState = a;
        this.canvas.unlock();
        break;
    default:
        this.controlsState = "editSet";
        this.canvas.unlock()
    }
    yield(this.updateControls, this)
};
Montage.prototype.updateControls = noop;

function App(a, c, b) {
    App.superclass.constructor.call(this, a, c, b);
    b = b || {};
    this.selectedTab = b.selected_tab;
    this.availableActions = {
        remove_btn: Event.wrapper(this.canvas.removeSelected, this.canvas),
        clone_btn: Event.wrapper(this.canvas.cloneSelected, this.canvas),
        fgnd_btn: Event.wrapper(this.canvas.raiseSelected, this.canvas),
        bkgd_btn: Event.wrapper(this.canvas.lowerSelected, this.canvas),
        arrange_top_btn: Event.wrapper(this.canvas.arrangeTopSelected, this.canvas),
        arrange_middle_btn: Event.wrapper(this.canvas.arrangeMiddleSelected, this.canvas),
        arrange_bottom_btn: Event.wrapper(this.canvas.arrangeBottomSelected, this.canvas),
        arrange_left_btn: Event.wrapper(this.canvas.arrangeLeftSelected, this.canvas),
        arrange_center_btn: Event.wrapper(this.canvas.arrangeCenterSelected, this.canvas),
        arrange_right_btn: Event.wrapper(this.canvas.arrangeRightSelected, this.canvas),
        arrange_spread_horizontal_btn: Event.wrapper(this.canvas.arrangeSpreadHSelected, this.canvas),
        arrange_spread_vertical_btn: Event.wrapper(this.canvas.arrangeSpreadVSelected, this.canvas)
    };
    Event.addListener(a, "keydown", this._onKeyDown, this);
    this.enabledActions = [{
        id: "remove_btn",
        title: loc("Remove"),
        alt: loc("Remove from set")
    }, /*{
        id: "flop_btn",
        title: loc("Flop"),
        alt: loc("Flip horizontaly")
    }, {
        id: "flip_btn",
        title: loc("Flip"),
        alt: loc("Flip vertically")
    },*/ {
        id: "arrange_btns",
        title: loc("Arrange") + " a�? ",
        alt: loc("Arrange selected items"),
        multi: true
    }, {
        id: "arrange_top_btn",
        title: loc("Top"),
        alt: loc("Align the top edge of selected items"),
        multi: true
    }, {
        id: "arrange_middle_btn",
        title: loc("Middle"),
        alt: loc("Vertically align the middle of selected items"),
        multi: true
    }, {
        id: "arrange_bottom_btn",
        title: loc("Bottom"),
        alt: loc("Align the bottom edge of selected items"),
        multi: true
    }, {
        id: "arrange_left_btn",
        title: loc("Left"),
        alt: loc("Align the left edge of selected items"),
        multi: true
    }, {
        id: "arrange_center_btn",
        title: loc("Center"),
        alt: loc("Horizontally align the center of selected items"),
        multi: true
    }, {
        id: "arrange_right_btn",
        title: loc("Right"),
        alt: loc("Align the right edge of selected items"),
        multi: true
    }, {
        id: "arrange_spread_horizontal_btn",
        title: loc("Spread Horizontally"),
        alt: loc("Evenly spread the horizontal space between the selected items"),
        multi: true
    }, {
        id: "arrange_spread_vertical_btn",
        title: loc("Spread Vertically"),
        alt: loc("Evenly spread the vertically space between the selected items"),
        multi: true
    }, /*{
        id: "bg_btns",
        title: loc("Background") + " a�? ",
        alt: loc("Toggle background state")
    },*/ {
        id: "hidebkgd_btn",
        title: loc("Remove Background"),
        shortTitle: loc("Remove"),
        alt: loc("Hide image background")
    }, {
        id: "showbkgd_btn",
        title: loc("Keep Background"),
        shortTitle: loc("Keep"),
        alt: loc("Show image background")
    }, {
        id: "cropbkgd_btn",
        title: loc("Custom Background..."),
        shortTitle: loc("Custom..."),
        alt: loc("Custom crop background")
    }, /*{
        id: "clone_btn",
        title: loc("Clone"),
        alt: loc("Clone")
    }, {
        id: "fgnd_btn",
        title: loc("Forwards"),
        alt: loc("Bring image forward. Shift-click to bring to front.")
    }, {
        id: "bkgd_btn",
        title: loc("Backwards"),
        alt: loc("Send image backward. Shift-click to send to back.")
    },*/ {
        id: "fit_btn",
        title: loc("Fit"),
        alt: loc("Scale and center the item within the placeholder.")
    }, {
        id: "square_btn",
        title: loc("Make Square"),
        alt: loc("Turn rectangle into a square")
    }];
    this.showSponsored = Boolean(b.show_promoted_items);
    yield(function () {
        //megaserg
		//DataSourceDataManager.getSearchTabData().ensureLoaded()
    });
    Event.addListener(Event.BACKEND, "signin", this.updateControls, this);
    Event.addListener(Event.BACKEND, "signout", this.updateControls, this)
}
extend(App, Montage);
App.prototype.init = function () {
    App.superclass.init.call(this);
    var b = this.canvas;
    var o = createNode("div", {
        className: "NE controls"
    });
    b.appendControl(o);
    this.actions = o.appendChild(createNode("ul", {
        className: "toolbar horizontal"
    }));
    this.itemInfo = o.appendChild(createNode("div", {
        className: "iteminfo"
    }));
    var m = (this.toolbar = createNode("ul", {
        className: "toolbar NW vertical controls"
    }));
    b.appendControl(m);
    makeUnselectable(m);
    hide(m);
    /*addList(m, this.publishBtn = this.createButton({
        id: "publish_btn",
        title: loc("Publish") + "...",
        click: this.onPublish,
        alt: loc("Publish current composition")
    }));
    addList(m, this.publishTemplateBtn = this.createButton({
        id: "publish_template_btn",
        title: loc("Publish Template") + "...",
        click: this.onPublishTemplate,
        alt: loc("Publish as a template")
    }));*/
    addList(m, this.submitContestBtn = this.createButton({
        id: "submit_contest_btn",
        title: loc("Enter Contest") + "...",
        click: function () {
            this.onContest(this.contest)
        },
        alt: loc("Publish and enter contest")
    }));
   /* addList(m, this.saveBtn = this.createButton({
        id: "save_btn",
        title: loc("Save Draft"),
        click: function () {
            if (this.modified) {
                this.onSaveDraft()
            }
        },
        alt: loc("Save current composition as draft"),
        key: {
            ctrl: true,
            keyCode: 83,
            keyChar: "s"
        }
    }));
    addList(m, this.newBtn = this.createButton({
        id: "new_btn",
        title: loc("New"),
        click: this.onNew,
        alt: loc("Clear canvas and start over"),
        key: {
            ctrl: true,
            keyCode: 78,
            keyChar: "n"
        }
    }));*/
    this.undoBtn = this.createButton({
        id: "undo_btn",
        title: loc("Undo"),
        click: this.undo,
        key: {
            ctrl: true,
            keyCode: 90,
            keyChar: "z"
        }
    });
    setNode(this.undoBtn, null, {
        marginRight: "2px"
    });
    this.redoBtn = this.createButton({
        id: "redo_btn",
        title: loc("Redo"),
        click: this.redo,
        key: {
            ctrl: true,
            keyCode: 89,
            keyChar: "y"
        }
    });
    addList(m, this.undoRedoBtns = createNode("div", null, null, [this.undoBtn, this.redoBtn]));
    addList(m, this.tryTemplateBtn = this.createButton({
        id: "try_btn",
        title: loc("Try Template"),
        click: this.onTryTemplate,
        alt: loc("Fill in the template")
    }));
    addList(m, this.editTemplateBtn = this.createButton({
        id: "edit_btn",
        title: loc("Edit Template"),
        click: this.onEditTemplate,
        alt: loc("Modfiy the template")
    }));
    /*addList(m, this.zoomInBtn = this.createButton({
        id: "zoom_in",
        title: loc("Zoom In"),
        click: this.onZoomIn
    }));
    addList(m, this.zoomOutBtn = this.createButton({
        id: "zoom_out",
        title: loc("Zoom Out"),
        click: this.onZoomOut
    }));
    addList(m, this.centerBtn = this.createButton({
        id: "fit_btn",
        title: loc("Center"),
        click: this.onFit,
        alt: loc("Re-center items on canvas"),
        key: {
            keyCode: 67,
            keyChar: "c"
        }
    }));*/
    addList(m, this.clearPlaceholdersBtn = this.createButton({
        id: "clearph_btn",
        title: loc("Clear Placeholders"),
        click: this.onClearPlaceholders
    }));
    this._keyboardHandlers[hashKeyboardKey({
        ctrl: true,
        keyCode: 65
    })] = Event.wrapper(this.canvas.selectAll, this.canvas);
    this.onNotModified();
    Event.addListener(this.palette, "newtab", function () {
        this.newSearchTab(true, true)
    }, this);
    var n = "search";
    var k = this.contest;
    if (this.selectedTab) {
        n = this.selectedTab
    } else {
        if (k) {
            n = "contest"
        } else {
            if (this.lookbooks) {
                n = "lookbook"
            } else {
                if (this.template_edit) {
                    n = "templates"
                }
            }
        }
    }
    var l = [];
    if (this.template_edit) {
        l.push(new AppMyItemsTab(this, {
            title: loc("My Items"),
            closable: false,
            trackelement: "my_items",
            selected: n == "mystuff"
        }));
        l.push(new AppMyTemplatesTab(this, {
            title: loc("My Templates"),
            trackelement: "templates",
            closable: false,
            selected: n == "templates"
        }))
    } else {
        if (Auth.isLoggedIn()) {
            l.push(new AppMyItemsTab(this, {
                title: loc("My Items"),
                closable: false,
                trackelement: "my_items",
                selected: n == "mystuff"
            }));
            l.push(new AppSetsTab(this, {
                title: loc("My Sets"),
                trackelement: "sets",
                closable: false,
                selected: false
            }))
        } else {
            Event.addSingleUseListener(Event.BACKEND, "signin", function () {
                this.palette.unshiftTab(new AppSetsTab(this, {
                    title: loc("My Sets"),
                    trackelement: "sets",
                    closable: false,
                    selected: false
                }));
                this.palette.unshiftTab(new AppMyItemsTab(this, {
                    title: loc("My Items"),
                    closable: false,
                    trackelement: "my_items",
                    selected: n == "mystuff"
                }))
            }, this)
        }
        /*l.push(new AppFillTemplatesTab(this, {
            title: loc("Templates"),
            trackelement: "templates",
            closable: false,
            selected: n == "templates"
        }))*/
    }
    this.palette.add(l);
    if (this.template_edit) {
        var g = createNode("div");
        g.appendChild(createNode("div", null, null, loc("Add items &amp; <br> placeholders here")));
        g.appendChild(createNode("div", {
            className: "subheading"
        }, null, loc("Use the {Add_Placeholder} button to add placeholders", {
            Add_Placeholder: createNode("span", {
                id: "empty_addph_btn",
                title: loc("Add a placeholder to your set"),
                className: "hselect_btn"
            }, null, loc("Add Placeholder"))
        })));
        // EMPTY: this.canvas.setEmptyMessage(g);
        Event.addListener($_("empty_addph_btn"), "click", this.onAddPlaceholder, this)
    } else {
        if (!k) {
            /*var q = new IdeaTab(this, {
                title: loc("Ideas"),
                selected: n == "idea",
                closable: false
            });
            this.palette.addTab(q);
            var d, c;
            var j = bucketName("blank_canvas_text");
            if (j === "outfit") {
                d = loc("Create an outfit");
                c = loc("Start by dragging items here.") + " "
            } else {
                if (j === "collage") {
                    d = loc("Create a collage");
                    c = loc("Start by dragging items here.") + " "
                } else {
                    if (j === "publish") {
                        d = loc("Publish an outfit");
                        c = loc("Start by dragging items here.") + " "
                    } else {
                        d = loc("Drag items here");
                        c = ""
                    }
                }
            }
            var a = loc("idea");
            c += loc("Need an {idea} for your next creation?", {
                idea: createNode("span", {
                    id: "idea",
                    className: "clickable"
                }, null, a)
            });
            var f = createNode("div");
            f.appendChild(createNode("div", {
                className: "heading"
            }, null, d));
            f.appendChild(createNode("div", {
                className: "subheading"
            }, null, c));
            //EMPTY: this.canvas.setEmptyMessage(f);
            Event.addListener($_("idea"), "click", function () {
                q.select()
            });
            Event.addListener(q, "select", function () {
                Beacon.log("view", {
                    name: "ideatab"
                })
            })*/
        }
    }
    if (k) {
        var p = new AppContestTab(this, this.contest, {
            title: loc("Contest"),
            closable: false,
            selected: n == "contest"
        });
        this.palette.addTab(p)
    }
    if (this.lookbooks) {
        var h = 0;
        this.lookbooks.forEach(function (r) {
            this.palette.addTab(new AppLookbookTab(this, r, {
                title: teaser(r.title, 12),
                closable: false,
                selected: n == "lookbook" && h++ === 0
            }))
        }, this)
    }
    this.newSearchTab(n == "search");
    this.restoreState();
    if (!Auth.isLoggedIn() && window._firstVisit) {
        /*Beacon.log("view", {
            name: "appfirstvisit"
        })*/
    }
};

function hashKeyboardKey(b) {
    var a = "";
    if (b.ctrl) {
        a += "ctrl-"
    }
    a += b.keyCode;
    return a
}
App.prototype.createButton = function (c) {
    var d = c.alt ? c.alt : c.title;
    var b;
    if (c.key) {
        if (d) {
            d += " "
        }
        var a = "";
        if (c.key.ctrl) {
            a += (Browser.isMac ? "cmd-" : "ctrl-")
        }
        a += c.key.keyChar;
        d += "(";
        d += a;
        d += ")";
        this._keyboardHandlers = this._keyboardHandlers || {};
        c.click = Event.wrapper(c.click, this);
        this._keyboardHandlers[hashKeyboardKey(c.key)] = function () {
            if (b && !b.getAttribute("disabled")) {
                c.click()
            }
        }
    }
    b = createNode("button", {
        id: c.id,
        trackelement: c.id
    }, null, createSprite("", c.title));
    Event.addListener(b, "click", c.click, this);
    Event.addListener(b, "mousedown", Event.stop);
    b.title = d;
    return b
};
App.prototype.updateControls = function () {
    if (this.modified) {
        var f = loc("Save Draft");
        if (this.template_edit) {
            f = loc("Save Template Draft")
        }
        setNode(this.saveBtn, {
            disabled: null
        }, null, createSprite("", f))
    } else {
        setNode(this.saveBtn, {
            disabled: "true"
        }, null, createSprite("", loc("Draft Saved")))
    }
    var h = this.canvas.itemCount();
    if (h > this.maxSetItems) {
        this.status(loc("This set exceeds the {max_items} item limit: {num_items} items", {
            max_items: this.maxSetItems,
            num_items: h
        }) + ".", "alert");
        setNode(this.saveBtn, {
            disabled: true
        });
        setNode(this.publishBtn, {
            disabled: true
        });
        return
    } else {
        if (h >= 0.9 * this.maxSetItems) {
            this.status(loc("This set is approaching the {max_items} item limit: {num_items} items", {
                max_items: this.maxSetItems,
                num_items: h
            }) + ".", "warn")
        } else {
            this.status("")
        }
    }
    var c = Event.wrapper(function () {
        var j = loc("To get the full Polyvore experience, {upgrade} your browser.", {
            upgrade: createNode("a", {
                href: BrowserDetect.browserInfo.upgradeURL,
                target: "_blank"
            }, null, loc("upgrade"))
        }) + " ";
        this.status(j, "info")
    }, this);
    if (this.canvas.itemCount() > 0) {
        var d = this.canvas.getItems()[0].getMatrix();
        if (d && d.rotate === null && BrowserDetect.browserInfo.upgradeURL) {
            c()
        }
    }
    setNode(this.publishBtn, {
        disabled: null
    });
    if (this.canvas.containsPlaceholder()) {
        setNode(this.publishTemplateBtn, {
            disabled: null,
            title: ""
        })
    } else {
        setNode(this.publishTemplateBtn, {
            disabled: true,
            title: loc("Templates require at least 1 placeholder.")
        })
    }
    setNode(this.undoBtn, {
        disabled: this._undo.canUndo() ? null : true
    });
    setNode(this.redoBtn, {
        disabled: this._undo.canRedo() ? null : true
    });
    var b = false;
    var a = false;
    var g = Browser.type("IE", 6, 8);
    this.canvas.getItems().forEach(function (j) {
        if (j.hasContent && j.hasContent()) {
            b = true
        }
        if (g && j.data && j.data.allow_opacity) {
            a = true
        }
    });
    setNode(this.clearPlaceholdersBtn, {
        disabled: b ? null : true
    });
    if (a) {
        c()
    }
    switch (this.controlsState) {
    case "fillTemplate":
        this.availableActions.clone_btn.disabled = true;
        this.availableActions.fgnd_btn.disabled = true;
        this.availableActions.bkgd_btn.disabled = true;
        this.showToolbarBtn(this.newBtn);
        this.showToolbarBtn(this.undoRedoBtns, false);
        this.showToolbarBtn(this.saveBtn, Auth.isLoggedIn());
        this.showToolbarBtn(this.publishBtn);
        this.showToolbarBtn(this.publishTemplateBtn, false);
        this.showToolbarBtn(this.submitContestBtn, false);
        this.showToolbarBtn(this.tryTemplateBtn, false);
        this.showToolbarBtn(this.editTemplateBtn, false);
        this.showToolbarBtn(this.zoomInBtn, false);
        this.showToolbarBtn(this.zoomOutBtn, false);
        this.showToolbarBtn(this.centerBtn, false);
        this.showToolbarBtn(this.clearPlaceholdersBtn);
        addClass(this.canvas.getNode(), "fill");
        this.status(loc("You are filling a template. You can only add items in the designated placeholders."), "info");
        break;
    case "tryTemplate":
        this.availableActions.clone_btn.disabled = true;
        this.availableActions.fgnd_btn.disabled = true;
        this.availableActions.bkgd_btn.disabled = true;
        this.showToolbarBtn(this.newBtn);
        this.showToolbarBtn(this.undoRedoBtns);
        this.showToolbarBtn(this.saveBtn, Auth.isLoggedIn());
        this.showToolbarBtn(this.publishBtn, false);
        this.showToolbarBtn(this.publishTemplateBtn, false);
        this.showToolbarBtn(this.submitContestBtn, false);
        this.showToolbarBtn(this.tryTemplateBtn, false);
        this.showToolbarBtn(this.editTemplateBtn);
        this.showToolbarBtn(this.zoomInBtn, false);
        this.showToolbarBtn(this.zoomOutBtn, false);
        this.showToolbarBtn(this.centerBtn, false);
        this.showToolbarBtn(this.clearPlaceholdersBtn);
        removeClass(this.canvas.getNode(), "fill");
        break;
    case "editTemplate":
        this.availableActions.clone_btn.disabled = false;
        this.availableActions.fgnd_btn.disabled = false;
        this.availableActions.bkgd_btn.disabled = false;
        this.showToolbarBtn(this.newBtn);
        this.showToolbarBtn(this.undoRedoBtns);
        this.showToolbarBtn(this.saveBtn, Auth.isLoggedIn());
        this.showToolbarBtn(this.publishBtn, false);
        this.showToolbarBtn(this.submitContestBtn, false);
        this.showToolbarBtn(this.publishTemplateBtn);
        this.showToolbarBtn(this.tryTemplateBtn, /\btry\b/.test(window.location.toString()));
        this.showToolbarBtn(this.editTemplateBtn, false);
        this.showToolbarBtn(this.zoomInBtn);
        this.showToolbarBtn(this.zoomOutBtn);
        this.showToolbarBtn(this.centerBtn);
        this.showToolbarBtn(this.clearPlaceholdersBtn, false);
        removeClass(this.canvas.getNode(), "fill");
        break;
    default:
        this.availableActions.clone_btn.disabled = false;
        this.availableActions.fgnd_btn.disabled = false;
        this.availableActions.bkgd_btn.disabled = false;
        this.showToolbarBtn(this.newBtn);
        this.showToolbarBtn(this.undoRedoBtns);
        this.showToolbarBtn(this.saveBtn, Auth.isLoggedIn());
        this.showToolbarBtn(this.publishBtn);
        this.showToolbarBtn(this.submitContestBtn, false);
        this.showToolbarBtn(this.publishTemplateBtn, false);
        this.showToolbarBtn(this.tryTemplateBtn, false);
        this.showToolbarBtn(this.editTemplateBtn, false);
        this.showToolbarBtn(this.zoomInBtn);
        this.showToolbarBtn(this.zoomOutBtn);
        this.showToolbarBtn(this.centerBtn);
        this.showToolbarBtn(this.clearPlaceholdersBtn, false);
        removeClass(this.canvas.getNode(), "fill");
        break
    }
    if (this.contest && this.contest.show_submit) {
        this.showToolbarBtn(this.publishBtn, false);
        this.showToolbarBtn(this.submitContestBtn, true)
    }
    Event.trigger(this, "updateControls")
};
App.prototype.newSearchTab = function (d, c, f, a) {
    if (!f) {
        f = loc("All Items")
    }
    /*var b = new AppAllItemsTab(this, {
        title: f,
        closable: c,
        selected: d,
        presets: a,
        trackelement: "all_items",
        pickerCats: this.searchTab.picker_cats,
        productPlacement: this.productPlacement,
        showSponsored: this.showSponsored
    });
    this.palette.addTab(b);
    return b*/
};
App.prototype._onKeyDown = function (c) {
    var a = {
        ctrl: (!Browser.isMac && c.ctrlKey) || (Browser.isMac && c.metaKey),
        keyCode: c.keyCode
    };
    var b = this._keyboardHandlers ? this._keyboardHandlers[hashKeyboardKey(a)] : null;
    if (b) {
        b(c);
        return Event.stop(c)
    }
};
App.prototype.onContest = function (a) {
    this._loginOrDo(function () {
        this.enterContest(a)
    }, this)
};
App.prototype.enterContest = function (a) {
    if (!a) {
        return
    }
    this.showPublishDialog(Event.wrapper(function (d) {
        var c = a.id;
        var b = d.uuid;
        var f = {
            id: c,
            collection_id: this.cid
        };
        mergeObject(f, d.extras);
        ContestActions.contestSubmit(f, {
            onSuccess: function (h) {
                var g = buildURL("contest.show", {
                    id: c
                });
                window.location = g
            },
            onError: function (g) {
                UI.modalDisplayAjaxMessages(g.message)
            }
        })
    }, this), a)
};
App.prototype.onPublishTemplate = function (a) {
    this._loginOrDo(this.publishTemplate, this)
};
App.prototype.publishTemplate = function (c) {
    if (!this.canvas.containsPlaceholder()) {
        ModalDialog.alert(loc("Templates require at least 1 placeholder."));
        return
    }
    if (!this.validate()) {
        ModalDialog.alert(this.validateErrorMsg);
        return
    }
    var a = [{
        type: "header",
        value: loc("Publish Template")
    }, {
        name: "title",
        label: loc("Title"),
        type: "text",
        maxlength: 255
    }, {
        name: "description",
        label: loc("Instructions"),
        type: "textarea",
        maxlength: 4096
    },
    ModalDialog.createErrorElement("error_msg"),
    {
        type: "buttons",
        buttons: [{
            label: loc("Publish"),
            type: "button",
            onClick: Event.wrapper(function (f) {
                var h = extractInputValues(b);
                if (!validateData(h, a)) {
                    b = createForm({
                        inputs: a,
                        data: h
                    });
                    ModalDialog.show(b)
                } else {
                    var d = Event.getSource(f);
                    setNode(d, {
                        value: loc("Publishing") + "...",
                        disabled: "true"
                    });
                    var g = {
                        dirty: true,
                        id: this.tid,
                        did: this.did,
                        items: this.canvas.freeze().items,
                        title: h.title,
                        description: h.description
                    };
                    /*Ajax.post({
                        busyMsg: loc("Publishing template") + "...",
                        action: "template.publish",
                        data: g,
                        onSuccess: Event.wrapper(function (k) {
                            var j = (this.tid != k.result.tid);
                            this.tid = k.result.tid;
                            this.did = null;
                            this.info.update({
                                title: k.result.title,
                                description: k.result.description
                            });
                            this.canvas.getItems().forEach(function (l) {
                                l.onSaved()
                            });
                            Event.trigger(this, "saved", k.result.tid, j);
                            this.onNotModified();
                            UI.displayAjaxMessages(k.message, 30000);
                            this.transitState("publish");
                            ModalDialog.hide()
                        }, this),
                        onError: function (j) {
                            b = createForm({
                                inputs: a,
                                data: h
                            });
                            ModalDialog.show(b);
                            UI.displayAjaxErrors(j, "error_msg")
                        }
                    })*/
                }
            }, this)
        }, {
            label: loc("Cancel"),
            type: "cancel",
            onClick: function () {
                ModalDialog.hide()
            }
        }]
    }];
    var b = createForm({
        inputs: a,
        data: {
            title: this.info.get("title"),
            description: this.info.get("description")
        }
    });
    Event.addSingleUseListener(b, "destruct", function () {
        Event.release(b)
    });
    ModalDialog.show(b)
};
App.prototype.onTryTemplate = function (a) {
    this.setControlsState("tryTemplate")
};
App.prototype.onEditTemplate = function (a) {
    this.setControlsState("editTemplate")
};
App.prototype.onAddPlaceholder = function (a) {
    if (!this.loading) {
        this.addItem({
            type: Item.TYPES.PLACEHOLDER,
            w: 200,
            h: 200
        })
    }
};
App.prototype.onClearPlaceholders = function (a) {
    this.canvas.clearPlaceholders();
    this.updateControls()
};
App.prototype.showToolbarBtn = function (a, b) {
    if (a && a.parentNode) {
        if (b || b === undefined) {
            show(a.parentNode)
        } else {
            hide(a.parentNode)
        }
    }
};

! function(e) {
    "use strict";
    jQuery(".loader").delay().fadeOut("slow");
    var t = e(".sticky-header"),
        i = e(".scroll-top");
    e(window).on("scroll", function() {
        e(this).scrollTop() > 100 ? t.addClass("animated fadeInDown menu-fixed") : t.removeClass("animated fadeInDown menu-fixed"), e(this).scrollTop() > 800 ? i.addClass("open") : i.removeClass("open")
    }), e(".menu-search").on("click", function() {
        e(".menu-search-form").addClass("open")
    }), e(".menu-search-close").on("click", function() {
        e(".menu-search-form").removeClass("open")
    }), e("a.page-scroll").on("click", function(t) {
        var i = e(this);
        e("html, body").stop().animate({
            scrollTop: e(i.attr("href")).offset().top
        }, 1500, "easeInOutExpo"), t.preventDefault()
    });
    var a = e("#list"),
        n = e("#grid");
    a.on("click", function() {
        e(".product-item-grid").animate({
            opacity: 0
        }, function() {
            e(".grid").removeClass("grid-active"), e(".list").addClass("list-active"), e(".product-item-grid").attr("class", "product-item-list shadow"), e(".product-item-list").stop().animate({
                opacity: 1
            })
        })
    }), n.on("click", function() {
        e(".product-item-list").animate({
            opacity: 0
        }, function() {
            e(".list").removeClass("list-active"), e(".grid").addClass("grid-active"), e(".product-item-list").attr("class", "product-item-grid shadow"), e(".product-item-grid").stop().animate({
                opacity: 1
            })
        })
    });


    new Swiper(".banner-slider", {
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: !0
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: !1
        },
        loop: !0
    }), new Swiper(".category-slider", {
        slidesPerView: 10,
        autoplay: {
            delay: 2e3,
            disableOnInteraction: !1
        },
        spaceBetween: 0,
        loop: !0,
        navigation: {
            nextEl: ".category-button-next",
            prevEl: ".category-button-prev"
        },
        breakpoints: {
            580: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 6
            }
        }
    }), new Swiper(".category-slider-three", {
        slidesPerView: 6,
        autoplay: {
            delay: 2e3,
            disableOnInteraction: !1
        },
        spaceBetween: 0,
        loop: !0,
        navigation: {
            nextEl: ".category-three-button-next",
            prevEl: ".category-three-button-prev"
        },
        breakpoints: {
            580: {
                slidesPerView: 2
            },
            991: {
                slidesPerView: 4
            }
        }
    }), new Swiper(".testimonial-slider", {
        navigation: {
            nextEl: ".testimonial-button-next",
            prevEl: ".testimonial-button-prev"
        }
    }), new Swiper(".partner-slider", {
        slidesPerView: 6,
        autoplay: {
            delay: 2e3,
            disableOnInteraction: !1
        },
        loop: !0,
        spaceBetween: 20,
        breakpoints: {
            480: {
                slidesPerView: 2
            },
            580: {
                slidesPerView: 3
            },
            767: {
                slidesPerView: 4
            },
            991: {
                slidesPerView: 5
            }
        }
    }), new Swiper(".partner-slider-two", {
        slidesPerView: 5,
        autoplay: {
            delay: 2e3,
            disableOnInteraction: !1
        },
        loop: !0,
        spaceBetween: 20,
        breakpoints: {
            480: {
                slidesPerView: 1
            },
            580: {
                slidesPerView: 2
            },
            767: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 4
            }
        }
    }), (e = jQuery)(window).width();
    var o = e(window).height();
    window.innerWidth, e("html");
    jQuery.fn.isOnScreen = function() {
        var t = e(window),
            i = {
                top: t.scrollTop(),
                left: t.scrollLeft()
            };
        i.right = i.left + t.width(), i.bottom = i.top + t.height();
        var a = this.offset();
        return a.right = a.left + this.outerWidth(), a.bottom = a.top + this.outerHeight(), !(i.right < a.left || i.left > a.right || i.bottom < a.top || i.top > a.bottom)
    }, jQuery(".fw-animated-element").each(function() {
        var t = e(this),
            i = parseInt(t.data("animation-delay")) / 1e3,
            a = t.data("animation-type");
        t.isOnScreen() && (t.hasClass("animated") || t.addClass("animated").addClass(a).trigger("animateIn"), t.css({
            "-webkit-animation-delay": i + "s",
            "animation-delay": i + "s"
        })), e(window).scroll(function() {
            var n = t.offset().top,
                s = t.outerHeight() + n,
                r = e(this).scrollTop();
            if (r > (n = n - o) && r < s) {
                t.hasClass("animated") || t.addClass("animated").addClass(a).trigger("animateIn"), t.css({
                    "-webkit-animation-delay": i + "s",
                    "animation-delay": i + "s"
                });
                jQuery(".animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    e(this).addClass("fill-mode-none")
                })
            }
        })
    }), jQuery(function(e) {
        if (e(".review-form").length) {
            var t = e(".review-form .filled"),
                i = e("#review-course-value");
            t.find("li").on("mouseover", function() {
                e(this).nextAll().find("span").removeClass("fa-star").addClass("fa-star-o"), e(this).prevAll().find("span").removeClass("fa-star-o").addClass("fa-star"), e(this).find("span").removeClass("fa-star-o").addClass("fa-star"), i.val(e(this).index() + 1)
            })
        }
    });
    var s = window.location.href.replace(window.location.hash, "");
    e(document).on("click", ".facebook-share", function(e) {
        return e.preventDefault(), window.open("https://www.facebook.com/sharer/sharer.php?u=" + s, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), e(document).on("click", ".twitter-share", function(t) {
        return t.preventDefault(), window.open("http://twitter.com/intent/tweet?text=" + encodeURIComponent(e("h1").text()) + " " + s, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), e(document).on("click", ".pinterest-share", function(t) {
        return t.preventDefault(), window.open("http://pinterest.com/pin/create/button/?url=" + s + "&media=" + e("article img").first().attr("src") + "&description=" + e("h1").text(), "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    }), e(document).on("click", ".google-share", function(e) {
        return e.preventDefault(), window.open("https://plus.google.com/share?url=" + s, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
    })
}(jQuery);
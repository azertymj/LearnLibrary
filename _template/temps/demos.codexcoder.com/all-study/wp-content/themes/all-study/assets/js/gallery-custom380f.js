!function(t){"use strict";jQuery(window).on("load",function(){var e=t(".gallery-items").isotope({itemSelector:".gallery-item",percentPosition:!0,transitionDuration:"0.5s",masonry:{columnWidth:".gallery-item",gutter:30},getSortData:{name:".name",symbol:".symbol",number:".number parseInt",category:"[data-category]",weight:function(e){var a=t(e).find(".weight").text();return parseFloat(a.replace(/[\(\)]/g,""))}}}),a={numberGreaterThan50:function(){var e=t(this).find(".number").text();return parseInt(e,10)>50},ium:function(){return t(this).find(".name").text().match(/ium$/)}};t(".gallery-menu").on("click","li",function(){var n=t(this).attr("data-filter");n=a[n]||n,e.isotope({filter:n})}),t(".gallery-menu").each(function(e,a){var n=t(a);n.on("click","li ",function(){n.find(".active").removeClass("active"),t(this).addClass("active")})}),t("a[data-rel^=lightcase]").lightcase()})}(jQuery);
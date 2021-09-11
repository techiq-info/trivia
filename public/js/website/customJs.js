function ScrollNext(n) {
    $("#" + n).show();
    $("a[href='#" + n + "']").click();
}
var scrollTrigger, backToTop;
if ($("#back-to-top").length) {
    scrollTrigger = 100;
    backToTop = function () {
        var n = $(window).scrollTop();
        n > scrollTrigger
            ? $("#back-to-top").addClass("show")
            : $("#back-to-top").removeClass("show");
    };
    backToTop();
    $(window).on("scroll", function () {
        backToTop();
    });
    $("#back-to-top").on("click", function (n) {
        n.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 700);
    });
}
if (
    ($(document).ready(function () {
        var n, t, i;
        $(window).width() < 767 &&
            ((n = 128),
            $(".nav-collapse").scrollspy({ offset: n }),
            (t = $(document.body)),
            (i = $(".navbar").outerHeight(!0) + 92),
            $("body").scrollspy({ target: ".MainNav", offset: 95 }),
            $("ul.nav.navbar-nav li a").click("click", function () {
                n = 370;
                $("#FixNav").hasClass("affix-top") || (n = 170);
                $("html,body").animate({
                    scrollTop:
                        $("#content").find($(this).attr("href")).offset().top -
                        n,
                });
                $(".navbar-toggle").css("display") != "none" &&
                    $(".navbar-toggle").trigger("click");
            }));
    }),
    $("body").scrollspy({ target: ".sidebar", offset: 110 }),
    $("ul.nav li a").bind("click", function () {
        $("html,body").animate({ scrollTop: $(this.hash).offset().top - 91 });
        $(this)
            .parent()
            .parent()
            .find("li")
            .each(function () {
                $(this).hasClass("active") && $(this).removeClass("active");
            });
        $($(this).parent()[0]).addClass("active");
    }),
    $(".nav.nav-list.affix").height($(".content").height()),
    $("input[type='file']").change(function () {
        $(this)
            .siblings(".fileval")
            .text(this.value.replace(/C:\\fakepath\\/i, ""));
        var n = $(this).attr("data-clear");
        $(n).show();
    }),
    $(".fileclear").click(function () {
        var n = $(this).attr("data-control");
        $(n).val("");
        $(this).hide();
    }),
    $("a.founders").click("click", function () {
        offsetHeight = 210;
        $("#FixNav").hasClass("affix-top") || (offsetHeight = 85);
        $("html,body").animate({
            scrollTop:
                $("#content").find($(this).attr("href")).offset().top -
                offsetHeight,
        });
    }),
    $(window).scroll(function () {
        $(window).scrollTop() + $(window).height() > $(document).height() - 0
            ? $(".callus").addClass("fixed_button")
            : $(".callus").removeClass("fixed_button");
    }),
    $(".btn-primary.reset").click(function () {
        $(".signup input").first().focus();
    }),
    $("#back-to-top").length)
) {
    scrollTrigger = 100;
    backToTop = function () {
        var n = $(window).scrollTop();
        n > scrollTrigger
            ? $("#back-to-top").addClass("show")
            : $("#back-to-top").removeClass("show");
    };
    backToTop();
    $(window).on("scroll", function () {
        backToTop();
    });
    $("#back-to-top").on("click", function (n) {
        n.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 700);
    });
}

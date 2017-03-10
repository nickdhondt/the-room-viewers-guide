$(document).ready(init);

function init() {
    var scrollSpyArray = [
        [$("#intro"), $("#introLink")],
        [$("#cheers"), $("#cheersLink")],
        [$("#activities"), $("#activitiesLink")],
        [$("#singalong"), $("#singAlongLink")],
        [$("#screenings"), $("#screeningsLink")],
        [$("#additional"), $("#additionalLink")]
    ];

    $.each(scrollSpyArray, function (index, element) {
        scrollSpy(element[0], element[1]);

        element[1].click(hideNavMenu);
    });

    $("#topLink, main, footer").click(hideNavMenu);

    $("#menu").click(toggleMenu);

    $(document).scroll(function () {
        navBarSpy();
    });

    navBarSpy();
    smoothScroll();
    $(window).scroll();
}

function hideNavMenu() {
    $("#nav").first().addClass("hidden-md-down");
}

function smoothScroll() {
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
}

function navBarSpy() {
    var scrollTop = $(document).scrollTop();
    var brand = $("#brand").first();
    var bar = $(".header__bar").first();

    if (scrollTop >= 80 && !brand.hasClass("brand--sm")) {
        brand.addClass("brand--sm");
        bar.addClass("header__bar--sm");
    }
    else if (scrollTop < 80 && brand.hasClass("brand--sm")) {
        brand.removeClass("brand--sm");
        bar.removeClass("header__bar--sm");
    }
}

function toggleMenu() {
    var nav = $("#nav").first();
    if (nav.hasClass("hidden-md-down")) nav.removeClass("hidden-md-down");
    else nav.addClass("hidden-md-down");
}

function scrollSpy(element, link) {
    var enter, leave;
    var buffer = 90;

    if (window.matchMedia("screen and (min-width: 992px)").matches) buffer = 90;
    else buffer = 78;

    $(window).scroll(function () {
        var top = element.offset().top - 5;
        var scrollTop = $(document).scrollTop();
        var height = element.height() - buffer;

        if ((scrollTop >= top && scrollTop <= top + height) && enter !== true) {
            enter = true;
            leave = false;
            link.addClass("nav-box__ref--active");
        } else if ((scrollTop >= top + height || scrollTop <= top) && leave !== true) {
            leave = true;
            enter = false;
            link.removeClass("nav-box__ref--active");
        }
    });
}
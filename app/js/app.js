$(document).ready(init);

function init() {
    var scrollSpyArray = [[$("#intro"), $("#introLink")], [$("#cheers"), $("#cheersLink")], [$("#activities"), $("#activitiesLink")], [$("#singalong"), $("#singAlongLink")]];

    $.each(scrollSpyArray, function (index, element) {
        scrollSpy(element[0], element[1]);

        element[1].click(function () {
            $("#nav").first().addClass("hidden-sm-down");
        });
    });

    $("#topLink, main, footer").click(function () {
        $("#nav").first().addClass("hidden-sm-down");
    });

    $("#menu").click(toggleMenu);

    $(document).scroll(function () {
        navBarSpy();
    });

    navBarSpy();

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

    if (scrollTop >= 80 && !brand.hasClass("brand-sm")) brand.addClass("brand-sm");
    else if (scrollTop < 80 && brand.hasClass("brand-sm")) brand.removeClass("brand-sm");
}

function toggleMenu() {
    var nav = $("#nav").first();
    if (nav.hasClass("hidden-sm-down")) nav.removeClass("hidden-sm-down");
    else nav.addClass("hidden-sm-down");
}

function scrollSpy(element, link) {
    var enter, leave;

    $(document).scroll(function () {
        var top = element.offset().top - 5;
        var scrollTop = $(document).scrollTop();
        var height = element.height() - 90;

        if ((scrollTop >= top && scrollTop <= top + height) && enter !== true) {
            enter = true;
            leave = false;
            link.addClass("active");
        } else if ((scrollTop >= top + height || scrollTop <= top) && leave !== true) {
            leave = true;
            enter = false;
            link.removeClass("active");
        }
    });
}
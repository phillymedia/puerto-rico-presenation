$(document).ready(function() {
    $("#insertimage").html('<div class="backgroundImage" id="backgroundImage-1"></div>');


    if ($(".content").attr("class").includes("is-subscriber")) {
        console.log("notop")
    } else {
        $(".headerIntro").css("margin-top", $(".header").height());
    }
    var loadGalleryImage = function(frame) {
        var img = frame.find("img");
        if (img.attr("src") == "#") {
            var datasrc = img.attr("data-src");
            img.attr("src", datasrc);
            attr = datasrc;
        }
        return img;
    };

    var advance = function(gallery, direction) {
        gallery.find(".noNext").removeClass("noNext");
        var caption = gallery.find(".caption");
        var current = gallery.find(".active");
        var images = $(".gallery-img", gallery);
        var index = images.index(current);
        var direction;
        if (direction == "right") {
            var next = $(images[index + 1]);
            var afterNext = $(images[index + 2]);
        } else {
            var next = $(images[index - 1]);
            var afterNext = $(images[index - 2]);
        }

        if (images.index(afterNext) < 0) {
            var getDirection;
            if (direction == "right") {
                getDirection = "next";
            } else {
                getDirection = "prev";
            }

            var getClass = "." + getDirection;
            gallery.find(getClass).addClass("noNext");
        } else {
            gallery.find(".noNext").removeClass("noNext");
        }
        if (images.index(next) < 0) return;

        var image = loadGalleryImage(next);
        if (afterNext) loadGalleryImage(afterNext);

        next.addClass("active");
        current.removeClass("active");

        caption.html(next.find("img").attr("alt"));
        if (!next.attr("data-index")) {
            gallery.find(".count").text(1);
        } else {
            gallery.find(".count").text(Number(next.attr("data-index")) + 1);
        }

        next.removeClass("post-active animate fade");
        current.addClass("post-active animate");
        current.addClass("fade");
        next.addClass("animate");
    }

    $(".dg-gallery").each(function() {
        var $this = $(this);
        var photoc = $(this).find(".active img").attr("alt");
        var $cont = $(this).find(".caption");
        $(this).find(".caption").html($(this).find(".active img").attr("alt"));

        if ($(this).find(".gallery-img").length < 2) {
            $(this).find(".arr").remove();
            return;
        }
        $(this).find(".arr").on("click", function() {
            var direction = $(this).attr("class");
            advance($this, direction.includes("next") ? "right" : "left");
        })
    })

    $(window).scroll(function() {
        $(".dg-gallery").each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                var firstImg = $(this).find(".active.gallery-img");
                if (firstImg.next().find("img").length > 0) {
                    nextsrc = firstImg.next().find("img").attr("data-src");
                    if (nextsrc == "#") return false;
                    firstImg.next().find("img").attr("src", nextsrc);
                }
            }
            return true;
        })
    })
});

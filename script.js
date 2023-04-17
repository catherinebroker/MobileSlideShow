if (navigator.msMaxTouchPoints) {
  $("#slider").addClass("ms-touch");

  // $('#slider').on('scroll', function() {
  //   $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
  // });
} else {
  var slider = {
    el: {
      slider: $("#slider"),
      holder: $(".holder"),
      prev: $(".chevron-left"),
      next: $(".chevron-right"),
      sliderDotNav: $(".slider-dotnav"),
      dot: undefined,
      // imgSlide: $(".slide-image")
    },

    slideWidth: $("#slider").width(),
    numOfSlides: $(".holder > .slide-wrapper").length,
    touchstartx: undefined,
    touchmovex: undefined,
    movex: undefined,
    index: 0,
    longTouch: undefined,

    init: function () {
      this.populateDotNav();
      this.bindUIEvents();
    },

    populateDotNav: function () {
      for (var a = 0; a < this.numOfSlides; a++) {
        this.el.sliderDotNav.append(
          '  <a href="javascript: void(0)" id="dot' +
            a +
            '" class="dot' +
            (a === 0 ? " active" : "") +
            '">  </a> '
        );
      }
      this.el.dot = $(".slider-dotnav > .dot");
    },

    bindUIEvents: function () {
      // Touch Events
      this.el.holder.on("touchstart", function (event) {
        slider.start(event);
      });

      this.el.holder.on("touchmove", function (event) {
        slider.move(event);
      });

      this.el.holder.on("touchend", function (event) {
        slider.end(event);
      });

      // Chevron Previous and Next Events
      this.el.next.on("click", function (event) {
        slider.nextSlide(event);
      });

      this.el.prev.on("click", function (event) {
        slider.prevSlide(event);
      });

      //Dot Navigation Event
      this.el.dot.on("click", function (event) {
        slider.dotNavEvent(event);
      });
    },

    start: function (event) {
      // Test for flick.
      this.longTouch = false;
      setTimeout(function () {
        window.slider.longTouch = true;
      }, 250);

      // Get the original touch position.
      this.touchstartx = event.originalEvent.touches[0].pageX;

      // The movement gets all janky if there's a transition on the elements.
      $(".animate").removeClass("animate");
    },

    move: function (event) {
      // Continuously return touch position.
      this.touchmovex = event.originalEvent.touches[0].pageX;
      // Calculate distance to translate holder.
      this.movex =
        this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
      // Defines the speed the images should move at.
      var panx = 100 - this.movex / 6;
      if (this.movex < 600) {
        // Makes the holder stop moving when there is no more content.
        this.el.holder.css(
          "transform",
          "translate3d(-" + this.movex + "px,0,0)"
        );
      }
      // if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
      //   this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
      // }
    },

    end: function (event) {
      // Calculate the distance swiped.
      var absMove = Math.abs(this.index * this.slideWidth - this.movex);
      // Calculate the index. All other calculations are based on the index.
      if (absMove > this.slideWidth / 2 || this.longTouch === false) {
        if (this.movex > this.index * this.slideWidth && this.index < 3) {
          this.index++;
        } else if (
          this.movex < this.index * this.slideWidth &&
          this.index > 0
        ) {
          this.index--;
        }
      }

      this.gotoSlide();
    },

    nextSlide: function (event) {
      if (this.index < 3) {
        this.index++;
      }

      this.gotoSlide();
    },

    prevSlide: function (event) {
      if (this.index > 0) {
        this.index--;
      }

      this.gotoSlide();
    },

    dotNavEvent: function (event) {
      var clickedDot = event.target;
      // supports slideshows with up to 99 slides, lol (double digits)
      var dotId = clickedDot.id.substring(3, 4);
      this.index = dotId;
      // $(".slider-dotnav > .active").removeClass("active");
      // clickedDot.classList.add("active");

      this.gotoSlide();
    },

    gotoSlide: function () {
      // Move and animate the elements.
      this.el.holder
        .addClass("animate")
        .css(
          "transform",
          "translate3d(-" + this.index * this.slideWidth + "px,0,0)"
        );

      // Update dot navigation
      var desiredDot = document.getElementById("dot" + this.index);
      $(".slider-dotnav > .active").removeClass("active");
      desiredDot.classList.add("active");
      // this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
    },
  };

  slider.init();
}

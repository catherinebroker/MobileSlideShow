if (navigator.msMaxTouchPoints) {
  document.getElementById("slider").classList.add("ms-touch");
} else {
  var slider = {
    el: {
      slider: document.getElementById("slider"),
      holder: document.querySelector(".holder"),
      prev: document.querySelector(".chevron-left"),
      next: document.querySelector(".chevron-right"),
      sliderDotNav: document.querySelector(".slider-dotnav"),
      dot: undefined,
    },

    slideWidth: document.getElementById("slider").offsetWidth,
    numOfSlides: document.querySelectorAll(".holder > .slide-wrapper").length,
    touchstartx: undefined,
    touchmovex: undefined,
    movex: undefined,
    index: 0,
    longTouch: undefined,

    init: function () {
      this.populateDotNav();
      this.bindUIEvents();
      console.log(this.slideWidth)
    },


    populateDotNav: function () {
      for (var a = 0; a < this.numOfSlides; a++) {
        var dot = document.createElement("a");
        dot.setAttribute("href", "javascript:void(0)");
        dot.setAttribute("id", "dot" + a);
        dot.classList.add("dot");
        if (a === 0) {
          dot.classList.add("active");
        }
        this.el.sliderDotNav.appendChild(dot);
      }
      this.el.dot = document.querySelectorAll(".slider-dotnav > .dot");
    },

    bindUIEvents: function () {
      // Touch Events
      this.el.holder.addEventListener("touchstart", function (event) {
        slider.start(event);
      });

      this.el.holder.addEventListener("touchmove", function (event) {
        slider.move(event);
      });

      this.el.holder.addEventListener("touchend", function (event) {
        slider.end(event);
      });

      // Chevron Previous and Next Events
      this.el.next.addEventListener("click", function (event) {
        slider.nextSlide(event);
      });

      this.el.prev.addEventListener("click", function (event) {
        slider.prevSlide(event);
      });

      //Dot Navigation Event
      for (var i = 0; i < this.el.dot.length; i++) {
        this.el.dot[i].addEventListener("click", function (event) {
          slider.dotNavEvent(event);
        });
      }
    },

    start: function (event) {
      // Test for flick.
      this.longTouch = false;
      setTimeout(function () {
        window.slider.longTouch = true;
      }, 250);

      // Get the original touch position.
      this.touchstartx = event.touches[0].pageX;

      // The movement gets all janky if there's a transition on the elements.
      document.querySelectorAll(".animate").forEach(function (el) {
        el.classList.remove("animate");
      });
    },

    move: function (event) {
      // Continuously return touch position.
      this.touchmovex = event.touches[0].pageX;
      // Calculate distance to translate holder.
      this.movex =
        this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
      // Defines the speed the images should move at.
      var panx = 100 - this.movex / 6;
      if (this.movex < 600) {
        // Makes the holder stop moving when there is no more content.
        this.el.holder.style.transform =
          "translate3d(-" + this.movex + "px,0,0)";
      }
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

      this.gotoSlide();
    },

    gotoSlide: function () {
      // Move and animate the elements.
      this.el.holder.classList.add("animate");
      this.el.holder.style.transform =
        "translate3d(-" + this.index * this.slideWidth + "px,0,0)";

      // Update dot navigation
      var dotnav = document.querySelector(".slider-dotnav");
      var activeDot = dotnav.querySelector(".active");
      activeDot.classList.remove("active");
      var desiredDot = document.getElementById("dot" + this.index);
      desiredDot.classList.add("active");
    },
  };

  slider.init();
}

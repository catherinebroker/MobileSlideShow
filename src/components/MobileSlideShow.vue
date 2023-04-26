<template>
  <div ref="root">
    <a @click="prevSlide()" class="chevron-left">&#8249;</a>

    <div class="slider-wrap">
      <div
        class="slider"
        id="slider"
        ref="slider"
        @touchstart="start"
        @touchmove="move"
        @touchend="end"
      >
        <div class="holder">
          <div v-for="slides in slides" class="slide-wrapper">
            <div :id="slides.slideId" class="slide" :style="{'background-color': slides.backgroundColor}"></div>
            <span class="slideNumber">{{ slides.slideNumber }}</span>
          </div>
        </div>
      </div>

      <nav class="slider-dotnav">
        <a
          v-for="slides in slides"
          :key="slides.slideNumber"
          href="javascript:void(0)"
          :class="{ active: slides.slideNumber === 0 }"
          :id="'dot-' + slides.slideNumber"
          @click="dotNavEvent(this)"
        >
        </a>
      </nav>
    </div>

    <a @click="nextSlide()" class="chevron-right">&#8250;</a>
  </div>
</template>

<script>
import slides from "../data/slides";

export default {
  name: "MobileSlideShow",
  data() {
    return {
      slides,
      index: 0,
      touchstartx: undefined,
      touchmovex: undefined,
      movex: 0,
      longTouch: undefined,
    };
  },
  computed: {
    slideInfo() {
      return {
        holder: this.$el.querySelector(".holder"),
        currentSlide: this.slides[this.index],
        slideWidth: this.$refs.slider.clientWidth,
      };
    },
  },
  methods: {
    start(event) {
      // Test for flick.
      this.longTouch = false;
      setTimeout(function () {
        window.slider.longTouch = true;
      }, 250);

      // Get the original touch position.
      this.touchstartx = event.touches[0].clientX;

      // The movement gets all janky if there's a transition on the elements.
      document.querySelectorAll(".animate").forEach(function (el) {
        el.classList.remove("animate");
      });
    },

    move(event) {
      // Continuously return touch position.
      this.touchmovex = event.touches[0].clientX;
      // Calculate distance to translate holder.
      this.movex =
        this.index * this.slideInfo.slideWidth +
        (this.touchstartx - this.touchmovex);

      // Defines the speed the images should move at.
      var panx = 100 - this.movex / 6;
      if (this.movex < 600) {
        // Makes the holder stop moving when there is no more content.
        this.slideInfo.holder.style.transform =
          "translate3d(-" + this.movex + "px,0,0)";
      }
    },

    end(event) {
      // Calculate the distance swiped.
      var absMove = Math.abs(
        this.index * this.slideInfo.slideWidth - this.movex
      );
      // Calculate the index. All other calculations are based on the index.
      if (absMove > this.slideInfo.slideWidth / 2 || this.longTouch === false) {
        if (
          this.movex > this.index * this.slideInfo.slideWidth &&
          this.index < 3
        ) {
          this.index++;
        } else if (
          this.movex < this.index * this.slideInfo.slideWidth &&
          this.index > 0
        ) {
          this.index--;
        }
      }

      this.gotoSlide();
    },

    prevSlide() {
      if (this.index > 0) {
        this.index--;
      }

      this.gotoSlide();
    },

    nextSlide() {
      // if (this.index > this.slides.length) {
      if (this.index < 3) {
        this.index++;
      }
      this.gotoSlide();
    },

    dotNavEvent() {
      var clickedDotId = event.target.id.substring(4, 5);
      // supports slideshows with up to 99 slides, lol (double digits)
      this.index = clickedDotId;
      this.gotoSlide();
    },

    gotoSlide() {
      // Move and animate the elements.
      this.slideInfo.holder.classList.add("animate");
      this.slideInfo.holder.style.transform =
        "translate3d(-" + this.index * this.slideInfo.slideWidth + "px,0,0)";

      // Update dot navigation
      var activeDot = document
        .querySelector(".slider-dotnav")
        .querySelector(".active");
      var desiredDot = document.getElementById("dot-" + this.index);
      activeDot.classList.remove("active");
      desiredDot.classList.add("active");
    },
  },
};
</script>

<style scoped>
.animate {
  transition: transform 0.3s ease-out;
}
.slider-wrap {
  width: 80vw;
  height: 88vh;
  position: relative;
  left: 10vw;
  top: 5vh;
}

.slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ms-touch.slider {
  overflow-x: scroll;
  overflow-y: hidden;
  
  -ms-overflow-style: none;
  /* Hides the scrollbar. */
  
  -ms-scroll-chaining: none;
  /* Prevents Metro from swiping to the next tab or app. */
  
  -ms-scroll-snap-type: mandatory;
  /* Forces a snap scroll behavior on your images. */
  
  -ms-scroll-snap-points-x: snapInterval(0%, 100%);
  /* Defines the y and x intervals to snap to when scrolling. */
}

.holder {
  width: 400%; /* (Number of slides*100%) */
  height: 100%;
  overflow-y: hidden;
}

.slide-wrapper {
  width: 25%; /* Fraction of 1 slide/total number of slides */
  float: left;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slide {
  height: 100%;
  position: relative;
}

.slideNumber {
  position: absolute;
  z-index: 1;
  color: #122620;
  font-size: 100px;
  bottom: 15px;
  left: 15px;
  font-family: 'Josefin Slab', serif;
  font-weight: 100;
}


/* Dot Navigation */
.slider-dotnav {
  display: flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 7vh;
}
.slider-dotnav a {
  width: 10px;
  height: 10px;
  display: inline-block;
  background: #ddd;
  overflow: hidden;
  text-indent: -9999px;
  border-radius: 50%;
}

.slider-dotnav a.active {
  background: #999;
}


/* Chevron Navigation */
.horizontal {
  display: flex;
  flex-direction: row;
}
.chevron-left, .chevron-right {
  color: #122620;
  font-family: 'Josefin Slab', serif;
  font-size: 100px;
  position: absolute;
  top: 45%;
}
.chevron-left {
  left: 0;
}
.chevron-right {
  right: 0;
}
</style>

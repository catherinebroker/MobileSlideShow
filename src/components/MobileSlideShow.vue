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
          <div class="slide-wrapper">
            <div :id="slides[0].slideId" class="slide"></div>
            <span class="slideNumber">{{ slides[0].slideNumber }}</span>
          </div>
          <div class="slide-wrapper">
            <div :id="slides[1].slideId" class="slide"></div>
            <span class="slideNumber">{{ slides[1].slideNumber }}</span>
          </div>
          <div class="slide-wrapper">
            <div :id="slides[2].slideId" class="slide"></div>
            <span class="slideNumber">{{ slides[2].slideNumber }}</span>
          </div>
          <div class="slide-wrapper">
            <div :id="slides[3].slideId" class="slide"></div>
            <span class="slideNumber">{{ slides[3].slideNumber }}</span>
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
        <!-- <a href="javascript:void(0)" class="dot active" id="dot-0" @click="dotNavEvent(this)"></a>
        <a href="javascript:void(0)" class="dot" id="dot-1" @click="dotNavEvent(this)"></a>
        <a href="javascript:void(0)" class="dot" id="dot-2" @click="dotNavEvent(this)"></a>
        <a href="javascript:void(0)" class="dot" id="dot-3" @click="dotNavEvent(this)"></a> -->
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
        this.index * this.slideInfo.slideWidth + (this.touchstartx - this.touchmovex);

      // Defines the speed the images should move at.
      var panx = 100 - this.movex / 6;
      if (this.movex < 600) {
        // Makes the holder stop moving when there is no more content.
        this.slideInfo.holder.style.transform = "translate3d(-" + this.movex + "px,0,0)";
      }
    },

    end(event) {
      // Calculate the distance swiped.
      var absMove = Math.abs(this.index * this.slideInfo.slideWidth - this.movex);
      // Calculate the index. All other calculations are based on the index.
      if (absMove > this.slideInfo.slideWidth / 2 || this.longTouch === false) {
        if (this.movex > this.index * this.slideInfo.slideWidth && this.index < 3) {
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
      // if (this.index > slides.slides.length)
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

<style>
@import "../assets/mobile-slideshow.css";
</style>

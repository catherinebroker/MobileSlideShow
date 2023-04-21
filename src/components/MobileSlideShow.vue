<template>
  <div>
    <a class="chevron-left">&#8249;</a>

    <div class="slider-wrap">
      <div class="slider" id="slider">
        <div class="holder">
          <div class="slide-wrapper">
            <div id="slide-0" class="slide"></div>
            <span class="slideNumber">0</span>
          </div>
          <div class="slide-wrapper">
            <div id="slide-1" class="slide"></div>
            <span class="slideNumber">1</span>
          </div>
          <div class="slide-wrapper">
            <div id="slide-2" class="slide"></div>
            <span class="slideNumber">2</span>
          </div>
          <div class="slide-wrapper">
            <div id="slide-3" class="slide"></div>
            <span class="slideNumber">3</span>
          </div>
        </div>
      </div>

      <nav class="slider-dotnav"></nav>
    </div>

    <a class="chevron-right">&#8250;</a>
  </div>
</template>

<script>
export default {
  name: "MobileSlideShow",
  methods: {
    testMethod() {
      console.log("click!");
    },
  },
};
</script>

<style>
@import "../assets/mobile-slideshow.css";
</style>

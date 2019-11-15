<template>
 <div :class="`ms-Shimmer`" :style="`width: ${width}px`">
   <transition>
    <div v-if="!isDataLoaded" key="shimmer" class="shimmerWrapper">
      <div class="shimmerGradient"></div>
      <div v-if="type == 'persona'" class="shimmerContent">
        <div class="shimmerElementsGroup">
          <div class="shimmerCircle">
            <svg viewBox="0 0 10 10" width="48" height="48" class="ms-ShimmerCircle-svg svg-348"><path d="M0,0 L10,0 L10,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z"></path></svg>
          </div>
          <div class="shimmerGap"></div>
        </div>
        <div class="shimmerElementsGroup column" style="width: 100%">
          <div class="shimmerLine">

          </div>
          <div class="shimmerLine shimmerLine--sm">

          </div>
        </div>
      </div>
    </div>
    <div v-else key="content" class="dataWrapper">
      <slot></slot>
    </div>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'MsShimmer',
  props: {
    width: String,
    type: String,
  },
  data() {
    return {
      isDataLoaded: false
    }
  }
}
</script>

<style lang="scss" scoped>

.ms-Shimmer {
  .shimmerWrapper {
    background-color:rgb(243, 242, 241);
    position: relative;
    transform: translateZ(0px);
    overflow: hidden;
    transition: opacity 200ms ease;
    .shimmerGradient {
      position: absolute;
      z-index: 1;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-direction: normal;
      animation-iteration-count: infinite;
      animation-name: slide;
      background: linear-gradient(to right, rgb(243, 242, 241) 0%, rgb(237, 235, 233) 50%, rgb(243, 242, 241) 100%) 0px 0px / 90% 100% no-repeat rgb(243, 242, 241);
    }
    .shimmerContent {
      display: flex;
      .shimmerElementsGroup {
        display: flex;
        align-items: center;
        &.column {
          flex-direction: column;
        }
        .shimmerCircle {
          z-index: 2;
          svg {
            fill: #fff;
            overflow: hidden;
            display: block;
          }
        }
        .shimmerGap {
          z-index: 2;
          background-color: #fff;
          width: 12px;
          height: 100%;
        }
        .shimmerLine {
          z-index: 2;
          border-top: 12px solid #fff;
          width: 100%;
          min-width: auto;
          height: 12px;
          &.shimmerLine--sm {
            height: 8px;
            border-top: 6px solid #fff;
            border-bottom: 10px solid #fff;
          }
        }
      }
    }
  }
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
      transform: translateX(100%);
  }
}

</style>

<template>
 <div :class="`ms-Spinner ms-Spinner--${size}`">
   <div class="ms-Spinner-circle"></div>
  </div>
</template>

<script>
export default {
  name: 'MsSpinner',
  props: {
    size: String,
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>

.ms-Spinner {
  --size: 20px;
  &--xs {
    --size: 12px;
  }
  &--sm {
    --size: 16px;
  }
  &--lg {
    --size: 28px;
  }
  animation-name: spin;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: calc(var(--size) / 12) solid;
  border-color: rgb(0, 120, 212) rgb(199, 224, 244) rgb(199, 224, 244);
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>

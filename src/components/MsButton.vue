<template>
  <button class="ms-button" :class="computedClass" :disabled="disabled">
    <span class="text">{{label}}</span><i class="ms-Icon ms-Icon--ChevronRight" v-if='arrow' aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  name: 'MsButton',
  props: {
    label: {
      type: String,
    },
    size: {
      type: String,
      default: 'md',
      validator: function (value) {
        // The value must match one of these strings
        return ['sm', 'md', 'lg'].indexOf(value) !== -1
      }
    },
    type: {
      type: String,
      default: 'solid',
      validator: function (value) {
        // The value must match one of these strings
        return ['solid', 'flat'].indexOf(value) !== -1
      }

    },
    arrow: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    }
  },
  computed: {
    computedClass() {
      return `ms-button--${this.size} ms-button--${this.type}`
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: rgb(0, 120, 212);
button {
  background-color: transparent;
  border: 0;
}
.ms-button {
  font-family: 'Segoe UI';
  --scaling: 16px;
  padding: calc(var(--scaling)/3) calc(var(--scaling)*5/4);
  font-size: var(--scaling);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border: 1px solid;
  cursor: pointer;  
  transition: all .2s ease-in-out;
  &.ms-button--sm {
    --scaling: 12px;
  }
  &.ms-button--lg {
    --scaling: 20px;
    .text {
      border-width: 2px;
    }
  }
  &.ms-button--solid {
    color: #fff;
    background-color: $blue;
    border-color: $blue;
  }
  &.ms-button--flat {
    color: #fff;
    border-color: $blue;
  }
  .text {
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    margin-top: 2px;
    margin-bottom: 1px;
    transition: border .3s ease-in-out;
  }
  .ms-Icon {
    margin-left: calc(var(--scaling)/2);
    margin-right: calc(var(--scaling)*-1/3);
    transition: transform .2s ease-in-out .05s;
    font-size: calc(var(--scaling)*3/4)
  }
  &:disabled {
    cursor: default;
    border-color: rgb(243, 242, 241);
    background-color: rgb(243, 242, 241);
    color: rgb(161, 159, 157);
  }
  &:not(:disabled):hover {
    color: #fff;
    background-color: $blue;
    .text {
      border-color: #fff;
    }
    .ms-Icon {
      transform: translateX(calc(var(--scaling)/3));
    }
  }
} 
</style>

<template>
 <div class="ms-persona">
   <div class="image-area" :style="`width: ${size}px`">
     <div class="image" :style="`background-image: url('${imageUrl}')`"><img class="sr-only" :src="imageUrl" :alt="`profile picture of ${name}`"/></div>
     <div v-if='size > 24' class="status" :class="{'status--border-gray' : (status == 'indeterminate')}"><i class="ms-Icon" :class="`ms-Icon--${statusClass.icon} ${statusClass.color}`" aria-hidden="true"></i></div>
     <div v-else :class="`status status--sm status--${statusClass}`"></div>
   </div>
   <div class="info">
     <div class="name">
        {{name}}
     </div>
     <div v-if='showTitle && title'  class="title">
        {{title}}
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'MsButton',
  props: {
    name: String,
    title: String,
    status: String,
    size: Number,
    imageUrl: String
  },
  computed: {
    statusClass() {
      if(this.size > 24) {
        switch(this.status) {
          case 'online':
            return { icon: 'SkypeCircleCheck', color: 'green' }
          case 'busy':
            return { icon: 'SkypeCircleMinus', color: 'red' }
          case 'blocked':
            return { icon: 'SkypeCircleMinus', color: 'red' }
          case 'away':
            return { icon: 'SkypeCircleClock', color: 'yellow' }
        }
        return { icon: '', color: '' };
      } else {
        switch(this.status) {
          case 'online':
            return 'green'
          case 'busy':
            return 'red'
          case 'blocked':
            return 'red'
          case 'away':
            return 'yellow';
          default:
            return 'border-gray'
        }
      }      
    },
    showStatusIcon() {
      return this.size > 32;
    },
    showTitle() {
      return this.size > 32;
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

.green { color: #6BB700;}
.red { color: #C43148;}
.yellow { color: #FFAA44;}


.ms-persona {
  --factor: 4px;
  font-family: 'Segoe UI';
  display: flex;
  align-items: center;
  .image-area {
    margin-right: calc(var(--factor) * 3);
    position: relative;
    .image {
      width: 100%;
      padding-top: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 100%;
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    }
    .status {
      --size: 16px;
      &--sm {
        --size: 10px;
      }
      position: absolute;
      bottom: -2px;
      right: -2px;
      height: var(--size);
      width: var(--size);
      border: 2px solid #fff;
      background-color: #fff;
      border-radius: 100%;   
      display: flex;
      align-items: center;
      align-content: center;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top:0;
        width: calc(var(--size) - 4px);
        height: calc(var(--size) - 4px);
        border: 2px solid transparent;
        border-radius: 100%;
      }
      &.status--border-gray:before {
        border-color: gray;
      }
      &.status--red:before {
        border-color: #C43148;
        background-color: #C43148;
      }
      &.status--green:before {
        border-color: #6BB700;
        background-color: #6BB700;
      }
      &.status--yellow:before {
        border-color: #FFAA44;
        background-color: #FFAA44;
      }
    }
  }
  .info {    
    color: rgb(50, 49, 48);
    font-size: 14px;
    position: relative;
    .name {

    }
    .title {
      color: rgb(96, 94, 92);
      font-size: 12px;
    }
  }
  
} 
</style>

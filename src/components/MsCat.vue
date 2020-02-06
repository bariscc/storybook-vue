<template>
  <div class="wrapper">
    <MsButton
      @click="send('GET')"
      :label="buttonText"
      :disabled="buttonDisabled"
    ></MsButton>
    <transition name="fade">
      <img class="img" v-if="showImage" :src="catUrl" />
    </transition>
  </div>
</template>

<script>
import MsButton from "./MsButton";
import catMachine from "../machines/catMachine";
import { interpret } from "xstate";

const buttonTexts = {
  idle: "Get cat",
  loading: "Searching for a cat...",
  success: "Get another cat",
  error: "Something went wrong ლ(ಠ益ಠლ), wanna try again?"
};

export default {
  name: "MsCat",
  components: {
    MsButton
  },
  data() {
    return {
      // Interpret machine and store it in data
      catService: interpret(catMachine, { devTools: true }),

      // Start with machine's initial state
      catState: catMachine.initialState.value,
      catUrl: catMachine.initialState.context.catUrl
    };
  },
  computed: {
    showImage() {
      return this.catState === "success";
    },
    buttonDisabled() {
      return this.catState === "loading";
    },
    buttonText() {
      return buttonTexts[this.catState];
    }
  },
  created() {
    // Start service on component creation
    this.catService
      .onTransition(state => {
        this.catState = state.value;
        this.catUrl = state.context.catUrl;
      })
      .start();
  },
  methods: {
    // Send events to the service
    send(event) {
      this.catService.send(event);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.img {
  max-width: 300px;
  max-height: 100%;
  height: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

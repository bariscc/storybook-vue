<template>
  <div class="wrapper">
    <MsButton
      @click="send('GET')"
      :label="buttonText"
      :disabled="buttonDisabled"
    ></MsButton>
    <transition name="fade">
      <img class="img" v-if="status.success === 'downloaded'" :src="catUrl" />
    </transition>
  </div>
</template>

<script>
import MsButton from "./MsButton";
import catMachine from "../machines/catMachineWithImageLoad";
import { interpret } from "xstate";

const buttonTexts = {
  idle: "Get Cat",
  loading: "Searching for a cat",
  success: {
    downloading: "Found one! Downloading cat",
    downloaded: "Cat rendered! want another?"
  },
  error: "Something went wrong ლ(ಠ益ಠლ), wanna try again?"
};

export default {
  name: "MsCatWithImageLoad",
  components: {
    MsButton
  },
  created() {
    // Start service on component creation
    this.catService
      .onTransition(state => {
        this.status = state.value;
        this.catUrl = state.context.catUrl;
      })
      .start();
  },
  computed: {
    buttonText() {
      if (this.status.success) {
        return buttonTexts.success[this.status.success];
      }
      return buttonTexts[this.status];
    },
    buttonDisabled() {
      return this.status === "loading" || this.status.success === "downloading";
    }
  },
  data() {
    return {
      // Interpret machine and store it in data
      catService: interpret(catMachine, { devTools: true }),

      // Start with machine's initial state
      status: catMachine.initialState.value,
      catUrl: catMachine.initialState.context.catUrl
    };
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
  max-width: 100%;
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

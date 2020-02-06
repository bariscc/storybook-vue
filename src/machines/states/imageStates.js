import { imgLoad } from "../../utils";

const imageStates = {
  initial: "downloading",
  states: {
    downloading: {
      invoke: {
        id: "catImage",
        src: context => imgLoad(context.catUrl),
        onDone: {
          target: "downloaded"
        },
        onError: {
          target: "errored"
        }
      }
    },
    downloaded: {
      type: "final"
    },
    errored: {
      type: "final",
      on: {
        '': '#cat.error'
      }
    }
  }
};

export default imageStates;

import { imgLoad } from "../../utils";

const imageStates = {
  initial: "downloading",
  states: {
    downloading: {
      invoke: {
        id: "loadCat",
        src: context => imgLoad(context.catUrl),
        onDone: {
          target: "downloaded"
        },
        onError: {
          target: "#cat.error"
        }
      }
    },
    downloaded: {
      type: "final"
    }
  }
};

export default imageStates;

import { Machine, assign } from "xstate";
import { apiGet, imgLoad } from "../utils";

const catMachine = Machine({
  id: "cat",
  initial: "idle",
  context: {
    catUrl: ""
  },
  states: {
    idle: {
      on: { GET: "loading" }
    },
    loading: {
      invoke: {
        id: "catDataRequest",
        src: () => apiGet("https://api.thecatapi.com/v1/images/search"),
        onDone: {
          target: "downloading",
          actions: assign({ catUrl: (c, e) => e.data[0].url })
        },
        onError: {
          target: "error"
        }
      }
    },
    downloading: {
      invoke: {
        id: "catImageDownload",
        src: context => imgLoad(context.catUrl),
        onDone: {
          target: "success"
        },
        onError: {
          target: "error"
        }
      }
    },
    success: {
      on: { GET: "loading" }
    },
    error: {
      on: { GET: "loading" }
    }
  },
  devTools: true
});

export default catMachine;

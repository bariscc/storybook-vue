import { Machine, assign } from "xstate";
import { apiGet, imgLoad } from "../utils";

const imageStates = {
  initial: "downloading",
  states: {
    downloading: {
      invoke: {
        id: "catImageDownload",
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
        "": "#cat.error"
      }
    }
  }
};

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
          target: "success",
          actions: assign({ catUrl: (c, e) => e.data[0].url })
        },
        onError: {
          target: "error"
        }
      }
    },
    success: {
      on: { GET: "loading" },
      ...imageStates
    },
    error: {
      on: { GET: "loading" }
    }
  },
  devTools: true
});

export default catMachine;

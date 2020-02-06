import { Machine, assign } from "xstate";
import { apiGet } from "../utils";
import imageStates from "./states/imageStates";

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
        id: "catData",
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

import * as mockApi from "./mockApi";

let currentInstance = null;

function createRunMock() {
  return {
    successHandler: null,
    failureHandler: null,

    withFailureHandler(callback) {
      if (!currentInstance) {
        currentInstance = createRunMock();
      }
      currentInstance.failureHandler = callback;
      return currentInstance;
    },

    withSuccessHandler(callback) {
      if (!currentInstance) {
        currentInstance = createRunMock();
      }
      currentInstance.successHandler = callback;
      return currentInstance;
    },

    runFunction(f, args) {
      if (!currentInstance) {
        currentInstance = createRunMock();
      }
      let delay = Math.random() * 1000 + 300;
      setTimeout(() => currentInstance.doRunFunction(f, args), delay);
      // Reset instance after function execution
      currentInstance = null;
    },

    doRunFunction(f, args) {
      try {
        const result = f(...args);
        if (this.successHandler) {
          this.successHandler(result);
          this.successHandler = null; // Clear handler after use
        }
      } catch (e) {
        if (this.failureHandler) {
          this.failureHandler(e);
          this.failureHandler = null; // Clear handler after use
        }
      }
    },
  };
}

// Attach each key in mockApi as a function to runMockFactory
const runMockFactory = createRunMock();

Object.keys(mockApi).forEach((key) => {
  runMockFactory[key] = function (...args) {
    if (!currentInstance) {
      currentInstance = createRunMock();
    }
    currentInstance.runFunction(mockApi[key], args);
  };
});

export default {
  script: {
    run: runMockFactory,
  },
};

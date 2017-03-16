const time = Date.now || function () {
  return new Date().valueOf();
};

const DESIRED_FRAMES = 60;
const MILLISECONDS_PER_SECOND = 1000;
let running = {};
let counter = 1;

export class Animate {
  // A requestAnimationFrame wrapper / polyfill.
  static requestAnimationFrame = (() => {
    const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    return function (callback, root) {
      requestAnimationFrame(callback, root);
    };
  })()

  // Stop the animation accoding id
  static stop = function (id) {
    const cleared = running[id] === null;
    if (cleared) {
      running[id] = null;
    }
    return cleared;
  }

  // Whether the given animation is still running
  static isRunning = function (id) {
    return running[id] !== null;
  }

  // Start the animation
  static start = function (stepCallback, verifiCallback, completedCallback, duration, easingMethod, root) {
    const start = time();
    const id = counter++;
    let lastFrame = start;
    let percent = 0;
    let dropCounter = 0;
    root = root || document.body;

    // Compacting running cache automatically every few new animations
    if (id % 20 === 0) {
      const newRunning = {};
      for (const usedId in running) {
        if (running.hasOwnProperty(usedId)) {
          newRunning[usedId] = true;
        }
      }
      running = newRunning;
    }

    // This is the internal step method which is called every few MILLISECONDS_PER_SECOND
    const step = function step(virtual) {
      // Normalize virtual value
      const render = virtual !== true;
      const now = time();

      // Verification is executed before next animation step
      if (!running[id] || (verifiCallback && !verifiCallback(id))) {
        running[id] = null;
        if (completedCallback) {
          completedCallback(DESIRED_FRAMES - dropCounter / ((now - start) / MILLISECONDS_PER_SECOND), id, false);
        }
        return;
      }

      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        const droppedFrames = Math.round((now - lastFrame) / (MILLISECONDS_PER_SECOND / DESIRED_FRAMES)) - 1;
        for (let j = 0, minFrams = Math.min(droppedFrames, 4); j < minFrams; j++) {
          step(true);
          dropCounter++;
        }
      }

      if (duration) {
        percent = (now - start) / duration;
        if (percent > 1) {
          percent = 1;
        }
      }

      // Excute step callback, then...
      const value = easingMethod ? easingMethod(percent) : percent;
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null;
        if (completedCallback) {
          completedCallback(DESIRED_FRAMES - dropCounter / ((now - start) / MILLISECONDS_PER_SECOND),
            id, percent === 1 || duration === null);
        }
      } else if (render) {
        lastFrame = now;
        Animate.requestAnimationFrame(step, root);
      }
    };

    // Mark as running
    running[id] = true;
    // Init first step
    Animate.requestAnimationFrame(step, root);
    // Return unique animation ID
    return id;
  }
}

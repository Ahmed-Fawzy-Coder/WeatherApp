/* jshint esnext: true */

// Short QuerySelector
const $ = (inp) => {
    return document.querySelector(inp)
      ? document.querySelector(inp)
      : document.querySelectorAll(inp);
  },
  root = document.documentElement;

// Short Array Methods

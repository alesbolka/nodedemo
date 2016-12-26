const blist = [
  0, // wakeup
  9, // tab
  16, // shift
  17, // control
  18, // alt
  20, // capslock
  35, // end
  36, // home
  37, // arrow LEFT
  38, // arrow UP
  39, // arrow RIGHT
  40, // arrow down
  91, // meta (windows)
];

export default function (cb, delay) {
  var timer = false;

  return function (event) {
    var context = this;
    var args = arguments;

    if (event.ctrlKey && (event.key === 'A' || event.key === 'a')) {
      // ctrl + a
      return
    }
    if (blist.indexOf(event.keyCode) > -1) {
      return
    }

    clearTimeout(timer)
    timer = setTimeout(function() {
      cb.apply(context, args)
    }, delay)
  }
}
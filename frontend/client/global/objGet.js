export default function(src, input, def_val) {
  def_val = def_val === undefined ? undefined : def_val;
  var keys, ii;
  if (typeof input !== 'string' ) {
    return def_val;
  }

  keys = input.split('.');
  for (ii = 0; ii < keys.length; ii++) {
    if (src === undefined) {
      return def_val;
    }
    src = src[keys[ii]];
  }

  return src === undefined ? def_val : src;
};
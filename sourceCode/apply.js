Function.prototype.MyApply = function(context) {
  let args = [...arguments].slice(1);
  context.fn = this;
  return context.fn(args)
}

const sample = require("./sample");

sample.handler({ name: "Krish" }, {}, function(err, msg) {
  console.log(msg.body);
});

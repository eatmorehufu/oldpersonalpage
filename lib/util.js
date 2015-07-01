(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var util = Asteroids.Util = {};

util.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function (){};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

util.randomVec = function() {
  var x = Math.random()*2 - 1;
  var y = Math.random()*2 - 1;
  return [x, y];
};

// util.maxSpeed = function(speedX, speedY) {
//   var speedLimit = 7;
//   if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
//     return this.maxSpeed(speedX * 0.9, speedY * 0.9);
//   };
//   return [speedX, speedY];
// };

util.normalizeVec = function(vecArray) {
  var x = vecArray[0];
  var y = vecArray[1];
  var mult = 1 / Math.sqrt(x * x + y * y);
  return [x * mult, y * mult];
};

util.getMagnitude = function(vecArray) {
  var x = vecArray[0];
  var y = vecArray[1];
  return Math.sqrt(x * x + y * y);
}

})();

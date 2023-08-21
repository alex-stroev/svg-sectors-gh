function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// opts = {
// cx              <-- center x
// cy              <-- center y
// radius          <-- circle radius
// start_angle     <-- start angle in degrees
// end_angle       <-- end angle in degrees
// };

function draw(opts) {
  var start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle),
    end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle),
    largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    opts.radius,
    opts.radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "L",
    opts.cx,
    opts.cy,
    "Z",
  ].join(" ");

  return d;
}

function fillRadiusToViewBox(size, init, max) {
  return (size * init) / max;
}

export { draw };
export { fillRadiusToViewBox };

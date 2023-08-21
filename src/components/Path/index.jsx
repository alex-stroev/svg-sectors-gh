import { draw, fillRadiusToViewBox } from "../../calcFuctions";

const Path = ({ fill, d, svgSize, maxInitialRadius }) => {
  const r = svgSize / 2;
  const cd = { ...d };
  cd.cx = r;
  cd.cy = r;
  cd.radius = fillRadiusToViewBox(r, d.radius, maxInitialRadius)
  return <path fill={fill} stroke="none" d={draw(cd)} fillRule="evenodd" />;
};

export default Path;

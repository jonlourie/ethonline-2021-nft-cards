import SVG from "./SVG";
import { randInt } from "../../helpers/math";

export default function MonsterSVG({ teethNum, bodyNum, eyesNum }) {
  return <SVG teethNum={teethNum} bodyNum={bodyNum} eyesNum={eyesNum} />;
}

// `randInt(x, y)` generates number in [x, y), so upper bound is max type number + 1

export function randomBody() {
  return randInt(1, 15);
}

export function randomEyes() {
  return randInt(1, 15);
}

export function randomTeeth() {
  return randInt(1, 7);
}

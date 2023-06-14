let f = (a, b) => [].concat(...a.map((a) => b.map((b) => [].concat(a, b))));
export default function cartesian (a, b, ...c) { return (b ? cartesian(f(a, b), ...c) : a)};

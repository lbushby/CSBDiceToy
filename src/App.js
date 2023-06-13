import "./styles.css";
import { useState } from "react";

let f = (a, b) => [].concat(...a.map((a) => b.map((b) => [].concat(a, b))));
let cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

function ResultPercentages({ dicecount, sidescount }) {
  let dice = new Array();
  let modifier = 0;
  for (let d = 0; d < dicecount; d++) {
    let sides = new Array();
    for (let s = 0; s < sidescount; s++) {
      sides.push(s + 1 + modifier);
    }
    dice.push(sides);
  }

  let sums;
  if (dicecount > 1) {
    let combinations = cartesian(...dice);

    console.log(combinations);

    sums = combinations.map((c) => {
      let sum = c.reduce((total, item) => total + item, 0);
      return { sum: sum };
    });
  } else {
    sums = dice[0].map((s) => {
      return { sum: s };
    });
  }

  console.log("sums", sums);

  let sumcounts = {};
  sums.forEach((s) => {
    if (s.sum in sumcounts) {
      sumcounts[s.sum].count = sumcounts[s.sum].count + 1;
    } else {
      sumcounts[s.sum] = {
        sum: s.sum,
        count: 1,
      };
    }
  });

  let chances = Object.values(sumcounts).map((sc) => {
    sc.chance = sc.count / Math.pow(sidescount, dicecount);
    sc.percent = sc.chance * 100;
    return sc;
  });

  console.log("chances", chances);
  let output = chances.map((row) => {
    console.log("row",row);
    return (
    <tr key={row.sum}>
      <td>{row.sum}</td>
      <td>{row.percent.toFixed(3)}</td>
    </tr>);
  });

  console.log("output", output);


  return (
    <table>
      <thead>
      <td>Result</td>
      <td>%</td>
        </thead>
      <tbody>{output}</tbody>
    </table>
  );
}

function Output({ lines }) {
  let output = lines.map((l) => (
    <tr key={l}>
      <td>{l}</td>
    </tr>
  ));
  return (
    <table>
      <tbody>{output}</tbody>
    </table>
  );
}
export default function App() {
  //const [name, setName] = useState("fred");
  const [dicecount, setDiceCount] = useState(2);
  const [sidescount, setSidesCount] = useState(6);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          # Dice:
          <input
            type="text"
            value={dicecount}
            onChange={(e) => setDiceCount(e.target.value)}
          />
        </label>
        <br />
        <label>
          # Sides:
          <input
            type="text"
            value={sidescount}
            onChange={(e) => setSidesCount(e.target.value)}
          />
        </label>
        <input type="submit" value="Go" />
      </form>

      <Output lines={new Array("foo21", "hello", "bye")} />
      <ResultPercentages dicecount={dicecount} sidescount={sidescount} />
    </div>
  );
}

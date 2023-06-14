import cartesian from "./Cartesian";
export default function ResultPercentages({ dicecount, sidescount }) {

    if (!(dicecount && sidescount)) {
        return (<p>Please enter valid values</p>)
    }

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
  

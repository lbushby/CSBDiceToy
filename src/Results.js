function GetCombinations(dicecount,sidescount)
{
  let combinations=[]

  let min = 0;
  let max = Math.pow(sidescount,dicecount) -1;

  console.log('minmax',min,max);

  for(let n=min;n<=max;n++) {
    let results=[];
    let sum=n;
    for(let d=dicecount;d>0;d--) {
      let value = Math.floor((sum / Math.pow(sidescount, d -1)));
      //console.log ("d,s,v",d,sum,value);
      sum -= (Math.pow(sidescount, d-1) * value);
      results.push(value+1);
    }
    //console.log(n,results);
    combinations.push(results);
  }
  return combinations
}

function GetMeanFromCombinations(combinations)
{
  return combinations.map(c=>
    c.reduce((p,v)=>p+v)).reduce((p,v)=>p+v) / combinations.length;
}
export default function Results({ dicecount, sidescount }) {

    if (!(!!+dicecount && !!+sidescount)) {
        return (<p>Please enter valid values</p>)
    }

    if (Math.pow(sidescount,dicecount) > 1000000) {
      return (<p>Please reduce the number of Dice or Sides</p>)
    }

 
    let sums;

    let combinations = GetCombinations(dicecount, sidescount);
  
    console.log("combinations", combinations);

    sums = combinations.map((c) => {
      let sum = c.reduce((total, item) => total + item, 0);
      return { sum: sum };
    });
  
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
  
    let maxpercent = 0;
    let chances = Object.values(sumcounts).map((sc) => {
      sc.chance = sc.count / Math.pow(sidescount, dicecount);
      sc.percent = sc.chance * 100;
      maxpercent = sc.percent > maxpercent ? sc.percent : maxpercent;
      return sc;
    });
  
    console.log("chances", chances);
    let output = chances.map((row) => {
      console.log("row",row);
      return (
      <tr key={row.sum}>
        <td>{row.sum}</td>
        <td>{row.percent.toFixed(3)}</td>
        <td>{"#".repeat(row.percent / maxpercent * 200)  }</td>
      </tr>);
    });
  
    console.log("output", output);
  
    let mean = GetMeanFromCombinations(combinations);
    return (
      <div>
      <table>
        <thead>
      <tr>
          <th>Combinations</th>
          <td>{Math.pow(sidescount,dicecount)}</td>
        </tr>
        <tr>
          <th>Mean</th>
          <td>{mean}</td>
        </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr>
            <th colspan="3">Distribution</th>
          </tr>
          <tr>
            <th>Result</th>
            <th>%</th>
            <th>Bar</th>
          </tr>
          </thead>
        <tbody>{output}</tbody>
      </table>
      </div>
    );
  }
  

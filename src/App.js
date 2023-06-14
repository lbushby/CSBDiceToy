import "./styles.css";
import { useState } from "react";
import ResultPercentages from "./ResultPercentages";



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

      <ResultPercentages dicecount={dicecount} sidescount={sidescount} />
    </div>
  );
}

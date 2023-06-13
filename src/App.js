import "./styles.css";
import { useState } from "react";

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
    alert("ss");
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

      <Output lines={new Array("foo2", "hello", "bye")} />
    </div>
  );
}

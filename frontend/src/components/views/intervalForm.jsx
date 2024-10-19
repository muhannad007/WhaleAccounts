import { useState } from "react";

const IntervalForm = ({ handleInterval }) => {
  const [minutes, setMinutes] = useState(0);
  return (
    <div className="interval-form">
      <h1>Transactions</h1>
      <form>
        <label htmlFor="">Enter the interval in minutes</label>
        <input type="number" onChange={(e) => setMinutes(e.target.value)} />
        <button
          className="clipButton font-[Nippo]"
          type="button"
          onClick={() => handleInterval(minutes)}
        >
          Set Interval
        </button>
      </form>
    </div>
  );
};

export default IntervalForm;

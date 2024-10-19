import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../views/footer";
import IntervalForm from "../views/intervalForm";
import TransactionsTable from "../views/transactionsTable";

const Transactions = () => {
  const [timer, setTimer] = useState(0);
  const handleInterval = (interval) => {
    console.log(`Update every ${interval} minutes.`);
    interval = interval * 60000;
    setTimer(interval);
  };
  return (
    <React.Fragment>
      <div className="transactions">
        <Navbar />
        <IntervalForm handleInterval={handleInterval} />
        <TransactionsTable timer={timer} />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Transactions;

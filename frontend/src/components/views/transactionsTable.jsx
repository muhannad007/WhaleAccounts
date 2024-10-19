import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const TABLE_HEAD = ["HASH", "AMOUNT", "SENDER", "TO", "BLOCK HEIGHT"];

const TransactionsTable = ({ timer }) => {
  const [whaleAccounts, setWhaleAccounts] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhaleAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions"
        );
        setWhaleAccounts(response.data);
        // console.log(whaleAccounts);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching whale accounts:", error);
        // setLoading(false);
      }
    };

    if (timer >= 1) {
      const interval = setInterval(() => {
        console.log("This is an update");
        fetchWhaleAccounts();
      }, timer);
      return () => clearInterval(interval);
    } else {
      fetchWhaleAccounts();
    }
  }, [timer]);

  return (
    <div className="transactions-table">
      <Card className="h-full w-full">
        <table className="w-full bg-slate-900 text-slate-200 min-w-max table-fixed text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-slate-950 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {whaleAccounts?.map((whaleAccount, index) => {
              const isLast = index === whaleAccounts.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {whaleAccount.Transaction.Hash.slice(0, 8)}...
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {whaleAccount.Transaction.Value.slice(0, 8)}...
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {whaleAccount.Transaction.From.slice(0, 8)}...
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {whaleAccount.Transaction.To.slice(0, 8)}...
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {whaleAccount.Block.Number}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TransactionsTable;

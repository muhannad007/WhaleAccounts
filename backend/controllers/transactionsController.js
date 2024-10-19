const axios = require("axios");
require("dotenv").config();

const getTransactions = async (req, res) => {
  const BITQUERY_API_KEY = process.env.BITQUERY_API_KEY;
  const BITQUERY_API_TOKEN = process.env.BITQUERY_API_TOKEN;

  let data = JSON.stringify({
    query:
      "query MyQuery {\n  EVM(network: bsc) {\n    Transactions(limit: {count: 10}) {\n      Block {\n        Number\n      }\n      Transaction {\n        From\n        Hash\n        To\n        Value\n      }\n    }\n  }\n}\n",
    variables: "{}",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://streaming.bitquery.io/graphql",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": BITQUERY_API_KEY,
      Authorization: BITQUERY_API_TOKEN,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data.data.EVM.Transactions));
      res.status(200).json(response.data.data.EVM.Transactions);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getTransactions,
};

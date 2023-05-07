import Typography from "@material-ui/core/Typography";
import { React, useState, useEffect } from "react";

var SERVER_URL = "http://127.0.0.1:5000";

function Statistics() {

  let [transactionsDate, setTransactionsDate] = useState([]);
  let [transactionsNumber, setTransactionsNumber] = useState([]);
  let [transactionsNumberBuy, setTransactionsNumberBuy] = useState([]);
  let [transactionsNumberSell, setTransactionsNumberSell] = useState([]);
  let [transactionsVolume, setTransactionsVolume] = useState([]);
  let [transactionsVolumeBuy, setTransactionsVolumeBuy] = useState([]);
  let [transactionsVolumeSell, setTransactionsVolumeSell] = useState([]);
  let [highestRate, setHighestRate] = useState([]);
  let [lowestRate, setLowestRate] = useState([]);
  const [timeframe, setTimeframe] = useState("last week");
    // Create a new Date object with today's date
    const today = new Date();

    // Get the date in the format of "YYYY-MM-DD"
    const formattedDate = today.toISOString().slice(0, 10);

    // Output the formatted date
    console.log(formattedDate);

  function statistics() {
    let url;
    switch(timeframe) {
   
      case 'last week':
        url = `${SERVER_URL}/statistics/week`;
        break;
      case 'last month':
        url = `${SERVER_URL}/statistics/month`;
        break;
      case 'last three month':
        url = `${SERVER_URL}/statistics/three-month`;
        break;
      case 'last six month':
        url = `${SERVER_URL}/statistics/six-month`;
        break;
      case 'last year':
        url = `${SERVER_URL}/statistics/year`;
        break;
    default:
      url = `${SERVER_URL}/statistics/week`;
  }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        var buy_amount = data.usd_amount_buy[formattedDate];
        var sell_amount = data.usd_amount_sell[formattedDate];
        console.log(data)
        // console.log(buy_amount);
        // console.log(sell_amount);

        var total_amount = buy_amount + sell_amount;

        
        setTransactionsDate([formattedDate]);
        setTransactionsNumber([data.number_of_transactions[formattedDate]]);
        setTransactionsNumberBuy([data.transactions_to_buy_usd[formattedDate]])
        setTransactionsNumberSell([data.transactions_to_sell_usd[formattedDate]])
        setTransactionsVolume([total_amount]);
        setTransactionsVolumeBuy([buy_amount]);
        setTransactionsVolumeSell([sell_amount]);
        setHighestRate(data.highest_rate[formattedDate].toFixed(2));
        setLowestRate(data.lowest_rate[formattedDate].toFixed(2));
        // console.log(transactionsNumber[transactionsDate.length - 1]);
        // console.log(highestRate);

      });
      console.log(transactionsNumber[transactionsDate.length - 1]);
     
  }

  useEffect(statistics, []);

  return (

    
    <div>
      <div className="select-container">
        <label htmlFor="timeframe-select">Select a Timeframe:</label>
      <select value={timeframe} onChange={(event) => {setTimeframe(event.target.value);statistics()}}>
                <option value="last week">Last Week</option>
                <option value="last month">Last Month</option>
                <option value="last three month">Last Three Month</option>
                <option value="last six month">Last Six Month</option>
                <option value="last year">Last Year</option>
      </select>
      </div>
    

      <div style={{ margin: "2em"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0.8em",
            
          }}
        >
          <Typography variant="h3" gutterBottom>
            Highest/Lowest Rate
          </Typography>
        </div>

        <ul>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems: "center",
              marginBottom: "3em",
            }}
          >
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Highest 
              </Typography>
              
                <h1>
                  <Typography variant="h3" style={{ color: '#7bc314' }}>
                      <span>{highestRate}</span>
                  </Typography>
                </h1>
            </div>
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Lowest
              </Typography>
                <h1>
                  <Typography variant="h3" style={{ color: '#ff0000' }}>
                      <span>{lowestRate}</span>
                  </Typography>
                </h1>
 
            </div>
          </div>
        </ul>
      </div>


      <div style={{ margin: "2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0.8em",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Total Transactions
          </Typography>
        </div>

        <ul>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems: "center",
            }}
          >
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Number of Transactions
              </Typography>
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsNumber[transactionsDate.length - 1]}</span> 
                    
                  </Typography>
                </h1>
          
            </div>
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Volume in USD
              </Typography>
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsVolume[transactionsDate.length - 1]}</span> 
                    
                  </Typography>
                </h1>
            
            </div>
          </div>
        </ul>
      </div>
      <div style={{ margin: "2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0.8em",
            marginTop: "5em",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Buy Transactions
          </Typography>
        </div>

        <ul>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems: "center",
              marginBottom: "3em",
            }}
          >
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Number of Transactions
              </Typography>
           
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsNumberBuy[transactionsDate.length - 1]}
                    </span>
                  </Typography>
                </h1>
     
            </div>
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Volume in USD
              </Typography>
             
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsVolumeBuy[transactionsDate.length - 1]}
                    </span>
                  </Typography>
                </h1>
            </div>
          </div>
        </ul>
      </div>
      <div style={{ margin: "2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0.8em",
            marginTop: "5em",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Sell Transactions
          </Typography>
        </div>

        <ul>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems: "center",
              marginBottom: "3em",
            }}
          >
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Number of Transactions 
              </Typography>
              
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsNumberSell[transactionsDate.length - 1]}
                    </span>
                  </Typography>
                </h1>
            </div>
            <div
              className="wrapper"
              style={{
                margin: "auto 0.1em",
                width: "70%",
                textAlign: "center",
                padding: "1em 1.5em",
                height: "80%",
                
              }}
            >
              <Typography variant="h4" gutterBottom>
                Volume in USD
              </Typography>
                <h1>
                  <Typography variant="h3" style={{ color: '#0093d5' }}>
                    {/* {transactionsDate[transactionsDate.length - 1]} : */}
                    <span>{' '}{transactionsVolumeSell[transactionsDate.length - 1]}
                    </span>
                  </Typography>
                </h1>
 
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Statistics;

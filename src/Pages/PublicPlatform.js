import { React, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";
import { getUserToken } from "../localStorage";
import DeleteButton from "./DeleteButton";
import CloseTransaction from "./CloseTransaction";
import jwtDecode from 'jwt-decode';


// import DeleteButton from "./DeleteButton";
var SERVER_URL = "http://127.0.0.1:5000";

function PublicPlatform() {
  let [sellAmount, setSellAmount] = useState();
  let [buyAskAmount, setBuyAskAmount] = useState();
  let [transactionTypePlatform, setTransactionTypePlatform] = useState([]);
  let [transactionId, setTransactionId] = useState([]);
  let [emailAddress, setEmailAddress] = useState();
  let [emailAddressPlatform, setEmailAddressPlatform] = useState([]);
  let [transactionType, setTransactionType] = useState("usd-to-lbp");
  let [amountSellingPlatform, setAmountSellingPlatform] = useState([]); //USD amount
  let [amountBuyingPlatform, setAmountBuyingPlatform] = useState([]); //LBP amount
  let [userNamePlatform, setUserNamePlatform] = useState([]);
  let [userToken, setUserToken] = useState(getUserToken());
  let [currentLoggedInUser, setCurrentLoggedInUser] = useState("");
  let [requestUserId, setRequestUserId] = useState();

  const decodedToken = jwtDecode(userToken);
  const currentUser = decodedToken.sub;
  

  function transactions() {
    fetch(`${SERVER_URL}/exchangeTransaction`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(transaction => transaction.request_user_id !== currentUser);

        setAmountSellingPlatform([]);
        setAmountBuyingPlatform([]);
        setEmailAddressPlatform([]);
        setTransactionTypePlatform([]);
        setTransactionId([]);
        setUserNamePlatform([]);
        setRequestUserId([]);

        filteredData.forEach((transaction) => {
          
          setRequestUserId((requestUserId) => [...requestUserId, transaction.request_user_id])
          setTransactionId((transactionId) => [...transactionId, transaction.exchange_id]);
          setAmountSellingPlatform((amountSellingPlatform) => [...amountSellingPlatform, transaction.sell_amount]);
          setAmountBuyingPlatform((amountBuyingPlatform) => [...amountBuyingPlatform, transaction.buy_amount]);
          setEmailAddressPlatform((emailAddressPlatform) => [...emailAddressPlatform, transaction.user_email]);
          setTransactionTypePlatform((transactionTypePlatform) => [...transactionTypePlatform, transaction.usd_to_lbp]);
          setUserNamePlatform((userNamePlatform) => [...userNamePlatform,transaction.username]);
          
        });
      });

     
  }
  

  useEffect(transactions, []);
  

  
  

  return (

    <div style={{ margin: "2em"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <Typography variant="h3" gutterBottom>
          List of Offers
        </Typography>
      </div>
      
        
      <ul style={{ padding: "0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            placeItems: "center",
          }}
        >
          {Array.from({ length: transactionTypePlatform.length }, (_, i) => (
            
            <h1>
              <Typography variant="h6">
                <h1>
                
                  <div
                    className="wrapper"
                    style={{
                      margin: "auto 0.1em",
                      width: "fit-content",
                      textAlign: "left",
                      padding: "1em 1.5em",
                      height: "auto",
                      minWidth: "170px",
                    }}
                  >
                    
                    <div style={{ marginLeft: "0em"}}>

                    <Typography variant="h6">
                        Posted by: <span>{userNamePlatform[i]}</span>{" "}
                
                      </Typography>

                      <Typography variant="h6">
                        Amount Selling: <span>{amountSellingPlatform[i]}</span>{" "}
                        {transactionTypePlatform[i] === true ? (
                          <span>USD</span>
                        ) : (
                          <span>LBP</span>
                        )}
                      </Typography>
                      <Typography variant="h6">
                        Buying Amount Ask:{" "}
                        <span>{amountBuyingPlatform[i]}</span>{" "}
                        {transactionTypePlatform[i] === true ? (
                          <span>LBP</span>
                        ) : (
                          <span>USD</span>
                        )}
                      </Typography>
                      <Typography variant="h6">
                        Listing Type:{" "}
                        <span>
                          {transactionTypePlatform[i] === true ? (
                            <span>USD to LBP</span>
                          ) : (
                            <span>LBP to USD</span>
                          )}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        Emaill Address: <span>{emailAddressPlatform[i]}</span>
                       
                        <div>
                            <button id="add-button" class="button" type="button" onClick={() => window.open('mailto:' + emailAddressPlatform[i])} >Send Email</button>
                        </div>
                        
                      </Typography>
                    </div>
                    
                  </div>
                </h1>
              </Typography>
            </h1>
          ))
          }
        </div>
      </ul>

    </div>
  );
}
export default PublicPlatform;

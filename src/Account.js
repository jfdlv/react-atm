import './Account.css';
import {useEffect, useState} from "react";
import ATMDeposit from "./AtmDeposit";

const Account = () => {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState("");
  const [validTransaction, setValidTransaction] = useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  useEffect(() => {
    console.log(deposit);
  },[deposit])

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if(atmMode === "Cash Back" && Number(event.target.value)>totalState){
      setValidTransaction(false);
    }
    else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setDeposit(0);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = e => {
    setAtmMode(e.target.value);
    if(e.target.value === "Deposit") {
      setIsDeposit(true);
    }
    if(e.target.value === "Cash Back") {
      setIsDeposit(false);
    }
  }

  return (
    <div className="container">
      {/* <form onSubmit={handleSubmit}> */}
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select className="form-select" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {atmMode && <ATMDeposit handleSubmit={handleSubmit} state={{deposit, isDeposit, totalState}} onChange={handleChange} stateLogic={{setTotalState,setDeposit}}></ATMDeposit>}
      {/* </form> */}
    </div>
  );
};
export default Account;

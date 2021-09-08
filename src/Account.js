import './Account.css';
import {useEffect, useState} from "react";
import ATMDeposit from "./AtmDeposit";

const Account = () => {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState("");

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  useEffect(() => {
    console.log(deposit);
  },[deposit])

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
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select className="form-select" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {/* passing the state, and state logic as props to the object */}
        {atmMode && <ATMDeposit state={{deposit, isDeposit, totalState}} stateLogic={{setTotalState,setDeposit}}></ATMDeposit>}
    </div>
  );
};
export default Account;

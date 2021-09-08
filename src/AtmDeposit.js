import { useFormik } from "formik";

const ATMDeposit = ({ state, stateLogic }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${state.isDeposit}`);
  const formik = useFormik({
    initialValues: {
      deposit:''
    },
    onSubmit: values => {
      let newTotal = state.isDeposit ? state.totalState + values.deposit : state.totalState - values.deposit;
      stateLogic.setTotalState(newTotal);
      stateLogic.setDeposit(0);
    },
    validate: values => {
      let errors = {};
      if(!values.deposit) errors.deposit = "Field required";
      else if (values.deposit < 0) errors.deposit = "You can't introduce a negative value";
      else if (!state.isDeposit && values.deposit>state.totalState) errors.deposit = "That amount exceeds your balance!";
      return errors;
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="atm-deposit">
        <h3> {choice[Number(!state.isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" className="form-control" name="deposit" onChange={formik.handleChange} value={formik.values.deposit}></input>
        {formik.errors.deposit ? <div style={{color: 'red'} } id="depositError">{formik.errors.deposit}</div> : null}
        <input className="btn btn-primary" type="submit" width="200" value="Submit" id="submit-input" style={{marginTop: "10px"}} ></input>
      </div>
    </form>
  );
};

export default ATMDeposit;
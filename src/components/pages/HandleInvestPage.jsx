import { useState } from "react";
import { useInvestment } from "../contexts/investmentContext";
import { Navigate, useNavigate } from "react-router-dom";
import InvestmentCard from "../layout/InvestmentCard";
import Input from "../layout/Input";
import notification from "../../util/notification";
import validatePayment from "../../util/payment";
import { addInvestmentToUser } from "../../util/firebase/db";
import { useAuth } from "../contexts/authContext";
import Loading from "../layout/Loading";

function HandleInvestPage() {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const { currentInvestment: investment } = useInvestment();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const validateCardNumberInput = (e) => {
    const value = e.target.value;
    if (/^\d{0,16}$/.test(value)) setCardNumber(value);
  };
  const validateDateInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    if (value.length > 2) value = value.substring(0, 2) + "/" + value.substring(2, 4);
    setExpirationDate(value);
  };
  const validateCvvInput = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) setCvv(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      validatePayment(cardNumber, expirationDate, cvv);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate payment processing time by sleeping for 1 second
      await addInvestmentToUser(currentUser.uid, investment, amount);
      notification("success", "You've invested successfully.");
      navigate("/investments");
    } catch (ex) {
      notification("error", ex.message);
    }
    setLoading(false);
  };

  if (!userLoggedIn) return <Navigate to={"/login"} replace={true} />;
  if (!investment) return <Navigate to={"/explore"} replace={true} />;

  return (
    <>
      {loading && <Loading />}

      <div className="container d-flex flex-column align-items-center my-4 gap-4" style={{ maxWidth: "740px" }}>
        <InvestmentCard investment={investment} />
        <form className="container p-4 border rounded" onSubmit={handleSubmit}>
          <h1 className="text-center">Payment</h1>
          <div className="row mb-3">
            <Input
              label="Card Number"
              id="cardNumber"
              type="number"
              value={cardNumber}
              onChange={validateCardNumberInput}
              placeholder="Card Number"
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                label="Expiration Date"
                id="expirationDate"
                type="text"
                value={expirationDate}
                onChange={validateDateInput}
                placeholder="MM/YY"
              />
            </div>
            <div className="col-md-6">
              <Input label="CVV" id="cvv" type="number" value={cvv} onChange={validateCvvInput} placeholder="CVV" />
            </div>
          </div>
          <div className="row mb-3">
            <Input
              label="Investment Amount"
              id="investmentAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="row">
            <div className="d-grid gap-2 col-3 mx-auto">
              <button type="submit" className="btn btn-primary px-4">
                Invest
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default HandleInvestPage;

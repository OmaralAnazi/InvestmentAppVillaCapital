import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { getUserFromDatabase } from "../../util/firebase/db";
import notification from "../../util/notification";
import { Navigate } from "react-router-dom";
import { getInvestmentFromDatabase } from "../../util/firebase/db";
import InvestmentDetailsModal from "../modals/InvestmentDetailsModal";
import Loading from "../layout/Loading";

function InvestmentsPage() {
  const { userLoggedIn, currentUser } = useAuth();
  const [userInvestments, setUserInvestments] = useState(null);
  const [currentShownInvestment, setCurrentShownInvestment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseDetails = () => setCurrentShownInvestment(null);
  const handleShowDetails = async (investmentId) => {
    setLoading(true);
    try {
      const investmentFullObject = await getInvestmentFromDatabase(investmentId);
      setCurrentShownInvestment(investmentFullObject);
    } catch (ex) {
      notification("error", ex.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserInvestments = async () => {
      try {
        const user = await getUserFromDatabase(currentUser.uid);
        setUserInvestments(user.investments);
      } catch (ex) {
        notification("error", ex.message);
      }
    };
    if (currentUser && currentUser.uid) {
      fetchUserInvestments();
    }
  }, [currentUser]);

  if (!userLoggedIn) return <Navigate to={"/login"} replace={true} />;
  if (userInvestments === null) return <Loading />;

  if (userInvestments.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center my-5 py-5 text-center">
        <h1 className="mx-4">No Current Investments</h1>
        <p className="mx-4">To see investments listed here, please visit the Explore page and initiate an investment.</p>
      </div>
    );
  }

  // Optimization Suggestion: The InvestmentCard component could be redesigned for reuse in this context. Unfortunately, I currently lack the time to implement this change.
  return (
    <>
      {currentShownInvestment &&
        (loading ? <Loading /> : <InvestmentDetailsModal investment={currentShownInvestment} handleCloseDetails={handleCloseDetails} />)}

      <div className="container my-5">
        <h3 className="text-center mb-4">{currentUser.displayName}'s Investments</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          {userInvestments.map((investment, index) => (
            // Using index as key is favored over ID since a user might invest in the same investment multiple times.
            <div className="col" key={index} style={{ maxWidth: "400px" }}>
              <div className="card h-100">
                <img
                  src={investment.picUrl ? investment.picUrl : "/placeholder-image.jpg"}
                  className="card-img-top"
                  alt={investment.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{investment.name}</h5>
                  <p className="card-text">{investment.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Invested Amount: ${investment.investedAmount}</li>
                  <li className="list-group-item">Investment Date: {investment.date}</li>
                  <li className="list-group-item">
                    Potential Returns at Investment Date: {investment.potentialReturnsAtDate.min}% - {investment.potentialReturnsAtDate.max}
                    %
                  </li>
                </ul>
                <button className="btn btn-primary m-3" onClick={() => handleShowDetails(investment.id)}>
                  Show Investment Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InvestmentsPage;

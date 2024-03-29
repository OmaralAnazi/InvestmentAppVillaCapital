import { useState } from "react";
import InvestmentDetailsModal from "../modals/InvestmentDetailsModal";

function InvestmentCard({ investment }) {
  const [isDetailsModalVisible, setDetailsModalVisibility] = useState(false);

  const handleCloseDetails = () => setDetailsModalVisibility(false);
  const handleShowDetails = () => setDetailsModalVisibility(true);

  const getRiskBadge = (riskLevel) => {
    const badgeClasses = {
      1: "bg-success",
      2: "bg-success",
      3: "bg-warning",
      4: "bg-danger",
      5: "bg-danger",
    };
    const riskText = {
      1: "Very Low Risk",
      2: "Low Risk",
      3: "Moderate Risk",
      4: "High Risk",
      5: "Very High Risk",
    };

    return (
      <span className={`badge ${badgeClasses[riskLevel]} px-2 py-1 position-absolute`} style={{ top: "10px", left: "10px" }}>
        {riskText[riskLevel]}
      </span>
    );
  };

  return (
    <>
      {isDetailsModalVisible && <InvestmentDetailsModal investment={investment} handleCloseDetails={handleCloseDetails} />}

      <div className="card mx-3" style={{ maxWidth: "720px" }}>
        <div className="row g-0">
          <div className="col-12 col-sm-4 position-relative">
            <img
              src={investment.picUrl ? investment.picUrl : "/placeholder-image.jpg"}
              className="img-fluid rounded-start"
              alt={investment.name}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            {getRiskBadge(investment.riskLevel)}
          </div>
          <div className="col-12 col-sm-8">
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: "100%" }}>
              <h4 className="card-title">{investment.name}</h4>
              <p className="card-text">{investment.description}</p>
              <p>
                Returns: {investment.potentialReturns.min}% - {investment.potentialReturns.max}%
              </p>
              <div className="row align-items-center">
                <div className="col-12 col-sm-auto">
                  <p>Minimum Investment: ${investment.minimumInvestmentAmount}</p>
                </div>
                <div className="col-12 col-sm-auto ms-auto">
                  <button className="btn btn-primary w-100 w-sm-auto" onClick={handleShowDetails}>
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvestmentCard;

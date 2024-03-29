import Modal from "./Modal";
import InvestmentChart from "../layout/InvestmentChart";
import { useNavigate, useLocation } from "react-router-dom";
import { useInvestment } from "../contexts/investmentContext";

function InvestmentDetailsModal({ investment, handleCloseDetails }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { setCurrentInvestment } = useInvestment();

	const handleInvest = () => {
		setCurrentInvestment(investment);
		navigate("/handleInvest");
	};

	const showInvestBtn = location.pathname === "/explore";

	return (
		<Modal
			title={investment.name}
			hideModal={handleCloseDetails}
			primaryBtn={
				showInvestBtn && (
					<button className="btn btn-primary" onClick={handleInvest}>
						invest
					</button>
				)
			}
		>
			<div>
				<p>
					<strong>Description: </strong>
					{investment.description}
				</p>
				<p>
					<strong>Potential Returns: </strong>
					{investment.potentialReturns.min}% - {investment.potentialReturns.max}%
				</p>
				<p>
					<strong>Investment Type: </strong>
					{investment.investmentType}
				</p>
				<p>
					<strong>Risk Factors: </strong>
					{investment.riskFactors}
				</p>
				<p>
					<strong>Minimum Investment Amount: </strong>${investment.minimumInvestmentAmount}
				</p>
				<p>
					<strong>Performance over Years:</strong>
					<InvestmentChart data={investment.historicalPerformanceData} />
				</p>
			</div>
		</Modal>
	);
}

export default InvestmentDetailsModal;

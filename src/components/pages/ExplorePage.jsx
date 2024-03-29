import { useState, useEffect } from "react";
import InvestmentCard from "../layout/InvestmentCard";
import Loading from "../layout/Loading";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { getAllInvestmentsFromDatabase } from "../../util/firebase/db";
import notification from "../../util/notification";
import FilterComponent from "../layout/ExploreFilter";

function ExplorePage() {
  const { userLoggedIn } = useAuth();
  const [investments, setInvestments] = useState(null);
  const [filteredInvestments, setFilteredInvestments] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await getAllInvestmentsFromDatabase();
        setInvestments(data);
        setFilteredInvestments(data);
      } catch (ex) {
        notification("error", ex.message);
      }
    };
    fetchInvestments();
  }, []);

  if (!userLoggedIn) return <Navigate to={"/login"} replace={true} />;
  if (investments === null) return <Loading />;

  if (investments.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center my-5 py-5 text-center">
        <h1 className="mx-4">Investments Unavailable</h1>
        <p className="mx-4">At the moment, there are no investment opportunities available. Please check back again later.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center my-4 gap-4">
      <h1 className="text-center mx-2">Latest Investment Opportunities</h1>
      <FilterComponent investments={investments} onFilter={setFilteredInvestments} />
      {filteredInvestments.length !== 0 ? (
        filteredInvestments.map((investment) => <InvestmentCard key={investment.id} investment={investment} />)
      ) : (
        <div className="d-flex flex-column align-items-center my-5 py-5 text-center">
          <h3 className="mx-4 fw-normal">No matched investments...</h3>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;

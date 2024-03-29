import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../../util/firebase/auth";
import notification from "../../util/notification";
import { Navigate } from "react-router-dom";
import Modal from "../modals/Modal";
import Loading from "../layout/Loading";

function AccountPage() {
  const { userLoggedIn, currentUser } = useAuth();
  const [isEditProfileModalVisible, setEditProfileModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await doSignOut();
      notification("success", "You're logged out successfully!");
    } catch (ex) {
      notification("error", ex.message);
    }
    setLoading(false);
  };

  if (!userLoggedIn) return <Navigate to={"/login"} replace={true} />;

  return (
    <>
      {loading && <Loading />}

      {isEditProfileModalVisible && (
        <Modal title="Update Profile Information" hideModal={() => setEditProfileModalVisibility(false)}>
          <p>This feature is not available yet...</p>
        </Modal>
      )}

      <div className="container mt-5">
        <h1 className="mb-4 text-center">Account Information</h1>
        <div className="card">
          <div className="card-body d-flex flex-column align-items-center">
            <img
              src={currentUser.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <h5 className="card-title mb-2">{currentUser.displayName || "No Name"}</h5>
            <p className="card-text mb-4">{currentUser.email}</p>
            <div>
              <button className="btn btn-primary me-2" onClick={handleLogout}>
                Log Out
              </button>
              <button className="btn btn-secondary" onClick={() => setEditProfileModalVisibility(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;

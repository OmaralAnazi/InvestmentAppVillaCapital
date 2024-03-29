import { useState } from "react";
import Input from "../layout/Input";
import Modal from "../modals/Modal";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import notification from "../../util/notification";
import { doCreateUserWithEmailAndPassword, doSendEmailVerification } from "../../util/firebase/auth";
import Loading from "../layout/Loading";

function RegisterPage() {
  const { userLoggedIn } = useAuth();
  const [isVerificationModalVisible, setVerificationModalVisibility] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateNameInput = (e) => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value)) setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userLoggedIn) {
      try {
        await doCreateUserWithEmailAndPassword(name.trim(), email, password, confirmPassword);
        await doSendEmailVerification();
        setVerificationModalVisibility(true);
        resetForm();
        notification("info", "Verification link has been sent to your email.");
      } catch (ex) {
        notification("error", ex.message);
      }
    }
    setLoading(false);
  };

  if (userLoggedIn) return <Navigate to={"/account"} replace={true} />;

  return (
    <>
      {loading && <Loading />}

      {isVerificationModalVisible && (
        <Modal title="Email Verification Required" hideModal={() => setVerificationModalVisibility(false)}>
          <p>Please check your email to verify your account in order to log in.</p>
        </Modal>
      )}

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h2 className="card-header text-center">Register</h2>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <Input label="Full Name" id="name" type="text" placeholder="Enter your name" value={name} onChange={validateNameInput} />
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

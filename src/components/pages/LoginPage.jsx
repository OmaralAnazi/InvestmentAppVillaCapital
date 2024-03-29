import { useState } from "react";
import { Navigate } from "react-router-dom";
import Input from "../layout/Input";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import { doSignInWithEmailAndPassword } from "../../util/firebase/auth";
import { useAuth } from "../contexts/authContext";
import notification from "../../util/notification";
import Loading from "../layout/Loading";

function LoginPage() {
  const { userLoggedIn } = useAuth();
  const [isResetPasswordModalVisible, setResetPasswordModalVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userLoggedIn) {
      try {
        await doSignInWithEmailAndPassword(email, password);
        notification("success", "You're logged in successfully!");
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

      {isResetPasswordModalVisible && <ResetPasswordModal hideModal={() => setResetPasswordModalVisibility(false)} />}

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h2 className="card-header text-center">Login</h2>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email address"
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
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Login
                  </button>
                  <div className="text-center mt-3">
                    <button type="button" className="btn btn-link" onClick={() => setResetPasswordModalVisibility(true)}>
                      Forgot password?
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

export default LoginPage;

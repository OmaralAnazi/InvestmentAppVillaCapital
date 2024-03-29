import { useState } from "react";
import Input from "../layout/Input";
import Modal from "../modals/Modal";
import { doPasswordReset } from "../../util/firebase/auth";
import notification from "../../util/notification";
import Loading from "../layout/Loading";

function ResetPasswordModal({ hideModal }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await doPasswordReset(email);
      notification("info", "Reset link has been sent to your email.");
      setEmail("");
      hideModal();
    } catch (ex) {
      notification("error", ex.message);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}

      <Modal
        title="Reset Password"
        hideModal={hideModal}
        primaryBtn={
          <button className="btn btn-primary" type="submit" form="passwordReset">
            Send Reset Link
          </button>
        }
      >
        <form id="passwordReset" onSubmit={handleSubmit}>
          <Input
            label="Email address"
            id="emailPasswordReset"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;

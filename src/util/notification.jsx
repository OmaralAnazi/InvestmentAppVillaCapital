import { toast } from "react-toastify";

function CustomToast({ title, message }) {
  return (
    <>
      <h5>{title}</h5>
      <p>{message}</p>
    </>
  );
}

function notification(type, title, message = "") {
  const validTypes = ["info", "success", "warning", "error"];
  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid notification type: ${type}. Type must be one of 
      ${validTypes.join(", ")}.`
    );
  }

  message ? toast[type](<CustomToast title={title} message={message} />) : toast[type](title);
}

export default notification;

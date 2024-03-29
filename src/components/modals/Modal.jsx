/**
 * Displays a modal window with customizable content.
 *
 * @param {Object} props The properties for the Modal component.
 * @param {string} props.title The title displayed at the top of the modal window.
 * @param {React.ReactNode} props.children The content to be displayed inside the modal body.
 * @param {Function} props.hideModal A callback function that is invoked when the close button is clicked.
 * @param {HTMLButtonElement} [props.primaryBtn] An optional button element to add a primary action button to the modal.
 *
 * @returns {React.Component} The Modal component.
 */
function Modal({ title, children, hideModal, primaryBtn = undefined }) {
  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={hideModal}>
              Close
            </button>
            {primaryBtn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

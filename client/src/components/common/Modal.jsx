import { FaTimes } from "react-icons/fa";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  size = "medium",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className={`modal-panel modal-${size}`} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;

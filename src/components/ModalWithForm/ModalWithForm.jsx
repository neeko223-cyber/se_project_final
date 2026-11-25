import { useEffect } from "react";
import "./ModalWithForm.css";

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ModalWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isButtonDisabled = false,
  redirectText,
  redirectLinkText,
  redirectAlign = "center",
  onRedirect,
  children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`modal modal_type_${name}`} onMouseDown={handleOverlayMouseDown}>
      <div
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${name}-title`}
      >
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <h2 className="modal__title" id={`${name}-title`}>
          {title}
        </h2>
        {onSubmit ? (
          <form className="modal__form" name={name} noValidate onSubmit={onSubmit}>
            {children}
            {buttonText && (
              <button className="modal__submit" type="submit" disabled={isButtonDisabled}>
                {buttonText}
              </button>
            )}
          </form>
        ) : (
          children
        )}
        {redirectLinkText && (
          <p className={`modal__redirect modal__redirect_align_${redirectAlign}`}>
            {redirectText ? <span>{redirectText} </span> : null}
            <button className="modal__redirect-link" type="button" onClick={onRedirect}>
              {redirectLinkText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;

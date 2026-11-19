import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setSubmitError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    Promise.resolve(onLogin({ email, password }))
      .catch((error) => {
        setSubmitError(error.message || "Incorrect email or password");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const isComplete = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign in"
      isButtonDisabled={!isComplete || isSubmitting}
      redirectText="or"
      redirectLinkText="Sign up"
      onRedirect={onSwitchToRegister}
    >
      <label className="modal__field">
        <span className="modal__label">Email</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitError("");
          }}
        />
      </label>
      <label className="modal__field">
        <span className="modal__label">Password</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setSubmitError("");
          }}
        />
      </label>
      {submitError && <p className="modal__error">{submitError}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;

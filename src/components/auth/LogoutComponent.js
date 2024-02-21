import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { Modal, Button } from "react-bootstrap";

const LogoutComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.setToken(null));
    dispatch(authActions.setUserId(null));
    dispatch(authActions.setRole(null));
    dispatch(authActions.setAuthentication(false));

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
    window.location.reload();
  };

  const handleClose = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LogoutComponent;

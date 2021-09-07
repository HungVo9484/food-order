// import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlays = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: ${slideDown} 300ms ease-out forwards;

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;
const Modal = (props) => {
// const portalElement = document.getElementById('overlays');
//   console.log(portalElement);
  return (
    <Fragment>
      {/* {ReactDOM.createPortal(<BackDrop />, portalElement)}
      {
        (ReactDOM.createPortal(
          <ModalOverlays>{props.children}</ModalOverlays>
        ),
        portalElement)
      } */}
      <BackDrop onClick={props.onClose} />
      <ModalOverlays>{props.children}</ModalOverlays>
    </Fragment>
  );
};

export default Modal;

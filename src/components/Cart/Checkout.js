import { useRef, useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin: 1rem 0;
  height: 19rem;
  overflow: auto;
  .control {
    margin-bottom: 0.5rem;
  }

  .control label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  .control input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .actions button {
    font: inherit;
    color: #5a1a01;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 25px;
    padding: 0.5rem 2rem;
  }

  .actions button:hover,
  .actions button:active {
    background-color: #ffe6dc;
  }

  .actions .submit {
    border: 1px solid #5a1a01;
    background-color: #5a1a01;
    color: white;
  }

  .actions .submit:hover,
  .actions .submit:active {
    background-color: #7a2706;
  }

  .invalid label {
    color: #ca3e51;
  }

  .invalid input {
    border-color: #aa0b20;
    background-color: #ffeff1;
  }
`;

const isEmpty = (value) => value.trim() === '';

const CheckOut = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalValid = !isEmpty(enteredPostal);
    const enteredCityValid = !isEmpty(enteredCity);

    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredPostalValid &&
      enteredCityValid;

    setFormInputsValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      city: enteredCityValid,
      postal: enteredPostalValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    });
  };

  return (
    <Form onSubmit={confirmHandler}>
      <div
        className={`control ${!formInputsValidity.name && 'invalid'}`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter Name</p>}
      </div>
      <div
        className={`control ${
          !formInputsValidity.street && 'invalid'
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter Street</p>}
      </div>
      <div
        className={`control ${
          !formInputsValidity.postal && 'invalid'
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter Postal</p>}
      </div>
      <div
        className={`control ${!formInputsValidity.city && 'invalid'}`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter City</p>}
      </div>
      <div className='actions'>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className='submit'>Confirm</button>
      </div>
    </Form>
  );
};

export default CheckOut;

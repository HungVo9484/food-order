import { useRef } from 'react';
import styled from 'styled-components';

import Input from '../../UI/Input';

const Form = styled.form`
  text-align: right;
  button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
  }
  button:hover,
  button:active {
    background-color: #641e03;
    border-color: #641e03;
  }
`;

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enterAmount = amountInputRef.current.value;
    const enterAmountNumber = +enterAmount;
    if (
      enterAmount.length === 0 ||
      enterAmountNumber < 1 ||
      enterAmountNumber > 5
    ) {
      return;
    }
    props.onAddToCart(enterAmountNumber)
  };

  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
    </Form>
  );
};

export default MealItemForm;

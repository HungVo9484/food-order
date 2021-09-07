import { useContext, useState } from 'react';
import styled from 'styled-components';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckOut from './Checkout';

const CartItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const Action = styled.div`
  text-align: right;

  button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }

  button:hover,
  button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }

  .button--alt {
    color: #8a2b06;
  }

  .button {
    background-color: #8a2b06;
    color: white;
  }
`;

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { items, totalAmount, addItem, removeItem } =
    useContext(CartContext);

  const hasItem = items.length > 0;

  const removeItemHandler = (id) => {
    removeItem(id);
  };

  const addItemHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    fetch('https://twitter-clone-cf72b-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: items
      })
    })
  };

  const cartItems = (
    <CartItems>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </CartItems>
  );

  const modalActions = (
    <Action>
      <button className='button--alt' onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className='button' onClick={orderHandler}>
          Order
        </button>
      )}
    </Action>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <Total>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </Total>
      {isCheckout ? (
        <CheckOut
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
        />
      ) : (
        modalActions
      )}
    </Modal>
  );
};

export default Cart;

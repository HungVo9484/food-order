import { useContext, useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context';

const bumping = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
`;

const bump = ({ animation }) => {
  if (animation) {
    return css`
      animation: ${bumping} 300ms ease-out;
    `;
  }
  return;
};

const Button = styled.button`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #4d1601;
  color: white;
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;
  &:hover,
  &:active {
    background-color: #2c0d00;
  }
  > .icon {
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 0.5rem;
  }
  > .badge {
    background-color: #b94517;
    padding: 0.25rem 1rem;
    border-radius: 25px;
    margin-left: 1rem;
    font-weight: bold;
  }

  &:hover .badge,
  &:active .badge {
    background-color: #92320c;
  }
  ${bump}
`;

const HeaderCartButton = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const { items } = useContext(CartContext);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true)

    const timer = setTimeout(() => {
      setBtnHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items]);

  return (
    <Button onClick={props.onClick} animation={btnHighlighted}>
      <span className='icon'>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className='badge'>{numberOfCartItems}</span>
    </Button>
  );
};

export default HeaderCartButton;

import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const { item } = action;
    const newTotalAmount =
      item.amount * item.price + state.totalAmount;
    const existingCartItemIndex = state.items.findIndex(
      (i) => i.id === item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(item);
    }

    return { items: updatedItems, totalAmount: newTotalAmount };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (i) => i.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const newTotalAmount =
      state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== action.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: newTotalAmount };
  }

  if (action.type === 'CLEAR') {
    return defaultState;
  }

  return state;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(
    cartReducer,
    defaultState
  );

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: 'CLEAR' })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

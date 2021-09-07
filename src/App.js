import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  // createGlobalStyle,
  ThemeProvider,
} from 'styled-components';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

import DarkTheme from './themes/dark';
import LightTheme from './themes/light';
import CartProvider from './store/CartProvider';

// const GlobalStyle = createGlobalStyle`
//   body{
//     margin: 0px;
//     background: ${(p) =>
//       p.theme.palette.common.backgroundColor};
//   }
// `;

function App() {
  const [theme, setTheme] = useState(DarkTheme);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            setTheme((s) =>
              s.id === 'light' ? DarkTheme : LightTheme
            );
          },
        }}
      >
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Switch>
          <Route path='/food-order' exact>
            <Meals />
            </Route>
            <Route path='/'>
              <h1 style={{textAlign: 'center', color: 'white'}}>Page not Found!</h1>
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;

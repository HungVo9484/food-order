import React, { Fragment } from 'react';
import styled from 'styled-components';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';

const HeaderCss = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: ${(p) => p.theme.palette.common.headerBGColor};
  color: ${(p) => p.theme.palette.common.headerColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
  > h1 {
    margin-left: 10%;
  }
  > button {
    margin-right: 10%;
  }
  
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 25rem;
  z-index: 0;
  overflow: hidden;
  > img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
  }
`;

const Header = (props) => {
  return (
    <Fragment>
      <HeaderCss>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </HeaderCss>
      <ImgContainer>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </ImgContainer>
    </Fragment>
  );
};

export default Header;

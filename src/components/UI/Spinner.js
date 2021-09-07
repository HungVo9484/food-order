import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    height: 30px;
    width: 30px;
    border: 3px solid #b94517;
    border-radius: 50%;
    border-top: none;
    border-right: none;
    margin: 16px auto;
    animation: ${rotation} 1s linear infinite;
`;
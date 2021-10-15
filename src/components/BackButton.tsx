import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

export const Wrapper = styled.button`
  border: none;
  background: #fff0;
  
  font-weight: 300;
  cursor: pointer;
`;

const BackButton = () => {
  const history = useHistory();

  return (
    <Wrapper onClick={() => history.goBack()}>
      Go Back
    </Wrapper>
  );
}

export default BackButton;
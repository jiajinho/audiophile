import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import { strings } from '../common/config';
import TangledThought, { Wrapper as _TangledThought } from '../common/svg/TangledThought';
import Button from '../components/Button';

const Wrapper = styled.div`
  margin-top: 50rem;
  margin-bottom: 100rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  

  ${_TangledThought} {
    aspect-ratio: 1/1;
    width: 55%;
    max-width: 500rem;
    height: auto;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 25rem;

  margin-top: 20rem;
`;

const Description = styled.p`
  width: 60%;
  max-width: 550rem;
  text-align: center;

  margin: 15rem 0;
`;

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <TangledThought />

      <Title>{strings.notFound.title}</Title>
      <Description>{strings.notFound.description}</Description>
      <Button
        text="GO BACK"
        theme="primary"
        onClick={() => {
          history.push("/");
          window.scrollTo(0, 0);
        }}
      />
    </Wrapper>
  );
}

export default NotFoundPage;
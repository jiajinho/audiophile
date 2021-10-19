import React from 'react';
import styled from 'styled-components';

import Loading, { Wrapper as _Loading } from '../../../common/svg/Loading';

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background: black;
  cursor: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${_Loading} {
    margin: 20rem 0;
  }
`;

const Bar = styled.div`
  position: relative;

  height: 15rem;
  width: 60%;
  max-width: 350rem;

  border-radius: 10rem;
  border: 2rem solid white;

  overflow: hidden;
`;

const Fill = styled.div(({ $width }: { $width: number }) => `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  height: 100%;
  width: ${$width}%;

  border-radius: 10rem;
  background: var(--theme-primary);

  transition: 0.25s width;
`);


const LoadingContainer = ({ progress }: { progress: number }) => (
  <Wrapper>
    <Loading />

    <Bar>
      <Fill $width={progress} />
    </Bar>
  </Wrapper>
);



export default LoadingContainer;
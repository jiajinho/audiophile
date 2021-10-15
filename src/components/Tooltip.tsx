import React from 'react';
import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  visibility: hidden;
  opacity: 0;
  transition: .25s opacity, .25s visibility;

  position: absolute;
  bottom: 100%;

  padding: 3rem 15rem;

  right: 50%;
  transform: translate(50%, -5rem);

  background: black;
  color: white;
  border-radius: 5rem;

  p {
    font-size: 14rem;
    white-space: nowrap;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;

    border: 4rem solid black;
    border-color: black transparent transparent transparent;
    margin-left: -4rem;
  }
`;

const Tooltip = ({ text }: {
  text: string
}) => (
  <Wrapper>
    <p>{text}</p>
  </Wrapper>
)

export default Tooltip;
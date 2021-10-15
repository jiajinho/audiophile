import React from 'react';
import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  background: #e7e7e7;
  padding: 10rem;

  button {
    height: 100%;
    padding: 5rem 10rem;

    background: #fff0;
    border: none;
    cursor: pointer;
    transition: color .25s;
  }

  button:hover {
    color: var(--theme-primary);
  }

  p {
    width: 40rem; 
    text-align: center;
  }

`;

const Counter = ({ value, onChange }: {
  value: number,
  onChange: (updatedValue: number) => void
}) => {
  const increment = () => onChange(value + 1);
  const decrement = () => {
    const updatedValue = value - 1;
    value - 1 < 0 ? onChange(0) : onChange(updatedValue);
  }

  return (
    <Wrapper>
      <button onClick={decrement}>-</button>

      <p>{value}</p>

      <button onClick={increment}>+</button>
    </Wrapper>
  );
}
export default Counter;
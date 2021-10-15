import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';

export const Wrapper = styled.div(({ $active }: { $active: boolean }) => `
  display: inline-flex;
  align-items: center;

  cursor: pointer;
  border-color: ${$active ? "var(--theme-primary)" : "var(--theme-neutral)"};

  :hover {
    border-color: var(--theme-primary);
  }
`);

const CSSRadio = `
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  top: 1px;
  left: 0px;
  position: relative;
  content: '';
  display: inline-block;
  visibility: visible;
`;

const Input = styled.input`
  cursor: pointer;

  ::after {
    ${CSSRadio}
    background-color: white;
    border: 2rem solid white;
    box-shadow: 0 0 0 1.5rem #d1d3d1;
  }

  :checked::after {
    ${CSSRadio}
    background-color: var(--theme-primary);
    border: 2rem solid white;
    box-shadow: 0 0 0 1.5rem var(--theme-primary);
  }
`;

const Label = styled.p`
  cursor: pointer;
  font-size: 16rem;
  line-height: normal;
  margin-left: 10rem;
`;

const RadioButton = ({ text, value, activeValue, groupName, onChange }: {
  text: string,
  value: string,
  activeValue: string,
  groupName: string,
  onChange: (value: string) => void
}) => {
  /**
   * Hooks
   */
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = activeValue === value;
    }
  }, [activeValue, value]);

  /**
   * Not hooks
   */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.checked = true;
      onChange(value);
    }
  }

  /**
   * Render
   */
  return (
    <Wrapper
      className="input"
      onClick={() => handleClick()}
      $active={activeValue === value}
    >
      <Input
        ref={inputRef}
        type="radio"
        id={value}
        value={value}
        name={groupName}
      />

      <Label>{text}</Label>
    </Wrapper>
  );
}

export default RadioButton;
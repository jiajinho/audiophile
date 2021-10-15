import React from 'react';
import styled from 'styled-components/macro';

type ButtonTheme = "primary" | "neutral" | "neutral-inverted";

export const Wrapper = styled.button(({ $background, $borderColor, $color, $hoverBackground, $hoverBorderColor, $hoverColor }: {
  $background: string,
  $borderColor: string,
  $color: string,
  $hoverBackground: string,
  $hoverBorderColor: string,
  $hoverColor: string
}) => `
  border: 2rem solid;

  background: ${$background};
  border-color: ${$borderColor};
  color: ${$color};

  cursor: pointer;
  transition: background .25s, border-color .25s, color .25s;

  :hover {
    background: ${$hoverBackground};
    border-color: ${$hoverBorderColor};
    color: ${$hoverColor};
  }
`);

const Button = ({ text, onClick, theme }: {
  text: string,
  onClick?: () => void,
  theme: ButtonTheme
}) => {

  let background: string;
  let borderColor: string;
  let color: string;
  let hoverBackground: string;
  let hoverBorderColor: string;
  let hoverColor: string;

  switch (theme) {
    case "primary":
      background = "var(--theme-primary)";
      borderColor = "var(--theme-primary)";
      color = "white";
      hoverBackground = "var(--theme-primary-alt)";
      hoverBorderColor = "var(--theme-primary-alt)";
      hoverColor = "white";
      break;
    case "neutral":
      background = "transparent";
      borderColor = "black";
      color = "black";
      hoverBackground = "black";
      hoverBorderColor = "black";
      hoverColor = "white";
      break;
    case "neutral-inverted":
      background = "black";
      borderColor = "black";
      color = "white";
      hoverBackground = "transparent";
      hoverBorderColor = "black";
      hoverColor = "black";
      break;
  }

  return (
    <Wrapper
      onClick={() => onClick && onClick()}

      $background={background}
      $borderColor={borderColor}
      $color={color}
      $hoverBackground={hoverBackground}
      $hoverBorderColor={hoverBorderColor}
      $hoverColor={hoverColor}
    >
      {text}
    </Wrapper>
  );
}

export default Button;
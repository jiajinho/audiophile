import React from 'react';
import styled from 'styled-components/macro';

type TextAlign = "center" | "left" | "right";

export const Wrapper = styled.div(({ $textAlign }: { $textAlign: TextAlign }) => `
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: ${$textAlign === "center" ? "center" : $textAlign === "left" ? "flex-start" : "flex-end"};
`);

const Paragraph = styled.p(({ $lastLineWidth }: { $lastLineWidth: string }) => `
  width: 100%;
  line-height: normal;

  :not(:first-child) {
    margin-top: 7rem;
  }

  :last-child {
    width: ${$lastLineWidth};
  }

  @keyframes render {
    from { background: #ccc }
    to {background: #e7e7e7 }
  }

  animation-name: render;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`);

const SkeletonParagraphs = ({ as = "p", paragraphs, lastLineWidth = "100%", textAlign }: {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  paragraphs: number, //At least 1
  lastLineWidth?: string, //rem or %
  textAlign: TextAlign,
}) => {

  if (paragraphs < 1) throw new Error("Property 'paragraph' expects number value to be at least 1");

  const list = [];

  for (let i = 0; i < paragraphs; i++) {
    list.push(
      <Paragraph as={as} key={i} $lastLineWidth={lastLineWidth}>
        {String.fromCharCode(8204)}
      </Paragraph>
    );
  }

  return (
    <Wrapper $textAlign={textAlign}>
      {list.map((item) => item)}
    </Wrapper>
  );
}

export default SkeletonParagraphs;
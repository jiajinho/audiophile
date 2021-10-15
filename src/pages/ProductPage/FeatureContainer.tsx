import React from 'react';
import styled from 'styled-components/macro';

import { viewport } from '../../common/config';
import { Product } from '../../common/types';
import SkeletonParagraphs, { Wrapper as _SkeletonParagraphs } from '../../components/SkeletonParagraphs';

export const Wrapper = styled.div`
  margin: 100rem 0;

  @media screen and (min-width: ${viewport.lg}) {
    display: flex;
  }
`;

const Features = styled.div`
  margin: 100rem 0;

  & > div > * {
    margin: 20rem 0;
  }

  @media screen and (min-width: ${viewport.lg}) {
    flex-grow: 1;
    margin: 0;

    padding-right: 5%;
  }
`;

const InTheBox = styled.div`
  div#box:first-of-type { margin-top: 20rem }

  div#box { 
    margin: 10rem 0;
    display: flex;
  }

  p#number, p#box-item {
    display: inline;
  }

  p#number {
    font-weight: bold;
    color: var(--theme-primary);
    margin-right: 20rem;
  }

  p#box-item { line-break: anywhere }

  ${_SkeletonParagraphs} {
    width: 60%;
    margin: 20rem 0;
  }

  @media screen and (min-width: ${viewport.sm}) {
    display: flex;

    div#box:first-of-type { margin-top: 0 }

    & > *, ${_SkeletonParagraphs} { 
      width: 100%; 
    }

    & > div > p:first-of-type, ${_SkeletonParagraphs} {
      margin-top: 0;
    }
  }

  @media screen and (min-width: ${viewport.lg}) {
    width: 30%;
    flex-shrink: 0;
    display: block;

    div#box:first-of-type { margin-top: 20rem }

    & > div > p:first-of-type, ${_SkeletonParagraphs} {
      margin-top: 20rem;
    }
  }
`;

const FeatureContainer = ({ item }: { item?: Product }) => (
  <Wrapper>
    <Features>
      <h2>FEATURES</h2>

      {item ?
        //Real container
        <div>
          {item.features.map((feature, i) =>
            <p key={i} className="light">{feature}</p>
          )}
        </div>
        :
        //Skeleton container
        <div>
          <SkeletonParagraphs
            paragraphs={7}
            lastLineWidth="50%"
            textAlign="left"
          />

          <SkeletonParagraphs
            paragraphs={5}
            lastLineWidth="70%"
            textAlign="left"
          />
        </div>
      }
    </Features>

    <InTheBox>
      <h2>IN THE BOX</h2>

      {item ?
        //Real container
        <div>
          {item.inTheBox.map(({ number, name }, i) =>
            <div id="box" key={i}>
              <p id="number">{number}x</p>
              <p id="box-item" className="light">{name}</p>
            </div>
          )}
        </div>
        :
        //Skeleton container
        <div>
          <SkeletonParagraphs
            paragraphs={4}
            textAlign="left"
          />
        </div>
      }
    </InTheBox>
  </Wrapper>
);

export default FeatureContainer;
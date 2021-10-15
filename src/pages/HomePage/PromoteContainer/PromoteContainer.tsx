import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import { css, viewport } from '../../../common/config';
import { MediaContext } from '../../../common/contexts';
import PrimaryHighlight from './PrimaryHighlight';
import SecondaryHighlight from './SecondaryHighlight';
import TertiaryHighlight from './TertiaryHighlight';

const Wrapper = styled.div`
  margin: 100rem 0;

  padding: 0 ${css.window.horizontalPadding.xs};

  @media screen and (min-width: ${viewport.sm}) {
    padding: 0 ${css.window.horizontalPadding.sm};
  }

  @media screen and (min-width: ${viewport.lg}) {
    padding: 0 ${css.window.horizontalPadding.lg};
  }
`;

const PromoteContainer = () => {
  const { lg } = useContext(MediaContext);

  return (
    <Wrapper>
      <PrimaryHighlight
        imgSrc="/static/speakers/zx9/lg.png"
        imgAlt="ZX9 speaker"
        title="ZX9 SPEAKER"
        description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound."
        linkTo="/speakers/zx9"
      />

      <SecondaryHighlight
        imgSrc={`/static/shared/home-zx7-${lg ? "lg" : "md"}.jpg`}
        imgAlt="ZX7 speaker"
        title="ZX7 SPEAKER"
        description="Stream high quality sound wirelessly with minimal loss"
        linkTo="/speakers/zx7"
      />

      <TertiaryHighlight
        imgSrc="/static/shared/home-yx1-md.jpg"
        imgAlt="YX1 headphone"
        title="YX1 EARPHONES"
        description="Tailor your listening experience with bespoke dynamic drivers."
        linkTo="/earphones/yx1"
      />
    </Wrapper>
  );
}

export default PromoteContainer;
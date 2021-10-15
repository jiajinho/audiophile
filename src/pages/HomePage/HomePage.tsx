import React from 'react';
import styled from 'styled-components/macro';

import StarContainer from './StarContainer/StarContainer';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Footnote from '../../components/Footnote';
import PromoteContainer from './PromoteContainer/PromoteContainer';

const Wrapper = styled.div``;

const HomePage = () => (
  <Wrapper>
    <StarContainer />

    <CategoryNav />

    <PromoteContainer />

    <Footnote />
  </Wrapper>
);

export default HomePage;
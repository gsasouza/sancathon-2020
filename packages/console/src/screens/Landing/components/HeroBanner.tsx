import * as React from 'react';
import styled from 'styled-components';

import BaseSection from './Section';
// @ts-ignore
import heroImage from '../../../../static/img/hero-image.jpg';

const Container = styled(BaseSection)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
  background-image: url(${heroImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 54px;
  color: #ffffff;
`;

const Subtitle = styled(Title)`
  font-size: 28px;
`;

const TextWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 1.5fr 1fr;
  max-width: 1000px;
  width: 100%;
`;

const HeroBanner = () => {
  return (
    <Container>
      <TextWrapper>
        <div>
          <Title>NeoCloud</Title>
          <Subtitle>A solução para o delivery pós-pandemia</Subtitle>
        </div>
      </TextWrapper>
    </Container>
  );
};

export default HeroBanner;

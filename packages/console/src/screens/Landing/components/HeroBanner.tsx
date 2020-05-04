import * as React from 'react';
import styled from 'styled-components';

import BaseSection from './Section';
// @ts-ignore
import heroImage from '../../../../static/img/hero-image.jpg';
import ContactSection from './ContactSection';
import media from 'styled-media-query';

const Container = styled(BaseSection)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: calc(100vh - 3.5rem);
  height: 100%;
  width: 100%;
  background-image: url(${heroImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${media.lessThan('medium')`
    grid-template-columns: 1fr;
  `}
`;

const Title = styled.h1`
  font-size: 8vh;
  color: #ffffff;
  margin-left: 2rem;
  ${media.lessThan('medium')`
    text-align: center;
    margin-left: 0rem;
  `}
`;

const Subtitle = styled(Title)`
  font-size: 6vh;
`;

const TextWrapper = styled.div``;

const HeroBanner = () => {
  return (
    <Container>
      <TextWrapper>
        <div>
          <Title>NeoCloud</Title>
          <Subtitle>A solução para o delivery pós-pandemia</Subtitle>
        </div>
      </TextWrapper>
      <ContactSection></ContactSection>
    </Container>
  );
};

export default HeroBanner;

import * as React from 'react';
import styled from 'styled-components';

import BaseSection from './Section';
// @ts-ignore
import heroImage from '../../../../static/img/hero-image.jpg';
import ContactSection from './ContactSection';
import media from 'styled-media-query';

const Container = styled(BaseSection)`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-image: url(${heroImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 5vh;
  color: ${props => props.theme.palette.secondary};
  margin-left: 2rem;
  ${media.lessThan('medium')`
    text-align: center;
    margin-left: 0rem;
  `}
`;

const Subtitle = styled(Title)`
  font-size: 3vh;
`;

const TextWrapper = styled.div`
  max-width: 1300px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: 1600px;
  margin: auto;
  width: 100%;
  ${media.lessThan('medium')`
    grid-template-columns: 1fr;
  `}
`;

const HeroBanner = () => {
  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <div>
            <Title>NeoCloud</Title>
            <Subtitle>A solução para o delivery pós-pandemia</Subtitle>
          </div>
        </TextWrapper>
        <ContactSection />
      </Wrapper>

    </Container>
  );
};

export default HeroBanner;

import * as React from 'react';
import styled from 'styled-components';

import BaseSection from './Section'

const Section = styled(BaseSection)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p``;

const LearnMoreSection = () => {
  return (
    <Section>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique eros eu nunc laoreet, sit amet
        consequat ante efficitur. Proin vestibulum metus sed neque euismod consequat. Maecenas eget dolor posuere,
        tristique elit ac, viverra turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Duis at ante finibus, convallis libero non, dignissim ipsum. Ut pretium accumsan mattis.
        Vestibulum vitae elit erat. In hac habitasse platea dictumst. In semper pretium nunc vitae ornare. Morbi
        feugiat, enim a mollis faucibus, erat justo imperdiet dui, quis volutpat leo est id urna. Cras at mi ut tellus
        fermentum malesuada non nec ex. Sed aliquet ex sit amet orci molestie faucibus. Vivamus vel lobortis enim.
        Integer eget ligula ligula.
      </Paragraph>
    </Section>
  );
};

export default LearnMoreSection;

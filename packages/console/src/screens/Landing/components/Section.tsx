import styled from 'styled-components';
import { getLightenDarkenColor } from '@sancathon/ui';

const Section = styled.section`
  height: calc(80vh);
  width: 100%;
  background-color: ${props => getLightenDarkenColor(props.theme.palette.secondary, 30)};
`;

export default Section;

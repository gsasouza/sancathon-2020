import styled from 'styled-components';

import RoundedButton, { Props as RoundedButtonProps } from './RoundedButton';
import { getLightenDarkenColor } from '../utils';

const TextButton = styled(RoundedButton)<RoundedButtonProps>`
  background-color: transparent;
  color: ${props => props.theme.palette[props.color || 'primary']};
  padding: 6px 8px;
  min-width: auto;
  &:hover {
    background-color: transparent;
    color: ${props => getLightenDarkenColor(props.theme.palette[props.color || 'primary'], 30)};
  }
`;

export default TextButton;

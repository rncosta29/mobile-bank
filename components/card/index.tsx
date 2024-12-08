import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { CardContainer, CardTitle } from './styles';

type CardProps = {
  titulo: string;
  onPress: () => void;
};

const Card: React.FC<CardProps & TouchableOpacityProps> = ({ titulo, onPress }) => (
  <CardContainer onPress={onPress}>
    <CardTitle>{titulo}</CardTitle>
  </CardContainer>
);

export default Card;

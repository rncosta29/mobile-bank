import React from 'react';
import { View } from 'react-native';
import { ListItemContainer, ListItemText, DeleteButton } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { DataItem } from '../../types';

type ListItemProps = DataItem & {
  onDelete: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ name, date, price, onDelete }) => (
  <ListItemContainer>
    <View>
      <ListItemText>Estabelecimento: {name}</ListItemText>
      <ListItemText>Data: {date}</ListItemText>
      <ListItemText>Preço: R$ {price.toFixed(2)}</ListItemText>
    </View>
    <DeleteButton onPress={onDelete}>
      <FontAwesome name="trash" size={20} color="#FF0000" />
    </DeleteButton>
  </ListItemContainer>
);

export default ListItem;

import styled from 'styled-components/native';

export const ListItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ListItemText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 5px;
`;

//export const TrashIcon = styled(FontAwesome)``;

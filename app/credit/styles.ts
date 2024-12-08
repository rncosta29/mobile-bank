import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const CardsContainer = styled.View`
  height: ${Dimensions.get('window').height * 0.15}px;
  margin-bottom: 10px;
`;

export const BalanceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-horizontal: 8px;
  margin-bottom: 8px;
`;

export const BalanceLabel = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const BalanceAmount = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

export const FilterContainer = styled.View`
  padding: 1px;
`;

export const FilterLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const FilterScroll = styled.ScrollView`
  flex-direction: column;
`;

export const YearContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;  /* Permite que os anos ocupem várias linhas se necessário */
`;

export const MonthContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const FilterButtonText = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;  /* Centraliza o texto */
`;

export const AddButtonContainer = styled.View`
  align-items: center;
  margin-vertical: 10px;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 90%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  position: relative; /* O botão será posicionado relativo ao ModalContent */
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px; /* Define uma distância segura do topo do modal */
  right: 15px; /* Define uma distância segura da borda direita */
  background-color: #007bff;
  padding: 10px;
  border-radius: 50px;
`;

export const CloseButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

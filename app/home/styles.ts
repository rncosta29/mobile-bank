import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Heading = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const SalaryInputsContainer = styled.View`
  margin-bottom: 20px;
`;

export const InputGroup = styled.View`
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
`;

export const TotalLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
`;

export const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const CardText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const FinalResult = styled.View`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

export const MonthsButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MonthButton = styled.Button`
  flex: 1;
`;

export const AddButtonContainer = styled.View`
  align-items: center;
  margin-vertical: 10px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const CheckboxText = styled.Text`
  font-size: 16px;
  margin-right: 10px;
  color: #333333; /* Cinza escuro */
`;

export const TouchBox = styled.TouchableOpacity`
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-color: #333333; /* Cinza escuro */
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const Teste = styled.View`
  width: 12px;
  height: 12px;
  background-color: #004aad; /* Azul vibrante */
`;

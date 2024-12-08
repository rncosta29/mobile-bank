import styled from 'styled-components/native';

export const InputContainer = styled.View`
  padding: 15px;
  background-color: #ffffff; /* Branco puro para destaque */
  border-radius: 10px;
  margin-top: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 5;
`;

export const Input = styled.TextInput`
  background-color: #e0e0e0; /* Cinza mais escuro para contraste */
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #b0b0b0; /* Cinza médio para destaque */
  color: #333333; /* Texto escuro */
  placeholder-text-color: #6c757d; /* Placeholder mais visível */
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

export const AddButton = styled.TouchableOpacity`
  background-color: #004aad; /* Azul mais vibrante */
  border-radius: 8px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const AddButtonText = styled.Text`
  color: #ffffff; /* Branco puro */
  font-weight: bold;
  font-size: 16px;
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

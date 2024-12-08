import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SendNewBills } from '../../types/index';
import {
  InputContainer,
  Input,
  AddButton,
  AddButtonText,
  CheckboxContainer,
  CheckboxText,
  TouchBox,
  Teste,
} from './styles';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { postData } from '../../services/api';

type InputFormProps = {
  onSubmit: (data: {
    name: string;
    date: string;
    price: string;
    creditCardId: number;
    isParcel: boolean;
    paymentMonth: number;
    paymentYear: number;
    quantity?: number;
  }) => void;
  selectedCardId: number;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;  // Defina o tipo da função setAdd
};


const InputForm: React.FC<InputFormProps> = ({ onSubmit, selectedCardId, setAdd }) => {
  const [formData, setFormData] = useState<SendNewBills>({
    name: '',
    date: '',
    price: '',
    creditCardId: selectedCardId,
    isParcel: false,
    paymentMonth: 0,
    paymentYear: 0,
    quantity: 1,
  });

  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    undefined,
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined,
  );

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const anos = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() + i,
  );

  const handleDateChange = (text: string) => {
    let formattedDate = text
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .slice(0, 8); // Limita a 8 caracteres (DDMMYYYY)

    // Adiciona "/" após o dia e o mês
    if (formattedDate.length >= 3) {
      formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
    }
    if (formattedDate.length >= 6) {
      formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(5)}`;
    }

    setFormData({ ...formData, date: formattedDate });
  };

  // Converte a data para o formato ISO (YYYY-MM-DD)
  const convertDateToISO = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const validateForm = (): string | true => {
    if (!formData.name) return 'O nome do estabelecimento é obrigatório';
    if (!formData.date || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.date))
      return 'A data deve estar no formato DD/MM/YYYY';
    if (!formData.price || isNaN(parseFloat(formData.price)))
      return 'O preço deve ser um número válido';
    if (!selectedMonth) return 'O mês de pagamento é obrigatório';
    if (!selectedYear) return 'O ano de pagamento é obrigatório';
    if (formData.isParcel && (!formData.quantity || formData.quantity < 2))
      return 'A quantidade de parcelas é obrigatória para pagamentos parcelados';
    return true;
  };

  const handleSubmit = async () => {
    const validationResult = validateForm();

    if (validationResult !== true) {
      console.log('Erro de validação:', validationResult);
      return;
    }

    console.log(`Quantity: ${formData.quantity}`);

    const formattedDate = convertDateToISO(formData.date);
    const paymentMonth = parseInt(selectedMonth || '0', 10);
    const paymentYear = parseInt(selectedYear || '0', 10);

    const dataToSend: SendNewBills = {
      ...formData,
      date: formattedDate,
      paymentMonth,
      paymentYear,
      quantity: formData.isParcel ? formData.quantity : 1, // Garante que quantity seja 1 quando não for parcelado
    };

    try {
      await postData(dataToSend, dataToSend.quantity);
      console.log('Dados enviados com sucesso:', dataToSend);
      setAdd(false);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <InputContainer>
        <Input
          placeholder="Estabelecimento"
          value={formData.name}
          onChangeText={(text: string) =>
            setFormData({ ...formData, name: text })
          }
          placeholderTextColor="#6c757d"
        />

        <Input
          placeholder="Data (DD/MM/YYYY)"
          value={formData.date}
          keyboardType="numeric"
          onChangeText={handleDateChange}
          placeholderTextColor="#6c757d"
        />

        <Input
          placeholder="Preço"
          value={formData.price}
          keyboardType="numeric"
          onChangeText={(text: string) =>
            setFormData({ ...formData, price: text })
          }
          placeholderTextColor="#6c757d"
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#e0e0e0',
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
          }}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {selectedMonth
              ? meses[parseInt(selectedMonth) - 1]
              : 'Selecione o mês'}
          </Text>
        </TouchableOpacity>
        {showMonthPicker && (
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue: string | undefined) => {
              setSelectedMonth(itemValue);
              setShowMonthPicker(false);
            }}
            style={{
              backgroundColor: '#e0e0e0',
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Picker.Item label="Selecione o mês" value={undefined} />
            {meses.map((mes, index) => (
              <Picker.Item
                key={mes}
                label={mes}
                value={String(index + 1)}
                color="#000"
              />
            ))}
          </Picker>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: '#e0e0e0',
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
          }}
          onPress={() => setShowYearPicker(true)}
        >
          <Text style={{ color: '#333', fontWeight: 'bold' }}>
            {selectedYear ?? 'Selecione o ano'}
          </Text>
        </TouchableOpacity>
        {showYearPicker && (
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue: string | undefined) => {
              setSelectedYear(itemValue);
              setShowYearPicker(false);
            }}
            style={{
              backgroundColor: '#e0e0e0',
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Picker.Item label="Selecione o ano" value={undefined} />
            {anos.map((ano) => (
              <Picker.Item
                key={ano}
                label={String(ano)}
                value={String(ano)}
                color="#000"
              />
            ))}
          </Picker>
        )}

        <CheckboxContainer>
          <CheckboxText>Parcelado</CheckboxText>
          <TouchBox
            onPress={() =>
              setFormData((prev) => ({
                ...prev,
                isParcel: !prev.isParcel,
                quantity: !prev.isParcel ? 2 : 1,
              }))
            }
          >
            {formData.isParcel && <Teste />}
          </TouchBox>
        </CheckboxContainer>

        {formData.isParcel && (
          <Input
            placeholder="Quantidade de Parcelas"
            keyboardType="numeric"
            value={formData.quantity?.toString() || ''} // Deixe o valor como string ou vazio
            onChangeText={(text) => {
              const parsedQuantity = parseInt(text);
              if (!isNaN(parsedQuantity) && parsedQuantity >= 2) {
                setFormData({
                  ...formData,
                  quantity: parsedQuantity,
                });
              } else if (text === '') {
                // Permitir que o campo fique vazio, mas se estiver vazio, definir a quantidade como 1
                setFormData({
                  ...formData,
                  quantity: 0, // Permitir vazio
                });
              }
            }}
          />
        )}
        <AddButton onPress={handleSubmit}>
          <AddButtonText>Salvar</AddButtonText>
        </AddButton>
      </InputContainer>
    </TouchableWithoutFeedback>
  );
};

export default InputForm;

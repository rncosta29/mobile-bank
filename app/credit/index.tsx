import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Card from '../../components/card';
import InputForm from '../../components/inputForm';
import ListItem from '../../components/listItens';
import {
  getAllCreditCards,
  getAllBillsByCreditCard,
  deleteBills,
} from '../../services/api';
import { DataItem, Card as CardType } from '../../types';
import {
  CardsContainer,
  BalanceContainer,
  BalanceLabel,
  BalanceAmount,
  FilterContainer,
  FilterScroll,
  YearContainer,
  MonthContainer,
  FilterButtonText,
  AddButtonContainer,
  AddButtonText,
  CloseButton,
  CloseButtonText,
  ModalContainer,
  ModalContent,
} from './styles';

const CardCredit: React.FC = () => {
  const [add, setAdd] = useState(false);
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardBills, setCardBills] = useState<DataItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableMonths, setAvailableMonths] = useState<number[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number>(1);

  // Carregar cartões de crédito apenas uma vez ao montar o componente
  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await getAllCreditCards();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar cartões:', error);
      }
    };

    loadCards();
  }, []); // Este useEffect será chamado apenas uma vez, quando o componente for montado

  // Carregar faturas de acordo com o ano, mês e cartão selecionado
  useEffect(() => {
    if (!selectedCardId) return; // Verifique se o cartão foi selecionado

    const loadBills = async () => {
      try {
        const bills = await getAllBillsByCreditCard(selectedCardId);
        setCardBills(bills); // Defina as faturas para o cartão selecionado

        const years = [
          ...new Set(bills.map((item: { paymentYear: any }) => item.paymentYear)),
        ];
        const months = [
          ...new Set(bills.map((item: { paymentMonth: any }) => item.paymentMonth)),
        ];

        setAvailableYears(years as number[]);
        setAvailableMonths(months as number[]);

        // Filtre as faturas para o ano e mês selecionados
        const filteredBills = bills.filter(
          (item: { paymentYear: number; paymentMonth: number }) =>
            item.paymentYear === selectedYear && item.paymentMonth === selectedMonth
        );

        setCardBills(filteredBills);

        const totalAmount = filteredBills.reduce(
          (sum: number, item: { price: any }) => sum + parseFloat(item.price || '0'),
          0
        );

        setTotal(totalAmount);
      } catch (error) {
        console.error('Erro ao carregar faturas:', error);
      }
    };

    loadBills(); // Carregar as faturas sempre que o cartão selecionado mudar
  }, [selectedYear, selectedMonth, selectedCardId]); // Dependências ajustadas para as mudanças de seleção

  // Função para carregar as faturas ao selecionar um cartão de crédito
  const loadBillsByCard = async (creditCardId: number) => {
    setSelectedCardId(creditCardId); // Atualizar o id do cartão selecionado
  };

  const handleDelete = async (index: number) => {
    try {
      // Chama a API para deletar a fatura
      await deleteBills(cardBills[index].id);
  
      // Após deletar, recarregar as faturas com os mesmos parâmetros de ano, mês e cartão selecionados
      const bills = await getAllBillsByCreditCard(selectedCardId);
  
      // Filtra as faturas com base no ano e mês selecionados
      const filteredBills = bills.filter(
        (item: { paymentYear: number; paymentMonth: number }) =>
          item.paymentYear === selectedYear && item.paymentMonth === selectedMonth
      );
  
      // Atualiza o estado das faturas e do total
      setCardBills(filteredBills);
  
      const totalAmount = filteredBills.reduce(
        (sum: number, item: { price: any }) => sum + parseFloat(item.price || '0'),
        0
      );
  
      setTotal(totalAmount);
    } catch (error) {
      console.error('Erro ao excluir a fatura:', error);
    }
  };

  const onSubmit = async (formData: any) => {
    console.log(`formData é ${formData}`)
    // try {
    //   // Exemplo de envio de dados para o servidor
    //   const response = await fetch('https://seu-backend.com/api/endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
  
    //   const responseData = await response.json();
  
    //   if (response.ok) {
    //     console.log("Dados enviados com sucesso:", responseData);
    //     // Limpar o formulário após o envio bem-sucedido
    //     setAdd(false);
    //   } else {
    //     console.log("Erro ao enviar dados:", responseData);
    //   }
    // } catch (error) {
    //   console.error("Erro na requisição:", error);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Cartões de Crédito */}
      <CardsContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cards.map((card) => (
            <Card
              key={card.id}
              titulo={card.name}
              onPress={() => loadBillsByCard(card.id)}
            />
          ))}
        </ScrollView>
      </CardsContainer>

      {/* Saldo Total */}
      <BalanceContainer>
        <BalanceLabel>Saldo total: </BalanceLabel>
        <BalanceAmount>R$ {total.toFixed(2)}</BalanceAmount>
      </BalanceContainer>

      {/* Filtro de Ano e Mês */}
      <FilterContainer>
        <FilterScroll showsHorizontalScrollIndicator={false}>
          {/* Anos */}
          <YearContainer>
            {availableYears.map((year) => (
              <TouchableOpacity
                key={year}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 5,
                  borderColor: selectedYear === year ? 'blue' : '#ccc',
                  backgroundColor:
                    selectedYear === year ? 'blue' : 'transparent',
                }}
                onPress={() => setSelectedYear(year)}
              >
                <FilterButtonText
                  style={{ color: selectedYear === year ? '#fff' : 'blue' }}
                >
                  {year}
                </FilterButtonText>
              </TouchableOpacity>
            ))}
          </YearContainer>

          {/* Meses */}
          <MonthContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...Array(12)].map((_, index) => {
                const month = index + 1;
                return (
                  <TouchableOpacity
                    key={month}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderRadius: 20,
                      margin: 5,
                      borderColor: selectedMonth === month ? 'blue' : '#ccc',
                      backgroundColor:
                        selectedMonth === month ? 'blue' : 'transparent',
                    }}
                    onPress={() => setSelectedMonth(month)}
                  >
                    <FilterButtonText
                      style={{
                        color: selectedMonth === month ? '#fff' : 'blue',
                      }}
                    >
                      {month < 10 ? `0${month}` : month}
                    </FilterButtonText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </MonthContainer>
        </FilterScroll>
      </FilterContainer>

      {/* Lista de Faturas */}
      <FlatList
        data={cardBills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem {...item} onDelete={() => handleDelete(index)} />
        )}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      />

      {/* Botão Adicionar */}
      <AddButtonContainer>
        <TouchableOpacity onPress={() => setAdd(true)}>
          <AddButtonText
            style={{
              backgroundColor: 'blue',
              color: '#fff',
              padding: 10,
              borderRadius: 15,
            }}
          >
            Adicionar
          </AddButtonText>
        </TouchableOpacity>
      </AddButtonContainer>

      {/* Modal para Adicionar Item */}
      <Modal visible={add} animationType="slide" transparent={true}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <ModalContainer>
            {/* Botão de Fechar */}
            <CloseButton onPress={() => setAdd(false)}>
              <CloseButtonText>X</CloseButtonText>
            </CloseButton>
            {/* Conteúdo do Modal */}
            <ModalContent>
              <InputForm onSubmit={onSubmit} selectedCardId={selectedCardId} setAdd={setAdd} />
            </ModalContent>
          </ModalContainer>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CardCredit;

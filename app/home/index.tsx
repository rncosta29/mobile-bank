import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import {
  CardRow,
  CardText,
  Container,
  FinalResult,
  Heading,
  InputGroup,
  Label,
  MonthButton,
  MonthsButtonsContainer,
  SalaryInputsContainer,
  TotalLabel,
  CheckboxContainer,
  CheckboxText,
  TouchBox,
  Teste,
} from './styles';
import { Card as CardType } from '../../types';
import { getAllCreditCards } from '../../services/api';

const salariesInitialState = {
  SALARIO15: '5488.00',
  SALARIO30: '4722.32',
  SALDOATUAL: '0.00',
};

const Home: React.FC = () => {
  const [salaries] = useState(salariesInitialState);
  const [cards, setCards] = useState<CardType[]>([]);
  const [totalsByMonth, setTotalsByMonth] = useState<Record<number, number>>({});
  const [somarSaldo15, setSomarSaldo15] = useState<boolean>(false);
  const [somarSaldo30, setSomarSaldo30] = useState<boolean>(false);
  const [totalSalaries, setTotalSalaries] = useState<number>(0);
  const [finalDifference, setFinalDifference] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Calcula o total dos salários
  useEffect(() => {
    let total = parseFloat(salaries.SALDOATUAL);
    if (somarSaldo15) total += parseFloat(salaries.SALARIO15);
    if (somarSaldo30) total += parseFloat(salaries.SALARIO30);
    setTotalSalaries(total);
  }, [somarSaldo15, somarSaldo30]);

  // Calcula a diferença final entre salários e gastos
  useEffect(() => {
    setFinalDifference(totalSalaries - total);
  }, [totalSalaries, total]);

  // Carrega os cartões de crédito e inicializa o estado
  const initializeData = async () => {
    setIsLoading(true);
    try {
      const rawData = await getAllCreditCards();
      const validCards = rawData.filter((card: { id: any }) => card && typeof card.id === 'number');
      setCards(validCards);
    } catch (error) {
      console.error('Erro ao carregar cartões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os totais de faturas por cartão com base no mês/ano selecionados
  useEffect(() => {
    const loadBillsByCard = async (year: number, month: number) => {
      if (!year || !month || cards.length === 0) return;

      try {
        const totalsMap = cards.reduce((acc, card) => {
          const cardTotal = (card.creditsCardDto || [])
            .filter((item) => item.paymentMonth === month && item.paymentYear === year)
            .reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);
          acc[card.id] = cardTotal;
          return acc;
        }, {} as Record<number, number>);

        const grandTotal = Object.values(totalsMap).reduce((sum, value) => sum + value, 0);

        setTotalsByMonth(totalsMap);
        setTotal(grandTotal);
      } catch (error) {
        console.error('Erro ao carregar faturas:', error);
      }
    };

    if (selectedYear && selectedMonth) {
      loadBillsByCard(selectedYear, selectedMonth);
    }
  }, [cards, selectedYear, selectedMonth]);

  // Atualiza o mês e ano selecionados
  const handleMonthChange = (month: number) => {
    const currentYear = new Date().getFullYear();
    const yearToUse = month <= new Date().getMonth() ? currentYear + 1 : currentYear;

    setSelectedMonth(month);
    setSelectedYear(yearToUse);
  };

  // Obtém os próximos 5 meses
  const getNextMonths = () => {
    const months = [
      { name: 'Jan', index: 1 },
      { name: 'Feb', index: 2 },
      { name: 'Mar', index: 3 },
      { name: 'Apr', index: 4 },
      { name: 'May', index: 5 },
      { name: 'Jun', index: 6 },
      { name: 'Jul', index: 7 },
      { name: 'Aug', index: 8 },
      { name: 'Sep', index: 9 },
      { name: 'Oct', index: 10 },
      { name: 'Nov', index: 11 },
      { name: 'Dec', index: 12 },
    ];

    const currentMonth = new Date().getMonth();
    return [
      months[currentMonth],
      months[(currentMonth + 1) % 12],
      months[(currentMonth + 2) % 12],
      months[(currentMonth + 3) % 12],
      months[(currentMonth + 4) % 12],
    ];
  };

  const renderItem = ({ item }: { item: CardType }) => (
    <CardRow>
      <CardText>Card {item.name}:</CardText>
      <CardText>R$ {(totalsByMonth[item.id] || 0).toFixed(2)}</CardText>
    </CardRow>
  );

  // Recarrega os dados ao retornar para a tela
  useFocusEffect(
    React.useCallback(() => {
      initializeData();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CardText>Carregando...</CardText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Heading>Campos de Salário</Heading>
        <SalaryInputsContainer>
          <InputGroup>
            <CheckboxContainer>
              <CheckboxText>Salário dia 15: R$ {salaries.SALARIO15}</CheckboxText>
              <TouchBox onPress={() => setSomarSaldo15(!somarSaldo15)}>
                {somarSaldo15 && <Teste />}
              </TouchBox>
            </CheckboxContainer>
            <CheckboxContainer>
              <CheckboxText>Salário dia 30: R$ {salaries.SALARIO30}</CheckboxText>
              <TouchBox onPress={() => setSomarSaldo30(!somarSaldo30)}>
                {somarSaldo30 && <Teste />}
              </TouchBox>
            </CheckboxContainer>
            <Label>Saldo Atual: R$ {salaries.SALDOATUAL}</Label>
          </InputGroup>

          <MonthsButtonsContainer>
            {getNextMonths().map(({ name, index }) => (
              <MonthButton key={index} title={name} onPress={() => handleMonthChange(index)} />
            ))}
          </MonthsButtonsContainer>
        </SalaryInputsContainer>
        <TotalLabel>
          Total dos Salários: R$ {totalSalaries.toFixed(2)}
        </TotalLabel>

        <Heading>Títulos de Cartões</Heading>
        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <FinalResult>
          <CardText>Total por cartão: R$ {total.toFixed(2)}</CardText>
          <CardText
            style={{
              color: finalDifference > 0 ? 'green' : finalDifference < 0 ? 'red' : 'blue',
            }}
          >
            Diferença Final: R$ {finalDifference.toFixed(2)}
          </CardText>
        </FinalResult>
      </Container>
    </SafeAreaView>
  );
};

export default Home;

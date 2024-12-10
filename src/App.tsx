// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchData, RESPONSE_DATA } from './index'; // Импортируем fetchData

const App: React.FC = () => {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);  // Состояние для данных
  const [loading, setLoading] = useState<boolean>(true);  // Состояние для индикатора загрузки

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Fetching data...'); // Логируем запрос
        const result = await fetchData();  // Получаем данные
        console.log('Data received:', result); // Логируем результат
        setData(result);  // Сохраняем данные в состояние
      } catch (error) {
        console.error('Error loading data:', error);  // Обработка ошибки
      } finally {
        setLoading(false);  // Завершаем процесс загрузки
      }
    };

    loadData();  // Вызываем функцию загрузки данных
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{data?.greeting || 'No data available'}</p>  // Отображаем данные или сообщение о их отсутствии
      )}
    </div>
  );
};

export default App;


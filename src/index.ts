// src/index.ts

// Тип для данных, которые мы получаем с API
type RESPONSE_DATA = {
  greeting: string;
};

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
  const: path = 
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api/${endpoint}`
      : `https://raw.githubusercontent.com/robzarel/gh-pages-demo/gh-pages/static/db/${endpoint}.json`;
  const response = await fetch(path);

  return await response.json();
}; 

// Функция для получения данных с API
export const fetchData = async (): Promise<RESPONSE_DATA> => {
  try {
    const response = await fetch('/api/data');  // Запрос к серверу через прокси
    const result: RESPONSE_DATA = await response.json();  // Преобразуем результат в тип RESPONSE_DATA
    return result;  // Возвращаем данные
  } catch (error) {
    console.error('Error fetching data:', error);  // Обработка ошибок
    throw error;  // Прокидываем ошибку дальше
  }
};

// Тип для эндпоинтов
type ENDPOINTS = 'data';  // Или создайте другие эндпоинты, если нужно

// Объект API с методом для получения данных
type API = {
  get: {
    data: () => Promise<RESPONSE_DATA>;
  };
};

// Реализация объекта API
const api: API = {
  get: {
    data: async () => {
      const result = await fetchData();  // Используем fetchData для получения данных
      return result;
    },
  },
};

// Экспортируем типы и API
export type { RESPONSE_DATA, ENDPOINTS };
export default api;

// Пример вызова fetchData
fetchData().then(data => console.log(data));  // Логируем полученные данные


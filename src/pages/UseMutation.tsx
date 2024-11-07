
// import React, { useState } from 'react';
// import axios from 'axios'; 
// import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';


// interface Country {
//   id: number;
//   name: string;
//   capital: string;
// }

// const addCountry = async (newCountry: Country): Promise<Country> => {
//   const response = await axios.post('/countries', newCountry);
//   return response.data; 
// };

// const queryClient = new QueryClient();

// function App() {
//   const [newCountryName, setNewCountryName] = useState('');
//   const [newCountryCapital, setNewCountryCapital] = useState('');

//   const { isLoading, error, data: countries, refetch } = useQuery({
//     queryKey: ['countries'],
//     queryFn: async () => {
//       const response = await axios.get('/countries');
//       return response.data;
//     }
// });

//   const addCountryMutation = useMutation(addCountry, {
//     onSuccess: () => {
//       // Перезагружаем данные в кэше после успешного добавления
//       refetch(); // Обновляем данные с помощью refetch
//       console.log('Страна успешно добавлена');
//     },
//     onError: (error) => {
//       console.error('Ошибка при добавлении страны:', error);
//     },
//   });

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Вызываем mutate для выполнения мутации
//     await addCountryMutation.mutate({
//       id: 0, // Добавьте генерацию уникального id
//       name: newCountryName,
//       capital: newCountryCapital,
//       // ... другие поля
//     });

//     // Очищаем поле ввода
//     setNewCountryName('');
//     setNewCountryCapital('');
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div>
//         <h1>Добавление страны</h1>

//         {isLoading && <div>Загрузка...</div>}
//         {error && <div>Ошибка: {error.message}</div>}

//         {countries && (
//           <ul>
//             {countries.map((country) => (
//               <li key={country.id}>{country.name} ({country.capital})</li>
//             ))}
//           </ul>
//         )}

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="newCountryName">Название страны:</label>
//           <input
//             type="text"
//             id="newCountryName"
//             value={newCountryName}
//             onChange={(e) => setNewCountryName(e.target.value)}
//           />

//           <label htmlFor="newCountryCapital">Столица:</label>
//           <input
//             type="text"
//             id="newCountryCapital"
//             value={newCountryCapital}
//             onChange={(e) => setNewCountryCapital(e.target.value)}
//           />

//           <button type="submit">Добавить страну</button>
//         </form>
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;



const UseMutation = () => {
  return (
    <div>
      adas
    </div>
  )
};

export default UseMutation;

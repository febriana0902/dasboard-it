// import { createContext, useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';

// const ContractContext = createContext();

// export const ContractProvider = ({ children }) => {
//     // Mengambil data dari API
//     const { isLoading, error, data } = useQuery({
//         queryKey: ['repoData'],
//         queryFn: async () => {
//           const response = await fetch('https://dummyjson.com/users');
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return await response.json();
//         },
//     });
    
//     if (isLoading) return 'Loading...';
//     if (error) return 'Terjadi Kesalahan: ' + error.message;
    
//     // Mengakses array users dari data
//     const users = data ? data.users : [];

//     return (
//         <ContractContext.Provider value={{ users }}>
//             {children}
//         </ContractContext.Provider>
//     );
// };

// export const useContractData = () => {
//     const context = useContext(ContractContext);
//     if (context === undefined) {
//         throw new Error('useContractData must be used within a ContractProvider');
//     }
//     return context;
// };





import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    // Query untuk API Contract
    const { isLoading: isLoadingUsers, error: errorUsers, data: dataUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const response = await fetch('https://dummyjson.com/users');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
        },
    });

    // Query untuk API E-Learning
    const { isLoading: isLoadingProducts, error: errorProducts, data: dataProducts } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const response = await fetch('https://dummyjson.com/products');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
        },
    });

    // Tangani loading dan error
    if (isLoadingUsers || isLoadingProducts) return 'Loading...';
    if (errorUsers) return 'Terjadi Kesalahan pada Users: ' + errorUsers.message;
    if (errorProducts) return 'Terjadi Kesalahan pada Products: ' + errorProducts.message;

    // Gabungkan atau proses data sesuai kebutuhan
    const users = dataUsers ? dataUsers.users : [];
    const products = dataProducts ? dataProducts.products : [];

    return (
        <ContractContext.Provider value={{ users, products }}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContractData = () => {
    const context = useContext(ContractContext);
    if (context === undefined) {
        throw new Error('useContractData must be used within a ContractProvider');
    }
    return context;
};















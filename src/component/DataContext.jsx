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

    // Query untuk API E-Learning, Data Center, mpti
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

    // Query untuk API Helpdesk
    const { isLoading: isLoadingTodos, error: errorTodos, data: dataTodos } = useQuery({
        queryKey: ['Todos'],
        queryFn: async () => {
          const response = await fetch('https://dummyjson.com/todos');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
        },
    });

    // Query untuk API Finance
    const { isLoading: isLoadingRecipes, error: errorRecipes, data: dataRecipes } = useQuery({
        queryKey: ['Recipes'],
        queryFn: async () => {
          const response = await fetch('https://dummyjson.com/recipes');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
        },
    });

    // Query untuk API Work Order
    const { isLoading: isLoadingPosts, error: errorPosts, data: dataPosts } = useQuery({
        queryKey: ['Posts'],
        queryFn: async () => {
          const response = await fetch('https://dummyjson.com/posts');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return await response.json();
        },
    });


    // Tangani loading dan error
    if (isLoadingUsers || isLoadingProducts || isLoadingTodos || isLoadingRecipes || isLoadingPosts) return 'Loading...';
    if (errorUsers) return 'Terjadi Kesalahan pada Users: ' + errorUsers.message;
    if (errorProducts) return 'Terjadi Kesalahan pada Products: ' + errorProducts.message;
    if (errorTodos) return 'Terjadi Kesalahan pada Todos: ' + errorTodos.message;
    if (errorRecipes) return 'Terjadi Kesalahan pada Recipes: ' + errorRecipes.message;
    if (errorPosts) return 'Terjadi Kesalahan pada Recipes: ' + errorPosts.message;

    // Gabungkan atau proses data sesuai kebutuhan
    const users = dataUsers ? dataUsers.users : [];
    const products = dataProducts ? dataProducts.products : [];
    const todos = dataTodos ? dataTodos.todos : [];
    const recipes = dataRecipes ? dataRecipes.recipes : [];
    const posts = dataPosts ? dataPosts.posts : [];

    return (
        <ContractContext.Provider value={{ users, products, todos, recipes, posts}}>
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















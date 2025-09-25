import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import './App.css';

import Todo from './features/todos/screens/TodoPage';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Todo />
      </ApolloProvider>
    </div>
  );
};

export default App;

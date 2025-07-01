import React, { useState, useEffect } from 'react';
import GlobalStyle from './styles/style';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import Grid from './components/Grid';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/form';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  max-width: 1600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-style: italic;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message || 'Erro ao buscar usuários');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>Usuários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;

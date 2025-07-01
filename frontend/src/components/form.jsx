import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputMask } from 'primereact/inputmask';

const FormContainer = styled.form`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const StyledInputMask = styled(InputMask)`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  min-width: 120px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.label``;

function Form({ onEdit, setOnEdit, getUsers }) {
  const ref = useRef();

  useEffect(() => {
    const user = ref.current;
    if (onEdit && user) {
      user.nome.value = onEdit.nome || '';
      user.email.value = onEdit.email || '';
      user.telefone.value = onEdit.telefone || '';
      user.aniversario.value = onEdit.aniversario || '';
    } else if (user) {
      user.nome.value = '';
      user.email.value = '';
      user.telefone.value = '';
      user.aniversario.value = '';
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.aniversario.value
    ) {
      return toast.warn('Preencha todos os campos');
    }

    const payload = {
      nome: user.nome.value,
      email: user.email.value,
      telefone: user.telefone.value,
      aniversario: user.aniversario.value,
    };

    try {
      if (onEdit) {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/users/${onEdit.id}`, payload);
        toast.success(data);
      } else {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, payload);
        toast.success(data);
      }

      getUsers();
      setOnEdit(null);

      user.nome.value = '';
      user.email.value = '';
      user.telefone.value = '';
      user.aniversario.value = '';
    } catch (err) {
      toast.error(err.response?.data || 'Erro ao salvar');
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" name="nome" type="text" />
      </InputArea>
      <InputArea>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label htmlFor="telefone">Telefone</Label>
        <StyledInputMask
          id="telefone"
          name="telefone"
          type="text"
          mask="(99) 99999-9999"
          placeholder="(99) 99999-9999"
        />
      </InputArea>
      <InputArea>
        <Label htmlFor="aniversario">Data de nascimento</Label>
        <Input id="aniversario" name="aniversario" type="date" />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
}

export default Form;

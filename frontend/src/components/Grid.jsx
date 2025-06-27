import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';

// Estilização da tabela
const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-word;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

export const Thead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Tbody = styled.tbody`
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding: 3px 0 5px 10px;

  @media (max-width: 768px) {
    ${(props) => props.$onlyweb && 'display: none;'}
  }
`;

export const Td = styled.td`
  padding: 15px 0 15px 10px;
  text-align: ${(props) => (props.alignCenter ? 'center' : 'start')};
  width: ${(props) => (props.width ? props.width : 'auto')};

  @media (max-width: 768px) {
    display: block;
    text-align: start;
    width: 100%;
    padding: 5px 0;
    position: relative;

    &::before {
      content: attr(data-label);
      font-weight: bold;
      display: inline-block;
      width: 100px;
      color: #555;
    }

    ${(props) => props.$onlyweb && 'display: none;'}
  }
`;

// Componente Grid
const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete('http://localhost:8081/' + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th $onlyweb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, index) => (
          <Tr key={index}>
            <Td width="30%" data-label="Nome">{item.nome}</Td>
            <Td width="30%" data-label="Email">{item.email}</Td>
            <Td width="30%" data-label="Fone" $onlyweb>{item.telefone}</Td>
            <Td alignCenter width="5%" data-label="Editar">
              <FaEdit onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} />
            </Td>
            <Td alignCenter width="5%" data-label="Excluir">
              <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
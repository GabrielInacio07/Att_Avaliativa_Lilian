
import React, { useState } from 'react';

function App() {
  // Estado inicial dos pedidos
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: 'João Silva',
      servico: 'Lavagem',
      status: 'pendente'
    },
    {
      id: 2,
      cliente: 'Maria Souza',
      servico: 'Secagem',
      status: 'em andamento'
    }
  ]);

  const [novoPedido, setNovoPedido] = useState({
    cliente: '',
    servico: '',
    status: 'pendente'
  });

  const [pedidoEditando, setPedidoEditando] = useState(null);

  // Função para adicionar um novo pedido
  const adicionarPedido = () => {
    const novoId = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;
    const pedidoComId = { ...novoPedido, id: novoId };
    setPedidos([...pedidos, pedidoComId]);
    setNovoPedido({ cliente: '', servico: '', status: 'pendente' }); // Limpar formulário
  };

  // Função para editar um pedido existente
  const editarPedido = (id) => {
    const pedidoParaEditar = pedidos.find((pedido) => pedido.id === id);
    setPedidoEditando(pedidoParaEditar);
  };

  // Função para salvar as edições do pedido
  const salvarEdicao = () => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === pedidoEditando.id ? pedidoEditando : pedido
      )
    );
    setPedidoEditando(null);
  };

  // Função para excluir um pedido
  const excluirPedido = (id) => {
    const pedidosFiltrados = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(pedidosFiltrados);
  };

  return (
    <div className="App">
      <h1>App de Lavanderia</h1>

      {/* Formulário para adicionar novo pedido */}
      <h2>Adicionar Pedido</h2>
      <div>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={novoPedido.cliente}
          onChange={(e) =>
            setNovoPedido({ ...novoPedido, cliente: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Serviço"
          value={novoPedido.servico}
          onChange={(e) =>
            setNovoPedido({ ...novoPedido, servico: e.target.value })
          }
        />
        <button onClick={adicionarPedido}>Adicionar Pedido</button>
      </div>

      {/* Listagem de pedidos */}
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <strong>Cliente:</strong> {pedido.cliente} -{' '}
            <strong>Serviço:</strong> {pedido.servico} -{' '}
            <strong>Status:</strong> {pedido.status}
            <button onClick={() => editarPedido(pedido.id)}>Editar</button>
            <button onClick={() => excluirPedido(pedido.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {/* Formulário de edição */}
      {pedidoEditando && (
        <div>
          <h2>Editar Pedido</h2>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={pedidoEditando.cliente}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, cliente: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Serviço"
            value={pedidoEditando.servico}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, servico: e.target.value })
            }
          />
          <select
            value={pedidoEditando.status}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, status: e.target.value })
            }
          >
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluído">Concluído</option>
          </select>
          <button onClick={salvarEdicao}>Salvar</button>
        </div>
      )}
    </div>
  );
}

export default App;

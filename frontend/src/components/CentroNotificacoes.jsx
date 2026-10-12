import { useCallback, useEffect, useState } from 'react';
import socket from '../services/socket';

function CentroNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarNotificacoes = useCallback(async () => {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(
        '/notificacoes?limit=20'
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível carregar as notificações.'
        );
      }

      const resultado = await resposta.json();

      setNotificacoes(resultado.dados || []);
    } catch (erroCarregamento) {
      setErro(erroCarregamento.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  async function marcarComoLida(id) {
    try {
      setErro('');

      const resposta = await fetch(
        `/notificacoes/${id}/marcar-como-lida`,
        {
          method: 'PATCH'
        }
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível marcar a notificação como lida.'
        );
      }

      const notificacaoAtualizada =
        await resposta.json();

      setNotificacoes((anteriores) =>
        anteriores.map((notificacao) =>
          notificacao.id === id
            ? notificacaoAtualizada
            : notificacao
        )
      );
    } catch (erroAtualizacao) {
      setErro(erroAtualizacao.message);
    }
  }

  useEffect(() => {
    const temporizador = setTimeout(() => {
      carregarNotificacoes();
    }, 0);

    function aoReceberNotificacao(notificacao) {
      setNotificacoes((anteriores) => {
        const jaExiste = anteriores.some(
          (item) => item.id === notificacao.id
        );

        if (jaExiste) {
          return anteriores;
        }

        return [
          notificacao,
          ...anteriores
        ];
      });
    }

    socket.on(
      'notificacao_nova',
      aoReceberNotificacao
    );

    return () => {
      clearTimeout(temporizador);

      socket.off(
        'notificacao_nova',
        aoReceberNotificacao
      );
    };
  }, [carregarNotificacoes]);

  const naoLidas = notificacoes.filter(
    (notificacao) => !notificacao.lida
  ).length;

  return (
    <section>
      <h2>Centro de Notificações</h2>

      <p>
        Não lidas: <strong>{naoLidas}</strong>
      </p>

      {carregando && (
        <p>Carregando notificações...</p>
      )}

      {erro && (
        <p>{erro}</p>
      )}

      {!carregando &&
        !erro &&
        notificacoes.length === 0 && (
          <p>Nenhuma notificação encontrada.</p>
        )}

      {notificacoes.map((notificacao) => (
        <div key={notificacao.id}>
          <p>
            <strong>
              {notificacao.lida
                ? 'Lida'
                : 'Nova'}
            </strong>
          </p>

          <p>{notificacao.mensagem}</p>

          <p>
            Tipo: {notificacao.tipo}
          </p>

          <p>
            Questão:{' '}
            {notificacao.questaoId ?? '-'}
          </p>

          {!notificacao.lida && (
            <button
              type="button"
              onClick={() =>
                marcarComoLida(
                  notificacao.id
                )
              }
            >
              Marcar como lida
            </button>
          )}

          <hr />
        </div>
      ))}
    </section>
  );
}

export default CentroNotificacoes;
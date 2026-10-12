import { useCallback, useEffect, useState } from 'react';
import socket from '../services/socket';

function ListaQuestoes() {
    const [questoes, setQuestoes] = useState([]);
    const [busca, setBusca] = useState('');
    const [buscaAplicada, setBuscaAplicada] = useState('');
    const [status, setStatus] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const carregarQuestoes = useCallback(async () => {
        try {
            setCarregando(true);
            setErro('');

            const parametros = new URLSearchParams();

            if (buscaAplicada) {
                parametros.append('busca', buscaAplicada);
            }

            if (status) {
                parametros.append('status', status);
            }

            parametros.append('limit', '50');

            const resposta = await fetch(
                `/questoes?${parametros.toString()}`
            );

            if (!resposta.ok) {
                throw new Error(
                    'Não foi possível carregar as questões.'
                );
            }

            const resultado = await resposta.json();

            setQuestoes(resultado.dados || []);
        } catch (erroCarregamento) {
            setErro(erroCarregamento.message);
        } finally {
            setCarregando(false);
        }
    }, [buscaAplicada, status]);

    useEffect(() => {
        const temporizador = setTimeout(() => {
            carregarQuestoes();
        }, 0);

        return () => {
            clearTimeout(temporizador);
        };
    }, [carregarQuestoes]);

    useEffect(() => {
        function atualizarLista() {
            carregarQuestoes();
        }

        socket.on('questao_criada', atualizarLista);
        socket.on('questao_atualizada', atualizarLista);
        socket.on('questao_excluida', atualizarLista);
        socket.on('status_questao_alterado', atualizarLista);

        return () => {
            socket.off('questao_criada', atualizarLista);
            socket.off('questao_atualizada', atualizarLista);
            socket.off('questao_excluida', atualizarLista);
            socket.off('status_questao_alterado', atualizarLista);
        };
    }, [carregarQuestoes]);

    function pesquisar(evento) {
        evento.preventDefault();

        const termo = busca.trim();

        if (termo === buscaAplicada) {
            carregarQuestoes();
            return;
        }

        setBuscaAplicada(termo);
    }

    return (
        <section>
            <h2>Questões</h2>

            <form onSubmit={pesquisar}>
                <div>
                    <label htmlFor="busca">
                        Buscar:
                    </label>

                    <input
                        id="busca"
                        type="text"
                        value={busca}
                        onChange={(evento) =>
                            setBusca(evento.target.value)
                        }
                        placeholder="Digite parte do enunciado"
                    />
                </div>

                <div>
                    <label htmlFor="status">
                        Status:
                    </label>

                    <select
                        id="status"
                        value={status}
                        onChange={(evento) =>
                            setStatus(evento.target.value)
                        }
                    >
                        <option value="">Todos</option>
                        <option value="rascunho">
                            Rascunho
                        </option>
                        <option value="em_revisao">
                            Em revisão
                        </option>
                        <option value="aprovada">
                            Aprovada
                        </option>
                    </select>
                </div>

                <button type="submit">
                    Pesquisar
                </button>
            </form>

            {carregando && (
                <p>Carregando questões...</p>
            )}

            {erro && <p>{erro}</p>}

            {!carregando &&
                !erro &&
                questoes.length === 0 && (
                    <p>Nenhuma questão encontrada.</p>
                )}

            {questoes.map((questao) => (
                <article key={questao.id}>
                    <h3>
                        Questão {questao.id}
                    </h3>

                    <p>{questao.enunciado}</p>

                    <p>
                        <strong>Disciplina:</strong>{' '}
                        {questao.Disciplina?.nome ||
                            questao.disciplinaId}
                    </p>

                    <p>
                        <strong>Dificuldade:</strong>{' '}
                        {questao.dificuldade}
                    </p>

                    <p>
                        <strong>Status:</strong>{' '}
                        {questao.status}
                    </p>

                    <hr />
                </article>
            ))}
        </section>
    );
}

export default ListaQuestoes;
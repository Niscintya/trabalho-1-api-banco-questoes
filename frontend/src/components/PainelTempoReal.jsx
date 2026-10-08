import { useEffect, useState } from 'react';
import socket from '../services/socket';

function PainelTempoReal() {
    const [eventos, setEventos] = useState([]);
    const [criadas, setCriadas] = useState(0);
    const [atualizadas, setAtualizadas] = useState(0);
    const [excluidas, setExcluidas] = useState(0);

    useEffect(() => {
        function adicionarEvento(tipo, dados) {
            const novoEvento = {
                id: `${tipo}-${Date.now()}-${Math.random()}`,
                tipo,
                dados,
                horario: new Date().toLocaleTimeString()
            };

            setEventos((anteriores) => [
                novoEvento,
                ...anteriores
            ]);
        }

        function aoCriarQuestao(questao) {
            setCriadas((valor) => valor + 1);

            adicionarEvento(
                'Questão criada',
                questao
            );
        }

        function aoAtualizarQuestao(questao) {
            setAtualizadas((valor) => valor + 1);

            adicionarEvento(
                'Questão atualizada',
                questao
            );
        }

        function aoExcluirQuestao(dados) {
            setExcluidas((valor) => valor + 1);

            adicionarEvento(
                'Questão excluída',
                dados
            );
        }

        socket.on(
            'questao_criada',
            aoCriarQuestao
        );

        socket.on(
            'questao_atualizada',
            aoAtualizarQuestao
        );

        socket.on(
            'questao_excluida',
            aoExcluirQuestao
        );

        return () => {
            socket.off(
                'questao_criada',
                aoCriarQuestao
            );

            socket.off(
                'questao_atualizada',
                aoAtualizarQuestao
            );

            socket.off(
                'questao_excluida',
                aoExcluirQuestao
            );
        };
    }, []);

    return (
        <section>
            <h2>Painel em tempo real</h2>

            <div>
                <p>
                    Questões criadas: <strong>{criadas}</strong>
                </p>

                <p>
                    Questões atualizadas: <strong>{atualizadas}</strong>
                </p>

                <p>
                    Questões excluídas: <strong>{excluidas}</strong>
                </p>
            </div>

            <h3>Últimos eventos</h3>

            {eventos.length === 0 ? (
                <p>
                    Nenhum evento recebido ainda.
                </p>
            ) : (
                <div>
                    {eventos.map((evento) => (
                        <div key={evento.id}>
                            <strong>
                                {evento.tipo}
                            </strong>

                            <span>
                                {' '}— {evento.horario}
                            </span>

                            {evento.dados.enunciado && (
                                <p>
                                    {evento.dados.enunciado}
                                </p>
                            )}

                            <p>
                                ID: {evento.dados.id}
                            </p>

                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default PainelTempoReal;
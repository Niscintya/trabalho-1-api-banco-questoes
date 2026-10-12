import { useEffect, useRef, useState } from 'react';
import socket from '../services/socket';

function EntrarSala() {
    const [nome, setNome] = useState('');
    const [disciplinaId, setDisciplinaId] = useState('');
    const [salaAtual, setSalaAtual] = useState('');

    const dadosSalaRef = useRef(null);

    useEffect(() => {
        function aoConectar() {
            if (dadosSalaRef.current) {
                socket.emit(
                    'entrar_sala',
                    dadosSalaRef.current
                );
            }
        }

        function aoDesconectar() {
            setSalaAtual('');
        }

        function aoConfirmarEntrada(dados) {
            setSalaAtual(dados.sala);
        }

        function aoConfirmarSaida() {
            setSalaAtual('');
        }

        function aoReceberErro(dados) {
            alert(dados.erro);
        }

        socket.on('connect', aoConectar);
        socket.on('disconnect', aoDesconectar);

        socket.on(
            'sala_entrada_confirmada',
            aoConfirmarEntrada
        );

        socket.on(
            'sala_saida_confirmada',
            aoConfirmarSaida
        );

        socket.on(
            'erro_socket',
            aoReceberErro
        );

        return () => {
            socket.off('connect', aoConectar);
            socket.off('disconnect', aoDesconectar);

            socket.off(
                'sala_entrada_confirmada',
                aoConfirmarEntrada
            );

            socket.off(
                'sala_saida_confirmada',
                aoConfirmarSaida
            );

            socket.off(
                'erro_socket',
                aoReceberErro
            );
        };
    }, []);

    function entrarNaSala(evento) {
        evento.preventDefault();

        const id = Number(disciplinaId);
        const nomeLimpo = nome.trim();

        if (!nomeLimpo) {
            alert('Informe seu nome.');
            return;
        }

        if (!id || id <= 0) {
            alert('Informe uma disciplina válida.');
            return;
        }

        const dadosSala = {
            nome: nomeLimpo,
            disciplinaId: id
        };

        dadosSalaRef.current = dadosSala;

        if (socket.connected) {
            socket.emit(
                'entrar_sala',
                dadosSala
            );
        } else {
            socket.connect();
        }
    }

    function sairDaSala() {
        dadosSalaRef.current = null;

        if (socket.connected) {
            socket.emit('sair_sala');
        }

        setSalaAtual('');
    }

    return (
        <section>
            <h2>Entrar em uma disciplina</h2>

            <form onSubmit={entrarNaSala}>
                <div>
                    <label htmlFor="nome">
                        Nome:
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(evento) =>
                            setNome(
                                evento.target.value
                            )
                        }
                        placeholder="Seu nome"
                    />
                </div>

                <div>
                    <label htmlFor="disciplina">
                        ID da disciplina:
                    </label>

                    <input
                        id="disciplina"
                        type="number"
                        min="1"
                        value={disciplinaId}
                        onChange={(evento) =>
                            setDisciplinaId(
                                evento.target.value
                            )
                        }
                        placeholder="Ex.: 1"
                    />
                </div>

                <button type="submit">
                    Entrar na sala
                </button>
            </form>

            {salaAtual && (
                <div>
                    <p>
                        Sala atual:{' '}
                        <strong>
                            {salaAtual}
                        </strong>
                    </p>

                    <button
                        type="button"
                        onClick={sairDaSala}
                    >
                        Sair da sala
                    </button>
                </div>
            )}
        </section>
    );
}

export default EntrarSala;
import { useState } from 'react';
import socket from '../services/socket';

function EntrarSala() {
    const [nome, setNome] = useState('');
    const [disciplinaId, setDisciplinaId] = useState('');
    const [salaAtual, setSalaAtual] = useState('');

    function entrarNaSala(evento) {
        evento.preventDefault();

        const id = Number(disciplinaId);

        if (!nome.trim()) {
            alert('Informe seu nome.');
            return;
        }

        if (!id || id <= 0) {
            alert('Informe uma disciplina válida.');
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit('entrar_sala', {
            nome: nome.trim(),
            disciplinaId: id
        });
    }

    function sairDaSala() {
        socket.emit('sair_sala');

        setSalaAtual('');
    }

    socket.off('sala_entrada_confirmada');

    socket.on(
        'sala_entrada_confirmada',
        (dados) => {
            setSalaAtual(dados.sala);
        }
    );

    socket.off('sala_saida_confirmada');

    socket.on(
        'sala_saida_confirmada',
        () => {
            setSalaAtual('');
        }
    );

    socket.off('erro_socket');

    socket.on(
        'erro_socket',
        (dados) => {
            alert(dados.erro);
        }
    );

    return (
        <div>
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
                            setNome(evento.target.value)
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
                        Sala atual: <strong>{salaAtual}</strong>
                    </p>

                    <button
                        type="button"
                        onClick={sairDaSala}
                    >
                        Sair da sala
                    </button>
                </div>
            )}
        </div>
    );
}

export default EntrarSala;
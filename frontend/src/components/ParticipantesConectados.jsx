import { useEffect, useState } from 'react';
import socket from '../services/socket';

function ParticipantesConectados() {
    const [participantes, setParticipantes] = useState([]);

    useEffect(() => {
        function atualizarParticipantes(lista) {
            setParticipantes(lista);
        }

        socket.on(
            'participantes_atualizados',
            atualizarParticipantes
        );

        return () => {
            socket.off(
                'participantes_atualizados',
                atualizarParticipantes
            );
        };
    }, []);

    return (
        <section>
            <h2>Participantes conectados</h2>

            {participantes.length === 0 ? (
                <p>Nenhum participante conectado.</p>
            ) : (
                <ul>
                    {participantes.map((participante) => (
                        <li key={participante.socketId}>
                            {participante.nome}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ParticipantesConectados;
import { useEffect, useState } from 'react';
import socket from '../services/socket';

function StatusConexao() {
    const [conectado, setConectado] = useState(socket.connected);

    useEffect(() => {
        function aoConectar() {
            setConectado(true);
        }

        function aoDesconectar() {
            setConectado(false);
        }

        socket.on('connect', aoConectar);
        socket.on('disconnect', aoDesconectar);

        return () => {
            socket.off('connect', aoConectar);
            socket.off('disconnect', aoDesconectar);
        };
    }, []);

    return (
        <div>
            <strong>Status:</strong>{' '}
            {conectado ? 'Conectado' : 'Desconectado'}
        </div>
    );
}

export default StatusConexao;
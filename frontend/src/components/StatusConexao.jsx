import { useEffect, useState } from 'react';
import socket from '../services/socket';

function StatusConexao() {
    const [conectado, setConectado] = useState(
        socket.connected
    );

    const [erro, setErro] = useState('');

    useEffect(() => {
        function aoConectar() {
            setConectado(true);
            setErro('');
        }

        function aoDesconectar() {
            setConectado(false);
        }

        function aoErroConexao(erroConexao) {
            setConectado(false);
            setErro(erroConexao.message);
        }

        socket.on('connect', aoConectar);
        socket.on('disconnect', aoDesconectar);
        socket.on('connect_error', aoErroConexao);

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off('connect', aoConectar);
            socket.off('disconnect', aoDesconectar);
            socket.off(
                'connect_error',
                aoErroConexao
            );
        };
    }, []);

    return (
        <div>
            <strong>Status:</strong>{' '}
            {conectado
                ? 'Conectado'
                : 'Desconectado'}

            {conectado && socket.id && (
                <p>
                    Socket: {socket.id}
                </p>
            )}

            {erro && (
                <p>
                    Erro de conexão: {erro}
                </p>
            )}
        </div>
    );
}

export default StatusConexao;
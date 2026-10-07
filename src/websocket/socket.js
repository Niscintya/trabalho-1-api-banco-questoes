const participantesPorSala = new Map();

function obterNomeSala(disciplinaId) {
    return `disciplina:${disciplinaId}`;
}

function obterParticipantes(nomeSala) {
    const participantes = participantesPorSala.get(nomeSala);

    if (!participantes) {
        return [];
    }

    return Array.from(participantes.values());
}

function atualizarParticipantes(io, nomeSala) {
    io.to(nomeSala).emit(
        'participantes_atualizados',
        obterParticipantes(nomeSala)
    );
}

function configurarWebSocket(io) {
    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on('entrar_sala', (dados = {}) => {
            const disciplinaId = Number(dados.disciplinaId);
            const nome = String(dados.nome || '').trim();

            if (!disciplinaId || disciplinaId <= 0) {
                socket.emit('erro_socket', {
                    erro: 'disciplinaId inválido'
                });
                return;
            }

            if (!nome) {
                socket.emit('erro_socket', {
                    erro: 'Nome do participante é obrigatório'
                });
                return;
            }

            const nomeSala = obterNomeSala(disciplinaId);

            socket.join(nomeSala);

            if (!participantesPorSala.has(nomeSala)) {
                participantesPorSala.set(
                    nomeSala,
                    new Map()
                );
            }

            participantesPorSala
                .get(nomeSala)
                .set(socket.id, {
                    socketId: socket.id,
                    nome
                });

            socket.data.nome = nome;
            socket.data.disciplinaId = disciplinaId;
            socket.data.nomeSala = nomeSala;

            socket.emit('sala_entrada_confirmada', {
                sala: nomeSala
            });

            atualizarParticipantes(io, nomeSala);

            console.log(
                `${nome} entrou na sala ${nomeSala}`
            );
        });

        socket.on('sair_sala', () => {
            const nomeSala = socket.data.nomeSala;

            if (!nomeSala) {
                socket.emit('erro_socket', {
                    erro: 'Cliente não está em nenhuma sala'
                });
                return;
            }

            const participantes =
                participantesPorSala.get(nomeSala);

            if (participantes) {
                participantes.delete(socket.id);

                if (participantes.size === 0) {
                    participantesPorSala.delete(nomeSala);
                }
            }

            socket.leave(nomeSala);

            socket.emit('sala_saida_confirmada', {
                sala: nomeSala
            });

            atualizarParticipantes(io, nomeSala);

            socket.data.nomeSala = undefined;
            socket.data.disciplinaId = undefined;

            console.log(
                `Cliente ${socket.id} saiu da sala ${nomeSala}`
            );
        });

        socket.on('disconnect', () => {
            const nomeSala = socket.data.nomeSala;

            if (nomeSala) {
                const participantes =
                    participantesPorSala.get(nomeSala);

                if (participantes) {
                    participantes.delete(socket.id);

                    if (participantes.size === 0) {
                        participantesPorSala.delete(nomeSala);
                    }
                }

                atualizarParticipantes(io, nomeSala);
            }

            console.log(
                `Cliente desconectado: ${socket.id}`
            );
        });
    });
}

module.exports = configurarWebSocket;
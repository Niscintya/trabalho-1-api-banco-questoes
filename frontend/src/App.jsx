import StatusConexao from './components/StatusConexao';
import EntrarSala from './components/EntrarSala';
import ParticipantesConectados from './components/ParticipantesConectados';
import ListaQuestoes from './components/ListaQuestoes';
import PainelTempoReal from './components/PainelTempoReal';
import CentroNotificacoes from './components/CentroNotificacoes';

function App() {
    return (
        <main>
            <h1>
                Sistema de Acompanhamento de Questões
            </h1>

            <p>
                Painel de acompanhamento em tempo real
            </p>

            <hr />

            <StatusConexao />

            <hr />

            <EntrarSala />

            <hr />

            <ParticipantesConectados />

            <hr />

            <ListaQuestoes />

            <hr />

            <PainelTempoReal />

            <hr />

            <CentroNotificacoes />
        </main>
    );
}

export default App;
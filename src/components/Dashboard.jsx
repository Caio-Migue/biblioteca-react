import React, { useState, useEffect } from 'react';

const livros = [
    { id: 1, titulo: 'Dom Casmurro', alugado: 12 },
    { id: 2, titulo: 'O Pequeno Príncipe', alugado: 18 },
    { id: 3, titulo: 'Capitães da Areia', alugado: 7 },
];

const usuarios = [
    { id: 1, nome: 'Maria', turma: '3A' },
    { id: 2, nome: 'João', turma: '3A' },
    { id: 3, nome: 'Ana', turma: '3A' },
];

const historicoLocacoes = [
    { id: 1, livro: 'Dom Casmurro', usuario: 'Maria', dataAluguel: '01/09/2025', dataDevolucao: '05/09/2025' },
    { id: 2, livro: 'O Pequeno Príncipe', usuario: 'João', dataAluguel: '03/09/2025', dataDevolucao: '07/09/2025' },
    { id: 3, livro: 'Capitães da Areia', usuario: 'Ana', dataAluguel: '02/09/2025', dataDevolucao: '06/09/2025' },
];

export default function Dashboard({ setBlurBg }) {
    const [livrosList, setLivrosList] = useState([]);
    const [usuariosList, setUsuariosList] = useState([]);
    const [editLivroId, setEditLivroId] = useState(null);
    const [editLivroData, setEditLivroData] = useState({
        publisher: '',
        title: '',
        isbn: '',
        authors: [''],
        publicationYear: '',
        summary: '',
        quantity: '',
        literaryGenre: { id: '', name: '' }
    });

    // Carregar livros do endpoint
    useEffect(() => {
        async function fetchLivros() {
            try {
                const response = await fetch('http://localhost:5287/api/Book');
                const data = await response.json();
                setLivrosList(data);
            } catch (error) {
                setLivrosList([]);
            }
        }
        fetchLivros();
    }, []);

    // Modal de edição de livro
    const [showEditModal, setShowEditModal] = useState(false);

    // Abrir formulário de edição como modal
    const handleEditLivro = id => {
        const livro = livrosList.find(l => l.id === id);
        if (livro) {
            setEditLivroId(id);
            setEditLivroData({
                publisher: livro.publisher || '',
                title: livro.title || '',
                isbn: livro.isbn || '',
                authors: livro.authors || [''],
                publicationYear: livro.publicationYear || '',
                summary: livro.summary || '',
                quantity: livro.quantity || '',
                literaryGenre: livro.literaryGenre || { id: '', name: '' }
            });
            setShowEditModal(true);
            setBlurBg(true);
        }
    };

    // Fechar modal
    const closeEditModal = () => {
        setShowEditModal(false);
        setEditLivroId(null);
        setBlurBg(false);
    };

    // Atualizar livro (PUT)
    const handleUpdateLivro = async () => {
        try {
            const response = await fetch(`http://localhost:5287/api/Book/${editLivroId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editLivroData)
            });
            if (response.ok) {
                const livroAtualizado = await response.json();
                setLivrosList(livrosList.map(l =>
                    l.id === editLivroId ? { ...l, ...livroAtualizado } : l
                ));
                setEditLivroId(null);
                setEditLivroData({
                    publisher: '',
                    title: '',
                    isbn: '',
                    authors: [''],
                    publicationYear: '',
                    summary: '',
                    quantity: '',
                    literaryGenre: { id: '', name: '' }
                });
                alert('Livro atualizado com sucesso');
            } else {
                alert('Erro ao atualizar livro');
            }
        } catch (err) {
            alert('Erro de conexão: ' + err.message);
        }
    };

    // Novo livro para POST
    const [novoLivro, setNovoLivro] = useState({
        publisher: '',
        title: '',
        isbn: '',
        authors: [''],
        publicationYear: '',
        summary: '',
        quantity: '',
        literaryGenre: { id: '', name: '' }
    });

    // POST livro



    const handleAddLivro = async () => {
        try {
            const response = await fetch('http://localhost:5287/api/Book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoLivro)
            });
            if (response.ok) {
                const livroCriado = await response.json();
                setLivrosList([...livrosList, livroCriado]);
                setNovoLivro({
                    publisher: '',
                    title: '',
                    isbn: '',
                    authors: [''],
                    publicationYear: '',
                    summary: '',
                    quantity: '',
                    literaryGenre: { id: '', name: '' }
                });
                alert('Sucesso ao adicionar livro');
            } else {
                alert('Erro ao adicionar livro');
            }
        } catch (err) {
            alert('Erro de conexão: ' + err.message);
        }
    };

    // Eventos
    const [eventos, setEventos] = useState([
        { id: 1, nome: 'Feira do Livro', data: '15/09/2025', descricao: 'Venha participar da nossa feira anual!' },
        { id: 2, nome: 'Encontro de Leitura', data: '22/09/2025', descricao: 'Leitura coletiva de clássicos.' },
    ]);
    const [novoEvento, setNovoEvento] = useState({ nome: '', data: '', descricao: '' });

    // Desafios Semanais
    const [desafios, setDesafios] = useState([
        { id: 1, descricao: 'Ler um livro de aventura' },
        { id: 2, descricao: 'Escrever uma resenha sobre seu livro favorito' },
    ]);
    const [novoDesafio, setNovoDesafio] = useState('');

    // Mock handlers livros/usuarios
    const handleDeleteLivro = id => alert(`Excluir livro ${id}`);
    const handleAddUsuario = () => alert('Adicionar usuário');
    const handleEditUsuario = id => alert(`Editar usuário ${id}`);
    const handleDeleteUsuario = id => alert(`Excluir usuário ${id}`);

    // Eventos handlers
    const handleAddEvento = () => {
        if (novoEvento.nome && novoEvento.data && novoEvento.descricao) {
            setEventos([...eventos, { id: Date.now(), ...novoEvento }]);
            setNovoEvento({ nome: '', data: '', descricao: '' });
        }
    };
    const handleDeleteEvento = id => {
        setEventos(eventos.filter(e => e.id !== id));
    };

    // Desafios handlers
    const handleAddDesafio = () => {
        if (novoDesafio) {
            setDesafios([...desafios, { id: Date.now(), descricao: novoDesafio }]);
            setNovoDesafio('');
        }
    };
    const handleDeleteDesafio = id => {
        setDesafios(desafios.filter(d => d.id !== id));
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Administrar</h1>

            {/* Modal de edição de livro */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={closeEditModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold text-blue-700 mb-4">Editar Livro</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Editora"
                                className="border rounded px-2 py-1"
                                value={editLivroData.publisher}
                                onChange={e => setEditLivroData({ ...editLivroData, publisher: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Título"
                                className="border rounded px-2 py-1"
                                value={editLivroData.title}
                                onChange={e => setEditLivroData({ ...editLivroData, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="ISBN"
                                className="border rounded px-2 py-1"
                                value={editLivroData.isbn}
                                onChange={e => setEditLivroData({ ...editLivroData, isbn: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Autores (separados por vírgula)"
                                className="border rounded px-2 py-1"
                                value={editLivroData.authors.join(', ')}
                                onChange={e => setEditLivroData({ ...editLivroData, authors: e.target.value.split(',').map(a => a.trim()) })}
                            />
                            <input
                                type="number"
                                placeholder="Ano de publicação"
                                className="border rounded px-2 py-1"
                                value={editLivroData.publicationYear}
                                onChange={e => setEditLivroData({ ...editLivroData, publicationYear: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Quantidade"
                                className="border rounded px-2 py-1"
                                value={editLivroData.quantity}
                                onChange={e => setEditLivroData({ ...editLivroData, quantity: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Gênero literário"
                                className="border rounded px-2 py-1"
                                value={editLivroData.literaryGenre.name}
                                onChange={e => setEditLivroData({ ...editLivroData, literaryGenre: { ...editLivroData.literaryGenre, name: e.target.value } })}
                            />
                            <input
                                type="number"
                                placeholder="ID do gênero"
                                className="border rounded px-2 py-1"
                                value={editLivroData.literaryGenre.id}
                                onChange={e => setEditLivroData({ ...editLivroData, literaryGenre: { ...editLivroData.literaryGenre, id: e.target.value } })}
                            />
                            <textarea
                                placeholder="Resumo"
                                className="border rounded px-2 py-1 col-span-1 md:col-span-2"
                                value={editLivroData.summary}
                                onChange={e => setEditLivroData({ ...editLivroData, summary: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4 mt-4 justify-end">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={async () => {
                                    await handleUpdateLivro();
                                    closeEditModal();
                                }}
                            >
                                Salvar Alterações
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                onClick={closeEditModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estatísticas */}
            <div className="flex gap-8 mb-8 flex-wrap">
                <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[180px]">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Total de Livros</h2>
                    <p className="text-2xl font-bold text-blue-700">{livrosList.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[180px]">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Total de Usuários</h2>
                    <p className="text-2xl font-bold text-blue-700">{usuariosList.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[180px]">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Livros Mais Alugados</h2>
                    <ul className="text-sm mt-2">
                        {livrosList
                            .sort((a, b) => b.alugado - a.alugado)
                            .slice(0, 3)
                            .map(livro => (
                                <li key={livro.id} className="flex justify-between">
                                    <span>{livro.titulo}</span>
                                    <span className="text-blue-600 font-bold">{livro.alugado}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* CRUD Livros */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Livros</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={e => {
                            e.preventDefault();
                            // handleAddLivro();
                            setBlurBg(true);
                        }}
                    >
                        Adicionar Livro
                    </button>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow mb-2">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Título</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Alugado</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600 text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody >
                        {livrosList.map(livro => (
                            <tr key={livro.id} className="border-b last:border-none">
                                <td className="py-2 px-4">{livro.titulo}</td>
                                <td className="py-2 px-4">{livro.alugado}</td>
                                <td className="py-2 px-4 flex justify-end gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleEditLivro(livro.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            alert('Deseja apagar este livro?')
                                            handleDeleteLivro(livro.id);



                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CRUD Usuários */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Usuários</h2>
                    <button
                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleAddUsuario}
                    >
                        Adicionar Usuário
                    </button>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow mb-2">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Nome</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Turma</th>
                            <th className="py-3 px-4  font-semibold text-gray-600 text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosList.map(usuario => (
                            <tr key={usuario.id} className="border-b last:border-none">
                                <td className="py-2 px-4">{usuario.nome}</td>
                                <td className="py-2 px-4">{usuario.turma}</td>
                                <td className="py-2 px-4 flex justify-end gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleEditUsuario(usuario.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteUsuario(usuario.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CRUD Eventos */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Eventos</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Nome do evento"
                            className="border rounded px-2 py-1"
                            value={novoEvento.nome}
                            onChange={e => setNovoEvento({ ...novoEvento, nome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Data"
                            className="border rounded px-2 py-1"
                            value={novoEvento.data}
                            onChange={e => setNovoEvento({ ...novoEvento, data: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Descrição"
                            className="border rounded px-2 py-1"
                            value={novoEvento.descricao}
                            onChange={e => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                        />
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={handleAddEvento}
                        >
                            Adicionar Evento
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow mb-2">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Nome</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Data</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Descrição</th>
                            <th className="py-3 px-4 text-end font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evento => (
                            <tr key={evento.id} className="border-b last:border-none">
                                <td className="py-2 px-4">{evento.nome}</td>
                                <td className="py-2 px-4">{evento.data}</td>
                                <td className="py-2 px-4 block max-w-xl max-h-50 overflow-y-auto whitespace-pre-line">
                                    {evento.descricao}
                                </td>
                                <td className="py-2 px-4 flex justify-end">
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteEvento(evento.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CRUD Desafios Semanais */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Desafios Semanais</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Descrição do desafio"
                            className="border rounded px-2 py-1"
                            value={novoDesafio}
                            onChange={e => setNovoDesafio(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={handleAddDesafio}
                        >
                            Adicionar Desafio
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-white rounded-lg shadow mb-2">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Descrição</th>
                            <th className="py-3 px-4 text-end font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {desafios.map(desafio => (
                            <tr key={desafio.id} className="border-b last:border-none">
                                <td className="py-2 px-4">{desafio.descricao}</td>
                                <td className="py-2 px-4 flex justify-end">
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteDesafio(desafio.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Histórico de Locações */}
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Histórico de Locações</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Livro</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Usuário</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Data do Aluguel</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Data de Devolução</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicoLocacoes.map(locacao => (
                                <tr key={locacao.id} className="border-b last:border-none">
                                    <td className="py-2 px-4">{locacao.livro}</td>
                                    <td className="py-2 px-4">{locacao.usuario}</td>
                                    <td className="py-2 px-4">{locacao.dataAluguel}</td>
                                    <td className="py-2 px-4">{locacao.dataDevolucao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

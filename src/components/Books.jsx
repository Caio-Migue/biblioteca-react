import React, { useState } from 'react';

const livrosMock = [
    {
        id: 1,
        nome: 'O Pequeno Príncipe',
        imagem: 'https://m.media-amazon.com/images/I/81p6yQ2VwVL._AC_UF1000,1000_QL80_.jpg'
    },
    {
        id: 2,
        nome: 'Dom Casmurro',
        imagem: 'https://m.media-amazon.com/images/I/71w5wQpQKjL._AC_UF1000,1000_QL80_.jpg'
    },
    {
        id: 3,
        nome: 'Harry Potter',
        imagem: 'https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg'
    }
];

function Livros() {
    const [search, setSearch] = useState('');
    const [livros, setLivros] = useState(livrosMock);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredLivros = livros.filter(livro =>
        livro.nome.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddLivro = () => {
        alert('Funcionalidade de adicionar livro em breve!');
    };

    return (
        <div className="p-8 bg-slate-300 min-h-screen">
            {/* gêneros literários */}
            <section className="genre-container mb-10 bg-slate-300" aria-label="Gêneros">
                <div className="genre-grid max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <h2 className="genre-title text-blue-900 text-2xl font-bold mb-4 text-center">Gêneros Literários</h2>
                    <div className="genre-boxes grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Aventura</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Romance</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Fantasia</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Suspense</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Clássicos</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Biografia</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Ficção Científica</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Drama</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Poesia</a>
                        <a href="#" className="genre-box block bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg px-4 py-2 text-center shadow transition">Infantil</a>
                    </div>
                </div>
            </section>
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar livro..."
                    value={search}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddLivro}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Pesquisar
                </button>
            </div>

            <div className="flex gap-8">
                {filteredLivros.map(livro => (
                    <div
                        key={livro.id}
                        className="border bg-slate-50 rounded-lg p-4 w-52 text-center shadow hover:shadow-lg transition"
                    >
                        <img
                            src={livro.imagem}
                            alt={livro.nome}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold">{livro.nome}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Livros;
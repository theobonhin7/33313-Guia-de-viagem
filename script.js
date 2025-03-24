document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#questionnaire');
    const results = document.querySelector('#results');
    const destinos = document.querySelector('.destinos');
    const backButton = document.querySelector('#back-button'); // Selecionar o botão "Voltar"

    // Lista de destinos
    const destinosData = [
        { id: 1, nome: "Paris, França", descricao: "Conheça a cidade do amor e sua icônica Torre Eiffel.", imagem: "https://via.placeholder.com/300x200", tags: ["romance", "cultura"] },
        { id: 2, nome: "Rio de Janeiro, Brasil", descricao: "Desfrute das praias deslumbrantes e do Cristo Redentor.", imagem: "https://via.placeholder.com/300x200", tags: ["praia", "aventura"] },
        { id: 3, nome: "Kyoto, Japão", descricao: "Explore templos históricos e belos jardins japoneses.", imagem: "https://via.placeholder.com/300x200", tags: ["cultura", "calma"] },
        { id: 4, nome: "Cape Town, África do Sul", descricao: "Aventura e natureza no ponto mais ao sul da África.", imagem: "https://via.placeholder.com/300x200", tags: ["natureza", "aventura"] },
        { id: 5, nome: "Machu Picchu, Peru", descricao: "Um marco da história e cultura Inca.", imagem: "https://via.placeholder.com/300x200", tags: ["história", "aventura"] },
        { id: 6, nome: "Ilhas Maldivas", descricao: "Relaxe em praias paradisíacas e águas cristalinas.", imagem: "https://via.placeholder.com/300x200", tags: ["praia", "calma"] },
        { id: 7, nome: "Nova York, EUA", descricao: "A cidade que nunca dorme, cheia de cultura e aventura.", imagem: "https://via.placeholder.com/300x200", tags: ["cultura", "aventura"] },
    ];

    // Evento para enviar o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const respostas = Array.from(form.querySelectorAll('input[type=radio]:checked')).map(input => input.value);

        if (respostas.length < 5) {
            alert('Por favor, responda todas as perguntas.');
            return;
        }

        form.style.display = 'none';
        results.style.display = 'block';

        const preferencias = [];
        if (respostas[0] === 'sim') preferencias.push("praia");
        if (respostas[1] === 'sim') preferencias.push("cultura");
        if (respostas[2] === 'sim') preferencias.push("aventura");
        if (respostas[3] === 'sim') preferencias.push("história");
        if (respostas[4] === 'sim') preferencias.push("natureza");

        const destinosFiltrados = destinosData.filter(destino =>
            destino.tags.some(tag => preferencias.includes(tag))
        ).slice(0, 5);

        if (destinosFiltrados.length === 0) {
            destinos.innerHTML = "<p>Nenhum destino corresponde às suas preferências. Tente ajustar suas respostas.</p>";
        } else {
            destinos.innerHTML = destinosFiltrados.map(destino => `
                <div class="card">
                    <img src="${destino.imagem}" alt="${destino.nome}">
                    <div class="card-content">
                        <h3><a href="https://www.google.com/search?q=${encodeURIComponent(destino.nome)}" target="_blank">${destino.nome}</a></h3>
                        <p>${destino.descricao}</p>
                    </div>
                </div>
            `).join('');
        }
    });

    // Evento para o botão "Voltar"
    backButton.addEventListener('click', () => {
        results.style.display = 'none'; // Oculta os resultados
        form.style.display = 'block'; // Exibe o formulário
        destinos.innerHTML = ''; // Limpa os destinos exibidos
    });
});

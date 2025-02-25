document.addEventListener("DOMContentLoaded", function () {
    fetch("posts.json")
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById("posts");

            posts.forEach(post => {
                const postCard = document.createElement("div");
                postCard.classList.add("post-card");

                postCard.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.summary}</p>
                    <a href="artigo.html?id=${post.id}" class="read-more">Ler mais</a>
                `;

                postsContainer.appendChild(postCard);
            });
        })
        .catch(error => console.error("Erro ao carregar os posts:", error));
});

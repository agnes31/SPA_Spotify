import AbstractView from "./AbstractView.js";

// classe pour la vue d'un artiste
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Artist Discography');
    }

    // récupère les données de l'artiste et construit le html
    async getHtml() {
        async function getData(url) {
            const accessToken = localStorage.getItem('access_token');
    
            // si pas de token, redirection vers la page de login
            if (!accessToken) {
                window.location.href = '/login';
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // access_token expiré
            if (response.status === 401) {
                window.location.href = '/login';
            }

            return response.json();
        }

        const artistId = this.params.id;
        const artistDetail = await getData(`https://api.spotify.com/v1/artists/${artistId}/albums`).catch(error => console.log(error));
        const albums = artistDetail.items;

        let html = `
            <div class="container col-xxl-8 px-4 py-5 text-center mt-5">
            <h1>La discographie de ${albums[0].artists[0].name}</h1>
            <button onclick="history.back()" class="btn btn-outline-secondary btn-sm mb-4">Retour aux artists</button>
            <div class="container-fluid">
            <div class="row justify-content-center">
        `;

        for (let i in albums) {
            // construction du html
            html += `
                <div class="col-xxl-4 col-xl-4 col-md-6 col-sm-6 col-xs-12 mb-4">
                    <br>
                    <img class="rounded img-fluid" alt="poster album ${albums[i].name}" src="${albums[i].images[0].url}">
                    <h3 class="mt-3">${albums[i].name}</h3>
                    <div class="my-3"><strong>Sortie le:</strong> ${albums[i].release_date}</div>
                    <div class="my-3">${albums[i].total_tracks} chansons</div>
                </div>
            `;
        }

        return html;
    }
}

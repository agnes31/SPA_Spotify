import AbstractView from "./AbstractView.js";

// classe pour la vue de la liste des artistes
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Artists');
    }

    // récupère les données des artistes et construit le html
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

        const data = await getData("https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6").catch(error => console.log(error));

        // liste des artistes
        const artists = data.artists;

        // construction du html
        let html = `
            <div class="container col-xxl-8 px-4 py-5 text-center mt-5">
            <h1>Mes artistes préférées</h1>
            <div class="container-fluid">
            <div class="row justify-content-center">
        `;

        // boucle sur les artistes
        for (let i in artists) {
            html += `
                <div class="col-xxl-4 col-xl-4 col-md-6 col-sm-6 col-xs-12 mb-4">
                    <a href="/artist-view/${artists[i].id}" data-link>
                        <img class="rounded img-fluid custom-hover" alt="artists" src="${artists[i].images[0].url}"> 
                    </a>
                    <h3 class="text-center my-3 custom-hover">
                        <a href="/artist-view/${artists[i].id}" class="text-decoration-none text-dark" data-link>${artists[i].name}</a>
                    </h3>
                    <div class="my-3"><strong>Genre de music :</strong> ${artists[i].genres[0]}</div>
                    <div class="my-3"><strong>followers :</strong> ${artists[i].followers.total}</div>
                </div>  
            `;
        }

        html += '</div></div></div>';

        return html;
    }
}
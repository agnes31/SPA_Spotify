import AbstractView from "./AbstractView.js";

// classe pour la vue de la page d'accueil
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Login');
    }

    // récupère les données de l'artiste et construit le html
    getHtml() {
        // construction du html
        let html = `
            <div class="container col-xxl-8 px-4 py-5 text-center mt-5">
                <h1>Votre session a expirée</h1>
                <a href="#" data-refresh-session-link>Cliquez ici pour vous reconnecter</a>
            </div>
        `;

        return html;
    }
}

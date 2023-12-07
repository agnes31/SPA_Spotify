import AbstractView from "./AbstractView.js";

// classe pour la vue de la page d'accueil
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Accueil');
  }

  // récupère les données de l'artiste et construit le html
  async getHtml() {
    return `
    <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
            <img src="/static/img/acc.jpeg" class="d-block mx-lg-auto img-fluid" alt="Image d'accueil" width="700" height="500" loading="lazy">
        </div>
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Bienvenue sur notre plateforme musicale!</h1>
            <p class="lead">Découvrez la playlist de vos artistes préférés et explorez de nouveaux genres musicaux.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <a href="/artists" data-link class="btn btn-outline-secondary btn-lg px-4">Voir la playlist des artistes</a>
            </div>  
        </div>  
    </div>
</div>
        `
  }
} 
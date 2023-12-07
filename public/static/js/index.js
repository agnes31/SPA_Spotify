import Accueil from "./views/Accueil.js";
import Artists from "./views/Artists.js";
import ArtistView from "./views/ArtistView.js";
import Login from "./views/Login.js";

// création d'une expression régulière pour comparer l'url avec les routes possibles
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
}

// création du router
const router = async () => {
    
    const routes = [
        { path: "/", view: Accueil },
        { path: "/artists", view: Artists },
        { path: "/artist-view/:id", view: ArtistView },
        { path: "/login", view: Login },
    ]


    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });


    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
}

// permet la navigation dans l'app sans recharger la page
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const refreshSession = async () => {
    const tokenData = await fetch('/generateToken');
    const token = await tokenData.json();
    localStorage.setItem('access_token', token.access_token);
}

window.addEventListener("popstate", () => {
    router();
});

// lance le router au chargement de la page
document.addEventListener("DOMContentLoaded",() => {
    document.body.addEventListener("click", async e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }

        if (e.target.matches("[data-refresh-session-link]")) {
            e.preventDefault();
            await refreshSession();
            navigateTo('/artists');
        }
    });
    router();
});

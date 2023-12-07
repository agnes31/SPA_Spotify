/**
 * Classe parent de toutes les vues
 */
export default class {
    constructor(params) {
        this.params = params;
    }
    setTitle(title) {
        document.title = title;
    }
    async getHtml() {
        return "";
    }
}
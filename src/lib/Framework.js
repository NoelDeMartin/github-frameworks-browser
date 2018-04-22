export default class {
    constructor(name, homeUrl = null) {
        this.name = name;
        this.homeUrl = homeUrl;
    }

    searchRepositories() {
        return fetch(this.searchUrl())
            .then(response => response.json())
            .then(result => result.items);
    }
}

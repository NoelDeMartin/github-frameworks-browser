import Framework from '../Framework';

export default class extends Framework {
    constructor() {
        super('click', 'http://click.pocoo.org');
    }

    searchUrl() {
        return 'https://api.github.com/search/repositories?q=Click+language:Python&sort=stars';
    }
}

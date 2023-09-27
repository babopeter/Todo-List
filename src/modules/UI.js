export default class UI {
    
    static loadHomepage() {
        const title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = _.join(['Todo', 'List'], ' ');

        document.body.appendChild(title);
    }
}
export default class UI {
    
    static loadHomepage() {
        const element = document.createElement('div');
  
        element.innerHTML = _.join(['The', 'homepage'], ' ');

        document.body.appendChild(element);
    }
}
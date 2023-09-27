export default class UI {
    
    static loadHomepage() {
        const page = document.createElement('div');
        page.classList.add('page');

        const title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = "Todo List";

        page.appendChild(title);


        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');
        const testItems = [1, 2, 3, 4, 5];

        testItems.forEach((item) => {
            const testItem = document.createElement('div');
            testItem.classList.add('item');
            testItem.innerHTML = "Todo Item";
            itemContainer.appendChild(testItem);
        });

        page.appendChild(itemContainer);
        document.body.appendChild(page);
    }
}
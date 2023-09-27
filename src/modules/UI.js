import { create } from "lodash";
import Project from "./Project";

export default class UI {
    
    static loadHomepage() {
        const page = document.createElement('div');
        page.classList.add('page');

        page.appendChild(UI.createTitle());
        page.appendChild(UI.createProjects());

        document.body.appendChild(page);
    }

    static createTitle() {
        const title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = "Todo List";
        return title;
    }

    static createProjects() {

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const testProjects = [1, 2, 3, 4, 5];

        testProjects.forEach(() => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('item');
            projectItem.innerHTML = "Project Item";
            projectContainer.appendChild(projectItem);
        });

        return projectContainer;
    }

}
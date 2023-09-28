import { create } from "lodash";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

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
        
        const defaultList = new TodoList();
        const defaultProjects = defaultList.getProjects();
        console.log(defaultProjects);

        defaultProjects.forEach((project) => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('item');
            projectItem.innerHTML = project.getName();
            projectContainer.appendChild(projectItem);
        });

        return projectContainer;
    }
}
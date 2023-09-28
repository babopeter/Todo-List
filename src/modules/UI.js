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
        page.appendChild(UI.createTasks());

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

    static createTasks() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const task1 = new Task("Task 1", "This is task 1", "2021-09-01", "High");

        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = task1.getName();

        taskItem.appendChild(taskName);
        
        
        const taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.innerHTML = task1.getDueDate();
        taskItem.appendChild(taskDueDate);

        taskContainer.appendChild(taskItem);

        return taskContainer;
    }
}
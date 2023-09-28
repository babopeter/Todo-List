import Project from "./Project";
import Task from "./Task";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Daily Tasks"));
        this.projects.push(new Project("Weekly Tasks"));
        this.projects.push(new Project("Monthly Tasks"));
    }

    getProjects() {
        return this.projects;
    }

    setProjects(newProjects) {
        this.projects = newProjects;
    }

    addProject(newProject) {
        this.projects.push(newProject);
    }

    deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1);
    }
}
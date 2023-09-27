import Project from "./Project";
import Task from "./Task";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Daily Tasks"));
        this.projects.push(new Project("Weekly Tasks"));
        this.projects.push(new Project("Monthly Tasks"));
    }

    static getProjects() {
        return this.projects;
    }

    static setProjects(newProjects) {
        this.projects = newProjects;
    }

    static addProject(newProject) {
        this.projects.push(newProject);
    }

    static deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1);
    }
}
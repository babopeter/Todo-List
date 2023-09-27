import { compareAsc, format } from 'date-fns'

format(new Date(2014, 1, 11), 'yyyy-MM-dd')

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(newTasks) {
        this.tasks = newTasks;
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}
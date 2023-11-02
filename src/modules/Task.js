import { compareAsc, format } from 'date-fns'

format(new Date(2014, 1, 11), 'yyyy-MM-dd')

export default class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getDescription() {
        return this.description;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    evaluateDate() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(this.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        const result = compareAsc(today, dueDate);
        if (result === 1) {
            return "overdue";
        } else if (result === -1) {
            return "due";
        } else {
            return "today";
        }
    }
}
import {ActionContext} from "vuex";
import store from "@/store";

export interface ITaskStore {
  tasksDb: ITask []
  taskList: ITask []
  tabTitle: string
  task: ITask
}

export interface ITask {
  title: string
  userEmail: string
  description: string
  isSelected: boolean
  isComplete: boolean
}

function saveTasksInLocalStorage(tasks: ITask[], key: string) {
  const tasksString = JSON.stringify(tasks)
  localStorage.setItem(key, tasksString)
}

function loadTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks')
  return tasks ? JSON.parse(tasks) : []
}

export const taskStore = {
  state: (): ITaskStore => ({
    tasksDb: loadTasksFromLocalStorage(),
    task: {
      title: '',
      isComplete: false,
      isSelected: false,
      description: '',
      userEmail: ''
    },
    taskList: [],
    tabTitle: 'Все задачи'
  }),

  actions: {
    getSelectedTasks({commit}: ActionContext<ITaskStore, any>) {
      commit('getSelectedTasks')
    },
    getAllTasks({commit}: ActionContext<ITaskStore, any>) {
      commit('getAllTasks')
    },
    getCompletedTasks({commit}: ActionContext<ITaskStore, any>) {
      commit('getCompletedTasks')
    },
    selectTask({commit}: ActionContext<ITaskStore, any>, taskTitle: string) {
      commit('selectTask', taskTitle)
    },
    createTask({commit}: ActionContext<ITaskStore, any>, task: ITask) {
      commit('createTask', task)
    },
    deleteTask({commit}: ActionContext<ITaskStore, any>, taskTitle: string) {
      commit('deleteTask', taskTitle)
    },
    removeFromSelected({commit}: ActionContext<ITaskStore, any>, taskTitle: string) {
      commit('removeFromSelected', taskTitle)
    },
    changeTabTask({commit}: ActionContext<ITaskStore, any>, taskTitle: string) {
      commit('changeTabTask', taskTitle)
    },
    completeTask({commit}: ActionContext<ITaskStore, any>, taskTitle: string) {
      commit('completeTask', taskTitle)
    },
    editTask({commit}: ActionContext<ITaskStore, any>, task: ITask) {
      commit('editTask', task)
    }
  },

  mutations: {
    changeTabTask(state: ITaskStore, taskTitle: string) {
      switch (taskTitle) {
        case 'Все задачи':
          state.tabTitle = taskTitle
          return state.taskList = state.tasksDb
        case 'Избранное':
          state.tabTitle = taskTitle
          return state.taskList = state.tasksDb.filter(task => task.isSelected)
        case 'Завершенные':
          state.tabTitle = taskTitle
          return state.taskList = state.tasksDb.filter(task => task.isComplete)
        default:
          return state.taskList = state.tasksDb
      }
    },
    selectTask(state: ITaskStore, taskTitle: string) {
      state.tasksDb.forEach(task => {
        if(task.title === taskTitle) {
          task.isSelected = true
        }
      })
      state.taskList = state.tasksDb

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },
    removeFromSelected(state: ITaskStore, taskTitle: string) {
      state.tasksDb.forEach(task => {
        task.title === taskTitle ? task.isSelected = false : null
      })

      state.taskList = state.tasksDb

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },
    getAllTasks(state: ITaskStore) {
      state.taskList = state.tasksDb
    },
    createTask(state: ITaskStore, task: ITask) {
      state.tasksDb.push(task)
      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },
    deleteTask(state: ITaskStore, taskTitle: string) {
      state.tasksDb = state.tasksDb.filter(task => task.title !== taskTitle)
      state.taskList = state.tasksDb
      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },
     completeTask(state: ITaskStore, taskTitle: string) {
      state.tasksDb.forEach(task => {
        if(task.title === taskTitle) {
          task.isComplete = !task.isComplete
        }
      })
      state.taskList = state.tasksDb

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
     },

    getTask(state: ITaskStore, taskTitle: string) {
      const foundTask = state.tasksDb.find(task => task.title === taskTitle)
      if(foundTask) {
        state.task = foundTask
      }
    },

    editTask(state: ITaskStore, task: ITask) {
      state.tasksDb.forEach(item => {
        if(item.title === state.task.title) {
          item.title = task.title
          item.description = task.description
        }
      })

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    }
  },
  getters: {
    selectedTasks:(state: ITaskStore) => state.tasksDb.filter(task => task.isSelected),
    tasks: (state: ITaskStore) => state.taskList,
    task: (state: ITaskStore) => state.task,
    tabTitle: (state: ITaskStore) => state.tabTitle
  }
}
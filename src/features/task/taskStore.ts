import {ActionContext} from "vuex";
import {validateForm} from "@/shared/helpers/validateForm";

export interface ITaskStore {
  tasksDb: ITask []
  taskList: ITask []
  tabTitle: string
  task: ITask
  error: string
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
    tabTitle: 'Все задачи',
    error: ''
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
      const task = state.tasksDb.find(item => item.title === taskTitle)

      if(task) {
        task.isSelected = true
      }
      state.taskList = state.tasksDb

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },

    removeFromSelected(state: ITaskStore, taskTitle: string) {
      const task = state.tasksDb.find(item => item.title === taskTitle)

      if(task) {
        task.isSelected = false
      }
      state.taskList = state.tasksDb

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },

    getAllTasks(state: ITaskStore) {
      state.taskList = state.tasksDb
    },

    createTask(state: ITaskStore, task: ITask) {
      try {
        validateForm([task.title, task.description])
        state.tasksDb.push(task)
        state.error = ''
        saveTasksInLocalStorage(state.tasksDb, 'tasks')
      } catch (e: Error | any) {
        state.error = e.message
      }
    },

    deleteTask(state: ITaskStore, taskTitle: string) {
      state.tasksDb = state.tasksDb.filter(task => task.title !== taskTitle)
      state.taskList = state.tasksDb
      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    },

     completeTask(state: ITaskStore, taskTitle: string) {
      const task = state.tasksDb.find(item => item.title === taskTitle)

      if(task) {
        task.isComplete = !task.isComplete
      }
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
      const foundTask = state.tasksDb.find(item => item.title === state.task.title)

      if(foundTask) {
        foundTask.title = task.title
        foundTask.description = task.description
      }

      saveTasksInLocalStorage(state.tasksDb, 'tasks')
    }
  },

  getters: {
    tasks: (state: ITaskStore) => state.taskList,
    task: (state: ITaskStore) => state.task,
    tabTitle: (state: ITaskStore) => state.tabTitle
  }
}
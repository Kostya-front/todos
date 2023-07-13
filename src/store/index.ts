import {createStore, Store} from 'vuex'
import {authStore, IAuthState} from "@/features/auth/authStore";
import {ITaskStore, taskStore} from "@/features/task/taskStore";

export interface IRootState {
  authStore: IAuthState
  taskStore: ITaskStore
}

const store: Store<IRootState> = createStore({
  modules: {
    authStore: authStore,
    taskStore: taskStore
  }
})
export default store
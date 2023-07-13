import {ActionContext} from "vuex";
import {types} from "sass";
import Error = types.Error;
import {useRouter} from "vue-router";
import {validateForm} from "@/shared/helpers/validateForm";

interface IUserDto {
  title: string
  type: string
}

interface IUser {
  email: string
  username?: string
  password: string
  [key: string]: any
}

export interface IAuthState {
  users: IUser[]
  user: IUser
  isAuth: boolean
  tabIndex: number
  error: string
}

const usersDb = localStorage.getItem('users') || '[]'

export const authStore = {
  state: (): IAuthState => ({
    users: JSON.parse(usersDb),
    isAuth: false,
    user: {
      email: '',
      username: '',
      password: ''
    },
    tabIndex: 1,
    error: ''
  }),

  actions: {
    register({commit}:ActionContext<IAuthState, any>, userDate: IUser) {
      commit('register', userDate)
    },
    login({commit}: ActionContext<IAuthState, any>, userDate: IUser) {
      commit('login', userDate)
    },
    setUserDate({commit}: ActionContext<IAuthState, any>, userDto: IUserDto) {
      commit('setUserDate', userDto)
    },
    loadUsersDb({commit}: ActionContext<IAuthState, any>) {
      commit('loadUsersDb')
    },
    toggleAuthForm({commit}: ActionContext<IAuthState, any>, index: number) {
      commit('toggleAuthForm', index)
    },
    authUser({commit}: ActionContext<IAuthState, any>) {
      commit('authUser')
    },
    getUser({commit}: ActionContext<IAuthState, any>, email: string) {
      commit('getUser', email)
    },
    logout({commit}: ActionContext<IAuthState, any>) {
      commit('logout')
    }
  },

  mutations: {
    register(state: IAuthState, userDate: IUser) {
      try {

        validateForm([userDate.email, userDate.username, userDate.password])

        const candidate = state.users.find((user:IUser) => user.email === userDate.email)

        if(candidate) {
          throw new Error('Пользователь уже существует')
        }

        state.users.push(userDate)

        state.error = ''

        state.isAuth = true

        localStorage.setItem('authState', JSON.stringify(state))
      } catch (e: Error | any) {
        state.error = e.message
      }
    },

    login(state: IAuthState, userDate: IUser) {
      try {
        validateForm([userDate.email, userDate.password])

        const foundedUser = state.users.find(user => user.email === userDate.email)

        if(!foundedUser) {
          throw new Error('Пользователь не найден')
        }

        const password = foundedUser.password === userDate.password

        if(password && foundedUser) {
          state.isAuth = true
          localStorage.setItem('authState', JSON.stringify(state))
          localStorage.setItem('user', JSON.stringify(foundedUser))
          return true
        }

        throw new Error('Логин или пароль неверны')
      }
      catch (e: Error | any) {
        state.error = e.message
      }
    },

    setUserDate(state: IAuthState, userDto: IUserDto) {
      const key = userDto.type
      state.user[key] = userDto.title
    },

    loadUsersDb(state: IAuthState) {
      const stateSting = localStorage.getItem('authState')
      const userStateString = localStorage.getItem('user')

      if(stateSting) {
        const store = JSON.parse(stateSting)
        state.users = store.users
        state.isAuth = store.isAuth
      }
      if(userStateString) {
        const store = JSON.parse(userStateString)
        state.user = store
      }
    },

    toggleAuthForm(state: IAuthState, index: number) {
      state.tabIndex = index
    },

    getUser(state: IAuthState, email: string) {
      const candidate = state.users.find(user => user.email == email)

      if(candidate) {
        state.user = {...candidate}
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },

    authUser(state: IAuthState) {
      state.isAuth = true
    },

    logout(state: IAuthState) {
      state.isAuth = false
      const localState = localStorage.getItem('authState')
      if(localState) {
        const stateUpdated = JSON.parse(localState)
        stateUpdated.isAuth = false
        localStorage.setItem('authState', JSON.stringify(stateUpdated))
      }
    }
  },
}

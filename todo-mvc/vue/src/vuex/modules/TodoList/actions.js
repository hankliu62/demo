import { TODOLIST_MAIN_SET } from '../../../constants/MutationTypes'

export const setState = function ({ commit }, payload) {
  commit(TODOLIST_MAIN_SET, payload)
}
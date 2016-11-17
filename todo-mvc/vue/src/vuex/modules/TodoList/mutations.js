import { TODOLIST_MAIN_SET } from '../../../constants/MutationTypes'

export default {
  [TODOLIST_MAIN_SET] (state, payload) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        state[key] = payload[key]
      }
    }
  }
}
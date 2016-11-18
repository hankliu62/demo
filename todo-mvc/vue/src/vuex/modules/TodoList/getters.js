import { FILTER_STATUSES } from '../../../constants/Constants'

export const filtedTodos = function ({ todos, filterStatus } = {}) {
  if (todos) {
    if (filterStatus === FILTER_STATUSES.ALL) {
      return todos
    }

    return todos.filter(function (item) {
      return item.completed === (filterStatus === FILTER_STATUSES.COMPLETED)
    })
  }

  return []
}
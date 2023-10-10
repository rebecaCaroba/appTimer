import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCyclesId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCyclesId = action.payload.newCycle.id
      })

    case 'INTERRUP_CURRENT_CYCLE': {
      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCyclesId
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCyclesId = null
        draft.cycles[currentCyclesIndex].interruptedDate = new Date()
      })
    }
    case 'MARK_CURRENT_CYCLE_AS_FINISHED': {
      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCyclesId
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCyclesId = null
        draft.cycles[currentCyclesIndex].finishedDate = new Date()
      })
    }
  }
}

import { ReactNode, createContext, useState, useReducer } from 'react'

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCyclesId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interrupCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }
    return state
  }, [])

  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: { activeCyclesId },
    })
    // setCyles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCyclesId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }
  function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle },
    })
    // setCyles((state) => [...state, newCycle])
    setActiveCyclesId(id)
    setAmountSecondsPassed(0)
  }

  function interrupCurrentCycle() {
    dispatch({
      type: 'INTERRUP_CURRENT_CYCLE',
      payload: { activeCycle },
    })
    // setCyles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCyclesId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCyclesId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  console.log(cycles)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCyclesId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

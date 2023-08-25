import { ReactNode, createContext, useState } from 'react'

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
  const [cycles, setCyles] = useState<Cycle[]>([])
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId)

  function markCurrentCycleAsFinished() {
    setCyles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCyclesId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }
  function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCyles((state) => [...state, newCycle])
    setActiveCyclesId(id)
    setAmountSecondsPassed(0)
  }

  function interrupCurrentCycle() {
    setCyles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCyclesId) {
          return { ...cycle, interryptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCyclesId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

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

import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState, createContext } from 'react'
import { Countdown } from './components/Countdown'
// import { NewCycleForm } from './components/NewCycleForm'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ter no mínimo 5 minutos')
    .max(60, 'O ciclo deve ter no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCyclesId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
  const [cycles, setCyles] = useState<Cycle[]>([])
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId)

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
  //   setCyles((state) => [...state, newCycle])
  //   setActiveCyclesId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

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

  function handleInterrupCycle() {
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

  // const task = watch('task')
  // const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
        <CyclesContext.Provider value={{ activeCycle, activeCyclesId, markCurrentCycleAsFinished }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterrupCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

import { FormContainer, MinuteAmountInput, TextInput } from './styles'

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TextInput
        id="task"
        disabled={!!activeCycle}
        list="task-suggestions"
        placeholder="Dê um nome para seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinuteAmountInput
        type="number"
        id="minutesAmount"
        disabled={!!activeCycle}
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}

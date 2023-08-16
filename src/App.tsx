import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultThemes } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <Button varient="primary" />
      <Button varient="secondary" />
      <Button varient="danger" />
      <Button varient="success" />
      <Button />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App

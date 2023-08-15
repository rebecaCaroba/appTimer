import { Button } from "./components/Button";
import { ThemeProvider } from "styled-components";
import { defaultThemes } from "./styles/themes/default";


function App() {
  return (
    <ThemeProvider theme={defaultThemes}>
      <Button varient="primary" />
      <Button varient="secondary" />
      <Button varient="danger" />
      <Button varient="success" />
      <Button />
    </ThemeProvider>
  )
}

export default App;

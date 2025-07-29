import { AgeLaw } from "./components/AgeLaw"
import { AgeLawDetails } from "./components/AgeLawDetails"


function App() {

  return (
    <div className="md:p-3 p-1">
      <h1 className="text-3xl  text-center p-3 font-bold">Welcome to The Social Surveys Point</h1>
      <AgeLaw/>
      <AgeLawDetails name="Age on the first time." date="6 April, 2025"/>
    </div>
  )
}

export default App

import CountContainer from "./components/container/CountContainer"

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-[280px] bg-neutral-800 p-4 rounded-lg">
        <CountContainer />
      </div>
    </div>
  )
}

export default App

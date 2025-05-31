import Counter from "./components/ui/counter/Counter"

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-[280px] bg-neutral-800 p-4 rounded-lg">
        <Counter />
      </div>
    </div>
  )
}

export default App

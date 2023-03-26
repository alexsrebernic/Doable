import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <div className='flex'>
        <div>
        Calendar
        </div>
        <div>
        Today Tasks
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default App

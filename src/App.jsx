import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8) // Corrected variable name from "lenght" to "length"
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-+={[]}``"

    for (let i = 1; i <= length; i++) { // Corrected variable name from "lenght" to "length"
      let char = Math.floor(Math.random() * str.length) // Removed +1 from random() function
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordClipboard = useCallback(() => { // Corrected function name from "copyPasswordClipBoard" to "copyPasswordClipboard"
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, 99999) // Updated to a large range
    document.execCommand("copy")
    alert("Password copied to clipboard")
  }, [])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
      <h1 className='text-center text-white text-3xl font-bold p-3 '>Password Generator</h1>
      <div className='flex gap-3 p-5'>
        <input
          type="text"
          placeholder='Password'
          value={password}
          className='outline w-full py-1 px-3 rounded-lg'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordClipboard} className='bg-red-400 rounded-lg border-2 px-3 py-2 text-black font-bold'>Copy</button>
      </div>
      <div className='flex gap-3 py-3'>
        <div>
          <input
            type="range"
            min={4}
            max={10}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(parseInt(e.target.value)) }} // Corrected to parse the value as integer
          />
        </div>
        <label>Length:{length}</label>
        <input
          type="checkbox"
          checked={numberAllowed} // Changed defaultChecked to checked
          id='numberInput'
          onChange={() => {
            setNumberAllowed(prev => !prev)
          }}
        />
        <label htmlFor='numberInput'>Numbers</label>
        <input
          type="checkbox"
          checked={charAllowed} // Changed defaultChecked to checked
          id='characterInput'
          onChange={() => {
            setCharAllowed(prev => !prev)
          }}
        />
        <label htmlFor='characterInput'>Characters</label> {/* Changed htmlFor value */}
      </div>
    </div>
  )
}

export default App

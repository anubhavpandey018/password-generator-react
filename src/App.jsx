import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [password, setpassword] = useState("")
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "0123456789"
    }

    if (charAllowed) {
      str += "!@#$%^&*`_~()+-{}[]"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str[char];
    }

    setpassword(pass);

  }, [length, numAllowed, charAllowed, setpassword])

  useEffect(() => {
    passGenerator()
  }, [length, numAllowed, charAllowed])

  const passwordRef = useRef(null)

  const handleCopy = useCallback(
    () => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 10);
      window.navigator.clipboard.writeText(password)
    },
    [password]
  )



  return (
    <>
      <div className="w-full ">

        <div className="w-1/2  mx-auto shadow-md rounded-lg p-4 mt-28 text-orange-500 bg-gray-700">
          <h1 className="text-white text-3xl font-bold font-serif text-center mb-4">Password Generator</h1>
          <div className="flex w-3/4 mx-auto rounded-lg overflow-hidden mb-4 mt-5">
            <input

              ref={passwordRef}
              type="text"
              value={password}
              className='bg-amber-100 outline-none w-full py-1 px-3 '
              placeholder='password'
              readOnly
            />
            <button onClick={handleCopy} className='bg-blue-500 p-2 text-black'>copy</button>
          </div>


          <div className='flex justify-center w-full gap-2 items-center mt-5'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>

            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => { setnumAllowed((prev) => !prev) }}
            />Numbers


            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => { setcharAllowed((prev) => !prev) }}
            />Characters

          </div>
        </div>
      </div>
    </>
  )
}

export default App

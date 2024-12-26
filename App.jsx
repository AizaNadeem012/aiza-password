import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8); // Default password length
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()><?:";

    for (let i = 0; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-sm lg:max-w-lg mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-800 space-y-6">
        <h1 className="text-white text-center text-2xl font-semibold">
         Aiza Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 rounded-l-lg bg-gray-900 text-white"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between text-white">
            <label htmlFor="lengthRange" className="text-sm font-medium">
              Password Length: {length}
            </label>
            <input
              type="range"
              id="lengthRange"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 text-white">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-sm">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-sm">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState , useCallback, useEffect ,useRef} from 'react'
import './App.css'

function App() {
  // Creating some dependenciess using state to give into callback
  const [length, setLength] = useState(12 );
  const [specialchar, setSpecialchar] = useState(false);
  const [numallowed , setNumallowed] = useState(false);
  const [password , setPassword] = useState("");
  
  // using ref hooks
  const passref = useRef(null)
  
  // callback functions 
  const copy = useCallback(()=> {
    passref.current?.select(); // for selecting the copied text (mainly used for optimization and also shows users to text is copied)
    passref.current?.setSelectionRange(0,length); // its for giving range how much text is going to copy
    window.navigator.clipboard.writeText(password); // for coping the text into user clipboard
  }, [password , length])

  const generatepass = useCallback(()=>{
    let pass = "" ;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallowed) str+="1234567890";
    if (specialchar) str+="!@#$%^&*";

    for (let i = 0 ; i <length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    setPassword(pass)
  }, [length, specialchar, numallowed ])


  // using useEffect fo automatically calling the generatepas function
  // this hook need a callback function and dependencies which it need to call callbackfunction when any change occured in the dependencies
  useEffect (()=>{
    generatepass() },[ length, specialchar ,numallowed , generatepass ]
  )
  return (
    <>
      <div className='Base'> 

        <div className="heading">
          <h1>Password Generator</h1>
        </div>  
      
        <div className="pass">
          <button
            onClick={copy}
            >Copy
          </button>
          <input type="text" name="text" id="text" placeholder='Your Password' value={password} ref={passref} readOnly/>
        </div>

        <div className="attribute">
          
          <div className="input-group">
            <label for="length">Length: {length}</label>
            <input type="range" id="length" name="length" min={4} max={20} value={length} onChange={(e) =>setLength(e.target.value) }/>
          </div>

          <div className="input-group">
            <label for="number">Number:</label>
            <input type="checkbox" id="number" name="number" defaultChecked={setNumallowed} onChange={() => {
              setNumallowed((prev) => !prev);
              }}/>
          </div>

          <div className="input-group">
            <label for="special">Special Characters:</label>
            <input type="checkbox" id="special" name="special" defaultChecked={setSpecialchar} onChange={() => {
              setSpecialchar((prev) => !prev);
              }}/>
          </div>
        </div>
          <div className="generate">
            <button id= "gen-btn" onClick={generatepass}> Generate</button>
          </div>

        
      </div>
    </>
  )
}

export default App;

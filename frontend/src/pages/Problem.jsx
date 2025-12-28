import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { LANGUAGE_CONFIG, PROBLEMS } from '../../data/problems';
import Navbar from '../../components/Navbar';
import {Panel,PanelGroup, PanelResizeHandle} from 'react-resizable-panels'
import ProblemDescription from '../../components/ProblemDescription';
import CodeEditorPanel from '../../components/CodeEditorPanel';
import OutputPanel from '../../components/OutputPanel';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti'
function Problem() {
    const {id}=useParams()
    const navigate=useNavigate()
    const[currProblemId,setCurrProblemId]=useState("two-sum");
    const [selectedLanguage,setSelectedLanguage]=useState("javascript")
     const [code, setCode] = useState(PROBLEMS[currProblemId].starterCode.javascript);
    const[output,setOutput]=useState(null)
    const[isRunning,setIsRunning]=useState(false)

   const currProblem=PROBLEMS[currProblemId]
    useEffect(()=>{
     if(id && PROBLEMS[id]){
        setCurrProblemId(id);
        setCode(PROBLEMS[id].starterCode[selectedLanguage]);
        setOutput(null);
     }   
    },[id,selectedLanguage])

    useEffect(()=>{
      // update code when current problem id or selected language changes
      setCode(PROBLEMS[currProblemId].starterCode[selectedLanguage]);
    },[currProblemId, selectedLanguage]);

    const handleLanguageChange=(e)=>{
      const new_lang=e.target.value
      setSelectedLanguage(new_lang)
      setCode(PROBLEMS[currProblemId].starterCode[selectedLanguage]);
      setOutput(null)

    }
      const normalizeOutput = (output) => {
    // normalize output for comparison (ensure string, trim whitespace, handle different spacing)
    const outStr = output == null ? "" : (typeof output === "string" ? output : JSON.stringify(output));
    return outStr
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  }; 
    const handleProblemChange=(id)=>{
      navigate(`/problem/${id}`);
    }
const triggerConfetti=()=>{
      var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
    }
    const checkIfTestsPassed=(actualOutput,expectedOutput)=>{
      const normalizedActualOutput=normalizeOutput(actualOutput);
      const normalizeExpectedOutput=normalizeOutput(expectedOutput)
      return normalizedActualOutput==normalizeExpectedOutput;

    }
    const handleCodeRun=async ()=>{
      setIsRunning(true)
      setOutput(null)
      const result=await executeCode(selectedLanguage,code)
      console.log(result);
      
      setOutput(result)
      setIsRunning(false)
      if(!result.success){
        toast.error("Execution failed")
        return
      }

      const expectedOutput = currProblem.expectedOutput?.[selectedLanguage] ?? currProblem.expectedOutput;
      const testCasePassed = checkIfTestsPassed(result.output, expectedOutput);
      if (testCasePassed) {
        triggerConfetti();
        toast.success("Hurrah! All test cases passed.");
      } else {
        toast.error("Test cases are failing!");
      }
    }

  return (
    <div className='h-screen w-screen flex flex-col bg-base-100'>
    <Navbar/>
    <div className='flex-1'>
    <PanelGroup direction="horizontal">
    <Panel defaultSize={40} minSize={30}>
    {/* left pannel  */}
    <ProblemDescription 
      problem={currProblem}
      currProblemId={currProblemId}
      onProblemChange={handleProblemChange}
      allProblems={Object.values(PROBLEMS)}
    />
    </Panel>
    <PanelResizeHandle className='w-2 bg-base-200 hover:bg-primary transition-col-resize'/>
    {/* Right pannel  */}
    <Panel defaultSize={60} minSize={30}>
    <PanelGroup direction='vertical'>
    <Panel defaultSize={70} minSize={30}>
        <CodeEditorPanel
          selectedLanguage={selectedLanguage}
          code={code}
          isRunning={isRunning}
          onLanguageChange={handleLanguageChange}
          onCodeChange={setCode}
          onRunCode={handleCodeRun}

        />
    </Panel>
    <PanelResizeHandle className='h-2 bg-base-200 hover:bg-primary transition-colors cursor-row-resize'/>
    <Panel defaultSize={30} minSize={30}>
        <OutputPanel output={output}/>
    </Panel>

    </PanelGroup>
    <ProblemDescription
      problem={currProblem}
      currProblemId={currProblemId}
      onProblemChange={handleProblemChange}
      allProblems={Object.values(PROBLEMS)}
    />

    </Panel>
    </PanelGroup>

    </div>
    </div>
  )
}


export default Problem
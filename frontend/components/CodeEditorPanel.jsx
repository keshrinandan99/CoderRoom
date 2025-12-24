import React from 'react'
import Editor from '@monaco-editor/react'
import { Loader2,PlayIcon } from 'lucide-react'
import { LANGUAGE_CONFIG } from '../data/problems'
function CodeEditorPanel({ selectedLanguage,code,isRunning,onLanguageChange,onCodeChange,onCodeRun}) {
  return (
    <div className='h-full flex flex-col h-full bg-base-300 '>
    <div className='flex justify-between items-center px-4 py-3 bg-base-100 border-t border-base-300  '>
    <div className='flex items-center gap-3'>
      <img
        src={LANGUAGE_CONFIG[selectedLanguage].icon}
        alt={LANGUAGE_CONFIG[selectedLanguage].name}
        className='size-6' />
      <select className='select select-sm' value={selectedLanguage} onChange={onLanguageChange}>
        {Object.entries(LANGUAGE_CONFIG).map(([key,lang])=>(
          <option key={key} value={lang}>
            {lang.name}
          </option>
        ))}

      </select>

    </div>
    <button className='btn btn-primary btn-sm gap-2' disabled={isRunning} onClick={onCodeRun}>
      {isRunning?
      <>
      <Loader2 className='size-4 animate-spin'/>
      Running...
      </>:
      <>
      <PlayIcon className='size-4 '/>
      Run

      </>
}
    </button>


    </div>

    </div>
  )
}

export default CodeEditorPanel
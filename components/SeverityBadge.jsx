import React from 'react'

function SeverityBadge({ severity }) {

    if(!severity) {
        return null;
    }

   function colorClasses(s) {
        switch(s) {
            case 'Low' : return 'border-green-500 text-black bg-green-200';
            case 'Medium' : return 'border-yellow-500 text-black bg-yellow-200';
            case 'High' : return 'border-red-500 text-black bg-red-200';
            default : return 'border-green-500 text-black bg-green-200'
        }
    }
  return (
    <div className={`text-sm rounded-full inline-flex px-2 border-2 font-mono ${colorClasses(severity)}`}>
        {severity}
    </div>
  )
}

export default SeverityBadge
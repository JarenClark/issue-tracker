import React from 'react'

function SeverityBadge({ severity }) {

   function colorClasses(s) {
        switch(s) {
            case 'Low' : return 'border-green-500 text-green-500 bg-green-200';
            case 'Medium' : return 'border-yellow-500 text-yellow-500 bg-yellow-200';
            case 'High' : return 'border-red-500 text-red-500 bg-red-200';
            default : return 'border-green-500 text-green-500 bg-green-200'
        }
    }
  return (
    <div className={`text-sm rounded-full py-2 px-4 ${colorClasses(severity)}`}>
        {severity}
    </div>
  )
}

export default SeverityBadge
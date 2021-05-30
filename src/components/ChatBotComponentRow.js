import React, { useState, useEffect } from 'react';

const ChatBotComponentRow = ({
  checked,
  id,
  name,
  trainingData,
  selectData,
  setCheckedData,
  index,
  reply,
  description
}) => {
 
	const [ moreQueries, setMoreQueries] = useState(false);
	const [ isChecked, setIsChecked]= useState(checked);
  
  useEffect((prevProps, prevState) => {
    console.log(prevProps)
    if (prevProps && prevProps.checked !== checked) {}
      setIsChecked(checked);
  },[setIsChecked,checked])
 
  
  selectData=(e)=>{
    console.log('you are here');
    let selectedId=e.target.id;
    setIsChecked(!isChecked);
    setCheckedData(selectedId,!isChecked,index);
  }
  
    return (
      <tr key={`intentList-table-${id}`}>
        <td><input type='checkbox' id={id} checked={isChecked} onChange={(e)=> selectData(e)}/></td>
        <td>
          {name}
        </td>
        <td >
          {description}
        </td>
        <td >
          {!moreQueries && <>
            <h4> {trainingData.expressions[0].text}</h4> 
            <span style={{color:'blue',cursor:'pointer'}} onClick={()=>setMoreQueries(!moreQueries)}>More Query Names....</span> 
          </>}
          {moreQueries &&<>
            {trainingData.expressions.map(({text,id})=>
              <h4 key={id}>{text}</h4>
            )}
            <span style={{color:'blue',cursor:'pointer'}} onClick={()=>setMoreQueries(!moreQueries)}>less Query Names....</span> 
          </> }
        </td>
        <td>
          {reply.text}
        </td> 
      </tr>

    );
}


export default ChatBotComponentRow;
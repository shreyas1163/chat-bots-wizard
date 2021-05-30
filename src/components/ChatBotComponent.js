import React, { useState } from 'react';
import {intentsList} from '../assests/intents';
import ChatBotComponentRow from './ChatBotComponentRow'
import { Container, Row, Col, Button } from 'react-bootstrap';

const ChatBotComponent = () => {
 
	const [ intentData, setIntentData] = useState(intentsList);
	const [ hideData, setHideData] = useState(false);
	const [ selectedData, setSelectedData]= useState([]);
	const [ isChecked, setIsChecked]= useState(false);

  const nextStep = (e) => {
    e.preventDefault();
    setHideData(false);
  }

  const deSelectQuery = (e) => {
    let data = intentsList.map((intentDetails)=>{
      let changedData={...intentDetails};
      changedData.selected=false;
       return {...changedData}
    })
		setSelectedData([]);
		setIntentData([...data]);
  }

  const selectQuery = (e) => {
    console.log('you are here');
    // setIsChecked(false);
      if(isChecked) {
       let data = intentsList.map((intentDetails)=>{
         let changedData={...intentDetails};
         changedData.selected=true;
          return {...changedData}
        })
        setSelectedData((prevState)=>{
          return [...data];
        })
        setIntentData((prevState)=>{
          return [...data];
        })
      } else {
        let a=[];
        let data = intentsList.map((intentDetails)=>{
          let changedData={...intentDetails};
          changedData.selected=false;
           return {...changedData}
         })
        setSelectedData([...a]);
        setIntentData([...data]);
      }
  }

  const setSelectedIntent=(selectedId,checkedValue,index)=> {
    if(checkedValue)
    {
      let idExists = selectedData.filter((selectedData)=>{
        return (selectedData.id === selectedId)
      });
      
      if(idExists.length === 0) {
        
        let selectId=intentData.findIndex((intentDetails)=>{return intentDetails.id ===  selectedId});
        let intentArray= intentData;
        intentArray[selectId].selected = !intentArray[selectId].selected;
        setSelectedData([...selectedData,intentData[index]]);
        console.log(intentData);
        setIntentData({...intentsList,intentArray});
        console.log()
        if(selectedData.length === intentData.length) {
         setIsChecked(true);
        }
      }
    } else {
      let removeSelectedId=selectedData.filter((selectedData) => { return selectedData.id !== selectedId });
      let deselectId=intentData.findIndex((intentDetails)=>{return intentDetails.id ===  selectedId});
      let intentArray= intentData;
      intentArray[deselectId].selected= !intentArray[deselectId].selected  ;
      setSelectedData((prevState)=>{
        return [...removeSelectedId];
      })
      if(selectedData.length === intentData) {
        setIsChecked(true);
      }
      setIntentData((prevState)=>{
        return [...intentArray];
      })
    } 
  }

    return (
      <Container fluid>
        <Row>
          <Col>
            <h3 style={{'textAlign':'center'}}> Welcome to Personalized Chat Bot Creator</h3>
            <h4 style={{'textAlign':'center'}}> Some of the in-built  Queries available in the Application </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}  >
            <h3>Step 1 </h3>
           <Button type='submit' className="pull-right" size="lg">Next Step</Button>
          </Col>
        </Row>
        <Row style={{'marginTop':'10px'}}>
          <Col xs={6} md={6}>
            <div className='scrollable-table'>
              <table className='table table-bordered table-responsive'>
                <thead>
                  <tr>
                    <th>Select <input type='checkbox' onChange={(e)=>{selectQuery(e)}} checked={isChecked === true}/></th>
                    <th>Query Names </th>
                    <th>Query Description </th>
                    <th>Query Samples </th>
                    <th>Query Response </th>
                  </tr>
                </thead>
                <tbody>
                
                {intentData && intentData.map(({id, description, name, trainingData,reply,selected },index) => (
                  <ChatBotComponentRow key={id} id={id} description={description} name={name} trainingData={trainingData} reply={reply} checked={selected} setCheckedData={setSelectedIntent} index={index}/>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>

          <Col xs={6} md={6}>
            {selectedData.length>0 &&
              <div className='scrollable-table'>
                <table className='table table-bordered table-responsive'>
                  <thead>
                    <tr>
                      <th>Select <input type='checkbox' onChange={(e)=>{deSelectQuery(e)}} defaultChecked={true}/></th>
                      <th>Query Names </th>
                      <th>Query Description </th>
                      <th>Query Samples </th>
                      <th>Query Response </th>
                    </tr>
                  </thead>
                  <tbody>
                  {selectedData}
                  </tbody>
                </table>
              </div>
            }
            {
              (selectedData.length === 0) &&
                <h1>
                  Please Select Queries on the left side 
                </h1>
            }
          </Col>
        </Row>
      </Container>  
    );

}


export default ChatBotComponent;
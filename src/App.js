// import logo from './logo.svg';
import React,{useState, useEffect} from 'react';
import {postData, getData } from './requestservices';
import './App.css';

function App() {
  
    const [data, setData] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [callerId,setCallerId] = useState('');
    const [callerName,setCallerName] = useState('');
    const [fieldKey, setFieldKey] = useState('');
    const [fieldValue, setFieldValue] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const res = await getData('getcalllist');
        
        console.log(res);
        setData(res);
        console.log("data>><"+JSON.stringify(data));
        console.log("data[0]>><"+Object.keys(data[0]));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    
  },[]);

  function handleSelectChange (event) {
    console.log('value'+event.target.value);
    setSelectedValue(event.target.value);
  }
  function handleInputChange(event){
    console.log('input>>'+event.target.value);
    setInputValue(event.target.value);
    if(selectedValue === 'callerId'){
      setCallerId(event.target.value);
    }else if(selectedValue === 'callerName'){
      setCallerName(event.target.value);
    }
  }
  
  async function handleClick(){
    try
    {const res = await postData('getfilteredcalls',{"callerId":`${callerId}`,"callerName":`${callerName}`});
    console.log('res..'+res);
    setData(res);}
    catch (error){
      console.log(error.message);
    }
  }

  function handleKeyChange (event){
    console.log('event.target.value'+event.target.value);
    setFieldKey(event.target.value);
  }

  function handleValueChange (event){
    console.log('event.target.value'+event.target.value);
    setFieldValue(event.target.value);
  }

  async function handleClick2(){
    try
    {const res = await postData('getfilteredcalls',{"callerId":`${callerId}`,"callerName":`${callerName}`});
    console.log('res..'+res);
    setData(res);}
    catch (error){
      console.log(error.message);
    }
  }
  return (
    <div >
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="callerId">callerId</option>
        <option value="callerName">callerName</option>
      </select>
      <p>Filter:</p>
      <p>callerId:{callerId}</p>
      <p>callerName:{callerName}</p>
      <input 
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Filter Value'/>
      <button onClick={handleClick}>Filter</button>
      <br/>
      <input 
        type='text'
        value={fieldKey}
        onChange={handleKeyChange}
        placeholder='Add Field Name'/>
      <p>:</p>
      <input 
        type='text'
        value={fieldValue}
        onChange={handleValueChange}
        placeholder='Add Field Value'/>
        <button onClick={handleClick2}>Add Field</button>
            {!data || data === 0? 
        <p>No data available</p>
       : 
        <table>
          <thead>
             <tr>              
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr> 
          </thead>
          <tbody>
              {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}  
          </tbody>
        </table>
      }
    </div>
  );
}

export default App;

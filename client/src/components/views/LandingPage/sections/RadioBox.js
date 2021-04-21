import React,{useState} from 'react'
import {Radio,Collapse} from 'antd'
const {Panel} = Collapse;




function RadioBox(props) {
   const [RadioValue,SetRadioValue] = useState('0')
   const renderRadioboxList = () => (
    props.list && props.list.map((value)=>(
       <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
    )))

    const handleChange = (event)=>{
       SetRadioValue(event.target.value)
       props.handleFilters(event.target.value)
    }
   
   
   
    return (
        <div>
        <Collapse defaultActiveKey={['0']}>
        <Panel header="price" key="1">
        <Radio.Group onChange={handleChange}
        value={RadioValue}>
        {renderRadioboxList()}
        </Radio.Group>
        </Panel>
        </Collapse>
            
        </div>
        
    )
}

export default RadioBox


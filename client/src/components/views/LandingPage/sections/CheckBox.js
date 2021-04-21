import React,{useState} from 'react'
import {Checkbox,Collapse} from 'antd'

const {Panel} = Collapse;


function CheckBox(props) {
      
    const [Checked,SetChecked] = useState([])
 
 
    const handleToggle=(value)=>{
       const currentIndex = Checked.indexOf(value);
       const newChecked = [...Checked]
       console.log('currentindex is',currentIndex)
       console.log('newCheckedis',newChecked)

       if (currentIndex=== -1){
           newChecked.push(value)
       } else
       {
           newChecked.splice(currentIndex,1)
       }
       SetChecked(newChecked)
       props.handleFilters(newChecked)
  }
   
const renderCheckboxList = () => 
    props.list && props.list.map((value,index)=>(
        <React.Fragment key={index}>
        <Checkbox
         onChange={()=>handleToggle(value._id)}
        type='checkbox'
        checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span> {value.name}</span>
        </React.Fragment>
    ))

      
    return (
        <div>
        <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
        {renderCheckboxList()}
        </Panel>
        </Collapse>
            
        </div>
    )
}

export default CheckBox


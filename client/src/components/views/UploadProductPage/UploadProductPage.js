import React,{useState} from 'react';
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const continent = [
    {key:1,value:'Africa'},
    {key:2,value:'Asia'},
    {key:3,value:'Europe'},
    {key:4,value:'Australia'},
    {key:5,value:'Antartica'},
    {key:6,value:'North America'},
    {key:7,value:'South America'}
]

function UploadProductPage(props) {
console.log('the propsuddser',props)
    const [TitleValue,setTitleValue] = useState('')
    const [DescriptionValue,setDescriptionValue] = useState('')
    const [PriceValue,setPriceValue] = useState ('')
    const [ContinentValue,setContinentValue] = useState(1)
    const [images,setImages]=useState([])
    
    
    const onTitleChange=(event)=>{
        setTitleValue(event.currentTarget.value);
    }
    const onDescriptionChange=(event)=>{
        setDescriptionValue(event.currentTarget.value);
    }
    const onPriceChange=(event)=>{
        setPriceValue(event.currentTarget.value);
    }
    const onContinentChange=(event)=>{
        setContinentValue(event.currentTarget.value);
    }

    const updateImages = newImages =>{
        console.log('newimage is',newImages)
        setImages(newImages)
    }


    const onSubmit = (event) =>{
        event.preventDefault();
        if (!TitleValue || !DescriptionValue || !PriceValue || !images || !ContinentValue){
           return alert('Please Enter all Information')
        }
       
   const variables = {
   write:props.user.userData._id,
   title:TitleValue,
   description:DescriptionValue,
   price:PriceValue,
   images:images,
   continents:ContinentValue,
}
       
         Axios.post('/api/product/uploadProduct',variables)
        .then(response =>{
            if(response.data.success){
                alert('product successfully upload')
                props.history.push('/');

            }else {
                alert('failed to upload product');
            }
        
        })
    }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <Title level={2}>Upload Travel Product</Title>
        
        
        </div>
        <Form onSubmit={onSubmit} >
    {/*dropzone*/}
    <FileUpload refreshFunction={updateImages}/>

        <br />
        <br />
       <label>Title</label>
        <Input onChange ={onTitleChange}
               value={TitleValue}
        />
        
        
        
        
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange}
                  value={DescriptionValue}
                  />
        <br />
         <br />
         <label>Price</label>
         <Input onChange={onPriceChange}
                value={PriceValue}
                type="number"
                  />
                  <select onChange={onContinentChange}> {continent.map(item=> (
                  <option key ={item.key}value={item.key}>{item.value} </option>
                  ))}
                  </select>
                  <br />
                  <br />
                  <Button onClick={onSubmit}>submit</Button>

        
        </Form>
            
        </div>
    )
}

export default UploadProductPage


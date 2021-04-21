import React from 'react';
import {Carousel} from 'antd'


function ImageSlider(props) {   
  
  return (
      <div>
      
      {props.images.map((image,index)=>(
      <div key={index}>
     <img style={{width:'100%',maxHeight:'150px'}} src={`http://localhost:5000/${image}`} alt='productImage' />
      </div>
        ))}
        

      

        </div>
        
        

      
        
            
        
    )
   
}
 
export default ImageSlider

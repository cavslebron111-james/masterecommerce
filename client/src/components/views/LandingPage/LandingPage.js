import React,{ useEffect,  useState } from 'react';
import CheckBox from './sections/CheckBox';
import RadioBox from './sections/RadioBox';
import { FaCode, FaUserSlash } from "react-icons/fa";
import {Icon, Card,Col,Row} from 'antd';
import Axios from 'axios';
//import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import SearchFeature from './sections/SearchFeature';

import {price,continents} from './sections/datas'
const {Meta} = Card;
function LandingPage() {
   const [Products,SetProducts] = useState([])
   const [Skip,SetSkip] = useState(0)
   const [Limit,SetLimit]= useState(8)
   const [PostSize,SetPostSize] = useState(0)
   const [SearchTerms,SetSearchTerms] = useState("")

   const [Filters,SetFilters] = useState({
       continents:[],
       price:[]
   })
   

    useEffect(() => {
        const variables = {
            skip:Skip,
            limit:Limit,
        }
        getProducts(variables)
       
         },[])
const getProducts = (variables) => {
    Axios.post('/api/product/getProducts',variables)
    .then(response=>{
        if(response.data.success){
            if(variables.loadMore){
                SetProducts([...Products,...response.data.products])
            } else {
                SetProducts(response.data.products)
            }
    
    SetPostSize(response.data.PostSize)
    console.log('the Products all is',[...response.data.products])
        }else {
            alert('failed to fetch product data')
        }
    })
}
   
  
    const onLoadMore = ()=>{
      let skip = Skip + Limit
      const variables = {
          skip:skip,
          limit:Limit,
          loadMore:true
      }
      getProducts(variables);
      SetSkip(skip);
    }
  
  
  
    const renderCards = Products.map((product,index)=>{
       return <Col lg={6} md={8} xs={24} key={index}>
               <Card 
                hoverable={true}
               cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}  /></a>}
               >
               <Meta
               title={product.title}
               description={`$${product.price}`}
               />
               </Card>
       
       
       </Col>
   })

   const showFilteredResults=(filters)=>{
    const variables = {
        skip:0,
        limit:Limit,
        filters:filters
    }
    getProducts(variables)
    SetSkip(0)

   }
     const handlePrice=(value)=>{
        const data = price;
        let array=[];
        for(let key in data){
            console.log('key is',key)
            console.log('value is',value)
            if(data[key]._id === parseInt(value,10)){
                array=data[key].array
            }
        }
        console.log('array',array)
        return array
    }

   const handleFilters=(filters,category)=>{
        console.log('filter is ' ,filters)
        const newFilters = {...Filters}
        newFilters[category] = filters
        if(category === 'price'){
            let priceValues=handlePrice(filters)
            newFilters[category] = priceValues
            console.log('newfilterscagetoryis',newFilters['continents'])
        }
        console.log('newfilteris',newFilters)
        console.log('categoryis',category)
        showFilteredResults(newFilters)
        SetFilters(newFilters)
       
   }

   const updateSearchTerm=(newSearchTerm)=>{
       
       console.log('newsearch',newSearchTerm)
       const variables = {
        skip:0,
        limit:Limit,
        filters:Filters,
        searchTerm:newSearchTerm
    }
   
    SetSearchTerms(newSearchTerm)
    getProducts(variables)
        SetSkip(0)
      
    
}

            
   
    return (
        <div style={{width:'75%',margin:'3rem auto',}}>
        <div style={{textAlign:'center'}}>
        <h2>Lets Travel Anywhere <Icon type='rocket' /> </h2>
</div>
       <Row gutter={[16,16]}>
       <Col lg={12} xs={24}>
       {/* Filter  */}
       <CheckBox list={continents}
       handleFilters={filters=>
        handleFilters(filters,'continents')}/>
       </Col >
       <Col lg={12} xs={24}>
       
        <RadioBox list={price}
        handleFilters={filters=>
            handleFilters(filters,'price')}/>
       </Col>
       </Row>
        {/* Search */}
        <div style={{display:'flex',justifyContent:'flex-end',margin:'1rem auto'}}>
        <SearchFeature refreshFunction={updateSearchTerm} />
        </div>


        
        
        {Products.length === 0 ?
        <div style={{display:'flex',height:'300px',justifyContent:'center',alignItems:'center'}}>
        <h2>No Post Yet</h2>
        </div> :
        <div>
              <Row gutter={[16,16]}>
            
              {renderCards}
              </Row>



        </div>
        
        }
       <br />  <br />
       {PostSize >= Limit &&
        <div style={{display:'flex',justifyContent:'center'}}>
        <button onClick={onLoadMore}>load more</button>
        </div>
         }
        
        </div>
    )
}

export default LandingPage

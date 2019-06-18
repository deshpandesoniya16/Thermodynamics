import React, { Component } from "react";
import styled from "styled-components";

class RawCarousel extends Component {
    state={
        images: this.props.imageData,
        selectedImage: "",
        index: 1 
    }

    //  componentDidMount(){

    //      if(this.state.images.length > 0){

    //          let imageArr = []
    //         this.state.images.map(i=>{
    //     if(i.link){
    //         imageArr.push(i.link)

    //     }
    //         })
           
    //         console.log("Image arr is in if",imageArr)
    //         this.setState({images:imageArr})
    //     }else{
            
    //         console.log("Image arr is in else",this.state.images)
    //        // this.setState({images:this.props.imageData})
    //     }
    // }

    previous = () => {
        this.setState({index:this.state.index-1})
    }

    next = () => {
        this.setState({index:this.state.index+1})
    }

    setFirstImage = () => {
        this.setState({selectedImage: this.props.imageData[0]})
    }

    fixIndex = () => {
        this.setState({index: this.state.images.length})
    }


    render(){

        const images = this.props.imageData || []
        
        // console.log("Selected Image URL", this.state)
         console.log("Carousel Props", this.props.imageData)
        //  let temp = this.props.imageData
        //  console.log("Temp",temp)
        
        let index = 0
        const length = images.length>0 && images.length
        // console.log("Length", length)
        if(length>0 && length<this.state.index){
            index = length
            this.fixIndex()
            
            
            // this.state.image.map(i=>{
            //     if(i.link)

            // })
        } else {
            index = this.state.index
        }
        
        // if(this.props.imageData.length>0){
        //     console.log("run this",this.props.imageData[0]['link'])
        // }    
      
        
        if(!this.state.selectedImage && this.state.length){
            this.setFirstImage()
        }

        let noPhotos = !(length > 0)

        let previousDisabled = (length == 0 || index < 2)
        let nextDisabled = (length == 0 || index == length)

        return (
            <div style={{height:280, display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Button disabled={previousDisabled} onClick={this.previous}>{"<"}</Button>
            <div style={{flex:1, display: "flex", justifyContent:"center"}}>
            {noPhotos?(<span>No photos to show</span>):(
                <img style={{maxWidth:"100%", maxHeight:280}} height={"100%"} src={images[index-1].link}/>
            )}
            </div>
            <Button disabled={nextDisabled} onClick={this.next}>{">"}</Button>
            </div>
        )
    }


}

const Button = styled.button`
border:none;
background:#eee;
font-size:22px;
color:${props=>props.disabled?"#9E9E9E":"#000"};
`

export default RawCarousel
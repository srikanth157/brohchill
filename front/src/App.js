import React from 'react'
import  axios,{ post } from 'axios';

class App extends React.Component {
state={file:null,imagesList:[],isImagesStored:false}

  onFormSubmit=(event)=>{
    event.preventDefault()
    const url = 'http://localhost:4040/upload';
    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    post(url, formData, config)
      .then((response) => {
        console.log(response.data);
      })
      
  }

  onChange=(event)=> {
    this.setState({ file: event.target.files[0]})
  }

  getImages=()=>{
    const{imagesList}=this.state
    axios.get("http://localhost:4040/brohchil").then((response)=>{
      console.log(response.data.rows[0])
      const data= response.data.rows[0]
      this.setState({imagesList:[...imagesList,data]})
    })
  }

  render() {
    const {imagesList,isImagesStored}=this.state
    console.log(imagesList)
    return (
      <>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange}/>
        <button type="submit">Upload</button>
      </form>

      <div>
        <button type='button' onClick={this.getImages}>show images</button>
        <ul>
          {imagesList.map((each,key)=>(
            <li><img src={`${each.img_src}`} /></li>
          ))}
        </ul>
      </div>
      </>
   )
  }
}
export default App
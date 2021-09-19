import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import BestBooks from './components/BestBooks';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:[],
      showData:false
    }
  }
  
  componentDidMount=()=>{
    axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/books`).then(response=>{
      this.setState({
        data:response.data
      })
     if(this.state.data.length>0){
      this.setState({
        showData: true
      })
     }
     console.log(this.state.data)
    })
  }


  render() {
    return (
      <div>
         <h1 className="text-warning bg-secondary text-center"> Can of Books</h1>
      { this.state.showData && <BestBooks data={this.state.data} />}
      {!this.state.showData && <Alert variant="warning">
            book collection is empty.
          </Alert>}
      </div>
    )
  }
}

export default App

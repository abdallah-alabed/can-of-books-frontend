import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class BestBooks extends Component {
    
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <br />
          <br />
          <Carousel>
            {this.props.data.map((e) => {
              return (
                <Carousel.Item interval={5000}>
                  <img
                    className=" w-100"
                    src="https://images.template.net/wp-content/uploads/2016/04/20062817/Book-Icon-Illustration-Download.jpg"
                    alt="First slide"
                  />
                  <br/>
                  <br/>
                  <Carousel.Caption>
                    <h3 className="text-primary">Book Title:{e.title}</h3>
                    <p className="text-primary"> Book Description: {e.description}</p>
                    <p className="text-primary"> Book ID: {e._id}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
          
        </div>
      </div>
    );
  }
}

export default BestBooks;

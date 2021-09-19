import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'


class BestBooks extends Component {


    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="w-50" >
                    <br />
                    <br />
                    <Carousel>
                        {
                            this.props.data.map(e => {
                                return (

                                    <Carousel.Item interval={1000}>
                                        <img
                                            className=" w-100"
                                            src="https://ak.picdn.net/shutterstock/videos/1058773627/thumb/10.jpg"
                                            alt="First slide"
                                        />
                                        <br />
                                        <br />
                                        <br />
                                        <Carousel.Caption>
                                            <h3 className="text-warning">{e.title}</h3>
                                            <p className="text-warning">{e.description}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })}
                    </Carousel>
                </div>
            </div>

        )
    }
}



export default BestBooks

import React from 'react'
import { Carousel } from 'react-bootstrap';

function Slider() {
  return (
    <>
    <Carousel >
  <Carousel.Item style={{ height: '600px' }}>
    <img
      style={{ height: '100%', width: '100%', objectFit: 'auto' }}
      className="d-block"
      src="https://shorturl.at/GTMwh"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First Slide Label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{ height: '600px' }}>
    <img
      style={{ height: '100%', width: '100%', objectFit: 'auto' }}
      className="d-block"
      src="https://shorturl.at/YwGdp"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second Slide Label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{ height: '600px' }}>
    <img
      style={{ height: '100%', width: '100%', objectFit: ' auto' }}
      className="d-block"
      src="https://shorturl.at/YCtfF"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third Slide Label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </>
  )
}

export default Slider
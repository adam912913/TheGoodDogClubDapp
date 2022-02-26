import Carousel from 'react-multi-carousel';
import { Row, Col } from 'react-bootstrap'
import SellerItem from './SellerItem';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1320 },
    items: 9
  },
  desktop: {
    breakpoint: { max: 1320, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  return <button className='carousel_left_arrow' onClick={() => onClick()}><i className="arrow left"></i></button>;
};
const CustomRightArrow = ({ onClick, ...rest }) => {
  return <button className='carousel_right_arrow' onClick={() => onClick()}><i className="arrow right"></i></button>;
};

const TopSellers = ({ children }) => {
  return (
    <section className='top_sellers'>
      <Row>
        <Col md={12}>
          <h2 className='content_title plr-10'>Top Seller</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className='carousel_wrapper'>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .8"
              transitionDuration={500}
              containerClass="carousel-container"
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px plr-10"
              className="latest_nfts_carousel"
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => {
                return (
                  <div className="slider_item" key={index}>
                    <SellerItem key={index}></SellerItem>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default TopSellers;
import Carousel from 'react-multi-carousel';
import { Row, Col } from 'react-bootstrap'
import AuctionItem from "./AuctionItem";
import { LIVE_ACTION_LIST } from "../config/constants";

const picks_responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1321 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1320, min: 1025 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 601 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
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

const LiveAuctions = ({ children }) => {

  return (
    <section className='actions'>
      <Row>
        <Col md={12}>
          <h2 className='content_title plr-10'>Live Actions</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className='carousel_wrapper'>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={picks_responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={50000}
              keyBoardControl={true}
              customTransition="all .8"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-20-px plr-10"
              className="latest_nfts_carousel"
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
            >
              {LIVE_ACTION_LIST.map((item, index) => {
                return (
                  <div className="slider_item" key={index}>
                    <AuctionItem data={item}></AuctionItem>
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

export default LiveAuctions;
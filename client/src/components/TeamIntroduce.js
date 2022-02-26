import { useState } from "react";
import Carousel from 'react-multi-carousel';
import { Row, Col } from 'react-bootstrap'

import team_introduce from '../assets/img/team_introduce.png';
import { TEAM_MEMBER_LIST } from "../config/constants";

const TeamCarouselLeftArrow = ({ onClick, ...rest }) => {
  return <button className='carousel_left_arrow tc_arrow team_carousel_left_arrow' onClick={() => onClick()}><i className="arrow left"></i></button>;
};
const TeamCarouselRightArrow = ({ onClick, ...rest }) => {
  return <button className='carousel_right_arrow tc_arrow team_carousel_right_arrow' onClick={() => onClick()}><i className="arrow right"></i></button>;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1321 },
    items: 4
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

const TeamIntroduce = ({ children }) => {
  const [team_members] = useState(TEAM_MEMBER_LIST);

  return (
    <section className='team_introduce' id="team_introduce">
      <div className='logo_wrapper'>
        <img alt='' src={team_introduce} />
        <p className='shot_description'>The Ones Who Are Making Everything Happen.</p>
      </div>
      <Row className='team_carousel'>
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
              autoPlaySpeed={50000}
              keyBoardControl={true}
              customTransition="all .8"
              transitionDuration={1000}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-20-px plr-10"
              className="latest_nfts_carousel"
              customLeftArrow={<TeamCarouselLeftArrow />}
              customRightArrow={<TeamCarouselRightArrow />}
            >
              {team_members.map((item, index) => {
                return (
                  <div className="slider_item" key={index}>
                    <div className='member_item'>
                      <img alt='' src={item.avatar} />
                      <h3>{item.name}</h3>
                      <p>{item.role}</p>
                    </div>
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

export default TeamIntroduce
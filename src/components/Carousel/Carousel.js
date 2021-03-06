import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';
import Phone from '../Phone';
import Television from '../Television';
import Secrets from '../Secrets';
import { carouselContent } from '../../util/constants';
import Swipeable from 'react-swipeable';

class Carousel extends Component {
  state = {
    currentContent: 0,
    intervalId: null,
    isUsingCarousel: false
  }

  static propTypes = {
    isSecret: PropTypes.bool
  }

  componentDidMount() {
    const intervalId = setInterval(this.handleCarouselTiming, 5000);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleCarouselTiming = () => {
    const { currentContent, isUsingCarousel } = this.state;

    if (!isUsingCarousel) {
      currentContent < (carouselContent[0].images.length - 1)
        ? this.setState({ currentContent: currentContent + 1 })
        : this.setState({ currentContent: 0 });
    }
  }

  handleCarouselClick = (index) => {
    this.setState({ 
      currentContent: index,
      isUsingCarousel: true
    });
  }

  handleCarouselArrowClick = (direction) => {
    const { currentContent } = this.state;
    const contentLimit = carouselContent[0].images.length - 1;

    this.setState({ isUsingCarousel: true });

    if (currentContent === 0 && direction === 'left') {
      this.setState({ currentContent: contentLimit });
    } else if (currentContent === contentLimit && direction === 'right') {
      this.setState({ currentContent: 0 });
    } else if (direction === 'left') {
      this.setState({ currentContent: currentContent - 1 });
    } else if (direction === 'right') {
      this.setState({ currentContent: currentContent + 1 });
    }
  }

  swiped = (e, deltaX) => {
    deltaX < 0 ? this.handleCarouselArrowClick('right') : this.handleCarouselArrowClick('left');
  }

  render() {
    const { currentContent } = this.state;
    const { isSecret, bgCarousel, gamesCarousel } = this.props;

    if (isSecret) {
      return (
        <Secrets 
          currentContent={currentContent} 
          onCarouselClick={this.handleCarouselClick} 
        />
      );
    }

    return (
      <Fragment>
        {bgCarousel &&
          <div className='bg-carousel-container'>
            <i 
              onClick={() => this.handleCarouselArrowClick('left')}
              className='fas fa-chevron-left' 
            />
            <img
              src={`/assets/${carouselContent[0].images[currentContent]}-logo.png`} 
              alt={carouselContent[0].images[currentContent]}
            />
            <i 
              onClick={() => this.handleCarouselArrowClick('right')}
              className='fas fa-chevron-right' 
            />
          </div>}
        <div className='carousel-container'>
          <div className='tv-phone-container'>
            <Swipeable onSwiped={this.swiped}>
              <Television currentImage={carouselContent[0].images[currentContent]} />
            </Swipeable>
            <Phone currentImage={carouselContent[0].images[currentContent]} />
          </div>
          <div className='dot-container'>
            {carouselContent[0].images.map((image, index) => (
              <div
                key={index}
                className={`dot ${currentContent === index ? 'dot-selected': ''}`}
                onClick={() => this.handleCarouselClick(index)} 
              />
            ))}
          </div>
          <p className='carousel-copy'>
            {gamesCarousel ? carouselContent[0].gamesCopies[currentContent] : carouselContent[0].copies[currentContent]}
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Carousel;

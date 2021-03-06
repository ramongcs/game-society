import React from 'react';
import './Games.css';
import Carousel from '../Carousel';
import BackgroundCopy from '../BackgroundCopy';
import { Element } from 'react-scroll';

const Games = () => (
  <Element name='games' className='element'>
    <BackgroundCopy bgCopy='Our Games' patternBg />
    <section className='section-game-one'>
      <Carousel bgCarousel gamesCarousel />
    </section>
  </Element>
);

export default Games;
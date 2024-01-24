import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

export default function Carousel({ children }: { children: JSX.Element[] }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return <Slider {...settings}>{children}</Slider>
}

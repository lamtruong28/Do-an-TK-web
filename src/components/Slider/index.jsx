import './slider.css';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from './images/image-1.webp';
import images_2 from './images/image-2.webp';
import images_3 from './images/image-3.webp';
import images_4 from './images/image-4.webp';
import images_5 from './images/image-7.webp';
import images_6 from './images/image-10.webp';
import images_7 from './images/image-12.webp';
import images_8 from './images/image-14.webp';

export default function () {
    const UrlImage = [
        images,
        images_2,
        images_3,
        images_4,
        images_5,
        images_6,
        images_7,
        images_8
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section>
            <div className='Slider_images pt-32 container'>
                <div className='Slider_images-slick'>

                    <Slider {...settings}>
                        {
                            UrlImage.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div style={{
                                            background: `url(${item}) center center / cover no-repeat `,
                                            paddingTop: 500,
                                        }}
                                            className='rounded'
                                        >
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>

                </div>
            </div>
        </section>
    )
}


import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards"; // Your card component

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book"); // Adjust the endpoint if necessary
        const data = res.data.filter((item) => item.category.toLowerCase() === "free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,  // Show 3 cards at once
    slidesToScroll: 1,  // Scroll 1 card at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto p-4">
      <h1 className="font-semibold text-2xl pb-4">Free Offered Books</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium veritatis alias pariatur ad dolor.</p>
      
      <Slider {...settings}>
        {book.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </Slider>
    </div>
  );
}

export default Freebook;

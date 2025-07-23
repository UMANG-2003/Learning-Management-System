import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoPlay() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const companies = [
    { src: "/microsoft.png", alt: "Microsoft" },
    { src: "/Walmart.png", alt: "Walmart" },
    { src: "/Adobe.png", alt: "Adobe" },
    { src: "/PayPal.png", alt: "PayPal" },
    { src: "/Accenture.png", alt: "Accenture" },
    { src: "/Tcs.png", alt: "TCS" },
  ];

  return (
    <>
      <h1 className="text-gray-500 mt-20">Trusted by learners from</h1>
      <div className="slider-container w-full max-w-6xl mx-auto px-4 py-8">
        <Slider {...settings}>
          {companies.map((company, idx) => (
            <div
              key={idx}
              className="w-8 h-8 max-md:w-5 max-md:h-5 flex items-center justify-center"
            >
              <img
                src={company.src}
                alt={company.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default AutoPlay;

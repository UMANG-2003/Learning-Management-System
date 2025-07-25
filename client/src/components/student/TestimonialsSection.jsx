import React from "react";
import { AppContext } from "../../context/AppContext";
import { dummyTestimonial} from "../../assets/assets";
function TestimonialsSection() {
     
  return (
    <div className="pb-14 px-8 md:px-0 md:mx-20 mt-20">
      <h2 className="text-3xl font-medium text-gray-400">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Here are some testimonials from our students
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-500 pb-6 rounded-lg  overflow-hidden  bg-gray-50 "
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-gray-800 font-semibold">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="p-5 pb-7">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <img
                    src={
                      index < Math.floor(testimonial.rating)
                        ? "https://pngimg.com/d/star_PNG41507.png"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
                    }
                    className="w-3.5 h-3.5"
                    alt="Star"
                    key={index}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-5">{testimonial.feedback}</p>
            <a href="#" className="text-blue-500 hover:underline float-right">read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSection;



import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaBox, FaClock, FaStar, FaStore, FaShieldAlt } from "react-icons/fa";

const ProductsCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12">
        <ul className="flex justify-start gap-2 md:gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="h-1 w-4 md:w-6 bg-white/20 rounded-full transition-all hover:bg-indigo-500 slick-active:bg-indigo-500 slick-active:w-8 md:slick-active:w-12" />
    ),
  };

  if (isLoading) return null;
  if (error)
    return (
      <div className="p-8">
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      </div>
    );

  return (
    <div className="w-full h-full overflow-hidden bg-[#0a0a0c]">
      <Slider {...settings}>
        {products.map(
          ({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            countInStock,
          }) => (
            <div key={_id} className="relative group outline-none">
              {/* Cinematic Background Image - Adjusted Heights for Mobile */}
              <div className="relative h-[32rem] sm:h-[35rem] md:h-[40rem] xl:h-[45rem] overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover grayscale-[10%] brightness-[0.4] transition-transform duration-[10s] ease-linear group-hover:scale-110"
                />
                {/* Brand Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
              </div>

              {/* Float Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 xl:p-20">
                {/* Product Label */}
                <div className="flex items-center gap-3 mb-4 md:mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
                  <div className="h-[2px] w-6 md:w-8 bg-pink-500" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[3px] md:tracking-[4px] text-pink-500">
                    Trending Now
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-10 mb-8 md:mb-0">
                  {/* Left Info: Name & Price */}
                  <div className="flex-1 max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-none italic">
                      {name.split(" ").slice(0, 2).join(" ")}
                      <br />
                      <span className="text-indigo-500 not-italic">
                        {name.split(" ").slice(2).join(" ")}
                      </span>
                    </h2>

                    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                      <span className="text-xl md:text-3xl font-black text-white tracking-tighter">
                        ${price?.toLocaleString()}
                      </span>
                      <div className="h-4 md:h-6 w-[1px] bg-slate-800" />
                      <p className="text-slate-500 text-[10px] md:text-sm font-medium line-clamp-1 md:line-clamp-2 max-w-[150px] md:max-w-xs leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <Link
                      to={`/product/${_id}`}
                      className="inline-flex items-center justify-center bg-indigo-600 px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[2px] text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] active:scale-95"
                    >
                      View Product
                    </Link>
                  </div>

                  {/* Right Data: Hidden on Mobile/Tablet to keep it clean */}
                  <div className="hidden lg:grid grid-cols-2 gap-4 p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 min-w-[320px]">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Manufacturer
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-xs">
                        <FaStore className="text-indigo-400" /> {brand}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Released
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-xs">
                        <FaClock className="text-indigo-400" />{" "}
                        {moment(createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Availability
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-xs">
                        <FaBox className="text-indigo-400" />{" "}
                        {countInStock > 0
                          ? `${countInStock} Units`
                          : "Out of Stock"}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Rating
                      </p>
                      <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
                        <FaStar /> {rating} / 5.0
                      </div>
                    </div>
                    <div className="col-span-2 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                          <FaShieldAlt /> Official Store Item
                        </span>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                          {numReviews} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </Slider>
    </div>
  );
};

export default ProductsCarousel;

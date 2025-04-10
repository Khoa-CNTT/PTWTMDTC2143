import Rating from "@mui/material/Rating";
import { Breadcrumbs, Button } from "@mui/material";
import React, { useRef } from "react";
import { FaHome } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { emphasize, styled } from "@mui/material/styles";
// import Slider from "react-slick";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { LuFolderCheck } from "react-icons/lu";
import { TfiHandPointLeft } from "react-icons/tfi";
import AvatarUser from "../../components/AvatarUser/avatarUser";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails: React.FC = () => {
  const productSliderBig = useRef<Slider>(null);
  const productSliderSml = useRef<Slider>(null);

  const goToSlide = (index: number) => {
    if (productSliderBig.current) {
      productSliderBig.current.slickGoTo(index);
    }
  };

  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="right-content w-full">
        <div className="shadow border-0 w-full flex flex-row p-4">
          <h5 className="mb-0">Product List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Products"
              component="a"
              href="/products"
              deleteIcon={<MdExpandMore />}
            />
            <StyledBreadcrumb
              label="Product View"
              deleteIcon={<MdExpandMore />}
            />
          </Breadcrumbs>
        </div>

        <div className="productDetailsSection shadow">
          <div className="flex flex-wrap">
            <div className="w-full md:w-5/12">
              <div className="slideWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Gallery</h6>
                <Slider
                  className="sliderBig mb-2"
                  {...productSliderOptions}
                  ref={productSliderBig}
                >
                  {["02.webp", "01.webp", "05.webp", "03.webp", "04.webp"].map(
                    (img, index) => (
                      <div className="item" key={index}>
                        <img
                          src={`https://mironcoder-hotash.netlify.app/images/product/single/${img}`}
                          className="w-full"
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    ),
                  )}
                </Slider>

                <Slider
                  className="sliderSml"
                  {...productSliderSmlOptions}
                  ref={productSliderSml}
                >
                  {["01.webp", "05.webp", "03.webp", "04.webp"].map(
                    (img, index) => (
                      <div
                        className="item"
                        key={index}
                        onClick={() => goToSlide(index + 1)}
                      >
                        <img
                          src={`https://mironcoder-hotash.netlify.app/images/product/single/${img}`}
                          className="w-full"
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </div>
                    ),
                  )}
                </Slider>
              </div>
            </div>

            <div className="w-full md:w-7/12">
              <div className="pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Details</h6>
                <h4>
                  Formal suits for men wedding slim fit 3 piece dress business
                  party jacket
                </h4>
                <div className="productInfo mt-4">
                  <div className="flex flex-wrap mb-2">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <MdOutlineBrandingWatermark />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <span>Ecstasy</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <span>Man's</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <ul className="list list-inline tags sml flex flex-wrap">
                        {["SUITE", "PARTY", "DRESS", "SMART", "MAN"].map(
                          (tag, index) => (
                            <li className="list-inline-item" key={index}>
                              <span>{tag}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <IoColorPaletteSharp />
                      </span>
                      <span className="name">Color</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <ul className="list list-inline tags sml flex flex-wrap">
                        {["RED", "BLUE", "WHITE"].map((color, index) => (
                          <li className="list-inline-item" key={index}>
                            <span>{color}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <BiCategoryAlt />
                      </span>
                      <span className="name">Size</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <span>(68) Piece</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <MdOutlineRateReview />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <span>(03) Reviews</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-3/12 flex items-center">
                      <span className="icon">
                        <LuFolderCheck />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="w-full sm:w-9/12">
                      <span>Nov 02 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h6 className="mt-4 mb-3">Product Description</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Tom
              lai la 2 chai coca nhu moi khi trong tuan! Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Tom lai la 2 chai
              coca nhu moi khi trong tuan!
            </p>
            <br />
            <h6 className="mt-4 mb-4">Rating Analytics</h6>
            <div className="ratingSection">
              {[
                { star: 5, width: "70%", count: 22 },
                { star: 4, width: "70%", count: 12 },
                { star: 3, width: "50%", count: 3 },
                { star: 2, width: "10%", count: 1 },
                { star: 1, width: "0%", count: 0 },
              ].map((rating, index) => (
                <div className="ratingrow flex items-center" key={index}>
                  <span className="col1">{rating.star} Star</span>
                  <div className="col2 w-full max-w-md mx-2">
                    <div className="progress h-2 bg-gray-200 rounded">
                      <div
                        className="progress-bar h-full bg-blue-500 rounded"
                        style={{ width: rating.width }}
                      ></div>
                    </div>
                  </div>
                  <span className="col3">({rating.count})</span>
                </div>
              ))}
            </div>
            <br />
            <h6 className="mt-4 mb-4">Customer Reviews</h6>
            <div className="reviewsSection">
              {[
                {
                  image:
                    "https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096",
                  time: "25 minutes ago!",
                  reply: false,
                },
                {
                  image:
                    "https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/hinh-nen-messi-4k-19.jpg",
                  time: "25 minutes ago!",
                  reply: true,
                },
                {
                  image:
                    "https://afamilycdn.com/150157425591193600/2022/12/19/worldcupmessi-16714134707591286548462-1671414492850-1671414494903186357457-1671464902187-1671464903696996029140.jpeg",
                  time: "25 minutes ago!",
                  reply: true,
                },
                {
                  image:
                    "https://i.etsystatic.com/18270108/r/il/edb706/6096084304/il_570xN.6096084304_j6fw.jpg",
                  time: "30 minutes ago!",
                  reply: false,
                },
              ].map((review, index) => (
                <div
                  className={`reviewsRow ${review.reply ? "reply" : ""}`}
                  key={index}
                >
                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-7/12 flex">
                      <div className="flex flex-col">
                        <div className="userInfo flex items-center mb-3">
                          <AvatarUser lg={true} image={review.image} />
                          <div className="info pl-3">
                            <h6>Cristiano Siuuu</h6>
                            <span>{review.time}</span>
                          </div>
                        </div>
                        <Rating name="read-only" value={4} readOnly />
                      </div>
                    </div>

                    <div className="w-full md:w-5/12 flex items-center">
                      <div className="ml-auto">
                        <Button className="btn-blue btn-big btn-lg">
                          <TfiHandPointLeft /> Reply
                        </Button>
                      </div>
                    </div>

                    <p className="mt-3 w-full">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Omnis quo nostrum dolore fugiat ducimus labore debitis
                      unde autem recusandae? Eius harum tempora quis minima,
                      adipisci natus quod magni omnis quas.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h6 className="mt-4 mb-4">Review Reply Form</h6>
            <form className="reviewForm">
              <textarea
                placeholder="Write your comment..."
                className="w-full p-2 border rounded"
              ></textarea>
              <Button className="btn-blue btn-big btn-lg w-full mt-4">
                Drop Your Replies
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

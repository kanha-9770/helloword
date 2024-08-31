import MissionImg2 from "../../../../public/assets/Mission And Vision/MissionImg2.svg";
import VisionImg2 from "../../../../public/assets/Mission And Vision/VisionImg2.svg";
import CultureImg2 from "../../../../public/assets/Mission And Vision/CultureImg2.svg";
import CSRImg2 from "../../../../public/assets/Mission And Vision/CSRImg2.svg";
import MissionImg1 from "../../../../public/assets/Mission And Vision/MissionImg1.svg";
import VisionImg1 from "../../../../public/assets/Mission And Vision/VisionImg1.svg";
import CultureImg1 from "../../../../public/assets/Mission And Vision/CultureImg1.svg";
import CSRImg1 from "../../../../public/assets/Mission And Vision/CSRImg1.svg";
import MainImg from "../../../../public/assets/Mission And Vision/MainImg.svg";
import LeftBorderImg from "../../../../public/assets/Mission And Vision/LeftBorderImg.svg";
import RightBorderImg from "../../../../public/assets/Mission And Vision/RightBorderImg.svg";
import CulturePoint from "../../../../public/assets/Mission And Vision/CulturePoint.svg";
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { Bs3CircleFill } from "react-icons/bs";
import { Bs4CircleFill } from "react-icons/bs";

export const Page1Data = {
  video: "/assets/Mission And Vision/Video.mp4",
  title: "Mission & Vision",
  getaQuote: "Get a Quote",
  mainImg: MainImg,
  leftBorderImg: LeftBorderImg,
  rightBorderImg: RightBorderImg,
  description:
    '"Our mission is to provide innovative, high-quality paper cup machines that enable efficient, eco-friendly production. We envision leading the industry in sustainable manufacturing, setting the standard for environmentally responsible packaging solutions."',
  image: [
    {
      img: MissionImg1,
      title: "Mission",
    },
    {
      img: VisionImg1,
      title: "Vision",
    },
    {
      img: CultureImg1,
      title: "Culture",
    },
    {
      img: CSRImg1,
      title: "CSR",
    },
  ],
};

export const Page2Data = {
  cards: [
    {
      image: MissionImg2,
      title: "Mission",
      description:
        "Sell More than 1000 machines globally including Russia, Italy and USA",
      largeDescription:
        "Our company has achieved a significant milestone by selling over 1,000 machines globally, with key markets including Russia, Italy, and the USA. This accomplishment reflects our commitment to quality, innovation, and customer satisfaction. Sell More than 1000 machines globally including Russia, Italy and USA",
    },

    {
      image: VisionImg2,
      title: "Vision",
      description:
        "By FY24 become the highest selling paper cup Machine Manufacturor",
      largeDescription:
        "Our goal for FY24 is ambitious yet achievable: to become the highest-selling paper cup machine manufacturer globally. This vision is driven by our commitment to excellence, innovation, and customer satisfaction. ",
      descriptionList: [
        {
          point: "Product Innovation and Quality Enhancement",
          listImg: Bs1CircleFill,
        },
        { point: "Market Expansion", listImg: Bs2CircleFill },
        { point: "Customer-Centric Approach", listImg: Bs3CircleFill },
        { point: "Brand Building and Marketing", listImg: Bs4CircleFill },
      ],
    },

    {
      image: CultureImg2,
      title: "Culture",
      description: "We stand by our 4 cultural pillars",
      largeDescription:
        "At the core of our success lies our vibrant and inclusive company culture. We believe that a strong, positive culture not only fosters employee satisfaction and productivity but also drives innovation and excellence in every aspect of our business",
      descriptionList: [
        { point: "Innovation and Creativity", listImg: CulturePoint },
        { point: "Customer Centricity", listImg: CulturePoint },
        { point: "Integrity and Transparency", listImg: CulturePoint },
        { point: "Collaboration and Teamwork", listImg: CulturePoint },
      ],
    },

    {
      image: CSRImg2,
      title: "CSR",
      longTitle: "Corporate Social Responsibility",
      description: "We are very social & very responsible",
      largeDescription:
        "We are committed to corporate social responsibility by prioritizing sustainable practices in our operations and products. Our focus is on reducing environmental impact through eco-friendly solutions, supporting our communities, and promoting ethical business practices. We strive to make a positive difference by integrating social and environmental considerations into every aspect of our business.",
    },
  ],
};

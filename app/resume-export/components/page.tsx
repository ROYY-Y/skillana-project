import Template4 from "./templates/template4";
import { ResumeData } from "./templates/type/resume";

const mockResumeData: ResumeData = {
  firstName: "Naruto",
  lastName: "Uzumaki",
  email: "naruto.uzumaki@gmail.com",

  aboutMe:
    "Passionate software engineer with strong experience in frontend development, specializing in React and Next.js. Enjoy building scalable web applications and improving user experience.",

  contact: {
    phoneNumber: "+81 90-1234-5678",
    address: "Katsushika-ku, Tokyo, Japan",
  },

  education: {
    level: "Bachelor's Degree",
    major: "Computer Science",
    university: "University of Tokyo",
  },

  profileImg: "abcfds.asdf",

 experience: [
  {
    title: "Frontend Developer",
    startDate: "2021-04",
    endDate: "2023-08",
    description: "Developed and maintained web applications using React and Next.js.",
  },
  {
    title: "Backend Developer",
    startDate: "2021-04",
    endDate: "2023-08",
    description: "Developed and maintained Server for web applications using Node , express.js.",
  },
],

  badges: [
    {
      badgeName: "AWS Certified Cloud Practitioner",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    },
  ],
};

export default function ResumeRerender() {
  return <Template4 data={mockResumeData} size={"full"} />;
}
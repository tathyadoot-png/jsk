import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";
import img3 from "@/assets/img3.jpeg";
import img4 from "@/assets/img4.jpeg";
import img5 from "@/assets/img5.jpeg";
import su1 from "@/assets/activities/ev1/su1.jfif";
import su3 from "@/assets/activities/ev1/su3.jfif";
import su2 from "@/assets/activities/ev1/su2.jfif";
import su4 from "@/assets/activities/ev1/su4.jfif";
import su5 from "@/assets/activities/ev2/su1.jpg";
import su6 from "@/assets/activities/ev2/su2.jpg";
import su7 from "@/assets/activities/ev2/su3.jpg";
import su8 from "@/assets/activities/ev2/su4.jpg";
import su9 from "@/assets/activities/ev2/su5.jpg";
import su10 from "@/assets/activities/ev2/su6.jpg";
import su11 from "@/assets/activities/ev2/su7.jpg";
import su12 from "@/assets/activities/ev2/su8.jpg";



export interface Activity {
  id: number;
  title: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  cover: string;
  images: string[];
  date: string;
  location: string;
}

export const activitiesData: Activity[] = [
 {
  id: 1,
  title: {
    hi: "लोक स्वास्थ्य यांत्रिकी विभाग की परामर्शदात्री समिति की बैठक",
    en: "Advisory Committee Meeting of Public Health Engineering Department",
  },
  description: {
    hi: "26 फरवरी 2026 को विधानसभा सचिवालय, भोपाल में लोक स्वास्थ्य यांत्रिकी विभाग की परामर्शदात्री समिति की बैठक आयोजित की गई। बैठक में पेयजल व्यवस्थाओं के सुदृढ़ीकरण, ग्रामीण नल-जल योजनाओं की प्रगति, जल गुणवत्ता परीक्षण और ग्रीष्मकालीन तैयारियों पर विस्तृत समीक्षा की गई। सभी योजनाओं को समयसीमा में पूर्ण कर आमजन को निर्बाध पेयजल उपलब्ध कराने पर जोर दिया गया।",
    en: "On 26 February 2026, an advisory committee meeting of the Public Health Engineering Department was held at the Assembly Secretariat, Bhopal. Discussions focused on strengthening drinking water systems, progress of rural tap water schemes, water quality testing, and summer preparedness.",
  },
  cover: su1,
  images: [su1, su2, su3, su4],
  date: "Feb 2026",
  location: "Bhopal",
},
  
 {
  id: 2,
  title: {
    hi: "जल जीवन मिशन को नई गति: मध्य प्रदेश और केंद्र के बीच महत्वपूर्ण MoU संपन्न",
    en: "Jal Jeevan Mission Boosted: Key MoU Signed Between Madhya Pradesh and Central Government",
  },
  description: {
    hi: "17 मार्च 2026 को जल जीवन मिशन को प्रभावी बनाने हेतु नई दिल्ली में जल शक्ति मंत्रालय और मध्य प्रदेश सरकार के बीच महत्वपूर्ण MoU पर हस्ताक्षर किए गए। इस पहल के तहत ग्रामीण क्षेत्रों में हर घर तक स्वच्छ जल आपूर्ति, सेवा गुणवत्ता में सुधार, पारदर्शिता और तय समयसीमा में लक्ष्यों की प्राप्ति सुनिश्चित करने पर जोर दिया गया। यह समझौता विशेष रूप से दूरस्थ एवं आदिवासी क्षेत्रों में जल उपलब्धता बढ़ाकर जीवन स्तर सुधारने में सहायक सिद्ध होगा।",
    en: "On 17 March 2026, a significant MoU was signed between the Ministry of Jal Shakti and the Government of Madhya Pradesh in New Delhi to strengthen the Jal Jeevan Mission. The initiative focuses on ensuring clean tap water to every rural household, improving service quality, enhancing transparency, and achieving targets within deadlines.",
  },
  cover: su5,
  images: [su5, su6, su7, su8, su9, su10, su11, su12],
  date: "March 2026",
  location: "Bhopal",
},
];
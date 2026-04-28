export type Lang = "hi" | "en";

type LoginContentType = {
  brandName: string;
  subBrand: string;
  tagline: string;
  district: string;
  welcome: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  button: string;
  secure: string;
};

const loginContent: Record<Lang, LoginContentType> = {
  hi: {
    brandName: "जनता",
    subBrand: "सुविधा केंद्र",
    tagline: "सशक्त नागरिक, समृद्ध मंडला",
    district: "मंडला विधानसभा",
    welcome: "स्वागत है",
    subtitle: "प्रशासनिक खाते में लॉगिन करें",
    emailLabel: "ईमेल आईडी",
    passwordLabel: "पासवर्ड",
    button: "लॉगिन करें",
    secure: "सुरक्षित कनेक्शन",
  },
  en: {
    brandName: "JANTA",
    subBrand: "Suvidha Kendra",
    tagline: "Sashakt Nagrik, Samriddh Mandla",
    district: "Mandla Vidhan Sabha",
    welcome: "Welcome back",
    subtitle: "Sign in to administrative account",
    emailLabel: "Account Identifier",
    passwordLabel: "Security Key",
    button: "Unlock Dashboard",
    secure: "Encrypted Connection",
  },
};

export default loginContent;
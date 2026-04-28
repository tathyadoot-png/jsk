// 🌐 Language Type (global reuse के लिए)
export type Lang = "hi" | "en";


// 👤 Admin Type (Sidebar + Header दोनों में use होगा)
export type AdminUser = {
  name?: string;
  role?: string;
  permissions?: string[];
};


// 🧾 Header Content Type
export type HeaderContentType = {
  title: string;
  subtitle: string;
  langSwitch: string;
};


// 🧩 Header Props
export type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  admin?: AdminUser;
};
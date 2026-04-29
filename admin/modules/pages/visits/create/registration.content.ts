// modules/registration/registration.content.ts

export const registrationContent = {
  en: {
    header: {
      back: "Back to List",
      title: "Visitor Registration",
      subtitle: "Digital Entry Portal"
    },
    verification: {
      label: "Identity Verification",
      placeholder: "10-digit Mobile Number",
      search: "Search",
      groupVisit: "Group Visit",
      statusFound: "Existing User Found",
      statusNew: "New User Entry"
    },
    personalDetails: {
      label: "Personal Details",
      name: "Full Name",
      whatsapp: "WhatsApp Number",
      email: "Email (Optional)",
      gender: "Select Gender",
      genders: { male: "Male", female: "Female", other: "Other" },
      address: "Address",
      constituency: "Constituency"
    },
    visitInfo: {
      label: "Visit Information",
      purpose: "Purpose of Visit",
      meetLabel: "Select Person to Meet"
    },
    otpSection: {
      title: "Security Verification",
      subtitle: "6-Digit code sent to",
      placeholder: "000000",
      resendLabel: "Resend in",
      resendAction: "Resend OTP Now"
    },
    actions: {
      generate: "Generate Access OTP",
      confirm: "Confirm & Save Entry"
    },
    alerts: {
      mobileRequired: "Mobile required",
      otpRequired: "Enter OTP",
      visitCreated: "Visit created"
    }
  },
  hi: {
    header: {
      back: "सूची पर वापस जाएं",
      title: "आगंतुक पंजीकरण",
      subtitle: "डिजिटल एंट्री पोर्टल"
    },
    verification: {
      label: "पहचान सत्यापन",
      placeholder: "10-अंकों का मोबाइल नंबर",
      search: "खोजें",
      groupVisit: "सामूहिक भेंट",
      statusFound: "मौजूदा उपयोगकर्ता मिला",
      statusNew: "नई उपयोगकर्ता प्रविष्टि"
    },
    personalDetails: {
      label: "व्यक्तिगत विवरण",
      name: "पूरा नाम",
      whatsapp: "व्हाट्सएप नंबर",
      email: "ईमेल (वैकल्पिक)",
      gender: "लिंग चुनें",
      genders: { male: "पुरुष", female: "महिला", other: "अन्य" },
      address: "पता",
      constituency: "निर्वाचन क्षेत्र"
    },
    visitInfo: {
      label: "भेंट की जानकारी",
      purpose: "भेंट का उद्देश्य",
      meetLabel: "मिलने वाले व्यक्ति को चुनें"
    },
    otpSection: {
      title: "सुरक्षा सत्यापन",
      subtitle: "6-अंकों का कोड भेजा गया",
      placeholder: "000000",
      resendLabel: "पुनः भेजें",
      resendAction: "ओटीपी पुनः भेजें"
    },
    actions: {
      generate: "प्रवेश ओटीपी जनरेट करें",
      confirm: "पुष्टि करें और सहेजें"
    },
    alerts: {
      mobileRequired: "मोबाइल नंबर आवश्यक है",
      otpRequired: "ओटीपी दर्ज करें",
      visitCreated: "विजिट सफलतापूर्वक बनाई गई"
    }
  }
};

export default registrationContent;
import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const ADMIN_EMAIL = "lakan.sunga880@hotmail.com";
const FROM_ADDRESS = "CNicole Stylez <onboarding@resend.dev>";

type ContactPayload = {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  message: string;
};

type QuestionnairePayload = {
  type: "questionnaire";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  clientType: string;
  duration: string;
  appointmentStyle: string;
  location: string;
  shoppingFor: string;
  occasion: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  bodyShape: string;
  coverage: string;
  dressSize: string;
  suitSize: string;
  pantsSize: string;
  legLength: string;
  shoeSize: string;
  waistSize: string;
  shirtSize: string;
  neckArm: string;
  braSize: string;
  shirtStyle: string;
  shirtFit: string;
  pantsType: string;
  pantsCut: string[];
  braNotes: string;
  aboutStyle: string;
  trends: string;
  colors_Love: string;
  colors_Maybe: string;
  colors_Pass: string;
  brands_Love: string;
  brands_Pass: string;
  budget: string;
};

type EmailPayload = ContactPayload | QuestionnairePayload;

function val(v: string) {
  return v || "—";
}

function buildQuestionnaireBody(d: QuestionnairePayload): string {
  return [
    "=== Contact Info ===",
    `First Name: ${val(d.firstName)}`,
    `Last Name: ${val(d.lastName)}`,
    `Phone: ${val(d.phone)}`,
    `Email: ${val(d.email)}`,
    "",
    "=== Appointment Info ===",
    `Client Type: ${val(d.clientType)}`,
    `Duration: ${val(d.duration)}`,
    `Appointment Style: ${val(d.appointmentStyle)}`,
    `Location: ${val(d.location)}`,
    "",
    "=== Client Information ===",
    `Shopping For: ${val(d.shoppingFor)}`,
    `Occasion: ${val(d.occasion)}`,
    `Gender: ${val(d.gender)}`,
    `Age: ${val(d.age)}`,
    `Height: ${val(d.height)}`,
    `Weight: ${val(d.weight)}`,
    `Body Shape: ${val(d.bodyShape)}`,
    `Extra Coverage Area: ${val(d.coverage)}`,
    "",
    "=== Client Sizing Information ===",
    `Dress Size: ${val(d.dressSize)}`,
    `Suit Size: ${val(d.suitSize)}`,
    `Pants Size: ${val(d.pantsSize)}`,
    `Pants Leg Length: ${val(d.legLength)}`,
    `Shoe Size: ${val(d.shoeSize)}`,
    `Waist Size: ${val(d.waistSize)}`,
    `Shirt Size: ${val(d.shirtSize)}`,
    `Neck Size / Arm Length: ${val(d.neckArm)}`,
    `Bra Size: ${val(d.braSize)}`,
    "",
    "=== Client Styling Information ===",
    `Preferred Shirt Style: ${val(d.shirtStyle)}`,
    `Preferred Shirt Fit: ${val(d.shirtFit)}`,
    `Preferred Pants Type: ${val(d.pantsType)}`,
    `Preferred Pants Cut: ${d.pantsCut.length ? d.pantsCut.join(", ") : "—"}`,
    `Bra Style Notes: ${val(d.braNotes)}`,
    "",
    "=== Style Preferences ===",
    `About Your Style: ${val(d.aboutStyle)}`,
    `Reception to Trends: ${val(d.trends)}`,
    `Favorite Colors — Love: ${val(d.colors_Love)}`,
    `Favorite Colors — Maybe: ${val(d.colors_Maybe)}`,
    `Favorite Colors — Pass: ${val(d.colors_Pass)}`,
    `Favorite Brands — Love: ${val(d.brands_Love)}`,
    `Favorite Brands — Pass: ${val(d.brands_Pass)}`,
    `Budget Preference: ${val(d.budget)}`,
  ].join("\n");
}

export const sendFormEmail = createServerFn({ method: "POST" })
  .inputValidator((data: EmailPayload) => data)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (data.type === "contact") {
      const { name, email, phone, message } = data;
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${val(phone)}`,
          "",
          `Message:`,
          message,
        ].join("\n"),
      });
      if (error) { console.error("[Resend contact error]", error); throw new Error(error.message); }
    } else {
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: `New Styling Questionnaire — ${data.firstName} ${data.lastName}`,
        text: buildQuestionnaireBody(data),
      });
      if (error) { console.error("[Resend questionnaire error]", error); throw new Error(error.message); }
    }

    return { success: true };
  });

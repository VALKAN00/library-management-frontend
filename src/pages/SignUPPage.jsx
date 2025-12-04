import { SignUpForm } from "../components/signup/SignUpForm";
import backgroundImage from "../../public/images/library4.jpg";
export default function SignUPPage() {
  return (
    <div
      className="min-h-screen flex justify-center px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)", // overlay color
        backgroundBlendMode: "darken", // or 'multiply'
      }}
    >
      <SignUpForm />
    </div>
  );
}

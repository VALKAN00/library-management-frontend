import { LoginForm } from "../components/login/LoginForm";
import backgroundImage from "../../public/images/library4.jpg";
export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)", // overlay color
        backgroundBlendMode: "darken", // or 'multiply'
      }}
    >
      <LoginForm />
    </div>
  );
}

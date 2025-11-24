import { LoginForm } from "../components/login/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {" "}
      <LoginForm />
    </div>
  );
}

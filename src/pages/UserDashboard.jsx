import UserBooksCard from "../components/userDashboard/UserBooksCard";
export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Borrowings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
      </div>
      <h1 className="text-3xl font-bold mb-6 mt-6">My Reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
        <UserBooksCard />
      </div>
    </div>
  );
}

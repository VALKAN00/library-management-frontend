import UserBooksCard from "../components/userDashboard/UserBooksCard";
import StatusCard from "../components/userDashboard/StatusCard";
// icon imports can be added here
import { BookOpen, Bookmark, IterationCw } from 'lucide-react';

const bookIcon = <BookOpen />;
const bookmarkIcon = <Bookmark />;
const returnIcon = <IterationCw />;
export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Borrowings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard title= "Number of Borrowings" icon = {bookIcon} value = "10" />
        <StatusCard title = "Number of Reservations" icon = {bookmarkIcon} value = "5" />
        <StatusCard title = "Number of Returns" icon = {returnIcon} value = "3" />
      </div>
      <h1 className="text-3xl font-bold mb-6 mt-6">Latest Borrowings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserBooksCard title= "harry potter" author = "JK Rowling" genre = "Fiction" date = "2020" due = "3 days" />
        <UserBooksCard title= "dune" author = "Frank Herbert" genre = "Science Fiction" date = "1965" due = "5 days" />
        <UserBooksCard title= "the lord of the rings" author = "JRR Tolkien" genre = "Fantasy" date = "1954" due = "2 days"/>
      </div>
      <h1 className="text-3xl font-bold mb-6 mt-6">Latest Reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserBooksCard title= "harry potter" author = "JK Rowling" genre = "Fiction" date = "2020" reservationDate = "2023-06-01" />
        <UserBooksCard title= "dune" author = "Frank Herbert" genre = "Science Fiction" date = "1965" reservationDate = "2023-06-02" />
        <UserBooksCard title= "the lord of the rings" author = "JRR Tolkien" genre = "Fantasy" date = "1954" reservationDate = "2023-06-03"/>
      </div>
    </div>
  );
}

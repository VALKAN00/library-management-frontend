import BooksCard from "../components/browseBooks/BooksCard"
import Filter from "../components/browseBooks/Filter"
function Books() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Books</h1>
      <Filter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BooksCard id="1" title= "harry potter" author = "JK Rowling" genre = "Fiction" date = "2020" rating= "4.5" status= "Available" />
        <BooksCard id="2" title= "dune" author = "Frank Herbert" genre = "Science Fiction" date = "1965" rating= "4.8" status= "Unavailable" />
        <BooksCard id="3" title= "the lord of the rings" author = "JRR Tolkien" genre = "Fantasy" date = "1954" rating= "4.9" status= "Available" />
        <BooksCard id="4" title= "to kill a mockingbird" author = "Harper Lee" genre = "Fiction" date = "1960" rating= "4.7" status= "Available" />
        <BooksCard id="5" title= "harry potter" author = "JK Rowling" genre = "Fiction" date = "2020" rating= "4.5" status= "Available" />
        <BooksCard id="6" title= "dune" author = "Frank Herbert" genre = "Science Fiction" date = "1965" rating= "4.8" status= "Unavailable" />
        <BooksCard id="7" title= "the lord of the rings" author = "JRR Tolkien" genre = "Fantasy" date = "1954" rating= "4.9" status= "Available" />
        <BooksCard id="8" title= "to kill a mockingbird" author = "Harper Lee" genre = "Fiction" date = "1960" rating= "4.7" status= "Available" />
      </div>
    </div>
  )
}

export default Books

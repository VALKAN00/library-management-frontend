import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton } from "@mui/material"
import Filter from "../components/BooksManagement/Filter"
import Table from "../components/BooksManagement/Table"

function BooksManagement() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      isbn: "978-0525559474",
      genre: "Fiction",
      publisher: "Viking",
      year: 2020,
      quantity: 5,
      available: 3,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
    },
    {
      id: 2,
      title: "Dune",
      author: "Frank Herbert",
      isbn: "978-0441172719",
      genre: "Science Fiction",
      publisher: "Ace",
      year: 1965,
      quantity: 8,
      available: 6,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    },
    {
      id: 3,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      isbn: "978-0756404079",
      genre: "Fantasy",
      publisher: "DAW Books",
      year: 2007,
      quantity: 4,
      available: 2,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
    },
    {
      id: 4,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "978-0062316097",
      genre: "Non-Fiction",
      publisher: "Harper",
      year: 2015,
      quantity: 10,
      available: 7,
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState("add") // 'add' or 'edit'
  const [currentBook, setCurrentBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publisher: "",
    year: "",
    quantity: "",
    available: "",
    coverImage: ""
  })

  const genres = ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Biography", "History"]

  // Filter books based on search and genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm)
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter
    return matchesSearch && matchesGenre
  })

  const handleOpenDialog = (mode, book = null) => {
    setDialogMode(mode)
    if (mode === "edit" && book) {
      setCurrentBook(book)
    } else {
      setCurrentBook({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publisher: "",
        year: "",
        quantity: "",
        available: "",
        coverImage: ""
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentBook({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      publisher: "",
      year: "",
      quantity: "",
      available: "",
      coverImage: ""
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentBook(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveBook = () => {
    if (dialogMode === "add") {
      const newBook = {
        ...currentBook,
        id: books.length + 1,
        year: parseInt(currentBook.year),
        quantity: parseInt(currentBook.quantity),
        available: parseInt(currentBook.available)
      }
      setBooks([...books, newBook])
    } else {
      setBooks(books.map(book => 
        book.id === currentBook.id ? {
          ...currentBook,
          year: parseInt(currentBook.year),
          quantity: parseInt(currentBook.quantity),
          available: parseInt(currentBook.available)
        } : book
      ))
    }
    handleCloseDialog()
  }

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter(book => book.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Books Management</h1>
        <button
          onClick={() => handleOpenDialog("add")}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add New Book
        </button>
      </div>

      {/* Search and Filter Section */}
      <Filter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        genres={genres}
      />

      {/* Books Table */}
      <Table 
        filteredBooks={filteredBooks}
        handleOpenDialog={handleOpenDialog}
        handleDeleteBook={handleDeleteBook}
        searchTerm={searchTerm}
        genreFilter={genreFilter}
      />

      {/* Add/Edit Book Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <DialogTitle className="p-0 text-2xl font-bold text-gray-900">
            {dialogMode === "add" ? "Add New Book" : "Edit Book"}
          </DialogTitle>
          <IconButton onClick={handleCloseDialog} size="small">
            <X size={24} />
          </IconButton>
        </div>
        
        <DialogContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={currentBook.title}
              onChange={handleInputChange}
              required
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={currentBook.author}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={currentBook.isbn}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={currentBook.genre}
              onChange={handleInputChange}
              select
              SelectProps={{ native: true }}
              required
            >
              <option value=""></option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Publisher"
              name="publisher"
              value={currentBook.publisher}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={currentBook.year}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Total Quantity"
              name="quantity"
              type="number"
              value={currentBook.quantity}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Available Copies"
              name="available"
              type="number"
              value={currentBook.available}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Cover Image URL"
              name="coverImage"
              value={currentBook.coverImage}
              onChange={handleInputChange}
              className="md:col-span-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              color="inherit"
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBook}
              variant="contained"
              className="px-6 bg-indigo-600 hover:bg-indigo-700"
              disabled={!currentBook.title || !currentBook.author || !currentBook.isbn}
            >
              {dialogMode === "add" ? "Add Book" : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BooksManagement

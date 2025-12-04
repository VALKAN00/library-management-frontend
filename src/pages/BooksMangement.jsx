import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton, CircularProgress, Alert, Snackbar } from "@mui/material"
import Filter from "../components/BooksManagement/Filter"
import Table from "../components/BooksManagement/Table"
import { manageBooksAPI } from "../api/ManageBooksapi"

function BooksManagement() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState("add") // 'add' or 'edit'
  const [currentBook, setCurrentBook] = useState({
    BookID: 0,
    Title: "",
    Author: "",
    Category: "",
    Price: "",
    Quantity: "",
    Available_Copies: "",
    Pub_Year: "",
    Pub_Name: "",
    Cover: "",
    Rating: 0,
    Availability: true
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  })

  const genres = ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Biography", "History", "Technology", "Self-Help", "Thriller", "Horror", "Adventure"]

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await manageBooksAPI.getAllBooks(1, 100)
        // API returns object with books array: { page, limit, total, books: [...] }
        setBooks(response.books || [])
        setLoading(false)
      } catch (err) {
        console.error("Error fetching books:", err)
        setError("Failed to load books. Please try again later.")
        setBooks([]) // Reset to empty array on error
        setLoading(false)
        showSnackbar("Failed to load books", "error")
      }
    }
    
    fetchBooks()
  }, [])

  // Refetch books function (for updates after create/edit/delete)
  const refetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await manageBooksAPI.getAllBooks(1, 100)
      setBooks(response.books || [])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching books:", err)
      setError("Failed to load books. Please try again later.")
      setBooks([])
      setLoading(false)
      showSnackbar("Failed to load books", "error")
    }
  }

  // Filter books based on search and genre
  const filteredBooks = Array.isArray(books) ? books.filter(book => {
    const matchesSearch = 
      book.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = genreFilter === "all" || book.Category === genreFilter
    return matchesSearch && matchesGenre
  }) : []

  const handleOpenDialog = (mode, book = null) => {
    setDialogMode(mode)
    if (mode === "edit" && book) {
      setCurrentBook({
        BookID: book.BookID,
        Title: book.Title || "",
        Author: book.Author || "",
        Category: book.Category || "",
        Price: book.Price || "",
        Quantity: book.Quantity || "",
        Available_Copies: book.Available_Copies || "",
        Pub_Year: book.Pub_Year || "",
        Pub_Name: book.Pub_Name || "",
        Cover: book.Cover || "",
        Rating: book.Rating || 0,
        Availability: book.Availability !== undefined ? book.Availability : true
      })
    } else {
      setCurrentBook({
        BookID: 0,
        Title: "",
        Author: "",
        Category: "",
        Price: "",
        Quantity: "",
        Available_Copies: "",
        Pub_Year: "",
        Pub_Name: "",
        Cover: "",
        Rating: 0,
        Availability: true
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentBook({
      BookID: 0,
      Title: "",
      Author: "",
      Category: "",
      Price: "",
      Quantity: "",
      Available_Copies: "",
      Pub_Year: "",
      Pub_Name: "",
      Cover: "",
      Rating: 0,
      Availability: true
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentBook(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveBook = async () => {
    try {
      setLoading(true)
      
      const bookData = {
        BookID: currentBook.BookID,
        Category: currentBook.Category,
        Title: currentBook.Title,
        Author: currentBook.Author,
        Price: parseFloat(currentBook.Price) || 0,
        Quantity: parseInt(currentBook.Quantity) || 0,
        Available_Copies: parseInt(currentBook.Available_Copies) || 0,
        Pub_Year: parseInt(currentBook.Pub_Year) || 0,
        Pub_Name: currentBook.Pub_Name,
        Cover: currentBook.Cover,
        Rating: parseFloat(currentBook.Rating) || 0,
        Availability: currentBook.Availability
      }

      if (dialogMode === "add") {
        await manageBooksAPI.createBook(bookData)
        showSnackbar("Book added successfully!", "success")
      } else {
        await manageBooksAPI.updateBook(currentBook.BookID, bookData)
        showSnackbar("Book updated successfully!", "success")
      }
      
      await refetchBooks()
      handleCloseDialog()
      setLoading(false)
    } catch (err) {
      console.error("Error saving book:", err)
      showSnackbar(
        `Failed to ${dialogMode === "add" ? "add" : "update"} book. ${err.response?.data?.message || ""}`,
        "error"
      )
      setLoading(false)
    }
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true)
        await manageBooksAPI.deleteBook(id)
        showSnackbar("Book deleted successfully!", "success")
        await refetchBooks()
        setLoading(false)
      } catch (err) {
        console.error("Error deleting book:", err)
        showSnackbar("Failed to delete book. " + (err.response?.data?.message || ""), "error")
        setLoading(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-8 gap-3">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Books Management</h1>
        <button
          onClick={() => handleOpenDialog("add")}
          className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-sm md:text-base w-full sm:w-auto"
          disabled={loading}
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          Add New Book
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && !openDialog && (
        <div className="flex justify-center items-center py-12">
          <CircularProgress />
        </div>
      )}

      {/* Search and Filter Section */}
      {!loading && (
        <Filter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          genres={genres}
        />
      )}

      {/* Books Table */}
      {!loading && (
        <Table 
          filteredBooks={filteredBooks}
          handleOpenDialog={handleOpenDialog}
          handleDeleteBook={handleDeleteBook}
          searchTerm={searchTerm}
          genreFilter={genreFilter}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

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
              name="Title"
              value={currentBook.Title}
              onChange={handleInputChange}
              required
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Author"
              name="Author"
              value={currentBook.Author}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="Category"
              value={currentBook.Category}
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
              label="Price"
              name="Price"
              type="number"
              value={currentBook.Price}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Publisher Name"
              name="Pub_Name"
              value={currentBook.Pub_Name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Publication Year"
              name="Pub_Year"
              type="number"
              value={currentBook.Pub_Year}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Total Quantity"
              name="Quantity"
              type="number"
              value={currentBook.Quantity}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Available Copies"
              name="Available_Copies"
              type="number"
              value={currentBook.Available_Copies}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Rating (0-5)"
              name="Rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={currentBook.Rating}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Cover Image URL"
              name="Cover"
              value={currentBook.Cover}
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBook}
              variant="contained"
              className="px-6 bg-indigo-600 hover:bg-indigo-700"
              disabled={!currentBook.Title || !currentBook.Author || !currentBook.Category || loading}
            >
              {loading ? <CircularProgress size={24} /> : dialogMode === "add" ? "Add Book" : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BooksManagement
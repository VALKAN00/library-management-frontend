import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton, CircularProgress, Alert, Snackbar } from "@mui/material";
import { X } from "lucide-react";
import BorrowingTable from "../components/manageBorrow/BorrowTable";
import { manageBorrowAPI } from "../api/ManageBorrowApi";
import { booksAPI } from "../api/BooksApi";
import { membersAPI } from "../api/MembersApi";

export default function ManageBorrow() {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentBorrow, setCurrentBorrow] = useState({
        BookID: "",
        DueDate: "",
        BorrowDate: ""
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Enrich borrowings with book titles and customer names
    const enrichBorrowingsData = async (borrowingsData) => {
        const enrichedBorrowings = await Promise.all(
            borrowingsData.map(async (borrow) => {
                let bookTitle = `Book #${borrow.BookID}`;
                let customerName = `Customer #${borrow.CusID}`;

                try {
                    // Fetch book details
                    const bookResponse = await booksAPI.getById(borrow.BookID);
                    if (bookResponse) {
                        bookTitle = bookResponse.Title || bookTitle;
                    }
                } catch (err) {
                    console.error(`Error fetching book ${borrow.BookID}:`, err);
                }

                try {
                    // Fetch member details
                    const memberResponse = await membersAPI.getMemberById(borrow.CusID);
                    if (memberResponse) {
                        customerName = `${memberResponse.member.UserFirstName} ${memberResponse.member.UserLastName}` ;
                    }
                } catch (err) {
                    console.error(`Error fetching member ${borrow.CusID}:`, err);
                }

                return {
                    ...borrow,
                    BookTitle: bookTitle,
                    CustomerName: customerName
                };
            })
        );
        return enrichedBorrowings;
    };

    // Fetch borrowings on component mount
    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await manageBorrowAPI.getAllBorrowings(1, 100);
                const borrowingsData = response.borrowings || [];
                
                // Enrich borrowings with book titles and customer names
                const enrichedData = await enrichBorrowingsData(borrowingsData);
                setBorrowings(enrichedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching borrowings:", err);
                setError("Failed to load borrowings. Please try again later.");
                setBorrowings([]);
                setLoading(false);
                showSnackbar("Failed to load borrowings", "error");
            }
        };

        fetchBorrowings();
    }, []);

    const refetchBorrowings = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await manageBorrowAPI.getAllBorrowings(1, 100);
            const borrowingsData = response.borrowings || [];
            
            // Enrich borrowings with book titles and customer names
            const enrichedData = await enrichBorrowingsData(borrowingsData);
            setBorrowings(enrichedData);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching borrowings:", err);
            setError("Failed to load borrowings. Please try again later.");
            setBorrowings([]);
            setLoading(false);
            showSnackbar("Failed to load borrowings", "error");
        }
    };

    const handleOpenDialog = () => {
        setCurrentBorrow({
            BookID: "",
            DueDate: "",
            BorrowDate: ""
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentBorrow({
            BookID: "",
            DueDate: "",
            BorrowDate: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentBorrow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateBorrow = async () => {
        try {
            setLoading(true);
            await manageBorrowAPI.createBorrowing(currentBorrow);
            showSnackbar("Borrowing created successfully!", "success");
            await refetchBorrowings();
            handleCloseDialog();
            setLoading(false);
        } catch (err) {
            console.error("Error creating borrowing:", err);
            showSnackbar(
                `Failed to create borrowing. ${err.response?.data?.error || ""}`,
                "error"
            );
            setLoading(false);
        }
    };

    const handleReturnBook = async (id) => {
        try {
            setLoading(true);
            await manageBorrowAPI.returnBorrowing(id);
            showSnackbar("Book returned successfully!", "success");
            await refetchBorrowings();
            setLoading(false);
        } catch (err) {
            console.error("Error returning book:", err);
            showSnackbar("Failed to return book. " + (err.response?.data?.message || ""), "error");
            setLoading(false);
        }
    };

    const handleRenewBorrow = async (id) => {
        try {
            setLoading(true);
            await manageBorrowAPI.renewBorrowing(id);
            showSnackbar("Borrowing renewed successfully!", "success");
            await refetchBorrowings();
            setLoading(false);
        } catch (err) {
            console.error("Error renewing borrowing:", err);
            showSnackbar("Failed to renew borrowing. " + (err.response?.data?.message || ""), "error");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Manage Borrowing</h1>
                    <p className="text-gray-600 mb-6">Update, view, and manage all book borrowing.</p>
                </div>
                <div className="flex">
                    <button
                        onClick={handleOpenDialog}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        <div className="flex gap-2 items-center">
                            <Plus size={20} />
                            <span>New Borrowing</span>
                        </div>
                    </button>
                </div>
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

            {/* Borrowing Table */}
            {!loading && (
                <div className="mt-6">
                    <BorrowingTable
                        borrowings={borrowings}
                        onReturn={handleReturnBook}
                        onRenew={handleRenewBorrow}
                        loading={loading}
                    />
                </div>
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

            {/* Create Borrowing Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <DialogTitle className="p-0 text-2xl font-bold text-gray-900">
                        Create New Borrowing
                    </DialogTitle>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <X size={24} />
                    </IconButton>
                </div>

                <DialogContent className="p-6">
                    <div className="space-y-4">
                        <TextField
                            fullWidth
                            label="Book ID"
                            name="BookID"
                            type="number"
                            value={currentBorrow.BookID}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Borrow Date"
                            name="BorrowDate"
                            type="datetime-local"
                            value={currentBorrow.BorrowDate}
                            onChange={handleInputChange}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Due Date"
                            name="DueDate"
                            type="datetime-local"
                            value={currentBorrow.DueDate}
                            onChange={handleInputChange}
                            required
                            InputLabelProps={{ shrink: true }}
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
                            onClick={handleCreateBorrow}
                            variant="contained"
                            className="px-6 bg-blue-600 hover:bg-blue-700"
                            disabled={!currentBorrow.BookID || !currentBorrow.DueDate || !currentBorrow.BorrowDate || loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Create Borrowing"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
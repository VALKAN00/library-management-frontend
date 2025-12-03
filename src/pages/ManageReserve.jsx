import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, TextField, Button, IconButton, CircularProgress, Alert, Snackbar } from "@mui/material";
import ReserveTable from "../components/manageReserve/ReserveTable";
import { reservationsAPI } from "../api/ReservationsApi";
import { booksAPI } from "../api/BooksApi";
import { membersAPI } from "../api/MembersApi";

export default function ManageReserve() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentReservation, setCurrentReservation] = useState({
        BookID: ""
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

    // Enrich reservations with book titles and customer names
    const enrichReservationsData = async (reservationsData) => {
        const enrichedReservations = await Promise.all(
            reservationsData.map(async (reservation) => {
                let bookTitle = `Book #${reservation.BookID}`;
                let customerName = `Customer #${reservation.CusID}`;

                try {
                    const bookResponse = await booksAPI.getById(reservation.BookID);
                    if (bookResponse) {
                        bookTitle = bookResponse.Title || bookTitle;
                    }
                } catch (err) {
                    console.error(`Error fetching book ${reservation.BookID}:`, err);
                }

                try {
                    const memberResponse = await membersAPI.getMemberById(reservation.CusID);
                    if (memberResponse) {
                        customerName = `${memberResponse.member.UserFirstName} ${memberResponse.member.UserLastName}`;
                    }
                } catch (err) {
                    console.error(`Error fetching member ${reservation.CusID}:`, err);
                }

                return {
                    ...reservation,
                    BookTitle: bookTitle,
                    CustomerName: customerName
                };
            })
        );
        return enrichedReservations;
    };

    // Fetch reservations on component mount
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await reservationsAPI.getAll();
                const reservationsData = response.reservations || [];
                
                const enrichedData = await enrichReservationsData(reservationsData);
                setReservations(enrichedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching reservations:", err);
                setError("Failed to load reservations. Please try again later.");
                setReservations([]);
                setLoading(false);
                showSnackbar("Failed to load reservations", "error");
            }
        };

        fetchReservations();
    }, []);

    const refetchReservations = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await reservationsAPI.getAll();
            const reservationsData = response.reservations || [];
            
            const enrichedData = await enrichReservationsData(reservationsData);
            setReservations(enrichedData);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching reservations:", err);
            setError("Failed to load reservations. Please try again later.");
            setReservations([]);
            setLoading(false);
            showSnackbar("Failed to load reservations", "error");
        }
    };

    const handleOpenDialog = () => {
        setCurrentReservation({ BookID: "" });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentReservation({ BookID: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentReservation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateReservation = async () => {
        try {
            setLoading(true);
            await reservationsAPI.create(currentReservation);
            showSnackbar("Reservation created successfully!", "success");
            await refetchReservations();
            handleCloseDialog();
            setLoading(false);
        } catch (err) {
            console.error("Error creating reservation:", err);
            showSnackbar(
                `Failed to create reservation. ${err.response?.data?.message || ""}`,
                "error"
            );
            setLoading(false);
        }
    };

    const handlePickup = async (id) => {
        try {
            setLoading(true);
            await reservationsAPI.pickup(id);
            showSnackbar("Reservation marked as picked up!", "success");
            await refetchReservations();
            setLoading(false);
        } catch (err) {
            console.error("Error marking pickup:", err);
            showSnackbar("Failed to mark as picked up. " + (err.response?.data?.message || ""), "error");
            setLoading(false);
        }
    };

    const handleCancelReservation = async (id) => {
        if (window.confirm("Are you sure you want to cancel this reservation?")) {
            try {
                setLoading(true);
                await reservationsAPI.cancel(id);
                showSnackbar("Reservation cancelled successfully!", "success");
                await refetchReservations();
                setLoading(false);
            } catch (err) {
                console.error("Error cancelling reservation:", err);
                showSnackbar("Failed to cancel reservation. " + (err.response?.data?.message || ""), "error");
                setLoading(false);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Manage Reserve</h1>
                    <p className="text-gray-600 mb-6">Review and manage all book reservations requests.</p>
                </div>
                <div className="flex">
                    <button
                        onClick={handleOpenDialog}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        <div className="flex gap-2 items-center">
                            <Plus size={20} />
                            <span>New Reservation</span>
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

            {/* Reservations Table */}
            {!loading && (
                <div className="mt-6">
                    <ReserveTable
                        reservations={reservations}
                        onPickup={handlePickup}
                        onCancel={handleCancelReservation}
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

            {/* Create Reservation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <DialogTitle className="p-0 text-2xl font-bold text-gray-900">
                        Create New Reservation
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
                            value={currentReservation.BookID}
                            onChange={handleInputChange}
                            required
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
                            onClick={handleCreateReservation}
                            variant="contained"
                            className="px-6 bg-blue-600 hover:bg-blue-700"
                            disabled={!currentReservation.BookID || loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Create Reservation"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
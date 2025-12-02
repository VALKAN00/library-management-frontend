import { useState, useEffect, useCallback } from 'react';
import FineTable from '../components/fines&Payments/FineTable.jsx';
import { finesAPI } from '../api/Fines';
import { useAuth } from '../context/AuthContext';

export default function FinePayment() {
    const { user } = useAuth();
    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const page = 1;
    const limit = 20;

    const isAdmin = user?.role === 'admin';

    const fetchStatistics = useCallback(async () => {
        try {
            const stats = await finesAPI.getStatistics();
            setStatistics(stats);
        } catch (err) {
            console.error('Error fetching statistics:', err);
        }
    }, []);

    const fetchFines = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            let response;
            if (isAdmin) {
                // Admin can see all fines with filters
                response = await finesAPI.getAllFines({ 
                    page, 
                    limit, 
                    status: filterStatus 
                });
            } else {
                // Regular users see only their fines
                response = await finesAPI.getMyFines();
            }
            setFines(response.fines || []);
        } catch (err) {
            console.error('Error fetching fines:', err);
            setError(err.response?.data?.message || 'Failed to fetch fines');
        } finally {
            setLoading(false);
        }
    }, [isAdmin, page, limit, filterStatus]);

    useEffect(() => {
        fetchFines();
        if (isAdmin) {
            fetchStatistics();
        }
    }, [fetchFines, isAdmin, fetchStatistics]);

    const handlePayFine = async (fineId, paymentMethod) => {
        try {
            await finesAPI.payFine(fineId, { paymentMethod });
            // Refresh fines list
            fetchFines();
            if (isAdmin) {
                fetchStatistics();
            }
        } catch (err) {
            console.error('Error paying fine:', err);
            throw err;
        }
    };

    const handleWaiveFine = async (fineId, reason) => {
        try {
            await finesAPI.waiveFine(fineId, reason);
            // Refresh fines list
            fetchFines();
            if (isAdmin) {
                fetchStatistics();
            }
        } catch (err) {
            console.error('Error waiving fine:', err);
            throw err;
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Fines & Payments</h1>
                    <p className="text-gray-600">
                        {isAdmin ? 'Manage all outstanding and paid fines' : 'View and pay your fines'}
                    </p>
                </div>
            </div>

            {/* Statistics Cards (Admin Only) */}
            {isAdmin && statistics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Total Fines</p>
                        <p className="text-2xl font-bold">{statistics.totalFines || 0}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Unpaid Fines</p>
                        <p className="text-2xl font-bold text-red-600">{statistics.totalUnpaid || 0}</p>
                        <p className="text-sm text-gray-500">${(statistics.totalUnpaidAmount || 0).toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Paid Fines</p>
                        <p className="text-2xl font-bold text-green-600">{statistics.totalPaid || 0}</p>
                        <p className="text-sm text-gray-500">${(statistics.totalPaidAmount || 0).toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-600 text-sm">Total Amount</p>
                        <p className="text-2xl font-bold">${(statistics.totalAmount || 0).toFixed(2)}</p>
                    </div>
                </div>
            )}

            {/* Filter Tabs (Admin Only) */}
            {isAdmin && (
                <div className="mb-4 flex gap-2">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg ${
                            filterStatus === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        All Fines
                    </button>
                    <button
                        onClick={() => setFilterStatus('unpaid')}
                        className={`px-4 py-2 rounded-lg ${
                            filterStatus === 'unpaid'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Unpaid
                    </button>
                    <button
                        onClick={() => setFilterStatus('paid')}
                        className={`px-4 py-2 rounded-lg ${
                            filterStatus === 'paid'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Paid
                    </button>
                </div>
            )}

            {/* Fine Table */}
            <div className="mt-6">
                <FineTable 
                    fines={fines}
                    loading={loading}
                    error={error}
                    isAdmin={isAdmin}
                    onPayFine={handlePayFine}
                    onWaiveFine={handleWaiveFine}
                    onRefresh={fetchFines}
                />
            </div>
        </div>
    );
}
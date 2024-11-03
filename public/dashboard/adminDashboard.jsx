// AdminDashboard.jsx
import React, { useState } from 'react';
import Modal from './Modal';

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div>
            <button onClick={openModal}>Add Cashier</button>
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
};

// adminDashboard.jsx
socket.on('receipt-generated', (data) => {
  console.log('Admin: Receipt Generated', data);
  // Display receipt
  // Add functionality to cancel or approve orders
});

socket.on('payment-processed', (data) => {
  console.log('Admin: Payment Processed', data);
  // Update payment status
});

// cashier.html
<script>
  socket.on('receipt-generated', (data) => {
    console.log('Cashier: Receipt Generated', data);
    // Print or display receipt
  });
</script>
export default AdminDashboard;

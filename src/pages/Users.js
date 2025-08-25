import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getDefaulters, lockUser, unlockUser } from "../api/allApi";
import { Modal, Table, Button, Form } from "react-bootstrap";
import { showAlert } from "../alert";

const Users = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // 🔥 new state
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    getDefaulters().then((res) => {
      const data = res?.data || [];
      setCountries(data);
      setFilteredData(data);
    });
  }, []);

  // 🔍 Search + Filter
  useEffect(() => {
    let data = [...countries];

    // filter by search (only name + phoneNumber for performance)
    if (search) {
      const lower = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name?.toLowerCase().includes(lower) ||
          c.phoneNumber?.toLowerCase().includes(lower)
      );
    }

    // filter by status (if selected)
    if (statusFilter) {
      data = data.filter(
        (c) =>
          c.repay?.some((r) => r.status.toLowerCase() === statusFilter.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [search, statusFilter, countries]);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone Number", selector: (row) => row.phoneNumber, sortable: true },
    { name: "IMEI", selector: (row) => row.imei, sortable: true },
  ];

  const handleRowClicked = (row) => {
    setSelectedUser(row);
    setIsLocked(row.isLocked);
    setShowModal(true);
  };

  const getRowClass = (status) => {
    switch (status) {
      case "Pending": return "table-warning";
      case "Paid": return "table-success";
      case "Overdue": return "table-danger";
      default: return "";
    }
  };

  const handleLock = async () => {
    try {
      await lockUser(selectedUser?.imei);
      setIsLocked(true);  
      showAlert("success", "Locked!", "Device locked successfully");
  } catch (err) {
    console.error(err);
    showAlert("error", "Failed!", "Unable to lock device");
  }
};

  const handleUnlock = async () => {
    try {
      await unlockUser(selectedUser?.imei);
      setIsLocked(false);
     showAlert("success", "Unlocked!", "Device unlocked successfully");
  } catch (err) {
    console.error(err);
    showAlert("error", "Failed!", "Unable to unlock device");
  }
};

  return (
    <Layout>
      <div className="d-flex gap-2 mb-3">
        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by Name or Phone..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🎛 Dropdown Filter */}
        <Form.Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-auto"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </Form.Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        noDataComponent="No records found"
        paginationRowsPerPageOptions={[5, 10, 15]}
        onRowClicked={handleRowClicked}
      />

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Repayment History - {selectedUser?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser?.repay?.length > 0 ? (
            <Table striped bordered hover responsive className="text-center align-middle">
              <thead>
                <tr>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.repay.map((r) => (
                  <tr key={r.id} className={getRowClass(r.status)}>
                    <td>{new Date(r.dueDate).toLocaleDateString()}</td>
                    <td>{r.amount.toLocaleString()}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted text-center">No repayment history available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleUnlock} 
            disabled={!isLocked}
          >
            Unlock Device
          </Button>
          <Button 
            variant="danger" 
            onClick={handleLock} 
            disabled={isLocked}
          >
            Lock Device
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Users;

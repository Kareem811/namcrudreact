import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import tableStyles from "./table.module.css";
import axiosClient from "../../axiosClient";

const ShowUsers = () => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setSelectedRole((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };
  const updateRole = async (userId) => {
    const newRole = selectedRole[userId];
    if (!newRole) return;

    try {
      const roleToSend = newRole.toLowerCase(); 
      const res = await axiosClient.post(`/updaterole/${userId}`, { role: roleToSend });
      setDone(true);
    } catch (error) {
      console.error("Error updating role:", error);
      setError(true);
    }
  };
  const renderRoleOptions = (currentRole) => {
    const roles = ["Admin", "Assistant", "User"];
    return roles
      .filter((role) => role !== currentRole)
      .map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ));
  };

  return (
    <>
      <Navbar />
      <div className={tableStyles.container}>
        {done && (
          <div className={tableStyles.success}>
            <div className={tableStyles.message}>
              <h1>Role Updated Successfully</h1>
              <button onClick={() => setDone(false)}>Confirm</button>
            </div>
          </div>
        )}
        {error && (
          <div className={tableStyles.error}>
            <div className={tableStyles.message}>
              <h1>Error Updating Role</h1>
              <button onClick={() => setError(false)}>Close</button>
            </div>
          </div>
        )}
        {loading ? (
          <p>Loading .... </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.username}</td>
                  <td>{el.email}</td>
                  <td>
                    <select onChange={(e) => handleRoleChange(el.id, e.target.value)} value={selectedRole[el.id] || el.role}>
                      <option value={el.role} disabled>
                        {el.role}
                      </option>
                      {renderRoleOptions(el.role)}
                    </select>
                  </td>
                  <td className={tableStyles.actions}>
                    <button onClick={() => updateRole(el.id)}>Update Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ShowUsers;

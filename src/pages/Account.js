import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser, logout } from '../utils/auth';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Set user data
    setUser(currentUser);
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: '' 
    });
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
    
    // Reset form data if canceling
    if (isEditing && user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First name, last name, and email are required');
      setLoading(false);
      return;
    }

    // Password length
    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Update (Add password only if it was changed)
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    
    if (formData.password) {
      updateData.password = formData.password;
    }

    // Attempt to update user
    const result = updateUser(updateData);
    
    if (result.success) {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
      setSuccess('Account updated successfully!');
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  if (!user) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title mb-0">My Account</h2>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* View Mode */}
              {!isEditing ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">First Name</label>
                    <p className="form-control-plaintext">{user.firstName}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Last Name</label>
                    <p className="form-control-plaintext">{user.lastName}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{user.email}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Member Since</label>
                    <p className="form-control-plaintext">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleEditToggle}
                  >
                    Edit Account
                  </button>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSubmit}>
                  {/* First Name input */}
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Last Name input */}
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password input (optional) */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password <span className="text-muted">(leave blank to keep current)</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    <small className="text-muted">Minimum 6 characters if changing</small>
                  </div>

                  {/* Action buttons */}
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-success flex-grow-1"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary flex-grow-1"
                      onClick={handleEditToggle}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

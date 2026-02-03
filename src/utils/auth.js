//  Get Set Users
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Get Set currently logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Logout
export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Register
export const registerUser = (userData) => {
  const users = getUsers();
  
  // Email Redundant
  const emailExists = users.some(user => user.email === userData.email);
  if (emailExists) {
    return { success: false, message: 'Email already registered' };
  }
  
  // New user UID
  const newUser = {
    id: Date.now(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: 'Registration successful' };
};

// Login
export const loginUser = (email, password) => {
  const users = getUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    return { success: true, message: 'Login successful' };
  }
  
  return { success: false, message: 'Invalid email or password' };
};

// Update
export const updateUser = (updatedData) => {
  const users = getUsers();
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return { success: false, message: 'No user logged in' };
  }

  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Redundant Email
  if (updatedData.email !== users[userIndex].email) {
    const emailExists = users.some(u => u.email === updatedData.email && u.id !== currentUser.id);
    if (emailExists) {
      return { success: false, message: 'Email already in use' };
    }
  }
  
  // Update( Edit )
  users[userIndex] = {
    ...users[userIndex],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };
  
  saveUsers(users);
  
  // Update( Edit )
  const { password, ...userWithoutPassword } = users[userIndex];
  setCurrentUser(userWithoutPassword);
  
  return { success: true, message: 'Account updated successfully' };
};

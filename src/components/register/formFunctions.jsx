import React from 'react';

export const handleSubmit = (formData, onClose) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
  const newUserId = lastUserId + 1;

  const currentDate = new Date().toISOString();

  const newUser = {
    id: newUserId,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    description: '', 
    createdAt: currentDate,
    updatedAt: currentDate
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  onClose();
};

export const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/auth/AuthContext';
import { getDoc, doc, getFirestore } from "firebase/firestore";

export const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: user?.displayName || '',
    email: user?.email || '',
    password: '',
    bio: '',
    createdAt: ''
  });
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setFormState(prevState => ({
            ...prevState,
            bio: userData.bio || '',
            createdAt: userData.createdAt || ''
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      displayName: formState.username,
      bio: formState.bio,
      password: formState.password.trim() !== '' ? formState.password : null
    };

    const { ok, message, errorMessage } = await updateUserProfile(updatedUserData);

    if (ok) {
      setUpdateMessage(message || 'Perfil actualizado correctamente');

      const updatedUser = {
        ...user,
        displayName: formState.username,
        bio: formState.bio
      };

      setFormState(prevState => ({
        ...prevState,
        username: formState.username,
        password: '',
        bio: formState.bio
      }));
    } else {
      setUpdateMessage(errorMessage || 'Error al actualizar el perfil');
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="vh-100 bg-gray">
      <div className="row justify-content-center container-fluid vh-100">
        <div className="col-md-10 bg-light">
          <form onSubmit={handleUpdate}>
            <br />
            <h3>Mi perfil</h3>
            <div className="bg-purple d-flex align-items-center justify-content-center">
              <img
                src={user?.photoURL || '/default-profile.png'}
                className="border border-gray border-5 img-fluid rounded-circle"
                alt="Foto de perfil"
              />
            </div>
            <p className="ms-auto me-5">
              Creado el: {formState.createdAt && new Date(formState.createdAt).toLocaleDateString()}
            </p>
            <br />

           

            <div className="input-group mb-3">
              <input
                type="text"
                required
                className="form-control"
                placeholder="Nombre de usuario"
                value={formState.username}
                onChange={handleChange}
                name="username"
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={formState.email || user?.googleEmail || ''}
                
                readOnly
                name="email"
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Nueva Contraseña"
                value={formState.password}
                onChange={handleChange}
                name="password"
              />
            </div>

            <div className="input-group mb-3">
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                rows="3"
                placeholder="Bio"
                value={formState.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            <br />
            <div>
              <button className="btn btn-outline-dark text-dark" type="submit">
                Modificar
              </button>
              {updateMessage && (
                <p className={updateMessage.includes('Error') ? 'text-danger' : 'text-success'}>
                  {updateMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



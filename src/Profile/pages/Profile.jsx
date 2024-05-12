import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthContext';
import { useContext, useState, useEffect } from "react";

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: user?.displayName,
    email: user?.email,
    password: '',
    description: user?.bio || ''
  });

  const handleUpdate = (e) => {
    e.preventDefault();

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
        <div className="col-md-10  bg-light">
          <div className="bg-purple d-flex align-items-center">
            <img
              src={user?.photoURL}
              className="border border-gray border-5 img-fluid"
              alt="Imagen Redonda"
            />
          </div>
          <form onSubmit={handleUpdate}>
            <br/>
            <h3>Mi perfil</h3>
            <p className="ms-auto me-5">Creado el: {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}</p>
            {}
            <br></br>
            <div className="input-group mb-3">
              <input
                type="text"
                required
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                placeholder={user?.displayName}
                value={formState.username}
                onChange={handleChange}
                name="username"
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="email"
                required
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                placeholder={user?.email}
                value={formState.email}
                onChange={handleChange}
                name="email"
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                required
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
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
                value={formState.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <br></br>
            <div>
              <button className="btn btn-outline-dark text-dark" type="submit">
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

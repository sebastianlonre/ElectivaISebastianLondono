import { Link } from "react-router-dom"
import { AuthContext } from '../context/auth/AuthContext';
import { useContext, useState, useEffect } from "react";

export const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: user?.username,
    email: user?.email,
    password: user?.password,
    description: user?.description
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(formState);
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
              src="https://misanimales.com/wp-content/uploads/2019/02/tipos-de-picos-de-aves-150x150.jpg"
              className="border border-gray border-5 img-fluid"
              alt="Imagen Redonda"
            />
            <h2 className="text-white ms-auto me-5">{user?.username}</h2>
          </div>
          <form onSubmit={handleUpdate}>
            <br/>
            <h3>Mi perfil</h3>
            <p className="ms-auto me-5">creado el: {user?.createdAt}</p>
            <br></br>
            <div className="input-group mb-3">
              <input 
                type="text" 
                required
                className="form-control" 
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default" 
                placeholder={user?.username}
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
                placeholder={formState.email}
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
                placeholder={formState.password}
                value={formState.password}
                onChange={handleChange}
                name="password"
              />
            </div>

            <div className="input-group mb-3">
              <textarea 
                class="form-control" 
                id="exampleFormControlTextarea1" 
                rows="3" 
                placeholder={formState.description}
                value={formState.description}
                onChange={handleChange}
                name="description"
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
  )
}


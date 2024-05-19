import { useParams } from "react-router-dom";
import { SocialContext } from "../context";
import { useContext, useEffect } from "react";

export const ViewProfile = () => {
  const { id } = useParams();
  const { social, getUserByID } = useContext(SocialContext);

  useEffect(() => {
    getUserByID(id);
  }, []);

  return (
    <div className="vh-100 bg-light">
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6 bg-white shadow-sm p-4 rounded">
          <h3 className="mb-4 text-center">{social.displayName || "Nombre de usuario"}</h3>
          <div className="d-flex justify-content-center mb-4">
            <div
              style={{
                width: '130px',
                height: '130px',
                overflow: 'hidden',
                borderRadius: '50%',
                border: '5px solid gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={social.photoURL || "/default-profile.png"}
                alt="Foto de perfil"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill'
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <p>{social.displayName || "Nombre de usuario"}</p>
          </div>
          <div className="mb-3">
            <p>{social.bio || "Bio del usuario"}</p>
          </div>
          <p className="text-muted">
            Creado el: {social.createdAt || "Fecha de creación"}
          </p>
          <p className="text-muted">
            Última actualización: {social.createdAt || "Fecha de última actualización"}
          </p>
          <button>
                seguir
          </button>
        </div>
      </div>
    </div>
  );
};

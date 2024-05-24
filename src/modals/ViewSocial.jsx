import { useNavigate } from 'react-router-dom';
import { SocialContext } from '../social/context';
import { useContext } from 'react';

export const ViewSocial = ({ isOpen, onClose, title, socialData }) => {
  const navigate = useNavigate();
  const { social, getUserByID } = useContext(SocialContext);

  const onViewProfile = (id) => {
    navigate(`/ViewProfile/${id}`);
    location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card w-50 p-4">
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose}></button>
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              {socialData.length > 0 ? (
                <div className="list-group">
                  {socialData.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      onClick={() => onViewProfile(item.id)}
                    >
                      {item.displayName}
                      <span className="badge bg-dark rounded-pill">Ver</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="card-text">No hay datos disponibles</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import { useNavigate } from 'react-router-dom';
import { SocialContext } from '../social/context';
import { useContext, useState, useEffect } from 'react';

export const ViewSocial = ({ isOpen, onClose, tittle, socialData }) => {

  const {social ,getUserByID} = useContext(SocialContext)
  const navigate = useNavigate();


  const View = (id) => {
    navigate(`/ViewProfile/${id}`);
    location.reload();
  }

  return (
    <>
      {isOpen && (
        <div className="overlay position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose}></button>
            <h4>{tittle}</h4>
            {socialData.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">usuario</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {socialData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.displayName}</td>
                      <td>
                        <button
                          className="btn btn-outline-dark text-dark mt-3"
                          onClick={() => View(item.id)}
                        >
                          ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

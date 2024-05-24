import { useParams } from "react-router-dom";
import { SocialContext } from "../context";
import { useContext, useEffect, useState } from "react";
import { ViewSocial } from "../../modals/ViewSocial";
import { useModal } from "../../modals/hooks/useModal";
import { AuthContext } from "../../context/auth";

export const ViewProfile = () => {
  const { id } = useParams();
  const { social, followers, following, getUserByID, followUser, unFollowUser, MyFollowing, getFollowers, getFollowing, getMyFollowing } = useContext(SocialContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserByID(id);
    getFollowers(id);
    getFollowing(id);
    getMyFollowing();
  }, []);

  const [tittleModal, setTittleModal] = useState("");
  const [socialData, setSocialData] = useState(null);
  const socialModal = useModal();

  const openFollowersModal = () => {
    setTittleModal("Seguidores");
    setSocialData(followers);
    socialModal.openModal();
  };

  const openFollowingModal = () => {
    setTittleModal("Sigue a");
    setSocialData(following);
    socialModal.openModal();
  };

  const onFollowClick = async (event) => {
    event.preventDefault();
    await followUser(id, social.displayName, user.displayName);
    location.reload();
  };

  const onUnFollowClick = async (event) => {
    event.preventDefault();
    await unFollowUser(id, social.displayName, user.displayName);
    location.reload();
  };

  const isFollowing = followers.some((follower) => follower.id === user.uid);

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
          <div className="mb-2">
            <button className="nav-link" type="button" onClick={openFollowersModal}>
              Seguidores: {followers.length}
            </button>
            <button className="nav-link" type="button" onClick={openFollowingModal}>
              Sigue a: {following.length}
            </button>
          </div>
          <div className="mb-3">
            <p>{social.displayName || "Nombre de usuario"}</p>
          </div>
          <div className="mb-3">
            <p>Biografía: {social.bio || "Bio del usuario"}</p>
          </div>
          <p className="text-muted">
            Creado el: {social.createdAt || "Fecha de creación"}
          </p>
          <p className="text-muted">
            Última actualización: {social.updatedAt || "Fecha de última actualización"}
          </p>
          {id !== user.uid && !isFollowing && (
            <button className="btn btn-primary" onClick={onFollowClick}>
              Seguir
            </button>
          )}
          {id !== user.uid && isFollowing && (
            <button className="btn btn-primary" onClick={onUnFollowClick}>
              Dejar de seguir
            </button>
          )}
        </div>
      </div>
      <ViewSocial isOpen={socialModal.isOpen} onClose={socialModal.closeModal} title={tittleModal} socialData={socialData}/>
    </div>
  );
};
import useHttp from '../hooks/useHttp';
import { useEffect } from 'react';
import { apiGetMyProfile } from '../services/user';
import { ApiConfig } from '../config/api-config-class';
import headerCommon from '../config/common-headers';

const UserProfile = () => {
    const {
        response: gotUserData,
        isLoading: isUserProfileFetching,
        apiFunc: getUserProfileFunc,
    } = useHttp();
    useEffect(()=>{
        getUserProfileFunc(apiGetMyProfile, new ApiConfig({},{}, headerCommon()),"GET");
    }, [getUserProfileFunc]);
  return (
    <section style={{ backgroundColor: '#eee' }}>
      {
        gotUserData && <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{gotUserData.full_name}</h5>
                <p className="text-muted mb-1 text-capitalize">{gotUserData.user_type}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{gotUserData.full_name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{gotUserData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{gotUserData.mobile}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{gotUserData.username}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </section>
  );
};
export default UserProfile;

import { Link } from "react-router-dom";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaGithub, FaFacebook, FaConciergeBell } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Auth = ({ handleLogin, handleRegister }) => {
  const { isInvalid, handleInvalid, handleGoogleLogin } = useAuth();

  useEffect(() => {
    if (isInvalid) {
      if (handleRegister) {
        Swal.fire(
          "Invalid",
          "All fields are required | The email already exists | Password must be at least 6 characters long.",
          "error"
        ).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            handleInvalid();
          }
        });
      } else {
        Swal.fire("Invalid", "Failed to login. Try Again!", "error").then(
          (result) => {
            if (result.isConfirmed || result.isDismissed) {
              handleInvalid();
            }
          }
        );
      }
    }
  }, [isInvalid]);

  return (
    <div
      className="bg-light d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="card rounded-5 border-0"
        style={{ width: "30rem" }}
        data-aos="fade"
      >
        <div className="card-body pt-5 px-5 pb-5">
          <p>
            <span className="fs-1">
              <FaConciergeBell className="text-danger" />
            </span>
            <span className="mx-3">
              Welcome to <span className="fw-bold">Cashier Dashboard</span>
            </span>
          </p>
          <h1 className="card-title mb-4">
            {handleRegister ? "Sign Up" : "Sign In"}
          </h1>
          <form onSubmit={handleRegister ? handleRegister : handleLogin}>
            {handleRegister ? (
              <>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Fullname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      autoComplete="fullname"
                    />
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-2">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        autoComplete="username"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="whatsapp" className="form-label">
                        WhatsApp
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="whatsapp"
                        name="whatsapp"
                        autoComplete="whatsapp"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        autoComplete="password"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    autoComplete="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    autoComplete="password"
                  />
                </div>
              </>
            )}

            <div className="mb-3 mt-5">
              <Button
                text={handleRegister ? "Sign Up" : "Sign In"}
                color={"danger"}
                type="submit"
              />
            </div>
            <div className="mb-5">
              <span className="text-muted">
                {handleRegister
                  ? "Have an account?"
                  : "Haven't an account yet?"}{" "}
                <Link
                  to={handleRegister ? "/login" : "/register"}
                  className="text-decoration-none text-dark"
                >
                  {handleRegister ? "Login" : "Register"}
                </Link>
              </span>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <Button
                text={<FcGoogle className="border rounded-circle fs-1 p-2" />}
                handleClick={handleGoogleLogin}
              ></Button>
              <Button
                text={<FaFacebook className="border rounded-circle fs-1 p-2" />}
                handleClick={handleGoogleLogin}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import { useStoreDispatch, useStoreSelector } from "../store";
import { clearAlert } from "../store/alertSlice";

export const Alerts = () => {
  const dispatch = useStoreDispatch();
  const alerts = useStoreSelector((s) => s.alert.alerts);

  return (
    <div
      className="container position-fixed start-50 translate-middle mt-5"
      style={{ zIndex: 2000 }}
    >
      {alerts.length > 0 && (
        <>
          {alerts.map(({ id, message }) => (
            <div
              className="alert alert-danger alert-dismissible m-3 fade show"
              role="alert"
              key={id}
            >
              {message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => dispatch(clearAlert({ id }))}
              ></button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext(undefined);

const TOAST_STYLES = {
  success: {
    accent: "border-emerald-500",
    dot: "bg-emerald-500",
  },
  error: {
    accent: "border-rose-500",
    dot: "bg-rose-500",
  },
  info: {
    accent: "border-sky-500",
    dot: "bg-sky-500",
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutRefs = useRef(new Map());

  const dismissToast = (id) => {
    const timeoutId = timeoutRefs.current.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }

    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  const showToast = ({ type = "info", title, message, duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setToasts((currentToasts) => [
      ...currentToasts,
      { id, type, title, message },
    ]);

    if (typeof window !== "undefined" && duration > 0) {
      const timeoutId = window.setTimeout(() => {
        dismissToast(id);
      }, duration);

      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  };

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRefs.current.clear();
    };
  }, []);

  const toast = {
    success: (message, options = {}) =>
      showToast({ ...options, type: "success", message }),
    error: (message, options = {}) =>
      showToast({ ...options, type: "error", message }),
    info: (message, options = {}) =>
      showToast({ ...options, type: "info", message }),
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}

      <div className="pointer-events-none fixed top-4 right-0 left-0 z-50 flex flex-col items-center gap-3 px-4 sm:top-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-sm sm:items-stretch sm:px-0">
        {toasts.map((toastItem) => {
          const style = TOAST_STYLES[toastItem.type] ?? TOAST_STYLES.info;

          return (
            <div
              key={toastItem.id}
              className={`pointer-events-auto w-full rounded-xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)] ${style.accent}`}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`}
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  {toastItem.title ? (
                    <p className="text-sm font-semibold text-slate-900">
                      {toastItem.title}
                    </p>
                  ) : null}

                  <p
                    className={`text-sm text-slate-600 ${
                      toastItem.title ? "mt-1" : ""
                    }`}
                  >
                    {toastItem.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toastItem.id)}
                  className="text-xs font-medium text-slate-400 transition hover:text-slate-600"
                  aria-label="Dismiss notification"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

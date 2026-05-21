import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthInput = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={
            isPasswordField
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 ${
            error ? "border-red-400" : "border-white/10"
          }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-300"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
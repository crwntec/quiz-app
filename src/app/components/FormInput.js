"use client"; // Mark this file as a client component

export default function FormInput({ label, name, type, isValid, errorMsg }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        placeholder={label}
        className="input input-bordered"
      />
      {!isValid && (
        <label className="label">
          <span className="label-text-alt text-error">{errorMsg}</span>
        </label>
      )}
    </div>
  );
}

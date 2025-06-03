import { Formik } from "formik";
import { profileSchema } from "./schemas";

export default function ProfileUpdateForm({ profile, onSubmit }) {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={profileSchema}
      initialValues={{
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        role: profile?.role || "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        isValid,
        isSubmitting,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-semibold">
              Ім'я
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded px-3 py-2 mt-1 ${
                errors.firstName && touched.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.firstName && touched.firstName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold">
              Прізвище
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded px-3 py-2 mt-1 ${
                errors.lastName && touched.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.lastName && touched.lastName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.lastName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold mb-1">Роль</span>

            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={values.role === "user"}
                onChange={handleChange}
                className="accent-black"
              />
              <span>user</span>
            </label>

            <label className="inline-flex items-center gap-2 mt-1">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={values.role === "admin"}
                onChange={handleChange}
                className="accent-black"
              />
              <span>admin</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white disabled:opacity-50"
            disabled={!isValid || isSubmitting}
          >
            Зберегти
          </button>
        </form>
      )}
    </Formik>
  );
}

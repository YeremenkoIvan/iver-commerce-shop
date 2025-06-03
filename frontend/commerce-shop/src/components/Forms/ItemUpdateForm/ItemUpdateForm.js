import { Formik } from "formik";
import { itemSchema } from "./schemas";

export default function ItemUpdateForm({ profile, onSubmit }) {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={itemSchema}
      enableReinitialize
      initialValues={{
        name: profile?.name || "",
        price: profile?.price || "",
        description: profile?.description || "",
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
            <label htmlFor="name" className="font-semibold">
              Назва
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded px-3 py-2 mt-1 ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.name && touched.name && (
              <span className="text-sm text-red-500 mt-1">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="font-semibold">
              Ціна
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded px-3 py-2 mt-1 ${
                errors.price && touched.price
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.price && touched.price && (
              <span className="text-sm text-red-500 mt-1">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="font-semibold">
              Опис
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded px-3 py-2 mt-1 ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.description && touched.description && (
              <span className="text-sm text-red-500 mt-1">
                {errors.description}
              </span>
            )}
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

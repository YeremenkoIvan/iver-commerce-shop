import * as yup from "yup";

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Ім'я не може бути пустим")
    .min(2, "Від 2 символів"),
  lastName: yup
    .string()
    .required("Прізвище не може бути пустим")
    .min(2, "Від 2 символів"),
  role: yup
    .string()
    .required("Роль не може бути пустою")
    .oneOf(["user", "admin"], "Виберіть одне із значень"),
});

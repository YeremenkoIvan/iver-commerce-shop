import * as yup from "yup";

export const itemSchema = yup.object().shape({
  name: yup
    .string()
    .required("Назва не може бути пустою")
    .min(4, "Від 4 символів"),
  price: yup
    .number()
    .required("Ціна не може бути пустою")
    .positive("Ціна має бути більше нуля"),
  description: yup
    .string()
    .required("Опис не може бути пустим")
    .min(10, "Від 10 символів"),
});

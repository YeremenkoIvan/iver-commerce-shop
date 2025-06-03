import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function Icon({ icon, ...props }) {
  const { className, ...restProps } = props;
  const modifiedClassName = classNames(className);

  return (
    <FontAwesomeIcon icon={icon} className={modifiedClassName} {...restProps} />
  );
}

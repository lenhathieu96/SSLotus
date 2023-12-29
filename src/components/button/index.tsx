import BaseButton from "./base-button";
import IconButton from "./icon-button";
import { IBaseButtonProps } from "./index.props";

const Button = ({ ...props }: IBaseButtonProps) => {
  return <BaseButton {...props} />;
};

export default Button;

Button.Icon = IconButton;

export interface IToast {
  title: string;
  text: string;
}

const ToastView = ({ title, text }: IToast) => {
  return (
    <div className="bg-primary-200">
      <p className="font-semibold text-h3">{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default ToastView;

import Icon from "../../Common/Icon";

export default function TabTitle({ icon, text }) {
  return (
    <div className="text-sm text-black font-semibold">
      <Icon icon={icon} className="text-sm" /> {text}
    </div>
  );
}

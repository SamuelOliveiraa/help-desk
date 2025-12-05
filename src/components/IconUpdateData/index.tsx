import { RefreshCcw } from "lucide-react";

type IconUpdateDataProps = {
  loading: boolean;
  onUpdate: () => void;
};

export default function IconUpdateData({
  loading,
  onUpdate,
}: IconUpdateDataProps) {
  return (
    <div title="Atualizar" className="w-full flex items-end justify-end">
      <RefreshCcw
        size={24}
        onClick={() => {
          !loading && onUpdate();
        }}
        className="cursor-pointer"
      />
    </div>
  );
}

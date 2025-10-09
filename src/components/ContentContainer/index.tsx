type ContentContainerProps = {
  children: React.ReactNode;
};

export default function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div className="w-full p-7 border border-gray-500 rounded-md flex flex-col gap-6">
      {children}
    </div>
  );
}

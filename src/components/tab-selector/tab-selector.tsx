interface TabSelectorProps {
  activeTab: string;
  isLoading?: boolean;
  setActiveTab: (tab: string) => void;
}

const TabSelector = ({
  activeTab,
  isLoading,
  setActiveTab,
}: TabSelectorProps) => {
  return (
    <div className="absolute top-12 left-12 text-xl flex bg-white rounded-56px p-3">
      <button
        className={`py-2 px-4 rounded-full transition font-bold ${
          activeTab === "Live" ? "bg-primaryAvolta text-white" : "text-gray500"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!isLoading) setActiveTab("Live");
        }}
        disabled={isLoading}
      >
        Live
      </button>
      <button
        className={`py-2 px-4 rounded-full font-bold transition ${
          activeTab === "Static"
            ? "bg-primaryAvolta text-white "
            : "text-gray500"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!isLoading) setActiveTab("Static");
        }}
        disabled={isLoading}
      >
        Static
      </button>
    </div>
  );
};

export default TabSelector;

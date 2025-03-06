interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSelector = ({ activeTab, setActiveTab }: TabSelectorProps) => {
  return (
    <div className="absolute top-6 left-6 flex bg-white rounded-56px p-2">
      <button
        className={`py-2 px-4 rounded-full transition ${
          activeTab === "Live" ? "bg-primaryAvolta text-white" : "text-gray500"
        }`}
        onClick={() => setActiveTab("Live")}
      >
        Live
      </button>
      <button
        className={`py-2 px-4 rounded-full transition ${
          activeTab === "Static"
            ? "bg-primaryAvolta text-white"
            : "text-gray500"
        }`}
        onClick={() => setActiveTab("Static")}
      >
        Static
      </button>
    </div>
  );
};

export default TabSelector;

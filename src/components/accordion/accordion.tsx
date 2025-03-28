import { FaChevronDown } from "react-icons/fa";

const Accordion = ({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-300 pb-2 ">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-3 text-3xl font-semibold text-gray-800"
      >
        {title}
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-auto transition-max-height duration-300 ${
          isOpen ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        <div className="py-3 text-gray-700 text-4xl leading-[60px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

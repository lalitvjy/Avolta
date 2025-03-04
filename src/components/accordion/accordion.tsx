import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-3 text-lg font-semibold text-gray-800"
      >
        {title}
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="py-3 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;

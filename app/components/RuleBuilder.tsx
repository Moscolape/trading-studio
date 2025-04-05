import { useState } from "react";

interface RuleBuilderProps {
  title: string;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({ title, value, onChange }) => {
  const [rules, setRules] = useState<Record<string, string>>(value || {});
  const [ruleKey, setRuleKey] = useState("");
  const [ruleValue, setRuleValue] = useState("");

  const handleChange = (key: string, ruleValue: string) => {
    const updatedRules = { ...rules, [key]: ruleValue };
    setRules(updatedRules);
    onChange(updatedRules);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter rule key"
        value={ruleKey}
        onChange={(e) => setRuleKey(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter rule value"
        value={ruleValue}
        onChange={(e) => setRuleValue(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
        onClick={() => handleChange(ruleKey, ruleValue)}
        disabled={!ruleKey || !ruleValue}
      >
        Add Rule
      </button>
    </div>
  );
};

export default RuleBuilder;
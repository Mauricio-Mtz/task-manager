/* eslint-disable react/prop-types */
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const CopyGroupId = ({ groupId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(groupId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 border p-2 rounded-md justify-between">
      <code className="text-sm font-mono">{groupId}</code>
      <button
        onClick={handleCopy}
        className="p-1 hover:bg-slate-400 rounded-md transition-colors"
        title="Copy group ID"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default CopyGroupId;
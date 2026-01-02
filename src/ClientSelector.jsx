// ClientSelector.jsx
import React from 'react';

const ClientSelector = ({ clients, selected, setSelected }) => {
  const handleSelect = (clientId) => {
    if (selected.includes(clientId)) {
      setSelected(selected.filter(id => id !== clientId));
    } else {
      setSelected([...selected, clientId]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === clients.length) {
      setSelected([]);
    } else {
      setSelected(clients.map(client => client.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {selected.length === clients.length ? 'Deselect All' : 'Select All'}
        </button>
        <span className="text-sm text-gray-500">
          {selected.length} of {clients.length} selected
        </span>
      </div>
      
      <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
        {clients.map(client => (
          <div
            key={client.id}
            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
              selected.includes(client.id) ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleSelect(client.id)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                selected.includes(client.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {selected.includes(client.id) && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-gray-500">{client.email} • {client.phone}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ID: {client.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSelector;
"use client";
import { useState } from 'react';
import { clerkClient } from '@clerk/nextjs/server';

export default function SyncButton() {
  const [status, setStatus] = useState<string>('');

  const handleSync = async () => {
    setStatus('Syncing...');
    try {
      const response = await fetch('/api/sync-users', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error syncing users');
      }

      const result = await response.json();
      setStatus(`Finished syncing: ${result.message}`);
    } catch (error) {
      console.error('SyncButton error:', error);
      setStatus('Error syncing');
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleSync}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sync users
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
}
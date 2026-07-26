'use client';

import { useState, useTransition } from 'react';
import { generateToken } from '../actions/users';

const ApiTokenSection = ({ initialToken }: { initialToken: string | null }) => {
  const [token, setToken] = useState(initialToken);
  const [isPending, startTransition] = useTransition();

  const handleGenerateToken = () => {
    startTransition(async () => {
      const newToken = await generateToken();
      setToken(newToken);
    });
  };

  return (
    <div data-testid="api-token-section">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">API token</h2>

      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Current token</p>

        {token ? (
          <div data-testid="token-display">
            <code
              data-testid="api-token"
              className="mt-2 block overflow-x-auto rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700"
            >
              {token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message" className="mt-2 text-slate-500">
            No token has been generated yet.
          </p>
        )}

        <button
          type="button"
          data-testid="generate-token-button"
          onClick={handleGenerateToken}
          disabled={isPending}
          className="mt-5 cursor-pointer rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? 'Generating…' : 'Generate new token'}
        </button>
      </div>
    </div>
  );
};

export default ApiTokenSection;

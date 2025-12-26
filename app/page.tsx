'use client';

import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, AlertTriangle, TrendingDown, DollarSign, MapPin, FileText } from 'lucide-react';

interface AuditResult {
  audit_status: string;
  markup: string;
  procedure: string;
  user_price: number;
  local_ceiling: number;
  ai_analysis: string;
}

export default function Home() {
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://workflowly.online/webhook/audit-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.toUpperCase().startsWith('D') ? code.toUpperCase() : `D${code}`,
          price: parseFloat(price),
          zip: zip
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText || 'Failed to audit estimate'}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but got: ${text.substring(0, 100)}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RED FLAG':
      case 'RED_FLAG': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'FAIR': return 'bg-green-500';
      case 'BELOW_CEILING': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RED_FLAG': return <AlertCircle className="w-6 h-6" />;
      case 'HIGH': return <AlertTriangle className="w-6 h-6" />;
      case 'FAIR': return <CheckCircle className="w-6 h-6" />;
      case 'BELOW_CEILING': return <TrendingDown className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'RED_FLAG': return 'Red Flag - Overpriced';
      case 'HIGH': return 'High Markup';
      case 'FAIR': return 'Fair Price';
      case 'BELOW_CEILING': return 'Excellent Value';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Estimate Guardian</h1>
              <p className="text-sm text-gray-600">NC Dental Price Checker | Stop Overcharging</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>Know Your Rights:</strong> Check if your dental office charges fair prices compared to NC Medicaid fee schedules.
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-xl font-semibold text-white">Check Your Estimate</h2>
            <p className="text-blue-100 text-sm mt-1">Enter your dental procedure details below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* CDT Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                CDT Procedure Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., D00120 or 00120"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Common codes: D00120 (Exam), D01110 (Cleaning), D02140 (Filling)</p>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Quoted Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="85.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Zip Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                North Carolina Zip Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="27601"
                maxLength={5}
                pattern="[0-9]{5}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Compare against NC Medicaid reimbursement rates</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Check Estimate
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="text-sm text-red-900">{error}</div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Status Header */}
            <div className={`${getStatusColor(result.audit_status)} p-6 text-white`}>
              <div className="flex items-center gap-3">
                {getStatusIcon(result.audit_status)}
                <div>
                  <h3 className="text-xl font-bold">{getStatusText(result.audit_status)}</h3>
                  <p className="text-sm opacity-90">{result.procedure}</p>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-6 space-y-6">
              {/* Price Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-600 mb-1">Your Quote</div>
                  <div className="text-2xl font-bold text-gray-900">${result.user_price.toFixed(2)}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-xs text-blue-600 mb-1">Fair Ceiling</div>
                  <div className="text-2xl font-bold text-blue-900">${result.local_ceiling.toFixed(2)}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-xs text-purple-600 mb-1">Markup</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {result.markup}
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Location Analysis</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Zip Code: {zip}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">NC Medicaid 2022</span>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">Analysis & Recommendation</div>
                    <p className="text-sm text-gray-700">{result.ai_analysis}</p>
                  </div>
                </div>
              </div>

              {/* Reference */}
              <div className="text-xs text-gray-500 text-center pt-4 border-t">
                Data Source: NC Medicaid Fee Schedule (Effective Feb 10, 2022)
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
        <p className="font-medium text-gray-900 mb-2">Free North Carolina Dental Price Verification Tool</p>
        <p>Estimate Guardian helps NC patients check dental estimates against NC Medicaid fee schedules. Verify CDT codes, compare quoted prices, and identify potential overcharging by dental offices in Charlotte, Raleigh, Durham, and across North Carolina. Know if you're paying fair prices for dental care.</p>
        <p className="mt-3 text-xs">For informational purposes only. Data source: NC Medicaid Dental Fee Schedule (Effective February 10, 2022). Not a substitute for professional financial or legal advice.</p>
      </footer>
    </div>
  );
}

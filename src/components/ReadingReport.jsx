import ReactMarkdown from 'react-markdown'

function ReadingReport({ reading, name, onNewReading }) {
 return (
    <div className="space-y-6 pb-10">

      {/* ── Report Header ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 text-yellow-600 mb-3">
          <span className="text-xl">☽</span>
          <span className="text-2xl">☀</span>
          <span className="text-xl">✦</span>
        </div>
        <h2 className="font-serif text-2xl font-medium text-gray-800 mb-1">
          Your Vedic Reading
        </h2>
        <p className="text-sm text-gray-500">
          Prepared for <span className="font-medium text-gray-700">{name}</span>
        </p>
        <div className="w-8 h-0.5 bg-yellow-600 rounded mx-auto mt-3"></div>
      </div>

      {/* ── The Reading ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="prose-jyotish">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="font-serif text-xl font-medium text-gray-800 mt-8 mb-3 pb-2 border-b border-gray-100 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-medium text-gray-700 mt-4 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-medium text-gray-800">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-yellow-500 pl-4 my-4 bg-yellow-50 py-3 pr-3 rounded-r-lg">
                  <div className="text-sm text-yellow-800 italic leading-relaxed">
                    {children}
                  </div>
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-4">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="text-yellow-500 mt-1 flex-shrink-0">✦</span>
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {reading}
          </ReactMarkdown>
        </div>
      </div>

      {/* ── New Reading Button ── */}
      <button
        onClick={onNewReading}
        className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
      >
        ✦ Start a New Reading
      </button>

    </div>
  )
}

export default ReadingReport
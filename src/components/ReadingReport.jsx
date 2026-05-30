import ReactMarkdown from 'react-markdown'

function ReadingReport({ reading, name, onNewReading }) {
  return (
    <div className="space-y-5 pb-10">

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-3 text-yellow-400 mb-3">
          <span className="text-xl">☽</span>
          <span className="text-2xl">☀</span>
          <span className="text-xl">✦</span>
        </div>
        <h2 className="font-serif text-2xl font-medium text-white mb-1">
          Your Cosmic Reading
        </h2>
        <p className="text-sm text-white/50">
          Prepared for{' '}
          <span className="font-medium text-yellow-300">{name}</span>
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-3"></div>
      </div>

      {/* Reading Body */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="font-serif text-lg font-medium text-yellow-300 mt-8 mb-3 pb-2 border-b border-white/10 first:mt-0 flex items-center gap-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-medium text-white/90 mt-4 mb-2 text-sm">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-white/75 leading-relaxed mb-3 text-sm">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-yellow-200">
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="text-white/90 not-italic font-medium">
                {children}
              </em>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-yellow-500 pl-4 my-5 bg-yellow-500/10 py-4 pr-4 rounded-r-xl">
                <div className="text-sm text-yellow-200/90 leading-relaxed">
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
              <li className="flex gap-2 text-sm text-white/70 leading-relaxed">
                <span className="text-yellow-500 mt-0.5 flex-shrink-0 text-xs">✦</span>
                <span>{children}</span>
              </li>
            ),
            hr: () => (
              <div className="w-full h-px bg-white/10 my-6" />
            ),
          }}
        >
          {reading}
        </ReactMarkdown>
      </div>

      {/* New Reading */}
      <button
        onClick={onNewReading}
        className="w-full py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white/70 hover:bg-white/15 hover:text-white transition-all backdrop-blur-sm"
      >
        ✦ Start a New Reading
      </button>

      <p className="text-center text-xs text-white/25 pb-2">
        This reading is for guidance purposes only
      </p>

    </div>
  )
}

export default ReadingReport
import React from 'react'

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="flex items-start justify-between gap-4 mb-2">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172B]">{title}</h1>
        {subtitle && (
          <p className="text-base text-[#45556C] mt-1">{subtitle}</p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  )
}

export default PageHeader
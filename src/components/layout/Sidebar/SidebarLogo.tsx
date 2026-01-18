import React from 'react'

export interface SidebarLogoProps {
  isCollapsed: boolean
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ isCollapsed }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-divider">
      {isCollapsed ? (
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
      ) : (
        <>
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-lg font-bold text-text-primary">MYCash+</span>
        </>
      )}
    </div>
  )
}

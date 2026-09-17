import React, { useState } from 'react'
import { soundEngine } from '../../lib/sound'
import { Volume2, VolumeX } from 'lucide-react'

export const SoundToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggle = () => {
    const state = soundEngine.toggle()
    setIsPlaying(state)
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-xs border transition-all duration-300 font-mono text-[0.5625rem] sm:text-[0.625rem] tracking-[0.16em] uppercase cursor-pointer select-none ${
        isPlaying
          ? 'bg-veyra-surface border-veyra-brass text-veyra-brass shadow-2xs'
          : 'bg-veyra-surface/80 hover:bg-veyra-surface border-veyra-border text-veyra-muted hover:text-veyra-text'
      } ${className}`}
      title={isPlaying ? 'Mute Atelier Atmosphere' : 'Enable Atmospheric Sound'}
      aria-label="Toggle Sound"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-[2px] h-2.5">
            <span className="w-[1.5px] h-full bg-veyra-brass animate-pulse" />
            <span className="w-[1.5px] h-2/3 bg-veyra-brass animate-pulse delay-75" />
            <span className="w-[1.5px] h-4/5 bg-veyra-brass animate-pulse delay-150" />
          </div>
          <span>[ SOUND: ON ]</span>
        </>
      ) : (
        <>
          <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-veyra-faint" />
          <span>[ SOUND: OFF ]</span>
        </>
      )}
    </button>
  )
}

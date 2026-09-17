/**
 * Web Audio API Synthetic Ambient Atelier Atmosphere
 * 
 * Generates a warm, organic metallurgic drone using low-frequency
 * 432Hz fundamental with soft harmonic overtones and gentle low-pass filtering.
 * Zero external audio downloads, zero buffer delay, zero network requests.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private oscillators: OscillatorNode[] = []
  private isPlaying: boolean = false

  private init() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    this.ctx = new AudioCtx()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime)

    // Gentle low-pass filter to simulate stone atelier acoustics
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(680, this.ctx.currentTime)
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime)

    this.masterGain.connect(filter)
    filter.connect(this.ctx.destination)
  }

  public play() {
    try {
      this.init()
      if (!this.ctx || !this.masterGain) return

      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      this.stopOscillators()

      const now = this.ctx.currentTime
      // Fundamental 432Hz (warm acoustic pitch) divided down to sub-bass warmth (108Hz)
      const baseFreq = 108

      // 3 Harmonic Oscillators creating rich metallurgy drone
      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0] // 108Hz, 162Hz, 216Hz
      const oscTypes: OscillatorType[] = ['sine', 'triangle', 'sine']

      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator()
        const oscGain = this.ctx!.createGain()

        osc.type = oscTypes[i]
        osc.frequency.setValueAtTime(f, now)
        // Subtle micro-detune for organic shimmer
        osc.detune.setValueAtTime((i - 1) * 3, now)

        oscGain.gain.setValueAtTime(0.25 / (i + 1), now)
        osc.connect(oscGain)
        oscGain.connect(this.masterGain!)

        osc.start()
        return osc
      })

      // Smooth 2.2-second fade-in
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.setValueAtTime(0.001, now)
      this.masterGain.gain.linearRampToValueAtTime(0.08, now + 2.2)

      this.isPlaying = true
    } catch (e) {
      console.warn('Web Audio error:', e)
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return

    const now = this.ctx.currentTime
    // Smooth 1.4-second fade-out
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.4)

    setTimeout(() => {
      this.stopOscillators()
      this.isPlaying = false
    }, 1500)
  }

  private stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch {}
    })
    this.oscillators = []
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.play()
      return true
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying
  }
}

export const soundEngine = new SoundEngine()

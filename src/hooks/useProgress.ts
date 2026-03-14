"use client"

import { useState, useEffect } from "react"

export type AmaliyIshProgress = {
  id: number
  title: string
  completed: boolean
  steps_done: number[]
  total_steps: number
  score: number
}

export type ProgressData = {
  [key: string]: AmaliyIshProgress
}

export const defaultProgress: ProgressData = {
  "amaliy_4": { id: 4, title: "Nazariy kontent yaratish", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_5": { id: 5, title: "Amaliy va laboratoriya qismi", completed: false, steps_done: [], total_steps: 3, score: 0 },
  "amaliy_6": { id: 6, title: "Nazorat qismi (Testlar)", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_7": { id: 7, title: "Multimedia va video", completed: false, steps_done: [], total_steps: 5, score: 0 },
  "amaliy_8": { id: 8, title: "OER va ochiq litsenziyalar", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_9": { id: 9, title: "Forum va interaktiv muloqot", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_10": { id: 10, title: "Kurs interfeysi (UX/UI)", completed: false, steps_done: [], total_steps: 5, score: 0 },
  "amaliy_11": { id: 11, title: "Inklyuzivlik va accessibility", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_12": { id: 12, title: "Test sinovi loyihalash", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_13": { id: 13, title: "Kursni takomillashtirish", completed: false, steps_done: [], total_steps: 4, score: 0 },
  "amaliy_14": { id: 14, title: "Marketing strategiyasi", completed: false, steps_done: [], total_steps: 5, score: 0 },
  "amaliy_15": { id: 15, title: "Yakuniy demonstratsiya", completed: false, steps_done: [], total_steps: 5, score: 0 },
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("eduforge_progress")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Merge stored with default to ensure all keys exist in case of updates
        setProgress({ ...defaultProgress, ...parsed })
      } catch (e) {
        console.error("Error parsing progress", e)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress)
    localStorage.setItem("eduforge_progress", JSON.stringify(newProgress))
  }

  const completeStep = (amaliyId: number, stepIndex: number, points: number = 10) => {
    const key = `amaliy_${amaliyId}`
    const current = progress[key]
    
    if (!current) return

    if (!current.steps_done.includes(stepIndex)) {
      const newSteps = [...current.steps_done, stepIndex]
      const isCompleted = newSteps.length >= current.total_steps
      
      const newProgress = {
        ...progress,
        [key]: {
          ...current,
          steps_done: newSteps,
          score: current.score + points,
          completed: isCompleted
        }
      }
      saveProgress(newProgress)
    }
  }

  const markCompleted = (amaliyId: number) => {
    const key = `amaliy_${amaliyId}`
    const current = progress[key]
    if (!current) return

    const newProgress = {
      ...progress,
      [key]: {
        ...current,
        completed: true
      }
    }
    saveProgress(newProgress)
  }

  const getOverallStats = () => {
    const works = Object.values(progress)
    const completedCount = works.filter(w => w.completed).length
    const totalScore = works.reduce((sum, w) => sum + w.score, 0)
    
    return {
      completedCount,
      totalCount: 12,
      totalScore,
      percentage: Math.round((completedCount / 12) * 100)
    }
  }

  return {
    progress,
    isLoaded,
    completeStep,
    markCompleted,
    getOverallStats
  }
}

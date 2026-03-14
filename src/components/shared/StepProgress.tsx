import { CheckCircle2, Circle } from "lucide-react"

type Props = {
  currentStep: number
  totalSteps: number
  stepsDone: number[]
  onStepClick?: (step: number) => void
}

export function StepProgress({ currentStep, totalSteps, stepsDone, onStepClick }: Props) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i)

  return (
    <div className="flex items-center gap-1 w-full overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const isDone = stepsDone.includes(step)
        const isCurrent = currentStep === step
        return (
          <div key={step} className="flex items-center flex-shrink-0">
            <button
              onClick={() => onStepClick && onStepClick(step)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isCurrent 
                  ? "bg-primary text-primary-foreground" 
                  : isDone 
                    ? "bg-success/10 text-success hover:bg-success/20" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-50" />}
              <span>{index + 1}-qadam</span>
            </button>
            {index < totalSteps - 1 && (
              <div className={`w-8 h-px mx-1 ${isDone ? 'bg-success' : 'bg-muted-foreground/30'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

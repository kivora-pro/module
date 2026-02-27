'use client';

import React from 'react';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperProps {
	active: number;
	onStepClick?: (step: number) => void;
	orientation?: StepperOrientation;
	iconSize?: number;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	color?: string;
	radius?: string | number;
	allowNextStepsSelect?: boolean;
	completedIcon?: React.ReactNode;
	children: React.ReactNode;
}

export interface StepperStepProps {
	label?: React.ReactNode;
	description?: React.ReactNode;
	icon?: React.ReactNode;
	completedIcon?: React.ReactNode;
	progressIcon?: React.ReactNode;
	color?: string;
	loading?: boolean;
	allowStepSelect?: boolean;
	allowStepClick?: boolean;
	children?: React.ReactNode;
}

export interface StepperCompletedProps {
	children?: React.ReactNode;
}

const StepperContext = React.createContext<{
	active: number;
	count: number;
	onStepClick?: (i: number) => void;
} | null>(null);

export function Stepper({
	active,
	onStepClick,
	orientation = 'horizontal',
	children,
	iconSize = 38,
}: StepperProps) {
	const steps = React.Children.toArray(children).filter(
		(c) =>
			React.isValidElement(c) &&
			(c.type as { displayName?: string }).displayName !==
				'Stepper.Completed',
	);
	const completed = React.Children.toArray(children).find(
		(c) =>
			React.isValidElement(c) &&
			(c.type as { displayName?: string }).displayName ===
				'Stepper.Completed',
	);

	return (
		<StepperContext.Provider
			value={{ active, count: steps.length, onStepClick }}>
			<div
				className={[
					'flex',
					orientation === 'vertical'
						? 'flex-col gap-4'
						: 'flex-row items-start gap-2',
				].join(' ')}>
				{steps.map((step, i) => {
					if (!React.isValidElement(step)) return null;
					const stepEl = step as React.ReactElement<StepperStepProps>;
					const state =
						i < active
							? 'completed'
							: i === active
								? 'progress'
								: 'upcoming';
					return (
						<React.Fragment key={i}>
							<div
								className={[
									'flex items-center gap-3',
									orientation === 'horizontal'
										? 'flex-col text-center'
										: 'flex-row',
								].join(' ')}>
								<button
									type='button'
									onClick={() => onStepClick?.(i)}
									style={{
										width: iconSize,
										height: iconSize,
									}}
									className={[
										'flex-shrink-0 rounded-full flex items-center justify-center font-medium text-sm transition-colors border-2',
										state === 'completed'
											? 'bg-brand border-brand text-white'
											: '',
										state === 'progress'
											? 'border-brand text-brand bg-brand/10'
											: '',
										state === 'upcoming'
											? 'border-border text-muted bg-surface'
											: '',
									]
										.filter(Boolean)
										.join(' ')}>
									{state === 'completed'
										? (stepEl.props.completedIcon ?? (
												<svg
													className='w-4 h-4'
													viewBox='0 0 20 20'
													fill='currentColor'>
													<path
														fillRule='evenodd'
														d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
														clipRule='evenodd'
													/>
												</svg>
											))
										: state === 'progress'
											? (stepEl.props.progressIcon ??
												stepEl.props.icon ??
												i + 1)
											: (stepEl.props.icon ?? i + 1)}
								</button>
								<div>
									{stepEl.props.label && (
										<p className='text-sm font-medium text-on-surface'>
											{stepEl.props.label}
										</p>
									)}
									{stepEl.props.description && (
										<p className='text-xs text-muted'>
											{stepEl.props.description}
										</p>
									)}
								</div>
							</div>
							{i < steps.length - 1 && (
								<div
									className={[
										'flex-1',
										orientation === 'horizontal'
											? 'h-0.5 mt-5'
											: 'w-0.5 ml-5 min-h-[1rem]',
										i < active ? 'bg-brand' : 'bg-border',
									].join(' ')}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
			{active >= steps.length && completed && (
				<div className='mt-6'>
					{
						(completed as React.ReactElement<StepperCompletedProps>)
							.props.children
					}
				</div>
			)}
			{active < steps.length && (
				<div className='mt-6'>
					{
						(steps[active] as React.ReactElement<StepperStepProps>)
							?.props.children
					}
				</div>
			)}
		</StepperContext.Provider>
	);
}

function StepperStep(props: StepperStepProps) {
	return null; // Rendered by parent
}
StepperStep.displayName = 'Stepper.Step';

function StepperCompleted({ children }: StepperCompletedProps) {
	return <>{children}</>;
}
StepperCompleted.displayName = 'Stepper.Completed';

(
	Stepper as typeof Stepper & {
		Step: typeof StepperStep;
		Completed: typeof StepperCompleted;
	}
).Step = StepperStep;
(Stepper as typeof Stepper & { Completed: typeof StepperCompleted }).Completed =
	StepperCompleted;

export { StepperCompleted, StepperStep };

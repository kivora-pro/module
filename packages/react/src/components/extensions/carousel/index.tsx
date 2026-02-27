'use client';

/**
 * Carousel — wrapper sobre Swiper React (https://swiperjs.com/react)
 * Los estilos base (swiper/css, swiper/css/pagination…) se incluyen
 * automáticamente en dist/styles.css de @kivora/react.
 */

import React from 'react';
import { A11y, Autoplay, FreeMode, Keyboard, Pagination } from 'swiper/modules';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Bypass @types/react 18 vs 19 incompatibility in swiper/react
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwiperComp = Swiper as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwiperSlideComp = SwiperSlide as any;

// ── Types ──────────────────────────────────────────────────────────────────

export interface CarouselProps {
	/** Contenido. Usa `<Carousel.Slide>` para cada item. */
	children: React.ReactNode;
	/** Número de slides visibles a la vez. @default 1 */
	slidesPerView?: number | 'auto';
	/** Espacio entre slides en px. @default 16 */
	slideGap?: number;
	/** Orientación del carrusel. @default 'horizontal' */
	orientation?: 'horizontal' | 'vertical';
	/** Activa el loop infinito. @default false */
	loop?: boolean;
	/** Permite arrastrar libremente sin snapping. @default false */
	dragFree?: boolean;
	/** Muestra botones de anterior / siguiente. @default true */
	withControls?: boolean;
	/** Muestra los puntos de paginación. @default false */
	withIndicators?: boolean;
	/** Slide inicial (índice 0-based). @default 0 */
	initialSlide?: number;
	/** Slides que avanza cada clic. @default 1 */
	slidesToScroll?: number;
	/** Activa autoplay. Pasa `false` para desactivar. */
	autoplay?: boolean | { delay: number; pauseOnMouseEnter?: boolean };
	/** Callback cuando cambia el slide activo. */
	onSlideChange?: (index: number) => void;
	/** Props extra pasadas directamente a Swiper (escape hatch). */
	swiperProps?: Omit<
		SwiperProps,
		| 'modules'
		| 'spaceBetween'
		| 'slidesPerView'
		| 'slidesPerGroup'
		| 'direction'
		| 'loop'
		| 'freeMode'
		| 'initialSlide'
		| 'pagination'
		| 'autoplay'
		| 'onSlideChange'
	>;
	className?: string;
	style?: React.CSSProperties;
}

// ── Component ──────────────────────────────────────────────────────────────

export function Carousel({
	children,
	slidesPerView = 1,
	slideGap = 16,
	orientation = 'horizontal',
	loop = false,
	dragFree = false,
	withControls = true,
	withIndicators = false,
	initialSlide = 0,
	slidesToScroll = 1,
	autoplay,
	onSlideChange,
	swiperProps,
	className = '',
	style,
}: CarouselProps) {
	const swiperRef = React.useRef<SwiperRef>(null);

	const autoplayConfig =
		autoplay === true
			? { delay: 3000, pauseOnMouseEnter: true }
			: autoplay || false;

	return (
		<div
			className={['relative group/carousel overflow-hidden', className]
				.filter(Boolean)
				.join(' ')}
			style={style}>
			{/* Swiper no hereda height vía prop style, se fuerza con absolute inset-0 */}
			<div className='absolute inset-0 kivora-carousel-inner'>
				<SwiperComp
					ref={swiperRef}
					modules={[Pagination, Autoplay, A11y, FreeMode, Keyboard]}
					spaceBetween={slideGap}
					slidesPerView={slidesPerView}
					slidesPerGroup={slidesToScroll}
					direction={orientation}
					loop={loop}
					freeMode={dragFree}
					initialSlide={initialSlide}
					keyboard={{ enabled: true }}
					autoplay={autoplayConfig}
					style={{ height: '100%' }}
					pagination={
						withIndicators
							? {
									clickable: true,
									bulletClass:
										'swiper-pagination-bullet !w-2 !h-2 !bg-muted !opacity-50 !transition-all',
									bulletActiveClass:
										'swiper-pagination-bullet-active !w-4 !rounded-full !bg-brand !opacity-100',
								}
							: false
					}
					onSlideChange={(swiper: { realIndex: number }) =>
						onSlideChange?.(swiper.realIndex)
					}
					{...swiperProps}>
					{children}
				</SwiperComp>
			</div>

			{/* Custom prev / next controls */}
			{withControls && (
				<>
					<button
						type='button'
						onClick={() => swiperRef.current?.swiper.slidePrev()}
						className={
							'absolute left-2 top-1/2 -translate-y-1/2 z-10 ' +
							'w-8 h-8 rounded-full bg-surface/90 border border-border shadow ' +
							'flex items-center justify-center hover:bg-surface transition-colors ' +
							'opacity-0 group-hover/carousel:opacity-100'
						}
						aria-label='Anterior'>
						<svg
							className='w-4 h-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
					<button
						type='button'
						onClick={() => swiperRef.current?.swiper.slideNext()}
						className={
							'absolute right-2 top-1/2 -translate-y-1/2 z-10 ' +
							'w-8 h-8 rounded-full bg-surface/90 border border-border shadow ' +
							'flex items-center justify-center hover:bg-surface transition-colors ' +
							'opacity-0 group-hover/carousel:opacity-100'
						}
						aria-label='Siguiente'>
						<svg
							className='w-4 h-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</>
			)}
		</div>
	);
}

Carousel.displayName = 'Carousel';

// ── Carousel.Slide ─────────────────────────────────────────────────────────

export interface CarouselSlideProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export function CarouselSlide({
	children,
	className = '',
	style,
}: CarouselSlideProps) {
	return (
		<SwiperSlideComp
			className={className}
			style={{ height: '100%', ...style }}>
			{children}
		</SwiperSlideComp>
	);
}

CarouselSlide.displayName = 'Carousel.Slide';
(Carousel as typeof Carousel & { Slide: typeof CarouselSlide }).Slide =
	CarouselSlide;

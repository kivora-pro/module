'use client';

import {
	Demo,
	Label,
	PageBreadcrumb,
	PageHeader,
	PropTable,
	Section,
} from '@/app/_components/Demo';
import {
	Autocomplete,
	Checkbox,
	Chip,
	ChipGroup,
	ColorInput,
	ColorPicker,
	FileInput,
	JsonInput,
	MultiSelect,
	NumberInput,
	PasswordInput,
	PillsInput,
	PinInput,
	Radio,
	RadioGroup,
	Rating,
	SegmentedControl,
	Select,
	Slider,
	Switch,
	TagsInput,
	Textarea,
	TextInput,
} from '@kivora/react';
import { useState } from 'react';

export default function InputsPage() {
	const [switchOn, setSwitchOn] = useState(false);
	const [checked, setChecked] = useState(false);
	const [slider, setSlider] = useState(40);
	const [rating, setRating] = useState(3);
	const [segment, setSegment] = useState('react');
	const [radio, setRadio] = useState('react');
	const [pin, setPin] = useState('');
	const [tags, setTags] = useState(['React', 'TypeScript']);
	const [multi, setMulti] = useState<string[]>([]);
	const [autoVal, setAutoVal] = useState('');
	const [chip, setChip] = useState('react');

	return (
		<div>
			<PageBreadcrumb
				items={[
					{ label: 'Inicio', href: '/' },
					{ label: 'Componentes' },
					{ label: 'Inputs' },
				]}
			/>
			<PageHeader
				title='Inputs'
				description='Controles de formulario accesibles y composables: texto, selección, controles booleanos, numéricos y más.'
				pkg='@kivora/react → TextInput, Select, Switch, Checkbox, Slider…'
			/>

			{/* ── TextInput ───────────────────────────────── */}
			<Section
				title='TextInput'
				description='Input de texto con label, descripción y estado de error.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<TextInput
							label='Nombre'
							placeholder='John Doe'
						/>
						<TextInput
							label='Email'
							placeholder='hola@kivora.dev'
							type='email'
						/>
						<TextInput
							label='Con descripción'
							description='Mínimo 8 caracteres.'
							placeholder='Contraseña...'
						/>
						<TextInput
							label='Con error'
							placeholder='...'
							error='Este campo es requerido.'
						/>
						<TextInput
							label='Desactivado'
							placeholder='...'
							disabled
						/>
						<TextInput
							label='Requerido'
							placeholder='...'
							required
						/>
					</div>
				</Demo>
			</Section>

			{/* ── PasswordInput ───────────────────────────── */}
			<Section
				title='PasswordInput'
				description='Input con toggle de visibilidad de contraseña.'>
				<Demo>
					<div className='max-w-sm'>
						<PasswordInput
							label='Contraseña'
							placeholder='Tu contraseña segura...'
						/>
					</div>
				</Demo>
			</Section>

			{/* ── NumberInput ─────────────────────────────── */}
			<Section
				title='NumberInput'
				description='Input numérico con controles +/−.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<NumberInput
							label='Cantidad'
							placeholder='0'
							min={0}
							max={100}
							step={1}
						/>
						<NumberInput
							label='Precio (€)'
							placeholder='0.00'
							min={0}
							step={0.01}
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Textarea ────────────────────────────────── */}
			<Section
				title='Textarea'
				description='Área de texto multilínea.'>
				<Demo>
					<Textarea
						label='Descripción'
						description='Máximo 500 caracteres.'
						placeholder='Escribe aquí tu descripción...'
						rows={4}
					/>
				</Demo>
			</Section>

			{/* ── Select ──────────────────────────────────── */}
			<Section
				title='Select'
				description='Wrapper de react-select con búsqueda, grupos, clearable y soporte completo de teclado.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<Select
							label='Framework'
							placeholder='Selecciona uno...'
							searchable
							clearable
							data={['Next.js', 'Remix', 'Astro', 'Vite']}
						/>
						<Select
							label='País'
							placeholder='Selecciona...'
							data={[
								'España',
								'México',
								'Argentina',
								'Colombia',
								'Chile',
							]}
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Switch ──────────────────────────────────── */}
			<Section
				title='Switch'
				description='Control booleano tipo toggle.'>
				<Demo>
					<Label>Tamaños</Label>
					<div className='flex flex-wrap gap-6 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<Switch
								key={s}
								label={`size="${s}"`}
								size={s}
								defaultChecked={s === 'md'}
							/>
						))}
					</div>

					<Label>Interactivo</Label>
					<div className='flex items-center gap-4'>
						<Switch
							label='Notificaciones push'
							checked={switchOn}
							onChange={(e) =>
								setSwitchOn(
									(e.target as HTMLInputElement).checked,
								)
							}
						/>
						<span
							className={`text-xs px-2 py-0.5 rounded-full font-medium ${switchOn ? 'bg-success/20 text-success-600' : 'bg-muted/20 text-muted'}`}>
							{switchOn ? 'Activado' : 'Desactivado'}
						</span>
					</div>
				</Demo>
			</Section>

			{/* ── Checkbox ────────────────────────────────── */}
			<Section
				title='Checkbox'
				description='Casilla de verificación con soporte para estado indeterminado.'>
				<Demo>
					<Label>Tamaños</Label>
					<div className='flex flex-wrap gap-4 mb-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<Checkbox
								key={s}
								label={`size="${s}"`}
								size={s}
							/>
						))}
					</div>

					<Label>Estados</Label>
					<div className='flex flex-col gap-2'>
						<Checkbox label='Sin marcar' />
						<Checkbox
							label='Marcado (interactivo)'
							checked={checked}
							onChange={(e) =>
								setChecked(
									(e.target as HTMLInputElement).checked,
								)
							}
						/>
						<Checkbox
							label='Indeterminado'
							indeterminate
						/>
						<Checkbox
							label='Desactivado'
							disabled
						/>
						<Checkbox
							label='Desactivado marcado'
							disabled
							defaultChecked
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Slider ──────────────────────────────────── */}
			<Section
				title='Slider'
				description='Control deslizante numérico.'>
				<Demo>
					<div className='space-y-6'>
						<div>
							<p className='text-sm text-muted mb-3'>
								Valor:{' '}
								<strong className='text-on-surface'>
									{slider}
								</strong>
							</p>
							<Slider
								value={slider}
								onChange={setSlider}
								min={0}
								max={100}
								label={(v) => `${v}%`}
							/>
						</div>
						<Slider
							defaultValue={60}
							min={0}
							max={100}
							step={10}
							marks={[
								{ value: 0, label: '0' },
								{ value: 50, label: '50' },
								{ value: 100, label: '100' },
							]}
						/>
					</div>
				</Demo>
			</Section>

			{/* ── Rating ──────────────────────────────────── */}
			<Section
				title='Rating'
				description='Control de calificación con estrellas.'>
				<Demo>
					<div className='space-y-4'>
						{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
							<div
								key={s}
								className='flex items-center gap-3'>
								<Rating
									size={s}
									value={rating}
									onChange={setRating}
								/>
								<span className='text-xs text-muted'>
									size="{s}"
								</span>
							</div>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── SegmentedControl ────────────────────────── */}
			<Section
				title='SegmentedControl'
				description='Control de selección único en forma de segmentos.'>
				<Demo>
					<div className='space-y-4'>
						<SegmentedControl
							value={segment}
							onChange={setSegment}
							data={[
								{ label: 'React', value: 'react' },
								{ label: 'Solid', value: 'solid' },
								{ label: 'Svelte', value: 'svelte' },
							]}
						/>
						<p className='text-sm text-muted'>
							Seleccionado:{' '}
							<strong className='text-on-surface'>
								{segment}
							</strong>
						</p>
					</div>
				</Demo>
			</Section>
			{/* ── Radio / RadioGroup ────────────────────────── */}
			<Section
				title='Radio'
				description='Selección única dentro de un grupo de opciones.'>
				<Demo>
					<RadioGroup
						label='Framework favorito'
						value={radio}
						onChange={setRadio}>
						<div className='flex flex-col gap-2 mt-2'>
							<Radio
								value='react'
								label='React'
							/>
							<Radio
								value='solid'
								label='SolidJS'
							/>
							<Radio
								value='svelte'
								label='Svelte'
							/>
							<Radio
								value='vue'
								label='Vue'
								disabled
							/>
						</div>
					</RadioGroup>
					<p className='text-sm text-muted mt-3'>
						Selección:{' '}
						<strong className='text-on-surface'>{radio}</strong>
					</p>
				</Demo>
			</Section>

			{/* ── PinInput ───────────────────────────────────── */}
			<Section
				title='PinInput'
				description='Campos individuales para códigos PIN, OTP o verificación.'>
				<Demo>
					<div className='space-y-4'>
						<div>
							<Label>Longitud 4 (default)</Label>
							<PinInput
								length={4}
								value={pin}
								onChange={setPin}
								placeholder='-'
							/>
						</div>
						<div>
							<Label>Enmascarado (password)</Label>
							<PinInput
								length={6}
								type='number'
								mask
							/>
						</div>
						{pin && (
							<p className='text-sm text-muted'>
								Valor:{' '}
								<strong className='text-on-surface font-mono'>
									{pin}
								</strong>
							</p>
						)}
					</div>
				</Demo>
			</Section>

			{/* ── TagsInput ──────────────────────────────────── */}
			<Section
				title='TagsInput'
				description='Input que permite añadir múltiples etiquetas presionando Enter.'>
				<Demo>
					<TagsInput
						label='Tecnologías'
						placeholder='Añade una tecnología...'
						value={tags}
						onChange={setTags}
						description='Presiona Enter para añadir.'
					/>
				</Demo>
			</Section>

			{/* ── MultiSelect ─────────────────────────────────── */}
			<Section
				title='MultiSelect'
				description='Dropdown que permite seleccionar múltiples opciones.'>
				<Demo>
					<MultiSelect
						label='Roles de usuario'
						placeholder='Selecciona roles...'
						data={[
							'Admin',
							'Editor',
							'Viewer',
							'Moderador',
							'Colaborador',
						]}
						value={multi}
						onChange={setMulti}
						maxValues={3}
						description='Máximo 3 roles.'
					/>
				</Demo>
			</Section>

			{/* ── Autocomplete ────────────────────────────────── */}
			<Section
				title='Autocomplete'
				description='Input libre con sugerencias desplegables filtradas.'>
				<Demo>
					<Autocomplete
						label='Ciudad'
						placeholder='Empieza a escribir...'
						data={[
							'Madrid',
							'Barcelona',
							'Valencia',
							'Sevilla',
							'Bilbao',
							'México DF',
							'Buenos Aires',
							'Santiago',
							'Bogotá',
						]}
						value={autoVal}
						onChange={(e) => setAutoVal(e.target.value)}
					/>
				</Demo>
			</Section>

			{/* ── Chip / ChipGroup ──────────────────────────────── */}
			<Section
				title='Chip'
				description='Selector en forma de pastilla — alternativa visual a Radio o Checkbox.'>
				<Demo>
					<Label>Selección única (ChipGroup)</Label>
					<ChipGroup
						value={chip}
						onChange={(val) => setChip(val as string)}>
						<div className='flex flex-wrap gap-2 mb-4'>
							<Chip value='react'>React</Chip>
							<Chip value='solid'>SolidJS</Chip>
							<Chip value='vue'>Vue</Chip>
							<Chip value='svelte'>Svelte</Chip>
						</div>
					</ChipGroup>
					<Label>Variantes</Label>
					<div className='flex flex-wrap gap-2'>
						{(['filled', 'outline', 'light'] as const).map((v) => (
							<Chip
								key={v}
								value={v}
								variant={v}
								defaultChecked={v === 'filled'}>
								{v}
							</Chip>
						))}
					</div>
				</Demo>
			</Section>

			{/* ── ColorInput ───────────────────────────────────── */}
			<Section
				title='ColorInput'
				description='Input de color con picker visual y soporte para formatos hex, rgb, hsl.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<ColorInput
							label='Color de marca'
							defaultValue='#3b82f6'
							format='hex'
						/>
						<ColorInput
							label='Con swatches'
							defaultValue='#ef4444'
							swatches={[
								'#ef4444',
								'#f97316',
								'#eab308',
								'#22c55e',
								'#3b82f6',
								'#8b5cf6',
							]}
						/>
					</div>
				</Demo>
			</Section>
			{/* ── FileInput ───────────────────────────────── */}
			<Section
				title='FileInput'
				description='Input de archivo con vista previa del nombre seleccionado.'>
				<Demo>
					<div className='grid sm:grid-cols-2 gap-4'>
						<FileInput
							label='Documento'
							accept='.pdf,.doc,.docx'
							placeholder='Selecciona un archivo...'
						/>
						<FileInput
							label='Imágenes (múltiple)'
							accept='image/*'
							multiple
							clearable
							placeholder='Selecciona imágenes...'
						/>
					</div>
				</Demo>
			</Section>

			{/* ── JsonInput ───────────────────────────────── */}
			<Section
				title='JsonInput'
				description='Textarea con validación de JSON en tiempo real y formato automático al perder el foco.'>
				<Demo>
					<JsonInput
						label='Configuración JSON'
						description='Debe ser JSON válido.'
						placeholder='{"key": "value"}'
						rows={5}
						formatOnBlur
						defaultValue='{"name":"Kivora","version":"0.0.1"}'
					/>
				</Demo>
			</Section>

			{/* ── ColorPicker ─────────────────────────────── */}
			<Section
				title='ColorPicker'
				description='Selector de color standalone sin input de texto, con swatches opcionales.'>
				<Demo>
					<div className='flex flex-wrap gap-8'>
						<div>
							<Label>Solo picker</Label>
							<ColorPicker defaultValue='#3b82f6' />
						</div>
						<div>
							<Label>Con swatches</Label>
							<ColorPicker
								defaultValue='#ef4444'
								swatches={[
									'#ef4444',
									'#f97316',
									'#eab308',
									'#22c55e',
									'#3b82f6',
									'#8b5cf6',
									'#ec4899',
									'#14b8a6',
								]}
							/>
						</div>
					</div>
				</Demo>
			</Section>

			{/* ── PillsInput ──────────────────────────────── */}
			<Section
				title='PillsInput'
				description='Input de múltiples valores en forma de pastillas. Presiona Enter para añadir.'>
				<Demo>
					<PillsInput
						label='Etiquetas'
						description='Presiona Enter para añadir una etiqueta.'
						placeholder='Añade etiquetas...'
						defaultValue={['React', 'TypeScript', 'Tailwind']}
					/>
				</Demo>
			</Section>

			{/* ── API ─────────────────────────────────────── */}
			<Section title='API — TextInput'>
				<PropTable
					rows={[
						{
							prop: 'label',
							type: 'ReactNode',
							description: 'Etiqueta del campo.',
						},
						{
							prop: 'description',
							type: 'ReactNode',
							description: 'Texto de ayuda bajo el label.',
						},
						{
							prop: 'error',
							type: 'ReactNode',
							description:
								'Mensaje de error. Pone el input en estado rojo.',
						},
						{
							prop: 'required',
							type: 'boolean',
							default: 'false',
							description: 'Añade asterisco y atributo required.',
						},
						{
							prop: 'withAsterisk',
							type: 'boolean',
							default: 'false',
							description: 'Fuerza el asterisco sin required.',
						},
						{
							prop: 'size',
							type: "'xs'|'sm'|'md'|'lg'|'xl'",
							default: "'md'",
							description: 'Tamaño del input.',
						},
						{
							prop: 'variant',
							type: "'default'|'filled'|'unstyled'",
							default: "'default'",
							description: 'Variante visual.',
						},
						{
							prop: 'disabled',
							type: 'boolean',
							default: 'false',
							description: 'Deshabilita el input.',
						},
					]}
				/>
			</Section>
		</div>
	);
}

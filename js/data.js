/**
 * OsteoVirtual · Dataset de piezas paleopatológicas
 * Formato: { id, nombre, region, patologia, sexo, epoca, imagen, yacimiento, descripcion, ficha }
 *
 * - region:    'craneo' | 'columna' | 'torax' | 'miembro-superior' | 'pelvis' | 'miembro-inferior'
 * - patologia: 'trauma' | 'infecciosa' | 'metabolica' | 'degenerativa' | 'congenita' | 'marcador'
 * - sexo:      'masculino' | 'femenino' | 'indeterminado'
 * - epoca:     'prehistoria' | 'romano' | 'medieval' | 'moderno'
 */

const PIEZAS = [
  {
    id: 'OV-001',
    nombre: 'Cráneo con trepanación curada',
    region: 'craneo',
    patologia: 'trauma',
    sexo: 'masculino',
    epoca: 'prehistoria',
    yacimiento: 'Cueva de los Murciélagos, Granada',
    descripcion: 'Trepanación circular de 35 mm en el parietal derecho con bordes completamente remodelados. Evidencia de supervivencia prolongada post-intervención.',
    imagen: null,
    ficha: 'ficha-maestra.html?id=OV-001'
  },
  {
    id: 'OV-002',
    nombre: 'Fémur con fractura consolidada',
    region: 'miembro-inferior',
    patologia: 'trauma',
    sexo: 'femenino',
    epoca: 'medieval',
    yacimiento: 'Necrópolis de San Nicolás, Murcia',
    descripcion: 'Fractura diafisaria del fémur derecho con callo óseo exuberante y acortamiento de 2,3 cm. Posible deformidad funcional residual.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-002'
  },
  {
    id: 'OV-003',
    nombre: 'Cribra orbitalia bilateral',
    region: 'craneo',
    patologia: 'metabolica',
    sexo: 'indeterminado',
    epoca: 'romano',
    yacimiento: 'Isturgi, Jaén',
    descripcion: 'Hiperostosis porótica en techo de ambas órbitas. Grado III según criterios de Steckel. Indicador de anemia ferropénica en edad infantil.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-003'
  },
  {
    id: 'OV-004',
    nombre: 'Vértebra con espondilitis tuberculosa',
    region: 'columna',
    patologia: 'infecciosa',
    sexo: 'masculino',
    epoca: 'medieval',
    yacimiento: 'Monasterio de Suso, La Rioja',
    descripcion: 'Colapso del cuerpo vertebral T8-T9 con fusión angular (giba). Destrucción del disco intervertebral y formación de absceso paravertebral. Mal de Pott confirmado.',
    imagen: null,
    ficha: 'ficha-maestra.html?id=OV-004'
  },
  {
    id: 'OV-005',
    nombre: 'Pelvis con sacralización de L5',
    region: 'pelvis',
    patologia: 'congenita',
    sexo: 'masculino',
    epoca: 'moderno',
    yacimiento: 'Cementerio de Poblet, Tarragona',
    descripcion: 'Fusión unilateral de L5 al sacro con esclerosis de la articulación sacroilíaca ipsilateral. Variante anatómica con posible correlato doloroso.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-005'
  },
  {
    id: 'OV-006',
    nombre: 'Húmero con entesopatía severa',
    region: 'miembro-superior',
    patologia: 'marcador',
    sexo: 'masculino',
    epoca: 'romano',
    yacimiento: 'Barcino, Barcelona',
    descripcion: 'Robustez cortical extrema y proliferación ósea en inserción del deltoides. Compatible con actividad física intensa y repetitiva. Posible remero o trabajador portuario.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-006'
  },
  {
    id: 'OV-007',
    nombre: 'Costillas con lesiones periósticas',
    region: 'torax',
    patologia: 'infecciosa',
    sexo: 'femenino',
    epoca: 'medieval',
    yacimiento: 'La Olmeda, Palencia',
    descripcion: 'Formación de hueso nuevo laminar en la cara visceral de costillas 4-7 bilaterales. Probable tuberculosis pulmonar o pleuritis crónica.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-007'
  },
  {
    id: 'OV-008',
    nombre: 'Rótula con osteoartritis avanzada',
    region: 'miembro-inferior',
    patologia: 'degenerativa',
    sexo: 'femenino',
    epoca: 'moderno',
    yacimiento: 'San Millán de la Cogolla, La Rioja',
    descripcion: 'Erosión del cartílago articular con eburnación, osteofitosis marginal y quistes subcondrales. Estadio 4 de Kellgren-Lawrence. Individuo >55 años.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-008'
  },
  {
    id: 'OV-009',
    nombre: 'Mandíbula con absceso alveolar',
    region: 'craneo',
    patologia: 'infecciosa',
    sexo: 'indeterminado',
    epoca: 'prehistoria',
    yacimiento: 'Los Millares, Almería',
    descripcion: 'Orificio de drenaje en el alveolo del primer molar inferior. Reabsorción ósea periapical intensa con pérdida de diente en vida. Evidencia de enfermedad periodontal.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-009'
  },
  {
    id: 'OV-010',
    nombre: 'Radio con fractura de Colles',
    region: 'miembro-superior',
    patologia: 'trauma',
    sexo: 'femenino',
    epoca: 'moderno',
    yacimiento: 'Cementerio de San Isidro, Madrid',
    descripcion: 'Fractura distal del radio en patrón de Colles con desplazamiento dorsal. Consolidación en posición viciosa con limitación funcional de la muñeca.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-010'
  },
  {
    id: 'OV-011',
    nombre: 'Columna lumbar con escoliosis',
    region: 'columna',
    patologia: 'congenita',
    sexo: 'femenino',
    epoca: 'medieval',
    yacimiento: 'Necrópolis de Recópolis, Guadalajara',
    descripcion: 'Curvatura lateral del raquis lumbar con cuña vertebral en L3. Rotación axial de los cuerpos vertebrales. Ángulo de Cobb estimado en 35°.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-011'
  },
  {
    id: 'OV-012',
    nombre: 'Húmero con osteomielitis hematógena',
    region: 'miembro-superior',
    patologia: 'infecciosa',
    sexo: 'masculino',
    epoca: 'romano',
    yacimiento: 'Caesaraugusta, Zaragoza',
    descripcion: 'Involucro óseo periférico con secuestro central y fistulación cloacal. Proceso infeccioso crónico de Staphylococcus sp. compatible. Reacción perióstica extensa.',
    imagen: null,
    ficha: 'ficha-maestra.html?id=OV-012'
  },
  {
    id: 'OV-013',
    nombre: 'Escápula con nódulos de Schmörl',
    region: 'torax',
    patologia: 'degenerativa',
    sexo: 'masculino',
    epoca: 'prehistoria',
    yacimiento: 'El Argar, Almería',
    descripcion: 'Hernias discales calcificadas en platillos vertebrales T6-T10. Indicador de cargas axiales repetidas sobre la columna dorsal. Patrón compatible con trabajo agrícola.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-013'
  },
  {
    id: 'OV-014',
    nombre: 'Tibia con raquitismo',
    region: 'miembro-inferior',
    patologia: 'metabolica',
    sexo: 'indeterminado',
    epoca: 'medieval',
    yacimiento: 'Toledo, casco histórico',
    descripcion: 'Incurvación anterior y medial de la diáfisis tibial (tibia en sable). Porosidad cortical generalizada. Hipovitaminosis D severa en la infancia. Individuo subadulto.',
    imagen: null,
    ficha: 'ficha-estandar.html?id=OV-014'
  },
  {
    id: 'OV-015',
    nombre: 'Pelvis con artritis séptica',
    region: 'pelvis',
    patologia: 'infecciosa',
    sexo: 'masculino',
    epoca: 'romano',
    yacimiento: 'Emerita Augusta, Mérida',
    descripcion: 'Destrucción de la articulación coxofemoral izquierda con anquilosis fibrosa. Superficie articular del acetábulo completamente erosionada. Posible complicación de herida de guerra.',
    imagen: null,
    ficha: 'ficha-maestra.html?id=OV-015'
  },
  {
    id: 'OV-016',
    nombre: 'Cráneo con trauma contuso perimortem',
    region: 'craneo',
    patologia: 'trauma',
    sexo: 'masculino',
    epoca: 'medieval',
    yacimiento: 'Batalla de Nájera, La Rioja',
    descripcion: 'Fractura deprimida en el parietal izquierdo con patrón radial. Ausencia de remodelación ósea. Lesión perimortem por objeto contundente. Contexto de violencia interpersonal.',
    imagen: null,
    ficha: 'ficha-maestra.html?id=OV-016'
  }
];

/* Vocabulario controlado para labels de UI */
const VOCABULARIO = {
  region: {
    craneo:            { label: 'Cráneo',           icon: '💀' },
    columna:           { label: 'Columna vertebral', icon: '🦴' },
    torax:             { label: 'Tórax / Costillas', icon: '🫁' },
    'miembro-superior':{ label: 'Miembro superior',  icon: '💪' },
    pelvis:            { label: 'Pelvis',             icon: '🦵' },
    'miembro-inferior':{ label: 'Miembro inferior',  icon: '🦿' }
  },
  patologia: {
    trauma:       { label: 'Traumatismos',   icon: '⚡', color: '#FF4D6D' },
    infecciosa:   { label: 'Infecciosas',    icon: '🦠', color: '#00E5FF' },
    metabolica:   { label: 'Metabólicas',    icon: '🔬', color: '#C6E800' },
    degenerativa: { label: 'Degenerativas',  icon: '⚙️', color: '#FFB300' },
    congenita:    { label: 'Congénitas',     icon: '🧬', color: '#FF6EB4' },
    marcador:     { label: 'Marcadores de actividad', icon: '💪', color: '#3D5AFE' }
  },
  sexo: {
    masculino:     { label: 'Masculino',     icon: '♂' },
    femenino:      { label: 'Femenino',      icon: '♀' },
    indeterminado: { label: 'Indeterminado', icon: '◎' }
  },
  epoca: {
    prehistoria: { label: 'Prehistoria',    range: '—3000 a.C.' },
    romano:      { label: 'Época romana',   range: 'I–V d.C.' },
    medieval:    { label: 'Edad Media',     range: 'V–XV d.C.' },
    moderno:     { label: 'Época moderna',  range: 'XVI–XIX d.C.' }
  }
};
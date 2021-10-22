
export namespace ChordScale {

  export const chromaticScale = [
    'C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'B♭', 'B'
  ];

  export const majorSteps: string[] = [
    '2', '2', '1', '2', '2', '2', '1'
  ];

  export const minorSteps: string[] = [
    '2', '1', '2', '2', '1', '2', '2'
  ];


  // MAJOR MODE step arrays
  const ionionStep: string[][] = [
    ['2', '2', '1', '2', '2', '2', '1'],
    ['w', 'w', 'h', 'w', 'w', 'w', 'h'],
  ];

  const dorionSteps: string[] = [
    '2', '1', '2', '2', '2', '1', '2'
  ];

  const phrygianSteps: string[] = [
    '1', '2', '2', '2', '1', '2', '2'
  ];

  const lydianSteps: string[] = [
    '2', '2', '2', '1', '2', '2', '1'
  ];

  const mixolydianSteps: string[] = [
    '2', '2', '1', '2', '2', '1', '2'
  ];

  const aeolianSteps: string[] = [
    '2', '1', '2', '2', '1', '2', '2'
  ];

  const locrianSteps: string[] = [
    '1', '2', '2', '1', '2', '2', '2'
  ];

  export const majorStepsObj = {
    ionion: ionionStep,
    dorion: dorionSteps,
    phyrgian: phrygianSteps,
    lydian: lydianSteps,
    mixolydian: mixolydianSteps,
    aeolian: aeolianSteps,
    locrian: locrianSteps
  };

  export enum ScaleTypes {
    maj = 'Major',
    min = 'minor',
    dim = 'diminished'
  }

  export const majorScaleLabelArr: ScaleTypes[] = [
    ScaleTypes.maj,
    ScaleTypes.min,
    ScaleTypes.min,
    ScaleTypes.maj,
    ScaleTypes.maj,
    ScaleTypes.min,
    ScaleTypes.dim,
  ];

  export const minorScaleLabelArr: ScaleTypes[] = [
    ScaleTypes.min,
    ScaleTypes.dim,
    ScaleTypes.maj,
    ScaleTypes.min,
    ScaleTypes.min,
    ScaleTypes.maj,
    ScaleTypes.maj,
  ];

  export const ionionProperties: ScaleProperties = {};

  export interface ScaleProperties {
    scaleRoot?: string;
    degree?: ScaleTypes;
    notesInScale?: string[];
    stepsNumber?: string[];
    stepsLetter?: string[];
    modeName?: ModesMajor;
    scale?: any;
  }

  export interface ChordProperties {
    chordRoot?: string;
    degree?: ScaleTypes;
    roman?: string;
    triad?: object;
    modeName?: ModesMajor;
  }


  enum ModesMajor {
    Ionion = 'Ionion',
    Dorion = 'Dorion',
    Phrygian = 'Phryian',
    Lydian = 'Lydian',
    Mixolydian = 'Mixolydian',
    Aeolian = 'Aeolian',
    Locrian = 'Locrian'
  }



  export const stepsInScaleObj = {
    major: majorSteps,
    minor: minorSteps
  };

  export interface Mode {
    type: ModesMajor;
    romanNumberal: string;
    steps: string[];
  }

  export interface Scale {
    root: string;
    mode: ModesMajor;
    scale: Mode[];
  }
}



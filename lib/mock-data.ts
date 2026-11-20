// ============================================================
// F1 LIVE — Mock Data
// Phase 1: Clearly labelled as MOCK / DEMO data
// ============================================================

import {
  Driver,
  Team,
  Circuit,
  LiveRaceData,
  Race,
  LivePosition,
  PitStop,
  FastestLap,
  RaceEvent,
  QualifyingResult,
  RaceResult,
  DriverStanding,
  ConstructorStanding,
  DriverCareerStats,
  DriverSeasonStats,
} from '@/types/f1';

// ------------------------------------------------------------------
// DRIVERS WITH OFFICIAL PROFILE HEADSHOTS
// ------------------------------------------------------------------
export const MOCK_DRIVERS: Record<string, Driver> = {
  VER: {
    id: 'VER', name: 'Max Verstappen', abbreviation: 'VER', number: 1,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Dutch', flagEmoji: '🇳🇱',
    dateOfBirth: '1997-09-30',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
  },
  NOR: {
    id: 'NOR', name: 'Lando Norris', abbreviation: 'NOR', number: 4,
    team: 'McLaren', teamId: 'MCL', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1999-11-13',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
  },
  LEC: {
    id: 'LEC', name: 'Charles Leclerc', abbreviation: 'LEC', number: 16,
    team: 'Ferrari', teamId: 'FER', nationality: 'Monégasque', flagEmoji: '🇲🇨',
    dateOfBirth: '1997-10-16',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
  },
  HAM: {
    id: 'HAM', name: 'Lewis Hamilton', abbreviation: 'HAM', number: 44,
    team: 'Ferrari', teamId: 'FER', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1985-01-07',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
  },
  RUS: {
    id: 'RUS', name: 'George Russell', abbreviation: 'RUS', number: 63,
    team: 'Mercedes', teamId: 'MER', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '1998-02-15',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
  },
  SAI: {
    id: 'SAI', name: 'Carlos Sainz', abbreviation: 'SAI', number: 55,
    team: 'Williams', teamId: 'WIL', nationality: 'Spanish', flagEmoji: '🇪🇸',
    dateOfBirth: '1994-09-01',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
  },
  PIA: {
    id: 'PIA', name: 'Oscar Piastri', abbreviation: 'PIA', number: 81,
    team: 'McLaren', teamId: 'MCL', nationality: 'Australian', flagEmoji: '🇦🇺',
    dateOfBirth: '2001-04-06',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
  },
  ALO: {
    id: 'ALO', name: 'Fernando Alonso', abbreviation: 'ALO', number: 14,
    team: 'Aston Martin', teamId: 'AMR', nationality: 'Spanish', flagEmoji: '🇪🇸',
    dateOfBirth: '1981-07-29',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
  },
  STR: {
    id: 'STR', name: 'Lance Stroll', abbreviation: 'STR', number: 18,
    team: 'Aston Martin', teamId: 'AMR', nationality: 'Canadian', flagEmoji: '🇨🇦',
    dateOfBirth: '1998-10-29',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
  },
  PER: {
    id: 'PER', name: 'Sergio Perez', abbreviation: 'PER', number: 11,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Mexican', flagEmoji: '🇲🇽',
    dateOfBirth: '1990-01-26',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png',
  },
  BOT: {
    id: 'BOT', name: 'Valtteri Bottas', abbreviation: 'BOT', number: 77,
    team: 'Sauber', teamId: 'SAU', nationality: 'Finnish', flagEmoji: '🇫🇮',
    dateOfBirth: '1989-08-28',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png',
  },
  HUL: {
    id: 'HUL', name: 'Nico Hülkenberg', abbreviation: 'HUL', number: 27,
    team: 'Haas', teamId: 'HAS', nationality: 'German', flagEmoji: '🇩🇪',
    dateOfBirth: '1987-08-19',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
  },
  GAS: {
    id: 'GAS', name: 'Pierre Gasly', abbreviation: 'GAS', number: 10,
    team: 'Alpine', teamId: 'ALP', nationality: 'French', flagEmoji: '🇫🇷',
    dateOfBirth: '1996-02-07',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
  },
  OCO: {
    id: 'OCO', name: 'Esteban Ocon', abbreviation: 'OCO', number: 31,
    team: 'Haas', teamId: 'HAS', nationality: 'French', flagEmoji: '🇫🇷',
    dateOfBirth: '1996-09-17',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
  },
  TSU: {
    id: 'TSU', name: 'Yuki Tsunoda', abbreviation: 'TSU', number: 22,
    team: 'Red Bull Racing', teamId: 'RBR', nationality: 'Japanese', flagEmoji: '🇯🇵',
    dateOfBirth: '2000-05-11',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png',
  },
  LAW: {
    id: 'LAW', name: 'Liam Lawson', abbreviation: 'LAW', number: 30,
    team: 'Racing Bulls', teamId: 'RBU', nationality: 'New Zealander', flagEmoji: '🇳🇿',
    dateOfBirth: '2002-02-11',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
  },
  BEA: {
    id: 'BEA', name: 'Oliver Bearman', abbreviation: 'BEA', number: 87,
    team: 'Haas', teamId: 'HAS', nationality: 'British', flagEmoji: '🇬🇧',
    dateOfBirth: '2005-05-08',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
  },
  ANT: {
    id: 'ANT', name: 'Kimi Antonelli', abbreviation: 'ANT', number: 12,
    team: 'Mercedes', teamId: 'MER', nationality: 'Italian', flagEmoji: '🇮🇹',
    dateOfBirth: '2006-08-25',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KIMANT01_Kimi_Antonelli/kimant01.png',
  },
  DOO: {
    id: 'DOO', name: 'Jack Doohan', abbreviation: 'DOO', number: 7,
    team: 'Alpine', teamId: 'ALP', nationality: 'Australian', flagEmoji: '🇦🇺',
    dateOfBirth: '2003-01-20',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png',
  },
  COL: {
    id: 'COL', name: 'Franco Colapinto', abbreviation: 'COL', number: 43,
    team: 'Williams', teamId: 'WIL', nationality: 'Argentine', flagEmoji: '🇦🇷',
    dateOfBirth: '2003-05-27',
    imageUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png',
  },
};

// ------------------------------------------------------------------
// TEAMS WITH OFFICIAL LOGOS
// ------------------------------------------------------------------
export const MOCK_TEAMS: Record<string, Team> = {
  RBR: {
    id: 'RBR', name: 'Red Bull Racing', shortName: 'Red Bull', color: '#3671C6', textColor: '#ffffff',
    drivers: ['VER', 'TSU'], nationality: 'Austrian', base: 'Milton Keynes, UK', chassis: 'RB21', powerUnit: 'Honda RBPT',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png',
  },
  MCL: {
    id: 'MCL', name: 'McLaren', shortName: 'McLaren', color: '#FF8000', textColor: '#ffffff',
    drivers: ['NOR', 'PIA'], nationality: 'British', base: 'Woking, UK', chassis: 'MCL39', powerUnit: 'Mercedes',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png',
  },
  FER: {
    id: 'FER', name: 'Ferrari', shortName: 'Ferrari', color: '#E8002D', textColor: '#ffffff',
    drivers: ['LEC', 'HAM'], nationality: 'Italian', base: 'Maranello, Italy', chassis: 'SF-25', powerUnit: 'Ferrari',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png',
  },
  MER: {
    id: 'MER', name: 'Mercedes', shortName: 'Mercedes', color: '#27F4D2', textColor: '#000000',
    drivers: ['RUS', 'ANT'], nationality: 'German', base: 'Brackley, UK', chassis: 'W16', powerUnit: 'Mercedes',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png',
  },
  AMR: {
    id: 'AMR', name: 'Aston Martin', shortName: 'Aston Martin', color: '#229971', textColor: '#ffffff',
    drivers: ['ALO', 'STR'], nationality: 'British', base: 'Silverstone, UK', chassis: 'AMR25', powerUnit: 'Mercedes',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png',
  },
  WIL: {
    id: 'WIL', name: 'Williams', shortName: 'Williams', color: '#64C4FF', textColor: '#000000',
    drivers: ['SAI', 'COL'], nationality: 'British', base: 'Grove, UK', chassis: 'FW47', powerUnit: 'Mercedes',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png',
  },
  ALP: {
    id: 'ALP', name: 'Alpine', shortName: 'Alpine', color: '#0093CC', textColor: '#ffffff',
    drivers: ['GAS', 'DOO'], nationality: 'French', base: 'Enstone, UK', chassis: 'A525', powerUnit: 'Renault',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png',
  },
  HAS: {
    id: 'HAS', name: 'Haas', shortName: 'Haas', color: '#B6BABD', textColor: '#000000',
    drivers: ['HUL', 'BEA'], nationality: 'American', base: 'Kannapolis, USA', chassis: 'VF-25', powerUnit: 'Ferrari',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas.png',
  },
  RBU: {
    id: 'RBU', name: 'Racing Bulls', shortName: 'Racing Bulls', color: '#6692FF', textColor: '#ffffff',
    drivers: ['LAW', 'COL'], nationality: 'Italian', base: 'Faenza, Italy', chassis: 'VCARB 02', powerUnit: 'Honda RBPT',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png',
  },
  SAU: {
    id: 'SAU', name: 'Sauber', shortName: 'Sauber', color: '#52E252', textColor: '#000000',
    drivers: ['BOT', 'ANT'], nationality: 'Swiss', base: 'Hinwil, Switzerland', chassis: 'C45', powerUnit: 'Ferrari',
    logoUrl: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png',
  },
};

// ------------------------------------------------------------------
// CIRCUITS
// ------------------------------------------------------------------
export const MOCK_CIRCUITS: Record<string, Circuit> = {
  monza: {
    id: 'monza', name: 'Autodromo Nazionale Monza', country: 'Italy', city: 'Monza',
    trackLength: 5.793, laps: 53, raceDistance: 306.720,
    lapRecord: '1:21.046', lapRecordHolder: 'Rubens Barrichello', lapRecordYear: 2004,
    timezone: 'Europe/Rome', flagEmoji: '🇮🇹',
  },
  silverstone: {
    id: 'silverstone', name: 'Silverstone Circuit', country: 'Great Britain', city: 'Silverstone',
    trackLength: 5.891, laps: 52, raceDistance: 306.198,
    lapRecord: '1:27.097', lapRecordHolder: 'Max Verstappen', lapRecordYear: 2020,
    timezone: 'Europe/London', flagEmoji: '🇬🇧',
  },
  spa: {
    id: 'spa', name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Spa',
    trackLength: 7.004, laps: 44, raceDistance: 308.052,
    lapRecord: '1:46.286', lapRecordHolder: 'Valtteri Bottas', lapRecordYear: 2018,
    timezone: 'Europe/Brussels', flagEmoji: '🇧🇪',
  },
  bahrain: {
    id: 'bahrain', name: 'Bahrain International Circuit', country: 'Bahrain', city: 'Sakhir',
    trackLength: 5.412, laps: 57, raceDistance: 308.238,
    lapRecord: '1:31.447', lapRecordHolder: 'Pedro de la Rosa', lapRecordYear: 2005,
    timezone: 'Asia/Bahrain', flagEmoji: '🇧🇭',
  },
};

// ------------------------------------------------------------------
// LIVE RACE MOCK
// ------------------------------------------------------------------
export const MOCK_LIVE_POSITIONS: LivePosition[] = [
  { driverId: 'VER', position: 1, previousPosition: 1, lap: 42, gapToLeader: 'LEADER', gapToCarAhead: 'LEADER', tyre: 'HARD', tyreAge: 18, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:22.341', bestLapTime: '1:21.890', speed: 334 },
  { driverId: 'NOR', position: 2, previousPosition: 3, lap: 42, gapToLeader: '+2.418', gapToCarAhead: '+2.418', tyre: 'HARD', tyreAge: 16, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:22.102', bestLapTime: '1:21.654', speed: 338 },
  { driverId: 'LEC', position: 3, previousPosition: 2, lap: 42, gapToLeader: '+5.891', gapToCarAhead: '+3.473', tyre: 'MEDIUM', tyreAge: 8, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:21.905', bestLapTime: '1:21.512', speed: 336 },
  { driverId: 'HAM', position: 4, previousPosition: 5, lap: 42, gapToLeader: '+11.230', gapToCarAhead: '+5.339', tyre: 'HARD', tyreAge: 20, pitStops: 1, status: 'RUNNING', fastestLap: true, currentLapTime: '1:21.442', bestLapTime: '1:21.442', speed: 341 },
  { driverId: 'RUS', position: 5, previousPosition: 4, lap: 42, gapToLeader: '+14.872', gapToCarAhead: '+3.642', tyre: 'HARD', tyreAge: 17, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:22.560', bestLapTime: '1:22.011', speed: 335 },
  { driverId: 'PIA', position: 6, previousPosition: 6, lap: 42, gapToLeader: '+18.304', gapToCarAhead: '+3.432', tyre: 'MEDIUM', tyreAge: 6, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:21.780', bestLapTime: '1:21.780', speed: 339 },
  { driverId: 'SAI', position: 7, previousPosition: 8, lap: 42, gapToLeader: '+26.115', gapToCarAhead: '+7.811', tyre: 'HARD', tyreAge: 22, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.012', bestLapTime: '1:22.450', speed: 332 },
  { driverId: 'ALO', position: 8, previousPosition: 7, lap: 42, gapToLeader: '+31.440', gapToCarAhead: '+5.325', tyre: 'HARD', tyreAge: 24, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.400', bestLapTime: '1:22.890', speed: 330 },
  { driverId: 'TSU', position: 9, previousPosition: 11, lap: 42, gapToLeader: '+41.200', gapToCarAhead: '+9.760', tyre: 'MEDIUM', tyreAge: 10, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:22.890', bestLapTime: '1:22.600', speed: 333 },
  { driverId: 'HUL', position: 10, previousPosition: 9, lap: 42, gapToLeader: '+48.650', gapToCarAhead: '+7.450', tyre: 'HARD', tyreAge: 21, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.800', bestLapTime: '1:23.100', speed: 328 },
  { driverId: 'GAS', position: 11, previousPosition: 10, lap: 42, gapToLeader: '+54.300', gapToCarAhead: '+5.650', tyre: 'HARD', tyreAge: 25, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.950', bestLapTime: '1:23.250', speed: 327 },
  { driverId: 'BEA', position: 12, previousPosition: 13, lap: 42, gapToLeader: '+1:01.200', gapToCarAhead: '+6.900', tyre: 'MEDIUM', tyreAge: 12, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.200', bestLapTime: '1:23.010', speed: 331 },
  { driverId: 'LAW', position: 13, previousPosition: 14, lap: 42, gapToLeader: '+1:08.450', gapToCarAhead: '+7.250', tyre: 'HARD', tyreAge: 19, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:24.100', bestLapTime: '1:23.500', speed: 329 },
  { driverId: 'ANT', position: 14, previousPosition: 12, lap: 42, gapToLeader: '+1:14.300', gapToCarAhead: '+5.850', tyre: 'HARD', tyreAge: 26, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:24.300', bestLapTime: '1:23.400', speed: 330 },
  { driverId: 'STR', position: 15, previousPosition: 16, lap: 42, gapToLeader: '+1:20.100', gapToCarAhead: '+5.800', tyre: 'MEDIUM', tyreAge: 14, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:23.900', bestLapTime: '1:23.700', speed: 328 },
  { driverId: 'COL', position: 16, previousPosition: 17, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+1 LAP', tyre: 'HARD', tyreAge: 20, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:24.800', bestLapTime: '1:23.900', speed: 326 },
  { driverId: 'BOT', position: 17, previousPosition: 18, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+4.200', tyre: 'HARD', tyreAge: 23, pitStops: 1, status: 'RUNNING', fastestLap: false, currentLapTime: '1:25.100', bestLapTime: '1:24.200', speed: 324 },
  { driverId: 'DOO', position: 18, previousPosition: 19, lap: 41, gapToLeader: '+1 LAP', gapToCarAhead: '+8.600', tyre: 'MEDIUM', tyreAge: 7, pitStops: 2, status: 'RUNNING', fastestLap: false, currentLapTime: '1:24.400', bestLapTime: '1:24.400', speed: 327 },
  { driverId: 'OCO', position: 19, previousPosition: 15, lap: 28, gapToLeader: 'DNF', gapToCarAhead: 'DNF', tyre: 'MEDIUM', tyreAge: 14, pitStops: 1, status: 'DNF', fastestLap: false, speed: 0 },
  { driverId: 'PER', position: 20, previousPosition: 20, lap: 12, gapToLeader: 'DNF', gapToCarAhead: 'DNF', tyre: 'SOFT', tyreAge: 12, pitStops: 0, status: 'DNF', fastestLap: false, speed: 0 },
];

export const MOCK_RACE_EVENTS: RaceEvent[] = [
  { id: 'e1', timestamp: '58:12', lap: 41, type: 'OVERTAKE', description: 'Norris overtakes Leclerc for P2 into Turn 1 with DRS', driverId: 'NOR', secondaryDriverId: 'LEC' },
  { id: 'e2', timestamp: '55:34', lap: 39, type: 'FASTEST_LAP', description: 'Hamilton sets new fastest lap: 1:21.442 (Lap 39)', driverId: 'HAM' },
  { id: 'e3', timestamp: '52:10', lap: 36, type: 'PIT_STOP', description: 'Leclerc pits (Medium to Soft, 2.4s stop) — rejoins P3', driverId: 'LEC' },
  { id: 'e4', timestamp: '48:45', lap: 34, type: 'OVERTAKE', description: 'Piastri passes Sainz for P6 through Ascari', driverId: 'PIA', secondaryDriverId: 'SAI' },
  { id: 'e5', timestamp: '41:20', lap: 28, type: 'YELLOW_FLAG', description: 'Yellow flag in Sector 2 — Ocon stopped on track with engine failure', driverId: 'OCO' },
  { id: 'e6', timestamp: '35:08', lap: 24, type: 'PIT_STOP', description: 'Verstappen pits (Medium to Hard, 2.1s stop) — retains lead', driverId: 'VER' },
  { id: 'e7', timestamp: '31:50', lap: 22, type: 'OVERTAKE', description: 'Hamilton overtakes Russell for P4 around the outside of Parabolica', driverId: 'HAM', secondaryDriverId: 'RUS' },
  { id: 'e8', timestamp: '18:15', lap: 12, type: 'VIRTUAL_SAFETY_CAR', description: 'VSC deployed — debris on main straight from Perez collision', driverId: 'PER' },
  { id: 'e9', timestamp: '02:30', lap: 1, type: 'RACE_START', description: 'Race started — Verstappen leads into Turn 1 from pole' },
];

export const MOCK_PIT_STOPS: PitStop[] = [
  { id: 'p1', driverId: 'LEC', lap: 36, stopNumber: 2, oldTyre: 'HARD', newTyre: 'MEDIUM', pitLaneTime: '23.8s', timestamp: '52:10' },
  { id: 'p2', driverId: 'PIA', lap: 36, stopNumber: 2, oldTyre: 'HARD', newTyre: 'MEDIUM', pitLaneTime: '24.1s', timestamp: '52:30' },
  { id: 'p3', driverId: 'NOR', lap: 26, stopNumber: 1, oldTyre: 'MEDIUM', newTyre: 'HARD', pitLaneTime: '23.2s', timestamp: '38:15' },
  { id: 'p4', driverId: 'RUS', lap: 25, stopNumber: 1, oldTyre: 'MEDIUM', newTyre: 'HARD', pitLaneTime: '23.6s', timestamp: '36:45' },
  { id: 'p5', driverId: 'VER', lap: 24, stopNumber: 1, oldTyre: 'MEDIUM', newTyre: 'HARD', pitLaneTime: '22.8s', timestamp: '35:08' },
  { id: 'p6', driverId: 'HAM', lap: 22, stopNumber: 1, oldTyre: 'MEDIUM', newTyre: 'HARD', pitLaneTime: '23.4s', timestamp: '32:20' },
];

export const MOCK_FASTEST_LAP: FastestLap = {
  driverId: 'HAM',
  time: '1:21.442',
  lap: 39,
  speed: 256.12,
};

export const MOCK_LIVE_RACE: LiveRaceData = {
  sessionId: 'monza-2025-race',
  race: {
    id: 'monza-2025',
    season: 2025,
    round: 16,
    name: 'Italian Grand Prix',
    shortName: 'Italian GP',
    circuitId: 'monza',
    country: 'Italy',
    flagEmoji: '🇮🇹',
    startTime: '2025-09-07T13:00:00Z',
    status: 'LIVE',
    currentLap: 42,
    totalLaps: 53,
    raceStatus: 'GREEN_FLAG',
  },
  circuit: MOCK_CIRCUITS.monza,
  positions: MOCK_LIVE_POSITIONS,
  events: MOCK_RACE_EVENTS,
  pitStops: MOCK_PIT_STOPS,
  fastestLap: MOCK_FASTEST_LAP,
  lastUpdated: new Date().toISOString(),
  dataSource: 'MOCK',
  weather: {
    airTemp: 28,
    trackTemp: 44,
    humidity: 42,
    windSpeed: 8,
    windDirection: 'NE',
    rainfall: false,
    rainProbability: 5,
    condition: 'Sunny / Dry',
    available: true,
  },
};

// ------------------------------------------------------------------
// STANDINGS MOCK
// ------------------------------------------------------------------
export const MOCK_DRIVER_STANDINGS: DriverStanding[] = [
  { position: 1, driverId: 'VER', teamId: 'RBR', points: 331, wins: 8, podiums: 14, change: 0 },
  { position: 2, driverId: 'NOR', teamId: 'MCL', points: 279, wins: 3, podiums: 12, change: 0 },
  { position: 3, driverId: 'LEC', teamId: 'FER', points: 245, wins: 2, podiums: 9, change: 0 },
  { position: 4, driverId: 'PIA', teamId: 'MCL', points: 237, wins: 2, podiums: 8, change: 1 },
  { position: 5, driverId: 'SAI', teamId: 'WIL', points: 190, wins: 1, podiums: 6, change: -1 },
  { position: 6, driverId: 'HAM', teamId: 'FER', points: 174, wins: 2, podiums: 4, change: 0 },
  { position: 7, driverId: 'RUS', teamId: 'MER', points: 143, wins: 1, podiums: 3, change: 0 },
  { position: 8, driverId: 'PER', teamId: 'RBR', points: 143, wins: 0, podiums: 4, change: 0 },
  { position: 9, driverId: 'ALO', teamId: 'AMR', points: 62, wins: 0, podiums: 0, change: 0 },
  { position: 10, driverId: 'HUL', teamId: 'HAS', points: 31, wins: 0, podiums: 0, change: 1 },
  { position: 11, driverId: 'TSU', teamId: 'RBR', points: 28, wins: 0, podiums: 0, change: -1 },
  { position: 12, driverId: 'STR', teamId: 'AMR', points: 24, wins: 0, podiums: 0, change: 0 },
  { position: 13, driverId: 'GAS', teamId: 'ALP', points: 20, wins: 0, podiums: 0, change: 0 },
  { position: 14, driverId: 'BEA', teamId: 'HAS', points: 7, wins: 0, podiums: 0, change: 0 },
  { position: 15, driverId: 'OCO', teamId: 'HAS', points: 5, wins: 0, podiums: 0, change: 0 },
  { position: 16, driverId: 'COL', teamId: 'WIL', points: 5, wins: 0, podiums: 0, change: 0 },
  { position: 17, driverId: 'BOT', teamId: 'SAU', points: 0, wins: 0, podiums: 0, change: 0 },
  { position: 18, driverId: 'LAW', teamId: 'RBU', points: 0, wins: 0, podiums: 0, change: 0 },
  { position: 19, driverId: 'ANT', teamId: 'MER', points: 0, wins: 0, podiums: 0, change: 0 },
  { position: 20, driverId: 'DOO', teamId: 'ALP', points: 0, wins: 0, podiums: 0, change: 0 },
];

export const MOCK_CONSTRUCTOR_STANDINGS: ConstructorStanding[] = [
  { position: 1, teamId: 'MCL', points: 516, wins: 5, podiums: 20, change: 0 },
  { position: 2, teamId: 'FER', points: 435, wins: 3, podiums: 15, change: 1 },
  { position: 3, teamId: 'RBR', points: 474, wins: 8, podiums: 18, change: -1 },
  { position: 4, teamId: 'MER', points: 317, wins: 3, podiums: 7, change: 0 },
  { position: 5, teamId: 'AMR', points: 86, wins: 0, podiums: 0, change: 0 },
  { position: 6, teamId: 'HAS', points: 38, wins: 0, podiums: 0, change: 1 },
  { position: 7, teamId: 'RBU', points: 34, wins: 0, podiums: 0, change: -1 },
  { position: 8, teamId: 'ALP', points: 25, wins: 0, podiums: 0, change: 0 },
  { position: 9, teamId: 'WIL', points: 17, wins: 0, podiums: 0, change: 0 },
  { position: 10, teamId: 'SAU', points: 0, wins: 0, podiums: 0, change: 0 },
];

// ------------------------------------------------------------------
// CALENDAR MOCK (2025 Season)
// ------------------------------------------------------------------
export const MOCK_CALENDAR: Race[] = [
  { id: 'aus-2025', season: 2025, round: 1, name: 'Australian Grand Prix', shortName: 'Australian GP', circuitId: 'albert-park', country: 'Australia', flagEmoji: '🇦🇺', startTime: '2025-03-16T04:00:00Z', status: 'COMPLETED', winner: 'Lando Norris' },
  { id: 'chn-2025', season: 2025, round: 2, name: 'Chinese Grand Prix', shortName: 'Chinese GP', circuitId: 'shanghai', country: 'China', flagEmoji: '🇨🇳', startTime: '2025-03-23T07:00:00Z', status: 'COMPLETED', winner: 'Max Verstappen' },
  { id: 'jpn-2025', season: 2025, round: 3, name: 'Japanese Grand Prix', shortName: 'Japanese GP', circuitId: 'suzuka', country: 'Japan', flagEmoji: '🇯🇵', startTime: '2025-04-06T05:00:00Z', status: 'COMPLETED', winner: 'Max Verstappen' },
  { id: 'bhr-2025', season: 2025, round: 4, name: 'Bahrain Grand Prix', shortName: 'Bahrain GP', circuitId: 'bahrain', country: 'Bahrain', flagEmoji: '🇧🇭', startTime: '2025-04-13T15:00:00Z', status: 'COMPLETED', winner: 'Max Verstappen' },
  { id: 'sau-2025', season: 2025, round: 5, name: 'Saudi Arabian Grand Prix', shortName: 'Saudi GP', circuitId: 'jeddah', country: 'Saudi Arabia', flagEmoji: '🇸🇦', startTime: '2025-04-20T17:00:00Z', status: 'COMPLETED', winner: 'Charles Leclerc' },
  { id: 'mia-2025', season: 2025, round: 6, name: 'Miami Grand Prix', shortName: 'Miami GP', circuitId: 'miami', country: 'United States', flagEmoji: '🇺🇸', startTime: '2025-05-04T20:00:00Z', status: 'COMPLETED', winner: 'Lando Norris' },
  { id: 'emi-2025', season: 2025, round: 7, name: 'Emilia Romagna Grand Prix', shortName: 'Imola GP', circuitId: 'imola', country: 'Italy', flagEmoji: '🇮🇹', startTime: '2025-05-18T13:00:00Z', status: 'COMPLETED', winner: 'Max Verstappen' },
  { id: 'mon-2025', season: 2025, round: 8, name: 'Monaco Grand Prix', shortName: 'Monaco GP', circuitId: 'monaco', country: 'Monaco', flagEmoji: '🇲🇨', startTime: '2025-05-25T13:00:00Z', status: 'COMPLETED', winner: 'Charles Leclerc' },
  { id: 'esp-2025', season: 2025, round: 9, name: 'Spanish Grand Prix', shortName: 'Spanish GP', circuitId: 'barcelona', country: 'Spain', flagEmoji: '🇪🇸', startTime: '2025-06-01T13:00:00Z', status: 'COMPLETED', winner: 'Max Verstappen' },
  { id: 'can-2025', season: 2025, round: 10, name: 'Canadian Grand Prix', shortName: 'Canadian GP', circuitId: 'montreal', country: 'Canada', flagEmoji: '🇨🇦', startTime: '2025-06-15T18:00:00Z', status: 'COMPLETED', winner: 'George Russell' },
  { id: 'aut-2025', season: 2025, round: 11, name: 'Austrian Grand Prix', shortName: 'Austrian GP', circuitId: 'redbullring', country: 'Austria', flagEmoji: '🇦🇹', startTime: '2025-06-29T13:00:00Z', status: 'COMPLETED', winner: 'George Russell' },
  { id: 'gbr-2025', season: 2025, round: 12, name: 'British Grand Prix', shortName: 'British GP', circuitId: 'silverstone', country: 'Great Britain', flagEmoji: '🇬🇧', startTime: '2025-07-06T14:00:00Z', status: 'COMPLETED', winner: 'Lewis Hamilton' },
  { id: 'bel-2025', season: 2025, round: 13, name: 'Belgian Grand Prix', shortName: 'Belgian GP', circuitId: 'spa', country: 'Belgium', flagEmoji: '🇧🇪', startTime: '2025-07-27T13:00:00Z', status: 'COMPLETED', winner: 'Lewis Hamilton' },
  { id: 'hun-2025', season: 2025, round: 14, name: 'Hungarian Grand Prix', shortName: 'Hungarian GP', circuitId: 'hungaroring', country: 'Hungary', flagEmoji: '🇭🇺', startTime: '2025-08-03T13:00:00Z', status: 'COMPLETED', winner: 'Oscar Piastri' },
  { id: 'ned-2025', season: 2025, round: 15, name: 'Dutch Grand Prix', shortName: 'Dutch GP', circuitId: 'zandvoort', country: 'Netherlands', flagEmoji: '🇳🇱', startTime: '2025-08-31T13:00:00Z', status: 'COMPLETED', winner: 'Lando Norris' },
  { id: 'ita-2025', season: 2025, round: 16, name: 'Italian Grand Prix', shortName: 'Italian GP', circuitId: 'monza', country: 'Italy', flagEmoji: '🇮🇹', startTime: '2025-09-07T13:00:00Z', status: 'LIVE', currentLap: 42, totalLaps: 53 },
  { id: 'aze-2025', season: 2025, round: 17, name: 'Azerbaijan Grand Prix', shortName: 'Azerbaijan GP', circuitId: 'baku', country: 'Azerbaijan', flagEmoji: '🇦🇿', startTime: '2025-09-21T11:00:00Z', status: 'UPCOMING' },
  { id: 'sin-2025', season: 2025, round: 18, name: 'Singapore Grand Prix', shortName: 'Singapore GP', circuitId: 'marina_bay', country: 'Singapore', flagEmoji: '🇸🇬', startTime: '2025-10-05T12:00:00Z', status: 'UPCOMING' },
  { id: 'usa-2025', season: 2025, round: 19, name: 'United States Grand Prix', shortName: 'US GP', circuitId: 'cota', country: 'United States', flagEmoji: '🇺🇸', startTime: '2025-10-19T19:00:00Z', status: 'UPCOMING' },
  { id: 'mex-2025', season: 2025, round: 20, name: 'Mexico City Grand Prix', shortName: 'Mexico GP', circuitId: 'rodriguez', country: 'Mexico', flagEmoji: '🇲🇽', startTime: '2025-10-26T20:00:00Z', status: 'UPCOMING' },
  { id: 'bra-2025', season: 2025, round: 21, name: 'São Paulo Grand Prix', shortName: 'Brazil GP', circuitId: 'interlagos', country: 'Brazil', flagEmoji: '🇧🇷', startTime: '2025-11-09T17:00:00Z', status: 'UPCOMING' },
  { id: 'lvg-2025', season: 2025, round: 22, name: 'Las Vegas Grand Prix', shortName: 'Las Vegas GP', circuitId: 'las_vegas', country: 'United States', flagEmoji: '🇺🇸', startTime: '2025-11-23T06:00:00Z', status: 'UPCOMING' },
  { id: 'qat-2025', season: 2025, round: 23, name: 'Qatar Grand Prix', shortName: 'Qatar GP', circuitId: 'losail', country: 'Qatar', flagEmoji: '🇶🇦', startTime: '2025-11-30T16:00:00Z', status: 'UPCOMING' },
  { id: 'abu-2025', season: 2025, round: 24, name: 'Abu Dhabi Grand Prix', shortName: 'Abu Dhabi GP', circuitId: 'yas_marina', country: 'United Arab Emirates', flagEmoji: '🇦🇪', startTime: '2025-12-07T13:00:00Z', status: 'UPCOMING' },
];

export const MOCK_CAREER_STATS: Record<string, DriverCareerStats> = {
  VER: { worldChampionships: 4, raceEntries: 206, raceStarts: 206, wins: 61, podiums: 109, polePositions: 40, fastestLaps: 32, careerPoints: 2985.5 },
  NOR: { worldChampionships: 0, raceEntries: 125, raceStarts: 125, wins: 3, podiums: 24, polePositions: 7, fastestLaps: 10, careerPoints: 912 },
  LEC: { worldChampionships: 0, raceEntries: 144, raceStarts: 142, wins: 7, podiums: 41, polePositions: 26, fastestLaps: 9, careerPoints: 1279 },
  HAM: { worldChampionships: 7, raceEntries: 350, raceStarts: 350, wins: 105, podiums: 201, polePositions: 104, fastestLaps: 67, careerPoints: 4829.5 },
  RUS: { worldChampionships: 0, raceEntries: 125, raceStarts: 125, wins: 2, podiums: 14, polePositions: 4, fastestLaps: 8, careerPoints: 612 },
  SAI: { worldChampionships: 0, raceEntries: 203, raceStarts: 201, wins: 4, podiums: 24, polePositions: 5, fastestLaps: 4, careerPoints: 1227.5 },
  PIA: { worldChampionships: 0, raceEntries: 43, raceStarts: 43, wins: 2, podiums: 9, polePositions: 0, fastestLaps: 3, careerPoints: 334 },
  ALO: { worldChampionships: 2, raceEntries: 398, raceStarts: 395, wins: 32, podiums: 106, polePositions: 22, fastestLaps: 26, careerPoints: 2329 },
};

export const MOCK_SEASON_STATS: Record<string, DriverSeasonStats> = {
  VER: { season: 2025, points: 331, position: 1, wins: 8, podiums: 14, polePositions: 8, fastestLaps: 5, dnfs: 2 },
  NOR: { season: 2025, points: 279, position: 2, wins: 3, podiums: 12, polePositions: 5, fastestLaps: 4, dnfs: 0 },
  LEC: { season: 2025, points: 245, position: 3, wins: 2, podiums: 9, polePositions: 3, fastestLaps: 2, dnfs: 1 },
  HAM: { season: 2025, points: 174, position: 6, wins: 2, podiums: 4, polePositions: 0, fastestLaps: 2, dnfs: 1 },
  RUS: { season: 2025, points: 143, position: 7, wins: 1, podiums: 3, polePositions: 1, fastestLaps: 1, dnfs: 2 },
  PIA: { season: 2025, points: 237, position: 4, wins: 2, podiums: 8, polePositions: 0, fastestLaps: 1, dnfs: 1 },
  SAI: { season: 2025, points: 190, position: 5, wins: 1, podiums: 6, polePositions: 1, fastestLaps: 1, dnfs: 1 },
  ALO: { season: 2025, points: 62, position: 9, wins: 0, podiums: 0, polePositions: 0, fastestLaps: 0, dnfs: 1 },
};


// ------------------------------------------------------------------
// QUALIFYING RESULTS MOCK
// ------------------------------------------------------------------
export const MOCK_QUALIFYING: QualifyingResult[] = [
  { position: 1, driverId: 'VER', q1: '1:20.215', q2: '1:19.880', q3: '1:19.327', laps: 15 },
  { position: 2, driverId: 'NOR', q1: '1:20.450', q2: '1:19.920', q3: '1:19.452', laps: 16 },
  { position: 3, driverId: 'LEC', q1: '1:20.310', q2: '1:20.010', q3: '1:19.510', laps: 16 },
  { position: 4, driverId: 'HAM', q1: '1:20.550', q2: '1:20.150', q3: '1:19.620', laps: 17 },
  { position: 5, driverId: 'RUS', q1: '1:20.600', q2: '1:20.200', q3: '1:19.780', laps: 15 },
  { position: 6, driverId: 'PIA', q1: '1:20.720', q2: '1:20.250', q3: '1:19.820', laps: 16 },
  { position: 7, driverId: 'SAI', q1: '1:20.800', q2: '1:20.350', q3: '1:20.010', laps: 18 },
  { position: 8, driverId: 'ALO', q1: '1:20.910', q2: '1:20.480', q3: '1:20.150', laps: 17 },
];

export enum StudentType {
  SCHOOL = 'School Student',
  COLLEGE = 'College Student'
}

export interface UserData {
  name: string;
  type: StudentType | null;
  skills: string;
  goal: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  timeline: string;
  resources: {
    name: string;
    url: string;
  }[];
}

export interface WeeklyTask {
  day: string;
  task: string;
  focusArea: string;
}

export interface AIResponse {
  motivationalQuote: string;
  careerSummary: string;
  roadmap: RoadmapStep[];
  weeklySchedule: WeeklyTask[];
}

export enum AppState {
  WELCOME,
  SELECTION,
  INPUT_FORM,
  LOADING,
  RESULTS
}
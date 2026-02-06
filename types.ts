
export interface JavaFile {
  name: string;
  content: string;
}

export interface ProjectData {
  projectName: string;
  files: JavaFile[];
  summary: string;
  vivaTopics: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

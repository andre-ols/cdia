import { FC, PropsWithChildren, createContext, useState } from "react";

import { subjects } from "../../data/subjects.json";

interface Subject {
  code: string;
  name: string;
  workload: number;
  semester: number;
  prerequisites: Array<string>;
}

interface AppContextState {
  subjects: Subject[];
  completedSubjects: string[];
  subjectsBySemester: Record<number, Subject[]>;
  selectSubject: (code: string) => void;
  unselectSubject: (code: string) => void;
  canSelectSubject: (subject: Subject) => boolean;
  isSelected: (code: string) => boolean;
}

const groupSubjectsBySemester = (
  subjects: Subject[]
): Record<number, Subject[]> => {
  return subjects.reduce((acc, subject) => {
    acc[subject.semester] = (acc[subject.semester] || []).concat(subject);
    return acc;
  }, {} as Record<number, Subject[]>);
};

const subjectsBySemester = groupSubjectsBySemester(subjects);

export const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);

  const canSelectSubject = (subject: Subject): boolean => {
    if (completedSubjects.includes(subject.code)) {
      return true;
    }

    // Verifica se a disciplina tem pré-requisitos
    if (!subject.prerequisites || subject.prerequisites.length === 0) {
      return true;
    }

    // Verifica se todos os pré-requisitos foram cumpridos
    return subject.prerequisites.every((prerequisite) => {
      return completedSubjects.includes(prerequisite);
    });
  };

  const isSelected = (code: string) => completedSubjects.includes(code);

  // Função para selecionar uma disciplina
  const selectSubject = (code: string) => {
    const subject = subjects.find((d) => d.code === code);

    if (!subject) {
      return;
    }
    if (!canSelectSubject(subject)) {
      return;
    }

    setCompletedSubjects([...completedSubjects, code]);
  };

  // Função para desmarcar uma disciplina
  const unselectSubject = (code: string) => {
    setCompletedSubjects(completedSubjects.filter((d) => d !== code));
  };

  return (
    <AppContext.Provider
      value={{
        subjects,
        completedSubjects,
        selectSubject,
        unselectSubject,
        canSelectSubject,
        subjectsBySemester,
        isSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };

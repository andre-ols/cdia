import classnames from "classnames";
import React, { useContext } from "react";
import { NotificationContext } from "./components/Notification/context/Notification.context";
import { AppContext } from "./context/App.context";

const SubjectsGrid: React.FC = () => {
  const {
    subjectsBySemester,
    selectSubject,
    unselectSubject,
    canSelectSubject,
    isSelected,
    subjects,
  } = useContext(AppContext);

  const getSubjecByCode = (code: string) => {
    return subjects.find((subject) => subject.code === code);
  };

  const { send } = useContext(NotificationContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 select-none">
      {/* Seção de filtros (a ser implementada) */}

      <div className="flex sm:flex-row w-full flex-col overflow-y-auto overflow-x-auto px-4 py-8">
        {Object.keys(subjectsBySemester).map((semester) => (
          <div
            key={semester}
            className="flex flex-col w-full items-center px-8 py-4 border-r border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Semestre {semester}
            </h2>
            <div className="flex flex-col gap-4">
              {subjectsBySemester[Number(semester)].map((subject) => {
                const cardClasses = classnames({
                  "bg-green-500 text-white": isSelected(subject.code),
                  "bg-white":
                    canSelectSubject(subject) && !isSelected(subject.code),
                  "bg-gray-200 text-gray-500": !canSelectSubject(subject),
                  "cursor-pointer": true,
                });

                return (
                  <div
                    key={subject.code}
                    className={`rounded-lg shadow-md transition-colors duration-300 w-[300px] ${cardClasses}`}
                    onClick={() => {
                      if (!canSelectSubject(subject)) {
                        send(
                          "Matéria bloqueada",
                          `Dependências: ${subject.prerequisites
                            .map((code: string) => getSubjecByCode(code)?.name)
                            .join(", ")}`,
                          "warning"
                        );
                        return;
                      }

                      if (isSelected(subject.code)) {
                        unselectSubject(subject.code);
                        return;
                      }
                      selectSubject(subject.code);

                      send(
                        "Matéria selecionada",
                        `Você selecionou a matéria ${subject.name}`
                      );
                    }}
                  >
                    <div className="flex flex-col items-start p-4 gap-2">
                      <p className="text-lg font-medium">{subject.name}</p>
                      <div className="flex justify-between w-full">
                        <p className="text-sm font-mono">{subject.code}</p>
                        <p className="text-sm font-mono text-right">
                          {subject.workload}h
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsGrid;

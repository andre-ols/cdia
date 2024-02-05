import classnames from "classnames";
import React, { useContext } from "react";
import { AppContext } from "./context/App.context";

const SubjectsGrid: React.FC = () => {
  const {
    subjectsBySemester,
    selectSubject,
    unselectSubject,
    canSelectSubject,
    isSelected,
  } = useContext(AppContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Seção de filtros (a ser implementada) */}

      <div className="flex-auto overflow-y-auto px-4 py-8">
        {Object.keys(subjectsBySemester).map((semester) => (
          <div
            key={semester}
            className="flex flex-col w-full px-8 py-4 border-r border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Semestre {semester}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {subjectsBySemester[semester].map((subject) => {
                const cardClasses = classnames({
                  "bg-green-500 text-white": isSelected(subject.code),
                  "bg-white":
                    canSelectSubject(subject) && !isSelected(subject.code),
                  "bg-gray-200 text-gray-500": !canSelectSubject(subject),
                  "cursor-pointer": canSelectSubject(subject),
                  "cursor-not-allowed": !canSelectSubject(subject),
                });

                return (
                  <div
                    key={subject.code}
                    className={`rounded-lg shadow-md transition-colors duration-300 ${cardClasses}`}
                    onClick={() => {
                      if (isSelected(subject.code)) {
                        unselectSubject(subject.code);
                        return;
                      }
                      selectSubject(subject.code);
                    }}
                  >
                    <div className="flex flex-col items-center p-4">
                      <p className="text-lg font-medium">{subject.name}</p>
                      <p className="text-sm font-light text-gray-500">
                        {subject.code}
                      </p>
                      <p className="text-sm font-light text-gray-500 text-right">
                        {subject.workload}h
                      </p>
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

import React, {
    createContext, useState, useContext
} from 'react'

const LectureRegisterContext = createContext({})

export const LectureRegisterProvider = ({ children }) => {
    const [levels, setLevels] = useState([{
        questions: [{ description: '', media: '', options: [{ text: '', media: '', isCorrect: false }] }]
    }])

    function addNewLevel() {
        setLevels((levels) => {
            const newLevels = levels.concat([{ questions: [{ description: '', media: '', options: [{ text: '', media: '', isCorrect: false }] }] }])
            return newLevels
        })
    }

    function removeLevel(levelId) {
        setLevels((levels) => levels.filter((currentLevel, currentLevelId) => levelId !== currentLevelId)) /* eslint-disable-line*/
    }

    const changeLevelName = (levelId) => (event) => {
        const newLevels = levels.map((level, currentLevelId) => {
            if (levelId !== currentLevelId) return level
            const newLevel = { ...level, name: event.nativeEvent.text }
            return (newLevel)
        })

        setLevels(newLevels)
    }

    function addNewQuestion(levelId) {
        setLevels((levels) => {
            const newLevels = [...levels]
            newLevels[levelId].questions.push({ description: '', media: '', options: [{ text: '', media: '', isCorrect: false }] })
            return newLevels
        })
    }

    function removeQuestion(levelId, questionId) {
        setLevels((levels) => {
            const newLevels = levels.map((currentLevel, currentLevelId) => {
                if (levelId !== currentLevelId) return currentLevel

                const newQuestions = currentLevel
                    .questions
                    .filter(
                        (currentQuestion, currentQuestionId) => questionId !== currentQuestionId
                    )

                const newLevel = { ...currentLevel, questions: newQuestions }
                return (newLevel)
            })

            return (newLevels)
        })
    }

    const changeQuestionField = (levelId, questionId, fieldName) => (event) => {
        const newLevels = levels.map((currentLevel, currentLevelId) => {
            if (levelId !== currentLevelId) return currentLevel

            const newQuestions = currentLevel.questions.map((question, currentQuestionId) => {
                if (questionId !== currentQuestionId) return question
                const newQuestion = { ...question, [fieldName]: event.nativeEvent.text }
                return (newQuestion)
            })

            const newLevel = { ...currentLevel, questions: newQuestions }
            return (newLevel)
        })

        setLevels(newLevels)
    }

    function addNewOption(levelId, questionId) {
        setLevels((levels) => {
            const newLevels = [...levels]
            newLevels[levelId].questions[questionId].options.push({ text: '', media: '', isCorrect: false })
            return newLevels
        })
    }

    function removeOption(levelId, questionId, optionId) {
        setLevels((levels) => {
            const newLevels = levels.map((currentLevel, currentLevelId) => {
                if (levelId !== currentLevelId) return currentLevel

                const newQuestions = currentLevel
                    .questions
                    .map((currentQuestion, currentQuestionId) => {
                        if (questionId !== currentQuestionId) return currentQuestion

                        const newOptions = currentQuestion.options.filter(
                            (currentOption, currentOptionId) => optionId !== currentOptionId
                        )

                        const newQuestion = { ...currentQuestion, options: newOptions }
                        return (newQuestion)
                    })

                const newLevel = { ...currentLevel, questions: newQuestions }
                return (newLevel)
            })

            return (newLevels)
        })
    }

    // const changeOptionText = (levelId, questionId, optionId) => (event) => {
    //     const newLevels = levels.map((currentLevel, currentLevelId) => {
    //         if (levelId !== currentLevelId) return currentLevel

    //         const newQuestions = currentLevel
    //             .questions
    //             .map((currentQuestion, currentQuestionId) => {
    //                 if (questionId !== currentQuestionId) return currentQuestion

    //                 const newOptions = currentQuestion
    //                     .options
    //                     .map((currentOption, currentOptionId) => {
    //                         if (optionId !== currentOptionId) return currentOption

    //                         const newOption = { ...currentOption, text: event.nativeEvent.text }
    //                         return (newOption)
    //                     })

    //                 const newQuestion = { ...currentQuestion, options: newOptions }
    //                 return (newQuestion)
    //             })

    //         const newLevel = { ...currentLevel, questions: newQuestions }
    //         return (newLevel)
    //     })

    //     setLevels(newLevels)
    // }

    const changeOptionField = (levelId, questionId, optionId, fieldName) => (event) => {
        const newLevels = levels.map((currentLevel, currentLevelId) => {
            if (levelId !== currentLevelId) return currentLevel

            const newQuestions = currentLevel
                .questions
                .map((currentQuestion, currentQuestionId) => {
                    if (questionId !== currentQuestionId) return currentQuestion

                    const newOptions = currentQuestion
                        .options
                        .map((currentOption, currentOptionId) => {
                            if (optionId !== currentOptionId) return currentOption

                            const newOption = {
                                ...currentOption,
                                [fieldName]: event.nativeEvent.text
                            }
                            return (newOption)
                        })

                    const newQuestion = { ...currentQuestion, options: newOptions }
                    return (newQuestion)
                })

            const newLevel = { ...currentLevel, questions: newQuestions }
            return (newLevel)
        })

        setLevels(newLevels)
    }

    return (
        <LectureRegisterContext.Provider value={{
            levels,
            addNewLevel,
            removeLevel,
            changeLevelName,
            addNewQuestion,
            removeQuestion,
            changeQuestionField,
            addNewOption,
            removeOption,
            changeOptionField
        }}
        >
            {children}
        </LectureRegisterContext.Provider>

    )
}

export function useLectureRegister() {
    const context = useContext(LectureRegisterContext)

    return context
}

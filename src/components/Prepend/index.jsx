import like from '../../static/img/like.png'
import {QuestionContext} from "../../context/QuestionContext";
import {useContext, useEffect} from "react";
export default function Prepend({prepend}){
    const questionContext = useContext(QuestionContext)
    
    function handleClick(){
        // questionContext.onStepChange(questionContext.step+1)
    }
    // Эффект выполняется один раз при показе экрана. Раньше у него не было массива зависимостей:
    // он запускался после каждого рендера (а setLoading сам вызывает рендер), создавал новые таймеры
    // без очистки, и каждый из них сдвигал шаг — квиз «перепрыгивал» вопросы.
    useEffect(() => {
        const step = questionContext.step
        if(questionContext.resultQuery[4]?.value[0] !== 'skip' && step === 7) {
            questionContext.onStepChange(step + 2)
            return undefined
        }

        questionContext.setLoading(true)
        const timer = setTimeout(() => {
            questionContext.onStepChange(step + 1)
            questionContext.setLoading(false)
        }, 2000)

        // экран закрыли раньше (крестик, «назад») — таймер не должен переключить шаг
        return () => {
            clearTimeout(timer)
            questionContext.setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div onClick={handleClick} className="prepend">
            <div className="prepend__img">
                <img src={like}/>
            </div>
            <div className="prepend__title">
                {prepend}
            </div>
        </div>
    )
}
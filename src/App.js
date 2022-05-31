import {useEffect, useState} from "react";
import Progress from './components/Progress/index'
import quests from "./helpers/questions";
import ovalMan1 from "./static/img/ovalMan1.png";
import ovalMan2 from "./static/img/ovalMan2.png";
import ovalMan3 from "./static/img/ovalMan3.png";
import ovalWoman1 from './static/img/ovalWoman1.png'
import ovalWoman2 from './static/img/ovalWoman2.png'
import ovalWoman3 from './static/img/ovalWoman3.png'
import Question from "./components/Question";
import {QuestionContext} from "./context/QuestionContext";
import Intro from "./components/Intro";
import Outro from './components/Outro'
import womansGlasses1 from './static/img/glasses_woman1.png'
import womansGlasses2 from './static/img/glasses_woman2.png'
import mansGlasses1 from "./static/img/glasses_man1.png";
import mansGlasses2 from "./static/img/glasses_man2.png";

import twoFaces1 from "./static/img/twoFaces1.png";
import twoFaces2 from "./static/img/twoFaces2.png";
import twoFaces3 from "./static/img/twoFaces3.png";

function App() {
    const [resultQuery, setResultQuery] = useState([])
    const [questions, setQuestions]=useState(quests)
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false)
    const [stepToDisplay, setStepToDisplay] = useState(0)
    const [finalStringToDisplay, setFinalStringToDisplay] = useState('')
    useEffect(()=>{
        if(!document.getElementById('widget')){
            let style = document.createElement('link')
            style.id = 'widget'
            style.href = 'https://timovey.github.io/react-widget/static/css/style.css'
            style.rel = 'stylesheet'
            document.querySelector('head').appendChild(style)    
        }
        else {
        }
    }, [])

    useEffect(() => {
        setStepToDisplay(questions[step - 1]?.step)
    }, [step])

    useEffect(() => {
        if(questions.length <= step) {
            return
        }
        // console.log(step);
        setResultQuery(resultQuery.filter(item => item.step !== questions[step - 1].step))
    }, [stepToDisplay, step])

    useEffect(()=>{

        let newQuestions = [...questions]

        if(resultQuery[0]?.value.join() === '5'){
            newQuestions[1].variants[0].img = womansGlasses1
            newQuestions[1].variants[1].img = womansGlasses2
 
            newQuestions[10].variants[0].img = ovalWoman1
            newQuestions[10].variants[1].img = ovalWoman2
            newQuestions[10].variants[2].img = ovalWoman3
            
        }
        else if(resultQuery[0]?.value.join() === '4'){
            newQuestions[1].variants[0].img = mansGlasses1
            newQuestions[1].variants[1].img = mansGlasses2
 
            newQuestions[10].variants[0].img = ovalMan1
            newQuestions[10].variants[1].img = ovalMan2
            newQuestions[10].variants[2].img = ovalMan3
        }
        else if(resultQuery[0]?.value.join() === 'skip'){

            newQuestions[10].variants[0].img = twoFaces1
            newQuestions[10].variants[1].img = twoFaces2
            newQuestions[10].variants[2].img = twoFaces3
        }

        if(resultQuery[1]?.value.join() === '211' && step === 9){
            setStep(10)
        }
        if((resultQuery[1]?.value.join() === '210' || resultQuery[1]?.value.join() === 'skip') && step === 10) {
            setStep(11)
        }       


        if(resultQuery[2] && step === 5) {
            
            if (resultQuery[2]?.value.join().includes('skip')) {
                // onStepChange(questions.findIndex(item => item.step === questions[step - 2].step + 1))
                onStepChange(step + 1)
            }
            else if (resultQuery[2]?.value.join().includes('next')) {
            }
        }

        
        if(resultQuery[9]?.value.join() === 'next' && step === 15){
            setStep(16)
        }
        
        setQuestions([...newQuestions])
        setResultQuery(resultQuery)
        queryForming()
    }, [resultQuery])

    function onSend() {
        let string = finalStringToDisplay;
        string = string
                    .replace('screen_10', 'brand')
                    .replace('screen_1', 'gender')
                    .replace('screen_2', 'eyewear_type')
                    .replace('screen_3', 'lenstype')
                    .replace('screen_4', 'frame_size')
                   

        if(resultQuery[1]?.value.join() == 210){
            string = string.replace('screen_5', 'blue_light')
        }else if(resultQuery[1]?.value.join() == 211){
            string = string.replace('screen_5', 'shade')
        }
        string = string 
            .replace('screen_6', 'face_shape')
            .replace('screen_7', 'facial_features')
            .replace('screen_8', 'shape')         
            .replaceAll('&screen_9=', '')
        console.log(document.getElementById('glasses-quiz-widget').getAttribute("data-source") + string);
    }
    function onStepChange(step){
        setStep(step)      
    }
    
    function onClose() {
        setStep(0);
        setResultQuery([]);
    }

    function onStepToDisplayBack(step) {
        if(step - 1 <= 0) {
            setStep(0)
        }
        else {
            setStep(questions.findIndex(item => item.step + 1 === questions[step - 1].step) + 1)
        }
    }
    function onStepToDisplayFront(step) {
        setStep(questions.findIndex(item => item.step === questions[step].step + 1))

    }
    function queryForming(){
        let result = {}
        for(let item of resultQuery){
            if (result[item.step]){
                if(!result[item.step].includes(item.value.join())){
                    result[item.step].push(item.value.join())
                }
            }else{
                result[item.step] = item.value
            }
        }
        let stringToDisplay = ''

        for(let key of Object.keys(result)){
            if(
                !(result[key].join(',').replaceAll('skip', '') === '' ||
                (result[key].join(',').replaceAll('skip', '') === ','))
            ){
                stringToDisplay+=`screen_${key}=${result[key].join(',').replaceAll('skip','').replaceAll('next,', '').replaceAll('next', '')}&`
            }
        }
        setFinalStringToDisplay(stringToDisplay.slice(0,-1))
        // console.log(stringToDisplay.slice(0,-1))
    }

    function onQuestionAsk(step, value){
        setStep(step)
        setResultQuery([...resultQuery, value])
    }

  return (
    <div className="App">
        <QuestionContext.Provider value={{resultQuery, onStepChange, step,onQuestionAsk,stepToDisplay, loading, setLoading}}>
            <Progress onStepToDisplayBack={onStepToDisplayBack} onStepToDisplayFront={onStepToDisplayFront} onClose={onClose} />
            {
                step === 0 &&
                <Intro onStepChange={onStepChange}/>
            }
            {
                questions.map((item, key)=>(
                        key+1 === step &&
                            <div className="question_wrap" key={key}>
                                <Question question={item}/>
                            </div>
                    )
                )
            }
            {
                step === 16 &&
                <Outro onSend={onSend} onClose={onClose}/>
            }
        </QuestionContext.Provider>
    </div>
  );
}

export default App;

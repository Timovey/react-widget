import like from '../../static/img/like.svg'
import {QuestionContext} from "../../context/QuestionContext";
import {useContext} from "react";
import { useEffect } from 'react';
import { useState } from 'react';
export default function Prepend({prepend}){
    const questionContext = useContext(QuestionContext)
    
    function handleClick(){
        // questionContext.onStepChange(questionContext.step+1)
    }
    useEffect(() => {
        if(questionContext.resultQuery[4]?.value[0] !== 'skip' && questionContext.step === 7) {
             
            // console.log(questionContext.step);
            // console.log(questionContext.resultQuery[4]?.value[0])
            questionContext.onStepChange(questionContext.step + 2)
            
        }
        else {
            questionContext.setLoading(true)
            setTimeout(() => {
                questionContext.onStepChange(questionContext.step + 1)
                questionContext.setLoading(false)
                }, 2000)
        }
    })

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
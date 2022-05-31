import Icon from '@mdi/react';
import {mdiChevronLeft, mdiChevronRight, mdiClose} from '@mdi/js';
import {QuestionContext} from "../../context/QuestionContext";
import {useContext} from "react";
import ProgressLine from "../ProgressLine";
import logo from '../../static/img/logo.png'
const maxStep = 10;

export default function Progress({onClose,onStepToDisplayBack,onStepToDisplayFront}){
    const questionContext = useContext(QuestionContext)
    const step = questionContext.step
    const stepToDisplay = questionContext.stepToDisplay
    let loading = questionContext.loading
    const handleIncrement = (e) => {
        // onStepChange(step + 1)
        onStepToDisplayFront(step)
    }
    const handleDecrement = (e) => {
        // onStepChange(step - 1)
        onStepToDisplayBack(step)
    }
    const handleClose = (e) => {
        onClose()
    }
    return (
        <div className={`progress__wrap ${ step===0 ? 'progress__wrap_intro' : ''}`}>
            <div className="progress__back">
                {
                    (step === 0 || step ===16) ? (
                            <img className="progress__logo" src={logo} alt=""/>
                        ) :
                        (
                            <Icon path={mdiChevronLeft}
                                  size={1}
                                  onClick={handleDecrement}
                                  className={`center curp ${loading && 'cursor_load'}`}/>
                        )
                }
            </div>
            <div className={ step===0 ||step === 16 ? 'd-none' : 'progress__counter'}>
                {stepToDisplay}/{maxStep}
            </div>
            <div className="progress__close" >
                {
                    (step === 0) ?
                        (
                            <Icon path={mdiChevronRight}
                                  size={1}
                                  onClick={handleIncrement}
                                  className={`center curp ${loading && 'cursor_load'}`}/>
                        ) :
                        (
                            <Icon path={mdiClose }
                                  size={1}
                                  onClick={handleClose}
                                  className={`center curp ${loading && 'cursor_load'}`}/>
                        )
                }
            </div>
            
                {
                    step !== 0 && 
                    <div className="line_wrapper">
                        <ProgressLine step={stepToDisplay} maxStep={maxStep}/>
                    </div>
                }
            
        </div>
    )
}
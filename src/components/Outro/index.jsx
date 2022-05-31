import gift from '../../static/img/gift.png'
export default function Outro({onClose,onSend}) {
    function handleClick(){
        onSend()
    }
    return (
        <div className="outro__wrapper">
            <div className="prepend__img">
                <img src={gift}/>

            </div>
            <div className="outro__header">
                We've found some awesome frames for you!
            </div>
            <div className="outro__text">
                Send the results to your email to receive special discounts.
            </div>
            <button onClick={handleClick} className="outro__btn">
                Send
            </button>
            <div className="text_prompt">
                By clicking ‘Send’ you agree to our Terms of Use & Privacy Policy and receiving promotion emails
            </div>
        </div>
    )
}
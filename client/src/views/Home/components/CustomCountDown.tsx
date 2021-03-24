import React from "react"
import styled from 'styled-components'
import ReactDOM from "react-dom"
import Countdown from "react-countdown"
import Spacer from '../../../components/Spacer'

interface CustomCountDownProp {
    date: string | number | Date
}
// Random component
const Completionist = () => <StyleHeading>Welcome to PBR!</StyleHeading>

// Renderer callback with condition
// @ts-ignore
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />
  } else {
    // Render a countdown
    return (
        <>
            <StyleHeading>Harvest Festival Is Coming</StyleHeading>
            <StyleCustomTimer>
                {days > 0 && <><span>{days} <span className="text">Days</span></span></>}
                <span>{hours} <span className="text">Hours</span></span>
                <span>{minutes} <span className="text">Min</span></span>
                <span>{seconds} <span className="text">Sec</span></span>
            </StyleCustomTimer>
        </>
    )
  }
}

const StyleCustomTimer = styled.div`
    font-size: 32px;
    color: ${(props) => props.theme.color.primary.main};
    padding: 20px;
    background-color: ${(props) => props.theme.color.grey[200]};
    margin-top: ${(props) => props.theme.spacing[3]}px;
    border-radius: 12px;
    @media (max-width: 767px) {
        font-size: 22px;
        padding: 10px;
    }
    > span{
        padding: 10px;
        margin-right: 20px;
        font-weight: bold;
        >.text{
            font-size: 20px;
        }
    }
    @media (max-width: 767px) {
        > span{
            margin-right: 0;
            >.text{
                font-size: 16px;
            }
        }
    }
`
const CustomCountDown:React.FC<CustomCountDownProp> = (date) => {
    return(
        <StyleCountDownWrap>
            <Countdown date={date.date} renderer={renderer} />
        </StyleCountDownWrap>
    )
}

const StyleCountDownWrap = styled.div`

`
const StyleHeading = styled.h1`
    text-align: center;
    color: ${(props) => props.theme.color.primary.main};
    @media (max-width: 767px) {
        font-size: 22px;
    }
`

export default CustomCountDown

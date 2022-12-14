import styled from "styled-components";


const Button = (props) => {
    const {onClick, children ,_width ,_height ,_bgColor, borderColor, value} = props;
    const styles = {_width, _height, _bgColor, borderColor};
    return (
        <StButton onClick={onClick} value={value} {...styles}>
        {children}
        </StButton>
    )
}

export default Button;

Button.defaultPorps = {
    _width : "450px",
    _height: "55px" ,
    _bgColor : "#42e3f5",//!
    borderColor: "black",
}

const StButton = styled.button`
    width: ${props => props._width || "450px"};
    height: ${props => props._height || "55px"};
    background-color : ${props => props._bgColor || "#96f542"};//!



`


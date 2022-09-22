//대연 공용 input 보류
// import { useState } from "react";
// import styled from "styled-components";

// function InputCard({name,placeholder,type}) {
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });
//   // 구조 분해 할당
//   const onChange = (event) => {
//     const { name, value } = event.target; 
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   return (
//     <>
//       <StInput
//         name={name}
//         value={name}
//         placeholder={placeholder}
//         type={type}
//         onChange={onChange}
//       ></StInput>
//     </>
//   );
// }

// const StInput = styled.input`
//   display: flex;
//   box-sizing: border-box;
//   height: 55px;
//   border: 1px solid #979797;
//   border-radius: 6px;
//   margin: 0px 25px 30px 25px;
//   text-align: left;
//   padding-left: 19px;
// `;
// export default InputCard;

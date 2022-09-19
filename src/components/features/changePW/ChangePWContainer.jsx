import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../app/modules/instance";
import { passwordFormat } from "../../../utils/reqList";

function ChangePWContainer() {
  const [inputData, setInputData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function changeInputPassWord(event) {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  }

  function sendToModifyData(event) {
    event.preventDefault();
    if (
      inputData.password.length === 0 ||
      inputData.password.length <= 8 ||
      passwordFormat.test(inputData.password) === false
    ) {
      return false;
    } else if (
      inputData.newPassword.length === 0 ||
      inputData.newPassword.length <= 8 ||
      passwordFormat.test(inputData.newPassword) === false
    ) {
      return false;
    } else if (
      inputData.confirmPassword.length === 0 ||
      inputData.newPassword !== inputData.confirmPassword
    ) {
      return false;
    }

    const modifyPassword = async () => {
      try {
        const response = await instance.put(`/accounts`, inputData);
        console.log(response);
        if (response.data.message === "success") {
          navigate("/mypage");
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    modifyPassword();
  }

  return (
    <StContainer>
      <form onSubmit={sendToModifyData}>
        <div style={{ margin: "30px 0", textAlign: "left" }}>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#999999",
              margin: "0",
            }}>
            회원님의 소중한 개인정보를 안전하게 보호하기 위해
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#999999",
              margin: "0",
            }}>
            비밀번호를 입력해주세요.
          </p>
        </div>
        <div style={{}}>
          <label
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#000000",
              display: "block",
              textAlign: "left",
            }}>
            현재 비밀번호
          </label>
          <StCommonInput
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={inputData.password}
            onChange={changeInputPassWord}
          />
          <StErrorMessage>
            {inputData.password.length === 0 || inputData.password.length <= 8
              ? "비밀번호는 9글자 이상이어야 합니다."
              : passwordFormat.test(inputData.password) === false
              ? "비밀번호는 숫자와 영어, 특수문자 중 2가지를 포함해야 합니다."
              : "　"}
          </StErrorMessage>
        </div>
        <div>
          <label
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#000000",
              display: "block",
              textAlign: "left",
            }}>
            새로운 비밀번호
          </label>
          <StCommonInput
            type="password"
            name="newPassword"
            placeholder="변경할 비밀번호 입력"
            value={inputData.newPassword}
            onChange={changeInputPassWord}
          />
          <StCommonInput
            type="password"
            name="confirmPassword"
            placeholder="변경할 비밀번호 재입력"
            value={inputData.confirmPassword}
            onChange={changeInputPassWord}
          />
        </div>
        <StErrorMessage>
          {inputData.newPassword.length === 0 ||
          inputData.newPassword.length <= 8
            ? "변경할 비밀번호는 9글자 이상이어야 합니다."
            : passwordFormat.test(inputData.newPassword) === false
            ? "변경할 비밀번호는 숫자와 영어, 특수문자 중 2가지를 포함해야 합니다."
            : inputData.confirmPassword.length === 0 ||
              inputData.newPassword !== inputData.confirmPassword
            ? "변경할 비밀번호와 내용이 일치하지 않습니다."
            : "　"}
        </StErrorMessage>
        <StCommonButton>확인</StCommonButton>
      </form>
    </StContainer>
  );
}

export default ChangePWContainer;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 70px 25px;
  width: 100%;

  box-sizing: border-box;
`;

const StCommonInput = styled.input`
  display: flex;

  font-size: 18px;
  font-weight: 500;
  color: #000000;

  border: 1px solid #979797;
  border-radius: 6px;
  outline: none;
  margin: 8px 0 0 0;
  padding: 0 0 0 20px;

  width: 85%;
  height: 55px;

  &::placeholder {
    font-size: 18px;
    font-weight: 500;
    color: #979797;
  }
`;

const StCommonButton = styled.button`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  border: none;
  border-radius: 6px;
  outline: none;
  margin: 80px 0;
  padding: 0;

  width: 90%;
  height: 70px;

  cursor: pointer;
`;

const StErrorMessage = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #ff6d53;
  text-align: left;

  height: 32px;
  margin-bottom: 8px;
`;

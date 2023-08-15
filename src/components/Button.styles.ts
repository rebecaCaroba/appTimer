import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'; 

interface ButtonContainerProps {
    varient: ButtonVariant;
}

const buttonVariants = {
    primary: 'rebeccapurple',
    secondary: 'gold',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 48px;

    ${props => {
        return css`background-color: ${buttonVariants[props.varient]}`
        }}
`;
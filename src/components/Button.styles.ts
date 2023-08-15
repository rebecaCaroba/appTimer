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
    border-radius: 4px;
    border: 0;
    margin: 8px;

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white}


    /* ${props => {
        return css`background-color: ${buttonVariants[props.varient]}`
        }} */
`;
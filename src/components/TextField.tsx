import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Exclamation, { Wrapper as _Exclamation } from '../common/svg/Exclamation';

export type ErrorPredicate = {
  predicate: RegExp | ((v: string) => boolean), //Return false when there is error
  errorMessage: string
}

export const Wrapper = styled.div`
  position: relative;

  display: inline-flex;
  flex-direction: column;
`;

const Label = styled.label(({ $error }: { $error: boolean }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: bold;
  color: ${$error ? "var(--theme-danger)" : "black"};
`);

const ErrorContainer = styled.div(({ $cursor }: { $cursor: string }) => `
  display: flex;
  align-items: center;

  position: relative;
  margin-left: 3%;
  font-weight: normal;

  ${_Exclamation} {
    aspect-ratio: 1/1;
    height: 14rem;
    width: auto;

    margin: 0 5rem;
    flex-shrink: 0;
    cursor: ${$cursor};
  }
`);

const Input = styled.input(({ $error }: { $error: boolean }) => `
  width: 100%;

  caret-color: ${$error ? "var(--theme-danger)" : "var(--theme-primary)"};
  border-color: ${$error ? "var(--theme-danger)" : "var(--theme-neutral)"};

  :focus {
    border-color: ${$error ? "var(--theme-danger)" : "var(--theme-primary)"};
  }
`);

const TextField = ({ id, label, placeholder = "", value, onChange, type = "text", focusErrorPredicates, blurErrorPredicates, onVerify, }: {
  id?: string,
  label: string,
  placeholder?: string,
  value: string,
  onChange: (updatedValue: string) => void,
  type?: "text" | "password",
  focusErrorPredicates?: ErrorPredicate[],
  blurErrorPredicates?: ErrorPredicate[],
  onVerify?: (hasError: boolean) => void
}) => {
  /**
   * Hooks
   */
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!value) { setError(false); setErrorMessage(""); }

    else if (focusErrorPredicates) verifyErrors(focusErrorPredicates);

  }, [value]);

  /**
   * Not hook
   */
  const verifyErrors = (errorPredicates: ErrorPredicate[] | undefined): boolean => {
    if (errorPredicates) {
      let error = false;

      for (const errorPredicate of errorPredicates) {
        error = true;

        if (errorPredicate.predicate instanceof RegExp && errorPredicate.predicate.test(value)) error = false;
        else if (typeof errorPredicate.predicate === 'function' && errorPredicate.predicate(value)) error = false;

        setError(error);
        setErrorMessage("");

        if (error) {
          setErrorMessage(errorPredicate.errorMessage);
          break;
        }
      }

      return error;
    } else {
      setError(false);
      setErrorMessage("");
      return false;
    }
  }

  const handleBlur = () => {
    if (!value) {
      setError(true);
      setErrorMessage(`This field cannot be empty`);

      onVerify && onVerify(true);

    } else {
      const focusError = verifyErrors(focusErrorPredicates);
      const blurError = focusError ? true : verifyErrors(blurErrorPredicates);

      onVerify && onVerify(focusError || blurError);
    }
  }

  return (
    <Wrapper id={id}>
      <Label $error={error}>
        {label}

        {error &&
          <ErrorContainer $cursor={errorMessage ? "pointer" : "auto"}>
            <Exclamation />
            {errorMessage}
          </ErrorContainer>
        }
      </Label>

      <Input
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="input"
        type={type}

        $error={error}
      />
    </Wrapper>
  );
}

export default TextField;
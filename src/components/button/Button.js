import React from 'react';
import './Button.css';

function Button({ children, clickHandler, disabled }) {
    return (
        <button
            type="button"
            className="botones"
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;

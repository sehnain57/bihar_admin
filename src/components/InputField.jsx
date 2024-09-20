import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { InputLabel, OutlinedInput } from '@mui/material';

function InputField({ value, onChange, placeholder, sx, label, multiline, rows, sxLabel, name, type }) {
    return (
        <div>
            <InputLabel sx={{ mb: 1, ...sxLabel }}>{label}</InputLabel>
            <OutlinedInput
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                multiline={multiline && multiline}
                rows={rows}
                sx={{
                    borderColor: 'gray', // Default border color
                    '&.MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'gray', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'darkgray', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2F4CDD', // Border color on focus
                        },
                    },
                    width: '100%',
                    height: !multiline && "7vh",
                    borderRadius: "5px",
                    // padding:"6px"
                    ...sx // Apply any additional styles passed via sx prop
                }}
            />
        </div>
    );
}

// Add PropTypes validation
InputField.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    sx: PropTypes.object,
    label: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    sxLabel: PropTypes.object,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

// Set default props for optional props
InputField.defaultProps = {
    placeholder: '',
    sx: {},
    multiline: false,
    rows: 1,
    sxLabel: {},
};

export default InputField;

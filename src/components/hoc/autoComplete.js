import React from 'react'
import { Autocomplete, TextField } from '@mui/material'

// Higher Order Component for generating Autocomplete filter
const FilterAutocomplete = ({ options, label, value, onChange }) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      renderInput={params => (
        <TextField {...params} label={label} variant='outlined' />
      )}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
    />
  )
}

export default FilterAutocomplete

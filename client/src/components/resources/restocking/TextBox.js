import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

function TextBox({label, text, setText}) {

    const changeText = e =>{
        setText(e.target.value)
    }
    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="component-simple">{label}</InputLabel>
                <Input
                    name='stockInput'
                    type='text'
                    value={text}
                    onChange={changeText}
                />
            </FormControl>
        </div>
    )
}

export default TextBox

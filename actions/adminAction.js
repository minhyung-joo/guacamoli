export function inputSingleTextOption(optionTitle, optionValue) {
    return{
        type: 'INPUT_SINGLE_TEXT_OPTION',
        title: optionTitle,
        value: optionValue
    }
}

export function inputSelectOption(value, name){
    return {
        type: 'INPUT_SELECT_OPTION',
        name: name,
        value: value
    }
}

export function adminInputFilterCheckboxOptions(filterTitle, filterValue, isChecked){
    return{
        type: 'ADMIN_INPUT_FILTER_CHECKBOX_OPTIONS',
        filterTitle: filterTitle,
        filterValue: filterValue,
        isChecked: isChecked,
    }
}
export function resetFilterOptions(){
    return{
        type: 'RESET_FILTER_OPTIONS'
    }
}

export function submitFilterSearch(){
    return{
        type: 'SUBMIT_FILTER_SEARCH'
    }
}

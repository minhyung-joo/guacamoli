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

export function loadUpdatePageData(menuData){
    return {
        type: 'LOAD_UPDATE_PAGE_DATA',
        data: menuData,
    }
}

export function adminResetInputOptions(){
    return {
        type: 'ADMIN_RESET_INPUT_OPTIONS'
    }
}

export function identifyPageType(foodid){
    return{
        type: 'IDENTIFY_PAGE_TYPE',
        foodid: foodid,
    }
}


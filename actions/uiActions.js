export function toggleNavDrawer(toggleFlag=null) {
    return{
        type: 'TOGGLE_NAV_DRAWER',
        value:toggleFlag
    }
}

export function clickCanteenListButton() {
    return{
        type: 'CLICK_CANTEEN_LIST'
    }
}

export function toggleSearchButton() {
    return{
        type: 'TOGGLE_SEARCH_BUTTON'
    }
}

// export function toggleFilterButton() {
//     return{
//         type: 'TOGGLE_FILTER_BUTTON'
//     }
// }

export function showModalFilter() {
    return {
        type: 'SHOW_MODAL_FILTER'
    }
}

export function hideModalFilter() {
    return {
        type: 'HIDE_MODAL_FILTER'
    }
}

export function clickAdvancedFilter(){
    return{
        type: 'CLICK_ADVANCED_FILTER'
    }
}
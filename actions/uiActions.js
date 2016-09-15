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
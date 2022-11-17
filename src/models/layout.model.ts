export interface ISideBar {
    open: true | false,
    handleOpen: ()=>void
}

export interface IHeader {
    handleSideBarOpen: ()=>void,
    showHandler: true | false
}

export interface ISIdeBarList {
    handleSideBarOpen: ()=>void
}
import Main, { SuperTabsProps } from "./Main";
import { Tabs } from "antd";

export type ISuperTabOptions = Array<{
    label: string, 
    value: string | number, 
    disabled?: boolean, 
}>

type IMain = typeof Main;

interface SuperTabs extends SuperTabsProps, IMain {
	TabPane: typeof Tabs.TabPane
}

const SuperTabs = Main as SuperTabs;

SuperTabs.TabPane = Tabs.TabPane;

export default SuperTabs;
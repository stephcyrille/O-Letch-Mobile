import { Profile } from "./user.model";

export class ProjectBase{
    id?: number;
    author: number;
    zone: string;
    product: string;
    surface: number;
    created_at: Date;
    update_at: Date;
} 

export class Project{
    id?: number;
    author: Profile;
    projectType: string;
    zone: string;
    product: string;
    surface: number;
    treeNursery: Boolean;
    treeNumberByHectare: number;
    semDensity: number;
    fertilizerProportion: number;
    phytoThreatment: number;
    productPrice: number;
    semDate: Date;
    cropDate: Date;
    cropTotalProduct: number;
    active: Boolean;
    created_at: Date;
    update_at: Date
} 